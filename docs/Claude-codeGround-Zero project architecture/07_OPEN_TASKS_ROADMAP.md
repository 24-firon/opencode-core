# 07 – OPEN TASKS & ROADMAP (Ground-Zero)
<!-- Source: EXTRAKTIONS-SCRIPTS-GLOSSAR.txt, WORK_BUFFER.md, MANIFEST-ORCHESTRATOR.md -->
<!-- Task-Format: TASK-TYP Beschreibung | Prio | Status | Blocker | Quelle -->
<!-- VERIFIZIERT: ✅ = aus Quelldateien | Stand: 2025-11-27 ULTIMATE v3 -->

---START BLOCK-8-OPEN-TASKS---

## 1. KRITISCHE BLOCKER (🚨 SOFORT)

| Task | Typ | Prio | Status | Blocker | Quelle |
|---|---|---|---|---|---|
| Docker Desktop 4.5 installieren (Auto-Update AUS!) | TASK | 🚨 HOCH | OFFEN | Blocker für alles andere | Zeile 1850 |
| DigitalOcean Credit $100 – GPU Server mieten | TASK | 🚨 HOCH | OFFEN | Credit läuft ab in 24h! | Memory |
| Account Migration auf neuen DigitalOcean Account | TASK | 🚨 HOCH | OFFEN | Alter Account: $30 läuft heute ab | Zeile Phase 4 |

---

## 2. ÜBERFÄLLIGE TASKS (⚠️ Diese Woche)

| Task | Typ | Prio | Status | Blocker | Quelle |
|---|---|---|---|---|---|
| Agent Zero Installation | TASK | ⚠️ ÜBERFÄLLIG | BLOCKIERT | Docker 4.5 muss erst laufen | Zeile 6050 |
| Ollama installieren + Modelle pullen (phi3:mini, qwen2.5:7b) | TASK | ⚠️ HOCH | OFFEN | Docker | Memory |
| E2B Health-Check fixen | TASK | ⚠️ MITTEL | OFFEN | - | Memory |
| GitHub Token in MCP konfigurieren (kein Platzhalter!) | TASK | ⚠️ HOCH | OFFEN | - | Memory |

---

## 3. BUSINESS / CASHFLOW TASKS (💰 PRIO 1)

| Task | Typ | Prio | Status | Notizen |
|---|---|---|---|---|
| **Money-Maker Plan umsetzen** (Services verkaufen) | TASK | 💰 P0 | OFFEN | Prompting, Automation, Content |
| Lead-Gen-Skill implementieren (GDPR-konform) | TASK | 💰 HOCH | OFFEN | EU-only Filter, LinkedIn/Salesforce API |
| Content-Creator-Plan Skill | TASK | 💰 MITTEL | OFFEN | SEO-Content, Markdown-Output |
| Dashboard-Builder-Streamlit Skill | TASK | 💰 MITTEL | OFFEN | CSV → Streamlit App |
| n8n lokal installieren (Dev-Umgebung) | TASK | 💰 HOCH | OFFEN | Neben Server-Instanz |

---

## 4. INFRASTRUKTUR TASKS

| Task | Typ | Prio | Status | Notizen |
|---|---|---|---|---|
| n8n auf DigitalOcean deployen | TASK | HOCH | OFFEN | Phase 2 |
| PostgreSQL Queue-Schema erstellen (agentzeroqueue, agentzeroresults) | TASK | HOCH | OFFEN | Sanctum-Kommunikation |
| OpenBao Setup (Secrets-Management) | TASK | MITTEL | GEPLANT | Ersetzt Infisical |
| Infisical → OpenBao Migration | TASK | MITTEL | GEPLANT | SSPL-Lizenz Risiko |
| UFW-Regeln finalisieren (`ufw-setup.sh`) | TASK | HOCH | GEPLANT | - |
| Hetzner Migration | TASK | NIEDRIG | LANGFRISTIG | Alternatives zu DO |

---

## 5. ENTWICKLUNG / CODE TASKS

| Task | Typ | Prio | Status | Notizen |
|---|---|---|---|---|
| Skill-Registry Schema finalisieren (JSON-Validierung) | TASK | HOCH | OFFEN | TypeScript-Typen, kein `any` |
| Validierungs-Logik implementieren (Registry ↔ MCP-API) | TASK | HOCH | OFFEN | Schema-Mismatch Bug beheben |
| Extraktor V2 testen (Chunking) | TASK | MITTEL | OFFEN | Validierung nötig |
| Chatverlauf (250k Zeichen) mit Gemini extrahieren | TASK | MITTEL | OFFEN | Wegen Context-Window |
| Google File Search RAG API implementieren | TASK | MITTEL | GEPLANT | Kosteneffizienz |
| FIRON-PROFILE.md erstellen | TASK | NIEDRIG | OFFEN | User-Profil dokumentieren |

---

## 6. RECHERCHE TASKS

| Task | Typ | Prio | Frage / Ziel |
|---|---|---|---|
| Supabase lokal vs. Excel evaluieren | RECHERCHE | MITTEL | Professionellere Listenverwaltung (keine Dubletten) |
| Docker 4.5 Langzeit-Kompatibilität | RECHERCHE | MITTEL | Exit-Strategie falls Windows-Updates brechen |
| E2B Token-Ersparnis (98,7%) im Betrieb messen | RECHERCHE | MITTEL | Theorie vs. Praxis validieren |
| Plan B falls Docker 4.5 inkompatibel wird | RECHERCHE | MITTEL | Mock-Services für Parallelentwicklung |
| Welche Services konkret für Cash Rocket? | RECHERCHE | HOCH | Prompting, Automation, Content-Erstellung |
| MemOS Memory Middleware Integration | RECHERCHE | NIEDRIG | Context-Management |
| Wie GitHub Token sicher injizieren? | RECHERCHE | HOCH | Aktuell Hardcoding-Gefahr |

---

## 7. IMPLIZITE TASKS (aus Nebensätzen extrahiert)

| Task | Implizit aus | Priorität |
|---|---|---|
| Styleguide für das Projekt erstellen | "Anti-Patterns als Linter-Regeln" | MITTEL |
| Pre-Flight-Check für Docker/E2B/MCP | "Vor Agent Zero Installation" | HOCH |
| Automatisierten Test-Workflow Registry↔MCP aufbauen | "Mismatches vermeiden" | HOCH |
| Admin Board / visuelles Task-Board | "Admin Board zur Visualisierung gewünscht" | MITTEL |
| Review-Prozess für Task-Liste etablieren | "Roadmap lebt" | MITTEL |
| Linter für Metadaten-Marker (SED) | "Automatisierte Prüfung der Struktur" | NIEDRIG |
| Magic Button für E2B starten | "One-Click-Execution" | MITTEL |
| Workspace aufräumen (`workspace/firon` erstellen) | Phase 4 Nachwort | NIEDRIG |

---

## 8. PHASEN-ROADMAP

### Phase 1 – Lokal (Jetzt)
- ✅ MCP-Server lokal konfigurieren
- 🚨 Docker Desktop 4.5 installieren
- 🚨 Agent Zero lokale Installation
- 💰 Lead-Gen-Skill bauen
- 💰 Erste 10 Pilot-Tests in Sandbox

### Phase 2 – Server (Nächste Woche)
- DigitalOcean Droplet aufsetzen
- n8n + PostgreSQL auf Server deployen
- Backup-System aktivieren (pg-backup.sh)
- VPN (Tailscale) konfigurieren
- GitHub Actions Workflow für Claude Code

### Phase 3 – Skalierung (Später)
- Multi-Agent Orchestration (50 Agents)
- Prompt Caching (90% Token-Ersparnis)
- DSGVO-Compliance (Audit Trail, EU-Hosting)
- Monitoring + Alerts (Prometheus/Grafana)
- Agency-in-a-Box als verkaufbares Produkt paketieren

---

## 9. Offene Architektur-Fragen

1. Finales Tool für Task-Management? (Supabase vs. Excel vs. ClickUp)
2. Wie Infisical → OpenBao Migration ohne Downtime?
3. Wie 70B Modell auf 16GB VRAM performant betreiben? (Quantisierung)
4. Wie Queue-Latenz bei Agent Zero minimieren?
5. Wie RBAC (Role-Based Access Control) für Skills umsetzen?
6. Wie Agency-in-a-Box paketieren für Dritte?
7. Lizenzmodell für Verkauf?

---END BLOCK-8-OPEN-TASKS---
