/**
 * Vector Memory Module (.hivemind)
 * Provider-agnostic embedding storage and retrieval
 * Works with Ollama (port 11434) or vLLM (port 8000) via OpenAI-compatible API
 */

import { existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import Database from 'better-sqlite3';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEFAULT_DB_PATH = join(__dirname, '../../.hivemind/memory.sqlite');

interface EmbeddingConfig {
  endpoint: string;
  model: string;
  apiKey?: string;
}

interface LearningAbstract {
  id: string;
  taskId: string;
  content: string;
  tags: string[];
  embedding: number[];
  outcome: 'success' | 'failure';
  createdAt: Date;
}

interface SimilarPattern {
  content: string;
  tags: string[];
  similarity: number;
  outcome: 'success' | 'failure';
}

export class VectorMemory {
  private db: Database.Database;
  private config: EmbeddingConfig;

  constructor(
    dbPath: string = DEFAULT_DB_PATH,
    config: EmbeddingConfig = {
      endpoint: 'http://127.0.0.1:11434/v1',
      model: 'nomic-embed-text',
    },
  ) {
    this.config = config;
    this.ensureDirectory(dbPath);
    this.db = new Database(dbPath);
    this.initSchema();
  }

  private ensureDirectory(dbPath: string): void {
    const dir = dirname(dbPath);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
  }

  private initSchema(): void {
    // Learning abstracts table with embeddings
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS learning_abstracts (
        id TEXT PRIMARY KEY,
        task_id TEXT NOT NULL,
        content TEXT NOT NULL,
        tags TEXT DEFAULT '[]',
        embedding TEXT NOT NULL,
        outcome TEXT NOT NULL CHECK(outcome IN ('success', 'failure')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Index for faster lookups by task
    this.db.exec(`
      CREATE INDEX IF NOT EXISTS idx_abstracts_task ON learning_abstracts(task_id)
    `);

    // Index for tags (simple JSON search)
    this.db.exec(`
      CREATE INDEX IF NOT EXISTS idx_abstracts_tags ON learning_abstracts(tags)
    `);
  }

  /**
   * Generate embedding via OpenAI-compatible API
   * Works with Ollama (http://127.0.0.1:11434/v1) or vLLM (http://127.0.0.1:8000/v1)
   */
  private async generateEmbedding(text: string): Promise<number[]> {
    const response = await fetch(`${this.config.endpoint}/embeddings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiKey && { Authorization: `Bearer ${this.config.apiKey}` }),
      },
      body: JSON.stringify({
        model: this.config.model,
        input: text,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Embedding API error: ${response.status} - ${error}`);
    }

    const data = (await response.json()) as { data: Array<{ embedding: number[] }> };
    return data.data[0].embedding;
  }

  /**
   * Store a learning abstract from a completed task
   */
  async storeLearning(
    taskId: string,
    content: string,
    tags: string[],
    outcome: 'success' | 'failure',
  ): Promise<LearningAbstract> {
    const id = `L-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Generate embedding
    const embedding = await this.generateEmbedding(content);

    const insert = this.db.prepare(`
      INSERT INTO learning_abstracts (id, task_id, content, tags, embedding, outcome)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    insert.run(id, taskId, content, JSON.stringify(tags), JSON.stringify(embedding), outcome);

    return {
      id,
      taskId,
      content,
      tags,
      embedding,
      outcome,
      createdAt: new Date(),
    };
  }

  /**
   * Find similar patterns based on semantic similarity
   */
  async findSimilar(query: string, limit = 5): Promise<SimilarPattern[]> {
    // Generate embedding for query
    const queryEmbedding = await this.generateEmbedding(query);

    // Get all abstracts (for small datasets, in-memory cosine similarity is fast enough)
    const rows = this.db
      .prepare('SELECT * FROM learning_abstracts ORDER BY created_at DESC LIMIT 1000')
      .all() as AbstractRow[];

    // Calculate cosine similarity for each
    const scored = rows.map((row) => {
      const embedding = JSON.parse(row.embedding) as number[];
      const similarity = this.cosineSimilarity(queryEmbedding, embedding);
      return {
        content: row.content,
        tags: JSON.parse(row.tags),
        similarity,
        outcome: row.outcome as 'success' | 'failure',
      };
    });

    // Sort by similarity (highest first) and return top N
    return scored.sort((a, b) => b.similarity - a.similarity).slice(0, limit);
  }

  /**
   * Find patterns by tags (exact match)
   */
  findByTags(tags: string[], limit = 10): SimilarPattern[] {
    const placeholders = tags.map(() => '?').join(',');
    const sql = `
      SELECT * FROM learning_abstracts 
      WHERE tags LIKE '%' || ? || '%'
      ORDER BY created_at DESC 
      LIMIT ?
    `;

    const results: SimilarPattern[] = [];
    for (const tag of tags) {
      const rows = this.db.prepare(sql).all(`%${tag}%`, limit) as AbstractRow[];
      results.push(
        ...rows.map((row) => ({
          content: row.content,
          tags: JSON.parse(row.tags),
          similarity: 1.0, // Exact tag match
          outcome: row.outcome as 'success' | 'failure',
        })),
      );
    }

    // Remove duplicates and return
    const seen = new Set<string>();
    return results.filter((r) => {
      if (seen.has(r.content)) return false;
      seen.add(r.content);
      return true;
    });
  }

  /**
   * Get stats about stored learnings
   */
  getStats(): { total: number; successRate: number; oldest: Date | null } {
    const totalRow = this.db.prepare('SELECT COUNT(*) as count FROM learning_abstracts').get() as {
      count: number;
    };
    const successRow = this.db
      .prepare("SELECT COUNT(*) as count FROM learning_abstracts WHERE outcome = 'success'")
      .get() as { count: number };
    const oldestRow = this.db
      .prepare('SELECT MIN(created_at) as oldest FROM learning_abstracts')
      .get() as { oldest: string | null };

    return {
      total: totalRow.count,
      successRate: totalRow.count > 0 ? successRow.count / totalRow.count : 0,
      oldest: oldestRow.oldest ? new Date(oldestRow.oldest) : null,
    };
  }

  /**
   * Clear old learnings (optional, for memory management)
   */
  clearOld(days: number): void {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    this.db
      .prepare('DELETE FROM learning_abstracts WHERE created_at < ?')
      .run(cutoff.toISOString());
  }

  /**
   * Close database connection
   */
  close(): void {
    this.db.close();
  }

  /**
   * Calculate cosine similarity between two vectors
   */
  private cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) {
      throw new Error('Vectors must have same length');
    }

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }

    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }
}

interface AbstractRow {
  id: string;
  task_id: string;
  content: string;
  tags: string;
  embedding: string;
  outcome: string;
  created_at: string;
}

export type { EmbeddingConfig, LearningAbstract, SimilarPattern };
