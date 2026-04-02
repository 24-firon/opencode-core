# BRIEF AN DEN CONTEXT DISPATCHER

> **Von:** opencode-core Control Node
> **Datum:** 01. April 2026
> **An:** Das Context Dispatcher System (oder wer auch immer Agenten-Regeln orchestriert)

---

## Die Erkenntnis

Wir haben in opencode-core festgestellt, dass unsere Regeln zu **Wissens-Datenbanken** mutiert sind. 21 Dateien in `.opencode/rules/`, von denen 16 keine Regeln sind — sie sind Tutorials, Checklisten, Protokolle und Konzept-Dokumente, die sich als Regeln verkleidet haben.

**Das Problem:** Ein Agent, der "Conventional Commits" wissen soll, lädt eine 20-Zeilen-Datei, die ihm erklärt, *warum* wir Conventional Commits nutzen und *wie* die Commit-Historie intuitiv wird. Das sind ~15 Zeilen Overhead pro Regel. Bei 21 Regeln = ~250 verschwendete Token.

**Die Lösung:** Eine Regel ist kein Lehrbuch. Eine Regel ist ein **Trigger**, der den Agenten zwingt, bei Bedarf das richtige Wissen zu laden.

---

## Was in diesem Ordner liegt

16 Dateien, die in opencode-core fälschlich als "Regeln" existierten. In Wahrheit sind sie:

### Grundprinzipien (Allgemeines Agent-Design)
| Datei | Was es ist | Warum es allgemein ist |
|:---|:---|:---|
| `10_discipline_of_knowledge_capture.md` | "Lektionen manifestieren" | Gilt für jedes Agent-System |
| `13_forensic_analyst_mandate.md` | "Suche den Schmerz, nicht den Happy Path" | Mindset — kein OpenCode-spezifisch |
| `20_omega_constitution.md` | "Integrität vor Kompression" | Goldene Axiom — universell |
| `21_conduct.md` | "Safety over Obedience" | Sicherheits-Prinzip — universell |
| `22_documentation-duty.md` | "Decision Log Pflicht" | Dokumentations-Disziplin — universell |
| `23_local-rule-priority.md` | "Lokale schlagen globale Regeln" | System-Design — universell |

### Git & Engineering (Allgemeines Workflow-Wissen)
| Datei | Was es ist | Warum es allgemein ist |
|:---|:---|:---|
| `40_git_workflow.md` | Conventional Commits, Worktree-Isolation | Git ist nicht OpenCode-spezifisch |
| `50_engineering_standard_workflow.md` | Branches für Isolation, Testing | Engineering-Standard — universell |

### Orchestration (Allgemeines Agent-Management)
| Datei | Was es ist | Warum es allgemein ist |
|:---|:---|:---|
| `70_orchestration_and_sub_agents.md` | 4-Pillar Briefing, Scope-Boundary | Sub-Agent-Delegation — universell |
| `85_feedback_integrity_protocol.md` | Blocker-Reports statt Raten | Kommunikations-Protokoll — universell |

### Skill Management (Allgemeines Skill-System-Wissen)
| Datei | Was es ist | Warum es allgemein ist |
|:---|:---|:---|
| `80_skill_philosophy_and_workflow.md` | "Skills sind Router, nicht Archive" (73 Zeilen!) | Skill-Philosophie — nicht OpenCode-spezifisch |
| `81_anatomy_of_complex_skill.md` | Ordnerstruktur von Skills (90 Zeilen!) | Skill-Architektur — nicht OpenCode-spezifisch |
| `82_skill_creation_checklist.md` | Checkliste beim Erstellen (59 Zeilen!) | Skill-Qualität — nicht OpenCode-spezifisch |
| `84_knowledge_bias_shield.md` | Examples als Definition of Done | Anti-Flach-Prosa — universell |
| `86_skill_construction_law.md` | Router-Anforderungen für Skills | Skill-Erstellung — nicht OpenCode-spezifisch |
| `87_skill_routing_reading.md` | Konditionales Laden von Skill-Inhalten | Skill-Nutzung — nicht OpenCode-spezifisch |

---

## Was ihr damit tun sollt

### 1. Trennt Wissen von Regeln
Diese Dateien sind **hochwertiges System-Wissen**. Aber sie sind keine Regeln. Eure Aufgabe: Baut **dünne Trigger-Regeln**, die auf dieses Wissen zeigen und es bei Bedarf in den Kontext ziehen.

### 2. Beispiel: Wie eine Trigger-Regel aussieht

**Vorher (aufgeblasene "Regel" — 73 Zeilen):**
```markdown
# Wie man Skills wirklich nutzt (Für Agenten)
> **Dieses Dokument ist eine Pflichtlektüre. Lies es, BEVOR du einen Skill benutzt.**
> Es erklärt, was Skills sind, was sie NICHT sind, und warum du sie fast immer falsch benutzt.
## Die Grundwahrheit
Ein Skill ist kein Textbuch. Er ist kein Archiv. Er ist ein **Router**...
[60 weitere Zeilen Tutorial]
```

**Nachher (Trigger-Regel — 5 Zeilen):**
```markdown
# 80. SKILL ROUTING
**Scope:** Wenn du einen Skill benutzt.
**Gesetz:** Skills sind Router, nicht Archive. Lese nur die Dateien, die die Bedingungs-Matrix dir sagt.
**Trigger:** Bei Skill-Problemen → lade `docs/skill_knowledge/01_philosophy.md`.
```

Die 73 Zeilen Wissen liegen weiterhin bereit — aber nur der Trigger ist die Regel.

### 3. Das Prinzip: Context Orchestration
```
Boot → Nur Trigger-Regeln laden (5-10 Zeilen pro Regel)
  ↓
Task "Nutze Skill X" → Trigger 80 feuert
  ↓
Wissen "01_philosophy.md" wird in Kontext geladen (73 Zeilen)
  ↓
Agent weiß jetzt, wie Skills funktionieren
  ↓
Task fertig → Wissen wird aus Kontext entfernt (nächster Turn)
```

**Token-Ersparnis pro Session:** ~500-800 Zeilen (von ~900 auf ~200-400).

---

## Die Verbindungen

Jede dieser 16 Dateien ist mit bestimmten Aufgaben verknüpft. Wenn ein Agent diese Aufgabe ausführt, MUSS das zugehörige Wissen geladen werden:

| Trigger (Aufgabe) | Wissen das geladen werden muss |
|:---|:---|
| "Erstelle oder nutze einen Skill" | 80 (Philosophie), 81 (Anatomie), 86 (Construction Law), 87 (Routing) |
| "Schreibe oder ändere eine Regel" | 23 (Local Rule Priority), 10 (Knowledge Capture), 82 (Creation Checklist) |
| "Führe Git-Operationen durch" | 40 (Git Workflow) |
| "Erstelle Tests oder validiere Code" | 50 (Engineering Standard) |
| "Delegiere an Sub-Agenten" | 70 (Orchestration) |
| "Blockiert oder unsicher" | 85 (Feedback Integrity) |
| "Analysiere ein System" | 13 (Forensic Analyst) |
| "Jede Handlung" | 20 (Omega Constitution), 21 (Conduct), 22 (Documentation Duty) |

---

## Zusammenfassung

| Was | Woher | Status |
|:---|:---|:---|
| 16 Wissens-Dateien | opencode-core `.opencode/rules/` | **Hier im Ordner, bereit für Integration** |
| Essenz (Kurzfassung) | opencode-core `.opencode/rules/10_local_dev_standards.md` | Bleibt in opencode-core als lokale Kompaktversion |
| OpenCode-spezifische Trigger | opencode-core `.opencode/rules/{00,30,60,90,100}_*.md` | Bleibt in opencode-core als reine Trigger |

Wir haben die 16 Dateien behalten, aber aus den Regeln herausgelöst. Sie sind jetzt frei für eure Context-Dispatcher-Architektur.

Macht was Gutes damit.

— opencode-core Control Node
