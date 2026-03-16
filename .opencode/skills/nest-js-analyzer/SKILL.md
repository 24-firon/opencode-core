---
name: nest-js-analyzer
description: Reconnaissance rules for analyzing Nest repositories. DO NOT modify code.
---

# Reconnaissance Protocol: nest-js-analyzer

Erkennt Backend-for-Frontend oder reine APIs über `nest-cli.json`. Analysiert `src/main.ts` und verfolgt `@Module` Deklarationen, um Controller und Provider zu mappen. Blockiert das Lesen von `dist/` und kompilierten TypeScript-Artefakten.

## CRITICAL DIRECTIVES
1. **NO MUTATION:** This is a reconnaissance-only skill. Do NOT write, modify, delete, or refactor any code.
2. **CONTEXT PROTECTION:** Strictly adhere to the ignored directories (Black Holes) to prevent LLM context exhaustion.
3. **REPORTING:** Extract the architectural topology and report back to the Orchestrator Node.
