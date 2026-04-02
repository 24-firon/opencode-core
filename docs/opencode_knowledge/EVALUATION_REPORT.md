# OpenCode Knowledge Harvesting - Evaluation Report

## Block 1: Config, Network & Enterprise (`/docs/config`, `/docs/enterprise`, `/docs/network`)

**Was wurde behalten (Enterprise-Brille):**
*   Die detaillierte Precedence-Hierarchie der Config-Dateien (Remote > Global > Custom > Project > Dirs > Inline), weil das für dynamisches Orchestrieren von Agents essentiell ist.
*   Security-Settings: Deaktivierung von `/share` (gegen Datenabfluss ins CDN), `snapshot: false` (zur Performance-Rettung in Monorepos) und `permission` Checkgates für `bash` und `edit`.
*   Provider-Restriktionen: Die Wichtigkeit, dass `disabled_providers` stärker wiegt als `enabled_providers`.
*   Netzwerk-Fallen: Die kritische Proxy-Einstellung (`NO_PROXY=localhost,127.0.0.1`), ohne die das TUI in einem Routing-Loop hängen bleibt.
*   Zertifikats-Injection (`NODE_EXTRA_CA_CERTS`) und Private-NPM-Auth Workarounds.

**Was wurde aussortiert (Beginner-Inhalte):**
*   Marketing-Texte zu Trial-Phasen und Pricing ("Kontaktieren Sie uns").
*   Einfache Erklärungen, was eine JSON-Datei ist oder dass man Themes einstellen kann.

**Größtes Potenzial dieses Blocks:**
*   Das `watcher.ignore` und `snapshot: false` Wissen rettet die Orchestrator-Agenten davor, Server zum Absturz zu bringen, wenn sie auf riesige Codebases losgelassen werden. Die Variablen-Substitution (`{file:...}`) löst das Secret-Management-Problem.

## Block 2: Providers & Models (`/docs/providers`, `/docs/models`, `/docs/zen`)

**Was wurde behalten (Enterprise-Brille):**
*   Base URL Overrides und Custom Headers (wichtig für Observability-Plattformen wie Helicone).
*   Das Einbinden lokaler Modelle (llama.cpp, Ollama) via `@ai-sdk/openai-compatible`.
*   Das **Variants-System** für Modelle, um Reasoning-Efforts und Token-Budgets programmatisch pro Agent steuern zu können.
*   Routing-Logik (Fallbacks) bei Providern wie Vercel AI Gateway.

**Was wurde aussortiert (Beginner-Inhalte):**
*   Dutzende bebilderte "Klicken Sie hier, um einen API-Key zu erstellen"-Anleitungen für 40+ Provider.
*   Consumer-fokussierte Pricing-Tabellen von OpenCode Zen und OpenCode Go.

**Größtes Potenzial dieses Blocks:**
*   Das Variants-System in Kombination mit Custom Headers erlaubt tiefe Observability und Kostenkontrolle über eine Flotte von autonomen Agenten.

## Block 3: Tools, Permissions & LSP (`/docs/tools`, `/docs/permissions`, `/docs/lsp`, `/docs/custom-tools`)

**Was wurde behalten (Enterprise-Brille):**
*   Die Pattern-Matching-Syntax (`*` und `~/`) für Permissions.
*   Die Safety Guards `doom_loop` und `external_directory` (extrem wichtig für die Systemsicherheit).
*   Das Überschreiben nativer Tools durch Custom Tools (TypeScript API) zur Schaffung sicherer Sandboxen.
*   Die Entkopplung von `write`/`patch` (gesteuert durch `edit` Permission).
*   LSP-Konfigurationen (Environment-Injections und Deaktivierung des Auto-Downloads für Airgapped-Environments).

**Was wurde aussortiert (Beginner-Inhalte):**
*   Die triviale Liste der standardmäßigen LSP-Server (wie "TS nutzt tsserver"), außer den Konfigurationsmechanismen.
*   Grundlegende Erklärungen, was `bash` oder `edit` bedeutet.

**Größtes Potenzial dieses Blocks:**
*   Die Kombination aus Custom Tools (TypeScript API) und dem Permission-System erlaubt den Bau von maßgeschneiderten, hochsicheren System-APIs für Agenten, ohne das Host-System zu gefährden.

## Block 4: MCP Servers, Plugins & ACP (`/docs/mcp-servers`, `/docs/plugins`, `/docs/acp`)

**Was wurde behalten (Enterprise-Brille):**
*   Das Routing von MCP-Tools (Verbergen von MCP-APIs für bestimmte Agenten, um Context-Bloat und unautorisierten Zugriff zu verhindern).
*   Das Event-Hook-System der TypeScript-Plugins (insbesondere `tool.execute.before` als Security-Gate und `experimental.session.compacting` für Kontext-Rettung).
*   Das Konzept von ACP (Headless-Modus über stdio).

**Was wurde aussortiert (Beginner-Inhalte):**
*   Detaillierte Installationsanleitungen für spezifische Editoren (JetBrains, Zed) im ACP-Bereich.
*   Generische Erklärungen, warum man Plugins nutzt.

**Größtes Potenzial dieses Blocks:**
*   Die `tool.execute.before` Hooks können genutzt werden, um eine strikte Firewall für KI-Aktionen (z.B. Regex-Prüfung von `bash`-Befehlen) aufzubauen.

## Block 5: Agents, Skills, Commands & Rules (`/docs/agents`, `/docs/skills`, `/docs/commands`, `/docs/rules`)

**Was wurde behalten (Enterprise-Brille):**
*   Tiefgehende Parameter der Agent-Konfiguration (`steps`, `task` Permissions für Subagent-Delegation, `hidden`, Provider-Passthroughs).
*   Frontmatter-Validation und Discovery-Mechanismen für `SKILL.md` (inkl. Regex-Requirements).
*   Die `subtask: true` Flag in Commands zur Verhinderung von Context-Bleeding im Hauptagenten.
*   Der `instructions` Array-Ansatz in der `opencode.json` zum Injezieren von Remote-URLs und Glob-Patterns als Alternative zu monolithischen `AGENTS.md` Dateien.

**Was wurde aussortiert (Beginner-Inhalte):**
*   Basic-Use-Cases (z.B. "Wie schreibe ich einen Docs-Writer").
*   Trivialer Aufbau einer Markdown-Datei.

**Größtes Potenzial dieses Blocks:**
*   Die Steuerung, welcher Agent welche Sub-Agenten wecken darf (`permission.task`), ist das Fundament für sichere Orchestrierungs-Hierarchien (Orchestrator darf nicht coden, Coder darf nicht pushen).

## Block 6: CLI, Server & Headless Operations (`/docs/cli`, `/docs/server`)

**Was wurde behalten (Enterprise-Brille):**
*   API-Endpoints des Headless Servers (`/session/:id/prompt_async`, `/session/:id/message` mit `noReply: true`).
*   Die `--attach` Flag zur Vermeidung von Cold Boots (Wichtig für Performance-Automatisierung).
*   Kritische undokumentierte Env-Vars (`OPENCODE_DISABLE_AUTOCOMPACT`, `OPENCODE_DISABLE_MODELS_FETCH`).

**Was wurde aussortiert (Beginner-Inhalte):**
*   Triviale Erklärungen von Commands wie "Was macht `/help`".
*   Einfache Usage-Beispiele wie `opencode run "Hallo"`.

**Größtes Potenzial dieses Blocks:**
*   Die REST-API und der `--attach` Modus sind der Schlüssel, um OpenCode als Background-Engine in eigenen Node/Python-Orchestratoren (wie OpenClaw) einzusetzen.

## Block 7: TUI, Web, IDE & Share (`/docs/tui`, `/docs/web`, `/docs/ide`, `/docs/share`)

**Was wurde behalten (Enterprise-Brille):**
*   Der `EDITOR="code --wait"` Workaround für GUI-Editoren.
*   Share-Mode Konfiguration (`"manual"`, `"auto"`, `"disabled"`) für Data Privacy.

**Was wurde aussortiert (Beginner-Inhalte):**
*   Nahezu 90% des Inhalts, da Shortcuts und Klick-Anleitungen für autonome Agenten bedeutungslos sind.

**Größtes Potenzial dieses Blocks:**
*   Das Wissen über `{"share": "disabled"}` ist kritisch für jeden Enterprise-Deployment-Agenten.

## Block 8: GitHub & GitLab Integration (`/docs/github`, `/docs/gitlab`)

**Was wurde behalten (Enterprise-Brille):**
*   Event-Auslöser (`issue_comment`, `pull_request_review_comment`, `schedule`).
*   Injektion von spezifischen `prompt` Direktiven in Action-Workflows abhängig vom Event-Typ.
*   Workarounds für Self-Hosted GitLab Duo Instanzen (`GITLAB_INSTANCE_URL`, Sperren des `small_model` Fallbacks).

**Was wurde aussortiert (Beginner-Inhalte):**
*   Basic Git-Erklärungen.

**Größtes Potenzial dieses Blocks:**
*   Das Nutzen der `schedule` Events für proaktives Scannen der Codebase ohne menschliche Trigger-Kommentare.

## Block 9: SDK & Formatters (`/docs/sdk`, `/docs/formatters`)

**Was wurde behalten (Enterprise-Brille):**
*   Das Forcieren von `StructuredOutput` (JSON Schema) über das SDK.
*   Die API für asynchrones Einfügen von Kontext ohne LLM-Reply (`noReply: true`).
*   Die `$FILE` Platzhalter Logik bei Custom Formattern.

**Was wurde aussortiert (Beginner-Inhalte):**
*   Die lange Liste von Plugins, Themes und Keybinds (Ecosystem), da diese GUI-bezogen oder out-of-scope für Kern-Architektur sind.

**Größtes Potenzial dieses Blocks:**
*   Das Erzwingen von `StructuredOutput` rettet Orchestrator-Pipelines davor, unvorhersehbare Markdown-Texte parsen zu müssen.

## Block 10: Troubleshooting & Windows (`/docs/troubleshooting`, `/docs/windows-wsl`)

**Was wurde behalten (Enterprise-Brille):**
*   Pfadstrukturen für Logs, Auth und Cache (`~/.cache/opencode`).
*   Das Wissen, dass das Leeren des Caches kritische Fehler wie `ProviderInitError` behebt.
*   WSL-Networking für das Überbrücken von Windows-Host und Linux-Subsystem.

**Was wurde aussortiert (Beginner-Inhalte):**
*   "Haben Sie den PC neu gestartet?" Level Troubleshooting.
*   Reine Desktop-App Fixes.

**Größtes Potenzial dieses Blocks:**
*   Die Kenntnis über den `~/.cache/opencode` Ordner erlaubt es Skripten, das System im Fehlerfall (wie korrupten AI-SDK Updates) automatisch zu heilen.
