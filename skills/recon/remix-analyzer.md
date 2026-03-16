---
name: remix-analyzer
description: Reconnaissance rules for analyzing Remix repositories. DO NOT modify code.
---

# Reconnaissance Protocol: remix-analyzer

Greift nach `remix.config.js` oder Vite-Plugins, um das Remix-Framework zu identifizieren. Leitet den Agenten gezielt in `app/routes/`, um Nested Routing und Loader/Action-Logiken zu extrahieren. Schützt den Kontext vor Build- und Cache-Ordnern.

## CRITICAL DIRECTIVES
1. **NO MUTATION:** This is a reconnaissance-only skill. Do NOT write, modify, delete, or refactor any code.
2. **CONTEXT PROTECTION:** Strictly adhere to the ignored directories (Black Holes) to prevent LLM context exhaustion.
3. **REPORTING:** Extract the architectural topology and report back to the Orchestrator Node.
