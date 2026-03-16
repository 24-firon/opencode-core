/**
 * Hive Schema Validation
 * Zod schemas for validating all database inputs
 * Security-critical: All data MUST pass validation before database insertion
 */

import { z } from 'zod';
import type {
  CreateTaskInput,
  EventType,
  TaskQuery,
  TaskSize,
  TaskStatus,
  UpdateTaskInput,
} from './types.js';

// Enums
export const taskStatusSchema = z.enum([
  'pending',
  'in_progress',
  'completed',
  'blocked',
  'rejected',
]) as z.ZodType<TaskStatus>;

export const taskSizeSchema = z.enum([
  'tiny',
  'small',
  'medium',
  'large',
  'epic',
]) as z.ZodType<TaskSize>;

export const eventTypeSchema = z.enum([
  'task_created',
  'task_started',
  'task_completed',
  'task_blocked',
  'task_rejected',
  'task_updated',
  'dependency_added',
  'decision_recorded',
  'sme_guidance',
  'agent_assigned',
  'evidence_generated',
]) as z.ZodType<EventType>;

// Task ID: Format "T-{phase}.{number}"
export const taskIdSchema = z
  .string()
  .regex(/^T-\d+\.\d+$/, 'Task ID must be in format T-{phase}.{number}');

// Agent names from AGENTS.md
export const agentSchema = z.enum([
  'architect',
  'coder',
  'reviewer',
  'test_engineer',
  'sme',
  'explorer',
  'critic',
  'docs',
  'designer',
]);

// Create Task Input
export const createTaskInputSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  phase: z.number().int().min(1).max(100),
  size: taskSizeSchema.optional(),
  dependencies: z.array(taskIdSchema).default([]),
  assignedAgent: agentSchema.optional(),
  acceptanceCriteria: z.array(z.string()).optional(),
}) satisfies z.ZodType<CreateTaskInput>;

// Update Task Input
export const updateTaskInputSchema = z.object({
  status: taskStatusSchema.optional(),
  assignedAgent: agentSchema.optional(),
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(2000).optional(),
}) satisfies z.ZodType<UpdateTaskInput>;

// Task Query
export const taskQuerySchema = z.object({
  status: taskStatusSchema.optional(),
  phase: z.number().int().min(1).optional(),
  assignedAgent: agentSchema.optional(),
  limit: z.number().int().min(1).max(1000).default(100),
  offset: z.number().int().min(0).default(0),
}) satisfies z.ZodType<TaskQuery>;

// Event Data
export const eventDataSchema = z.record(z.unknown());

// Dependency
export const dependencySchema = z.object({
  taskId: taskIdSchema,
  dependsOnTaskId: taskIdSchema,
});

// Evidence Bundle
export const gateResultSchema = z.object({
  name: z.string(),
  passed: z.boolean(),
  duration: z.number().int().min(0),
  errors: z.array(z.string()).optional(),
});

export const testResultsSchema = z.object({
  passed: z.boolean(),
  coverage: z.number().min(0).max(100),
  failed: z.number().int().min(0),
  passedCount: z.number().int().min(0),
});

export const reviewVerdictSchema = z.object({
  passed: z.boolean(),
  riskLevel: z.enum(['low', 'medium', 'high']),
  issues: z.array(z.string()),
  reviewer: z.string(),
});

export const evidenceBundleSchema = z.object({
  taskId: taskIdSchema,
  gates: z.record(gateResultSchema),
  diffs: z.array(z.string()),
  testResults: testResultsSchema,
  reviewVerdict: reviewVerdictSchema,
  timestamp: z.date(),
});

// Validation functions
export function validateCreateTask(input: unknown): CreateTaskInput {
  return createTaskInputSchema.parse(input);
}

export function validateUpdateTask(input: unknown): UpdateTaskInput {
  return updateTaskInputSchema.parse(input);
}

export function validateTaskQuery(input: unknown): TaskQuery {
  return taskQuerySchema.parse(input);
}

export function validateEventType(type: unknown): EventType {
  return eventTypeSchema.parse(type);
}

export function validateTaskId(id: unknown): string {
  return taskIdSchema.parse(id);
}

export function validateDependency(deps: unknown): {
  taskId: string;
  dependsOnTaskId: string;
} {
  return dependencySchema.parse(deps);
}
