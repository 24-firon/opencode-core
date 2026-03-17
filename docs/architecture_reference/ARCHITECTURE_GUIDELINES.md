# Architektur-Richtlinien für Agenten

Dies ist die technische Leitplanke für alle Architektur- und Design-Entscheidungen im OpenCode Swarm Projekt.

## 1. Single Source of Truth (SSoT)
*   **Datenbank statt Dateien:** Der Zustand des Systems (Tasks, Status, Events) lebt **ausschließlich** in der SQLite-Datenbank (`.hive/event-log.sqlite`). 
*   **Projektionen:** Dateien wie `.swarm/plan.md` sind reine "Projektionen" (Read-Only Artefakte) aus der Datenbank. **Agenten dürfen diese Dateien niemals direkt editieren.**
*   **Event Sourcing:** Statusänderungen werden nicht überschrieben, sondern als neues Event (`task_started`, `task_completed`) in die DB geschrieben.

## 2. Asymmetrische Modelle
Nutze niemals ein einziges LLM für alles.
*   **Planung / Orchestrierung:** Komplexe Reasoning-Modelle (Gemini 3.1 Pro, OpenAI o1).
*   **Coding / Execution:** Schnelle, deterministische Modelle (Kimi K2.5, Claude 3.5 Haiku).
*   **Review / QA:** Zwingend ein **anderes** Modell als der Coder (z.B. Claude 3.5 Sonnet), um blinde Flecken zu erkennen.

## 3. Die 7-Gates Quality Pipeline
Code wird nicht auf Verdacht committet. Jeder Task muss durch den lokalen MCP-Server (`.mcp-server/src/index.ts`) laufen:
1. Syntax-Check (Tree-sitter)
2. Placeholder Scan (Keine TODOs)
3. Linting (Biome - Zero Errors)
4. Build (TypeScript)
5. Security (Semgrep)
6. Testing (Vitest >= 70% Coverage)
7. Evidence Generation

## 4. Provider-Agnostik (KISS-Prinzip)
*   Keine harten Abhängigkeiten zu spezifischen lokalen LLM-Runnern. 
*   Wir nutzen generische, OpenAI-kompatible REST-APIs (`/v1/embeddings`), sodass der User fließend zwischen Ollama (Port 11441) und vLLM (Port 8000) wechseln kann, indem er nur die `swarm.json` anpasst.
*   Keine Heavy-Weight Vektor-Datenbanken für kleine Kontexte. SQLite reicht für das `.hivemind` vollkommen aus.

## 5. Token-Effizienz (JIT Context)
*   Mülle das LLM-Kontextfenster nicht mit dem gesamten Repository zu.
*   Nutze Tree-sitter (AST), um exakt die Funktionen und Abhängigkeiten zu extrahieren, die ein Agent für seinen spezifischen Task benötigt.
