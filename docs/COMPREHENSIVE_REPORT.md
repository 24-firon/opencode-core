# Comprehensive Report — opencode-core Control Node

> **Erstellt:** 01. April 2026
> **Version:** Post-Refactoring (PR #9)
> **Zweck:** Ergänzende, übergreifende Informationsquelle. Alles, was man wissen muss, um dieses Repo zu verstehen — ohne die spezialisierten Dateien zu duplizieren.

---

## Was ist dieses Repo?

`opencode-core` ist die **Control Node** des OpenCode-Frameworks. Sie ist kein normales Anwendungs-Repo. Sie ist das Werkzeug, das andere Repos mit KI-Infrastruktur ausstattet: Regeln, Configs, Skills, Knowledge-Cluster.

**Ein Satz:** Dieses Repo verwaltet die Regeln und Skills, die in andere Repos deployed werden, um dort KI-Agenten zu betreiben.

---

## Die 3-Schichten-Logik (Kernarchitektur)

Das gesamte Repo basiert auf einer einfachen Trennung von drei Ebenen:

| Schicht | Ordner | Zweck | Wer liest das? |
|:---|:---|:---|:---|
| **SOURCE** | `src/` | Die Wahrheit. Master-Regeln und Skills. | Wird kopiert — niemand liest direkt. |
| **LIVE** | `.opencode/rules/`, `.opencode/skills/` | Was DIESER Agent in der aktuellen Session befolgt. | Der laufende Agent. |
| **DEPLOYMENT** | `deployments/` | Konfigurierte Stacks für verschiedene Repo-Typen (Python, React, etc.). | Wird ins Ziel-Repo kopiert. |

**Die wichtigste Regel:** Meta-Regeln (Regeln über Regeln, z.B. "Wie verwaltet man Regeln?") leben NUR in der LIVE-Schicht. Sie werden NIEMALS in Ziel-Repos deployed. Ein Python-Backend braucht keine Regel darüber, wie man Deployment-Stacks organisiert.

### Warum diese Trennung?

Vorher gab es 21 "Regeln" in `.opencode/rules/`, von denen 16 keine Regeln waren — sie waren Tutorials, Checklisten, Protokolle. Der Agent lud ~840 Zeilen bei jedem Boot, obwohl er für die meisten Aufgaben nur ~75 Zeilen brauchte.

Nachher: 5 echte Trigger-Regeln, die bei Bedarf auf Wissens-Dateien zeigen. Wenn der Agent eine Config schreibt, feuert Rule 90 und lädt das Config-Wissen nach. Wenn er fertig ist, wird das Wissen wieder aus dem Kontext entfernt.

---

## Ordnerstruktur (Was liegt wo?)

```
Root (/)
├── AGENTS.md                   ← Permanent aktive Grundregeln, Ordnerstruktur, Routing
├── REPO_BRIEFING.md            ← Detaillierte Übersicht (älteres Dokument)
├── RULE_REGISTRY.md            ← Zentraler Index aller Regeln und Skills
├── opencode.jsonc              ← V3 Konfiguration (watcher, permissions, instructions)
│
├── src/                        ← QUELLE: Master-Regeln und Skills
│   ├── rules/                  ← 5 Master-Regeln (00, 10, 30, 60, 90)
│   ├── skills/                 ← 19 Master-Skills (10 eigene + 9 externe)
│   └── config/                 ← JSON-Schema-Referenz (leer, geplant)
│
├── deployments/                ← Konfigurierte Stacks für Repo-Typen
│   ├── README.md               ← Routing: Welcher Typ bekommt was?
│   ├── generic/                ← Basis-Stack für unbekannte Repos
│   │   ├── opencode.jsonc      ← Universelle Config
│   │   └── .opencode/rules/   ← 7 universelle Regeln für Ziel-Repos
│   ├── python-fastapi/         ← Python/FastAPI-Repos (ruff, __pycache__, .venv)
│   └── react-vite/             ← React/Vite-Frontend (node_modules, dist, .next)
│
├── .opencode/                  ← LIVE: Was DIESER Agent hier befolgt
│   ├── rules/                  ← 5 aktive Trigger-Regeln (00-90)
│   └── skills/                 ← 19 aktive Skills
│
├── templates/                  ← Der Goldstandard (base_payload)
│   └── base_payload/           ← Kopiervorlage für Ziel-Repos
│
├── docs/                       ← Wissen, Prompts, Learnings, RAG-Cluster
│   ├── learnings/              ← 5 Post-Mortem-Analysen
│   ├── prompts/                ← 7 Boot- und Follow-Up-Prompts
│   ├── opencode_knowledge/     ← 10 RAG-Cluster + Meta-Daten
│   ├── user_manual/            ← 11 User Manuals (für Menschen)
│   ├── DECISION_LOG.md         ← 9 Architektur-Entscheidungen
│   ├── SESSION_HANDOVER.md     ← Letzter Session-Status
│   ├── TASK_LIST.md            ← Priorisierte Aufgaben
│   └── REPO_READ_LIST.md       ← Was muss ich lesen?
│
├── import/                     ← Import & Export
│   ├── context_dispatcher_export/  ← 16 Wissens-Dateien + Brief
│   ├── config.json             ← OpenCode JSON-Schema (1490+ Zeilen)
│   └── Neuer Ordner/           ← Alte Import-Bundles (Archiv)
│
├── playground/                 ← Sandbox für Entwürfe & Backups
│   └── opencode-rules-backup/  ← Backup der alten Rules
│
└── _ARCHIVE/                   ← Altes Material (Strict Avoidance)
```

---

## Die 5 Regeln (00-90)

### Regel 00 — Master Orchestrator Directive
- **Zweck:** Identität und Workflow. "Du bist die Control Node."
- **Inhalt:** Recon → Adapt → Gate. Proactive Shielding. Base-Payload ist heilig.
- **Trigger:** Immer beim Start.

### Regel 10 — Local Dev Standards
- **Zweck:** Essentielle Verhaltensregeln (konsolidiert aus 16 Quellen).
- **Inhalt:** Safety over Obedience, Conventional Commits, Double-Turn-Lock, Grep don't guess, Blocker-Reports.
- **Trigger:** Jede Session.
- **Herkunft:** Aus 20_omega_constitution, 21_conduct, 40_git_workflow, 50_engineering, 85_feedback_integrity und anderen extrahiert.

### Regel 30 — Repo Architecture
- **Zweck:** Erklärt die 3-Schichten-Logik dieses Repos.
- **Inhalt:** Source (src/) vs. Live (.opencode/rules/) vs. Deployment (deployments/). Meta-Regeln deployed man nicht.
- **Trigger:** Jede Session, wenn strukturelle Fragen auftauchen.

### Regel 60 — Base Payload Architecture
- **Zweck:** Wie der Base-Payload kontextsensitiv für Ziel-Repos angepasst wird.
- **Inhalt:** Recon → Adapt → Speichern in deployments/ → Deploy.
- **Trigger:** Beim Deployment in ein Ziel-Repo.

### Regel 90 — V3 Config Architecture + Platform Hazards
- **Zweck:** OpenCode-spezifische Config-Wahrheiten und Plattform-Bugs.
- **Inhalt:** JSONC-Format, watcher.ignore, instructions Glob-Patterns, MCP-Credentials. Plus 4 Hazards: Snapshot-Freeze, Auth.json Exfiltration, Nackter REST-Server, Windows Permission.
- **Trigger:** Beim Schreiben oder Ändern von Configs, beim Betreiben des Servers.

---

## Die 19 Skills

### Eigene Skills (10) — Framework & Workflow

| Skill | Zweck | Status |
|:---|:---|:---|
| `doc-harvester-protocol` | Doku → RAG-Cluster + User Manual + Community Reality Checks | ✅ V3 |
| `knowledge-router` | Zeigt, wo das OpenCode-Wissen liegt | ✅ V3 |
| `agent-batching` | Sub-Agent Batch-Größen, Analyse≠Patch Trennung | ✅ V3 |
| `git-policy` | Commit-Budget, Conventional Commits, Secret-Check | ✅ V3 |
| `handover-protocol` | Append-Only Handover, Plan vs. Realität Trennung | ✅ V3 |
| `memory-shrink` | 4-Tier Memory Modell, Archive-First, Shrink-Later | ✅ V3 |
| `secrets-management` | Auth, JWT, Passwörter, API-Keys, Boundary Security | ✅ V3 |
| `testing-protocols` | Definition of Done, QA-Pipeline, Escalation Matrix | ✅ V3 |
| `three-zone-workflow` | Brain → WIP → Original (sichere Datei-Editierung) | ✅ V3 |
| `viron-stack-constraints` | CrewAI, n8n, asyncpg, Event-Schleifen | ⏳ V1 |

### Externe Skills (9) — Community & Code-Qualität

| Skill | Zweck |
|:---|:---|
| `code-review` | Sentry-Style Code Reviews |
| `code-simplifier` | Code vereinfachen & vereinheitlichen |
| `find-bugs` | Bugs, Vulnerabilities, Code-Quality |
| `security-review` | OWASP-basierte Security-Audits |
| `skill-scanner` | Skills auf Konsistenz & Sicherheit prüfen |
| `skill-creator` | Neue Skills nach Standard erstellen |
| `multi-agent-orchestration` | Multi-Agent Workflow-Steuerung |
| `verification-before-completion` | Evidenz vor Erfolgs-Behauptungen |
| `ui-ux-pro-max` | UI/UX Design Intelligence |

---

## Die 10 RAG-Cluster (OpenCode-Framework-Wissen)

Die RAG-Cluster sind das eigentliche OpenCode-Wissen: 34 Seiten offizielle Doku + Community-Research destilliert in 10 Dateien. Jeder Cluster enthält JSON-Schemata, Config-Keys, Workarounds und Community Reality Checks.

| Cluster | Thema | Kritische Erkenntnis |
|:---|:---|:---|
| 01 | Config, Network, Enterprise | watcher.ignore wird vom Snapshot ignoriert |
| 02 | Providers & Models | Ollama Tool-Calling schlägt bei 40-60% der Modelle fehl |
| 03 | Tools & Permissions | Default-Modus = gefährlich; Permission-Doom-Loop |
| 04 | MCP Plugins & ACP | Kein Auto-Reconnect; Plugin-Crash ohne Recovery |
| 05 | Agents, Skills, Commands | Steps-Limit verhindert Endlosschleifen |
| 06 | CLI, Server, Headless | Kein Auth-Layer auf REST-Server |
| 07 | TUI, Web, IDE, Share | Headless: DISPLAY=:99 Pflicht; EDITOR wait Bug |
| 08 | GitHub & GitLab | Auto-Merge erfordert expliziten `--merge` Flag |
| 09 | SDK & Formatters | $FILE Token ist Injection-Vector |
| 10 | Troubleshooting & Windows | WSL-Pflicht für Windows; `formatter: false` global |

---

## Abhängigkeiten (Was hängt von was ab?)

```
AGENTS.md (permanent)
  └→ Regel 30 (Repo Architecture) — definiert die 3-Schichten

Regel 00 (Orchestrator)
  └→ Regel 60 (Base Payload) — wird bei Deployment geladen
  └→ Skills (analyzer-*) — werden bei Recon geladen

Regel 90 (Config)
  └→ Cluster 01 (Config) — wird bei Config-Problemen geladen
  └→ Cluster 10 (Troubleshooting) — wird bei Server-Problemen geladen

Regel 10 (Dev Standards)
  └→ KEINE Abhängigkeit — ist self-contained

RAG-Cluster (Wissen)
  └→ User Manuals (Duplikate für Menschen)
  └→ Community Reality Checks (inline)
```

**Regel 10 ist die einzige Regel ohne externe Abhängigkeit.** Alle anderen Regeln zeigen bei Bedarf auf RAG-Cluster oder Skills.

---

## Exportierte Wissens-Dateien (16)

Die 16 Dateien in `import/context_dispatcher_export/` waren früher "Regeln" in `.opencode/rules/`. Sie wurden identifiziert als allgemeines Agent-Wissen, nicht als OpenCode-spezifische Regeln.

### Was sie sind
- Grundprinzipien (Integrität, Anti-Hallucination, Safety)
- Git- und Engineering-Standards
- Skill-Management (Philosophie, Anatomie, Checklisten)
- Orchestrierung und Feedback-Protokolle

### Was mit ihnen passieren soll
Sie werden vom **Context Dispatcher System** genutzt — einem separaten Repo, das allgemeine Agenten-Design verwaltet. Der Brief (`LETTER_TO_DISPATCHER.md`) erklärt:
1. Eine Regel ist kein Lehrbuch — sie ist ein Trigger
2. Das Wissen wird bei Bedarf in den Kontext geladen (wie bei einem Skill)
3. Token-Ersparnis: ~89% im Basiskontext

### Trigger-Tabelle (Welcher Task lädt welches Wissen?)

| Trigger (Aufgabe) | Geladenes Wissen |
|:---|:---|
| Skill erstellen oder nutzen | 80 (Philosophie), 81 (Anatomie), 86 (Construction), 87 (Routing) |
| Regel schreiben oder ändern | 23 (Rule Priority), 10 (Knowledge Capture), 82 (Checklist) |
| Git-Operationen | 40 (Git Workflow) |
| Tests schreiben | 50 (Engineering Standard) |
| Sub-Agenten delegieren | 70 (Orchestration) |
| Blockiert oder unsicher | 85 (Feedback Integrity) |
| System analysieren | 13 (Forensic Analyst) |
| Jede Handlung | 20 (Omega Constitution), 21 (Conduct), 22 (Documentation Duty) |

---

## Potenziale (Was noch möglich ist)

### Kurzfristig (nächste Session)
- `deployments/generic/.opencode/rules/` enthält noch die alten aufgeblasenen Regeln → sollten durch kompakte Versionen ersetzt werden
- `deployments/README.md` muss aktualisiert werden
- Boot-Prompt (`00_INITIAL_PROMPT.md`) muss an neue Struktur angepasst werden
- `REPO_BRIEFING.md` muss an neue Ordnerstruktur angepasst werden

### Mittelfristig
- `src/config/` mit dem OpenCode JSON-Schema füllen (aus `import/config.json`)
- Deployment-Stacks für weitere Repo-Typen (Go, Rust, Vue)
- `import/config.json` systematisch auswerten (1490+ Zeilen → RAG-Cluster-artige Grundlagen)
- `import/Neuer Ordner/` bereinigen (Archiv)

### Langfristig
- Das Context Dispatcher System (separates Repo) implementiert die Trigger→Wissen-Architektur
- Die 16 exportierten Dateien werden dort in Skills oder Knowledge-Dateien umgewandelt
- opencode-core wird zum reinen OpenCode-Deployment-Tool (ohne allgemeines Agent-Wissen)

---

## Bekannte Probleme

| Problem | Status | Lösung |
|:---|:---|:---|
| `deployments/generic/` hat alte aufgeblasene Regeln | Offen | Komprimierte Versionen erstellen |
| Regel 10 ist ein Konsolidat aus 16 Quellen — könnte zu viel für eine Datei sein | Offen | Prüfen, ob Sub-Regeln nötig sind |
| `REPO_BRIEFING.md` und `AGENTS.md` überlappen teilweise | Offen | Entweder mergen oder klar trennen |
| `import/Neuer Ordner/` enthält alte Import-Bundles | Offen | User will selbst aufräumen |
| `skills-lock.json` listet nur 4 externe Skills (von 9) | Offen | Lockfile aktualisieren |

---

## Zusammenfassung

| Metrik | Vorher | Nachher |
|:---|:---|:---|
| Regeln | 21 | 5 (00-90) |
| Zeilen pro Boot | ~840 | ~75 |
| Token-Ersparnis | — | ~91% |
| Skills | 35 Analyzer (V1) | 19 (10 eigene V3 + 9 externe) |
| Deployment-Stacks | 0 | 3 (generic, python-fastapi, react-vite) |
| RAG-Cluster | 0 | 10 |
| User Manuals | 0 | 11 |
| Learnings | 2 | 5 |
| PRs | 8 | 9 |
