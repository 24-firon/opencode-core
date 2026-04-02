# Cluster 06: CLI, Server & Headless Operations

Dieses Cluster fokussiert sich auf die programmatische Steuerung von OpenCode, die REST-API und die Automatisierung über die Command Line Interface (CLI).

## 0. ⚠️ COMMUNITY REALITY CHECKS (März 2026)

> **OPENCODE_DISABLE_AUTOCOMPACT OOM-Risk:** Die Env-Var verhindert JEDE Compaction. Bei langen Headless-Sessions wächst der Memory-Footprint exponentiell (OOM Risk).
> **Workaround:** Stattdessen `experimental.session.compacting` in der Config konfigurieren und Kompaktierungsintervall manuell tunen.
>
> **REST-Server ohne Auth:** Der Server hat by default KEIN Authentication-Layer. Wer `opencode serve` auf `0.0.0.0` exposed, exponiert die gesamte Entwicklungsumgebung.
> **Workaround:** ZWINGEND `OPENCODE_SERVER_PASSWORD` setzen.
>
> **Parallele Requests:** Ohne Rate-Limiting können parallele API-Requests zu Provider-429-Errors führen, die der Server nicht graceful handled.

## 1. CLI Core Operations (Headless & Automation)
Für CI/CD oder orchestrierte Workflows muss die interaktive TUI (Terminal User Interface) umgangen werden.
*   **Einmalige Ausführung:** `opencode run "Fix the failing tests in src/"`
*   **Session Fortsetzung:** `opencode run --continue` (Letzte Session) oder `--session <id>`. `--fork` kopiert den State.
*   **MCP Debugging:** `opencode mcp debug <name>` ist essenziell für OAuth/Verbindungsfehler bei Remote-Tools.
*   **Session Management:** `opencode session export <id>` und `opencode import <file>` erlauben das Transferieren von States.

## 2. Server Architecture (OpenAPI 3.1)
OpenCode operiert als Client-Server-Modell. Selbst bei der lokalen TUI-Ausführung läuft im Hintergrund ein Server. Man kann den Server dediziert für API-Zugriff starten:
```bash
# Basic Auth absichern
OPENCODE_SERVER_PASSWORD=secret opencode serve --port 4096 --hostname 0.0.0.0
```
> **Warm-Start Optimierung:** MCP-Server haben oft lange Boot-Zeiten (Cold Boot). Um das in Skripten zu verhindern, startet man `opencode serve` als Background-Daemon und führt Skripte mit `--attach` aus: `opencode run --attach http://localhost:4096 "Prompt"`.

## 3. Kritische API-Endpunkte (REST)
Der Server bietet umfassende REST-APIs zur Steuerung von Sessions und File-Queries.

| Endpoint | Methode | Funktion für Orchestratoren |
| :--- | :--- | :--- |
| `/session/:id/prompt_async` | `POST` | Feuert einen Prompt ab **ohne** auf die LLM-Antwort zu blockieren (`204 No Content`). Gut für Fire-and-Forget oder Background-Subtasks. |
| `/session/:id/message` | `POST` | Blockierender Call. Unterstützt das Injizieren von Kontext via `{ noReply: true }`, sodass die KI den Input nur liest, aber nicht antwortet (Perfekt für RAG-Injections via Plugins). |
| `/find?pattern=...` | `GET` | Extrem schnelle Textsuche (Ripgrep) über die gesamte Codebase mit exakten Line-Offsets und Submatches als JSON. |
| `/session/:id/permissions/:id`| `POST` | Programmatische Beantwortung von "Ask"-Prompts (z.B. `{ response: "always", remember: true }`). |
| `/global/event` | `GET` | SSE (Server-Sent Events) Stream für Real-Time Überwachung von Tool-Executions und Agent-Status. |
| `/mcp` | `POST` | Dynamisches Hinzufügen von MCP-Servern zur Laufzeit (ohne Config-Restart). |

## 4. Relevante Environment Variables (Hidden Features)
Einige System-Verhaltensweisen lassen sich nur über undokumentierte/experimentiell-gekennzeichnete Env-Vars steuern:
*   `OPENCODE_DISABLE_AUTOCOMPACT=1`: Verhindert das automatische Zerstören/Zusammenfassen alter Kontext-Fenster. (Achtung: Token-Limit-Risiko).
*   `OPENCODE_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS=<ms>`: Überschreibt den Timeout für Bash-Befehle (wichtig bei langen Builds).
*   `OPENCODE_DISABLE_CLAUDE_CODE=1`: Ignoriert legacy `.claude` Ordner komplett.
*   `OPENCODE_DISABLE_MODELS_FETCH=1`: Verhindert den Network-Call zu models.dev beim Start (wichtig für harte Airgap-Environments).
