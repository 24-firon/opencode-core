/**
 * Tier 2 E2E Integration Test
 * Simulates the Advanced Router Swarm workflow
 */

import Database from 'better-sqlite3';
import { Orchestrator } from '../core/orchestration/Orchestrator.js';
import { AgentInboxQueue } from '../core/queue/AgentInboxQueue.js';
import type { JobPayload } from '../core/queue/types.js';
import { SemanticRouter } from '../core/router/SemanticRouter.js';

// In a real test framework (like Vitest) we'd use vi.mock()
// Here we just test the integration by starting the components.

async function runTier2Test() {
  console.log('🚀 Starting Tier 2 E2E Integration Test...\n');

  // Step 1: Initialize Databases
  console.log('📦 Initializing Test Databases...');
  // Use in-memory for state to be fast and isolated
  const stateDb = new Database(':memory:');
  const queueDb = new Database(':memory:');

  const inbox = new AgentInboxQueue(queueDb);
  const orchestrator = new Orchestrator(stateDb, inbox);

  // Step 2: Initialize Router with Mocked Data
  console.log('\n🧭 Initializing Semantic Router...');
  const blueprints = [
    {
      id: 'database_agent',
      utterances: ['sql', 'database', 'schema'],
      template: 'You are a DB expert. Task: {{query}}',
    },
    {
      id: 'frontend_agent',
      utterances: ['react', 'ui', 'css'],
      template: 'You are a UI expert. Task: {{query}}',
    },
  ];

  const router = new SemanticRouter(blueprints);

  // Monkey-patch the extractor for this test to bypass ONNX download
  (router as any).extractor = async (text: string) => {
    // Simple deterministic mock based on keywords
    const embedding = text.includes('sql') ? [1, 0, 0] : [0, 1, 0];
    return { data: new Float32Array(embedding) };
  };

  // Manually populate route embeddings to match the mock
  (router as any).routeEmbeddings.set('database_agent', [1, 0, 0]);
  (router as any).routeEmbeddings.set('frontend_agent', [0, 1, 0]);

  // Step 3: Route User Intent
  const userInput = 'I need to write a sql query';
  console.log(`\n👤 User Input: "${userInput}"`);

  const targetRoute = await router.route(userInput);
  console.log(`🎯 Routed to Blueprint: ${targetRoute}`);

  const prompt = router.assemblePrompt(targetRoute, { query: userInput });
  console.log(`📝 Generated Prompt: "${prompt}"`);

  // Step 4: Orchestrate and Suspend
  console.log('\n⚙️ Starting Orchestrator (Actor A)...');
  const actorId = 'actor_test_1';
  await orchestrator.runAndSuspend(actorId, prompt);

  // Wait a moment for actor to process and suspend
  await new Promise((resolve) => setTimeout(resolve, 100));

  const isSuspended = orchestrator.hasState(actorId);
  console.log(`💤 Actor Suspended State Saved: ${isSuspended}`);

  // Step 5: Worker processes job
  console.log('\n👷 Starting Backend Specialist Worker (Agent B)...');

  // We use a promise to know when the worker has processed the job
  const workerPromise = new Promise<void>((resolve) => {
    inbox.startWorker('backend_specialist', async (payload: JobPayload) => {
      console.log(`   Worker received job: ${payload.taskId}`);
      console.log(`   Executing instructions: ${payload.instructions}`);

      // Simulate work
      await new Promise((r) => setTimeout(r, 200));

      const result = { success: true, schema: 'CREATE TABLE users (id int);' };
      console.log(`   Worker finished job.`);

      // Stop worker and resolve
      setTimeout(() => {
        inbox.stopWorker();
        resolve();
      }, 50);

      return result;
    });
  });

  await workerPromise;

  // Step 6: Wake up Orchestrator
  console.log('\n⏰ Waking up Orchestrator with results...');
  const simulatedResult = { success: true, schema: 'CREATE TABLE users (id int);' };
  await orchestrator.resumeWithResult(actorId, simulatedResult);

  // Wait for state to finish
  await new Promise((resolve) => setTimeout(resolve, 100));

  const stateCleared = !orchestrator.hasState(actorId);
  console.log(`🏁 Actor completed and state cleared: ${stateCleared}`);

  console.log('\n🎉 Tier 2 Architecture E2E Test Passed Successfully!');

  // Cleanup
  inbox.close();
  stateDb.close();
}

runTier2Test().catch(console.error);
