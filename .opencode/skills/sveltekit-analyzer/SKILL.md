---
name: sveltekit-analyzer
description: Reconnaissance rules for analyzing Sveltekit repositories. DO NOT modify code.
---

# Reconnaissance Protocol: sveltekit-analyzer

Sucht nach `svelte.config.js` zur Bestätigung des Frameworks. Weist den Agenten an, das spezifische Ordner-Routing (`+page.svelte`, `+layout.svelte`) unter `src/routes/` zu parsen. Ignoriert `.svelte-kit/` vollständig, um Caching-Müll aus dem Kontext fernzuhalten.

## CRITICAL DIRECTIVES
1. **NO MUTATION:** This is a reconnaissance-only skill. Do NOT write, modify, delete, or refactor any code.
2. **CONTEXT PROTECTION:** Strictly adhere to the ignored directories (Black Holes) to prevent LLM context exhaustion.
3. **REPORTING:** Extract the architectural topology and report back to the Orchestrator Node.
