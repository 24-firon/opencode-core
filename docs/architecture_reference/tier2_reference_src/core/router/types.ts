/**
 * Tier 2: Advanced Router Swarm - Router Types
 * Type definitions for semantic routing and blueprints
 */

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
