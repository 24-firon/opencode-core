# Ground-Zero – Enterprise-Grade Claude-Code & Agenten-Infrastruktur

Version: 0.1 (Living Document)  
Autor: Export aus Research-Session (März 2026)  
Status: Vollständiger Architektur- und Praxis-Guide für Build Mode

---

## 1. Zweck & Zielgruppe

Dieses Dokument richtet sich an dich als forensischen Systemarchitekten (Firon) im **Build Mode**.  
Es fasst alle bisher extrahierten Projektinformationen zusammen und erweitert sie um:

- **Ausführliche Erklärungen** zu jeder Komponente (Claude Code, MCP, E2B, n8n, Postgres, Secrets, Agent Zero).
- **Abhängigkeiten** und Reihenfolgen (Was muss VOR was stehen?).
- **Potenziale & Einsatzszenarien** für Agenten und Skills in einer Agentur-Infrastruktur.
- **Konkrete Anwendungsszenarien, Beispiele und Schritt-für-Schritt-Anleitungen** für den operativen Betrieb.

Alles ist so geschrieben, dass es **als Betriebssystem-Handbuch** für dich, weitere Agenten (Claude, Sonnet, Gemini, Perplexity) und zukünftige Teammitglieder dienen kann.

---

## 2. Ground-Zero in einem Satz

> Ein sicherer, automatisierter Infra-Stack (n8n + PostgreSQL + Secrets-Manager) verarbeitet deine Agentur-Workflows im Hintergrund, während Claude Desktop, Claude Code und Cursor als Agenten-Schicht darüber sitzen und dir bei Planung, Umsetzung, Refactoring und Dokumentation helfen.

Dieses Zielbild bestimmt jede technische Entscheidung im weiteren Verlauf.

---

## 3. Die 3 Säulen (K-M-S) – Architektur & Abhängigkeiten

### 3.1 Überblick

Du arbeitest mit einem **3-Säulen-Modell**:

1. **Säule A – Kommandozentrale (K)**  
   - Windows 11 Host  
   - Cursor IDE  
   - Claude Desktop & Claude Code  
   - MCP-Clients, Skills, lokale Dateien (CLAUDE.md, Projektdaten.md, Userdaten.md)  
   - KEINE Docker-Container direkt in der Kommandozentrale (Regel!)

2. **Säule B – Maschinenraum (M)**  
   - Ubuntu WSL2 oder später Linux-Droplet (DigitalOcean / Hetzner)  
   - Docker + Docker Compose  
   - n8n als Workflow-Orchestrator  
   - PostgreSQL als zentrale Datenbank (SSOT)  
   - E2B Sandbox für kosteneffiziente Code-Ausführung  
   - Alle dauerhaften Services (HTTP, Worker, Queues) laufen hier.

3. **Säule C – Sanctum (S)**  
   - Agent Zero mit lokalem LLM (Ollama phi3:mini / qwen2.5 7B)  
   - Kein direkter Internetzugriff  
   - Nutzung für PII-Masking, Anonymisierung und vertrauliche Verarbeitung  
   - Kommunikation ausschließlich über PostgreSQL-Queue Tabellen im Maschinenraum.

### 3.2 Abhängigkeiten (Reihenfolge)

1. **Grundlage:** Windows 11 + WSL2 lauffähig  
2. **Docker Desktop 4.5** auf Windows (Maschinenraum-Basis, Auto-Update AUS)  
3. **WSL2 Ubuntu** korrekt von Docker verwendet (Docker-Engine in WSL2)  
4. **n8n + PostgreSQL** via Docker Compose starten  
5. **Secrets-Management (Infisical → OpenBao)** einbinden  
6. **E2B Sandbox** im selben Docker-Netzwerk  
7. **Agent Zero** im Sanctum-Container, angebunden an PostgreSQL-Queue  
8. **Claude Desktop / Claude Code** von der Kommandozentrale per MCP auf diese Services zugreifen lassen.

Wenn ein Schritt blockiert (z.B. Docker-Installation), blockiert alles darüber.  
Daher gelten strenge **Blocker-First-Regeln**: Docker 4.5 → E2B → Agent Zero → Skills / Business-Cases.

---

## 4. Werkzeugkasten – Modelle, Tools & Frameworks

### 4.1 Modelle & Rollen (Anthropic + Lokal)

- **Claude Opus 4.5**  
  - Rolle: Orchestrator, Architekt, Kommunikationspartner.  
  - Einsatz: High-Level-Design, Sicherheitsreviews, kritische Entscheidungen.

- **Claude Sonnet 4.5**  
  - Rolle: Worker-Modell für Coding, Tests, Bulk-Tasks.  
  - Einsatz: Implementierung gemäß Spezifikationen, Refactorings, Unit-Tests.

- **Claude Haiku 4.5**  
  - Rolle: Sorter / Parser.  
  - Einsatz: Parsing, schnelle Auswertungen, Strukturierungen.

- **Gemini 3.0**  
  - Rolle: Externe Reasoning-Engine.  
  - Einsatz: Spezialfälle, in denen Google-Kontext (Drive, NotebookLM, File Search) wichtig ist.  
  - Hinweis: Wird von dir explizit als "eigensinniger Quatschkopf" geführt → Agent nur mit Vorsicht nutzen.

- **Perplexity Pro**  
  - Rolle: Live-Rechercherobot.  
  - Einsatz: Aktuelle Web-Infos, Live-Fakten.

- **Ollama phi3:mini / qwen2.5 7B**  
  - Rolle: Lokale LLMs für Agent Zero.  
  - Einsatz: PII-Masking, anonymisierte Verarbeitung, kostenfreie lokale Tasks.

### 4.2 Infrastruktur-Tools

- **Docker Desktop 4.5** (strikt)  
  - Host: Windows 11  
  - Engine: WSL2 Ubuntu  
  - Grund: Neuere Versionen (4.6+) brechen Nvidia-Treiber-Integration  
  - Auto-Update: AUS (Kernregel)

- **n8n**  
  - Rolle: Workflow-Orchestrator (z.B. Lead-Generierung, Content-Pipelines).  
  - Lauffähig in Docker-Stack mit Postgres.

- **PostgreSQL**  
  - Rolle: Alle persistenten Zustände (SSOT).  
  - Wird von n8n, Agent Zero und weiteren Services genutzt.

- **OpenBao (Ziel)** / **Infisical (Ist)**  
  - Rolle: Secrets-Management.  
  - Aktueller Zustand: Infisical (SSPL), Ziel: OpenBao (MPL 2.0, Linux Foundation).

- **Caddy / Traefik**  
  - Rolle: Reverse Proxy + TLS + Routing.

### 4.3 Dev- und Research-Werkzeuge

- **Cursor IDE** für Code, Workspace-Kontext, schnelle Iterationen.  
- **Claude Desktop** als MPC/MCP-Client und Wissensnavigator.  
- **Claude Code** als Developer-Agent im Repository (GitHub-Integration).  
- **NotebookLM**, **Google File Search API**, **Obsidian** und **Perplexity Pro** für Knowledge-Workflows.

---

## 5. Claude Code – Enterprise-Konfiguration

### 5.1 Dateistruktur für Settings & Policies

Wichtige Dateien, die Claude Code steuern:

- `~/.claude/settings.json` – globale Defaults (Sandbox, Permissions, Hooks).  
- `~/projekt/.claude/settings.json` – projektlokale Overrides.  
- `~/projekt/CLAUDE.md` – Projekt-spezifische Regeln (Architektur, Style, Security).  
- `~/projekt/apps/web/CLAUDE.md` – Service-spezifische Regeln.  
- `~/projekt/.mcp.json` – MCP-Server-Definitionen für das Projekt.  
- `~/.claude.json` – Benutzerweite MCP-Server und IDE-Integration.

### 5.2 Context-Steuerung ohne `.claudeignore`

Offiziell existiert **keine** `.claudeignore`-Datei.  
Die Realität:

- Du führst eine eigene `.claudesignore` ein (nur für dein Preprocessing).  
- Ein Python- oder Node-Skript liest diese Datei und generiert daraus:
  - `permissions.deny`-Einträge in `.claude/settings.json`  
  - Sandbox-`filesystem.denyRead/denyWrite`-Regeln.

Beispiel für ein teilweises Mapping:

```gitignore
# .claudesignore (dein Format)
**/node_modules/
**/.next/
**/dist/
**/.env
**/.env.*
**/secrets/**
**/config/*.key
**/config/*.pem
```

Erzeugte `settings.json`-Fragmente:

```json
{
  "permissions": {
    "deny": [
      "Read(/**/node_modules/**)",
      "Read(/**/.next/**)",
      "Read(/**/dist/**)",
      "Read(/**/.env)",
      "Read(/**/.env.*)",
      "Read(/**/secrets/**)",
      "Read(/**/config/*.key)",
      "Read(/**/config/*.pem)",
      "Edit(/**/.env)",
      "Edit(/**/.env.*)",
      "Edit(/**/secrets/**)"
    ]
  }
}
```

**Ziel:** Die Engine selbst kennt keine `.claudeignore`, aber dein eigenes Tooling erzwingt die effektive Ignore-Logik.

### 5.3 CLAUDE.md – Regeln, die nie vergessen werden dürfen

**Root-CLAUDE.md** sollte:

- Das Monorepo grob strukturieren (Apps, Packages, Infra).  
- Auf service-spezifische CLAUDE.md-Dateien verweisen.  
- 5–10 **harte** Regeln definieren:
  - z.B. „Keine .env lesen oder verändern“, „Nie Raw-SQL, immer ORM/Prisma“.

**Service-CLAUDE.md** (z.B. `apps/web/CLAUDE.md`) enthält:

- Tech-Stack (Next.js, Tailwind, React Query…).  
- Code-Style (z.B. "Type statt Interface", Komponenten-Limits).  
- Routing-/Auth-Regeln (kein Bypass von Middleware).  
- Testing-Vorgaben (wo Tests liegen, wie benannt werden, welche Tools).

**Anwendungsbeispiel:**

Wenn du in `apps/web` arbeitest und Claude fragst: *„Füge einen neuen Endpunkt hinzu“*, dann:

1. Liest Claude globales `CLAUDE.md`.  
2. Liest `apps/web/CLAUDE.md`.  
3. Liest nur noch Dateien in `apps/web/**` und relevanten `packages/**`, weil du das sowohl in CLAUDE.md als auch in `permissions` so definierst.  
4. Berücksichtigt deine Style-Regeln (kein neues State-Management, Tests müssen mitgezogen werden etc.).

### 5.4 Permissions & Sandbox – Ask vs. Auto-Execute

Du steuerst **zwei Schichten**:

1. **Permissions:** Feinsteuerung, welche Tools/Kommandos wie behandelt werden:
   - `deny`: HARTE Blockade (z.B. `Bash(rm -rf*)`).  
   - `ask`: Explizite Rückfrage (z.B. `Bash(git push *)`).  
   - `allow`: Auto-Approve (z.B. `Bash(npm test*)`).

2. **Sandbox:** Technische Grenze:
   - Was darf der Prozess lesen/schreiben?  
   - Welche Domains dürfen im Netzwerk erreicht werden?  
   - Dürfen Unsandboxed Commands laufen?

Konfiguration (vereinfacht):

```json
{
  "permissions": {
    "defaultMode": "default",
    "deny": [
      "Bash(rm -rf*)",
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)"
    ],
    "ask": [
      "Bash(git push *)",
      "Bash(kubectl *)"
    ],
    "allow": [
      "Bash(git status*)",
      "Bash(npm run lint*)"
    ]
  },
  "sandbox": {
    "enabled": true,
    "allowUnsandboxedCommands": false,
    "filesystem": {
      "denyRead": ["~/.ssh/**", "~/.aws/credentials"],
      "allowRead": ["./"],
      "allowWrite": ["./", "/tmp/build"]
    },
    "network": {
      "allowedDomains": ["api.anthropic.com"],
      "allowLocalBinding": false
    }
  }
}
```

**Wichtige Erkenntnis:** Mehrere GitHub-Issues zeigen, dass `deny` nicht immer zuverlässig war. Daher:  
**Sandbox-Regeln immer als härtere, zweite Verteidigungslinie konfigurieren.**

---

## 6. MCP-Plumbing – Datenbanken, GitHub & Co.

### 6.1 MCP-Konfigurationsorte – richtig & falsch

**Richtig:**

- `~/.claude.json` → User-scoped `mcpServers`.  
- `.mcp.json` im Repo-Root → projekt-spezifische MCP-Server.  
- `managed-mcp.json` unter Systempfaden → Enterprise-Policies.

**Falsch:**

- `~/.claude/settings.json` für MCP-Server – wird ignoriert.

### 6.2 Konkrete Beispiele

**PostgreSQL-MCP-Server für lokale DB:**

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

**GitHub-MCP-Server für Issues/PRs:**

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

### 6.3 Docker-Compose: Postgres + MCP-Server + Agent Zero

Minimaler Ausschnitt (vereinfacht):

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

  agent-zero-main:
    image: your-org/agent-zero:latest
    environment:
      - DATABASE_URL=postgresql://app_user:app_password@postgres:5432/app_db
    depends_on:
      - postgres
    ports:
      - "8000:8000"
```

So kann Claude Desktop via MCP-Server Postgres abfragen, während Agent Zero dieselbe DB für Queue-Tabellen nutzt.

---

## 7. Security & Docker-Sandboxing

### 7.1 DevContainer für Claude Code

Die Idee: **Claude Code läuft im Container**, nicht direkt auf dem Windows-Host.

- Workspace wird als Volume nach `/workspaces/project` gemountet.  
- Home-Verzeichnis im Container (z.B. `/home/vscode`) enthält `.claude`-Konfiguration.  
- Host-Secrets (`~/.ssh`, `~/.aws`) sind nicht sichtbar.

**Vorteile:**

- Keine versehentlichen Zugriffe auf Host-Dateien.  
- Reproduzierbare Umgebung (Dockerfile + devcontainer.json).  
- Einfache Weitergabe an andere Maschinen.

### 7.2 Standalone Claude-Sandbox-Container

Für Situationen ohne VS Code kannst du einen Alias nutzen:

```bash
alias claude-sandbox='docker run -it --rm   --name claude-code-sandbox   -v claude-code-config:/home/vscode/.claude   -v claude-code-state:/home/vscode/.local/share/claude   -v "$(pwd):/workspaces/project"   -w /workspaces/project   claude-code-sandbox-image'
```

**Anwendungsbeispiel:**

1. `cd C-Zero-Code`  
2. `claude-sandbox`  
3. Innerhalb des Containers: `claude-code`-CLI starten und nur dieses Projekt bearbeiten.

### 7.3 Docker Hardening Checks

- Container laufen NICHT als root (User `node`, `postgres`).  
- `cap_drop: ALL` plus selektives `cap_add` nur wenn absolut nötig.  
- `no-new-privileges: true` in Compose aktivieren.  
- Docker-Socket wird niemals in Container gemountet.  
- Secrets ausschließlich per Docker-Secrets / OpenBao, nicht im Image.

---

## 8. Agent Zero & Multi-Agent-Orchestration

### 8.1 Rolle von Agent Zero

Agent Zero ist dein **handlungsfähiger Kern-Agent**:

- Läuft im Sanctum (Säule C) auf lokalem LLM.  
- Hat Linux-Superkräfte (Bash, Python, Docker, n8n-APIs).  
- Hat Zugriff auf deine eigenen Skills (PDF-Parser, GitHub-Automation, File-Organizer…).  
- Kommuniziert ausschließlich über PostgreSQL-Queue-Tabellen mit dem Rest der Welt.

### 8.2 Queue-Schema (Vollständig)

```sql
CREATE TABLE agentzeroqueue (
  id SERIAL PRIMARY KEY,
  createdat TIMESTAMP DEFAULT NOW(),
  tasktype VARCHAR(50),
  inputdata JSONB,
  status VARCHAR(20) DEFAULT 'pending',
  assignedto VARCHAR(50)
);

CREATE TABLE agentzeroresults (
  id SERIAL PRIMARY KEY,
  queueid INTEGER REFERENCES agentzeroqueue(id),
  completedat TIMESTAMP DEFAULT NOW(),
  outputdata JSONB,
  errormessage TEXT
);
```

### 8.3 Konkrete Anwendungsszenarien

1. **PDF-Analyse für Kundenprojekte**
   - n8n-Workflow legt Task in `agentzeroqueue` an (`tasktype = 'analyze_pdf'`, `inputdata` enthält Pfad/URL).  
   - Agent Zero zieht den Task, nutzt den PDF-Parser-Skill, schreibt Ergebnis in `agentzeroresults`.  
   - n8n liest `agentzeroresults` und versendet Ergebnis per E-Mail / schreibt in Notion / Obsidian.

2. **GitHub-Automation**
   - Supabase / ClickUp Task „Refactor Module X“ löst n8n-Event aus.  
   - n8n erzeugt Queue-Eintrag für Agent Zero: Code-Refactor + Tests.  
   - Agent Zero nutzt GitHub-Skill (MCP), erstellt Branch, PR, läuft Tests.  
   - Ergebnis wird im Result-Record verlinkt.

3. **File-Organisation & Anonymisierung**
   - Kunde legt Dokumente in `inbox/`.  
   - Agent Zero-Task: „Anonymisiere alle Dokumente in `inbox/` und verschiebe nach `sorted/`“.  
   - Lokale LLMs + Regex + NLP entfernen PII, schreiben Logs.

---

## 9. Fehlerkultur & Debugging-Playbook

Du führst ein strukturiertes Fehler-Archiv.  

### 9.1 Standard-Template für Fehler-Protokolle

```markdown
### FEHLER #X: [Kurzbeschreibung]

- Fehlerbild: Was ist konkret passiert?
- Analyse: Wie wurde die technische Ursache gefunden?
- Lösung: Welche Schritte wurden durchgeführt?
- Lesson Learned: Aufgaben, um diesen Fehler künftig zu vermeiden.
```

### 9.2 Typische Fehler & Lessons Learned

- **Port 8080 Konflikt → 8888 Standard**  
- **Docker 4.6 Chaos → 4.5 einfrieren, Auto-Update aus**  
- **Encoding-Probleme → UTF-8 Fix am Anfang jedes Python-Skripts**  
- **Unix-Befehle auf Windows → `sys.platform` Check + Powershell/Python-Alternativen**  
- **Extraktor V1 Datenverlust → V2 Hybrid-Ansatz mit 70–80% Kompression**

---

## 10. Schritt-für-Schritt-Playbooks

### 10.1 Playbook: Phase 1 – MCP & E2B lokal (ohne Server)

**Ziel:** Lokales MCP-Setup mit E2B-Sandbox und Claude Desktop, komplett ohne Remote-Server.

1. **Umgebung vorbereiten (Windows + WSL2)**  
   - Stelle sicher, dass Windows 11 + WSL2 Ubuntu 24.04 laufen.  
   - Installiere Python 3.11/3.13, Git.

2. **Repo klonen**  
   - `git clone <Ground-Zero-Repo>`  
   - `cd claude-agents` (oder entsprechendes Repo).

3. **Python venv + Dependencies**  
   - `python -m venv .venv`  
   - `.venv/Scripts/activate` (Windows) / `source .venv/bin/activate` (Linux)  
   - `pip install mcp e2b` (genaue Versionen laut Doku).

4. **`.env` erstellen**  
   - `E2B_API_KEY`  
   - Weitere Keys (nur lokal, `.gitignore` schützt vor Commit).

5. **MCP-Server `main.py` starten**  
   - MCP-SDK korrekt nutzen, Tools `executee2bcode`, `httprequest` implementieren.  
   - Timeout-Handling (600s Default) beachten.

6. **Claude Desktop verbinden**  
   - MCP-Server in `~/.claude.json` oder `.mcp.json` eintragen.  
   - In Claude Desktop im Tools-Panel prüfen, ob der Server erscheint und Tools erreichbar sind.

7. **Verify-Skript ausführen**  
   - `verify-phase1.sh`: Prüft Python, venv, Packages, `.env`, API-Key-Format, `.gitignore`.

### 10.2 Playbook: Phase 2 – n8n/Postgres-Stack auf Server

1. **Droplet erstellen (DigitalOcean)**  
   - 2 vCPUs, 4 GB RAM, 80–160 GB SSD.  
   - Nur SSH-Key-basierter Zugriff.

2. **Basis-Hardening**  
   - `harden-server.sh` ausführen: SSH, UFW, Fail2ban, Audit-Tools.  
   - Firewall: Nur 22, 443 offen, n8n/DB nur via VPN.

3. **Docker + Docker Compose installieren**  
   - Offizielles Docker-Installscript oder Linux-Pakete verwenden.  
   - Auf Version achten (kompatibel mit 4.5 Schema).

4. **`n8n-postgres-stack.yaml` deployen**  
   - `docker compose -f n8n-postgres-stack.yaml up -d`.  
   - Healthchecks abwarten (`pg_isready`, n8n `/healthz`).

5. **Secrets via Infisical/OpenBao injizieren**  
   - `POSTGRES_USER`, `POSTGRES_PASSWORD`, `N8N_ENCRYPTION_KEY` etc.  
   - Niemals als Klartext im Repo.

6. **VPN (Tailscale/Headscale)**  
   - Tailscale-Client auf Droplet installieren.  
   - Nur Tailscale-IP darf n8n (Port 5678) und Postgres (Port 5432) erreichen.

### 10.3 Playbook: Phase 3 – Skills produktiv machen

1. **Skill-Blueprint schreiben** (Markdown)  
   - Name, Purpose, Input/Output, Abhängigkeiten, Permissions, Beispiele.

2. **Skill-Code implementieren** (Python/Node)  
   - Exakte CLI-Signatur definieren.  
   - Logging, Fehlermeldungen, Rückgabeformat (JSON).

3. **Unit-Tests schreiben (>=80% Coverage)**  
   - Pytest / Jest.  
   - Tests in CI integrieren.

4. **Skill-Registry aktualisieren**  
   - Eintrag in `.claude/skills/registry.json`.  
   - Version erhöhen, Status setzen (`planned` → `active`).

5. **MCP-/Skill-Integration testen**  
   - Claude Desktop/Code: Skill explizit aufrufen lassen.  
   - Logs und Ergebnisse prüfen.

---

## 11. Potenziale & nächste Schritte (Build Mode)

### 11.1 Kurzfristige Potenziale

- **Lead-Gen-Bot** mit GDPR-Filter – direkter Cashflow-Treiber.  
- **Content-Creator-Plan** – 30-Tage Content-Kalender für Kunden.  
- **Dashboard-Builder** – schnelle Visualisierung von Business-Daten.  
- **Error-Archiv & Runbooks** – wiederkehrende Probleme drastisch reduzieren.

### 11.2 Mittelfristige Potenziale

- **Agency-in-a-Box** als Produkt für andere Agenturen.  
- **Multi-Client-Isolation** via Projekte/Workspaces + RBAC.  
- **Graph-RAG** über Obsidian + Vektor-DB.

### 11.3 Langfristige Potenziale

- Vollautonome Pipelines (mit Guardrails):  
  - Bugfix nach Lint-Error → Auto-Merge.  
  - Test-Repair → Auto-Merge.  
  - Security-/API-Änderungen → IMMER Human Review.

---

_Ende der Version 0.1 – dieses Dokument ist als Living Document gedacht und kann von Claude Code, Claude Desktop und Agent Zero gemeinsam weiterentwickelt werden._
