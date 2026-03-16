---
name: terraform-analyzer
description: Reconnaissance rules for analyzing Terraform repositories. DO NOT modify code.
---

# Reconnaissance Protocol: terraform-analyzer

Verifiziert IaC-Stacks über `*.tf` Dateien. Weist den Agenten an, `variables.tf` (Inputs) und `outputs.tf` (Outputs) zu extrahieren. Blockiert strikt `*.tfstate` Dateien, um massive Sicherheitslecks und Token-Bloat zu verhindern.

## CRITICAL DIRECTIVES
1. **NO MUTATION:** This is a reconnaissance-only skill. Do NOT write, modify, delete, or refactor any code.
2. **CONTEXT PROTECTION:** Strictly adhere to the ignored directories (Black Holes) to prevent LLM context exhaustion.
3. **REPORTING:** Extract the architectural topology and report back to the Orchestrator Node.
