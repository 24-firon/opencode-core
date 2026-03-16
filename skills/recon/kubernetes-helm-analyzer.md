---
name: kubernetes-helm-analyzer
description: Reconnaissance rules for analyzing Kubernetes repositories. DO NOT modify code.
---

# Reconnaissance Protocol: kubernetes-helm-analyzer

Identifiziert Helm-Charts anhand der `Chart.yaml`. Liest die `values.yaml`, um die konfigurierbaren Parameter und Default-Ressourcen der Deployments zu erfassen. Ignoriert verschachtelte `charts/`-Ordner (Subcharts).

## CRITICAL DIRECTIVES
1. **NO MUTATION:** This is a reconnaissance-only skill. Do NOT write, modify, delete, or refactor any code.
2. **CONTEXT PROTECTION:** Strictly adhere to the ignored directories (Black Holes) to prevent LLM context exhaustion.
3. **REPORTING:** Extract the architectural topology and report back to the Orchestrator Node.
