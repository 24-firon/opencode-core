---
name: astro-analyzer
description: Reconnaissance rules for analyzing Astro repositories. DO NOT modify code.
---

# Reconnaissance Protocol: astro-analyzer

Analysiert Multi-Framework-Projekte basierend auf `astro.config.mjs`. Instruiert den Agenten, statische Routen in `src/pages/` zu lesen und die 'Islands Architecture' (React/Vue-Komponenten) zu kartieren. Verhindert das Auslesen des `dist/`-Verzeichnisses.

## CRITICAL DIRECTIVES
1. **NO MUTATION:** This is a reconnaissance-only skill. Do NOT write, modify, delete, or refactor any code.
2. **CONTEXT PROTECTION:** Strictly adhere to the ignored directories (Black Holes) to prevent LLM context exhaustion.
3. **REPORTING:** Extract the architectural topology and report back to the Orchestrator Node.
