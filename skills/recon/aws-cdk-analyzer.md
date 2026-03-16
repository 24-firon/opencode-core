---
name: aws-cdk-analyzer
description: Reconnaissance rules for analyzing Aws repositories. DO NOT modify code.
---

# Reconnaissance Protocol: aws-cdk-analyzer

Erkennt TypeScript/Python-basierte Cloud Development Kits via `cdk.json`. Analysiert den Haupt-Einstiegspunkt (z.B. `bin/app.ts`), um den Ressourcen-Baum nachzuvollziehen. Blockiert das Lesen von kompilierten CloudFormation-Templates im `cdk.out/` Ordner.

## CRITICAL DIRECTIVES
1. **NO MUTATION:** This is a reconnaissance-only skill. Do NOT write, modify, delete, or refactor any code.
2. **CONTEXT PROTECTION:** Strictly adhere to the ignored directories (Black Holes) to prevent LLM context exhaustion.
3. **REPORTING:** Extract the architectural topology and report back to the Orchestrator Node.
