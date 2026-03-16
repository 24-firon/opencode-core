---
name: ruby-rails-analyzer
description: Reconnaissance rules for analyzing Ruby repositories. DO NOT modify code.
---

# Reconnaissance Protocol: ruby-rails-analyzer

Nutzt das `Gemfile`, um Rails-Monolithen zu verifizieren. Fokussiert die Analyse auf `config/routes.rb` für Endpunkte und `db/schema.rb` für das Datenmodell. Verbietet das Lesen von `vendor/bundle/` und `tmp/`, um Kontext-Explosionen zu verhindern.

## CRITICAL DIRECTIVES
1. **NO MUTATION:** This is a reconnaissance-only skill. Do NOT write, modify, delete, or refactor any code.
2. **CONTEXT PROTECTION:** Strictly adhere to the ignored directories (Black Holes) to prevent LLM context exhaustion.
3. **REPORTING:** Extract the architectural topology and report back to the Orchestrator Node.
