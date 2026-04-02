# 02 Organization Methodology — Rules Combination

This file contains all Organization Methodology rules for the OpenCode Starter Kit.

---

## # Rule 16: 3-Zone Safety & Draft Workflow
(Source: [16_three-zone-workflow.md](file:///c:/Workspace/Repos/Viron-Server/_TASKS/OpenCode_Starter_Kit/02_Organization_Methodology/16_three-zone-workflow.md))

### 🎯 Ziel
Kein Original wird blind von der KI überschrieben. Alle Änderungen sind im Git-Diff
sichtbar, bevor sie permanent werden. Token werden gespart, weil die KI mit kleinen
Arbeitsdateien operiert statt an großen Originals.

### Die 3 Zonen (STRIKT EINHALTEN)

#### ZONE 1 — AI Brain (Sandkasten, nil Repo-Zugriff)
- **Ort:** `~/.gemini/brain/<session-id>/` (Session-Artefakte der IDE)
- **Inhalt:** Entwürfe, Rechercheergebnisse, Planungsdokumente, Konzeptideen
- **Regel:** In dieser Zone passiert das **erste Denken und Entwerfen**.
  Keine Dateien in `c:\Workspace\Repos\...` werden in dieser Phase angefasst.
- **Freigabe:** Operator sagt "Leg das mal als Arbeitsdatei an."

#### ZONE 2 — Drafts / WIP (Isolierte Arbeitsdateien im Repo)
- **Ort:** `src/_wip/`, `docs/drafts/`, oder `ops/patches/` (je nach Inhaltstyp)
- **Inhalt:** Konkrete Arbeitsdateien for genau EINE geplante Änderung
- **Regel:** Die KI legt hier eine Datei an (z.B. `src/_wip/worker_async_refactor.py`).
  Das **Original** (z.B. `src/worker.py`) bleibt unverändert.
  Der Operator kann in VS Code Datei-für-Datei vergleichen (GitLens empfohlen).
- **Namensschema:** `[original-dateiname]_[kurtze-beschreibung].[ext]`
  Beispiel: `worker_async-listen_refactor.py`
- **Freigabe:** Operator sagt "Das ist gut, merge das Original."

#### ZONE 3 — Original (Einziger Merge-Punkt)
- **Ort:** Die echten Arbeitsdateien (z.B. `src/worker.py`, `sql/init.sql`)
- **Regel:** Original-Dateien werden NUR überschrieben nach **explizitem Go** des Operators.
  Direkt nach dem Merge ist ein `git add` + `git diff --staged` PFLICHT, um
  die Änderung im Git-Log sichtbar zu machen.

### 🚫 Verboten
- Eine Original-Datei bearbeiten, OHNE vorher ein Entwurf in Zone 2 zu zeigen.
- Eine Zone-2-Datei direkt in eine Zone-3-Datei einchecken, ohne Operator-Review.
- Ganze Dateien lesen, wenn nur ein Teil-Patch benötigt wird (Token-Verschwendung).

### ✅ Der Zyklus (Kurz)
`Brain (denken) → _wip/ (anzeigen) → Go → Original (merge) → git diff`

---

## # Ground0 — \_TASKS Folder Structure (The Envelope)
(Source: [19_tasks-folder-structure.md](file:///c:/Workspace/Repos/Viron-Server/_TASKS/OpenCode_Starter_Kit/02_Organization_Methodology/19_tasks-folder-structure.md))

Um Token zu sparen und Agenten zielgerichtet zu steuern, arbeitet jeder Punkt im `implementation_plan.md` nicht auf Zuruf aus dem Chat, sondern aus einem dezidierten Vorbereitungsordner (Envelope) heraus.

### 1. Die harte Regel
Beispiel: Bevor "Phase 10: Vector DB" gestartet wird, **MUSS** der Ordner `_TASKS/10_vector_db/` vollständig vorbereitet existieren. Die Vorbereitung erfolgt in einem separaten Planungsschritt, nicht während der Ausführung.

### 2. Pflicht-Inhalt jedes Task-Ordners
Jeder Task-Ordner muss zwingend folgende Struktur aufweisen:

#### A. Der Boot-Prompt (`PROMPT_INITIAL.md`)
Die erste Anlaufstelle für den Ausführungs-Agenten. Beinhaltet exakt die Anweisungen, Zielsetzung und die Constraints for diese spezifische Phase.

#### B. Spezifische Sub-Prompts (Optional)
Gibt es Research zu tun, existiert separat eine Datei `PROMPT_RESEARCH.md`. Der Boot-Prompt verweist darauf, falls der Research-Schritt abgearbeitet werden muss.

#### C. Der Kontext-Ordner (`context/`)
Hier wird das Internet-Copy-Paste oder ältere Quellcodes abgeworfen (z.B. Kopien von Library-Docs, API-Referenzen). Der Agent sucht sich seine Fakten in `context/` und muss nicht wild im Hauptrepo suchen.

#### D. Die LEEREN Dummy-Ergebnisse (Pflicht!)
Ein Agent soll nie erraten müssen, wie das Ergebnis formatiert sein soll. Für jedes geforderte Dokument liegen Dummys bereit.
Beispiel for eine geforderte Recherche-Ausgabe:
Es existiert bereits eine Datei `RESEARCH_FINDINGS.md` im Ordner.

```markdown
# Research Ergebnisse: Phase 10 Vector DB

**Erstellt für:** Agent XY
**Zusammenfassung:**
[AGENT: FÜGE HIER KURZZUSAMMENFASSUNG EIN]

## Details

[AGENT: FÜGE HIER LISTEN UND BEWEISE EIN]

## Quellen

[AGENT: ABSOLUTE LINKS ZU DOKUMENTATIONEN HINZUFÜGEN]
```

### 3. Workflow des Operators & Orchestrators
1. Eine Idee wandert aus der `FUTURE_PLANS.md` in den `implementation_plan.md`.
2. Der Orchestrator (Opus/High) scaffoldet den Ordner `_TASKS/XX_name/` und generiert die leeren Dummy-Dateien plus die initialen Prompts.
3. Der Operator sichtet den Envelope in der IDE und gibt ihn frei.
4. Der Subagent / Coding-Agent (Sonnet/Low) betritt den Ordner, liest den Prompt und überschreibt exakt die Dummy-Platzhalter. Kein Rätselraten, reine Ausführung.

---

## # Rule 15: Handover Protocol & Session Brain
(Source: [handover-protocol.md](file:///c:/Workspace/Repos/Viron-Server/_TASKS/OpenCode_Starter_Kit/02_Organization_Methodology/handover-protocol.md))

### 1. Initiale Lade-Pflicht (Session Start)
Beim Start jeder neuen Session MÜSSEN die relevanten Projekt-Dateien aus `Handover/` (z.B. `task.md`, `implementation_plan.md`, `AGENT_BRAIN_DUMP.md`) gelesen und in das eigene, **lokale und session-gebundene globale Brain** (Artefakt-Verzeichnis des Agenten) geladen werden.

- Arbeite ab diesem Zeitpunkt primär mit deinen normalen, temporären Brain-Artefakten zur Strukturierung deiner eigenen Gedanken und Prozesse.

### 2. Handover als Append-Only Protokoll
Die Dateien im `Handover/` Verzeichnis des Repositories sind PERSISTENT und dienen als "Log-Buch" und Protokoll zwischen Sessions und verschiedenen Agenten.

- **Append-Only:** Du darfst diese Dateien am Ende einer Arbeitsphase mit neuen Erkenntnissen, abgeschlossenen Tasks oder neuen Plänen **anreichern** (erweitern).
- **Verbot der Reduktion:** Du darfst Inhalte (alte Pläne, Fehler-Logs, historische Tasks) **NIEMALS** blind herauslöschen oder radikal "zusammenfassen", nur um Platz zu sparen.
- Das Löschen von historischem Kontext im Handover-Ordner wird als kritischer Datenverlust (Data-Loss) gewertet und ist strikt verboten.

### 3. Die strikte Trennung: Plan vs. Realität (WICHTIG)
Es gibt eine essenzielle Abgrenzung zwischen den Handover-Dateien, die NIEMALS vermischt werden darf:

- **`Handover/implementation_plan.md` (Zukunft & Theorie):**
  - Dies ist der ursprüngliche Plan.
  - **IMMUTABILITY-REGEL:** Abgeschlossene Punkte in diesem Plan dürfen im Nachhinein **NIEMALS** korrigiert oder "geupdatet" werden, um der Realität zu entsprechen.
  - Hier werden **ausschließlich** zukünftige, noch ausstehende Phasen hinzugefügt oder modifiziert.
- **`Handover/walkthrough.md` (Vergangenheit & Realität):**
  - Hier wird dokumentiert, was **wirklich** passiert ist.
  - Wenn der Plan bei der Ausführung nicht funktioniert hat und der Code anders geschrieben werden musste, wird dieses Delta und die reale Lösung hier im Walkthrough protokolliert, _nicht_ rüchwirkend im Plan.
- **`Handover/task.md` (Gegenwart & Checkliste):**
  - Die reine Status-Checkliste. Hier haken wir Dinge ab (`[x]`) oder passen den unmittelbaren Arbeitsstatus an.

### 4. Klarer Arbeits-Workflow
- **Temporäres Denken / Working Space** = Dein lokales Brain (Session Artefakte in der IDE: `~/.gemini/antigravity/brain/...`). Hier reifen Gedanken von der ersten Stufe ins fertige Resultat, bevor sie ins Handover-Archiv (`walkthrough.md`) übergehen.
- **Persistente Projekt-Wahrheit & Übergabe** = Die `Handover/` Dateien. Diese werden strikt getrennt nach Plan/Realität/Status gepflegt.

---

## # Rule 18: Das 4-Tier Memory & Shrink Protocol
(Source: [18_tier-memory-protocol.md](file:///c:/Workspace/Repos/Viron-Server/_TASKS/OpenCode_Starter_Kit/02_Organization_Methodology/18_tier-memory-protocol.md))

### 🎯 Zweck
Handover-Dateien (`task.md`, `walkthrough.md`) wachsen unweigerlich. Um Token-Timeouts und Kontext-Verwirrung zu verhindern, MÜSSEN sie iterativ geschrumpft werden.
**ABER:** KIs haben eine toxische Tendenz, wertvollen Kontext beim "Aufräumen" blind zu vernichten. Diese Regel stoppt das.

### ⚖️ Das eiserne Gesetz: "Archive First, Shrink Later"
Ehe auch nur _ein einziges Wort_ aus einer aktiven Datei im Handover-Ordner gelöscht oder zusammengefasst wird, gilt zwingend diese Reihenfolge:
1. **Sichern:** Die Vollversion der Datei wird zwingend via `smart_archive.ps1` in `_ARCHIVE/` versiegelt und committet.
2. **Review:** Der Agent erstellt einen Entwurf (Draft/Diff) der gekürzten Datei.
3. **Approval:** Der Operator MUSS den Entwurf prüfen. Erst nach explizitem "Go" darf die aktive Datei abgesaugt werden.

### 🍰 Das 4-Tier Relevanz-Modell (Wie geschrumpft wird)
Wenn ein Abschnitt in die Vergangenheit rückt, wird er nach diesem Raster abgewertet und in `walkthrough.md` oder `task.md` gekürzt:
- **Tier 1 (Gegenwart / Aktueller Sprint):**
  - **Status:** Volle Details, Code-Schnipsel, exakte Terminal-Outputs, Architekturentscheidungen. Nichts wird gekürzt.
- **Tier 2 (Jüngste Vergangenheit / Aktuell extrem relevant):**
  - **Status:** Zusammenfassung auf das Wesentliche.
  - **Formatierung:** Bulletpoints. Was wurde gemacht, welche Systeme waren primär betroffen.
- **Tier 3 (Ältere Historie / Nur noch kontextuell relevant):**
  - **Status:** Stark kondensiert auf 2 Sätze.
  - **Formatierung:** Nur noch **"Warum wurde es entwickelt?"** und **"Welchen Einfluss hat es auf die aktuelle Architektur?"** (Sinn der Existenz).
- **Tier 4 (Abgeschlossen / Inaktiver Ballast):**
  - **Status:** Physisch aus der aktiven Datei GELÖSCHT.
  - **Routing:** Existiert nur noch in der eingefrorenen Volldatei im Archiv. Im aktiven Handover wird es nicht mehr erwähnt. Ein Pointer existiert im `_ARCHIVE/ARCHIVE_INDEX.md`.

---

## # 🔢 AGENT BATCHING PROTOCOL
(Source: [agent-batching.md](file:///c:/Workspace/Repos/Viron-Server/_TASKS/OpenCode_Starter_Kit/02_Organization_Methodology/agent-batching.md))

> **STATUS:** NON-NEGOTIABLE
> **SCOPE:** Jeder Sub-Agenten-Auftrag

### 1. TOKEN-SCHÄTZUNG VOR LAUNCH
Bevor ein Agent gestartet wird, schätze:
- **Anzahl Dateien** die gelesen/geschrieben werden
- **Grobe Tool-Calls**: ~3 Calls pro Datei (Read + Write + Report-Update) = N Dateien × 3
- **Faustregel**: Jeder Tool-Call kostet ~1.000–2.000 Input-Tokens im Agenten-Fenster
Teile das mit und welche art von Agent gespawnt wird(Haiku, only read, ..., ...)

### 2. BATCH-GRÖSSE (LOGISCH, NICHT STARR)
- **Kleiner Batch:** 3–5 atomare Schritte. Für einfache, schnelle Tasks.
- **Mittlerer Batch:** 6–10 Schritte. Für zusammenhängende Tasks (z.B. ein Feature).
- **VERBOTEN:** Mehr als 15 Schritte in einem einzigen Agenten ohne explizite User-Freigabe.

**Entscheidungsregel:** "Kann ich dem User nach diesem Batch sinnvoll Zwischenbericht erstatten?" Wenn NEIN → Batch zu groß, aufteilen.

### 3. ZWISCHENBERICHT-PFLICHT
Nach jedem Batch:
1. Dem User kurz mitteilen: Was wurde erledigt?
2. Was kommt als nächstes?
3. Freigabe for den nächsten Batch einholen (oder direkt starten wenn offensichtlich).

### 4. KEINE MONOLITHISCHEN AGENTEN
**Verboten:** Einen Agenten mit 20+ Schritten losschicken nur weil es "effizienter" wirkt.
**Grund:** Der User verliert den Überblick, kann nicht eingreifen, Token-Budget verbrennt unkontrolliert.

### 5. ANALYSE ≠ PATCH (STRIKTE TRENNUNG)
**Verboten:** Analyse und Patching in einem einzigen Agenten-Lauf zusammenfassen.
**Pflicht:** Diese zwei Phasen sind immer getrennte Batches mit User-Freigabe dazwischen:
1. **Batch A — Analyse:** Agent liest alle Dateien, schreibt Report mit Konflikt-Matrix → STOP → meldet sich beim Orchestrator.
2. **Orchestrator:** Liest Report, bespricht Ergebnisse mit User, holt Freigabe for Patching ein.
3. **Batch B — Patch:** Agent patcht nur die freigegebenen Dateien, max. 5–8 Dateien pro Batch → STOP → meldet sich.
4. **Orchestrator:** Prüft Patches, gibt nächsten Batch frei.

---

## # Ground0 — Documentation & Knowledge Duty
(Source: [08_documentation-duty.md](file:///c:/Workspace/Repos/Viron-Server/_TASKS/OpenCode_Starter_Kit/02_Organization_Methodology/08_documentation-duty.md))

Diese Regeln gelten spezifisch für den **Orchestrator-Agenten** (Antigravity / Claude Code) im Ground0-Projekt. Wissen darf niemals flüchtig im Kontext-Window existieren und mit der Session sterben.

### 1. Die Decision Log Pflicht (DECISION_LOG.md)
Jede wesentliche architektonische oder strategische Entscheidung (z.B. Wahl einer Datenbank, eines Secret-Vaults, Bestimmung von Netzwerk-Routen) MUSS formal dokumentiert werden.
- Eine Ausführung ohne vorherigen Log-Eintrag ist strikt VERBOTEN.
- **Zielort:** `docs/DECISION_LOG.md`
- **Inhalt:** Es muss dokumentiert werden: WAS entschieden wurde, WARUM es entschieden wurde, WANN (Datum) und ob es REVERSIBEL ist.

### 2. Die Knowledge Item (KI) Pflicht
Das Lesen von langen Research-Dokumenten (Tier-3 Dateien wie `research.md` oder externe Quellen) verschwendet Token, wenn das Ergebnis nicht kondensiert wird.
- Wenn der Agent Research-Dateien analysiert, MUSS er die wesentlichen Patterns und Fakten exzerpieren.
- Dieses Wissen muss zwingend als formales Knowledge Item (KI) verfasst werden – primär als Markdown Datei in `docs/`.

### 3. Kein Wissen durch bloße "Anerkennung"
Wenn in `task.md` oder in einem Sprint-Plan gefordert wird, Wissen zu sichern oder Entscheidungen festzuhalten, reicht es nicht, einfach den Haken an der Aufgabe zu setzen. Der physische Akt des Schreibens (`DECISION_LOG.md`, Erstellung des KI) MUSS durchgeführt werden, bevor die Checkbox in der `task.md` aktiviert werden darf.
