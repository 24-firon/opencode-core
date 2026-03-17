#!/usr/bin/env node
/**
 * Projection Script: Generate .swarm/plan.md from .hive/ events
 *
 * This script is the SINGLE SOURCE OF TRUTH (SSoT) for plan state.
 * Agents MUST NOT manually edit .swarm/plan.md
 * Instead, they emit events to .hive/ and this script regenerates the projection.
 */

import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import Database from 'better-sqlite3';

const __dirname = dirname(fileURLToPath(import.meta.url));
const HIVE_DB = join(__dirname, '../../.hive/event-log.sqlite');
const PLAN_MD = join(__dirname, '../../.swarm/plan.md');
const CONTEXT_MD = join(__dirname, '../../.swarm/context.md');

async function generatePlan() {
  // Ensure directories exist
  if (!existsSync(dirname(PLAN_MD))) {
    mkdirSync(dirname(PLAN_MD), { recursive: true });
  }
  if (!existsSync(dirname(HIVE_DB))) {
    mkdirSync(dirname(HIVE_DB), { recursive: true });
  }

  // Initialize DB if needed
  const db = new Database(HIVE_DB);

  db.exec(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task_id TEXT NOT NULL,
      type TEXT NOT NULL,
      data TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT DEFAULT 'pending',
      phase INTEGER DEFAULT 1,
      dependencies TEXT,
      assigned_agent TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE INDEX IF NOT EXISTS idx_events_task ON events(task_id);
    CREATE INDEX IF NOT EXISTS idx_events_type ON events(type);
    CREATE INDEX IF NOT EXISTS idx_tasks_phase ON tasks(phase);
    CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
  `);

  // Query current state
  const tasks = db.prepare('SELECT * FROM tasks ORDER BY phase, created_at').all();
  const currentPhase =
    db.prepare('SELECT MAX(phase) as phase FROM tasks WHERE status = ?').get('in_progress')
      ?.phase || 1;

  // Generate plan.md
  const planContent = generatePlanMarkdown(tasks, currentPhase);
  writeFileSync(PLAN_MD, planContent, 'utf-8');

  // Generate context.md (decisions & SME guidance)
  const contextContent = generateContextMarkdown(db);
  writeFileSync(CONTEXT_MD, contextContent, 'utf-8');

  db.close();

  console.log(`✓ Generated ${PLAN_MD}`);
  console.log(`✓ Generated ${CONTEXT_MD}`);
}

function generatePlanMarkdown(tasks, currentPhase) {
  const phases = groupBy(tasks, 'phase');

  let md = '# Project Plan\n\n';
  md += `**Current Phase**: ${currentPhase}\n\n`;
  md += `**Last Updated**: ${new Date().toISOString()}\n\n`;
  md += '**SSoT**: This file is auto-generated from .hive/ events.\n\n';
  md += '**DO NOT EDIT MANUALLY**\n\n';
  md += '---\n\n';

  for (const [phaseNum, phaseTasks] of Object.entries(phases)) {
    const phaseStatus = determinePhaseStatus(phaseTasks);
    md += `## Phase ${phaseNum}: ${phaseStatus}\n\n`;

    for (const task of phaseTasks) {
      const statusEmoji = getStatusEmoji(task.status);
      const currentMarker = task.status === 'in_progress' ? ' ← CURRENT' : '';
      md += `- [${statusEmoji}] **Task ${task.id}**: ${task.title} [${task.assigned_agent || 'unassigned'}]${currentMarker}\n`;

      if (task.description) {
        md += `  - ${task.description}\n`;
      }

      if (task.dependencies) {
        md += `  - *Depends on*: ${task.dependencies}\n`;
      }

      md += '\n';
    }

    md += '\n';
  }

  return md;
}

function generateContextMarkdown(db) {
  const decisions = db
    .prepare(`
    SELECT * FROM events 
    WHERE type IN ('decision', 'sme_guidance') 
    ORDER BY timestamp DESC
  `)
    .all();

  let md = '# Project Context\n\n';
  md += '**Decisions & SME Guidance** (cached, never re-asked)\n\n';
  md += '---\n\n';

  for (const event of decisions) {
    const data = JSON.parse(event.data || '{}');
    md += `## ${event.type === 'decision' ? 'Decision' : 'SME Guidance'} (${event.timestamp})\n\n`;
    md += `${data.content || 'No details'}\n\n`;

    if (data.tags) {
      md += `*Tags*: ${data.tags}\n\n`;
    }

    md += '\n';
  }

  return md;
}

function groupBy(array, key) {
  return array.reduce((result, item) => {
    const group = item[key];
    result[group] = result[group] || [];
    result[group].push(item);
    return result;
  }, {});
}

function determinePhaseStatus(tasks) {
  if (tasks.every((t) => t.status === 'completed')) return '[COMPLETE]';
  if (tasks.some((t) => t.status === 'in_progress')) return '[IN PROGRESS]';
  return '[PENDING]';
}

function getStatusEmoji(status) {
  switch (status) {
    case 'completed':
      return 'x';
    case 'in_progress':
      return ' ';
    case 'blocked':
      return '!';
    case 'rejected':
      return 'x';
    default:
      return ' ';
  }
}

// Run if called directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generatePlan().catch(console.error);
}

export { generatePlan };
