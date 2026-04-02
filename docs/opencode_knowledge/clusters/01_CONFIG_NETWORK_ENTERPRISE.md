# Cluster 01: Configuration, Network & Enterprise

Dieses Cluster fokussiert sich auf die zentralen Setups für Enterprise-Umgebungen, das Netzwerk-Routing und die Konfigurationshierarchie von OpenCode.

## 0. ⚠️ COMMUNITY REALITY CHECKS (März 2026)

> **Snapshot Freeze (GitHub Issue #1646):** In Repositories mit >50k Dateien blockiert der interne Git-Snapshot-Prozess das System beim Start für über **8 Minuten**. Das `watcher.ignore`-Flag wird vom Snapshot-Modul intern ignoriert. `snapshot: false` muss zwingend gesetzt sein.
>
> **Security Illusion (Reddit r/LocalLLaMA):** OpenCode operiert by default mit einem Permissions-Modell äquivalent zu `--dangerously-skip-permissions`. Community-Empfehlung: OpenCode **immer** in einer Sandbox (Docker/Seatbelt) betreiben.

## 1. Config Architecture & Precedence
OpenCode nutzt ein mehrschichtiges Konfigurationssystem (JSON / JSONC). Konfigurationen werden **gemerged**. Spätere Quellen überschreiben frühere (Last wins), sofern es Konflikte gibt. Nicht-konfligierende Settings bleiben erhalten.

**Precedence Order (Lowest to Highest):**
1. **Remote Config:** `.well-known/opencode` (Organizational defaults).
2. **Global Config:** `~/.config/opencode/opencode.json` (User preferences).
3. **Custom Config Path:** Env var `OPENCODE_CONFIG` (or `OPENCODE_CONFIG_DIR` for directory).
4. **Project Config:** `opencode.json` (Nearest Git root or current directory).
5. **Directory Configs:** Configs placed in `.opencode/` subdirectories.
6. **Inline Config:** Env var `OPENCODE_CONFIG_CONTENT`.

> *Tipp für Ordner:* `~/.config/opencode/` und `.opencode/` nutzen **Plural-Namen** für Struktur (`agents/`, `commands/`, `modes/`, `plugins/`, `skills/`, `tools/`, `themes/`).

## 2. Enterprise & Security Settings (Die "Hard Facts")

Für den sicheren Einsatz in Enterprise-Umgebungen müssen einige Einstellungen forciert werden, um Datenabfluss zu verhindern und Leistung in riesigen Repos zu gewährleisten.

### Security / Data-Privacy
*   **Share-Feature deaktivieren:** `/share` sendet Konversationen an ein externes CDN. Dies muss in Enterprise-Umgebungen deaktiviert werden:
    ```jsonc
    { "share": "disabled" } // Alternativen: "manual" (default), "auto"
    ```
*   **Provider-Restriktionen:** Verhindern, dass Entwickler unautorisierte LLM-Provider nutzen. `disabled_providers` hat **Vorrang** vor `enabled_providers`.
    ```jsonc
    {
      "enabled_providers": ["anthropic", "openai"], // Erlaubte Liste
      "disabled_providers": ["gemini"] // Explizite Blocklist
    }
    ```

### Performance (Large Repositories)
*   **Snapshots abschalten:** OpenCode trackt Änderungen per internem Git-Repo (für Undo). Bei riesigen Repos oder vielen Submodules führt das zu extremem Disk-I/O und Lag.
    ```jsonc
    { "snapshot": false }
    ```
*   **Context Compaction:** Verhinderung von Token-Overflows durch automatisches Bereinigen.
    ```jsonc
    {
      "compaction": {
        "auto": true,
        "prune": true,     // Entfernt alte Tool-Outputs
        "reserved": 10000  // Buffer für Compaction-Prozess
      }
    }
    ```
*   **Watcher Ignore:** Verhindert das Caching/Watchen unendlicher Pfade (Blackhole-Schutz).
    ```jsonc
    {
      "watcher": {
        "ignore": ["node_modules/**", "dist/**", ".git/**"]
      }
    }
    ```

### Permissions (Gatekeeping)
Standardmäßig erlaubt OpenCode alle Operationen. Für destruktive Aktionen muss ein Bestätigungszwang etabliert werden:
```jsonc
{
  "permission": {
    "edit": "ask",
    "bash": "ask"
  }
}
```

## 3. Netzwerke, Proxies & Private Registries

### Proxy-Routing
OpenCode respektiert `HTTPS_PROXY` und `HTTP_PROXY`.
**WICHTIG (TUI-Bypass):** Das Terminal User Interface (TUI) kommuniziert mit einem lokalen HTTP-Server. Wenn ein Proxy aktiv ist, MUSS dieser für localhost umgangen werden, sonst entsteht ein Routing-Loop:
```bash
export NO_PROXY=localhost,127.0.0.1
```

### Custom Certificates (Corporate CA)
Wenn das Unternehmen SSL-Inspections mit eigenen CAs fährt, müssen die Zertifikate manuell injectet werden:
```bash
export NODE_EXTRA_CA_CERTS=/path/to/ca-cert.pem
```

### Private NPM Registries (z.B. JFrog / Nexus)
OpenCode nutzt Buns nativen `.npmrc` Support. Der User muss zwingend *vor* der Ausführung von OpenCode eingeloggt sein:
```bash
npm login --registry=https://your-company.jfrog.io/api/npm/npm-virtual/
```

## 4. Variablen-Substitution & Secrets
Config files können externe Daten dynamisch auflösen. **Keine API-Keys im Klartext committen!**
*   **Environment Variables:** `{env:OPENCODE_MODEL}`
*   **File Contents:** `{file:~/.secrets/openai-key}` (Perfekt für API-Keys).

## 5. Deployment Options
Enterprise-Deployments umfassen:
*   **Central Config:** Ein einziges `opencode.json` über das gesamte Unternehmen, das SSO und interne AI-Gateways aufzwingt.
*   **Self-hosting:** Eigener Host für Share-Seiten (auf Anfrage bei Anomaly).
*   **TUI Separation:** TUI-spezifische Einstellungen wie `theme` oder `keybinds` gehören nicht ins `opencode.json`, sondern ins `tui.json`.
