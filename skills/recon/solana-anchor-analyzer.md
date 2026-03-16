---
name: solana-anchor-analyzer
description: Reconnaissance rules for analyzing Solana repositories. DO NOT modify code.
---

# Reconnaissance Protocol: solana-anchor-analyzer

Erkennt Solana-Rust-Projekte über die `Anchor.toml`. Leitet den Agenten an, die Rust-Programme unter `programs/` zu scannen. Sperrt `target/` und `.anchor/` Verzeichnisse konsequent aus.

## CRITICAL DIRECTIVES
1. **NO MUTATION:** This is a reconnaissance-only skill. Do NOT write, modify, delete, or refactor any code.
2. **CONTEXT PROTECTION:** Strictly adhere to the ignored directories (Black Holes) to prevent LLM context exhaustion.
3. **REPORTING:** Extract the architectural topology and report back to the Orchestrator Node.
