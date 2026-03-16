---
name: react-native-expo-analyzer
description: Reconnaissance rules for analyzing React repositories. DO NOT modify code.
---

# Reconnaissance Protocol: react-native-expo-analyzer

Erkennt Expo-basierte Mobile-Apps an `app.json`. Fokussiert die Struktur-Erfassung auf das `app/`-Verzeichnis (Expo Router) oder den Einstieg `App.js`. Blockiert `ios/`, `android/` und `.expo/`, um den Agenten von nativer C++-/Java-Komplexität fernzuhalten.

## CRITICAL DIRECTIVES
1. **NO MUTATION:** This is a reconnaissance-only skill. Do NOT write, modify, delete, or refactor any code.
2. **CONTEXT PROTECTION:** Strictly adhere to the ignored directories (Black Holes) to prevent LLM context exhaustion.
3. **REPORTING:** Extract the architectural topology and report back to the Orchestrator Node.
