# 03 – TOOLS, FRAMEWORKS & TECH STACK (GROUND-ZERO)
<!-- Source: MANIFEST-ORCHESTRATOR.md, MCP-DOCKER-E2B-DEEP-DIVE.md, Claude.md, EXTRAKTIONS -->
<!-- VERIFIZIERT: ✅ = aus Quelldateien | ⚠️ = Warnung | 🚨 = Kritisch -->

---START BLOCK-TOOLS-STACK---

## 1. AI-Modelle & Strategie

| Rolle | Modell | Zweck | Budget-Verbrauch |
|---|---|---|---|
| **ORCHESTRATOR** | Claude Opus 4.5 | Planung, Architektur, komplexe Analysen, User-Kommunikation | Hoch |
| **WORKER** | Claude Sonnet 4.5 | Parallele Ausführung, Routine-Tasks, Code-Generierung, Recherche | Separat |
| **SORTER / HAIKU** | Claude Haiku | Viele kleine Subtasks, Auswertungen, Tests, Parsing | Niedrig |
| **REASONING** | Gemini 3.0 | Komplexe Analysen (aber: "eigensinniger Quatschkopf" – Frust) | Extern |
| **LIVE-RECHERCHE** | Perplexity Pro | Live-Recherchen, aktuelle Infos | Extern |
| **LOCAL LLM** | Ollama phi3:mini | Lokal, kostenlos, KEIN Internet – für Sanctum/Agent Zero | 0 Kosten |
| **BACKUP LOCAL** | qwen2.5:7b | Speed vs. Code-Qualität Abwägung zu phi3:mini | 0 Kosten |

### Task-Verteilung nach Agenten:
| Task-Typ | Agent | Warum |
|---|---|---|
| Architektur-Entscheidung | Opus | Braucht Kontext |
| Code schreiben | Sonnet | Routine |
| User erklären | Opus | Kommunikation wichtig |
| Security Review | Opus | Kritisch |
| Dateien verarbeiten | Sonnet | Bulk-Arbeit |

## 2. MCP-Server (Model Context Protocol)

| Server | Zweck | Status |
|---|---|---|
| `filesystem` | Lokaler Dateizugriff auf Projekt-Ordner | ✅ AKTIV |
| `github` | Repository Management (Token: Platzhalter `YOUR_TOKEN_HERE`) | ✅ AKTIV |
| `fetch` | HTTP Requests | ✅ AKTIV |
| `e2b` | Code Execution Sandbox | 🔧 KONFIGURIERT |
| `digitalocean` | Droplet Verwaltung | 📋 GEPLANT |
| `docker` | Container Management | 📋 GEPLANT |

**MCP Config-Pfad:** `C:\Users\[user]\desktop\config.json`  
**MCP Setup-Doku:** `mcp-groundzero-setup.md` (1100 Zeilen!)  
**Aktiver Hook:** SafetyNet PreToolUse (`auditguard.py`) ✅

### Token-Wirtschaft MCP vs. E2B:
```
Klassisches MCP (alle Tools geladen):    150.000 Tokens/Request
E2B Sandbox (Orchestrierung verlagert):    2.000 Tokens/Request
                                         → 98,7% Token-Reduktion!
```

## 3. Infrastruktur & Container

### Docker
- **Version:** Docker Desktop **4.5** (STRIKT – niemals höher!)
- **Grund:** Neuere Versionen (4.6+) verursachen CHAOS mit Nvidia-Treibern unter WSL2
- **Praxis: AUTO-UPDATE AUS!** ← Kritischster Schritt bei Installation
- **Dokument:** `C-Zero-Code-DOCKER-4.5.md` (existiert)
- **Status (Nov 2025):** Blocker für Agent Zero-Installation
- ⚠️ Port 2375 (Docker API unverschlüsselt) = Risiko im LAN

### Docker-Security-Checkliste:
```yaml
- Non-Root User: node:1000, postgres:70
- cap_drop: ALL
- no-new-privileges: true
- Resource Limits: CPU/RAM
- Secrets via Docker Secrets, NICHT ENV
- Docker Socket NIEMALS in Container mounten
```

### E2B Sandbox
- **Zweck:** Isolierte Code-Execution ohne Token-Explosion
- **API-Key Speicherort:** `config/global.env` und als Deployment-Secret
- **Port:** 8888 (NICHT 8080 – Konflikt!)
- **Status:** E2B MCP Server läuft bereits lokal (User-Bestätigung) ✅
- **Skript:** `04-mcp-e2b-setup.ps1`
- **Free Tier:** Grund für 98,7% Token-Ersparnis (Kosten = 0)

## 4. Workflow & Automation

### n8n
- **Zweck:** Workflow-Orchestrator (SSOT für Workflows)
- **Port:** 5678 (NUR über VPN erreichbar, NICHT öffentlich)
- **DB-Backend:** PostgreSQL (nicht SQLite!)
- **n8n-Config:** `docker-compose.yml` / `n8n-postgres-stack.yaml` (488 Zeilen!)
- **Skript:** `start-n8n.sh`
- **Env-Variablen kritisch:** `N8N_ENCRYPTION_KEY` (stabil + geheim → Backup!)

### PostgreSQL
- **Version:** 15/16
- **Container-Name:** `groundzero-postgres-local`
- **Zugriff:** NUR über VPN / Docker-intern
- **Backup-Skript:** `pg-backup.sh` (50 Zeilen, GPG-Encryption!)
- **Restore-Skript:** `pg-restore.sh` (40 Zeilen, mit Bestätigungs-Prompt)
- **SSOT:** PostgreSQL ist der EINZIGE Kommunikationskanal zu Agent Zero

## 5. Secrets Management

| Tool | Status | Bewertung |
|---|---|---|
| **Infisical** | Aktuell genutzt | ⚠️ SSPL-Lizenz = Vendor Lock-in Risiko |
| **OpenBao** | Ziel (MPL 2.0, Linux Foundation) | ✅ Bevorzugt – Open Source |
| `.env` Datei | gitignored | ✅ Minimal-Lösung |

**Migrations-Plan Infisical → OpenBao:**
1. OpenBao parallel aufsetzen
2. Secrets aus Infisical nach OpenBao spiegeln
3. Skripte (Backup, Start) auf OpenBao-CLI umstellen
4. Erst wenn stabil: Infisical vom Prod-Pfad abschalten

## 6. Netzwerk & VPN

- **VPN:** Tailscale / Headscale (selbst-gehosted)
- **Reverse Proxy:** Caddy (geplant) / Traefik
- **UFW-Regeln:** `ufw-setup.sh` (30 Zeilen)
- **SSH:** Nur über Admin-IP
- **Regel:** n8n-Port 5678 und DB-Port 5432 NIEMALS öffentlich!

## 7. Development Tools

| Tool | Zweck | Scope |
|---|---|---|
| **Cursor IDE** | Haupt-Editor, Context-Engineering, Frontend | Säule A |
| **Claude Desktop** | Orchestrator, MCP-Client, Skills-Loader | Säule A |
| **Claude Code** | Coding-Agent, GitHub-Integration | Säule A |
| **VS Code** | Integration installiert | Säule A |
| **Docker Desktop 4.5** | Container-Verwaltung | Säule A/B |
| **Playwright** | Browser-Automatisierung (später) | Geplant |
| **Git Worktrees** | Parallele Sessions für Claude Code | Aktiv |

⚠️ **Electron-Wrapper Performance:** Claude Desktop App ist langsamer als CLI → CLI bevorzugt!

## 8. Wissensmanagement & Recherche

| Tool | Zweck | Bewertung |
|---|---|---|
| **NotebookLM** | Alles reinschmeißen – Fragen stellen | ✅ Bevorzugt |
| **Google File Search RAG API** | Günstiger Ersatz für lokales RAG | Gamechanger |
| **Obsidian** | Vernetztes Wissen, Graph-RAG | Zukunft |
| **Perplexity Pro** | Live-Recherchen | Aktiv |
| **Gemini Advanced / AI Studio** | Large Context, Video-Analyse | Extern |
| **AirTable / ClickUp** | Task-Management (User nutzt gerne) | Aktiv |

## 9. Extraction & Knowledge Tools

| Skript | Zweck | Status |
|---|---|---|
| `extractdocs.py` (V1) | Erste Version – war Müll (94% Kompression → Datenverlust!) | ❌ DEPRECATED |
| `extractv2.py` (V2) | Chunking, max 70% Kompression | ✅ Aktuell |
| `extractworkspace.py` | Support für `.md`, `.py`, `.sh`, `.json` | ✅ |
| `dedupfiles.py` | Deduplizierung via MD5 Hash | ✅ |

### Extraktions-Strategie:
- **Sweetspot:** Hybrid-Ansatz aus **Semantic Chunking** + **Hierarchical Outline Extraction**
- **Ziel-Kompression:** 70-80% (NICHT 95%!)
- **Verboten:** V1-Extraktor (zu stark komprimiert → Datenverlust)
- **Encoding-Fix:** `sys.stdout.reconfigure(encoding='utf-8', errors='replace')` (Windows-Konsole)

## 10. Cloud & Hosting

| Provider | Zweck | Status |
|---|---|---|
| **DigitalOcean** | Droplet (Säule B) | $100 Credit (läuft ab!) |
| **Hetzner** | Langfristiges Ziel | Migration geplant |
| **Vast.ai / Lambda Labs** | Verworfen (zugunsten lokaler GPU + DO) | ❌ |
| **Lokal (RTX 4080)** | Phase 1: Lokale GPU | Phase 1 |

**DO-Droplet Empfehlung:** 2 vCPUs, 4 GB RAM, 80-160 GB SSD

---END BLOCK-TOOLS-STACK---
