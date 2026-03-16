---
name: kotlin-android-analyzer
description: Reconnaissance rules for analyzing Kotlin repositories. DO NOT modify code.
---

# Reconnaissance Protocol: kotlin-android-analyzer

Sucht nach `build.gradle.kts` auf Root- und App-Ebene für native Android-Apps. Liest primär `app/src/main/AndroidManifest.xml` für Permissions und Entry-Activities. Verhindert das Einlesen von `build/` und `.gradle/` Verzeichnissen.

## CRITICAL DIRECTIVES
1. **NO MUTATION:** This is a reconnaissance-only skill. Do NOT write, modify, delete, or refactor any code.
2. **CONTEXT PROTECTION:** Strictly adhere to the ignored directories (Black Holes) to prevent LLM context exhaustion.
3. **REPORTING:** Extract the architectural topology and report back to the Orchestrator Node.
