# IMPLEMENTIERUNGSPLAN: Tier 3 (Base Swarm) Finalisierung

Dieses Dokument beschreibt die exakten Schritte, um das aktuelle System ("Tier 3 Base Swarm") in einen isolierten Produktordner zu kapseln und zu einem funktionsfähigen CLI-Produkt abzuschließen.

## Phase 1: Projekt-Kapselung (Isolation)
**Ziel:** Trennung des Tier 3 Produkts vom Root-Fundament.
1. [ ] Erstelle Verzeichnisstruktur `projects/tier3-base-swarm/`.
2. [ ] Kopiere alle Tier-3-relevanten Dateien aus dem Root in dieses Verzeichnis:
   - `src/`
   - `.opencode/`
   - `.mcp-server/`
   - `scripts/`
   - `package.json`, `tsconfig.json`, `biome.json`
3. [ ] Passe absolute Pfade in der Konfiguration innerhalb von `projects/tier3-base-swarm/` an (falls vorhanden), sodass sie relativ zum neuen Projekt-Root funktionieren.

## Phase 2: Das Orchestrator-CLI (Der Klebstoff)
**Ziel:** Die Markdown-Commands (`/swarm-plan`, `/swarm-execute`) in echten, ausführbaren Node.js Code übersetzen.
1. [ ] Erstelle `projects/tier3-base-swarm/src/cli/index.ts`.
2. [ ] Implementiere CLI-Routing (z.B. `node dist/cli/index.js plan "Baue ein Login"`).
3. [ ] **Der Plan-Befehl:**
   - Nimmt User-Input entgegen.
   - Ruft ein LLM (via fetch an Ollama/vLLM) mit dem Architect-System-Prompt auf.
   - Parst die LLM-Antwort und trägt die extrahierten Tasks über die `HiveAPI` (`src/hive/api.ts`) in die SQLite-Datenbank ein.
   - Ruft `generate-plan.js` auf, um `.swarm/plan.md` zu aktualisieren.
4. [ ] **Der Execute-Befehl:**
   - Liest den ersten anstehenden Task aus der `HiveAPI`.
   - Baut den System-Prompt für den Coder (MVI Injection aus `.opencode/context/`).
   - *Mock-Integration:* Verbindet den LLM-Output rudimentär mit dem bereits vorhandenen MCP-Server für den Quality-Gate-Lauf.

## Phase 3: Dokumentation & Freeze
**Ziel:** Ein fremder Entwickler kann das System ohne Kontext starten.
1. [ ] Erstelle `projects/tier3-base-swarm/README.md`.
   - Setup-Anleitung (`npm install`).
   - Kommando-Referenz.
   - Architektur-Überblick (Hive, MCP, Hivemind).
2. [ ] Finaler Build und Testlauf im isolierten Verzeichnis (`npm run build`).

---
*Sobald diese 3 Phasen abgeschlossen sind, ist Tier 3 ein geschlossenes Produkt. Das Root-Verzeichnis bleibt unangetastet und steht als saubere Basis für den Start von Tier 2 zur Verfügung.*
