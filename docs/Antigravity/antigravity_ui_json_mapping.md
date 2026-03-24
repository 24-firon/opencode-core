# Antigravity IDE: UI-Label → JSON-Key Mapping
**Quelle:** Google Codelabs (codelabs.developers.google.com, März 2026) + iamulya.one Advanced Tips
**Zweck:** Vollständige, verifizierte Brücke zwischen dem, was du in der grafischen Oberfläche siehst, und dem tatsächlichen Schlüssel im JSON.

---

## Navigation zur Settings-Oberfläche

| Aktion | Shortcut / Pfad |
| :--- | :--- |
| Öffne User Settings (JSON) | `Cmd/Ctrl + ,` → dann oben rechts auf das `{}` Icon klicken |
| Öffne Antigravity Agent-Einstellungen (UI) | `Antigravity` Menü → `Settings` → Abschnitt `Agent` |
| Öffne Customizations (Rules & Workflows) | Editor-Ansicht → `...` oben rechts → `Customizations` |
| Öffne MCP Servers | Agent-Seitenpanel → `...` Menü → `MCP Servers` |
| Öffne MCP Raw Config | MCP Servers → `Manage MCP Servers` → `View raw config` |

---

## Abschnitt 1: Terminal-Berechtigungen

**UI-Pfad:** `Antigravity → Settings → Terminal`

| UI-Label (Anzeigetext) | JSON-Schlüssel | Mögliche Werte (Typ: string) | Erklärung |
| :--- | :--- | :--- | :--- |
| **Terminal Command Auto Execution** | `antigravity.agent.terminal.autoExecutionPolicy` | `"review"` / `"always-proceed"` | Hauptschalter: Muss der Agent vor jedem Befehl warten? |
| **Allow List Terminal Commands** | `antigravity.agent.terminal.allowedCommands` | Array von strings: `["git status", "npm run test"]` | Befehle, die IMMER ohne Dialog laufen (gilt bei Policy `review`) |
| **Deny List Terminal Commands** | `antigravity.agent.terminal.deniedCommands` | Array von strings: `["rm", "sudo", "curl"]` | Befehle, die NIEMALS laufen (gilt bei Policy `always-proceed`) |

### Die vier Setup-Presets (Erstinstallation / UI-Auswahl)
Diese vier Buttons in der UI sind **Preset-Bundles**, die mehrere Policies gleichzeitig setzen:

| UI-Preset-Name | Terminal Policy | Review Policy | JS Policy | Sicherheitsniveau |
| :--- | :--- | :--- | :--- | :--- |
| **Secure Mode** | `review` | `request-review` | `disabled` | Maximal |
| **Review-driven development** ⭐ | `review` | `request-review` | `request-review` | Hoch (empfohlen) |
| **Agent-driven development** | `always-proceed` | `always-proceed` | `always-proceed` | Keines |
| **Custom configuration** | Manuell | Manuell | Manuell | Individuell |

---

## Abschnitt 2: Artefakt-Review-Policy

**UI-Pfad:** `Antigravity → Settings → Agent → Review Policy`

| UI-Label | JSON-Schlüssel | Mögliche Werte | Erklärung |
| :--- | :--- | :--- | :--- |
| **Review Policy** | `antigravity.agent.review.policy` | `"always-proceed"` / `"agent-decides"` / `"request-review"` | Steuert, ob der Agent bei Implementation Plans & Task Lists pausiert |

> ⚠️ **KRITISCH (das "Auto-LGTM"-Problem):** Wenn dieser Wert auf `"always-proceed"` steht, nickt Antigravity Implementation Plans automatisch ab. **Dies ist die direkte Ursache des beschriebenen "LGTM"-Phänomens.** Setze diesen Wert immer auf `"request-review"`.

### Die drei Review-Policy-Optionen im Detail

| UI-Optionsname | JSON-Value | Verhalten |
| :--- | :--- | :--- |
| **Always Proceed** | `"always-proceed"` | Agent fragt NIEMALS nach Review. Artefakte werden automatisch abgenickt. |
| **Agent Decides** | `"agent-decides"` | Agent entscheidet selbst, wann ein Review nötig ist (Standard-Default). |
| **Request Review** | `"request-review"` | Agent pausiert nach JEDEM Artefakt und wartet auf explizite Operator-Freigabe. |

---

## Abschnitt 3: Browser-JavaScript-Policy

**UI-Pfad:** `Antigravity → Settings → Browser`

| UI-Label | JSON-Schlüssel | Mögliche Werte | Erklärung |
| :--- | :--- | :--- | :--- |
| **JavaScript Execution Policy** | `antigravity.agent.browser.jsExecutionPolicy` | `"always-proceed"` / `"request-review"` / `"disabled"` | Darf der Browser-Agent JS im Kontext von Webseiten ausführen? |
| **Browser URL Allowlist** | `antigravity.agent.browser.urlAllowlist` | Array von URL-strings | Welche Domains darf der Browser-Agent überhaupt besuchen? |

---

## Abschnitt 4: Konversationsmodi (Agent Panel Dropdown)

**UI-Pfad:** Agent-Seitenpanel → Dropdown links neben dem Eingabefeld

| UI-Label | JSON-Schlüssel | Mögliche Werte | Erklärung |
| :--- | :--- | :--- | :--- |
| **Planning** (Mode) | `antigravity.agent.defaultMode` | `"planning"` | Agent erstellt erst Task List + Implementation Plan, wartet auf Feedback, dann Code |
| **Fast** (Mode) | `antigravity.agent.defaultMode` | `"fast"` | Agent führt direkt aus, kein Plan vorab |

---

## Abschnitt 5: Modell-Auswahl

**UI-Pfad:** Agent-Seitenpanel → Modell-Dropdown

| UI-Anzeigename | Interner Bezeichner | Anwendungsfall |
| :--- | :--- | :--- |
| Gemini 3 Pro (High) | `gemini-3-pro-high` | Komplexe Aufgaben, Deep Research, Architektur |
| Gemini 3 Pro (Low) | `gemini-3-pro-low` | Leichtere Aufgaben, token-effizient |
| Claude Sonnet 4.5 | `claude-sonnet-4-5` | Konversation, Dokumentation, Reasoning |
| Claude Sonnet 4.5 (Thinking) | `claude-sonnet-4-5-thinking` | Erweiterte analytische Aufgaben |
| GPT 0SS 120B (Medium) | `gpt-0ss-120b-medium` | Ausgeglichene Performance |

---

## Abschnitt 6: Rules & Workflows (Konfigurationsdateien-System)

**UI-Pfad:** Editor → `...` oben rechts → `Customizations` → `Rules` / `Workflows`

| UI-Element | Dateisystem-Pfad | Scope | Erklärung |
| :--- | :--- | :--- | :--- |
| **Global Rules** | `~/.gemini/GEMINI.md` | Alle Projekte | System-Prompt-Override, gilt überall |
| **Workspace Rules** | `<project-root>/.agents/rules/<name>.md` | Dieses Projekt | Projekt-spezifische Regeln |
| **Global Workflows** | `~/.gemini/antigravity/global_workflows/<name>.md` | Alle Projekte | Per `/name` abrufbare Prompt-Makros |
| **Workspace Workflows** | `<project-root>/.agents/workflows/<name>.md` | Dieses Projekt | Per `/name` abrufbare Prompt-Makros |

> ⚠️ **KONFLIKT IN DEN OFFIZIELLEN DOCS:** Das Google Codelab nennt `.agents/rules/` (mit "s"), der Advanced Tips Blog nennt `.agent/rules/` (ohne "s"). Stand März 2026 ist `.agents/` (mit "s") die offizielle korrekte Schreibweise laut Codelab.

---

## Abschnitt 7: MCP Server-Konfiguration

**UI-Pfad:** Agent-Seitenpanel → `...` → `MCP Servers` → `Manage MCP Servers` → `View raw config`

| UI-Element | Dateisystem-Pfad | Format | Erklärung |
| :--- | :--- | :--- | :--- |
| **MCP Raw Config** | `~/.gemini/antigravity/mcp_config.json` | JSON | Zentrale Konfigurationsdatei für alle MCP-Server |

### Minimales MCP-Konfig-Schema:
```json
{
  "mcpServers": {
    "<server-name>": {
      "command": "npx",
      "args": ["-y", "<package-name>"],
      "env": {
        "API_KEY": "<your-key>"
      }
    }
  }
}
```

---

## Abschnitt 8: Skills-System

**UI-Pfad:** Kein direktes UI — Dateisystem-basiert

| Scope | Verzeichnis | Wann aktiv |
| :--- | :--- | :--- |
| Global | `~/.gemini/antigravity/skills/<skill-name>/` | Alle Projekte |
| Workspace | `<project-root>/.agents/skills/<skill-name>/` | Nur dieses Projekt |

Jeder Skill-Ordner benötigt eine `SKILL.md` mit YAML-Frontmatter:
```markdown
---
name: skill-name
description: Wann der Agent diesen Skill laden soll (wird als Retrieval-Query genutzt)
---
# Skill-Anweisungen hier...
```

---

## Vollständiges settings.json Template (Operator-kontrolliertes Setup)

```json
{
  "antigravity.agent.terminal.autoExecutionPolicy": "review",
  "antigravity.agent.terminal.allowedCommands": [
    "git status", "git diff", "git log", "git branch",
    "python --version", "pip list", "pip show", "ls -al"
  ],
  "antigravity.agent.terminal.deniedCommands": [
    "rm", "sudo", "curl", "wget", "chmod", "git push -f"
  ],
  "antigravity.agent.review.policy": "request-review",
  "antigravity.agent.browser.jsExecutionPolicy": "request-review",
  "antigravity.agent.defaultMode": "planning",
  "antigravity.terminal.autoRun": false,
  "cortex.agent.autoRun": false,
  "terminal.integrated.shellIntegration.enabled": false
}
```
