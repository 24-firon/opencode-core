# 11. OpenCode Reactive Swarm Intelligence (RSI) – Architecture Report

**Version:** 1.0 (Stand: Frühjahr 2026)  
**Autor:** Firon / AI System Architect  
**Zielgruppe:** Dev-Team, Operator, künftige Agenten-Frameworks  

---

## 1. Executive Summary: Philosophie & Paradigmenwechsel

Wir haben die Fesseln künftiger Kompatibilitätszwänge (wie Pydantic AI) gelöst. Statt ein künstliches, limitierendes Korsett zu bauen, nutzt diese Architektur das **OpenCode-Ökosystem (v1.2+) kompromisslos in seiner nativen Tiefe aus**. 

Dieses System etabliert einen **"Reactive Swarm Intelligence" (RSI)** Workflow. Es löst das klassische Problem autonomer Agenten ("Sie schreiben Code, zerstören dabei die Basis und hängen in Endlosschleifen") durch asymmetrisches Routing, dedizierte Zonen und harte physikalische Blockaden (Gates).

---

## 2. Die Asymmetrische Swarm-Architektur

Die klassische Herangehensweise ist "Ein gigantisches Modell für alles". Das ist teuer, langsam und fehleranfällig. Wir nutzen in der `opencode.json` die `agents`-Spezifikation für asymmetrisches Routing:

| Agent Name    | Modus (`mode`)      | Zugewiesenes Modell           | Kernaufgabe & Fähigkeiten                                                                                                             |
|:------------- |:------------------- |:----------------------------- |:------------------------------------------------------------------------------------------------------------------------------------- |
| **Architect** | `primary`           | `google/gemini-3.1-pro`       | Der "Kopf" der Operation. Plant, denkt und delegiert an Subagenten via nativem `delegate`-Tool. **Er schreibt selbst keinen Code.**   |
| **Coder**     | `subagent` (hidden) | `kimi/kimi-k2.5`              | Der "Muskel". Extrem schnell im Coden. Strenges Verbot: Darf nur in der Zone 2 (`src/wip/`) arbeiten.                                 |
| **Reviewer**  | `subagent` (hidden) | `anthropic/claude-sonnet-4-5` | Der "Polizist". Ein strukturiert denkendes Modell, das blinde Flecken des Coders findet. Hat exklusiven Zugriff auf das Merge-Skript. |
| **Tester**    | `subagent` (hidden) | `kimi/kimi-k2.5`              | Fokussiert rein auf Test-Coverage (>70%). Führt das MCP-Test-Gate aus.                                                                |
| **SME**       | `subagent` (hidden) | `google/gemini-2.5-flash`     | Der "Bibliothekar". Scennt das Repo rasend schnell ab und liefert Domänenwissen zurück an den Architect.                              |

**Vorteile:** 
Indem wir in der `opencode.json` jedem Agenten fest ein Modell und spezifische Systemprompts zuweisen (ohne dass sie sich im Terminal gegenseitig überschreiben), reduzieren wir API-Kosten drastisch und maximieren den Fokus des jeweiligen LLMs.

---

## 3. Der 3-Zonen Workflow: Physischer Schutz vor Agenten-Amok

Eines der größten Risiken bei Coding-Agenten ist die Zerstörung von funktionierendem Code (`src/`). Um das zu verhindern, erzwingen wir eine physische Zonentrennung:

1. **Zone 1 (Brain):** Die Planungsphase. Nur lesender Zugriff. Der Architect liest `.opencode/knowledge/BRAINUPLOAD.md` und delegiert.
2. **Zone 2 (WIP - Work in Progress):** Der Coder-Agent bekommt ausschließlich Schreibrechte in `src/wip/`. Hier tobt er sich aus.
3. **Zone 3 (Original):** Das Kern-Verzeichnis (`src/`). Der Coder darf es nicht berühren. 

**Der Übergang (The Lock):**
Code kommt *nur* aus der Zone 2 in die Zone 3, wenn der Reviewer-Agent das Skript `ops/scripts/merge_wip.sh` ausführt. Dieses Bash-Skript triggert zunächst alle QA-Gates. Nur wenn der Exit-Code `0` ist (alles grün), wird synchronisiert. Baut der Agent Mist, knallt das Skript ihm den Error-Trace an den Kopf.

---

## 4. Die 7-Gates QA-Pipeline (Das MCP-Meisterstück)

Ein Agenten-Framework ist nur so stark wie seine Validierung. Statt dem LLM zu sagen "Tippe `npm run lint` ins Terminal", abstrahieren wir diese NPM-Skripte über das **Model Context Protocol (MCP)** in saubere JSON-RPC-Tools.

Der `.mcp-server/src/index.ts` exportiert strukturierte Werkzeuge:

* `run_gate_lint` (Biome)
* `run_gate_build` (TypeScript compiler)
* `run_gate_security` (Semgrep)
* `run_gate_test` (Vitest)

**Warum MCP an dieser Stelle?**

1. **Determinismus:** Das LLM muss nicht raten, wie das CLI bedient wird. Es ruft ein Tool ohne Parameter auf und bekommt ein maschinenlesbares JSON (oder klaren formatierten Text) zurück.
2. **Abbruch-Logik:** Wenn `run_gate_build` fehlschlägt, versteht das LLM (der Reviewer) sofort: *Ich darf das Merge-Tool nicht aufrufen*.
3. **Zukunftssicherheit:** Solltest du OpenCode jemals verlassen, ist dieser MCP-Server ein offener Standard, den auch Cursor, Claude Desktop oder LangChain sofort adaptieren können.

---

## 5. Gelöste Probleme & Potenziale

### Gelöstes Problem: Tool-Calling Error Loops

Oft hängen Agenten in einer Schleife ("Syntax Error" -> "Sorry" -> "Syntax Error"). Durch die strikte Aufteilung (Der Coder schreibt, der Reviewer testet per MCP) durchbrechen wir diesen Loop. Der Reviewer hat die mentale Kapazität (Claude 4.5 Sonnet), um den Fehler des Kimi-Modells zu analysieren und den Coder mit neuen Instruktionen ("Fix line 45") neu zu triggern.

### Gelöstes Problem: Datei-Spam beim Booten

In der alten Config hast du `ignore_patterns` genutzt, was OpenCode nicht verstand. Die neue `opencode.json` nutzt das korrekte `watcher.ignore` und `search.exclude`. Dadurch analysiert der Agent keine `.hive`-Backups oder `.claude`-Ordner mehr und verschwendet keine Start-Token.

### Synergetisches Potenzial: Event Sourcing (`.hive`)

Du nutzt bereits SQLite (`event-log.sqlite`). Dieses System lässt sich durch die MCP-Tools künftig so ausbauen, dass der Architect *jede* Delegation und jedes Gate-Ergebnis in die `.hive` DB loggt. Damit baust du ein "Agentic Memory" auf, aus dem künftige Tasks lernen, welche Pattern in diesem Repo fehlschlagen und welche funktionieren.

---

## 6. Deployment / Nächste Schritte

1. Führe `npm install @modelcontextprotocol/sdk zod` im `.mcp-server/` Ordner aus.
2. Kompiliere den MCP-Server (`npm run mcpbuild`).
3. Starte OpenCode. Der Architect-Agent ist nun aktiv und hat das Zepter in der Hand.
