# 01 – GROUND-ZERO PROJECT CONTEXT
<!-- Source: MANIFEST-ORCHESTRATOR.md, WORK_BUFFER.md, EXTRAKTIONS-SCRIPTS-GLOSSAR.txt -->
<!-- Erstellt: 2025-11-26 | Prompt-Version: ULTIMATE v3 | Status: Production-Ready -->

---START BLOCK-1-PROJEKT-IDENTITAET---

## 1. Projekt-Identität & Mission

- **Projekt:** Ground-Zero
- **Owner:** Firon (Solo-Operator / Solo-Founder)
- **Hintergrund:** KI-Agentur-Infrastruktur für einen Solo-Operator
- **Mission:** Automatisierung von AI-Agency-Workflows mit Fokus auf: Qualität, Geschwindigkeit, Informationserhalt, Zusammenfassung, und **Geld verdienen innerhalb von Tagen** (aktuell kritisch!)
- **Was es NICHT ist:** Ein generisches Startup. Dies ist eine Ein-Mann-Operation mit begrenztem Budget.
- **Vision:** Agency-in-a-Box – System ist als **verkaufbares Produkt** geplant.
- **Lizenz:** Public Domain
- **Architekt-Metapher:** Bildhauer + Koch + Wissenschaftler = Mise-en-place, forensische Präzision, Neugier/Skepsis.
- **Zielbild (1 Satz):** Ein sicherer, automatisierter Infra-Stack (n8n/Postgres) verarbeitet Agentur-Workflows im Hintergrund, während Claude/Cursor/GitHub als Agenten-Schicht darüber sitzen.

---END BLOCK-1-PROJEKT-IDENTITAET---

---START BLOCK-2-HARDWARE---

## 2. Hardware & OS-Umgebung

| Komponente | Wert | Verifiziert |
|---|---|---|
| GPU | RTX 4080 16GB Aorus, wassergekühlt | ✅ |
| RAM | 64 GB | ✅ |
| OS | Windows 11 Pro, Version 22H2, Build 22631 | ✅ |
| WSL2 | Ubuntu (WSL2) | ✅ |
| Shell | PowerShell 7 (Standard für Setup-Befehle) | ✅ |
| Python | Python 3.13 (impliziert durch Pfad `C313.exe`) | ✅ |
| Projekt-Root | `C:\Zero-Code` (Tester, Zeile 17, 97) | ✅ |
| Workspace-Pfad | `C:\Zero-Code` (exakter Pfad) | ✅ |

**Wichtige Einschränkung:**  
RTX 4080 für anderes reservieren – Claude Code darf GPU NICHT stressen.  
Llama 3 70B überschreitet 16 GB VRAM-Limit → Quantisierung zwingend bei lokalen LLMs.

---END BLOCK-2-HARDWARE---

---START BLOCK-3-ARCHITEKTUR-3-SUELEN---

## 3. Architektur: Die 3 Säulen (K-M-S)

```
┌────────────────────┐   ┌────────────────────┐   ┌────────────────────┐
│  SÄULE A           │   │  SÄULE B           │   │  SÄULE C           │
│  KOMMANDOZENTRALE  │   │  MASCHINENRAUM     │   │  SANCTUM           │
│                    │   │                    │   │                    │
│  Windows 11 Host   │   │  Ubuntu WSL2       │   │  Agent Zero        │
│  Cursor IDE        │   │  (später Droplet)  │   │  ISOLIERT          │
│  Claude Desktop    │   │  n8n               │   │                    │
│  MCP-Server        │   │  PostgreSQL        │   │  Ollama phi3:mini  │
│  Dateien:          │   │  E2B Sandbox       │   │  (lokal, kostenlos,│
│  - CLAUDE.md       │   │  Port 5678         │   │  KEIN Internet!)   │
│  - Projektdaten.md │   │  Port 5432         │   │                    │
│  - Userdaten.md    │   │  Port 8765         │   │  Use Cases:        │
│  KEINE Container!  │   │  Workflows (SSOT)  │   │  - PII-Masking     │
│  SSH / VPN         │   │  Code Exec         │   │  - Anonymisierung  │
│  Tailscale         │   │  Shared Database   │   │  - Lokale Verarbeit│
│                    │   │  Queue-System      │   │                    │
│                    │   │  EINZIGER Kontakt! │   │  Kommunikation NUR │
│                    │   │                    │   │  über PostgreSQL   │
│                    │   │                    │   │  Queue-Tabellen    │
└────────────────────┘   └────────────────────┘   └────────────────────┘
         │                         │                         │
         └─────────────────────────┴─────────────────────────┘
                      PostgreSQL Queue (SSOT)
                      agentzeroqueue / agentzeroresults
```

### Säulen-Regeln (NICHT VERHANDELBAR)
1. **Prompt-as-Code:** Alle Regeln leben in versionierten `.md`-Dateien
2. **Drei-Säulen-Isolation:** K-M-S sind physisch und konzeptionell getrennt
3. **Secrets niemals im Klartext:** Nur in OpenBao `.env`, NIE in Git/Logs/Chat
4. **Hybrid-Tool-Strategie:** MCP für simple Tasks, E2B für komplexe
5. **Agent Zero Isolation:** NUR asynchroner Datenaustausch via PostgreSQL-Queue

---END BLOCK-3-ARCHITEKTUR-3-SUELEN---

---START BLOCK-4-HYBRID-TOOL-REGEL---

## 4. Hybrid-Tool-Regel (Kernentscheidung)

```
FAUSTREGEL:
< 10 Tools, stateless, einfache Abfragen    → Klassisches MCP
> 20 Tools, Data Pipelines, State           → E2B Code Execution

WARUM?
- Klassisches MCP lädt alle Tool-Definitionen in Context → Token-Explosion
- E2B verlagert Orchestrierung in Sandbox → 98,7% Token-Reduktion!
  (150.000 → 2.000 Tokens)
```

---END BLOCK-4-HYBRID-TOOL-REGEL---

---START BLOCK-5-POSTGRESQL-SCHEMA---

## 5. PostgreSQL Schema (Geplant / Vorbereitet)

```sql
-- Queue für Agent Zero
CREATE TABLE agentzeroqueue (
  id SERIAL PRIMARY KEY,
  createdat TIMESTAMP DEFAULT NOW,
  tasktype VARCHAR(50), -- 'anonymizetext', 'summarizepdf'
  inputdata JSONB,
  status VARCHAR(20) DEFAULT 'pending',
  assignedto VARCHAR(50)
);

-- Ergebnisse von Agent Zero
CREATE TABLE agentzeroresults (
  id SERIAL PRIMARY KEY,
  queueid INTEGER REFERENCES agentzeroqueue(id),
  completedat TIMESTAMP DEFAULT NOW,
  outputdata JSONB,
  errormessage TEXT
);

-- Claude Memory Entries
CREATE TABLE claudememoryentries (
  id SERIAL PRIMARY KEY,
  sessionid VARCHAR(100),
  createdat TIMESTAMP DEFAULT NOW,
  entrytype VARCHAR(50),
  content JSONB
);
```

---END BLOCK-5-POSTGRESQL-SCHEMA---

---START BLOCK-6-PORT-STRATEGIE---

## 6. Port-Strategie

| Port | Service | Public | VPN | Docker-intern |
|---|---|---|---|---|
| 22 | SSH | Nur Admin-IP | JA | - |
| 443 | HTTPS | JA (Webhooks) | JA | - |
| 5678 | n8n | NEIN | JA | JA |
| 5432 | PostgreSQL | NEIN | JA (pgAdmin) | JA |
| 8200 | OpenBao | NEIN | JA | JA |
| 2375 | Docker API | NEIN | - | intern |
| 8888 | E2B/Jupyter | NEIN | - | intern |
| 8000 | Agent Zero | NEIN | - | intern |
| 9000 | MCP-Gateway | NEIN | - | intern |

**REGEL:** PostgreSQL/OpenBao sind NIEMALS öffentlich erreichbar!  
**FEHLER-HISTORY:** Port 8080 Konflikt → 8888 als Standard gewählt (Zeile 5240).

---END BLOCK-6-PORT-STRATEGIE---

---START BLOCK-7-AKTUELLE-PRIORITAETEN---

## 7. Aktuelle Prioritäten (Stand: Nov/Dez 2025)

1. **GELD VERDIENEN** – Absoluter Fokus, innerhalb von Tagen
2. Phase 1 heute: Docker MCP lokal lauffähig
3. Phase 2 morgen: Server auf DigitalOcean
4. Später: Skalierung, Compliance, Monitoring

### Was NICHT tun:
- Nicht Firons Hardware stressen (RTX 4080 für anderes reservieren)
- Nicht Over-Engineering betreiben
- Nicht an Infrastruktur basteln wenn Geld-Tasks warten
- Nicht Dateien zusammenfassen → **Informationserhalt!**

### Budget-Situation:
- DigitalOcean Credit: $100 (läuft ab!)
- Anthropic API: $90 Opus, $100 Sonnet verfügbar
- Status: Fast pleite – erklärt Fokus auf Cashflow vs. Infrastruktur

---END BLOCK-7-AKTUELLE-PRIORITAETEN---

---START BLOCK-8-WICHTIGE-VERZEICHNISSE---

## 8. Wichtige Verzeichnisse & Dateien

```
C-Zero-Code/                       # Projekt-Root
├── CLAUDE.md                      # Zentrale Agenten-Regeln
├── .claude/
│   ├── agents/                    # Agent-Definitionen
│   ├── messages/                  # Agent-Kommunikation
│   ├── tasks/                     # Task-Queue
│   ├── hooks/
│   │   └── hooksconfig.json       # Hook-Konfiguration
│   ├── skills/
│   │   └── registry.json          # Skill-Registry (SSOT)
│   └── agents/
│       └── registry.json          # Agent-Registry
├── docs/                          # 100% Dokumentation
│   ├── memory/
│   │   └── ERKENNTNISSE-KOMPLETT.md
│   ├── ground-zero-complete/
│   │   └── 01-Projekt-DNA-Ground-Zero.md
│   └── mcp/
│       └── E2B-MCP-Lessons-2025.md
├── specinfra/                     # YAML Specs
│   └── n8n-postgres-stack.yaml    # 488 Zeilen!
├── scripts/                       # Shell Scripts
│   ├── harden-server.sh           # 657 Zeilen
│   ├── pg-backup.sh               # 50 Zeilen (GPG-Encryption)
│   ├── pg-restore.sh              # 40 Zeilen
│   ├── ufw-setup.sh               # 30 Zeilen
│   └── start-n8n.sh               # 20 Zeilen
├── ansible/                       # Playbooks
├── phases/
│   └── phase1/
│       ├── 01-quickstart.md
│       └── M1-IMPLEMENTIERUNG.md
├── workspace/                     # Arbeitsbereich
├── inbox/                         # Neue Dateien
├── extracts/                      # Extrahierte Dokumente
└── sorted/                        # Deduplizierte Dateien

# Kern-Dateien (Bereits gelesen / hochprioritär):
docs/memory/ERKENNTNISSE-KOMPLETT.md
docs/ground-zero-complete/01-Projekt-DNA-Ground-Zero.md
docs/mcp/E2B-MCP-Lessons-2025.md
specinfra/n8n-postgres-stack.yaml  ← 488 Zeilen!
02-Master.md                       ← 649 Zeilen
01-Projektdaten.md                 ← 836 Zeilen
Userdaten.md                       ← 245 Zeilen
03-IMPLEMENTATION-ROADMAP.md       ← 328 Zeilen
MANIFEST-ORCHESTRATOR.md           ← vollständig gelesen
```

---END BLOCK-8-WICHTIGE-VERZEICHNISSE---
