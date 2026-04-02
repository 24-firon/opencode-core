# Cluster 03: Tools, Permissions & LSP

Dieses Cluster behandelt die Werkzeuge (Tools), mit denen der LLM-Agent physisch mit dem System interagiert, sowie das strikte Berechtigungsmodell (Permissions) und Code-Intelligence via LSP.

## 0. ⚠️ COMMUNITY REALITY CHECKS (März 2026)

> **Windows Permissions Bypass (GitHub Issue #16126, #11042):** `external_directory: "deny"` wird auf Windows-Systemen **nicht enforced**. Drive-Letter-Wechsel (D: → C:) umgehen die Pfad-Normalisierung komplett. Ein fundamentaler Security-Bug.
> **Workaround:** Auf Windows ausschließlich in WSL/Docker arbeiten.
>
> **Plugin Permission Override (GitHub #oh-my-opencode):** Community-Plugins wie `oh-my-opencode` können existierende Permission-Konfigurationen zurücksetzen. Das Plugin-System hat keinen Merge-Mechanismus für Security-Policies.
>
> **auth.json Plaintext (GitHub Issue #343):** API-Keys im Klartext in `~/.local/share/opencode/auth.json`. KEINE Verschlüsselung.
> **Workaround:** Keys ausschließlich als Umgebungsvariablen setzen.

## 1. Built-in Tools & Abhängigkeiten
OpenCode stellt eine Reihe von nativen Tools zur Verfügung.
**Wichtig:** Einige Tools sind logisch an die Permissions anderer Tools gekoppelt!

*   `edit`, `write`, `patch`: Alle Dateimodifikationen unterliegen der `edit` Permission.
*   `bash`: Shell-Befehle ausführen (Standardmäßig `allow`, in Enterprise oft `ask` oder eingeschränkt).
*   `read`, `grep`, `glob`, `list`: Lese-Werkzeuge. `read` erlaubt alles, außer `*.env` Dateien (diese sind by default auf `deny`).
*   `skill`: Lädt Agent-Skills aus `.opencode/skills/`.
*   `todowrite`, `todoread`: Task-Management (Für Subagenten by default deaktiviert, muss explizit erlaubt werden).
*   `webfetch` vs. `websearch`: `webfetch` liest eine direkte URL. `websearch` (Exa AI) sucht im Netz (benötigt `OPENCODE_ENABLE_EXA=1` in lokaler Umgebung).
*   `lsp` (experimental): Erlaubt Code-Navigation (`goToDefinition`, `findReferences`). Benötigt `OPENCODE_EXPERIMENTAL_LSP_TOOL=true`.

## 2. Das Permission-System (Gatekeeping)
Permissions regeln, ob ein Tool `"allow"`, `"ask"` oder `"deny"` liefert. Die Syntax erlaubt granulare Pattern-Matches.
**Regel:** Die *letzte* matchende Regel gewinnt. (Daher Catch-All `*` immer nach oben).

```jsonc
{
  "permission": {
    "bash": {
      "*": "ask",             // Default: Frag nach Erlaubnis
      "git status": "allow",  // Erlaube harmlose Reads
      "rm *": "deny"          // Verbiete Löschen hart
    },
    "edit": {
      "*": "deny",            // Verbiete alles
      "src/**/*.ts": "allow"  // Erlaube Edits nur im src/ Ordner
    }
  }
}
```

### Safety Guards (Doom Loop & External Dirs)
Es existieren spezielle Meta-Permissions für die Systemsicherheit:
*   `external_directory`: Greift ein Tool (egal ob `read`, `edit` oder `bash`) auf einen Pfad **außerhalb** des aktuellen Workspaces zu, greift diese Regel (Default: `ask`).
    *   *Workaround:* `{"external_directory": {"~/projects/shared/**": "allow"}}`
*   `doom_loop`: Wenn ein Agent 3x exakt denselben Tool-Call mit identischem Input feuert, wird dies getriggert (Default: `ask`, bricht Endlosschleifen).

## 3. Custom Tools (TypeScript API)
Entwickler können eigene Tools schreiben. Die LLM kann darüber beliebige Skripte (auch Python/Go) aufrufen.
**Speicherort:** `.opencode/tools/*.ts` oder `~/.config/opencode/tools/*.ts`

```typescript
import { tool } from "@opencode-ai/plugin";

export default tool({
  description: "Queries the production DB",
  args: {
    query: tool.schema.string().describe("SQL query"),
  },
  async execute(args, context) {
    // context.directory = Current working dir
    // context.worktree = Git root
    const result = await Bun.$`python3 query.py ${args.query}`.text();
    return result;
  }
});
```
*Tipp:* Wenn ein Custom Tool denselben Namen wie ein Built-in Tool hat (z.B. `bash.ts`), **überschreibt** es das Built-in Tool. Perfekt für hochsichere Wrapper.

## 4. LSP (Language Server Protocol)
OpenCode startet passende LSPs basierend auf der Dateiendung.
*   **Auto-Download:** OpenCode lädt fehlende LSPs automatisch herunter. In Airgapped-Environments muss dies via `OPENCODE_DISABLE_LSP_DOWNLOAD=true` blockiert werden.
*   **Init-Options & Env-Vars:** LSPs können in der `opencode.json` konfiguriert werden:
    ```jsonc
    {
      "lsp": {
        "rust": { "env": { "RUST_LOG": "debug" } },
        "typescript": { "initialization": { "preferences": { "importModuleSpecifierPreference": "relative" } } }
      }
    }
    ```
