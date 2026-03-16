---
name: elixir-phoenix-analyzer
description: Reconnaissance rules for analyzing Elixir repositories. DO NOT modify code.
---

# Reconnaissance Protocol: elixir-phoenix-analyzer

Identifiziert funktionale Phoenix-Apps über `mix.exs`. Leitet den Agenten an, Controller und Endpunkte in `lib/*_web/router.ex` zu lesen. Schließt Build-Artefakte in `_build/` und Abhängigkeiten in `deps/` konsequent aus.

## CRITICAL DIRECTIVES
1. **NO MUTATION:** This is a reconnaissance-only skill. Do NOT write, modify, delete, or refactor any code.
2. **CONTEXT PROTECTION:** Strictly adhere to the ignored directories (Black Holes) to prevent LLM context exhaustion.
3. **REPORTING:** Extract the architectural topology and report back to the Orchestrator Node.
