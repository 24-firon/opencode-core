/**
 * Tier 2: Advanced Router Swarm - Agent Inbox Queue
 * SQLite-based message queue for async inter-agent communication
 * Uses better-sqlite3 with WAL mode for high concurrency
 */

import type Database from 'better-sqlite3';
import type { Job, JobPayload, JobResult } from './types.js';

export class AgentInboxQueue {
  private claimStmt: Database.Statement;
  private completeStmt: Database.Statement;
  private failStmt: Database.Statement;
  private isPolling = false;
  private intervalId?: NodeJS.Timeout;

  constructor(private db: Database.Database) {
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
        locked_at DATETIME,
        attempts INTEGER DEFAULT 0
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
      `INSERT INTO agent_inbox (id, target_agent, payload) VALUES (?, ?, ?)`,
    );
    stmt.run(id, targetAgent, JSON.stringify(payload));
  }

  public startWorker(
    agentName: string,
    processor: (payload: JobPayload) => Promise<unknown>,
  ): void {
    this.isPolling = true;

    // 50ms polling loop
    this.intervalId = setInterval(async () => {
      if (!this.isPolling) return;

      // Atomically claim the next job for this specific agent
      const job = this.claimStmt.get(agentName) as Job | undefined;

      if (job) {
        // Pause polling while processing
        this.isPolling = false;

        try {
          const parsedPayload = JSON.parse(job.payload) as JobPayload;
          const result = await processor(parsedPayload);
          const resultObj: JobResult = { success: true, data: result };
          this.completeStmt.run(JSON.stringify(resultObj), job.id);
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : String(error);
          const resultObj: JobResult = { success: false, error: errorMsg };
          this.failStmt.run(JSON.stringify(resultObj), job.id);
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

  /**
   * Cleans up jobs that have been stuck in 'processing' state.
   * Resets jobs below maxRetries, moves exhausted jobs to 'dead'.
   */
  public recoverStuckJobs(timeoutSeconds: number, maxRetries = 3): void {
    const cleanupTransaction = this.db.transaction(() => {
      const moveToDlqStmt = this.db.prepare(`
        UPDATE agent_inbox 
        SET status = 'dead'
        WHERE status = 'processing' 
          AND locked_at < datetime('now', ?) 
          AND attempts >= ?
      `);
      const dlqResult = moveToDlqStmt.run(`-${timeoutSeconds} seconds`, maxRetries);

      const resetStmt = this.db.prepare(`
        UPDATE agent_inbox 
        SET status = 'pending', locked_at = NULL, attempts = attempts + 1
        WHERE status = 'processing' 
          AND locked_at < datetime('now', ?)
      `);
      const resetResult = resetStmt.run(`-${timeoutSeconds} seconds`);

      return { dead: dlqResult.changes, reset: resetResult.changes };
    });

    const result = cleanupTransaction();
    if (result.dead > 0 || result.reset > 0) {
      console.log(`Queue Cleanup: ${result.reset} reset, ${result.dead} moved to DLQ`);
    }
  }

  public close(): void {
    this.stopWorker();
  }
}
