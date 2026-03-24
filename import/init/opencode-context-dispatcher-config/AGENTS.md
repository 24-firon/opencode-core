# AGENTS.md — Context-Dispatcher Projekt-Regeln

> **Zweck:** Diese Datei ist die primäre Regelquelle für alle OpenCode-Agenten
> in diesem Projekt. Sie wird automatisch bei jedem Session-Start geladen und
> mit den Dateien aus dem `instructions`-Array in `opencode.jsonc` kombiniert.
>
> **Priorität:** `AGENTS.md` hat Vorrang vor `CLAUDE.md` (Claude Code Kompatibilität).
> Globale Regeln aus `~/.config/opencode/AGENTS.md` werden zusätzlich geladen.

---

## 🏗️ Projektstruktur

Dieses Repository implementiert ein **Context-Dispatcher-System** für OpenCode-Agenten.

```
.
├── opencode.jsonc              ← Projekt-Config (diese Datei: AGENTS.md)
├── AGENTS.md                   ← Du bist hier
├── .opencode/
│   ├── agents/                 ← Custom-Agent-Definitionen (Markdown)
│   │   ├── dispatcher.md
│   │   ├── reviewer.md
│   │   └── docs-writer.md
│   ├── rules/                  ← Modular geladene Regelfiles
│   │   ├── global-context.md
│   │   ├── code-style.md
│   │   └── agent-dispatch.md
│   └── commands/               ← Custom-Slash-Commands
└── tui.json                    ← TUI-spezifische Einstellungen (Theme, Keybinds)
```

---

## 🧠 Kern-Verhalten (gilt für ALLE Agenten)

1. **Sprache:** Antworte immer auf Deutsch, außer Coding-Artifacts (Code bleibt Englisch)
2. **Kontext lesen:** Lies zuerst relevante Dateien, bevor du Änderungen vorschlägst
3. **Atomic Commits:** Jede Änderung = ein logischer, atomarer Schritt
4. **Keine Überraschungen:** Melde geplante Bash-Operationen IMMER vorher an
5. **Fehler-First:** Bei Unsicherheit → nachfragen, nie raten

## 🔄 Agenten-Routing (Context-Dispatcher)

Nutze den `@dispatcher`-Agenten wenn:
- Eine Aufgabe unklar kategorisiert ist
- Multiple Agenten involviert sein könnten
- Komplexe, mehrstufige Workflows koordiniert werden müssen

Direkte Agent-Auswahl:
- `@build`    → Implementierung, Code-Änderungen, Refactoring
- `@plan`     → Analyse, Architektur, Review (keine Schreibrechte)
- `@explore`  → Schnelle Codebase-Exploration (read-only, kein Schreiben)
- `@reviewer` → Dedizierter Code-Review-Agent (custom)

## 📁 Datei-Konventionen

- Konfigurationsdateien: `opencode.jsonc` (nicht `.json` — JSONC erlaubt Kommentare)
- TUI-Einstellungen: `tui.json` (NICHT in `opencode.jsonc` — seit v1.2.x deprecated)
- Agenten-Definitionen: `.opencode/agents/<name>.md`
- Projekt-Regeln: `.opencode/rules/<kategorie>.md`

## ⚠️ Bekannte Einschränkungen

- `snapshot: false` → Undo in UI deaktiviert — nur bei Performance-Problemen setzen
- `instructions`-Glob-Patterns: Reihenfolge ist nicht garantiert — kritische Regeln explizit benennen
- Remote-Instructions: 5s Timeout — Offline-Resilienz einplanen
