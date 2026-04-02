# 90. V3 CONFIG ARCHITECTURE

**Scope:** Wenn du eine `opencode.jsonc` schreibst, änderst oder den Headless-Server betreibst.

**Kritische Regeln (ohne diese crashed das System):**
- Nur `opencode.jsonc` (nicht `.json`). TUI-Settings gehören in `tui.json`.
- `ignore_patterns` ist DEPRECATED → immer `"watcher": { "ignore": [...] }`.
- Proactive Shielding: alle AI/IDE-Blackholes (`**/.claude/**`, `**/.cursor/**`, etc.) in watcher.ignore.
- `{file:./pfad.md}` ist VERBOTEN in instructions → Glob-Patterns nutzen: `".opencode/rules/*.md"`.
- MCP-Credentials NIEMALS in Klartext → `{env:API_KEY}` Substitution.
- `AGENTS.md` wird automatisch geladen — nicht für Code-Style verschwenden.

**Undokumentierte Platform-Hazards:**

| Hazard | Problem | Fix |
|:---|:---|:---|
| **Snapshot-Freeze** | Große Repos (>10k Files) → 8 Min Startup-Freeze, watcher.ignore wird ignoriert | `"snapshot": false` setzen |
| **Auth.json Exfiltration** | API-Keys in `~/.local/share/opencode/auth.json` im KLARTEXT | Nur ENV-Variablen nutzen |
| **Nackter REST-Server** | `opencode serve` hat KEIN Auth-Layer | Immer mit `OPENCODE_SERVER_PASSWORD` starten |
| **Windows Permission** | `external_directory: "deny"` ist wirkungslos (Drive-Letter-Bypass) | Nur in WSL/Docker betreiben |

**Trigger:** Bei Config-Problemen → lade `docs/opencode_knowledge/clusters/01_CONFIG_NETWORK_ENTERPRISE.md`.
Bei Server-/Umgebungs-Problemen → lade `docs/opencode_knowledge/clusters/10_TROUBLESHOOTING_WINDOWS.md`.
