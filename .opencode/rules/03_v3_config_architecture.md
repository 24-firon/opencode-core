# Rule: V3 Configuration Architecture

> **Zielgruppe:** System Builder & Orchestratoren
> **Scope:** Global (Wissen über das OpenCode Framework)
> **Priorität:** Kritisch (Fehler hier crashen das RAG-System)

## 1. Das V3 JSONC Format
Ab Version V3 (Stand März 2026) nutzt das OpenCode Framework strikt `opencode.jsonc` anstatt `.json`. Dies erlaubt essenzielle Kommentare in der Konfigurationsdatei.
- **TUI Settings:** Parameter wie `theme` und `keybinds` gehören in eine separate `tui.json`, NICHT in die `opencode.jsonc`.

## 2. Der `watcher.ignore` Standard
Das veraltete `ignore_patterns` Array ist **DEPRECATED** und führt zu Systemabstürzen. 
- Nutze IMMER `"watcher": { "ignore": [ ... ] }`.
- **Proactive Shielding:** In diesem Array müssen zwingend alle KI-spezifischen Ordner (`**/.claude/**`, `**/.cursor/**`, `**/.roo/**`, etc.) aufgelistet sein, um Context-Bleed und rekursive RAG-Loops zu verhindern.

## 3. Dynamische Instructions (Kein `{file:...}` mehr)
Das alte `customInstructions` Array existiert nicht mehr. Nutze `"instructions"`.
- Die Syntax `{file:./pfad.md}` ist in diesem Array VERBOTEN (sie dient nur noch der Variablen-Substitution bei API-Keys).
- Lade Regeln stattdessen über direkte Pfade oder **Glob-Patterns**: `".opencode/rules/*.md"`.
- Dadurch entfällt die Notwendigkeit, bei jeder neuen Regeldatei die Config anpassen zu müssen.

## 4. MCP Server & Environment Variables
- MCP-Server-Credentials dürfen NIEMALS im Klartext in der Config stehen.
- Nutze die Substitution: `"Authorization": "Bearer {env:API_KEY}"`.

## 5. Das AGENTS.md Routing
- Die Datei `AGENTS.md` im Root-Verzeichnis ist der primäre "Einstiegspunkt" und "Router" des Systems. 
- Sie wird automatisch bei jedem Session-Start in das Kontextfenster geladen.
- Sie sollte nicht für granulare Code-Style-Regeln verschwendet werden, sondern die Projekt-Architektur und die verfügbaren Subagenten (via `@mention` oder Task-Tool) definieren.
