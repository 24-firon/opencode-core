# Learning 01: Handover Scope Bleeding

**Datum:** 24. März 2026
**Schweregrad:** Hoch (Architektur-Integrität)

## Das Problem

Beim ersten Handover zwischen Context-Dispatcher und OpenCode-Core wurden globale Systemregeln (Git-Workflows, Execution-Gates) mit projektspezifischen lokalen Tools (Aider für Viron-Server-Admin) vermischt in einem Paket abgeliefert.

## Die Konsequenz

Hätte der System Builder diese Regeln blind in den `base_payload` (den globalen Werkzeugkoffer) integriert, wäre das Aider-Tool in jedes Ziel-Repo kopiert worden, obwohl es nur für ein einziges Projekt relevant ist. Zudem hätten neue Regeln bestehende Dateien überschrieben oder "Schatten-Regeln" erzeugt.

## Die Lösung (Neues Protokoll)

Ab sofort gelten für alle Handovers zwischen Agenten folgende Regeln:

### 1. Tagging im Manifest
Jedes Paket im `UPDATE_MANIFEST.md` muss strikt getaggt werden:
- `[TYPE: GLOBAL_PAYLOAD]`: Regeln für den `base_payload` (gelten in ALLEN Ziel-Repos)
- `[TYPE: LOCAL_SKILL]`: Projektspezifische Tools (werden als Skills abgelegt, nicht global injiziert)

### 2. Patch-Strategie statt Drop & Replace
Neue Regeln dürfen NICHT einfach als neue Dateien (`09_irgendwas.md`) abgeworfen werden.
Stattdessen:
- Analysiere bestehende Regeln auf Konflikte
- Patche neue Inhalte in bestehende Dateien ein
- Bewahre die Nomenklatur (`00_` bis `08_`)

### 3. Trennung von Werkzeug und Regel
- **Regeln** (Verhalten, Constraints) -> `.opencode/rules/`
- **Skills** (ausführbare Werkzeuge) -> `.opencode/skills/`
- **Workflows** (Schritt-für-Schritt-Abläufe) -> `.opencode/commands/`

## Was wir daraus lernen

Token-Effizienz darf nicht über Architektur-Integrität siegen. Ein "schneller Drop" ist teuer, wenn er später mühsam debuggt werden muss. Der Import-Ordner (`_IMPORT` oder `.opencode/import/inbox/`) ist eine kritische Staging-Area, die Respekt erfordert.
