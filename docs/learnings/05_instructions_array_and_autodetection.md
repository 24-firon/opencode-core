# Learning 05: Das instructions-Array und die Auto-Detection

> **Session:** 26. März 2026 | **Schweregrad:** Hoch (Wissens-Lücke im System)

## Was ist passiert?

Der Context-Dispatcher hatte eine `CLAUDE.md` im Root und `"CLAUDE.md"` im instructions-Array seiner `opencode.jsonc`. Trotzdem wurde die Datei bei einem Restart nicht geladen. Der neue Agent wusste nichts aus dem CLAUDE.md.

## Die Ursache

OpenCode hat **zwei unabhängige Mechanismen** zum Laden von Dateien beim Start:

| Mechanismus | Wie er funktioniert | Priorität |
|:---|:---|:---|
| **Auto-Detection** | OpenCode sucht automatisch nach `AGENTS.md`, `CLAUDE.md`, `PROJECT_RULES.md` im Root. Wenn es EINE davon findet, lädt es sie. | **Hoch** — wird zuerst ausgeführt |
| **Instructions-Array** | Der User gibt explizite Dateipfade in `opencode.jsonc` an. | **Niedrig** — wird NACH der Auto-Detection geladen |

**Das Problem:** Wenn ein globales `AGENTS.md` existiert (z.B. in `~/.config/opencode/AGENTS.md`), wird die Auto-Detection dieses laden und das CLAUDE.md-Fallback überspringen. Das instructions-Array wird zwar DANACH geladen, aber die Auto-Detection-Priorität kann das Ergebnis verzerren.

## Die Lösung

**Niemals auf Auto-Detection verlassen.** Trage alle wichtigen Dateien EXPLIZIT ins instructions-Array ein:

```json
"instructions": [
  ".opencode/rules/*.md",    // Regeln
  "AGENTS.md",               // Repo-Identität (auch wenn auto-detected)
  "RULE_REGISTRY.md",        // Regel-Router
  "REPO_BRIEFING.md"         // Oder CLAUDE.md — die Repo-Vision
]
```

## Die Umbenennung

Beide Repos haben ihre Haupt-Identitätsdatei umbenannt:
- `CLAUDE.md` → `REPO_BRIEFING.md` (Context-Dispatcher)
- `AGENTS.md` → `REPO_BRIEFING.md` (opencode-core)

**Warum?** Der Name `AGENTS.md` wird vom globalen Config-Ordner (`~/.config/opencode/AGENTS.md`) automatisch geladen. Das kann die lokale Datei überschreiben oder verwirren. `REPO_BRIEFING.md` beschreibt die Funktion (Briefing für den Agenten) und kollidiert nicht mit der globalen Auto-Detection.

## Die Konsequenz für beide Repos

| Repo | Vorher | Nachher |
|:---|:---|:---|
| **Context-Dispatcher** | `"CLAUDE.md"` im Array (nicht geladen) | `"REPO_BRIEFING.md"` im Array (explizit) |
| **opencode-core** | Nur `".opencode/rules/*.md"` im Array | 6 Einträge: Rules, REPO_BRIEFING, RULE_REGISTRY, DECISION_LOG, SESSION_HANDOVER, TASK_LIST |

## Die Regel

> **REGEL:** Jede Datei, die für den Agenten essentiell ist (Identität, Regeln, Router), MUSS explizit im `instructions`-Array der `opencode.jsonc` stehen. Auto-Detection ist kein zuverlässiger Mechanismus, wenn globale Config-Dateien existieren. Dateien, die mit globalen Auto-Detection-Namen (`AGENTS.md`, `CLAUDE.md`) kollidieren, sollten umbenannt werden.
