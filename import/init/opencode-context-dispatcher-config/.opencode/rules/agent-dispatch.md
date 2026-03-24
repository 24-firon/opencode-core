# Agent-Dispatch Rules

> Routing-Regeln für das Context-Dispatcher-System.
> Definiert wann welcher Agent eingesetzt werden soll.

## Dispatch-Entscheidungsbaum

```
Eingehende Anfrage
│
├─ Hat Schreibzugriff auf Source-Code nötig?
│   ├─ JA  → @build
│   └─ NEIN
│       ├─ Ist es eine Analyse/Review-Aufgabe?
│       │   ├─ JA  → @plan oder @reviewer
│       │   └─ NEIN
│       │       ├─ Geht es um Dokumentation?
│       │       │   ├─ JA  → @docs-writer
│       │       │   └─ NEIN
│       │       │       └─ Codebase verstehen?
│       │       │           ├─ JA  → @explore (subagent, read-only)
│       │       │           └─ NEIN → @dispatcher (klärung)
```

## Parallelisierung

Für unabhängige Sub-Tasks IMMER parallelisieren:

```
User: "Review den Code UND schreib danach Docs"
→ FALSCH: sequenziell (@reviewer → warten → @docs-writer)
→ RICHTIG: @reviewer + @docs-writer parallel starten (via Task-Tool)
```

## Kosten-Optimierung

- Einfache Fragen → `small_model` (Haiku) via @dispatcher oder @explore
- Komplexe Implementierungen → Standard-Model (Sonnet) via @build
- Architektur-Entscheidungen → Starkes Model (Opus) via @plan

## Fehler-Protokoll

Wenn ein Agent fehlschlägt:
1. Fehler loggen mit Agent-ID und Timestamp
2. Einmalig retry mit demselben Agenten
3. Bei erneutem Fehler → @dispatcher informieren
4. NIEMALS silent-fail und weitermachen
