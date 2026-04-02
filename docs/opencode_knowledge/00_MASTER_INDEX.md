# OpenCode Knowledge Base - Master Index

Dieses Verzeichnis dient als Router für Orchestrator-Agenten, um spezifisches Architekturwissen zum OpenCode AI Framework schnell und präzise abzurufen. Das Wissen wurde im Rahmen eines "Knowledge Harvesting" aus ~34 Seiten offizieller Dokumentation destilliert und mit **echtem Community-Wissen** (GitHub Issues, Reddit, HackerNews) angereichert. 

> ### 📅 Aktualitäts-Status
> 
> Letzte Community-Prüfung: **März 2026**
> Alle Cluster enthalten `⚠️ COMMUNITY REALITY CHECK` Blöcke mit Bugs, Workarounds und undocumented Features, die in der offiziellen Doku fehlen.
> **Nächste Prüfung fällig:** April 2026

## 📂 Die Wissens-Cluster

| Cluster | Datei                                                                                 | Inhaltlicher Fokus                                                                                         |
|:------- |:------------------------------------------------------------------------------------- |:---------------------------------------------------------------------------------------------------------- |
| **01**  | [`01_CONFIG_NETWORK_ENTERPRISE.md`](./clusters/01_CONFIG_NETWORK_ENTERPRISE.md)       | Konfigurations-Hierarchie, Enterprise Data-Privacy, Blackhole-Ignores (`watcher`), Proxy/Cert-Injection.   |
| **02**  | [`02_PROVIDERS_MODELS.md`](./clusters/02_PROVIDERS_MODELS.md)                         | Model-Variants (Reasoning Control), Lokale LLMs, Custom Headers (Helicone), Fallback-Routing.              |
| **03**  | [`03_TOOLS_PERMISSIONS_LSP.md`](./clusters/03_TOOLS_PERMISSIONS_LSP.md)               | Tool-Permissions (Wildcards), Safety Guards (`doom_loop`), Custom Tools (TS API), LSP Setup.               |
| **04**  | [`04_MCP_PLUGINS_ACP.md`](./clusters/04_MCP_PLUGINS_ACP.md)                           | MCP-Server Routing, Event Hooks (Plugins) für Security-Gates, Agent Client Protocol (ACP).                 |
| **05**  | [`05_AGENTS_SKILLS_COMMANDS_RULES.md`](./clusters/05_AGENTS_SKILLS_COMMANDS_RULES.md) | Agent-Parameter (`steps`, `hidden`, Task Permissions), `SKILL.md` Validation, Makro-Commands.              |
| **06**  | [`06_CLI_SERVER_HEADLESS.md`](./clusters/06_CLI_SERVER_HEADLESS.md)                   | REST-API (`prompt_async`, Context-Injection), `--attach` Modus für Warm-Boots, Undokumentierte Env-Vars.   |
| **07**  | [`07_TUI_WEB_IDE_SHARE.md`](./clusters/07_TUI_WEB_IDE_SHARE.md)                       | Share-Deaktivierung (Privacy), GUI-Editor Workarounds (`--wait`).                                          |
| **08**  | [`08_GITHUB_GITLAB.md`](./clusters/08_GITHUB_GITLAB.md)                               | CI/CD Action Hooks (`schedule`, `issue_comment`), Custom Prompts im Workflow, GitLab Duo Self-Hosted.      |
| **09**  | [`09_SDK_FORMATTERS.md`](./clusters/09_SDK_FORMATTERS.md)                             | `@opencode-ai/sdk`, Structured Output Zwang (JSON Schema), Auto-Formatter (`$FILE`).                       |
| **10**  | [`10_TROUBLESHOOTING_WINDOWS.md`](./clusters/10_TROUBLESHOOTING_WINDOWS.md)           | Log-Pfade, Caching-Fehlerbehebung (`ProviderInitError`), WSL-Network-Bridging, Headless-Crash-Workarounds. |

## 📊 Der Evaluations-Report

Den vollständigen Bericht zur vorgenommenen Triage (Was wurde behalten, was gelöscht und warum) findest du hier:
👉 [`C:\Workspace\Repos\opencode-core\docs\opencode_knowledge\clusters`](./EVALUATION_REPORT.md)
