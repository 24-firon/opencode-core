---
name: solidity-foundry-analyzer
description: Reconnaissance rules for analyzing Solidity repositories. DO NOT modify code.
---

# Reconnaissance Protocol: solidity-foundry-analyzer

Identifiziert moderne EVM-Setups über `foundry.toml`. Analysiert Source-Code in `src/` und Deployment-Skripte in `script/`. Ignoriert `out/` und externe Abhängigkeiten in `lib/`.

## CRITICAL DIRECTIVES
1. **NO MUTATION:** This is a reconnaissance-only skill. Do NOT write, modify, delete, or refactor any code.
2. **CONTEXT PROTECTION:** Strictly adhere to the ignored directories (Black Holes) to prevent LLM context exhaustion.
3. **REPORTING:** Extract the architectural topology and report back to the Orchestrator Node.
