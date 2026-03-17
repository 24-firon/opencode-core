# 🧠 System Brain Upload (Handover)

**Dieses Dokument ist die Single Source of Truth (SSoT) für jeden neuen LLM-Agenten, der die Arbeit an diesem Repository aufnimmt.** 
*Lies dieses Dokument vollständig, bevor du Code schreibst oder Architektur-Entscheidungen triffst.*

---

## 1. WAS ist dieses Repository? (Die "Reactive Swarm Intelligence")
Dieses Repository implementiert das Konzept der **Reactive Swarm Intelligence (RSI)** – eine kompromisslose "Power-User 2026 Architektur" für autonome, KI-gesteuerte Softwareentwicklung.

### Die Kern-Prinzipien:
*   **Asymmetrisches Model-Routing:** Verschiedene Modelle (z.B. Gemini Pro als Architect, Kimi als Coder, Claude als Reviewer) übernehmen spezifische Rollen, um blinde Flecken zu vermeiden.
*   **Event-Sourcing (`.hive/`):** Agenten schreiben nicht unstrukturiert in Markdown-Dateien herum, sondern emittieren Events in eine SQLite-Datenbank (`event-log.sqlite`). Ein Projektionsskript generiert daraus den lesbaren Plan (`.swarm/plan.md`).
*   **Vector Memory (`.hivemind/`):** Erfolgreiche Tasks werden via Ollama/vLLM (OpenAI-kompatibel) eingebettet und gespeichert, damit das System aus Fehlern lernt.
*   **7-Gates Execution Pipeline:** Jeder Code-Output läuft durch einen lokalen MCP-Server (Syntax, Biome Linter, TSC Build, Semgrep Security, Vitest). Nur 100% grüner Code wird akzeptiert.

---

## 2. WARUM die Aufteilung in Tiers (3, 2, 1)?
Um die Komplexität beherrschbar zu machen, wurde die Entwicklung in drei Evolutionsstufen (Tiers) unterteilt. **Tier 1 ist das Endziel, Tier 3 ist das Fundament.**

### 🟢 Tier 3 (Base Swarm) - *Aktueller Fokus*
*   Lineare und sequenzielle Task-Abarbeitung (Task 1 -> Task 2).
*   Statische Agenten-Zuweisung.
*   Workflow-Steuerung durch ein lokales Node.js Orchestrator-CLI.

### 🔵 Tier 2 (Advanced Router Swarm) - *Nächster Schritt*
*   **DAG-Engine:** Bricht die Linearität auf. Erlaubt parallele Task-Bearbeitung via Graphen.
*   **JIT Context Routing:** Agenten bekommen nicht mehr das "Global Brain", sondern dynamische Prompts, die exakt auf ihren Task zugeschnitten sind.
*   **Swarm Mail:** Agenten können sich gegenseitig Nachrichten schicken (Actor Model), wenn sie blockiert sind.

### 🟣 Tier 1 (Enterprise Autonomous System) - *Die Endvision*
*   **AST-Code-RAG:** Tree-sitter basiertes, deterministisches RAG für fehlerfreies Coden.
*   **Hybrid-Architektur:** Node.js (TS) Orchestrator steuert hochperformante Python/FastAPI-Worker für ML-Tasks.
*   **Enterprise Guardrails:** NeMo Guardrails (Input) + DRS-OSS (Diff Risk Scoring / Output) + Human-in-the-Loop bei High-Risk.
*   **Structural Learning:** Agenten schreiben eigene Linter-Regeln zur Selbstheilung.

---

## 3. WO stehen wir exakt? (Status quo des Tier 3 Orchestrator CLI)
Wir befinden uns in der Finalisierungsphase von **Tier 3 (Base Swarm)**. 
Wir haben das funktionierende Fundament gekapselt in den isolierten Produktordner:
`projects/tier3-base-swarm/`

**Aktueller Zustand in diesem Ordner:**
Das Orchestrator-CLI (`src/cli/index.ts`) ist gebaut, aber beim Kompilieren schlägt der TypeScript-Compiler mit exakt **zwei Fehlern** an:

1.  **Fehler 1 (Zeile 129 in `src/cli/index.ts`):** `Property 'tags' does not exist on type 'Task'.`
    *Ursache:* In der CLI-Logik wird auf ein Feld `tags` eines Task-Objekts zugegriffen, das im Interface (`src/hive/types.ts`) nicht existiert.
2.  **Fehler 2 (Zeile 247 in `src/cli/index.ts`):** `Type '{... size: string; ...}[]' is not assignable to type '{... size: "tiny" | "small" | "medium" | "large" | "epic"; ...}[]'`
    *Ursache:* Beim Parsen der LLM-Antwort wird das Attribut `size` als generischer `string` statt als strikter Union-Type aus dem Schema validiert.

---

## 4. WIE die Arbeit fortgesetzt werden muss (Deine Mission)
Wenn du als neuer Agent diese Datei liest, ist deine Aufgabe die **Fertigstellung von Tier 3**.

**Führe exakt diese Schritte aus:**
1.  **Scope setzen:** Wechsle in das Verzeichnis `projects/tier3-base-swarm/`.
2.  **TS-Errors fixen:** 
    *   Ergänze `tags?: string[]` in `src/hive/types.ts` (Interface `Task`).
    *   Passe das Typecasting in `src/cli/index.ts` Zeile 247 so an, dass `size` explizit als `TaskSize` Typ gecastet wird.
3.  **Build verifizieren:** Führe `npm install && npm run build` (oder `npx tsc`) in diesem Ordner aus. Es darf **ZERO Errors** geben.
4.  **CLI Testen:** Teste das CLI lokal mit `node dist/cli/index.js plan "Baue ein Login"`.
5.  **Dokumentation:** Erstelle die `README.md` im `tier3-base-swarm/` Verzeichnis. Erkläre, wie man die Hive-DB initialisiert und das CLI nutzt.
6.  **Freeze:** Wenn alles funktioniert, ist Tier 3 abgeschlossen. Melde dich beim User, damit die Entwicklung von Tier 2 im Root-Verzeichnis beginnen kann.
