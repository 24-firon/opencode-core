# Research Report: OpenCode & OpenClaw Ecosystem (Stand: März 2026)

## 1. Executive Summary

Dieser Bericht fasst die Ergebnisse der Web- und Systemrecherche zum Ökosystem rund um **OpenCode** (AI Coding Agent CLI) und **OpenClaw** (Personal AI Assistant) zusammen. Ziel ist die Ableitung einer robusten, hochautomatisierten Multi-Agenten-Architektur für zukünftige Repositories (speziell im Kontext von Node.js/Docker-Deployments).

Die Analyse zeigt einen klaren Paradigmenwechsel in der Community (Stand Frühjahr 2026): Weg von monolithischen, interaktiven "Approval-Gate"-Agenten (wie ursprünglich von OpenAgentsControl vorgesehen) hin zu **asymmetrischen Hub-and-Spoke-Swarm-Architekturen** mit vollautomatisierten Quality-Gates, State Compaction und Vektor-basiertem Langzeitgedächtnis.

---

## 2. Kerntechnologien & Referenzprojekte

### 2.1 OpenCode (Core System)
- **Identität**: `opencode.ai` (Nicht zu verwechseln mit der deutschen Behörden-Plattform `opencode.de`).
- **Architektur**: Simultane Ausführung eines Headless-HTTP-Servers (OpenAPI 3.1, standardmäßig Port `127.0.0.1:4096`) und einer TUI (Terminal User Interface).
- **Schnittstellen**: Nativer Support für Model Context Protocol (MCP) und Agent Client Protocol (ACP) via `stdin/stdout` oder nd-JSON Streams.
- **Workflow-Phasen**: Strikte Trennung zwischen **Plan Mode** (analytisch, Read-Only) und **Build Mode** (Modifikation, Execution).

### 2.2 OpenClaw (Das Haupt-Framework)
- **Repository**: `openclaw/openclaw` (ca. 249K Stars)
- **Fokus**: Ein "Local-First" Personal AI Assistant, lauffähig auf allen OS und Plattformen (WhatsApp, Telegram, Discord, etc.).
- **Architektur-Updates (v2026.3.x)**: Native Integration von ACP-Agenten als First-Class Runtimes für Thread-gebundene Sessions. Starker Fokus auf "External Secrets Management" und "Channel Plugins".

### 2.3 Die Swarm-Evolution (Power-User Setups)
Die Reddit-Community (`r/opencodeCLI`) und GitHub-Power-User nutzen primär drei Erweiterungen, um OpenCode skalierbar zu machen:

1. **OpenAgentsControl (OAC)** (`darrenhinde/OpenAgents`)
   - **Konzept**: Pattern-Control via `.opencode/context/`. Das System lernt Projekt-Patterns (Minimal Viable Information - MVI), bevor Code geschrieben wird.
   - **Schwäche**: Basiert auf manuellen "Approval-Gates" (Mensch muss zustimmen), was autonome Langzeit-Loops blockiert.

2. **OpenCode Swarm** (`zaxbysauce/opencode-swarm`)
   - **Konzept**: Wandelt einen einzelnen Agenten in ein Team von spezialisierten Rollen (z.B. Coder, Reviewer, Tester, Security-Experte).
   - **Prozess**: 
     1. Planungsphase (Kritiker-Agent prüft den Plan).
     2. Implementierung Task-für-Task.
     3. **7 automatisierte QA-Checks** vor dem Commit (Syntax, Imports, Linting, Secrets, Security, Build, Quality). Nichts wird deployed, bevor alle Checks grün sind.

3. **OpenSwarm / swarm-tools** (`Intrect-io/OpenSwarm`, `joelhooks/swarm-tools`)
   - **Konzept**: Orchestrierungs-Layer mit Langzeitgedächtnis.
   - **Technologie**: Nutzt **LanceDB** mit Vektor-Embeddings für den Erhalt von Kontext über sehr lange Sessions hinweg. Integriert autonom Linear-Issues, Worker/Reviewer-Pipelines und sendet Status-Reports an Discord.

4. **awesome-slash** (Workflow Toolkit)
   - **Konzept**: End-to-End Automatisierung. Speichert den Session-State laufend in einer `.opencode/flow.json`. Erlaubt "State Compaction" (Komprimierung des Kontextfensters) für fehlerresistente Auto-Execution ohne Token-Überlauf.

---

## 4. Deep Dive: OpenCode Swarm (zaxbysauce/opencode-swarm)

### 4.1 Ordnerstruktur

```
opencode-swarm/
├── .swarm/                  # Swarm State (persistent, disk-basiert)
│   ├── plan.md              # Projekt-Roadmap (Tasks, Status, Abhängigkeiten)
│   ├── context.md           # Getroffene Entscheidungen, SME-Guidance (gecached)
│   ├── evidence/            # Review-Verdikte, Test-Ergebnisse, Diffs pro Task
│   └── history/             # Phase-Retrospektiven und Metriken
├── src/                     # Core Source Code
├── dist/                    # Kompilierte JavaScript-Dateien
├── docs/                    # Architektur- und Design-Dokumentation
├── tests/                   # 6.000+ Tests (Unit, Integration, Adversarial, Smoke)
├── scripts/                 # Build- und Deploy-Scripts
├── .github/workflows/       # CI/CD Pipeline
├── package.json             # npm Package Definition
├── biome.json               # Biome Linter Konfiguration
└── tsconfig.json            # TypeScript Konfiguration
```

### 4.2 Die 9 spezialisierten Agenten

| Agent | Rolle | Wann aktiv | Tools (Anzahl) |
|-------|-------|------------|-----------------|
| **architect** | Plant Projekte, delegiert Tasks, erzwingt Quality Gates | Immer (Coordinator) | 17 (alle) |
| **explorer** | Scannt Codebase, versteht was existiert | Vor Planung, nach jeder Phase | 9 |
| **sme** | Domain-Expert (Security, APIs, DBs) | Während Planung, Guidance wird gecached | 7 |
| **critic** | Prüft den Plan bevor Code geschrieben wird | Nach Planung | 5 |
| **coder** | Schreibt Code, ein Task nach dem anderen | Während Execution | 6 |
| **reviewer** | Prüft Code auf Korrektheit & Security | Nach jedem Task | 11 |
| **test_engineer** | Schreibt & führt Tests aus, inkl. adversarial edge cases | Nach jedem Task | 8 |
| **designer** | Generiert UI-Scaffolds & Design Tokens (opt-in) | Vor UI-Tasks | 3 |
| **docs** | Aktualisiert Dokumentation passend zum Gebauten | Nach jeder Phase | 8 |

### 4.3Pro Die Pipeline ( Task)

```
MODE: EXECUTE (per task)
│
├── 5a. @coder implements (ONE task only)
├── 5b. diff + imports (contract + dependency analysis)
├── 5c. syntax_check (parse validation)
├── 5d. placeholder_scan (catches TODOs, stubs, incomplete code)
├── 5e. lint fix → lint check
├── 5f. build_check (does it compile?)
├── 5g. pre_check_batch (4 parallel: lint, secretscan, SAST, quality budget)
├── 5h. @reviewer (correctness pass)
├── 5i. @reviewer (security pass, if security-sensitive files changed)
├── 5j. @test_engineer (verification tests + coverage ≥70%)
├── 5k. @test_engineer (adversarial tests)
├── 5l. ⛔ Pre-commit checklist (all 4 items required, no override)
└── 5m. Task marked complete, evidence written
```

### 4.4 Integrierte Quality-Gates (Built-in Tools)

| Tool | Zweck |
|------|-------|
| **syntax_check** | Tree-sitter Validation (11 Sprachen) |
| **placeholder_scan** | Catches TODOs, FIXMEs, stubs |
| **sast_scan** | Offline Security Analysis, 63+ Regeln, 9 Sprachen |
| **sbom_generate** | CycloneDX Dependency Tracking |
| **build_check** | Native Build/Typecheck des Projekts |
| **quality_budget** | Erzwingt Complexity, Duplication, Test-Ratio Limits |
| **pre_check_batch** | Parallel: lint, secretscan, SAST, quality (~15s vs ~60s sequential) |
| **phase_complete** | Verifiziert Phase-Abschluss, erfordert gültiges Retrospective |

### 4.5 Guardrails & Circuit Breaker

| Signal | Default Limit | Verhalten |
|--------|---------------|-----------|
| Tool Calls | 200 | Agent wird gestoppt |
| Duration | 30 min | Agent wird gestoppt |
| Same tool repeated | 10x | Agent wird gewarnt, dann gestoppt |
| Consecutive errors | 5 | Agent wird gestoppt |

### 4.6 Modell-Routing (Empfehlungen)

| Agent | Empfohlenes Modell | Begründung |
|-------|-------------------|------------|
| architect | OpenCode UI Selection | Stärkstes Reasoning |
| coder | `minimax-coding-plan/MiniMax-M2.5` | Schnelle, akkurate Code-Generierung |
| reviewer | `zai-coding-plan/glm-5` | Anders trainiert als Coder → bessere Fehlerfindung |
| test_engineer | `minimax-coding-plan/MiniMax-M2.5` | Gleiche Stärken wie Coder |
| explorer | `google/gemini-2.5-flash` | Schnelle Read-heavy Analyse |
| sme | `kimi-for-coding/k2p5` | Starke Domain-Expertise |
| critic | `zai-coding-plan/glm-5` | Unabhängige Plan-Prüfung |

---

## 5. Deep Dive: swarm-tools (joelhooks/swarm-tools)

### 5.1 Ordnerstruktur

```
swarm-tools/
├── .hive/                   # Git-backed Task Tracking (persistent)
├── .opencode/               # OpenCode Context & Commands
├── .claude/                 # Claude Code Context
├── .claude-plugin/          # Claude Code Plugin Definition
├── packages/                # Monorepo Packages (Core, Mail, Hive, etc.)
├── apps/web/                # Web Dashboard
├── docs/                    # Documentation
├── research/                # Forschungs-Notizen
├── scripts/                 # Build Scripts
├── .github/                 # GitHub Actions
├── AGENTS.md                # Agent Definitionen
├── SWARM-CONTEXT.md        # Swarm Context Dokumentation
├── SWARM-TESTING-GUIDE.md  # Test Guide
├── COMPACTION-THRESHOLD-TUNING.md  # Context Compaction Tuning
└── package.json             # Root Package (Bun)
```

### 5.2 Core Concepts

**Hive** – Git-backed Task Tracking in `.hive/`. Überlebt Sessions, synced via Git.

```typescript
hive_create({ title: "Fix auth bug", type: "bug" })
hive_cells({ status: "in_progress" })
hive_close({ id: "cell-123", reason: "Fixed" })
```

**Hivemind** – Semantic Memory mit Embeddings. Speichert Learnings, durchsuchbar.

```typescript
hivemind_store({ information: "Auth requires idempotency keys", tags: "auth,gotcha" })
hivemind_find({ query: "auth patterns" })
```

**Swarm Mail** – Actor-model Koordination zwischen Agenten. File Reservations, Messaging, Checkpoints.

```typescript
swarmmail_reserve({ paths: ["src/auth/*"], exclusive: true })
swarmmail_send({ to: ["worker-b"], subject: "Need types", body: "..." })
```

### 5.3 Event Sourcing Architektur

Alles ist ein append-only Event Log:

```
agent_registered → Agent joinst den Swarm
message_sent     → Agent-zu-Agent Kommunikation
file_reserved   → Exklusiver Lock erworben
file_released   → Lock freigegeben
checkpoint      → Progress Snapshot
outcome         → Completion Result
```

### 5.4 Learning System

Jede Completion recordet Duration, Errors, Files touched, Success.

- **Patterns** maturieren: candidate → established → proven
- **Anti-patterns** werden auto-generiert wenn Failure Rate > 60%
- **Confidence decays** über 90 Tage除非 revalidiert

### 5.5 Technologie-Stack

| Komponente | Technologie |
|------------|-------------|
| Database | libSQL (Embedded SQLite) |
| Embeddings | Ollama (optional, fallbacks to FTS) |
| Task Tracking | Git-backed `.hive/` |
| Memory | Semantic mit Vektor-Embeddings |

---

## 6. Architektur-Empfehlung (Target State)

Für den Aufbau eines modernen, hochautomatisierten Repositories (z.B. für "MemuBot" oder ähnliche OpenClaw-Derivate) wird folgende **Hybride Architektur** empfohlen:

### 6.1 Asymmetrisches Model-Routing
- **Plan-Phase (Architektur/Reasoning)**: Einsatz von hochkapazitiven Modellen (z.B. Gemini 3.1 Pro, Claude 3.5 Opus) für System-Design, Fehler-Ursachen-Analyse (Root Cause) und Entscheidungsfindung.
- **Build-Phase (Execution/Code-Generierung)**: Einsatz von extrem schnellen und deterministischen Modellen (z.B. Claude 3.5 Sonnet, Gemini Flash) für die reine Syntax-Generierung basierend auf den Plänen.

### 6.2 Datei- und Ordnerstruktur
- `.opencode/context/`: Beinhaltet die OAC-basierten "Context-Injections" (Projekt-Patterns, Code-Style-Vorgaben).
- `.opencode/commands/`: Markdown-Dateien für Custom Slash-Commands (z.B. `/implement`, `/test`).
- `.opencode/flow.json`: Persistentes State-Management für Long-Running Tasks (inspiriert von `awesome-slash`).
- `.swarm/`: Plan.md, context.md, evidence/ (inspiriert von OpenCode Swarm).
- `.hive/`: Git-backed Task Tracking (inspiriert von swarm-tools).

### 6.3 Automatisierte QA-Pipelines (Gated Execution)
Verzicht auf manuelle Approval-Gates zugunsten einer automatisierten Pipeline (inspiriert von `OpenCode Swarm`):
1. **Linting & Formatting**: `pnpm biome check` (0 Errors Toleranz).
2. **Type Checking**: `npx tsc --noEmit`.
3. **Security/Secrets Check**: Automatisierter Scan vor jedem Git-Commit.
4. **Testing**: Unit/Integration-Tests müssen bestehen.
*Abbruch (Hard-Stop) der Agenten-Ausführung bei Fehlschlag eines Gates. Rückgabe an den "Reasoning-Agenten" zur Fehlerbehebung.*

### 6.4 State Preservation & Context Management
Integration einer "State Compaction"-Logik. Wenn das LLM-Kontextfenster zu groß wird, fasst ein Summary-Agent die bisherigen Erkenntnisse zusammen, speichert sie in der Vektor-DB (LanceDB/Ollama) oder der `flow.json` und startet einen frischen Kontext mit den kondensierten Instruktionen.

---

## 7. Fazit & Nächste Schritte

Das OpenCode-Ökosystem 2026 erfordert eine Abkehr vom monolithischen "Chat-Bot"-Denken. Ein erfolgreiches Setup ist ein orchestriertes Netzwerk aus spezialisierten Agenten (Swarm), die über strikte, automatisierte Quality-Gates und asymmetrisches Model-Routing gesteuert werden. 

**Nächster logischer Schritt (Phase 2):** Entwurf der konkreten Verzeichnisstruktur (`.opencode/`, `.swarm/`, `.hive/`) und Spezifikation der Agenten-Rollen (`AGENTS.md` / Konfigurations-JSON) auf Basis dieser Erkenntnisse.