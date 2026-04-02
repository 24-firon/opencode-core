---
name: three-zone-workflow
description: |
  Lade diesen Skill vor jeder Datei-Bearbeitung am Original-Code, bei großen Refactorings oder Entwürfen.

  MANDATORY SYSTEM RULE - READ IMMEDIATELY:
  1. Ordner .claude, .agent, .gemini NIEMALS berühren, lesen oder löschen.
  2. Dein Arbeitsbereich ist NUR .opencode und der Produktivcode.
  3. Nutze immer absolute Pfade für read/write. Grep statt Guessing.
  4. Nutze das task-Tool für komplexe Jobs.
  5. Stoppe und frage nach Erlaubnis vor destruktiven Bash-Befehlen (rm, drop).
---

# 🏗️ 3-Zone Safety & Draft Workflow

## 🎯 Ziel
Kein Original wird blind von der KI überschrieben. Alle Änderungen sind im Git-Diff sichtbar, bevor sie permanent werden. Token werden gespart, weil die KI mit kleinen Arbeitsdateien operiert statt an großen Originals.

## Die 3 Zonen (STRIKT EINHALTEN)

### ZONE 1 — AI Brain (Sandkasten, null Repo-Zugriff)
- **Ort:** Session-Artefakte der IDE (z.B. `.antigravity/brain/<session-id>/` oder Scratchpad).
- **Inhalt:** Entwürfe, Rechercheergebnisse, Planungsdokumente, Konzeptideen.
- **Regel:** In dieser Zone passiert das erste Denken und Entwerfen. Keine echten Projektdateien werden hier verändert.
- **Freigabe:** Operator sagt "Leg das mal als Arbeitsdatei an."

### ZONE 2 — Drafts / WIP (Isolierte Arbeitsdateien im Repo)
- **Ort:** `src/_wip/`, `docs/drafts/`, oder `ops/patches/` (je nach Inhaltstyp).
- **Inhalt:** Konkrete Arbeitsdateien für genau EINE geplante Änderung.
- **Regel:** Die KI legt hier eine Datei an (z.B. `src/_wip/worker_async_refactor.py`). Das Original (z.B. `src/worker.py`) bleibt unverändert. Der Operator kann in VS Code Datei-für-Datei vergleichen.
- **Namensschema:** `[original-dateiname]_[kurze-beschreibung].[ext]` (Beispiel: `worker_async-listen_refactor.py`).
- **Freigabe:** Operator sagt "Das ist gut, merge das Original."

### ZONE 3 — Original (Einziger Merge-Punkt)
- **Ort:** Die echten Arbeitsdateien.
- **Regel:** Original-Dateien werden NUR überschrieben nach explizitem Go des Operators. Direkt nach dem Merge ist ein `git add` + `git diff --staged` PFLICHT, um die Änderung im Git-Log sichtbar zu machen.

## 🚫 Verboten
- Eine Original-Datei bearbeiten, OHNE vorher ein Entwurf in Zone 2 zu zeigen (bei komplexen Änderungen).
- Eine Zone-2-Datei direkt in eine Zone-3-Datei einchecken, ohne Operator-Review.
- Ganze Dateien lesen, wenn nur ein Teil-Patch benötigt wird (Token-Verschwendung).

## ✅ Der Zyklus (Kurz)
Brain (denken) → _wip/ (anzeigen) → Go → Original (merge) → git diff
