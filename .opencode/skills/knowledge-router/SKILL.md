---
name: knowledge-router
description: Zeigt dir, wo das OpenCode-Wissen in diesem Repo liegt und was in jeder Datei drinsteht. Pflicht-Ladevorgang BEVOR du etwas konfigurierst.
license: MIT
compatibility: opencode
metadata:
  audience: all-agents
  workflow: routing
---

## Worum geht es?
Dieser Skill ist dein **Navigationssystem** durch die Wissensdatenbank dieses Repos. Er beschreibt **den Inhalt** jeder relevanten Datei — nicht nur den Dateinamen.

## Wann du mich laden solltest
- **Immer als Erstes**, wenn du eine Aufgabe in diesem Repo startest.
- Bevor du eine `opencode.json` oder eine Config-Datei änderst.
- Wenn du nicht weißt, welcher Cluster zu deiner Aufgabe passt.

## 🚨 Pflichtlektüre für JEDE Session
1. **`AGENTS.md`** im Root — Das Bewusstsein des Systems (Automatisch geladen).
2. **`.opencode/rules/*.md`** — Die verbindlichen Gesetze (Automatisch geladen).
3. **`docs/opencode_knowledge/00_MASTER_INDEX.md`** — Inhaltsverzeichnis + Aktualitäts-Status.
4. Den **spezifischen Cluster**, der zu deiner Aufgabe passt.

---

## Pfad 1: `docs/opencode_knowledge/` — Das RAG-Wissen (Für Agenten)

Hier liegt das destillierte Wissen über das **OpenCode Framework** selbst. 34 Seiten offizielle Doku wurden gefiltert und mit Community-Bugs angereichert.

> **⚠️ Jeder Cluster enthält `COMMUNITY REALITY CHECK` Blöcke** mit Bugs, die in der offiziellen Doku fehlen. Diese Blöcke sind KEIN nice-to-have — sie enthalten kritische Sicherheits- und Stabilitäts-Warnungen.

| Datei | WAS DRIN STEHT (Nicht im Namen erkennbar) |
|:---|:---|
| `00_MASTER_INDEX.md` | Inhaltsverzeichnis + Aktualitäts-Status (wann wurde zuletzt geprüft). |
| `EVALUATION_REPORT.md` | Für jeden Cluster: Was wurde absichtlich weggelassen und WARUM. Anti-Hallucination-Dokument. |
| `SHADOW_KNOWLEDGE_RAW.md` | Rohdaten der Community-Recherche (GitHub Issues, Reddit). Nicht editiert, nur Referenz. |
| **01** Config/Network | Precedence-Order (Welche Config gewinnt), `{env:...}` und `{file:...}` Substitution Syntax, Proxy-Bypass für TUI. |
| **02** Providers/Models | Variants-System (Reasoning-Effort pro Modell), Custom Headers (Helicone), Ollama-Workarounds. |
| **03** Tools/Permissions | Pattern-Matching Syntax (`"rm *": "deny"`), `doom_loop` Trigger, Custom Tool TypeScript API, **Windows Permission-Bypass Bug**. |
| **04** MCP/Plugins | MCP-Routing pro Agent (Token-Bloat-Schutz), `tool.execute.before` Hook als Security-Gate, **Remote MCP Reconnect-Problem**. |
| **05** Agents/Skills | `steps`-Limit für Endlosschleifen, `permission.task` für Subagent-Isolation, `SKILL.md` Frontmatter-Regeln, **Context-Compaction Amnesie**. |
| **06** CLI/Server | REST-Endpoints (`prompt_async`, `noReply: true`), `--attach` Warm-Start, **OOM-Risk bei Autocompact**, **Server ohne Auth**. |
| **07** TUI/Web/Share | `share: "disabled"` für Privacy, `EDITOR="code --wait"` Fix. |
| **08** GitHub/GitLab | Event-Trigger (`schedule`, `issue_comment`), GitLab Self-Hosted Env-Vars, **CI Doom-Loop bei PR-Reviews**. |
| **09** SDK/Formatters | Structured Output (JSON Schema Zwang), `$FILE` Platzhalter bei Custom Formattern. |
| **10** Troubleshooting | Cache-Pfade (`~/.cache/opencode`), `ProviderInitError` Fix, **Headless Clipboard-Crash**, Wayland/WSL Workarounds. |

### Schnelle Zuordnung (Welcher Cluster für welche Aufgabe?)

| Aufgabe | Lade diesen Cluster |
|:---|:---|
| Config/Settings ändern | `01_CONFIG_NETWORK_ENTERPRISE.md` |
| Provider/Modelle einrichten | `02_PROVIDERS_MODELS.md` |
| Berechtigungen/Tools anpassen | `03_TOOLS_PERMISSIONS_LSP.md` |
| MCP-Server/Plugins hinzufügen | `04_MCP_PLUGINS_ACP.md` |
| Agenten/Skills/Commands erstellen | `05_AGENTS_SKILLS_COMMANDS_RULES.md` |
| Headless/API-Automatisierung | `06_CLI_SERVER_HEADLESS.md` |
| UI/Privacy/Share konfigurieren | `07_TUI_WEB_IDE_SHARE.md` |
| CI/CD Pipelines einrichten | `08_GITHUB_GITLAB.md` |
| SDK/Formatierung/Outputs | `09_SDK_FORMATTERS.md` |
| Fehler/Crashes debuggen | `10_TROUBLESHOOTING_WINDOWS.md` |

---

## Pfad 2: `docs/user_manual/` — Das Management-Dashboard (Für Menschen)

Das gleiche Wissen, aber in menschenlesbarem Format. Nicht für Agenten gedacht, aber relevant wenn du dem Menschen erklärst, WAS du tust.

| Datei | WAS DRIN STEHT (Nicht im Namen erkennbar) |
|:---|:---|
| `00_DASHBOARD_INDEX.md` | Inhaltsverzeichnis mit Kurzbeschreibung pro Kategorie. |
| **01** Config/Network | Config-Hierarchie-Tabelle, **Full-Protection-Prompt** (Copy-Paste für Agenten). |
| **03** Tools/Permissions | Permission-Level-Tabelle (`allow`/`ask`/`deny`), Custom Tool Prompt. |
| **05** Agents/Skills | Primary vs. Subagent Matrix, Skill-Erstellung Prompt. |
| **06** CLI/Server | REST-API-Tabelle für Orchestratoren, Autocompact Warnung. |
| **08** CI/CD | GitHub Action Prompt mit Doom-Loop-Filter. |
| **10** Troubleshooting | Error-Code-Tabelle mit Fixes, Headless/WSL Workarounds. |

---

## Pfad 3: `.opencode/rules/` — Die aktiven Gesetze (MANDATORY)

Diese Dateien werden durch die `opencode.jsonc` `instructions`-Config automatisch in jeden Agenten-Kontext geladen. Sie enthalten die **verbindlichen Regeln** dieses Repos.

| Datei | WAS DRIN STEHT |
|:---|:---|
| `00_master_orchestrator_directive.md` | Identität der Control Node, 3-Phasen Workflow (Recon → Playground → Approval Gate), "Go"-Freigabe-Protokoll. |
| `02_omega_constitution.md` | Golden Axiom ("Intelligenz = Integrität"), Anti-Hallucination Law, Double-Turn-Lock, Safety Over Obedience. |
| `03_v3_config_architecture.md` | `watcher.ignore` (nicht `ignore_patterns`!), Dynamic Instructions (kein `{file:...}` mehr!), Proactive Shielding Liste. |
| `04_git_workflow.md` | Conventional Commits, Worktree-Regeln (EIN Ordner höher!), Savepoint-PR-Workflow mit Auto-Merge. |
| `08_engineering_standard_workflow.md` | Kein Playground-Ordner, alles in `src/`, Testing in `tests/`, Feature-Branch Workflow. |
| `09_split_log_mandate.md` | Log-Sharding: Phasen-Logs aus der PROTOCOL_LOG.md in eigene Dateien auslagern. |
