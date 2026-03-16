/**
 * Hive Event Sourcing Types
 * Core type definitions for the .hive/ event log system
 */

export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'blocked' | 'rejected';

export type TaskSize = 'tiny' | 'small' | 'medium' | 'large' | 'epic';

export type EventType =
  | 'task_created'
  | 'task_started'
  | 'task_completed'
  | 'task_blocked'
  | 'task_rejected'
  | 'task_updated'
  | 'dependency_added'
  | 'decision_recorded'
  | 'sme_guidance'
  | 'agent_assigned'
  | 'evidence_generated';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  phase: number;
  size?: TaskSize;
  dependencies: string[];
  assignedAgent?: string;
  acceptanceCriteria?: string[];
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
  attempts: number;
  maxAttempts: number;
}

export interface TaskEvent {
  id: string;
  taskId: string;
  type: EventType;
  data: Record<string, unknown>;
  timestamp: Date;
}

export interface Dependency {
  taskId: string;
  dependsOnTaskId: string;
}

export interface HiveConfig {
  dbPath: string;
  maxRetries: number;
  compactionThreshold: number;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  phase: number;
  size?: TaskSize;
  dependencies?: string[];
  assignedAgent?: string;
  acceptanceCriteria?: string[];
}

export interface UpdateTaskInput {
  status?: TaskStatus;
  assignedAgent?: string;
  title?: string;
  description?: string;
}

export interface TaskQuery {
  status?: TaskStatus;
  phase?: number;
  assignedAgent?: string;
  limit?: number;
  offset?: number;
}

export interface EvidenceBundle {
  taskId: string;
  gates: Record<string, GateResult>;
  diffs: string[];
  testResults: TestResults;
  reviewVerdict: ReviewVerdict;
  timestamp: Date;
}

export interface GateResult {
  name: string;
  passed: boolean;
  duration: number;
  errors?: string[];
}

export interface TestResults {
  passed: boolean;
  coverage: number;
  failed: number;
  passedCount: number;
}

export interface ReviewVerdict {
  passed: boolean;
  riskLevel: 'low' | 'medium' | 'high';
  issues: string[];
  reviewer: string;
}
