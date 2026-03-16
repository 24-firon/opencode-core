---
name: alembic-analyzer
description: Reconnaissance rules for analyzing Alembic repositories. DO NOT modify code.
---

# Reconnaissance Protocol: alembic-analyzer

Erkennt Python-Migrationen an der `alembic.ini`. Scannt das `versions/`-Verzeichnis nur nach der historisch neuesten Datei, um den aktuellen Tabellen-Zustand zu extrapolieren. Verhindert das Auslesen der gesamten Migrations-Historie.

## CRITICAL DIRECTIVES
1. **NO MUTATION:** This is a reconnaissance-only skill. Do NOT write, modify, delete, or refactor any code.
2. **CONTEXT PROTECTION:** Strictly adhere to the ignored directories (Black Holes) to prevent LLM context exhaustion.
3. **REPORTING:** Extract the architectural topology and report back to the Orchestrator Node.
