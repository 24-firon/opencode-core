---
name: angular-analyzer
description: Reconnaissance rules for analyzing Angular repositories. DO NOT modify code.
---

# Reconnaissance Protocol: angular-analyzer

Validiert Enterprise-Frontends über die `angular.json` Konfigurationsdatei. Zeigt dem Agenten, wie er `src/app/` nach Modulen (`*.module.ts`) und Komponenten durchsucht, um die Dependency-Injection-Graphen aufzuzeigen. Sperrt `.angular/` und `dist/` aus.

## CRITICAL DIRECTIVES
1. **NO MUTATION:** This is a reconnaissance-only skill. Do NOT write, modify, delete, or refactor any code.
2. **CONTEXT PROTECTION:** Strictly adhere to the ignored directories (Black Holes) to prevent LLM context exhaustion.
3. **REPORTING:** Extract the architectural topology and report back to the Orchestrator Node.
