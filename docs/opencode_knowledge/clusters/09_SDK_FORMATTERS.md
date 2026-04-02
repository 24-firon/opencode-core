# Cluster 09: SDK & Formatters

Dieses Cluster behandelt die `@opencode-ai/sdk` (TypeScript) zur Integration von OpenCode in andere Node.js-Projekte sowie das automatische Formatierungs-System. Thematiken wie Themes und Keybinds werden hier ebenfalls kurz angerissen, sind aber für Backend-Agenten meist irrelevant.

## 1. Das TypeScript SDK (`@opencode-ai/sdk`)
Mit dem SDK können Entwickler OpenCode programmatisch steuern. Es bietet vollständige Typensicherheit durch Generierung aus der OpenAPI 3.1 Spec des Servers.

### Initialisierung
Es gibt zwei Wege, das SDK zu instanziieren:
1. **Server & Client Start:**
   ```typescript
   import { createOpencode } from "@opencode-ai/sdk";
   const { client, server } = await createOpencode({ port: 4096 });
   ```
2. **Nur Client (Verbindung zu existierendem Headless Server):**
   ```typescript
   import { createOpencodeClient } from "@opencode-ai/sdk";
   const client = createOpencodeClient({ baseUrl: "http://localhost:4096" });
   ```

### Structured Output (JSON Schema)
Das SDK zwingt den LLM-Agenten via `format: "json_schema"` dazu, strikt validiertes JSON zurückzugeben. Intern wird dafür ein unsichtbares `StructuredOutput` Tool genutzt.
```typescript
const result = await client.session.prompt({
  path: { id: sessionId },
  body: {
    parts: [{ type: "text", text: "Extrahiere Firmendaten..." }],
    format: {
      type: "json_schema",
      schema: {
        type: "object",
        properties: { company: { type: "string" } },
        required: ["company"]
      },
      retryCount: 2
    }
  }
});
console.log(result.data.info.structured_output);
```

### Hilfreiche SDK API-Calls
*   `client.find.text({ query: { pattern: "..." } })`: Schnelle Ripgrep-Suche über das Projekt.
*   `client.session.prompt({ body: { noReply: true, parts: [...] } })`: Kontext injizieren, ohne eine KI-Antwort zu triggern (Kosten & Zeit sparen).
*   `client.tui.executeCommand({ body: { command: "/test" } })`: TUI-Instanz fernsteuern.

## 2. Formatters
OpenCode formatiert geänderte Dateien nach jedem Write- oder Edit-Vorgang automatisch.
*   Erkennt native Tools wie `prettier`, `biome`, `ruff` oder `rustfmt` automatisch (wenn zz.B. in `package.json` oder als Binary vorhanden).
*   **Custom Formatters:** Können in der `opencode.json` erzwungen werden. Das `$FILE` Token ist hier essenziell:
    ```jsonc
    {
      "formatter": {
        "custom-markdown-formatter": {
          "command": ["deno", "fmt", "$FILE"],
          "extensions": [".md"]
        }
      }
    }
    ```

## 3. Ecosystem, Themes & Keybinds
*   **Ecosystem:** Eine Vielzahl an Community-Plugins existiert (z.B. `opencode-helicone-session`, `opencode-daytona`). Die Liste wird auf `models.dev` und in der Doku gepflegt.
*   **Themes & Keybinds:** Leben strikt in `tui.json`. Themes unterstützen Hex, ANSI und den Wert `"none"` für transparente Terminals. Keybinds nutzen zumeist `<leader>` (Default: `Ctrl+X`) zur Kollisionsvermeidung. Beide Systeme sind für autonome CI-Agenten irrelevant.
