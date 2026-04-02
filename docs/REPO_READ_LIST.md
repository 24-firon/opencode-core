# 📚 THE MANDATORY READ LIST — opencode-core

> **Zweck:** Jeder Agent, der dieses Repository betritt, MUSST diese Dateien kennen.
> **Letzte Aktualisierung:** 01. April 2026 | **Gesamt:** ~30 Kern + ~20 Optional + ~67 Legacy = ~117 Dateien im System.

---

## ⚡ Lade-Prioritäten (Was zuerst?)

| Schritt | Was | Warum |
|:---|:---|:---|
| **1** | Block 1 (Auto-geladen) | Identität, Regeln, Zustand — passiert automatisch |
| **2** | Block 2 (Kern: Learnings + Navigatoren) | Verstehe WARUM das System so ist |
| **3** | Block 3 (RAG-Cluster 01-10) | Das eigentliche OpenCode-Framework-Wissen |
| **4** | Block 4 (Config + Konfig) | Wie das System läuft |
| **5** | Block 5-7 (Optional) | Nur bei Bedarf nachschlagen |

---

## 🟢 BLOCK 1: AUTO-GELADEN (7 — nicht manuell lesen)

| #   | Datei                      | Zweck                                     |
|:--- |:-------------------------- |:----------------------------------------- |
| 1   | `AGENTS.md`                | Grundregeln, Ordnerstruktur, Routing. Immer aktiv. |
| 2   | `REPO_BRIEFING.md`         | Identität, Lageplan, 4 Säulen.            |
| 3   | `RULE_REGISTRY.md`         | 5 Regeln: OpenCode-spezifisch.            |
| 4   | `docs/DECISION_LOG.md`     | 9 ADRs (Architektur-Entscheidungen).      |
| 5   | `docs/SESSION_HANDOVER.md` | Letzte Session: erledigt + offen.         |
| 6   | `docs/TASK_LIST.md`        | Priorisierte Aufgaben (P0-P2).            |
| 7   | `.opencode/rules/*.md`     | 5 Regeln (00-90), auto-geladen via Glob.  |

---

## 🟡 BLOCK 2: KERNWISSEN — Manuelle Pflichtlektüre (16)

> Diese Dateien enthalten Wissen, das nirgendwo anders dupliziert ist. Ohne sie fehlt Kontext.

### Learnings (5)

| #   | Datei                                                       | Was du lernst                    |
|:--- |:----------------------------------------------------------- |:-------------------------------- |
| 7   | `docs/learnings/01_handover_scope_bleeding.md`              | Strikte Zonen-Trennung.          |
| 8   | `docs/learnings/02_soul_and_discipline.md`                  | AGENTS.md braucht eine "Soul".   |
| 9   | `docs/learnings/03_knowledge_harvesting_workflow.md`        | Knowledge Harvesting Workflow.   |
| 10  | `docs/learnings/04_sog_prinzip_transformation.md`           | Druck → Sog (Flow of Integrity). |
| 11  | `docs/learnings/05_instructions_array_and_autodetection.md` | Auto-Detection Bug & Lösung.     |

### Navigatoren (3)

| #   | Datei                                              | Zweck                                    |
|:--- |:-------------------------------------------------- |:---------------------------------------- |
| 12  | `.opencode/skills/knowledge-router/SKILL.md`       | Wo liegt OpenCode-Wissen?                |
| 13  | `docs/opencode_knowledge/00_MASTER_INDEX.md`       | Inhaltsverzeichnis der 10 RAG-Cluster.   |
| 14  | `.opencode/skills/doc-harvester-protocol/SKILL.md` | Wie wird neues Wissen ins System gebracht. |

### Konfiguration (2)

| #   | Datei                                    | Zweck                                         |
|:--- |:---------------------------------------- |:--------------------------------------------- |
| 15  | `.opencode/opencode.jsonc`               | Firewall (watcher, permission, instructions). |
| 16  | `import/LEARNINGS_WORKFLOW_AND_RULES.md` | "Gold Nugget" Extraktions-Protokoll.          |

### Rollen (lies JEWEILS die passende, nicht alle)

| #   | Datei                                  | Trigger                  |
|:--- |:-------------------------------------- |:------------------------ |
| 17  | `docs/prompts/00_INITIAL_PROMPT.md`    | Ultimativer Boot-Prompt. |
| 18  | `docs/prompts/04_ARCHITECT_ROLE.md`    | Regeln/Skills verändern. |
| 19  | `docs/prompts/05_OPERATOR_ROLE.md`     | Ziel-Repos aufsetzen.    |
| 20  | `docs/prompts/06_KNOWLEDGE_ROLE.md`    | Doku verarbeiten.        |

---

## 🔵 BLOCK 3: WISSENSDATENBANK — Die RAG-Cluster (10)

> Das eigentliche OpenCode-Framework-Wissen. 34 Seiten Doku destilliert + Community Reality Checks.
> **Lese nur den Cluster, der zu deiner Aufgabe passt** (siehe knowledge-router).

| #   | Datei                                         | Thema                             |
|:--- |:--------------------------------------------- |:--------------------------------- |
| 21  | `docs/opencode_knowledge/clusters/01_CONFIG_NETWORK_ENTERPRISE.md` | Config-Hierarchie, Proxy, Certs.  |
| 22  | `docs/opencode_knowledge/clusters/02_PROVIDERS_MODELS.md`          | Variants, Ollama-Workarounds.     |
| 23  | `docs/opencode_knowledge/clusters/03_TOOLS_PERMISSIONS_LSP.md`     | Pattern-Matching, doom_loop.      |
| 24  | `docs/opencode_knowledge/clusters/04_MCP_PLUGINS_ACP.md`           | MCP-Routing, Plugin-Firewall.     |
| 25  | `docs/opencode_knowledge/clusters/05_AGENTS_SKILLS_COMMANDS_RULES.md` | steps-Limit, SKILL.md Rules.   |
| 26  | `docs/opencode_knowledge/clusters/06_CLI_SERVER_HEADLESS.md`       | REST-API, prompt_async.           |
| 27  | `docs/opencode_knowledge/clusters/07_TUI_WEB_IDE_SHARE.md`         | share:disabled, EDITOR wait.      |
| 28  | `docs/opencode_knowledge/clusters/08_GITHUB_GITLAB.md`             | CI/CD Events, GitLab Self-Hosted. |
| 29  | `docs/opencode_knowledge/clusters/09_SDK_FORMATTERS.md`            | Structured Output, $FILE Token.   |
| 30  | `docs/opencode_knowledge/clusters/10_TROUBLESHOOTING_WINDOWS.md`   | Cache-Pfade, ProviderInitError.   |

---

## 🟠 BLOCK 4: TASK-SPEZIFISCH (3 — nur bei konkreter Aufgabe laden)

| Datei                                     | Trigger                       |
|:----------------------------------------- |:----------------------------- |
| `docs/prompts/01_SKILL_REFACTORING.md`    | "Mach ein Skill-Refactoring." |
| `docs/prompts/02_KNOWLEDGE_HARVESTING.md` | "Verarbeite diese Doku."      |
| `docs/prompts/03_PAYLOAD_DEPLOYMENT.md`   | "Bestücke dieses Ziel-Repo."  |

---

## ⚪ BLOCK 5: OPTIONAL — Referenz & Archiv

> Diese Dateien enthalten KEIN neues Wissen. Sie sind Duplikate, Rohdaten oder historische Artefakte.

### User Manuals (10) — Duplikat der Cluster für menschliche Leser

> Das gleiche Wissen wie die Cluster, nur in Tabellenformat für Manager. **Agenten brauchen das nicht.**

| Datei | Duplikat von |
|:--- |:--- |
| `docs/user_manual/01_CONFIG_NETWORK.md` | Cluster 01 |
| `docs/user_manual/02_PROVIDERS_MODELS.md` | Cluster 02 |
| `docs/user_manual/03_TOOLS_PERMISSIONS.md` | Cluster 03 |
| `docs/user_manual/04_MCP_PLUGINS.md` | Cluster 04 |
| `docs/user_manual/05_AGENTS_SKILLS.md` | Cluster 05 |
| `docs/user_manual/06_CLI_SERVER.md` | Cluster 06 |
| `docs/user_manual/07_TUI_WEB_SHARE.md` | Cluster 07 |
| `docs/user_manual/08_CI_CD_INTEGRATION.md` | Cluster 08 |
| `docs/user_manual/09_SDK_FORMATTERS.md` | Cluster 09 |
| `docs/user_manual/10_TROUBLESHOOTING.md` | Cluster 10 |

### Meta-Artefakte (3) — Nur bei Bedarf nachschlagen

| Datei | Warum optional |
|:--- |:--- |
| `docs/opencode_knowledge/EVALUATION_REPORT.md` | Beschreibt den Triage-Prozess der Cluster-Erstellung. Interessant für Skill-Erstellung, nicht für Nutzung. |
| `docs/opencode_knowledge/SHADOW_KNOWLEDGE_RAW.md` | Community-Bugs sind bereits **inline** in die Cluster injiziert. Rohdaten = Archiv-Referenz. |
| `docs/SESSION_ARTIFACT_OPENCODE_CORE_INIT.archive.md` | Altes Genesis-Dokument ("DO NOT READ"). Enthält nichts, was nicht in Rules/Learnings steht. |

### Base Payload (13) — Nur bei Deployment lesen

> `templates/base_payload/` ist ein Kopier-Template für Ziel-Repos. **Niemals ausführen, nur kopieren.**
> Bei Payload-Deployment-Aufgaben: Struktur kennen, Inhalt nicht studieren.

| Datei | Zweck |
|:--- |:--- |
| `templates/base_payload/opencode.jsonc` | Goldstandard-Config für Ziel-Repos. |
| `templates/base_payload/IMPLEMENTATION.md` | Tier-3-Architektur des Swarm. |
| `templates/base_payload/README.md` | Payload-Übersicht. |
| `templates/base_payload/.opencode/rules/00_discipline_of_knowledge_capture.md` | Regel für Ziel-Repos. |
| `templates/base_payload/.opencode/rules/01_system_architecture.md` | Swarm/RSI Architektur. |
| `templates/base_payload/.opencode/scripts/generate-plan.js` | Event-Sourcing Herzstück. |
| `templates/base_payload/.opencode/swarm.json` | Swarm-Konfiguration. |
| `templates/base_payload/.opencode/commands/swarm-plan.md` | Swarm-Plan Command. |
| `templates/base_payload/.opencode/commands/swarm-execute.md` | Swarm-Execute Command. |
| `templates/base_payload/.opencode/commands/swarm-status.md` | Swarm-Status Command. |
| `templates/base_payload/docs/WORKSPACE_AND_TEMPLATES.md` | Workspace-Struktur. |
| `templates/base_payload/plans/ROADMAP-ENTERPRISE.md` | Tier-Roadmap (Tier 2 + 1). |
| `templates/base_payload/plans/TIER3-IMPLEMENTATION.md` | Tier-3 Implementierung. |

---

## 🔴 BLOCK 6: STRICT AVOIDANCE (67 Dateien — TOXISCH)

| Verzeichnis                          | Anzahl | Warum Gift                             |
|:------------------------------------ |:------ |:-------------------------------------- |
| `_ARCHIVE/ground0_mission_control/`  | 6      | Altes Swarm-System.                    |
| `_ARCHIVE/init/`                     | 5      | Alte Boot-Phasen (ersetzt).            |
| `docs/architecture_reference/`       | 8      | Historische Entscheidungen (alt).      |
| `docs/Claude-codeGround-Zero*/`      | ~11    | Altes Ground-Zero Wissen.              |
| `docs/Antigravity/`                  | 4      | Veraltetes UI-Mapping.                 |
| `playground/opencode-rules-backup/`  | 14     | Alte "Angst-Regeln".                   |
| `import/init/prompts/opencode-core/` | 2      | Alte Boot-Prompts (ersetzt).           |
| `import/Neuer Ordner/`               | ~20    | Import-Chaos.                          |
| `templates/base_payload/src/**`      | 6      | Für Operator: nur kopieren, nie lesen. |

---

## 📊 Zusammenfassung

| Block | Dateien | Lese ich... |
|:--- |:--- |:--- |
| **1: Auto-geladen** | 7 | Automatisch (nichts tun) |
| **2: Kernwissen** | 16 | Immer bei Session-Start |
| **3: RAG-Cluster** | 10 | Bei Bedarf (task-abhängig) |
| **4: Task-Spezifisch** | 3 | Nur bei konkreter Aufgabe |
| **5: Optional** | 23 | Nie (Duplikate/Archiv) |
| **6: Strict Avoidance** | ~67 | NIEMALS |
| **GESAMT** | **~126** | **33 für Vollständigkeit** |
