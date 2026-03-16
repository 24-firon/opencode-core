---
name: drizzle-orm-analyzer
description: Reconnaissance rules for analyzing Drizzle repositories. DO NOT modify code.
---

# Reconnaissance Protocol: drizzle-orm-analyzer

Sucht `drizzle.config.ts`, um Typescript-basierte ORMs zu erkennen. Verfolgt den dort deklarierten Schema-Pfad, um die Tabellendefinitionen auszulesen. Ignoriert generierte Migrations-SQL-Dateien.

## CRITICAL DIRECTIVES
1. **NO MUTATION:** This is a reconnaissance-only skill. Do NOT write, modify, delete, or refactor any code.
2. **CONTEXT PROTECTION:** Strictly adhere to the ignored directories (Black Holes) to prevent LLM context exhaustion.
3. **REPORTING:** Extract the architectural topology and report back to the Orchestrator Node.
