// ============================================================================
// TASK 1: SQLite Agent Inbox (Queue-Worker with better-sqlite3)
// ============================================================================
import Database from 'better-sqlite3';

export interface JobPayload {
    taskId: string;
    instructions: string;
    context: Record<string, any>;
}

export interface Job {
    id: string;
    target_agent: string;
    payload: string; // JSON string in DB
    status: 'pending' | 'processing' | 'done' | 'failed';
    result: string | null;
    locked_at: string | null;
}

export class AgentInboxQueue {
    private db: Database.Database;
    private claimStmt: Database.Statement;
    private completeStmt: Database.Statement;
    private failStmt: Database.Statement;
    private isPolling: boolean = false;
    private intervalId?: NodeJS.Timeout;

    constructor(dbPath: string = '.hive.db') {
        this.db = new Database(dbPath);

        // Enable WAL mode for high concurrency
        this.db.pragma('journal_mode = WAL');
        this.db.pragma('synchronous = NORMAL');

        // Initialize table
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS agent_inbox (
                id TEXT PRIMARY KEY,
                target_agent TEXT NOT NULL,
                payload JSON NOT NULL,
                status TEXT DEFAULT 'pending',
                result JSON,
                locked_at DATETIME
            );
            CREATE INDEX IF NOT EXISTS idx_agent_status ON agent_inbox(target_agent, status);
        `);

        // Prepare statements for performance
        this.claimStmt = this.db.prepare(`
            UPDATE agent_inbox 
            SET status = 'processing', locked_at = CURRENT_TIMESTAMP 
            WHERE id = (
                SELECT id FROM agent_inbox 
                WHERE status = 'pending' AND target_agent = ? 
                ORDER BY rowid ASC LIMIT 1
            )
            RETURNING *;
        `);

        this.completeStmt = this.db.prepare(`
            UPDATE agent_inbox 
            SET status = 'done', result = ? 
            WHERE id = ?;
        `);

        this.failStmt = this.db.prepare(`
            UPDATE agent_inbox 
            SET status = 'failed', result = ? 
            WHERE id = ?;
        `);
    }

    public enqueue(id: string, targetAgent: string, payload: JobPayload): void {
        const stmt = this.db.prepare(
            `INSERT INTO agent_inbox (id, target_agent, payload) VALUES (?, ?, ?)`
        );
        stmt.run(id, targetAgent, JSON.stringify(payload));
    }

    public startWorker(agentName: string, processor: (payload: JobPayload) => Promise<any>): void {
        this.isPolling = true;

        // 50ms polling loop
        this.intervalId = setInterval(async () => {
            if (!this.isPolling) return;

            // Atomically claim the next job for this specific agent
            const job = this.claimStmt.get(agentName) as Job | undefined;

            if (job) {
                // Pause polling while processing to prevent concurrent execution on same worker
                // (In a real multi-threaded setup, we'd dispatch to a Worker Thread here)
                this.isPolling = false; 

                try {
                    const parsedPayload = JSON.parse(job.payload) as JobPayload;
                    const result = await processor(parsedPayload);
                    this.completeStmt.run(JSON.stringify({ success: true, data: result }), job.id);
                } catch (error) {
                    const errorMsg = error instanceof Error ? error.message : String(error);
                    this.failStmt.run(JSON.stringify({ success: false, error: errorMsg }), job.id);
                } finally {
                    this.isPolling = true;
                }
            }
        }, 50);
    }

    public stopWorker(): void {
        this.isPolling = false;
        if (this.intervalId) clearInterval(this.intervalId);
    }
}


// ============================================================================
// TASK 2: State Machine Suspend & Resume (XState v5)
// ============================================================================
import { setup, createActor, fromPromise, assign } from 'xstate';

// 1. Define the DB interface for State persistence
const stateDb = new Database('.hive_state.db');
stateDb.exec(`
    CREATE TABLE IF NOT EXISTS actor_states (
        actor_id TEXT PRIMARY KEY,
        state_json JSON NOT NULL,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
`);

const saveStateStmt = stateDb.prepare(`
    INSERT INTO actor_states (actor_id, state_json, updated_at) 
    VALUES (?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(actor_id) DO UPDATE SET 
    state_json = excluded.state_json, 
    updated_at = CURRENT_TIMESTAMP;
`);

const loadStateStmt = stateDb.prepare(`SELECT state_json FROM actor_states WHERE actor_id = ?`);

// 2. Define the Machine Setup (Agent A)
interface AgentContext {
    query: string;
    delegatedJobId: string | null;
    backendResult: any | null;
}

const dispatchJobActor = fromPromise(async ({ input }: { input: { target: string, payload: any } }) => {
    const jobId = crypto.randomUUID();
    const inbox = new AgentInboxQueue('.hive.db');
    inbox.enqueue(jobId, input.target, input.payload);
    return jobId;
});

const agentAMachine = setup({
    types: {
        context: {} as AgentContext,
        events: {} as { type: 'RESUME_WITH_RESULT'; data: any }
    },
    actors: {
        dispatchJob: dispatchJobActor
    }
}).createMachine({
    id: 'frontend_agent_A',
    initial: 'analyzing',
    context: {
        query: '',
        delegatedJobId: null,
        backendResult: null
    },
    states: {
        analyzing: {
            // Agent decides it needs backend help, transitions to dispatching
            always: { target: 'dispatching_to_backend' }
        },
        dispatching_to_backend: {
            invoke: {
                src: 'dispatchJob',
                input: ({ context }) => ({
                    target: 'backend_specialist_B',
                    payload: { taskId: 'req_1', instructions: 'Get API schema', context: {} }
                }),
                onDone: {
                    target: 'suspended',
                    actions: assign({ delegatedJobId: ({ event }) => event.output })
                }
            }
        },
        suspended: {
            // Machine halts here. The process can die. 
            // We wait for an external 'RESUME_WITH_RESULT' event.
            on: {
                RESUME_WITH_RESULT: {
                    target: 'synthesizing',
                    actions: assign({ backendResult: ({ event }) => event.data })
                }
            }
        },
        synthesizing: {
            type: 'final'
        }
    }
});

// 3. Suspend and Resume Logic
export class Orchestrator {
    // Start or Suspend
    static async runAndSuspend(actorId: string, query: string) {
        const actor = createActor(agentAMachine, {
            id: actorId,
            input: { query }
        });

        actor.subscribe((state) => {
            if (state.value === 'suspended') {
                // Save JSON snapshot to SQLite and stop memory execution
                const snapshot = actor.getPersistedSnapshot();
                saveStateStmt.run(actorId, JSON.stringify(snapshot));
                actor.stop();
            }
        });

        actor.start();
    }

    // Wake up when Agent B finishes
    static async resumeWithResult(actorId: string, resultData: any) {
        const row = loadStateStmt.get(actorId) as { state_json: string } | undefined;
        if (!row) throw new Error(`No state found for actor ${actorId}`);

        const restoredSnapshot = JSON.parse(row.state_json);

        const actor = createActor(agentAMachine, {
            id: actorId,
            snapshot: restoredSnapshot
        });

        actor.start();

        // Inject the result from the queue
        actor.send({ type: 'RESUME_WITH_RESULT', data: resultData });

        // Clean up DB when done
        actor.subscribe((state) => {
            if (state.status === 'done') {
                stateDb.prepare('DELETE FROM actor_states WHERE actor_id = ?').run(actorId);
            }
        });
    }
}


// ============================================================================
// TASK 3: Semantic Router & Prompt Assembly (Transformers.js + Handlebars)
// ============================================================================
import { pipeline, cos_sim, FeatureExtractionPipeline } from '@xenova/transformers';
import Handlebars from 'handlebars';

export interface RouteBlueprint {
    id: string;
    utterances: string[];
    template: string;
}

export class SemanticRouter {
    private extractor: FeatureExtractionPipeline | null = null;
    private routeEmbeddings: Map<string, number[]> = new Map();
    private blueprints: Map<string, RouteBlueprint> = new Map();

    constructor(blueprints: RouteBlueprint[]) {
        for (const bp of blueprints) {
            this.blueprints.set(bp.id, bp);
        }
    }

    // 1. Initialize ONNX Model and Pre-compute Route Embeddings
    public async initialize(): Promise<void> {
        // Load quantized ONNX model locally (no API costs, ~90MB)
        this.extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', {
            quantized: true,
        });

        // Pre-compute embeddings for all utterances
        for (const blueprint of this.blueprints.values()) {
            // Combine utterances into one text or average them. Here we just take the first as representative for brevity,
            // or compute a mean pool of all utterances.
            const textToEmbed = blueprint.utterances.join('. ');
            const output = await this.extractor(textToEmbed, { pooling: 'mean', normalize: true });

            // Convert Float32Array to standard Array
            this.routeEmbeddings.set(blueprint.id, Array.from(output.data));
        }
    }

    // 2. JIT Routing (Sub 15ms execution)
    public async route(userInput: string): Promise<string> {
        if (!this.extractor) throw new Error("Router not initialized");

        const queryOutput = await this.extractor(userInput, { pooling: 'mean', normalize: true });
        const queryEmbedding = Array.from(queryOutput.data);

        let bestMatchId = '';
        let highestSimilarity = -1;

        for (const [id, embedding] of this.routeEmbeddings.entries()) {
            const similarity = cos_sim(queryEmbedding, embedding);
            if (similarity > highestSimilarity) {
                highestSimilarity = similarity;
                bestMatchId = id;
            }
        }

        // Threshold fallback
        if (highestSimilarity < 0.6) {
            return 'fallback_general_agent';
        }

        return bestMatchId;
    }

    // 3. Dynamic Prompt Assembly
    public assemblePrompt(blueprintId: string, mviData: any): string {
        const blueprint = this.blueprints.get(blueprintId);
        if (!blueprint) throw new Error("Blueprint not found");

        // Compile Handlebars template with MVI (Minimum Viable Information)
        const render = Handlebars.compile(blueprint.template, { strict: true });
        return render(mviData);
    }
}

// ----------------------------------------------------------------------------
// USAGE EXAMPLE: Semantic Router
// ----------------------------------------------------------------------------
async function runRouterExample() {
    const blueprints: RouteBlueprint[] = [
        {
            id: 'database_agent',
            utterances: ['Binde die Postgres Datenbank ein', 'Schreibe einen SQL Query', 'Database Migration'],
            template: `You are the DB Agent.
Context AST:
{{#each ast_nodes}}
- {{this.type}}: {{this.content}}
{{/each}}
Available Tools: {{tools}}
User Request: {{query}}`
        },
        {
            id: 'frontend_agent',
            utterances: ['Baue eine React Komponente', 'Style den Button mit Tailwind', 'CSS anpassen'],
            template: `You are the UI Agent. Context: {{ui_framework}}`
        }
    ];

    const router = new SemanticRouter(blueprints);
    await router.initialize();

    const userInput = "Ich muss einen SQL Join für die User Tabelle schreiben.";

    // 1. Route Intent
    const targetBlueprintId = await router.route(userInput);
    // targetBlueprintId === 'database_agent'

    // 2. Assemble Context (MVI)
    const mviPayload = {
        query: userInput,
        ast_nodes: [
            { type: 'InterfaceDeclaration', content: 'interface User { id: string; }' },
            { type: 'ImportDeclaration', content: 'import { sql } from "drizzle-orm";' }
        ],
        tools: 'execute_query, schema_inspect'
    };

    // 3. Generate Final Prompt
    const finalPrompt = router.assemblePrompt(targetBlueprintId, mviPayload);
    // Returns rendered Handlebars string ready for Vercel AI SDK
}
