# 🧩 RULE REGISTRY

Diese Registry definiert alle aktiven Regeln. **5 Regeln** (00-90), keine aufgeblasenen Dokumente. Jede Regel ist ein Trigger — kein Lehrbuch.

> **Lade-Mechanismus:** Alle Regeln leben in `.opencode/rules/` und werden automatisch via `".opencode/rules/*.md"` in `opencode.jsonc` geladen.

---

## 🟢 REGELN (Alle 5)

| Nr. | Datei | Zweck | Trigger |
|:---|:---|:---|:---|
| **00** | `00_master_orchestrator_directive.md` | Identität: System-Architekt. Workflow: Recon → Adapt → Gate. | Startup |
| **10** | `10_local_dev_standards.md` | Sicherheit, Git, Wissen, Kommunikation — die Essenz. | Jede Session |
| **30** | `30_repo_architecture.md` | 3-Schichten: src/ (Quelle), .opencode/rules/ (Live), deployments/ (Deployed). | Jede Session |
| **60** | `60_base_payload_architecture.md` | Payload-Kopie, Adaptions-Workflow, Deployment-Stacks. | Payload-Deployment |
| **90** | `90_v3_config_architecture.md` | Config-Format, watcher.ignore, instructions, MCP + 4 Platform-Hazards. | Config/Server |

---

## 🔵 SKILLS (Ausführbare Workflows)

Nicht Regeln, sondern fertige Workflows. Werden via `skill({name: "..."})` geladen.

### Eigene Skills (Framework & Workflow)

| Name | Zweck | Status |
|:---|:---|:---|
| `doc-harvester-protocol` | Doku → RAG + User Manual + Community Reality Checks | ✅ V3 |
| `knowledge-router` | Zeigt, wo das OpenCode-Wissen in diesem Repo liegt | ✅ V3 |
| `agent-batching` | Sub-Agent Batch-Größen, Analyse≠Patch Trennung | ✅ V3 |
| `git-policy` | Commit-Budget, Conventional Commits, Account-Authenticity | ✅ V3 |
| `handover-protocol` | Append-Only Handover, Plan vs. Realität Trennung | ✅ V3 |
| `memory-shrink` | 4-Tier Memory Modell, Archive-First, Shrink-Later | ✅ V3 |
| `secrets-management` | Auth, JWT, Passwörter, API-Keys, Boundary Security | ✅ V3 |
| `testing-protocols` | Definition of Done, QA-Pipeline, Escalation Matrix | ✅ V3 |
| `three-zone-workflow` | Brain → WIP → Original (sichere Datei-Editierung) | ✅ V3 |
| `viron-stack-constraints` | CrewAI, n8n, asyncpg, Event-Schleifen | ⏳ V1 |

### Externe Skills (Community & Code-Qualität)

| Name | Zweck | Status |
|:---|:---|:---|
| `code-review` | Sentry-Style Code Reviews (Security, Performance, Testing) | ✅ |
| `code-simplifier` | Code vereinfachen & vereinheitlichen | ✅ |
| `find-bugs` | Bugs, Security-Vulnerabilities, Code-Quality finden | ✅ |
| `security-review` | OWASP-basierte Security-Audits mit Confidence-Reporting | ✅ |
| `skill-scanner` | Skills auf Konsistenz & Vollständigkeit prüfen | ✅ |
| `skill-creator` | Neue Skills nach Standard erstellen | ✅ |
| `multi-agent-orchestration` | Multi-Agent Workflow-Steuerung | ✅ |
| `verification-before-completion` | Evidenz vor Erfolgs-Behauptungen erzwingen | ✅ |
| `ui-ux-pro-max` | UI/UX Design Intelligence (50 Styles, 21 Palettes) | ⚠️ |

---

## 📦 EXPORTIERTE WISSENS-DATEIEN (16)

Früher als "Regeln" in `.opencode/rules/` — jetzt in `import/context_dispatcher_export/`. Das sind keine Regeln, sondern allgemeines Agent-Wissen (Grundprinzipien, Skill-Management, Git-Workflow, Orchestration). Sie werden vom Context Dispatcher System genutzt.

Siehe `import/context_dispatcher_export/LETTER_TO_DISPATCHER.md` für Details.
