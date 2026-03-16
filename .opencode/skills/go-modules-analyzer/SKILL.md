---
name: go-modules-analyzer
description: Reconnaissance rules for analyzing Go repositories. DO NOT modify code.
---

# Reconnaissance Protocol: go-modules-analyzer

Nutzt `go.mod` als definitiven Indikator für Go-Projekte. Leitet den Agenten an, die Standardstruktur zu lesen: `cmd/` für Entrypoints und `pkg/`/`internal/` für Kernlogik. Verbietet das Scannen des `vendor/`-Ordners, um den Agenten nicht mit tausenden Fremd-Paketen zu fluten.

## CRITICAL DIRECTIVES
1. **NO MUTATION:** This is a reconnaissance-only skill. Do NOT write, modify, delete, or refactor any code.
2. **CONTEXT PROTECTION:** Strictly adhere to the ignored directories (Black Holes) to prevent LLM context exhaustion.
3. **REPORTING:** Extract the architectural topology and report back to the Orchestrator Node.
