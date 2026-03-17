\*\*DECISION FORK: CONFLICT LOGIC\*\*

Es existieren zwei unterschiedliche Entitäten mit dem Namen "Open Code":

\- \*\*Pfad A\*\*: `opencode.ai` (AI Coding Agent CLI/IDE, MCP- und LSP-fähig).

\- \*\*Pfad B\*\*: `opencode.de` (Git-Plattform der deutschen Verwaltung, betrieben vom ZenDiS).

Auf Basis der System-Telemetrie und des geforderten technischen Tiefengrades wird \*\*Pfad A (opencode.ai)\*\* evaluiert. Status der Daten: Februar/März 2026.



\## HARD FACTS \& NETZWERK

\- \*\*IP \& Ports\*\*: Die Bindung erfolgt standardmäßig auf `127.0.0.1:4096`. \[opencode](https://opencode.ai/docs/)

\- \*\*Architektur\*\*: Der Befehl `opencode` startet simultan einen Headless-HTTP-Server (OpenAPI 3.1) und die TUI (Terminal User Interface) als Client. \[opencode](https://opencode.ai/docs/)

\- \*\*Authentifizierung\*\*: Die API ist ungeschützt, es sei denn, `OPENCODE\_SERVER\_PASSWORD` wird als Umgebungsvariable gesetzt (Standard-Benutzername: `opencode`). \[opencode](https://opencode.ai/docs/)

\- \*\*Konfigurations-Hierarchie\*\*: Projekt-Config (`.opencode.json` oder Git-Root) überschreibt die globale Config (`~/.config/opencode/opencode.json`). Externe Keys können via `{file:/pfad/zu/key}` sicher referenziert werden. \[dev.opencode](https://dev.opencode.ai/docs/config)



\## UI-STEUERUNG \& IDE-KNÖPFE

\- \*\*Sitzungssteuerung\*\*: `Strg+Shift+Esc` (Win/Linux) bzw. `Cmd+Shift+Esc` (Mac) erzwingt systemweit eine neue Terminal-Sitzung in der IDE (VS Code, Cursor, Windsurf). \[open-code](https://open-code.ai/en/docs/ide)

\- \*\*Aktivierung\*\*: `Strg+K` öffnet den Eingabeprompt direkt in der Entwicklungsumgebung. \[opencodex](https://opencodex.cc/en/)

\- \*\*Kontext-Injektion\*\*: `@` öffnet das Suchmenü für Projektdateien zur gezielten Injektion in den LLM-Kontext. \[open-code](https://open-code.ai/docs/en)

\- \*\*Präzise Referenzierung\*\*: `Alt+Strg+K` (Win/Linux) bzw. `Cmd+Option+K` (Mac) fügt zeilengenaue Referenzen wie `@File#L37-42` ein. \[open-code](https://open-code.ai/en/docs/ide)

\- \*\*Workflow-Phasen\*\*: 

&nbsp; - \*\*Plan Mode (Tab-Taste)\*\*: Die KI analysiert Anforderungen und generiert Architekturvorschläge ohne Schreibrechte. \[open-code](https://open-code.ai/docs/en)

&nbsp; - \*\*Build Mode (Tab-Taste)\*\*: Bestätigte Ausführung der Änderungen über den gesamten Codebaum. \[opencodex](https://opencodex.cc/en/)



\## BEFEHLS-REFERENZ (SLASH COMMANDS \& CLI)

\### Integrierte Slash-Commands (TUI/IDE)

\- Native Basisbefehle: `/init` (Initialisierung), `/undo` (macht die letzte KI-Aktion rückgängig), `/redo`, `/share` (Teilen der Session als URL), `/help`. \[youtube](https://www.youtube.com/watch?v=WXffHkvfRpM)

\- Custom Commands: Werden als Markdown-Dateien in `~/.config/opencode/commands/\*.md` oder `.opencode/commands/\*.md` abgelegt, wobei der Dateiname den Befehl definiert. \[opencode](https://opencode.ai/docs/commands/)

\- Parameter-Mapping: User-Argumente im Befehl werden im Prompt via `$ARGUMENTS` oder als spezifische Positionsvariablen (`$1`, `$2`) ausgelesen. \[opencode](https://opencode.ai/docs/commands/)



\### Core CLI Commands (`opencode <command>`)

\- `tui`: Startet das Terminal-Interface (Default). \[open-code](https://open-code.ai/en)

\- `run`: Headless Ausführung für Skripte (Bsp: `opencode run --prompt "Fix tests"`). \[open-code](https://open-code.ai/en)

\- `serve` / `web`: Startet den REST-Server oder das Web-Interface. Flags: `--port`, `--hostname`, `--mdns`, `--cors`. \[open-code](https://open-code.ai/en)

\- `acp`: Startet das Agent Client Protocol via nd-JSON Streams über `stdin/stdout`. \[open-code](https://open-code.ai/en)

\- `mcp add/list/auth/debug`: Verwaltung lokaler und entfernter Model Context Protocol Server für Tool-Erweiterungen. \[open-code](https://open-code.ai/en)

\- `agent create/list`: Verwaltung von Agentenprofilen. \[open-code](https://open-code.ai/en)

\- `session list/export/import`: Export und Re-Import von Session-States als JSON. \[open-code](https://open-code.ai/en)

\- `github install/run`: Integriert den Agenten tief in GitHub Actions Workflow-Pipelines. \[open-code](https://open-code.ai/en)



\## AGENTEN-MATRIX

| Agent Typ | Modus | Funktion \& Rechte (Tools) |

| :--- | :--- | :--- |

| \*\*build\*\* | Primary | Standard. Volle Lese-/Schreibrechte und System-Bash-Ausführung.  \[opencode](https://opencode.ai/docs/agents/) |

| \*\*plan\*\* | Primary | Rein analytisch. Lesezugriff zur Planung ohne Modifikationsrechte.  \[opencode](https://opencode.ai/docs/agents/) |

| \*\*review\*\* | Subagent | Code-Review. Nur Lesezugriff sowie Dokumentationstools.  \[opencode](https://opencode.ai/docs/agents/) |

| \*\*debug\*\* | Subagent | Fehleranalyse. Bash-Ausführung und Read Tools aktiv, kein Schreiben.  \[opencode](https://opencode.ai/docs/agents/) |

| \*\*docs\*\* | Subagent | Dokumentation. Dateizugriff gestattet, aber Systembefehle/Bash hart blockiert.  \[opencode](https://opencode.ai/docs/agents/) |



\*Hinweis:\* Subagenten können in der Konfiguration über das Flag `subtask: true` isoliert für einen Befehl aufgerufen werden, ohne den Kontext des Hauptagenten zu verschmutzen. Die Rechte lassen sich granular pro Agent drosseln, z.B. `{"permission": {"bash": {"git \*": "ask"}}}`. \[open-code](https://open-code.ai/en/docs/agents)



\## GAP ANALYSIS \& SECURITY GATES

\- \*\*Sicherheitsrisiko (Ports)\*\*: Die Nutzung von `opencode serve --cors` ohne das Setzen der Umgebungsvariablen `OPENCODE\_SERVER\_PASSWORD` öffnet die OpenAPI-Schnittstelle auf Port 4096 lokal für unauthentifizierte Zugriffe. \[opencode](https://opencode.ai/docs/)

\- \*\*Undokumentierte Fallbacks\*\*: Bestimmte experimentelle Funktionen sind in der UI verborgen, aber über Environment-Variablen aktivierbar: `OPENCODE\_EXPERIMENTAL\_BASH\_DEFAULT\_TIMEOUT\_MS` (Timeout für Endlosschleifen) und `OPENCODE\_EXPERIMENTAL\_EXA` (Aktivierung der Exa-Websuche). \[open-code](https://open-code.ai/en)

\- \*\*Auto-Commits\*\*: Wenn Bash-Permissions nicht explizit auf `"ask"` gesetzt werden, kann der Build-Agent bei Git-Fehlern selbstständig Commits pushen oder stashen. \[open-code](https://open-code.ai/en/docs/agents)









---









\*\*REALITY CHECK \& GAP ANALYSIS\*\*

OpenAgentsControl (OAC) von Darren Hinde (aktuell v0.7.1, Stand Februar 2026) ist ein exzellentes Framework für Teams, die strikte Coding-Richtlinien erzwingen wollen. Es löst das Problem generischer KI-Outputs, indem es Projekt-Patterns zwingend vorab aus dem Ordner `.opencode/context/` lädt und Agenten über editierbare Markdown-Dateien definiert. \[libraries](https://libraries.io/npm/@nextsystems%2Foac)



Für dein spezifisches Anforderungsprofil (Multi-Agenten-Architektur, OpenClaw, hochautomatisierte Workflows) offenbart OAC jedoch eine Schwäche: \*\*Es basiert auf einem interaktiven "Approval-Gate"-Konzept (Planen -> Nutzer-Freigabe -> Ausführen)\*\*. Für tiefgreifende Backend-Automatisierungen ohne ständige Human-in-the-Loop-Anforderungen greifen Power-User auf Reddit und GitHub im Frühjahr 2026 zu performanteren und autonomeren Orchestrierungs-Layern. \[github](https://github.com/darrenhinde/OpenAgents)



\## OAC vs. Power-User Alternativen (Stand Feb/März 2026)



| Framework / Tool | Fokus \& Architektur | Relevanz für dein Setup |

| :--- | :--- | :--- |

| \*\*OpenAgentsControl (OAC)\*\* | Pattern-Control via `.opencode/context/`. Generiert Subagenten (Reviewer, Tester) via CLI.  \[github](https://github.com/darrenhinde/OpenAgents) | Ideal als statische Basis für Code-Qualität, blockiert aber durch manuelle Approval-Gates autonome Loops. |

| \*\*awesome-slash\*\* | Toolkit zur End-to-End Workflow-Automatisierung. Sichert den State in `.opencode/flow.json`.  \[reddit](https://www.reddit.com/r/opencodeCLI/comments/1qldc2v/opencodenative\_workflow\_automation\_toolkit/) | Höchste Relevanz. Erlaubt "State Compaction" für extrem lange Sessions und "Reasoning Budgets" pro Agent.  \[reddit](https://www.reddit.com/r/opencodeCLI/comments/1qldc2v/opencodenative\_workflow\_automation\_toolkit/) |

| \*\*OpenCode-Swarm (v6.11)\*\* | Spezialisierte Agenten mit unterschiedlichen LLMs. Fokussiert auf Verifizierung statt reiner Geschwindigkeit.  \[reddit](https://www.reddit.com/r/opencodeCLI/comments/1rfm8dq/opencodeswarm\_v611\_release/) | Integriert 15+ QA-Gates pro Task. Perfekt für komplexe Architektur-Entscheidungen vor dem Commit.  \[reddit](https://www.reddit.com/r/opencodeCLI/comments/1rfm8dq/opencodeswarm\_v611\_release/) |



\## Deep Dive: Was die Profis auf Reddit wirklich machen

Die Reddit-Community (`r/opencodeCLI` und `r/LocalLLaMA`) hat sich von monolithischen Agenten verabschiedet und baut stattdessen asynchrone Multi-Model-Pipelines, die sich auf die drei Kernsäulen von OpenCode stützen: \*\*Commands\*\* (Slash-Commands mit Frontmatter), \*\*Agents\*\* (Rollen mit Tool-Rechten) und \*\*Skills\*\* (On-Demand Instruktionsbündel). \[reddit](https://www.reddit.com/r/opencodeCLI/comments/1qexzk7/i\_finally\_soft\_broke\_up\_with\_claude\_code\_and/)



\### 1. Asymmetrisches Model-Routing (Plan vs. Build)

Profis konfigurieren ihre OpenCode-Umgebungen so, dass schwere Architektur-Aufgaben von hochkapazitiven Modellen übernommen werden, während die Ausführung von schnellen Modellen erledigt wird. Ein gängiges Setup (Stand Ende 2025 / Anfang 2026) nutzt Modelle wie GPT-5.x Codex oder Claude Opus für den analytischen `PLAN`-Agenten (volle Tool-Rechte, aber Lese-Fokus). Sobald die Architektur steht, übernimmt ein Subagent mit einem Modell wie Claude 3.5 Sonnet oder Haiku über einen Custom Command (z.B. `/implement`) die extrem schnelle Code-Generierung im `BUILD`-Modus. \[github](https://github.com/openclaw/openclaw/blob/main/README.md)



\### 2. State Preservation \& "Compaction"

Ein massives Problem bei langen Agenten-Loops (wie sie MemuBot benötigen würde) ist das Überlaufen des LLM-Kontextfensters. Power-User nutzen Tools wie `awesome-slash`, um den Fortschritt laufend in einer `.opencode/flow.json` zu loggen. Dadurch kann der Main-Agent den Kontext zwischendurch "komprimieren" (State Compaction) oder Workflows nach einem Abbruch nahtlos exakt dort fortsetzen, wo sie gestoppt wurden, ohne von null zu beginnen. \[reddit](https://www.reddit.com/r/opencodeCLI/comments/1qldc2v/opencodenative\_workflow\_automation\_toolkit/)



\### 3. Gated Execution \& Auto-Linting

Anstatt wie bei OAC auf menschliche Bestätigung zu warten, implementieren Power-User TypeScript-Plugins, die automatische Linting- und Testing-Gates nach jeder KI-Änderung erzwingen. Tools wie OpenCode-Swarm ergänzen dies durch dedizierte QA-Agenten, die den Code vor dem Push gegen vordefinierte Sicherheits- und Architekturregeln validieren. \[reddit](https://www.reddit.com/r/opencodeCLI/comments/1rfm8dq/opencodeswarm\_v611\_release/)



\## Architekturempfehlung für OpenClaw/MemuBot

Anstatt OAC als alleiniges Framework zu nutzen, empfiehlt sich eine hybride Architektur:

Du nutzt das Context-Injection-Konzept von OAC (`.opencode/context/`), um dem Agenten deine spezifischen Node.js/Docker-Patterns aufzuzwingen. Für die eigentliche Orchestrierung über OpenClaw bindest du OpenCode jedoch Headless (via `opencode run` oder über das Agent Client Protocol / `acp`) an. Die Steuerung von Langzeit-Tasks und das Budget-Management überlässt du einer Logik ähnlich `awesome-slash`, um persistente Sessions und fehlerresistente Auto-Execution zu garantieren. \[github](https://github.com/openclaw/openclaw/blob/main/docs/index.md)





