---
name: flyway-analyzer
description: Reconnaissance rules for analyzing Flyway repositories. DO NOT modify code.
---

# Reconnaissance Protocol: flyway-analyzer

Identifiziert Flyway in Java/Generischen-Setups durch `src/main/resources/db/migration/`. Liest nur die Dateinamen (`V1__...sql`), um den Migrationspfad zu verstehen, ohne jede einzelne SQL-Zeile zu parsen.

## CRITICAL DIRECTIVES
1. **NO MUTATION:** This is a reconnaissance-only skill. Do NOT write, modify, delete, or refactor any code.
2. **CONTEXT PROTECTION:** Strictly adhere to the ignored directories (Black Holes) to prevent LLM context exhaustion.
3. **REPORTING:** Extract the architectural topology and report back to the Orchestrator Node.
