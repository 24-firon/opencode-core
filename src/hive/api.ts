/**
 * Hive API Core
 * Event sourcing database operations using better-sqlite3
 * All agents interact with the system through this API
 */

import { existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import Database from 'better-sqlite3';
import {
  validateCreateTask,
  validateTaskId,
  validateTaskQuery,
  validateUpdateTask,
} from './schema.js';
import type {
  CreateTaskInput,
  EvidenceBundle,
  EventType,
  Task,
  TaskEvent,
  TaskQuery,
  TaskSize,
  TaskStatus,
  UpdateTaskInput,
} from './types.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEFAULT_DB_PATH = join(__dirname, '../../.hive/event-log.sqlite');

export class HiveAPI {
  private db: Database.Database;
  private dbPath: string;

  constructor(dbPath: string = DEFAULT_DB_PATH) {
    this.dbPath = dbPath;
    this.ensureDirectory();
    this.db = new Database(dbPath);
    this.initSchema();
  }

  private ensureDirectory(): void {
    const dir = dirname(this.dbPath);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
  }

  private initSchema(): void {
    // Tasks table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT NOT NULL DEFAULT 'pending',
        phase INTEGER NOT NULL DEFAULT 1,
        size TEXT,
        dependencies TEXT DEFAULT '[]',
        assigned_agent TEXT,
        acceptance_criteria TEXT,
        attempts INTEGER DEFAULT 0,
        max_attempts INTEGER DEFAULT 5,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Events table (event sourcing log)
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task_id TEXT NOT NULL,
        type TEXT NOT NULL,
        data TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (task_id) REFERENCES tasks(id)
      )
    `);

    // Dependencies table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS dependencies (
        task_id TEXT NOT NULL,
        depends_on_task_id TEXT NOT NULL,
        PRIMARY KEY (task_id, depends_on_task_id),
        FOREIGN KEY (task_id) REFERENCES tasks(id),
        FOREIGN KEY (depends_on_task_id) REFERENCES tasks(id)
      )
    `);

    // Evidence table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS evidence (
        task_id TEXT PRIMARY KEY,
        bundle TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (task_id) REFERENCES tasks(id)
      )
    `);

    // Indexes
    this.db.exec(`CREATE INDEX IF NOT EXISTS idx_events_task ON events(task_id)`);
    this.db.exec(`CREATE INDEX IF NOT EXISTS idx_events_type ON events(type)`);
    this.db.exec(`CREATE INDEX IF NOT EXISTS idx_tasks_phase ON tasks(phase)`);
    this.db.exec(`CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status)`);
  }

  /**
   * Create a new task
   */
  createTask(input: CreateTaskInput): Task {
    const validated = validateCreateTask(input);
    const taskId = this.generateTaskId(validated.phase);

    const insert = this.db.prepare(`
      INSERT INTO tasks (
        id, title, description, phase, size, dependencies,
        assigned_agent, acceptance_criteria, status, attempts, max_attempts
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', 0, 5)
    `);

    insert.run(
      taskId,
      validated.title,
      validated.description ?? null,
      validated.phase,
      validated.size ?? null,
      JSON.stringify(validated.dependencies),
      validated.assignedAgent ?? null,
      validated.acceptanceCriteria ? JSON.stringify(validated.acceptanceCriteria) : null,
    );

    // Log event
    this.logEvent(taskId, 'task_created', {
      title: validated.title,
      phase: validated.phase,
      assignedAgent: validated.assignedAgent,
    });

    // Add dependencies
    for (const depId of validated.dependencies ?? []) {
      this.addDependency(taskId, depId);
    }

    return this.getTask(taskId)!;
  }

  /**
   * Get a task by ID
   */
  getTask(taskId: string): Task | null {
    validateTaskId(taskId);
    const row = this.db.prepare('SELECT * FROM tasks WHERE id = ?').get(taskId) as
      | TaskRow
      | undefined;

    if (!row) return null;
    return this.rowToTask(row);
  }

  /**
   * Update a task
   */
  updateTask(taskId: string, input: UpdateTaskInput): Task {
    validateTaskId(taskId);
    const validated = validateUpdateTask(input);
    const existing = this.getTask(taskId);

    if (!existing) {
      throw new Error(`Task ${taskId} not found`);
    }

    const updates: string[] = [];
    const values: unknown[] = [];

    if (validated.status !== undefined) {
      updates.push('status = ?');
      values.push(validated.status);

      // Log status change event
      this.logEvent(taskId, `task_${validated.status}` as TaskStatus, {
        previousStatus: existing.status,
        newStatus: validated.status,
      });
    }

    if (validated.assignedAgent !== undefined) {
      updates.push('assigned_agent = ?');
      values.push(validated.assignedAgent);
      this.logEvent(taskId, 'agent_assigned', {
        agent: validated.assignedAgent,
      });
    }

    if (validated.title !== undefined) {
      updates.push('title = ?');
      values.push(validated.title);
    }

    if (validated.description !== undefined) {
      updates.push('description = ?');
      values.push(validated.description);
    }

    updates.push('updated_at = CURRENT_TIMESTAMP');

    if (updates.length > 1) {
      const sql = `UPDATE tasks SET ${updates.join(', ')} WHERE id = ?`;
      values.push(taskId);
      this.db.prepare(sql).run(...values);
    }

    return this.getTask(taskId)!;
  }

  /**
   * Query tasks
   */
  queryTasks(query: TaskQuery = {}): Task[] {
    const validated = validateTaskQuery(query);
    const conditions: string[] = [];
    const values: unknown[] = [];

    if (validated.status) {
      conditions.push('status = ?');
      values.push(validated.status);
    }

    if (validated.phase) {
      conditions.push('phase = ?');
      values.push(validated.phase);
    }

    if (validated.assignedAgent) {
      conditions.push('assigned_agent = ?');
      values.push(validated.assignedAgent);
    }

    let sql = 'SELECT * FROM tasks';
    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }
    sql += ' ORDER BY phase, created_at LIMIT ? OFFSET ?';
    values.push(validated.limit, validated.offset);

    const rows = this.db.prepare(sql).all(...values) as TaskRow[];
    return rows.map((row) => this.rowToTask(row));
  }

  /**
   * Get current phase
   */
  getCurrentPhase(): number {
    const row = this.db
      .prepare("SELECT MAX(phase) as max_phase FROM tasks WHERE status = 'in_progress'")
      .get() as { max_phase: number | null };
    return row.max_phase ?? 1;
  }

  /**
   * Get next task in queue
   */
  getNextTask(): Task | null {
    const currentPhase = this.getCurrentPhase();
    const tasks = this.queryTasks({
      phase: currentPhase,
      status: 'pending',
      limit: 1,
    });

    return tasks[0] ?? null;
  }

  /**
   * Increment attempt counter
   */
  incrementAttempt(taskId: string): Task {
    validateTaskId(taskId);
    this.db.prepare('UPDATE tasks SET attempts = attempts + 1 WHERE id = ?').run(taskId);
    return this.getTask(taskId)!;
  }

  /**
   * Check if task has failed too many times
   */
  isTaskBlocked(taskId: string): boolean {
    const task = this.getTask(taskId);
    return task ? task.attempts >= task.maxAttempts : false;
  }

  /**
   * Add dependency between tasks
   */
  addDependency(taskId: string, dependsOnTaskId: string): void {
    validateTaskId(taskId);
    validateTaskId(dependsOnTaskId);

    if (taskId === dependsOnTaskId) {
      throw new Error('Task cannot depend on itself');
    }

    // Check for circular dependency
    if (this.isCircularDependency(taskId, dependsOnTaskId)) {
      throw new Error('Circular dependency detected');
    }

    this.db
      .prepare('INSERT OR IGNORE INTO dependencies (task_id, depends_on_task_id) VALUES (?, ?)')
      .run(taskId, dependsOnTaskId);

    this.logEvent(taskId, 'dependency_added', {
      dependsOn: dependsOnTaskId,
    });
  }

  /**
   * Check if task is blocked by dependencies
   */
  isBlockedByDependencies(taskId: string): boolean {
    const deps = this.getDependencies(taskId);
    for (const depId of deps) {
      const dep = this.getTask(depId);
      if (dep && dep.status !== 'completed') {
        return true;
      }
    }
    return false;
  }

  /**
   * Get task dependencies
   */
  getDependencies(taskId: string): string[] {
    validateTaskId(taskId);
    const rows = this.db
      .prepare('SELECT depends_on_task_id FROM dependencies WHERE task_id = ?')
      .all(taskId) as { depends_on_task_id: string }[];
    return rows.map((row) => row.depends_on_task_id);
  }

  /**
   * Log an event
   */
  logEvent(taskId: string, type: EventType | string, data: Record<string, unknown>): TaskEvent {
    validateTaskId(taskId);
    const insert = this.db.prepare('INSERT INTO events (task_id, type, data) VALUES (?, ?, ?)');
    const result = insert.run(taskId, type, JSON.stringify(data));

    return {
      id: result.lastInsertRowid.toString(),
      taskId,
      type: type as EventType,
      data,
      timestamp: new Date(),
    };
  }

  /**
   * Get events for a task
   */
  getTaskEvents(taskId: string): TaskEvent[] {
    validateTaskId(taskId);
    const rows = this.db
      .prepare('SELECT * FROM events WHERE task_id = ? ORDER BY timestamp DESC')
      .all(taskId) as EventRow[];

    return rows.map((row) => ({
      id: row.id.toString(),
      taskId: row.task_id,
      type: row.type as EventType,
      data: JSON.parse(row.data ?? '{}'),
      timestamp: new Date(row.timestamp),
    }));
  }

  /**
   * Store evidence bundle
   */
  storeEvidence(taskId: string, bundle: EvidenceBundle): void {
    validateTaskId(taskId);
    this.db
      .prepare('INSERT OR REPLACE INTO evidence (task_id, bundle) VALUES (?, ?)')
      .run(taskId, JSON.stringify(bundle));

    this.logEvent(taskId, 'evidence_generated', {
      gatesPassed: Object.values(bundle.gates).filter((g) => g.passed).length,
      coverage: bundle.testResults.coverage,
    });
  }

  /**
   * Get evidence bundle
   */
  getEvidence(taskId: string): EvidenceBundle | null {
    validateTaskId(taskId);
    const row = this.db.prepare('SELECT bundle FROM evidence WHERE task_id = ?').get(taskId) as
      | { bundle: string }
      | undefined;

    if (!row) return null;
    return JSON.parse(row.bundle) as EvidenceBundle;
  }

  /**
   * Close database connection
   */
  close(): void {
    this.db.close();
  }

  private generateTaskId(phase: number): string {
    const count = this.db
      .prepare('SELECT COUNT(*) as count FROM tasks WHERE phase = ?')
      .get(phase) as { count: number };
    return `T-${phase}.${count.count + 1}`;
  }

  private isCircularDependency(taskId: string, dependsOnId: string): boolean {
    const visited = new Set<string>();
    const stack = [dependsOnId];

    while (stack.length > 0) {
      const current = stack.pop()!;
      if (current === taskId) return true;
      if (visited.has(current)) continue;
      visited.add(current);

      const deps = this.getDependencies(current);
      stack.push(...deps);
    }

    return false;
  }

  private rowToTask(row: TaskRow): Task {
    return {
      id: row.id,
      title: row.title,
      description: row.description ?? undefined,
      status: row.status as TaskStatus,
      phase: row.phase,
      size: (row.size as TaskSize) ?? undefined,
      dependencies: JSON.parse(row.dependencies ?? '[]'),
      assignedAgent: row.assigned_agent ?? undefined,
      acceptanceCriteria: row.acceptance_criteria ? JSON.parse(row.acceptance_criteria) : undefined,
      attempts: row.attempts,
      maxAttempts: row.max_attempts,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    };
  }
}

// Database row types
interface TaskRow {
  id: string;
  title: string;
  description: string | null;
  status: string;
  phase: number;
  size: string | null;
  dependencies: string;
  assigned_agent: string | null;
  acceptance_criteria: string | null;
  attempts: number;
  max_attempts: number;
  created_at: string;
  updated_at: string;
}

interface EventRow {
  id: number;
  task_id: string;
  type: string;
  data: string | null;
  timestamp: string;
}
