/**
 * Hive Module
 * Public API exports for the event sourcing system
 */

export { HiveAPI } from './api.js';
export type {
  Task,
  TaskEvent,
  TaskStatus,
  TaskSize,
  EventType,
  CreateTaskInput,
  UpdateTaskInput,
  TaskQuery,
  HiveConfig,
  Dependency,
  EvidenceBundle,
  GateResult,
  TestResults,
  ReviewVerdict,
} from './types.js';

export {
  taskStatusSchema,
  taskSizeSchema,
  eventTypeSchema,
  taskIdSchema,
  agentSchema,
  createTaskInputSchema,
  updateTaskInputSchema,
  taskQuerySchema,
  validateCreateTask,
  validateUpdateTask,
  validateTaskQuery,
  validateTaskId,
  validateEventType,
  validateDependency,
} from './schema.js';
