# 04 – AGENT ZERO, MCP SKILLS & ORCHESTRATION CONFIG
<!-- Source: MANIFEST-ORCHESTRATOR.md, EXTRAKTIONS-SCRIPTS-GLOSSAR.txt, KI-AGENTUR-GROUND-ZERO-SETUP -->
<!-- VERIFIZIERT: ✅ = aus Quelldateien | Stand: 2025-11-27 -->

---START BLOCK-AGENT-ZERO---

## 1. Agent Zero Integration

### Status & Blocker
- **Status:** ÜBERFÄLLIG 🚨 – Blockiert
- **Blocker:** Docker Desktop 4.5 Installation nicht abgeschlossen
- **Abhängigkeiten:**
  1. Lauffähiges Docker Desktop 4.5 ✅
  2. Funktionierende E2B Sandbox + API-Key ✅
  3. Synchronisierter MCP-Server ✅
  4. Ollama mit phi3:mini installiert
- **Laufziel:** Lokal auf RTX 4080 mit Ollama
- **Ports:** 8000 (Instanz 1), 8001 (Instanz 2)

### Agent Zero CLAUDE.md (Sanctum-Prompt):
```markdown
## AGENT ZERO - KI-AGENTUR BACKBONE
Du bist ein autonomer KI-Agent für die Firon KI-Agentur.

Deine Rolle:
- Developer-Assistent mit Linux-Superkräften
- Projekt-Automatisierer (GitHub, n8n, Datenbanken)
- File-Management-Spezialist
- Skill-Lerner (du erinnerst dich an Lösungen)

Deine Skills (Auto-Erkannt):
- PDF-Parsing (Metadaten & Tabellen extrahieren)
- GitHub-Automation (Issues, PRs, Actions erstellen)
- File-Organization (Sortieren, Deduplizieren, Anonymisieren)
- Image-Processing (Resize, OCR, Duplicate-Find)
- Database-Connect (PostgreSQL-Queries auf RLS prüfen)

Deine Grenzen:
- Keine Credentials in Logs speichern
- Maximal 5 Minuten pro Task
- Immer Backups vor Destructive Ops
- Transparenz über alle Aktionen

Dein LLM:
- Lokal: Phi-3 Mini (3.8B), läuft auf deinem PC
- Keine Cloud, keine Latenz, keine Kosten
- Context-Window: 4096 Tokens

Dein Gedächtnis:
- Kurz: 6h Current Session
- Lang: Vektordatenbank (Alle Lösungen seit Start)
- Auto-Kompression: Alte Details zusammenfassen, Kern behalten
```

### Agent-Registry (`.claude/agents/registry.json`):
```json
{
  "agents": [
    {"id": "CCW-1", "role": "cleanup-docs", "repo": "claude-agents"},
    {"id": "CCW-2", "role": "analysis-wizard", "repo": "wizzard"},
    {"id": "CCW-3..CCW-10", "role": "various", "repo": "various"},
    {"id": "CCD-1..CCD-4", "role": "dev-tasks", "repo": "various"}
  ]
}
```

14 Agenten total: CCW-1..10 (Claude Code Workers) + CCD-1..4 (Claude Code Devs)  
`autonomousagent.py` mit 14 Agenten existiert bereits! ✅

---END BLOCK-AGENT-ZERO---

---START BLOCK-MCP-CONFIG---

## 2. MCP-Server Konfiguration

### Aktive MCP-Server (`~/.claude.json` oder `.mcp.json`):
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/workspaces/project"],
      "env": {}
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "YOUR_TOKEN_HERE"
      }
    },
    "fetch": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"],
      "env": {}
    },
    "e2b": {
      "command": "npx",
      "args": ["-y", "@e2b/mcp-server"],
      "env": {
        "E2B_API_KEY": "${E2B_API_KEY}"
      }
    }
  }
}
```

⚠️ **GitHub Token ist Platzhalter `YOUR_TOKEN_HERE`** → NOCH NICHT KONFIGURIERT

### MCP-Regeln:
- MCP < 10 Tools, stateless → Klassisches MCP ✅
- MCP > 20 Tools, Data Pipelines → E2B Code Execution ✅
- `executee2bcode` = Kernfunktion für Cloud-Execution ✅
- Node.js Voraussetzung für `npx` ✅
- Lazy-Loading für Skills → Kontext sparen ✅

---END BLOCK-MCP-CONFIG---

---START BLOCK-SKILL-REGISTRY---

## 3. Skill-Registry (SSOT)

### Registry-Datei: `.claude/skills/registry.json`
```json
{
  "version": "1.0",
  "skills": [
    {
      "name": "mcp-builder",
      "type": "Custom",
      "description": "Builds and configures MCP servers",
      "metadata": {"version": "1.0", "status": "active"}
    },
    {
      "name": "skill-creator",
      "type": "Custom",
      "description": "Creates new skills from blueprint documents",
      "metadata": {"version": "1.0", "status": "active"}
    },
    {
      "name": "webapp-testing",
      "type": "Custom",
      "description": "Tests web applications via Playwright",
      "metadata": {"version": "1.0", "status": "active"}
    },
    {
      "name": "pdf-parser",
      "type": "Custom",
      "description": "Extracts text, metadata, tables from PDFs",
      "metadata": {"version": "1.0", "status": "active", "deps": ["pymupdf", "pdfplumber"]}
    },
    {
      "name": "github-automation",
      "type": "Custom",
      "description": "Issues, PRs, Actions erstellen",
      "metadata": {"version": "1.0", "status": "active"}
    },
    {
      "name": "lead-gen-bot",
      "type": "Custom",
      "description": "GDPR-konformer Lead-Generator (EU-only)",
      "metadata": {
        "version": "1.0",
        "status": "planned",
        "kpis": "85% Accuracy, 40% Conversion, 20€/Monat"
      }
    },
    {
      "name": "content-creator-plan",
      "type": "Custom",
      "description": "30-Tage Content Calendar, SEO-Content, Markdown-Output",
      "metadata": {"version": "1.0", "status": "planned"}
    }
  ]
}
```

### Skill-Regeln (NICHT VERHANDELBAR):
- **SSOT:** `registry.json` ist die alleinige Wahrheit über verfügbare Skills
- Kein Hardcoding von Skills im MCP-Code
- Strikte Typisierung: kein `any`-Typ erlaubt
- Trennung: Registry = Datenspeicher (Was gibt es?), MCP = Logik (Wie wird es genutzt?)
- Versionierung jeder Änderung pflicht

### Problem: Schema-Mismatch (BEKANNTER BUG)
- Kompatibilitätsprobleme zwischen Registry-Struktur und MCP-API (Zeile 691-930)
- Ursache: Mangelnde Typisierung und Validierung
- Status: **OFFEN** – Validierungs-Logik muss implementiert werden

---END BLOCK-SKILL-REGISTRY---

---START BLOCK-ORCHESTRATION---

## 4. Orchestrations-Protokoll

### Agent-Hierarchie:
```
ORCHESTRATOR (Claude Opus 4.5)
├── Plant Architektur
├── Kommuniziert mit User
├── Entscheidet was Worker tun
│
WORKER (Claude Sonnet 4.5 – separates Kontingent!)
├── Parallele Ausführung
├── Routine-Tasks
├── Code-Generierung
└── Recherche
```

### Handoff-Protokoll:
```markdown
## HANDOFF AN [AGENT-TYP]

**Kontext:** [Was wurde bisher gemacht]
**Task:** [Was soll der Agent tun]
**Constraints:** [Was er NICHT tun soll]
**Erwartetes Output:** [Format der Antwort]
**Relevante Dateien:** [Pfade die er braucht]
```

### SafetyNet Hook (`auditguard.py`):
- **Aktiver Hook:** PreToolUse ✅
- Einziger aktiver Hook im System
- **Hooks-Config:** `.claude/hooks/hooksconfig.json`
- Zweck: Sicherheitskontrolle vor Tool-Ausführung

### Extended Thinking:
- **Verfügbar:** Opus 4.5 (Turbo-Modus)
- **Einsatz:** Nur bei seltenen Spezialfällen (maximale Qualität wichtiger als Kosten)
- **Plan Mode:** Erst simulieren, dann handeln

---END BLOCK-ORCHESTRATION---

---START BLOCK-AGENT-ZERO-PROMPT---

## 5. Research-Agent Prompt Template (für neue Chats)

```markdown
## KONTEXT
Du bist ein Research-Agent für das Ground-Zero Projekt.
Owner: Firon (Solo-KI-Agentur)
Orchestrator: Claude Opus 4.5

## DEIN AUFTRAG
[HIER SPEZIFISCHE AUFGABE EINFÜGEN]

## REGELN
1. Fokus auf PRAKTISCHE, UMSETZBARE Informationen
2. Keine langen Einleitungen - direkt zum Punkt
3. Quellen angeben wo möglich
4. Bei Unsicherheit: Sag es, rate nicht

## OUTPUT-FORMAT
- Bullet Points bevorzugt
- Code-Beispiele wo hilfreich
- Am Ende: Nächste Schritte / Empfehlung

## CONSTRAINTS
- Budget ist begrenzt → Fokus auf günstige/kostenlose Optionen
- Zeit ist knapp → Fokus auf schnell umsetzbare Lösungen
- Owner will LERNEN → erkläre das Warum
```

---END BLOCK-AGENT-ZERO-PROMPT---
