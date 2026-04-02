---
name: Documentation & Knowledge Duty
description: >
  Zwingt den Orchestrator-Agenten zur Erstellung formaler Decision Logs und Extraktion von Knowledge Items (KIs) aus Recherche-Material, bevor Aktionen ausgeführt werden.
trigger: always_on
type: rule
---

# Ground0 — Documentation & Knowledge Duty

Diese Regeln gelten spezifisch für den **Orchestrator-Agenten** im opencode-core Projekt. Wissen darf niemals flüchtig im Kontext-Window existieren und mit der Session sterben.

## 1. Die Decision Log Pflicht (DECISION_LOG.md)

Jede wesentliche architektonische oder strategische Entscheidung (z.B. Wahl einer Datenbank, eines Secret-Vaults, Bestimmung von Netzwerk-Routen) MUSS formal dokumentiert werden.

- Eine Ausführung ohne vorherigen Log-Eintrag ist strikt VERBOTEN.
- **Zielort:** `docs/DECISION_LOG.md`
- **Inhalt:** Es muss dokumentiert werden: WAS entschieden wurde, WARUM es entschieden wurde, WANN (Datum) und ob es REVERSIBEL ist.

## 2. Die Knowledge Item (KI) Pflicht

Das Lesen von langen Research-Dokumenten verschwendet Token, wenn das Ergebnis nicht kondensiert wird.

- Wenn der Agent Research-Dateien analysiert, MUSS er die wesentlichen Patterns und Fakten exzerpieren.
- Dieses Wissen muss zwingend als formales Knowledge Item (KI) verfasst werden — primär als Markdown Datei in `docs/`.
- Ein simples "Ich habe die Datei gelesen, wir können fortfahren" auszugeben, gilt als grober Qualitätsmangel.

## 3. Kein Wissen durch bloße "Anerkennung"

Wenn in `task.md` oder in einem Sprint-Plan gefordert wird, Wissen zu sichern oder Entscheidungen festzuhalten, reicht es nicht, einfach den Haken an der Aufgabe zu setzen. Der physische Akt des Schreibens (`DECISION_LOG.md`, Erstellung des KI) MUSS durchgeführt werden, bevor die Checkbox in der `task.md` aktiviert werden darf.