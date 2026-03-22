# Ground-Zero – Konsolidierte Erinnerungen & Rohdaten

Dieses Archiv bündelt alle bisher explizit extrahierten Projekt-Erinnerungen, Präferenzen, Tools/Frameworks und Meta-Regeln aus den Ground‑Zero-Dokumenten (Stand: 29.11.2025). Jede Sektion verweist auf ihre Ursprungsquelle.

## 1. Kontext & Profil – User / Projekt

- **User / Rolle**  
  - Name (Projekt-intern): "Firon" – agiert als forensischer Systemarchitekt mit multidisziplinärem Hintergrund (Koch, Bildhauer, Wissenschaftler).  
  - Selbstverständnis: will verstanden werden, nicht nur Befehle ausführen lassen; wünscht Erklärungen mit W‑Fragen (Wer, Was, Warum, Wann, Wo, Wie).  
  - Frust: oberflächliche Antworten, fehlende Kausalität, verlorene Metadaten.  
  Quelle: WORK_BUFFER.md, Block‑1/5/9; MANIFEST-ORCHESTRATOR.md; DOCUMENTATION-AUDIT-REPORT-2025-11-22.md.[file:153][file:155][file:150]

- **Projekt**  
  - Name: „Ground‑Zero“ – KI-Agentur-Infrastruktur für einen Solo‑Operator.  
  - Ziel: 100 % verlustfreie, maschinen‑ und menschenlesbare Projektdokumentation; produktive KI‑Agentur mit Fokus auf Claude Code, MCP und E2B‑Sandbox.  
  Quelle: WORK_BUFFER.md Block‑1; MANIFEST-ORCHESTRATOR.md.[file:153][file:155]

- **Hardware / Umgebung**  
  - Host: Windows 11 Pro, Version 22H2, Build 22631; WSL2 Ubuntu.  
  - GPU: RTX 4080 16 GB, wassergekühlt.  
  - RAM: 64 GB.  
  - Tools: Claude Code Desktop, Docker Desktop, n8n, PostgreSQL, E2B Sandbox.  
  Quelle: WORK_BUFFER.md Block‑1/3; MANIFEST-ORCHESTRATOR.md.[file:153][file:155]

## 2. Präferenzen, Prinzipien, Anti‑Patterns

### 2.1 Positive Präferenzen

- Wissenschaftliche Struktur, Mise‑en‑place, klare Kausalität für jede Entscheidung ("Warum" Pflicht).  
- Exakte Bezeichnungen und Versionen beibehalten (z.B. "Docker Desktop 4.5" statt "Docker").  
- Vollständige, detaillierte Task‑Beschreibungen mit Status (Offen/Blockiert/Überfällig), Priorität (???‑System) und Blocker‑Angabe.  
- Lückenlose Fehlerprotokolle mit Fehlerbild, Analyse, Lösung, Lesson Learned.  
  Quelle: WORK_BUFFER.md Block‑1/4/5/8/9/10.[file:153]

### 2.2 Negative Präferenzen / Anti‑Patterns

- Keine Halluzinationen; keine Fakten außerhalb der Quelle ableiten.  
- Keine generischen Zusammenfassungen ohne neue Substanz.  
- Kein Vermischen von User‑Identität (Firon) und Projekt (Ground‑Zero).  
- Kein Verlust sekundärer Metadaten (Emojis, Marker, Überschriftenstruktur, Dateinamen).  
- Keine Tools oder Technologien ohne dokumentierten Grund / Kosten‑Nutzen‑Analyse.  
- Kein "rm -rf" oder "git clean -fd" – destruktive Befehle sind strikt verboten.  
  Quelle: WORK_BUFFER.md Block‑1/4/5/7/9; MANIFEST-ORCHESTRATOR.md.[file:153][file:155]

### 2.3 Meta-Regeln zur Kommunikation

- Datei‑Fokus-Regel: Analyse gilt immer der Zieldatei, nicht dem Prompt.  
- W‑Fragen‑Pflicht bei Erklärungen.  
- Kausalitäts‑Pflicht: Jede Entscheidung mit "Warum" dokumentieren.  
- Originalbegriffe und Versionsangaben exakt wiedergeben.  
- Kein eigenständiges Beschreiben des Prompts anstelle der Datei.  
  Quelle: WORK_BUFFER.md Block‑5.[file:153]

## 3. Tools, Frameworks, Stacks (müssen verwendet werden)

### 3.1 Core‑Stack

- **Claude Code** (Opus 4.5, Sonnet/Haiku je nach Kostenprofil):  
  - Coding‑Agent, Hooks, Skills, MCP‑Integration.  
  - Bugs: Auto‑Compaction fehlerhaft; CLAUDE.md Subdirectory‑Bug; kein PostCompact‑Hook.  
  Quelle: CLAUDE-CODE-OPUS-4.5_-ULTIMATE-RESEARCH-DOKUMENT.md.[file:146]

- **MCP (Model Context Protocol)**  
  - Offizielle und Community‑Server für: PostgreSQL, Memory (doobidoo, mcp-memory-keeper), Filesystem, GitHub, Playwright, etc.  
  - Ground‑Zero betreibt eigenen groundzero‑MCP‑Server mit ~11 Tools.  
  Quelle: MANIFEST-ORCHESTRATOR.md; MCP DOCKER E2B DEEP DIVE.md; MCP DOCKER E2B NEWS.md; CLAUDE-CODE-OPUS-4.5_-ULTIMATE-RESEARCH-DOKUMENT.md.[file:155][file:164][file:163][file:146]

- **E2B Sandbox**  
  - Externer Code‑Execution‑Service, angebunden über MCP‑ähnliche Schnittstellen.  
  - Gemessene Token‑Ersparnis: ~98.7 % gegenüber reiner LLM‑Tool‑Ausführung; priorisiert für deterministische Rechen‑ und Automatisierungsaufgaben.  
  Quelle: WORK_BUFFER.md Block‑3; MCP DOCKER E2B DEEP DIVE.md; MCP DOCKER E2B NEWS.md.[file:153][file:164][file:163]

- **Docker Desktop 4.5**  
  - Exakt diese Version; Autoupdate deaktiviert.  
  - Neuere Versionen (4.6+) erzeugen Chaos mit RTX‑4080‑Treibern und WSL2.  
  Quelle: WORK_BUFFER.md Block‑3; D1-Droplet-Analysieren-Testen-Einrichten.md.[file:153][file:148]

- **n8n + PostgreSQL**  
  - n8n: zentrale Orchestrierung von Workflows, inkl. Claude‑Node und MCP‑Triggern.  
  - PostgreSQL: Multi‑Tenant DB (RLS aktiviert), Queue‑Tabellen für Agent Zero und Memory‑System; dediziertes Schema für `agentzeroqueue`, `agentzeroresults`, `claudememoryentries`.  
  Quelle: MANIFEST-ORCHESTRATOR.md; D1-Droplet-Analysieren-Testen-Einrichten.md.[file:155][file:148]

### 3.2 Claude Code Plugins / Toolkits

- **doobidoomcp-memory-service**  
  - S‑Tier Memory‑System; Natural Triggers; SQLite‑vec; Cloudflare‑Sync; 65 % Token‑Reduktion im Schnitt.  
  - Bereitgestellt als MCP‑Server, kompatibel mit Claude Code CLI.  
  Quelle: CLAUDE-CODE-OPUS-4.5_-ULTIMATE-RESEARCH-DOKUMENT.md.[file:146]

- **mcp-memory-keeper, A‑MEM (nixlima/memmcp)**  
  - Alternative Memory‑Lösungen; A‑MEM mit NeurIPS‑Paper; Zettelkasten‑basiert.  
  Quelle: CLAUDE-CODE-OPUS-4.5_-ULTIMATE-RESEARCH-DOKUMENT.md.[file:146]

- **PostgreSQL MCP (offiziell Anthropic)**  
  - Enterprise‑Grade Memory / Data‑Backend; garantierte Kompatibilität.  
  Quelle: CLAUDE-CODE-OPUS-4.5_-ULTIMATE-RESEARCH-DOKUMENT.md.[file:146]

- **claudekit (Carl Rannaberg)**  
  - Toolkit mit ~20 Sub‑Agents, Auto‑Save/Checkpointing, Code‑Quality‑Hooks (Typecheck, Lint).  
  - Install via `npm install -g claudekit`.  
  Quelle: CLAUDE-CODE-OPUS-4.5_-ULTIMATE-RESEARCH-DOKUMENT.md.[file:146]

- **shinpr/claude-code-workflows**  
  - 11 spezialisierte Agents (Requirement‑Analyzer, PRD‑Creator, Technical‑Designer, Code‑Implementer, Test‑Engineer, Reviewer, Deployment‑Specialist u.a.).  
  - 6 Workflow‑Commands: `implement`, `task`, `plan`, `build`, `review`, `deploy`.  
  Quelle: CLAUDE-CODE-OPUS-4.5_-ULTIMATE-RESEARCH-DOKUMENT.md.[file:146]

- **ContextKit / SuperClaude / diverse Monitoring‑Plugins (Vibe‑Log, Claude-Code-Usage-Monitor)**  
  - Zusätzliche Sub‑Agenten, Statusline‑Integration, Usage‑Monitoring, Dashboards.  
  Quelle: CLAUDE-CODE-OPUS-4.5_-ULTIMATE-RESEARCH-DOKUMENT.md.[file:146]

### 3.3 Agent- & Orchestrierungs-Frameworks

- **LangGraph + LangSmith**  
  - StateGraph‑basierte Multi‑Agent‑Orchestrierung mit Postgres‑Checkpointing, HITL‑Patterns, Budget‑Guardrails.  
  - Wird im Projekt als Referenzarchitektur und möglicher Orchestrator eingesetzt.  
  Quelle: CLAUDE-CODE-OPUS-4.5_-ULTIMATE-RESEARCH-DOKUMENT.md.[file:146]

- **FastMCP Python‑Server**  
  - Schnellstart‑MCP‑Host für Tools, integriert in Enterprise Multi‑Agent‑Architekturen.  
  Quelle: CLAUDE-CODE-OPUS-4.5_-ULTIMATE-RESEARCH-DOKUMENT.md.[file:146]

## 4. Ground‑Zero Architektur‑Erinnerungen

### 4.1 Drei-Säulen-Architektur

- **Säule A – Kommandozentrale**  
  - Windows 11 Host, Cursor IDE / Claude Code Desktop.  
  - Enthält: `CLAUDE.md`, Projektdaten, Userdaten; keine Container; nur SSH / VPN (Tailscale).  
- **Säule B – Maschinenraum**  
  - Ubuntu WSL2 und später Droplets.  
  - Läuft: n8n, PostgreSQL, E2B‑Sandbox, groundzero‑MCP‑Server; Ports 5678, 5432, 8765 intern.  
- **Säule C – Sanctum**  
  - Agent Zero in isolierter Umgebung (lokal, Ollama‑Modelle, kein Internet), kommuniziert ausschließlich asynchron via PostgreSQL‑Queue.  
  Quelle: MANIFEST-ORCHESTRATOR.md.[file:155]

### 4.2 Fünf nicht-verhandelbare Architektur-Prinzipien

1. Prompt‑as‑Code: alle Regeln leben in versionierten `.md`‑Dateien.  
2. Drei‑Säulen‑Isolation: Kommandozentrale, Maschinenraum, Sanctum strikt getrennt.  
3. Secrets niemals im Klartext: ausschließlich OpenBao / `.env` außerhalb von Git.  
4. Hybrid‑Tool‑Strategie: MCP für einfache Tools, E2B für komplexe Execution.  
5. Agent Zero Isolation: nur asynchroner Datenaustausch via Queue, kein direkter Socket.  
Quelle: MANIFEST-ORCHESTRATOR.md; WORK_BUFFER.md Block‑2/3.[file:155][file:153]

### 4.3 Ports & Security

- Wichtige Ports:  
  - 22 (SSH) – nur Admin‑IP, via VPN;  
  - 443 (HTTPS) – öffentlich für Webhooks/API;  
  - 5678 (n8n) – nur intern / VPN / Docker‑Netzwerk;  
  - 5432 (PostgreSQL) – niemals öffentlich erreichbar; nur intern / VPN.  
- Docker‑Security: Non‑Root‑User, `cap_drop ALL`, `no-new-privileges: true`, Docker‑Socket nie in Container einbinden.  
  Quelle: MANIFEST-ORCHESTRATOR.md; D1-Droplet-Analysieren-Testen-Einrichten.md.[file:155][file:148]

## 5. Claude Code – Bugs, Limits, Best Practices

- Kritische Bugs (Stand Nov 2025):  
  - Auto‑Compaction mit Opus 4.5 fehlerhaft; massiver Kontextverlust; Workaround: Auto‑Compact deaktivieren, manuelle Logs/Memory.  
  - CLAUDE.md Subdirectory‑Bug: nur Parent‑CLAUDE.md wird automatisch geladen; Child‑Ordner‑Dateien nicht.  
  - Kein `PostCompact`‑Hook; nur `PreCompact` verfügbar (Workaround: eigene Session‑Logs via Hook).  
  Quelle: CLAUDE-CODE-OPUS-4.5_-ULTIMATE-RESEARCH-DOKUMENT.md.[file:146]

- Memory‑Systeme:  
  - doobidoo‑Memory‑Service: 65 % Token‑Reduktion, 96.7 % schnellerer Context‑Setup, 100 % Knowledge‑Retention in Tests.  
  - mcp-memory-keeper, A‑MEM als Alternativen.  
  Quelle: CLAUDE-CODE-OPUS-4.5_-ULTIMATE-RESEARCH-DOKUMENT.md.[file:146]

- Recommended Setup:  
  - Minimal (30 Min): Memory‑Server (doobidoo), je ein Workflow‑Plugin (shinpr), Toolkit (claudekit), Monitoring (Vibe‑Log), Safety (dagger/container‑use), Context‑Engineering (repomix).  
  - Production / Enterprise: FastMCP + LangGraph + LangSmith + Postgres/Redis/ChromaDB + Slack‑HITL + Monitoring‑Stack.  
  Quelle: CLAUDE-CODE-OPUS-4.5_-ULTIMATE-RESEARCH-DOKUMENT.md.[file:146]

## 6. Dokumentations- & Qualitätszustand

- Dokumentation:  
  - 94 `.md`‑Files gescannt, 63 im `docs`‑Verzeichnis; 0 kaputte interne Links.  
  - Infisical komplett durch OpenBao ersetzt; nur noch 3 historische Verweise.  
  - Status‑Emojis konsistent mit Projektstatus (Phase 1 Infrastruktur fertig, n8n‑Workflows, MCP‑Server, Agent Zero Service).  
  - Doku gilt als "READY FOR MERGE" und "production‑ready".  
  Quelle: DOCUMENTATION-AUDIT-REPORT-2025-11-22.md.[file:150]

- Extraktions‑/Filter‑System:  
  - WORK_BUFFER.md als zentrale Sammelstelle, MASTERDB.md als End‑Synthese.  
  - 4‑stufiger UNIVERSAL PROJECT‑DNA Filter (Fakten‑, Regel‑, Task‑, Synthese‑Filter).  
  Quelle: WORK_BUFFER.md.[file:153]

## 7. Offene Tasks & Blocker (Status zum Zeitpunkt der Quelle)

- Docker Desktop 4.5 installieren (Autoupdate aus, WSL2‑Integration prüfen) – **Blocker** für Agent Zero.  
- Agent Zero Installation & Integration mit MCP‑Server – Status: überfällig, blockiert durch Docker.  
- Supabase vs. Excel als Task‑Management‑Backend evaluieren.  
- Health‑Check für gesamte Infrastruktur (Docker, E2B, MCP, n8n, PostgreSQL) vor Agent‑Runs.  
- Linter / Skripte für Marker‑Konsistenz (---START/END---), Emoji‑Semantik und Metadaten‑Erhalt evaluieren.  
  Quelle: WORK_BUFFER.md Block‑3/6/7/8; MANIFEST-ORCHESTRATOR.md.[file:153][file:155]

---

**Hinweis zum Umfang:**  
Dieses Archiv enthält alle explizit extrahierten Erinnerungs‑Blöcke zum Ground‑Zero‑Projekt, die in WORK_BUFFER.md, MANIFEST-ORCHESTRATOR.md, CLAUDE-CODE-OPUS-4.5_-ULTIMATE-RESEARCH-DOKUMENT.md und DOCUMENTATION-AUDIT-REPORT-2025-11-22.md dokumentiert sind (Stand 29.11.2025). Weitere Detaildokumente (z.B. einzelne Runbooks, Phase‑Guides) sind in den Originaldateien enthalten, werden hier aber nicht erneut extrahiert, um Redundanz zu vermeiden.
