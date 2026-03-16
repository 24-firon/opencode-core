---
name: solidity-hardhat-analyzer
description: Reconnaissance rules for analyzing Solidity repositories. DO NOT modify code.
---

# Reconnaissance Protocol: solidity-hardhat-analyzer

Erkennt Ethereum/EVM-Projekte durch `hardhat.config.js`. Fokussiert auf rohe Smart Contracts unter `contracts/*.sol`. Blockiert `artifacts/`, `cache/` und `typechain-types/`, um kompilierte ABIs zu ignorieren.

## CRITICAL DIRECTIVES
1. **NO MUTATION:** This is a reconnaissance-only skill. Do NOT write, modify, delete, or refactor any code.
2. **CONTEXT PROTECTION:** Strictly adhere to the ignored directories (Black Holes) to prevent LLM context exhaustion.
3. **REPORTING:** Extract the architectural topology and report back to the Orchestrator Node.
