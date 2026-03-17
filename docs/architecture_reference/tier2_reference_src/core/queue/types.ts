/**
 * Tier 2: Advanced Router Swarm - Queue Types
 * Core type definitions for the Agent Inbox messaging system
 */

export interface JobPayload {
  taskId: string;
  instructions: string;
  context: Record<string, unknown>;
}

export interface Job {
  id: string;
  target_agent: string;
  payload: string; // JSON string in DB
  status: 'pending' | 'processing' | 'done' | 'failed';
  result: string | null;
  locked_at: string | null;
}

export interface JobResult {
  success: boolean;
  data?: unknown;
  error?: string;
}
