---
name: github-actions-analyzer
description: Reconnaissance rules for analyzing Github repositories. DO NOT modify code.
---

# Reconnaissance Protocol: github-actions-analyzer

Scannt das `.github/workflows/`-Verzeichnis nach YAML-Dateien. Extrahiert Trigger (`on:`), benötigte Secrets und Build-Steps für die CI/CD-Pipeline. Vermeidet Änderungen an produktiven Deploy-Skripten.

## CRITICAL DIRECTIVES
1. **NO MUTATION:** This is a reconnaissance-only skill. Do NOT write, modify, delete, or refactor any code.
2. **CONTEXT PROTECTION:** Strictly adhere to the ignored directories (Black Holes) to prevent LLM context exhaustion.
3. **REPORTING:** Extract the architectural topology and report back to the Orchestrator Node.
