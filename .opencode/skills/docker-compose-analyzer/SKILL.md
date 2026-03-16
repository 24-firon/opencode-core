---
name: docker-compose-analyzer
description: Reconnaissance rules for analyzing Docker repositories. DO NOT modify code.
---

# Reconnaissance Protocol: docker-compose-analyzer

Sucht nach `docker-compose.yml` oder `compose.yaml`. Mappt Container-Services, freigegebene Ports und gemountete Volumes, um die lokale Infrastruktur-Topologie zu erstellen. Verhindert Code-Ausführung oder Container-Starts.

## CRITICAL DIRECTIVES
1. **NO MUTATION:** This is a reconnaissance-only skill. Do NOT write, modify, delete, or refactor any code.
2. **CONTEXT PROTECTION:** Strictly adhere to the ignored directories (Black Holes) to prevent LLM context exhaustion.
3. **REPORTING:** Extract the architectural topology and report back to the Orchestrator Node.
