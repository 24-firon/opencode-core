---
name: react-vite-analyzer
description: Reconnaissance rules for analyzing React repositories. DO NOT modify code.
---

# Reconnaissance Protocol: react-vite-analyzer

Erkennt moderne React-SPAs über die `vite.config.ts`. Fokussiert die Analyse auf den Entrypoint `index.html` und den React-Baum ab `src/main.tsx`. Blockiert das Lesen von `dist/` und `node_modules/`, um reine Quellcode-Strukturen zu extrahieren.

## CRITICAL DIRECTIVES
1. **NO MUTATION:** This is a reconnaissance-only skill. Do NOT write, modify, delete, or refactor any code.
2. **CONTEXT PROTECTION:** Strictly adhere to the ignored directories (Black Holes) to prevent LLM context exhaustion.
3. **REPORTING:** Extract the architectural topology and report back to the Orchestrator Node.
