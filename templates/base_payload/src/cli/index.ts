#!/usr/bin/env node
/**
 * Tier 3 Base Swarm - CLI Orchestrator
 * Simple command-line interface for the Base Swarm system
 */

import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { HiveAPI } from '../hive/index.js';
import { VectorMemory } from '../hivemind/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, '../..');

// Configuration
const config = {
  dbPath: join(ROOT_DIR, '.hive/event-log.sqlite'),
  vectorDbPath: join(ROOT_DIR, '.hivemind/memory.sqlite'),
  ollamaEndpoint: process.env.OLLAMA_HOST || 'http://127.0.0.1:11441',
  model: 'nomic-embed-text',
  compactionModel: 'phi3:3.8b',
};

class SwarmCLI {
  private hive: HiveAPI;
  private memory?: VectorMemory;

  constructor() {
    this.hive = new HiveAPI(config.dbPath);

    // Try to initialize memory (may fail if Ollama not running)
    try {
      this.memory = new VectorMemory(config.vectorDbPath, {
        endpoint: config.ollamaEndpoint,
        model: config.model,
      });
    } catch {
      console.warn('⚠️ VectorMemory not available (Ollama may not be running)');
    }
  }

  /**
   * Plan command: Create tasks from user input
   */
  async plan(description: string): Promise<void> {
    console.log('🧠 Planning tasks...\n');
    console.log(`User request: "${description}"`);

    // Simple task decomposition (in production, this would call an LLM)
    const tasks = this.decomposeTask(description);

    // Create tasks in Hive
    const createdTasks: string[] = [];
    for (const task of tasks) {
      const created = this.hive.createTask({
        title: task.title,
        description: task.description,
        phase: 1,
        size: task.size,
        assignedAgent: task.assignedAgent,
      });
      createdTasks.push(created.id);
      console.log(`✅ Created task: ${created.id} - ${created.title}`);
    }

    // Add dependencies if multiple tasks
    if (createdTasks.length > 1) {
      for (let i = 1; i < createdTasks.length; i++) {
        this.hive.addDependency(createdTasks[i], createdTasks[i - 1]);
        console.log(`🔗 Added dependency: ${createdTasks[i]} depends on ${createdTasks[i - 1]}`);
      }
    }

    // Update projection
    await this.updatePlan();

    console.log(`\n📋 Plan created with ${createdTasks.length} task(s)`);
    console.log('📄 Check .swarm/plan.md for details');
    console.log('\nNext step: Run `node dist/cli/index.js execute` to start execution');
  }

  /**
   * Execute command: Run pending tasks
   */
  async execute(): Promise<void> {
    console.log('🚀 Starting execution...\n');

    // Get next pending task
    const nextTask = this.hive.getNextTask();

    if (!nextTask) {
      console.log('✅ No pending tasks. All work completed!');
      return;
    }

    console.log(`📋 Executing: ${nextTask.id} - ${nextTask.title}`);
    console.log(`👤 Assigned to: ${nextTask.assignedAgent || 'unassigned'}`);

    // Update status
    this.hive.updateTask(nextTask.id, { status: 'in_progress' });

    // Check for similar patterns in memory
    if (this.memory) {
      const similar = await this.memory.findSimilar(nextTask.title, 2);
      if (similar.length > 0 && similar[0].similarity > 0.8) {
        console.log(`💡 Found similar pattern: "${similar[0].content.substring(0, 60)}..."`);
      }
    }

    // Simulate work (in production, this would spawn the actual agent)
    console.log('\n🤖 Agent working...');
    await this.simulateAgentWork(nextTask);

    // Run QA gates
    console.log('\n🔍 Running QA gates...');
    const gateResult = await this.runQAGates(nextTask);

    if (gateResult.passed) {
      console.log('✅ All gates passed!');
      this.hive.updateTask(nextTask.id, { status: 'completed' });

      // Store learning
      if (this.memory) {
        await this.memory.storeLearning(
          nextTask.id,
          `Successfully completed: ${nextTask.title}. ${nextTask.description || ''}`,
          nextTask.tags || ['general'],
          'success',
        );
      }
    } else {
      console.log('❌ Gates failed:', gateResult.errors.join(', '));
      this.hive.updateTask(nextTask.id, { status: 'blocked' });

      // Increment attempt
      this.hive.incrementAttempt(nextTask.id);

      if (this.hive.isTaskBlocked(nextTask.id)) {
        console.log('🚫 Task blocked after max attempts. Manual intervention required.');
      } else {
        console.log('🔄 Task failed. Will retry on next execution.');
      }
    }

    // Update projection
    await this.updatePlan();

    console.log('\n📄 Updated .swarm/plan.md');
  }

  /**
   * Status command: Show current state
   */
  status(): void {
    console.log('📊 Swarm Status\n');

    const currentPhase = this.hive.getCurrentPhase();
    console.log(`Current Phase: ${currentPhase}`);

    const tasks = this.hive.queryTasks({ phase: currentPhase });
    const status = { pending: 0, in_progress: 0, completed: 0, blocked: 0 };

    for (const task of tasks) {
      status[task.status as keyof typeof status]++;
    }

    console.log(`Tasks in phase ${currentPhase}:`);
    console.log(`  Pending: ${status.pending}`);
    console.log(`  In Progress: ${status.in_progress}`);
    console.log(`  Completed: ${status.completed}`);
    console.log(`  Blocked: ${status.blocked}`);

    if (this.memory) {
      const stats = this.memory.getStats();
      console.log(`\n🧠 Memory Stats:`);
      console.log(`  Total learnings: ${stats.total}`);
      console.log(`  Success rate: ${(stats.successRate * 100).toFixed(1)}%`);
    }
  }

  /**
   * Update plan projection
   */
  private async updatePlan(): Promise<void> {
    const generatePlanScript = join(ROOT_DIR, '.opencode/scripts/generate-plan.js');
    if (existsSync(generatePlanScript)) {
      return new Promise((resolve, reject) => {
        const child = spawn('node', [generatePlanScript], {
          cwd: ROOT_DIR,
          stdio: 'inherit',
        });
        child.on('close', (code) => {
          if (code === 0) resolve();
          else reject(new Error(`generate-plan.js exited with code ${code}`));
        });
      });
    }
  }

  /**
   * Simple task decomposition (mock - in production calls LLM)
   */
  private decomposeTask(description: string): Array<{
    title: string;
    description?: string;
    size: 'tiny' | 'small' | 'medium' | 'large' | 'epic';
    assignedAgent?: string;
  }> {
    // Simple heuristic decomposition
    const tasks: Array<{
      title: string;
      description?: string;
      size: 'tiny' | 'small' | 'medium' | 'large' | 'epic';
      assignedAgent?: string;
    }> = [];

    if (
      description.toLowerCase().includes('database') ||
      description.toLowerCase().includes('db')
    ) {
      tasks.push({
        title: 'Setup database schema',
        description: 'Create tables and relationships',
        size: 'medium',
        assignedAgent: 'coder',
      });
    }

    if (
      description.toLowerCase().includes('ui') ||
      description.toLowerCase().includes('frontend')
    ) {
      tasks.push({
        title: 'Create UI components',
        description: 'Build frontend interface',
        size: 'medium',
        assignedAgent: 'coder',
      });
    }

    if (tasks.length === 0) {
      tasks.push({
        title: 'Implement feature',
        description: description,
        size: 'small',
        assignedAgent: 'coder',
      });
    }

    return tasks;
  }

  /**
   * Simulate agent work
   */
  private async simulateAgentWork(task: any): Promise<void> {
    return new Promise((resolve) => {
      console.log('  Working...');
      setTimeout(() => {
        console.log('  ✓ Work completed');
        resolve();
      }, 1000);
    });
  }

  /**
   * Run QA gates via MCP server
   */
  private async runQAGates(task: any): Promise<{ passed: boolean; errors: string[] }> {
    // In production, this would call the MCP server
    // For now, simulate success
    return { passed: true, errors: [] };
  }
}

// CLI entry point
async function main() {
  const cli = new SwarmCLI();
  const [command, ...args] = process.argv.slice(2);

  try {
    switch (command) {
      case 'plan':
        if (!args[0]) {
          console.error('Usage: plan "description of work"');
          process.exit(1);
        }
        await cli.plan(args.join(' '));
        break;

      case 'execute':
        await cli.execute();
        break;

      case 'status':
        cli.status();
        break;

      default:
        console.log('Tier 3 Base Swarm CLI\n');
        console.log('Commands:');
        console.log('  plan "<description>"  - Create a plan from description');
        console.log('  execute             - Execute next pending task');
        console.log('  status              - Show current status');
        console.log('\nExamples:');
        console.log('  node dist/cli/index.js plan "Build a login system with JWT"');
        console.log('  node dist/cli/index.js execute');
    }
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  } finally {
    cli['hive'].close();
    cli['memory']?.close();
  }
}

main();
