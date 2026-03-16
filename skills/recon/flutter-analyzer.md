---
name: flutter-analyzer
description: Reconnaissance rules for analyzing Flutter repositories. DO NOT modify code.
---

# Reconnaissance Protocol: flutter-analyzer

Verifiziert Dart/Flutter-Projekte durch `pubspec.yaml`. Startet die Code-Analyse strikt ab `lib/main.dart` und verfolgt den Widget-Baum. Ignoriert `.dart_tool/`, `build/` und `.pub-cache/` vollständig.

## CRITICAL DIRECTIVES
1. **NO MUTATION:** This is a reconnaissance-only skill. Do NOT write, modify, delete, or refactor any code.
2. **CONTEXT PROTECTION:** Strictly adhere to the ignored directories (Black Holes) to prevent LLM context exhaustion.
3. **REPORTING:** Extract the architectural topology and report back to the Orchestrator Node.
