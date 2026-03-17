/**
 * Tier 2: Advanced Router Swarm - XState Agent Machine
 * State machine definition for agent lifecycle with suspend/resume
 */

import { assign, fromPromise, setup } from 'xstate';
import type { AgentInboxQueue } from '../../queue/AgentInboxQueue.js';

// Context for the agent machine
interface AgentContext {
  query: string;
  delegatedJobId: string | null;
  backendResult: unknown;
  agentName: string;
  inbox: AgentInboxQueue;
}

// Actor to dispatch jobs to other agents
const dispatchJobActor = fromPromise(
  async ({ input }: { input: { target: string; payload: unknown; inbox: AgentInboxQueue } }) => {
    const jobId = crypto.randomUUID();
    input.inbox.enqueue(jobId, input.target, {
      taskId: jobId,
      instructions: JSON.stringify(input.payload),
      context: input.payload as Record<string, unknown>,
    });
    return jobId;
  },
);

// The agent machine definition
export const agentMachine = setup({
  types: {
    context: {} as AgentContext,
    events: {} as { type: 'RESUME_WITH_RESULT'; data: unknown },
    input: {} as { query: string; inbox: AgentInboxQueue; agentName?: string },
  },
  actors: {
    dispatchJob: dispatchJobActor,
  },
}).createMachine({
  id: 'agent_orchestrator',
  initial: 'analyzing',
  context: ({ input }) => ({
    query: input.query,
    delegatedJobId: null,
    backendResult: null,
    agentName: input.agentName || 'unknown',
    inbox: input.inbox,
  }),
  states: {
    analyzing: {
      always: { target: 'dispatching_to_backend' },
    },
    dispatching_to_backend: {
      invoke: {
        src: 'dispatchJob',
        input: ({ context }) => ({
          target: 'backend_specialist',
          payload: {
            taskId: 'req_1',
            instructions: 'Get API schema',
            context: { query: context.query },
          },
          inbox: context.inbox,
        }),
        onDone: {
          target: 'suspended',
          actions: assign({
            delegatedJobId: ({ event }) => event.output as string,
          }),
        },
        onError: {
          target: 'failed',
        },
      },
    },
    suspended: {
      on: {
        RESUME_WITH_RESULT: {
          target: 'synthesizing',
          actions: assign({
            backendResult: ({ event }) => event.data,
          }),
        },
      },
    },
    synthesizing: {
      type: 'final',
    },
    failed: {
      type: 'final',
    },
  },
});
