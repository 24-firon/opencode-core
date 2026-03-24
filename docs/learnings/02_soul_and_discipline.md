# Learning 02: Soul, Map and Discipline

**Datum:** 24. März 2026
**Schweregrad:** Mittel (Architektur-Kultur)

## Das Problem

Technische Regeln allein reichen nicht aus, um ein komplexes Agenten-System zu steuern. Wenn der „Master-Orchestrator“ (AGENTS.md) nur eine Liste von Verboten ist, fehlt die Orientierung und die übergeordnete Ausrichtung (Soul). Zudem führt „Schlampigkeit“ bei kleinen Workflow-Änderungen zu langfristiger technischer Schuld.

## Die Konsequenz

Agenten neigen dazu, Framework-Möglichkeiten (wie Sub-Agent-Routing) zu ignorieren und stattdessen „alles schnell im Haupt-Turn“ zu erledigen. Dies führt zu Context-Bloat und Fehlern.

## Die Lösung (Erweiterte Standards)

### 1. AGENTS.md als System-Manifest
Die `AGENTS.md` ist mehr als ein technisches File. Sie muss:
- Die **Soul/Stimmung** des Repos repräsentieren (Was ist unser Ziel?).
- Einen **Lageplan** (Map) bieten (Wo finde ich was?).
- Das **Routing** aktiv einfordern (Delegiere an @build, @plan etc.).

### 2. Die Disziplin der Wissens-Erhaltung
Keine Erkenntnis darf verloren gehen. 
- Jede schmerzhafte Erfahrung (z.B. „Lösche niemals die AGENTS.md, wenn der User sagt, sie soll bleiben“) muss als Regel manifestiert werden.
- Jede Session endet mit einem Audit: „Was haben wir gelernt? Wo steht das jetzt?“

## Was wir daraus lernen

Integrität ist kein Zustand, sondern ein Prozess. Ein Profi-Agent pflegt seinen Kontext wie eine wertvolle Datenbank. Wer Zeit beim Dokumentieren spart, zahlt später mit Token-Bloat und Bugfixing.
