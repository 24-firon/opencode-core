# Global Context Rules

> Geladen via `instructions` in `opencode.jsonc`. Gilt für ALLE Agenten und Sessions.
> Kombiniert mit `AGENTS.md` und anderen Instruction-Files.

## Projekt-Identität

- **Name:** Context-Dispatcher-System
- **Stack:** TypeScript / Node.js (primär)
- **Ziel:** Agenten-Regelmanagement für OpenCode-basierte AI-Workflows

## Universelle Verhaltensregeln

### Kommunikation
- Deutsch für Erklärungen, Englisch für Code und technische Bezeichner
- Keine unnötigen Füllphrasen ("Natürlich!", "Gerne!")
- Bei Unklarheit → einmalig nachfragen, dann ausführen

### Code-Standards
- TypeScript mit strikten Typen (`strict: true` in tsconfig)
- ESM-Module (`import`/`export`), kein CommonJS
- Async/await, kein callback-hell
- Error-Handling: explizit, niemals silent-fail

### Git-Konventionen
- Commit-Format: `<type>(<scope>): <beschreibung>` (Conventional Commits)
- Types: feat, fix, docs, refactor, test, chore
- Kein direktes Pushen auf `main`/`master`

## Kontext-Awareness

Beim Session-Start:
1. Lese `opencode.jsonc` um aktuelle Konfiguration zu verstehen
2. Prüfe `AGENTS.md` für Projekt-spezifische Regeln
3. Identifiziere offene Tasks aus `TODO.md` falls vorhanden
