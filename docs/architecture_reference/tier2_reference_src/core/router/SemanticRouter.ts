/**
 * Tier 2: Advanced Router Swarm - Semantic Router
 * Local intent classification and dynamic prompt assembly
 * Uses Transformers.js (ONNX) + Handlebars for MVI pattern
 */

import { cos_sim, pipeline } from '@xenova/transformers';
import type { FeatureExtractionPipeline } from '@xenova/transformers';
import Handlebars from 'handlebars';

export interface RouteBlueprint {
  id: string;
  utterances: string[];
  template: string;
}

export interface MVIContext {
  query: string;
  ast_nodes?: Array<{ type: string; content: string }>;
  tools?: string;
  linter_errors?: string[];
  ui_framework?: string;
  [key: string]: unknown;
}

export class SemanticRouter {
  private extractor: FeatureExtractionPipeline | null = null;
  private routeEmbeddings = new Map<string, number[]>();
  private blueprints = new Map<string, RouteBlueprint>();

  constructor(blueprints: RouteBlueprint[]) {
    for (const bp of blueprints) {
      this.blueprints.set(bp.id, bp);
    }
  }

  /**
   * Initialize the ONNX model and pre-compute route embeddings
   */
  public async initialize(): Promise<void> {
    // Load quantized ONNX model locally (~90MB, no API costs)
    this.extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', {
      quantized: true,
    });

    // Pre-compute embeddings for all utterances
    for (const blueprint of this.blueprints.values()) {
      const textToEmbed = blueprint.utterances.join('. ');
      const output = await this.extractor(textToEmbed, {
        pooling: 'mean',
        normalize: true,
      });

      // Convert Float32Array to standard Array
      this.routeEmbeddings.set(blueprint.id, Array.from(output.data as Float32Array));
    }

    console.log(`Router initialized with ${this.blueprints.size} routes`);
  }

  /**
   * Route user input to best matching blueprint (< 15ms execution)
   */
  public async route(userInput: string): Promise<string> {
    if (!this.extractor) {
      throw new Error('Router not initialized. Call initialize() first.');
    }

    const queryOutput = await this.extractor(userInput, {
      pooling: 'mean',
      normalize: true,
    });

    const queryEmbedding = Array.from(queryOutput.data as Float32Array);

    let bestMatchId = '';
    let highestSimilarity = -1;

    for (const [id, embedding] of this.routeEmbeddings.entries()) {
      const similarity = cos_sim(queryEmbedding, embedding);
      if (similarity > highestSimilarity) {
        highestSimilarity = similarity;
        bestMatchId = id;
      }
    }

    // Threshold fallback
    if (highestSimilarity < 0.6) {
      console.warn(`Low confidence routing (${highestSimilarity.toFixed(2)}), using fallback`);
      return 'general_agent';
    }

    console.log(`Routed to "${bestMatchId}" with confidence ${highestSimilarity.toFixed(2)}`);
    return bestMatchId;
  }

  /**
   * Assemble prompt from blueprint with MVI (Minimum Viable Information)
   */
  public assemblePrompt(blueprintId: string, mviData: MVIContext): string {
    const blueprint = this.blueprints.get(blueprintId);
    if (!blueprint) {
      throw new Error(`Blueprint "${blueprintId}" not found`);
    }

    // Compile Handlebars template with strict mode
    const render = Handlebars.compile(blueprint.template, { strict: true });
    return render(mviData);
  }

  /**
   * Get all registered route IDs
   */
  public getRouteIds(): string[] {
    return Array.from(this.blueprints.keys());
  }
}
