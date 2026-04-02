# Cluster 04: MCP Servers, Plugins & ACP

Dieses Cluster behandelt die Erweiterbarkeit von OpenCode durch externe Server (MCP), integrierte TypeScript-Plugins und das Agent Client Protocol (ACP).

## 0. ⚠️ COMMUNITY REALITY CHECKS (März 2026)

> **Remote MCP Kein Reconnect (GitHub Issue #829, sst/opencode):** Wenn ein Remote-MCP-Server beim Start nicht erreichbar ist, gibt OpenCode auf. Kein Retry, kein Reconnect-Mechanismus.
> **Workaround:** Remote-Server über `mcp-proxy` (Rust, Tidewave) wrappen, der eigene Reconnect-Logik hat:
> ```jsonc
> { "mcp": { "playwright": { "type": "local", "command": ["mcp-proxy", "http://localhost:8900/mcp"], "enabled": true } } }
> ```
>
> **OAuth Lockfile-Kollision:** Bei parallelen OpenCode-Instanzen kollidieren die OAuth-Token-Lockfiles (30-Minuten-Expiry).
> **Workaround:** Pre-authenticated Tokens manuell verwalten.
>
> **5s Timeout zu kurz:** Default-Timeout von 5000ms ist für komplexe MCP-Server (Browser-Automation) zu aggressiv.
> **Workaround:** `"mcp.<name>.timeout": 30000` in der Config setzen.

## 1. MCP (Model Context Protocol) Server
MCP erlaubt die dynamische Einbindung externer Tools (APIs, Datenbanken, andere Systeme) in das Kontextfenster des Agenten. **Achtung: Token-Kosten!** Jedes aktive MCP-Tool füllt das System-Prompt.

### Lokale vs. Remote MCPs
*   **Local:** Werden über CLI-Befehle gestartet (z.B. via `npx` oder `bun`). Sie können Environment-Variablen injiziert bekommen.
*   **Remote:** Laufen über HTTP(S) und unterstützen API-Keys (`headers`) oder **OAuth** (mit Dynamic Client Registration nach RFC 7591).

```jsonc
{
  "mcp": {
    "local-db": {
      "type": "local",
      "command": ["npx", "-y", "@my-org/db-mcp"],
      "environment": { "DB_URL": "..." }
    },
    "remote-jira": {
      "type": "remote",
      "url": "https://jira.company.com/mcp",
      "oauth": {
        "clientId": "{env:JIRA_CLIENT_ID}",
        "scope": "read write"
      }
    }
  }
}
```

### Routing: MCP-Sichtbarkeit pro Agent steuern
Um Token-Bloat zu verhindern, schaltet man MCPs global ab und nur für spezifische Agenten an:
1. Globales Verbot via `tools`-Config (Wildcard `*` erlaubt).
2. Agenten-spezifischer Opt-in.

```jsonc
{
  "tools": {
    "remote-jira_*": false // Alle Tools des Servers "remote-jira" global verbergen
  },
  "agent": {
    "pm-agent": {
      "tools": {
        "remote-jira_*": true // Nur dieser Agent darf Jira sehen
      }
    }
  }
}
```

## 2. Plugins (TypeScript Event Hooks)
Plugins erlauben tiefe Eingriffe in den Lifecycle von OpenCode. Sie leben in `.opencode/plugins/` oder werden als NPM-Pakete (`"plugin": ["my-pkg"]`) geladen.

Ein Plugin exportiert eine asynchrone Funktion, die Hooks registriert und Zugriff auf den `client` (SDK), das Projekt und die Shell (`$`) hat.

### Mächtige Hook-Beispiele:
*   **Security (Tool Intercept):**
    ```typescript
    "tool.execute.before": async (input, output) => {
      if (input.tool === "bash" && output.args.command.includes("rm -rf")) {
        throw new Error("Destruktive Befehle blockiert!");
      }
    }
    ```
*   **Context Compaction Override:**
    Ermöglicht das Injezieren eigenen Kontexts, wenn das Token-Limit erreicht ist und die Session zusammengefasst wird:
    ```typescript
    "experimental.session.compacting": async (input, output) => {
      output.context.push("WICHTIG: Das System verwendet React 19.");
    }
    ```
*   **Environment Injection:**
    Zwingt jede Shell (auch AI-ausgeführte), bestimmte Variablen zu nutzen:
    ```typescript
    "shell.env": async (input, output) => { output.env.CI = "true"; }
    ```

## 3. ACP (Agent Client Protocol)
ACP standardisiert die Kommunikation zwischen IDEs (Zed, Neovim, JetBrains) und KI-Agenten über `stdio` (JSON-RPC).
*   Startbefehl: `opencode acp`
*   Features: Alle nativen Tools, Custom Tools und MCP-Server sind auch im ACP-Modus verfügbar (außer TUI-spezifische Slash-Commands wie `/undo`).
