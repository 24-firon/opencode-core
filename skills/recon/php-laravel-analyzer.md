---
name: php-laravel-analyzer
description: Reconnaissance rules for analyzing Php repositories. DO NOT modify code.
---

# Reconnaissance Protocol: php-laravel-analyzer

Erkennt Laravel-Projekte an der `composer.json` und dem `artisan`-Skript. Weist den Agenten an, die API-Struktur über `routes/api.php` und Configs über `.env.example` zu erfassen. Schließt `vendor/` und `storage/` rigoros aus.

## CRITICAL DIRECTIVES
1. **NO MUTATION:** This is a reconnaissance-only skill. Do NOT write, modify, delete, or refactor any code.
2. **CONTEXT PROTECTION:** Strictly adhere to the ignored directories (Black Holes) to prevent LLM context exhaustion.
3. **REPORTING:** Extract the architectural topology and report back to the Orchestrator Node.
