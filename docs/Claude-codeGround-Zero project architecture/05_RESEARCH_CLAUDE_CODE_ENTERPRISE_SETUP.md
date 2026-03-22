# 05 – RESEARCH: CLAUDE CODE ENTERPRISE DEEP SETUP
<!-- Source: Diese Recherche-Session (März 2026) – web-recherchierte Quellen -->
<!-- Stand: März 2026 | Methode: Official Docs + GitHub Issues + Community (Reddit) -->

---START BLOCK-RESEARCH-CONTEXT-TOKENS---

## 1. Context & Token Architecture

### 1.1 .claudeignore – WICHTIGE KORREKTUR

**⚠️ OFFICIAL DOCS CLAIM vs. COMMUNITY REALITY:**

| Aspekt | Offizielle Linie | Community-Realität |
|---|---|---|
| `.claudeignore` als Datei | **EXISTIERT NICHT** offiziell | Feature Requests (#1304, #4160) geschlossen ohne echte Implementation |
| Exklusion von Dateien | Via `permissions.deny` in `settings.json` | Teilweise **nicht zuverlässig** (Issues: .env taucht weiter in Vorschlägen auf) |
| `ignorePatterns` | **DEPRECATED** | Nicht mehr nutzen |

**Pfad A (offiziell):**  
Arbeite ausschließlich mit `permissions.deny` + `sandbox.filesystem` (harte Zugriffsgrenzen)

**Pfad B (Enterprise-Workaround):**  
Führe eigene `.claudesignore` ein (beliebiger Name) → nur als Preprocessor-Artefakt.  
Claude Code liest sie NICHT – du generierst daraus deterministisch `permissions.deny`-Regeln.

### 1.2 Empfohlene `.claudesignore` (Custom-Format, Git-ähnlich):
```gitignore
# Build artefacts & Dependencies
**/node_modules/
**/.turbo/
**/.next/
**/dist/
**/build/
**/.cache/
**/coverage/
**/.venv/
**/__pycache__/

# Assets & binaries
**/*.png
**/*.jpg
**/*.pdf
**/*.zip
**/*.tar.gz

# Secrets (defensiv!)
**/.env
**/.env.*
**/secrets/**
**/config/credentials/**
**/config/*.key
**/config/*.pem

# Generated schemas
**/generated/**
**/openapi/**
**/proto_out/**
```

### 1.3 Resultierende `permissions.deny` in `.claude/settings.json`:
```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "permissions": {
    "deny": [
      "Read(/**/node_modules/**)",
      "Read(/**/.next/**)",
      "Read(/**/dist/**)",
      "Read(/**/.env)",
      "Read(/**/.env.*)",
      "Read(/**/secrets/**)",
      "Read(/**/config/credentials/**)",
      "Edit(/**/.env)",
      "Edit(/**/.env.*)",
      "Edit(/**/secrets/**)"
    ]
  }
}
```

### 1.4 CLAUDE.md Architektur (Layered, Monorepo)

**Struktur:**
```
~/.claude/CLAUDE.md                    # persönliche, globale Regeln

monorepo/
  CLAUDE.md                            # Root-Index (kurz! max ~150 Regeln)
  .claude/settings.json                # Permissions, Hooks, Sandbox
  apps/web/CLAUDE.md                   # Web-spezifische Regeln
  apps/api/CLAUDE.md                   # API-spezifische Regeln
  packages/ui/CLAUDE.md                # UI-Komponenten-Regeln
```

**Best Practices:**
- Root-CLAUDE.md = Router + Index (kurz, präzise)
- Service-Details auslagern in Sub-CLAUDE.md
- `CLAUDE.local.md` für persönliche Präferenzen (NICHT im Repo!)
- Max ~150 Instruktionen pro Datei (sonst werden Regeln ignoriert)
- Nur harte, testbare Regeln (keine weichen Appelle)
- Regel: Claude liest CLAUDE.md immer als erstes in den Systemprompt

### 1.5 Auto-Compact & Memory Management

```json
{
  "env": {
    "CLAUDE_AUTOCOMPACT_PCT_OVERRIDE": "70"
  }
}
```

**Thresholds:**  
- Default: ~95% Context-Auslastung  
- Empfehlung: 65-75% (ab dort Kontextdegradation spürbar)  
- Bug (Version 1.0.84): Auto-Compact triggerte bei 8-12% → faktisch unbenutzbar!  
- Power-User-Alternative: Auto-Compact abschalten + manuell `/clear` + Plan-Dokument

---END BLOCK-RESEARCH-CONTEXT-TOKENS---

---START BLOCK-RESEARCH-MCP-PLUMBING---

## 2. MCP Plumbing (Deep Config)

### 2.1 MCP-Speicherorte (KORREKT – Stand März 2026):

| Scope | Datei | Inhalt |
|---|---|---|
| **User/Local** | `~/.claude.json` → Feld `mcpServers` | Persönliche/geheime Server |
| **Project** | `.mcp.json` im Repo-Root | Team-standardisierte Server (versioniert) |
| **Managed** | macOS: `/Library/Application Support/ClaudeCode/managed-mcp.json` | IT-verwaltete Server |
| **Managed** | Linux/WSL: `/etc/claude-code/managed-mcp.json` | IT-verwaltete Server |
| **Managed** | Windows: `C:\Program Files\ClaudeCode\managed-mcp.json` | IT-verwaltete Server |

**⚠️ COMMUNITY-BUG:** MCP-Server NICHT in `~/.claude/settings.json` eintragen!  
→ Das war fehlerhafte Doku und funktioniert NICHT.  
→ Korrekt: `~/.claude.json` für User-Scope.

### 2.2 PostgreSQL MCP-Server (`~/.claude.json`):
```json
{
  "mcpServers": {
    "postgres-local": {
      "command": "npx",
      "args": [
        "-y",
        "@henkey/postgres-mcp-server",
        "--transport",
        "stdio"
      ],
      "env": {
        "DATABASE_URL": "postgresql://app_user:app_pass@localhost:5432/app_db",
        "DANGEROUSLY_ALLOW_WRITE_OPS": "false"
      }
    }
  }
}
```

### 2.3 GitHub MCP-Server (`.mcp.json` im Repo):
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_PAT_PROJECT}"
      }
    }
  }
}
```

### 2.4 Docker-Compose für Postgres + MCP-Server:
```yaml
version: "3.8"
services:
  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=app_db
      - POSTGRES_USER=app_user
      - POSTGRES_PASSWORD=app_password
    ports:
      - "5432:5432"

  postgres-mcp:
    image: node:20
    working_dir: /srv/postgres-mcp
    command: npx @henkey/postgres-mcp-server --transport stdio
    environment:
      - DATABASE_URL=postgresql://app_user:app_password@postgres:5432/app_db
      - DANGEROUSLY_ALLOW_WRITE_OPS=false
    depends_on:
      - postgres
    stdin_open: true
    tty: true
```

---END BLOCK-RESEARCH-MCP-PLUMBING---

---START BLOCK-RESEARCH-SECURITY-SANDBOX---

## 3. Security & Sandboxing Blueprint

### 3.1 Vollständige `settings.json` (Project-Scope, strenger Sandbox-Default):
```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "sandbox": {
    "enabled": true,
    "autoAllowBashIfSandboxed": false,
    "allowUnsandboxedCommands": false,
    "filesystem": {
      "denyRead": [
        "~/.aws/credentials",
        "~/.ssh/**",
        "~/.config/**",
        "./secrets/**",
        "./.env",
        "./.env.*"
      ],
      "allowRead": ["./"],
      "allowWrite": ["./", "/tmp/build"]
    },
    "network": {
      "allowedDomains": ["api.anthropic.com"],
      "allowUnixSockets": [],
      "allowLocalBinding": false
    }
  },
  "permissions": {
    "deny": [
      "WebFetch",
      "Bash(curl *)",
      "Bash(rm -rf*)",
      "Read(~/.aws/credentials)",
      "Read(~/.ssh/**)",
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)"
    ],
    "ask": [
      "Bash(git push *)",
      "Bash(psql:*prod*)"
    ],
    "allow": [
      "Bash(git status*)",
      "Bash(npm run lint*)",
      "Bash(npm test*)"
    ],
    "defaultMode": "default"
  }
}
```

### 3.2 DevContainer (`.devcontainer/devcontainer.json`):
```json
{
  "name": "Claude Code Sandbox",
  "build": {
    "dockerfile": "Dockerfile",
    "args": {"TZ": "${localEnv:TZ:Europe/Berlin}"}
  },
  "remoteUser": "vscode",
  "workspaceFolder": "/workspaces/project",
  "workspaceMount": "source=${localWorkspaceFolder},target=/workspaces/project,type=bind,consistency=delegated",
  "mounts": [
    "source=claude-code-config-${devcontainerId},target=/home/vscode/.claude,type=volume",
    "source=claude-code-state-${devcontainerId},target=/home/vscode/.local/share/claude,type=volume"
  ],
  "remoteEnv": {
    "CLAUDE_CONFIG_DIR": "/home/vscode/.claude"
  }
}
```

### 3.3 Standalone Docker-Sandbox Alias:
```bash
alias claude-sandbox='docker run -it --rm \
  --name claude-code-sandbox \
  -v claude-code-config:/home/vscode/.claude \
  -v claude-code-state:/home/vscode/.local/share/claude \
  -v "$(pwd):/workspaces/project" \
  -w /workspaces/project \
  claude-code-sandbox-image'
```

---END BLOCK-RESEARCH-SECURITY-SANDBOX---

---START BLOCK-RESEARCH-HOOKS-TOOLS---

## 4. Execution Settings: Hooks & Custom Tools

### 4.1 PostToolUse Hook (Linting + Testing nach Edit):
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "npx prettier --write \"$CLAUDE_FILE_PATH\" 2>/dev/null || true"
          },
          {
            "type": "command",
            "command": "npx eslint --fix \"$CLAUDE_FILE_PATH\" 2>/dev/null || true"
          },
          {
            "type": "command",
            "command": "npm test -- --runTestsByPath \"$CLAUDE_FILE_PATH\" 2>/dev/null || true"
          }
        ]
      }
    ]
  }
}
```

### 4.2 Skill-Struktur (CI-Checks als Native Tool):
```
.claude/
  skills/
    ci-checks/
      Skill.md
      run_ci.sh
```

`Skill.md`:
```markdown
---
name: "ci-checks"
description: "Run project lint and test checks before proposing a commit."
---
When invoked: Run npm run lint, npm test, collect exit codes, return JSON summary.
If either fails: Do NOT propose final commit message.
```

### 4.3 Auto-Approve vs. Ask-Before-Execute (Best Practice):
```
DENY-Regel    → Gewinnt immer (erste passende Regel)
ASK-Regel     → Promptet vor Ausführung
ALLOW-Regel   → Automatisch erlaubt

Reihenfolge: deny → ask → allow (hardcoded in Spec)
```

**⚠️ BUG (VS Code Extension Pfad):** `permissionDecision: "ask"` aus PreToolUse-Hooks  
wird in VS Code Extension **ignoriert** – CLI-Pfad fragt korrekt nach!  
→ Für heikle Repos: **CLI als sicherer Pfad** nutzen!

---END BLOCK-RESEARCH-HOOKS-TOOLS---

---START BLOCK-RESEARCH-QUELLEN-TABELLE---

## 5. Quellen (Diese Session)

| Ressource | Typ | Technischer Fokus | Datum |
|---|---|---|---|
| Claude Code `settings.json` Docs | Offizielle Docs | Scopes, Sandbox, Permissions, Excluding Files | 03/2026 |
| Configure Permissions – Claude Code | Offizielle Docs | `permissions.allow/ask/deny`, Tool-Pattern-Syntax | 03/2026 |
| Using CLAUDE.md files | Offizieller Blog | Semantik & Platzierung, Progressive Disclosure | 11/2025 |
| Claude Code Best Practices | Offizielle Best-Practices | Kontextmanagement, `/clear`, Sandbox | 03/2026 |
| `.claudeignore` Feature Requests (#1304, #4160) | GitHub Issues | Workarounds mit `permissions.deny`, Security-Leaks | 05–08/2025 |
| Permissions Bugs (#6699, #6631, etc.) | GitHub Issues | `deny`-Regeln funktionieren nicht zuverlässig | 2025–01/2026 |
| MCP Spec & Examples | Offizielle MCP-Spec | `mcpServers`-Schema, Beispiel-Konfigurationen | 11/2025–01/2026 |
| Claude Code MCP-Docs | Offizielle Docs | Speicherorte `~/.claude.json`, `.mcp.json`, CLI-Befehle | 03/2026 |
| Postgres MCP Server Repos | GitHub Repos | `DATABASE_URL`, `DANGEROUSLY_ALLOW_WRITE_OPS` | 02/2025 |
| Claude Code in Devcontainers | Blog/Guides | DevContainer Setup, offizielle Vorlage | 10/2025 |
| Docker Sandboxes + Claude Code | Docker/Arcade Blogs | MicroVM-basierte Sandboxes für Coding Agents | 12/2025–01/2026 |
| Auto-Compact Behavior & Bugs | Community-Blog & Issues | Bug in 1.0.84 mit Trigger bei 8–12% | 12/2025 |

---END BLOCK-RESEARCH-QUELLEN-TABELLE---
