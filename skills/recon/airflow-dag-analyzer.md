---
name: airflow-dag-analyzer
description: Reconnaissance rules for analyzing Airflow repositories. DO NOT modify code.
---

# Reconnaissance Protocol: airflow-dag-analyzer

Sucht das `dags/`-Verzeichnis in Python-Projekten. Extrahiert DAG-Instanziierungen und Operator-Abhängigkeiten (`>>`), um den Workflow-Graphen zu verstehen. Ignoriert Airflow-Logs und XCom-Daten.

## CRITICAL DIRECTIVES
1. **NO MUTATION:** This is a reconnaissance-only skill. Do NOT write, modify, delete, or refactor any code.
2. **CONTEXT PROTECTION:** Strictly adhere to the ignored directories (Black Holes) to prevent LLM context exhaustion.
3. **REPORTING:** Extract the architectural topology and report back to the Orchestrator Node.
