/**
 * Tier 2: Advanced Router Swarm - Orchestrator
 * Suspend and resume logic for XState actors with SQLite persistence
 */

import type { Database } from 'better-sqlite3';
import { createActor } from 'xstate';
import type { AgentInboxQueue } from '../queue/AgentInboxQueue.js';
import { type StateDbStatements, initStateDb } from './db.js';
import { agentMachine } from './machines/agentMachine.js';

export class Orchestrator {
  private stmts: StateDbStatements;

  constructor(
    stateDb: Database,
    private inbox: AgentInboxQueue,
  ) {
    this.stmts = initStateDb(stateDb);
  }

  /**
   * Start an agent and suspend when it reaches waiting state
   */
  async runAndSuspend(actorId: string, query: string): Promise<void> {
    const actor = createActor(agentMachine, {
      id: actorId,
      input: { query, inbox: this.inbox },
    });

    actor.subscribe((state) => {
      if (state.value === 'suspended') {
        // Save JSON snapshot to SQLite and stop memory execution
        const snapshot = actor.getPersistedSnapshot();
        this.stmts.saveStateStmt.run(actorId, JSON.stringify(snapshot));
        actor.stop();
        console.log(`Agent ${actorId} suspended and state saved to SQLite`);
      }
    });

    actor.start();
  }

  /**
   * Wake up an agent when delegated work is complete
   */
  async resumeWithResult(actorId: string, resultData: unknown): Promise<void> {
    const row = this.stmts.loadStateStmt.get(actorId) as { state_json: string } | undefined;

    if (!row) {
      throw new Error(`No state found for actor ${actorId}`);
    }

    const restoredSnapshot = JSON.parse(row.state_json);

    const actor = createActor(agentMachine, {
      id: actorId,
      snapshot: restoredSnapshot,
      input: { query: '', inbox: this.inbox }, // Ensure context dependencies are passed
    });

    actor.start();

    // Inject the result from the queue
    actor.send({ type: 'RESUME_WITH_RESULT', data: resultData });

    // Clean up DB when done
    actor.subscribe((state) => {
      if (state.status === 'done') {
        this.stmts.deleteStateStmt.run(actorId);
        console.log(`Agent ${actorId} completed and state cleaned up`);
      }
    });
  }

  /**
   * Check if an actor has a saved state
   */
  hasState(actorId: string): boolean {
    const row = this.stmts.loadStateStmt.get(actorId);
    return !!row;
  }
}
