# 08 – SONSTIGE KONTEXTE, GLOBALE STREUFUNDE & KORREKTUREN
<!-- Source: EXTRAKTIONS-SCRIPTS-GLOSSAR.txt (Block 13), WORK_BUFFER.md (Block 13) -->
<!-- Alle Einträge, die in den Hauptblöcken nicht primär abgedeckt wurden -->
<!-- VERIFIZIERT: ✅ = aus Quelldateien | Stand: 2025-11-27 ULTIMATE v3 -->

---START BLOCK-13-STREUFUNDE---

## 1. Prompt-Versionierung & Meta-Infos

| Attribut | Wert |
|---|---|
| **Hauptprompt Version** | 3.0 ULTIMATE |
| **Entwicklungsdatum** | 2025-11-27 |
| **Lizenz** | Public Domain |
| **Basiert auf** | MASTERPROMPT CLARITYSTRUCTUREDELIVERY + CODE-TEXT-DELIVERY-GUIDE v11 |
| **Chatverlauf Größe** | 260k Zeichen |
| **Optimiert für** | Cursor IDE |
| **Status** | Production-Ready |
| **Architekturrolle** | Forensischer Projekt-Analyst (Hybrid: Systemarchitekt + Produkt-Designer + Prompt-Engineer + Chronist) |

**Versions-Historie:**
- V1 ULTIMATE: Basis-Version (405 Claims)
- V2 ULTIMATE: 535 Claims (+130 neue)
- V3 ULTIMATE: 535 Claims, 100% Context Injection, alle Fehler aus V1 behoben → PRODUCTION-READY

---

## 2. Agent Hierarchy & Modell-Strategie

```
Claude Opus 4.5   → Orchestrator (Planung, Architektur, User-Kommunikation)
Claude Sonnet 4.5 → Worker (Coding, Parallelisierung, separates Kontingent!)
Claude Haiku 4.5  → Sorter (kleine Tasks, Parsing, Tests)
Gemini 3.0        → Reasoning (aber: "Quatschkopf"! Vorsicht)
Perplexity Pro    → Live-Recherche
Ollama phi3:mini  → Lokales LLM (Sanctum, 0 Kosten, KEIN Internet)
```

**Token-Sparsamkeit-Regel:**  
Opus delegiert an Sonnet! Opus nur für Architektur + Kommunikation.

---

## 3. Claude Code spezifisch (Nov 2025 Features)

| Feature | Detail |
|---|---|
| **Claude Code Desktop App** | Neu seit Nov 24, 2025 |
| **Git Worktrees** | Claude Code nutzt Worktrees für Parallelisierung (mehrere Sessions) |
| **Electron-Wrapper** | App langsamer als CLI → CLI bevorzugen! |
| **Plan Mode** | Erst simulieren, dann handeln |
| **Extended Thinking** | Turbo-Modus bei Opus (nur bei komplexen Tasks) |
| **Subagenten via Task Tool** | `agents/` Verzeichnis |
| **INITIAL-PROMPT.md** | Referenz gegen Kontext-Drift (ablegen!) |

---

## 4. Business & Monetarisierung

| Aspekt | Details |
|---|---|
| **Vision** | Agency-in-a-Box (als verkaufbares Produkt) |
| **Cash Rocket** | Sofortige Einnahmen generieren – PRIO 0 |
| **Services für Verkauf** | Prompting, Automation, Content-Erstellung |
| **Agentur-Kernprodukt** | Stabile, erweiterbare Plattform mit wiederverwendbaren Automations-Bausteinen |
| **Budget-Situation** | Fast pleite → Existenzdruck erklärt Cashflow-Fokus |
| **Ziel-ROI** | 35% Produktivitätssteigerung Q1, 60% Q2, 100% Q3 |
| **Budget API** | $50–$150/Monat (Claude Pro + n8n/Notion) |

---

## 5. Korrekturen & Lessons Learned (Meta-Ebene)

| Korrektur | Von | Zu |
|---|---|---|
| Docker Version | Aktuellste nutzen | Strikt Docker Desktop **4.5** (4.6+ bricht WSL2/Nvidia) |
| Port E2B/Jupyter | 8080 | **8888** (Konflikt vermieden) |
| Extraktion | V1 (94% Kompression) | V2 (max 70%, Hybrid-Ansatz) |
| MCP-Konfiguration | `~/.claude/settings.json` | `~/.claude.json` (settings.json ignoriert!) |
| `.claudeignore` | Als eigenständige Feature | Existiert NICHT – nur `permissions.deny` Workaround |
| Agent Zero Prio | "Irgendwann" | ÜBERFÄLLIG 🚨 |
| Gemini Trust | Hoch | ⚠️ "Eigensinniger Quatschkopf" – kritisch validieren |

---

## 6. Existierende Skripte (nicht vergessen!)

| Skript | Zeilen | Zweck |
|---|---|---|
| `harden-server.sh` | 657 | SSH, UFW, Fail2ban, Kernel, Docker, AppArmor, auditd, AIDE, rkhunter |
| `pg-backup.sh` | 50 | PostgreSQL Backup mit GPG-Encryption |
| `pg-restore.sh` | 40 | PostgreSQL Restore (mit Bestätigungs-Prompt!) |
| `ufw-setup.sh` | 30 | Firewall Basis-Setup |
| `start-n8n.sh` | 20 | n8n Container Starter |
| `01-docker-desktop-setup.ps1` | - | Docker 4.5 Setup |
| `03-agent-zero-install.ps1` | - | Agent Zero Installation |
| `04-mcp-e2b-setup.ps1` | - | E2B + MCP Setup |
| `auditguard.py` | - | SafetyNet PreToolUse Hook (AKTIV) |
| `autonomousagent.py` | - | 14 Agenten (CCW-1..10, CCD-1..4) – EXISTIERT BEREITS! |
| `heartbeatmonitor.py` | - | Überwachung der Agenten |
| `extractv2.py` | - | Knowledge Extraktion V2 (Chunking) |
| `dedupfiles.py` | - | Deduplizierung via MD5 Hash |
| `fileinfo.py` | - | Technische Metadaten |

---

## 7. Ungelesene Prioritätsdateien (noch zu lesen!)

1. `docs/memory/ERKENNTNISSE-KOMPLETT.md`
2. `docs/ground-zero-complete/01-Projekt-DNA-Ground-Zero.md`
3. `docs/mcp/E2B-MCP-Lessons-2025.md`
4. `specinfra/n8n-postgres-stack.yaml` ← **488 Zeilen!**

---

## 8. MCP Token Economics (Research-Bestätigung)

| MCP Server | Tokens/Query | Kosten | Einsparung vs. Baseline |
|---|---|---|---|
| Baseline (kein Caching) | 110,100 | $0.13 | Referenz |
| Context7 (mit Cache) | 7,000 | - | ~93% |
| Ref.tools | 789 | $0.0856 | **99,28%** |
| E2B Sandbox vs. klassisch | 2,000 vs. 150,000 | - | **98,7%** |

Rechenbeispiel (Heavy User, 50 Queries/Tag):
- Ohne Optimierung: 135€/Monat
- Mit E2B/Caching: 45€/Monat
- **Einsparung: 90€/Monat**

---

## 9. Handoff-Protokoll für neue Agenten (Quick-Start)

Wenn ein neuer Agent startet, MUSS er:
1. Dieses Manifest vollständig lesen
2. Firon-Profil verstehen (Kommunikations-Präferenzen!)
3. Aktuelle Priorität checken: **GELD > Infrastruktur**
4. Relevante Dateien identifizieren
5. Bei Unklarheit: **FRAGEN** (niemals raten!)

**Checkliste vor Code-Änderungen:**
- [ ] Datei gelesen?
- [ ] Backup-Hinweis gegeben?
- [ ] Plan geteilt und genehmigt?
- [ ] SED (Emojis, Marker) erhalten?
- [ ] Keine Secrets im Code?

**Checkliste nach Task-Abschluss:**
- [ ] Ergebnis dokumentiert?
- [ ] Firon informiert?
- [ ] Nächste Schritte klar?
- [ ] Learnings festgehalten?

---END BLOCK-13-STREUFUNDE---
