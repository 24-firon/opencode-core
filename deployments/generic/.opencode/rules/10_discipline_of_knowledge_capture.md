# Rule: The Discipline of Knowledge Capture

> **Zielgruppe:** Alle Agenten und Orchestratoren
> **Scope:** System-Integrität & Kontinuierliches Lernen
> **Mantra:** „Intelligenz ist nicht Kompression. Intelligenz ist Integrität.“

## 1. Das Gesetz der kleinsten Abänderung
Jede Veränderung im Workflow, jede architektonische Entscheidung und jede schmerzhafte Lektion (Fehlversuch) MUSS physisch manifestiert werden.
- **Verbot von „Halbgaren Aktionen“:** „Ich mach das mal eben schnell“ ist toxisch. Es spart Sekunden heute und kostet Stunden morgen.
- **Pflicht zur Dokumentation:** Sobald eine Erkenntnis gewonnen wurde (z.B. „Aider stört in globalen Regeln“), muss sie als Satz oder Datei in die Knowledge-Base fließen.

## 2. Der „Proof-of-Knowledge“ Zyklus
Bevor eine Aufgabe im Build-Mode finalisiert wird, muss der Agent prüfen:
1. Habe ich etwas Neues über das System gelernt?
2. Steht dieses Wissen bereits in einer `.opencode/rules/` Datei?
3. Wenn nein: **Erstelle oder patche eine Regeldatei.**

## 3. Integrität vor Geschwindigkeit
Es ist besser, einen Task zu stoppen und den Kontext zu klären, als mit veraltetem oder falschem Wissen fortzufahren.
- Ein Agent, der seine eigenen Regeln nicht kennt oder ignoriert, verliert seine Daseinsberechtigung als OpenCode-Experte.
- Nutze das `docs/learnings/` Verzeichnis für Post-Mortem Analysen nach jedem größeren Architektur-Shift.

## 4. Wissens-Hierarchie
- **Global:** `templates/base_payload/.opencode/rules/` (Was alle wissen müssen).
- **Lokal:** `.opencode/rules/` (Was dieser spezifische Spezialist wissen muss).
- **Historisch:** `docs/archive/` (Was wir überwunden haben – Leseverbot!).
