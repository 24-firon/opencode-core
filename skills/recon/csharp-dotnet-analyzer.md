---
name: csharp-dotnet-analyzer
description: Reconnaissance rules for analyzing Csharp repositories. DO NOT modify code.
---

# Reconnaissance Protocol: csharp-dotnet-analyzer

Sucht nach `.sln` (Solution) und `.csproj` (Project) Dateien. Leitet die Analyse auf `Program.cs` und `appsettings.json` für den Bootstrapping- und Config-Prozess. Verhindert jeglichen Zugriff auf `bin/` und `obj/`, da diese kompilierte DLLs enthalten.

## CRITICAL DIRECTIVES
1. **NO MUTATION:** This is a reconnaissance-only skill. Do NOT write, modify, delete, or refactor any code.
2. **CONTEXT PROTECTION:** Strictly adhere to the ignored directories (Black Holes) to prevent LLM context exhaustion.
3. **REPORTING:** Extract the architectural topology and report back to the Orchestrator Node.
