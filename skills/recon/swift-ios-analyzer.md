---
name: swift-ios-analyzer
description: Reconnaissance rules for analyzing Swift repositories. DO NOT modify code.
---

# Reconnaissance Protocol: swift-ios-analyzer

Identifiziert native iOS-Projekte via `*.xcodeproj` oder `Package.swift`. Zielt auf `AppDelegate.swift` oder SwiftUI's `App.swift` ab, um die Root-Navigation zu verstehen. Sperrt Xcode-Cache wie `DerivedData/` und `.build/` aus dem Kontext.

## CRITICAL DIRECTIVES
1. **NO MUTATION:** This is a reconnaissance-only skill. Do NOT write, modify, delete, or refactor any code.
2. **CONTEXT PROTECTION:** Strictly adhere to the ignored directories (Black Holes) to prevent LLM context exhaustion.
3. **REPORTING:** Extract the architectural topology and report back to the Orchestrator Node.
