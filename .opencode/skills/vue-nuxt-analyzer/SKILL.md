---
name: vue-nuxt-analyzer
description: Reconnaissance rules for analyzing Vue repositories. DO NOT modify code.
---

# Reconnaissance Protocol: vue-nuxt-analyzer

Identifiziert Nuxt-Projekte anhand von `nuxt.config.ts`. Leitet den Agenten an, das dateibasierte Routing unter `pages/` und isolierte `components/` zu mappen. Verhindert strikt das Scannen von `.nuxt/` und `.output/`, um Token-Limit-Überschreitungen durch generierte Build-Artefakte zu vermeiden.

## CRITICAL DIRECTIVES
1. **NO MUTATION:** This is a reconnaissance-only skill. Do NOT write, modify, delete, or refactor any code.
2. **CONTEXT PROTECTION:** Strictly adhere to the ignored directories (Black Holes) to prevent LLM context exhaustion.
3. **REPORTING:** Extract the architectural topology and report back to the Orchestrator Node.
