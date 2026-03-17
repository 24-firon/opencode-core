/**
 * Tier 2: Advanced Router Swarm - Orchestration Database Init
 * SQLite storage setup for XState actor snapshots
 */

import type { Database, Statement } from 'better-sqlite3';

export interface StateDbStatements {
  saveStateStmt: Statement;
  loadStateStmt: Statement;
  deleteStateStmt: Statement;
}

export function initStateDb(db: Database): StateDbStatements {
  db.exec(`
    CREATE TABLE IF NOT EXISTS actor_states (
      actor_id TEXT PRIMARY KEY,
      state_json TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  return {
    saveStateStmt: db.prepare(`
      INSERT INTO actor_states (actor_id, state_json, updated_at)
      VALUES (?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(actor_id) DO UPDATE SET
        state_json = excluded.state_json,
        updated_at = CURRENT_TIMESTAMP;
    `),
    loadStateStmt: db.prepare(`SELECT state_json FROM actor_states WHERE actor_id = ?`),
    deleteStateStmt: db.prepare(`DELETE FROM actor_states WHERE actor_id = ?`),
  };
}
