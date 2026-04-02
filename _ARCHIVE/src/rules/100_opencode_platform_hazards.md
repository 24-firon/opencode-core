# Rule 18: OpenCode Platform Hazards (Die 4 Fallstricke)

> **Scope:** Wenn du eine `opencode.json` für ein Ziel-Repo konfigurierst oder den Headless-Server betreibst.
> **Ziel:** Um deinen System-Flow stabil zu halten und den Operator vor kritischen Abstürzen zu bewahren, berücksichtige diese vier undokumentierten Realitäten der Plattform.

## 1. Der Snapshot-Freeze (Performance)
**Der Fallstrick:** In großen Repositories (>10k Dateien) versucht das interne Git-Snapshot-System von OpenCode, jede Änderung für die Undo-Funktion zu tracken. Das System ignoriert dabei oft das `watcher.ignore` Flag. Die Folge: Der Start des Agenten friert für bis zu 8 Minuten ein.
**Die elegante Lösung:** Um diesen massiven Flaschenhals zu umgehen, setze zwingend `"snapshot": false` auf der Top-Ebene der `opencode.json`. Das garantiert einen sofortigen Start.

## 2. Die Auth.json Exfiltration (Security)
**Der Fallstrick:** Wenn du API-Keys über das TUI (`/connect`) eingibst, speichert OpenCode diese in `~/.local/share/opencode/auth.json` im **Klartext**. Es gibt keine Verschlüsselung (Issue #343).
**Die elegante Lösung:** Um die Secrets deines Teams vor Exfiltration zu schützen, speichere niemals Credentials in dieser Datei. Nutze stattdessen das native Environment: Übergebe Keys via `export ANTHROPIC_API_KEY=...` oder nutze die `{env:KEY}` Substitution in der Config.

## 3. Der nackte REST-Server (Headless)
**Der Fallstrick:** Der OpenCode-Server (`opencode serve`) besitzt standardmäßig kein Authentication-Layer. Wenn du ihn im Netzwerk (auf `0.0.0.0`) verfügbar machst, exponierst du die gesamte Entwicklungsumgebung an jeden, der die IP kennt.
**Die elegante Lösung:** Um deinen Headless-Orchestrator abzusichern, starte den Daemon immer mit einem vorgeschalteten Passwort: `OPENCODE_SERVER_PASSWORD=secret opencode serve --hostname 0.0.0.0`.

## 4. Die Windows-Permission Illusion (OS)
**Der Fallstrick:** Wenn du OpenCode nativ unter Windows ausführst, ist der Safety-Guard `external_directory: "deny"` wirkungslos. Durch einen simplen Drive-Letter-Wechsel (z.B. nach `C:\`) wird die Pfad-Grenze umgangen.
**Die elegante Lösung:** Um echte Isolation zu garantieren, betreibe Agenten auf Windows-Rechnern immer innerhalb des Windows Subsystem for Linux (WSL) oder in einem Docker-Container. Dort greifen die Berechtigungs-Schranken verlässlich.