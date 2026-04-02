---
name: handover-protocol
description: Lade diesen Skill, wenn du eine Session startest, beendest oder Handover-Dateien wie BRAIN_UPLOAD.md oder task.md bearbeitest.
---

# 🤝 Handover Protocol & Session Brain

## 1. Initiale Lade-Pflicht (Session Start)
Beim Start jeder neuen Session MÜSSEN die relevanten Projekt-Dateien aus `Handover/` (bzw. `.opencode/knowledge/BRAIN_UPLOAD.md`, `task.md`, `implementation_plan.md`) gelesen und in das eigene, **lokale und session-gebundene globale Brain** (Artefakt-Verzeichnis des Agenten) geladen werden.
- Arbeite ab diesem Zeitpunkt primär mit deinen normalen, temporären Brain-Artefakten zur Strukturierung deiner eigenen Gedanken und Prozesse.

## 2. Handover als Append-Only Protokoll
Die Handover-Dateien des Repositories sind PERSISTENT und dienen als "Log-Buch" und Protokoll zwischen Sessions und verschiedenen Agenten.
- **Append-Only:** Du darfst diese Dateien am Ende einer Arbeitsphase mit neuen Erkenntnissen, abgeschlossenen Tasks oder neuen Plänen **anreichern** (erweitern).
- **Verbot der Reduktion:** Du darfst Inhalte (alte Pläne, Fehler-Logs, historische Tasks) **NIEMALS** blind herauslöschen oder radikal "zusammenfassen", nur um Platz zu sparen.
- Das Löschen von historischem Kontext im Handover-Ordner wird als kritischer Datenverlust (Data-Loss) gewertet und ist strikt verboten. (Ausnahme: striktes Shrink-Protokoll via Archiv).

## 3. Die strikte Trennung: Plan vs. Realität (WICHTIG)
Es gibt eine essenzielle Abgrenzung zwischen den Handover-Dateien, die NIEMALS vermischt werden darf:

- **`implementation_plan.md` (Zukunft & Theorie):**
  - Dies ist der ursprüngliche Plan.
  - **IMMUTABILITY-REGEL:** Abgeschlossene Punkte in diesem Plan dürfen im Nachhinein **NIEMALS** korrigiert oder "geupdatet" werden, um der Realität zu entsprechen.
  - Hier werden **ausschließlich** zukünftige, noch ausstehende Phasen hinzugefügt oder modifiziert.
- **`walkthrough.md` / `BRAIN_UPLOAD.md` (Vergangenheit & Realität):**
  - Hier wird dokumentiert, was **wirklich** passiert ist.
  - Wenn der Plan bei der Ausführung nicht funktioniert hat und der Code anders geschrieben werden musste, wird dieses Delta und die reale Lösung hier protokolliert, _nicht_ rückwirkend im Plan.
- **`task.md` (Gegenwart & Checkliste):**
  - Die reine Status-Checkliste. Hier haken wir Dinge ab (`[x]`) oder passen den unmittelbaren Arbeitsstatus an.

## 4. Klarer Arbeits-Workflow
- **Temporäres Denken / Working Space** = Dein lokales Brain (Session Artefakte in der IDE: `~/.gemini/antigravity/brain/...`). Hier reifen Gedanken von der ersten Stufe ins fertige Resultat.
- **Persistente Projekt-Wahrheit & Übergabe** = Die dauerhaften `.opencode/knowledge/` Dateien. Diese werden strikt getrennt nach Plan/Realität/Status gepflegt.
