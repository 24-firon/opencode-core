---
name: jupyter-notebook-analyzer
description: Reconnaissance rules for analyzing Jupyter repositories. DO NOT modify code.
---

# Reconnaissance Protocol: jupyter-notebook-analyzer

Lehrt den Agenten, dass `*.ipynb` Dateien rohes JSON sind. Erlaubt nur das Auslesen der 'source'-Arrays (Python-Code) und verbietet das Parsen von 'outputs', um Base64-codierte Bilder nicht in den LLM-Kontext zu laden.

## CRITICAL DIRECTIVES
1. **NO MUTATION:** This is a reconnaissance-only skill. Do NOT write, modify, delete, or refactor any code.
2. **CONTEXT PROTECTION:** Strictly adhere to the ignored directories (Black Holes) to prevent LLM context exhaustion.
3. **REPORTING:** Extract the architectural topology and report back to the Orchestrator Node.
