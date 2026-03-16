---
name: dbt-pipeline-analyzer
description: Reconnaissance rules for analyzing Dbt repositories. DO NOT modify code.
---

# Reconnaissance Protocol: dbt-pipeline-analyzer

Verifiziert Data-Engineering-Projekte über `dbt_project.yml`. Mappt SQL-Transformationen im `models/`-Verzeichnis und Makros. Sperrt `target/` und `dbt_packages/` aus dem Scan-Prozess aus.

## CRITICAL DIRECTIVES
1. **NO MUTATION:** This is a reconnaissance-only skill. Do NOT write, modify, delete, or refactor any code.
2. **CONTEXT PROTECTION:** Strictly adhere to the ignored directories (Black Holes) to prevent LLM context exhaustion.
3. **REPORTING:** Extract the architectural topology and report back to the Orchestrator Node.
