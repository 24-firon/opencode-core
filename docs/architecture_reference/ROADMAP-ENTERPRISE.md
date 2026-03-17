# ZUKUNFTSPLÄNE: Evolution der Reactive Swarm Intelligence (RSI)

*Dieses Dokument definiert die Architektur, die Workflow-Mechanismen und die konkreten Implementierungsschritte für die Skalierungsstufen Tier 2 und Tier 1 des OpenCode Swarms.*

## Überblick der Tiers
- **Tier 3 (Base Swarm):** Lineares Event-Sourcing (SQLite), statische Agenten-Zuweisung, lokaler 7-Gates MCP-Server. *Status: In Finalisierung.*
- **Tier 2 (Advanced Router Swarm):** Asynchrone DAG-Engine, JIT Context Routing (Blueprint-System), Actor-basierte Inter-Agent-Kommunikation.
- **Tier 1 (Enterprise Autonomous System):** AST-basiertes Code-RAG, Hybrid-Architektur (TS + Python), NeMo Guardrails (Input), DRS-OSS (Output/Diff Scoring), Autonome Selbstheilung (Structural Learning).

---

## TIER 2: ADVANCED ROUTER SWARM

Das Ziel von Tier 2 ist es, den starren Loop des Base Swarms aufzubrechen. Agenten sollen parallel arbeiten, sich bei Blockaden absprechen und ihren Kontext dynamisch statt monolithisch erhalten.

### 1. Die DAG-Engine (Directed Acyclic Graph)
**Problem in Tier 3:** Tasks werden sequenziell (Phase 1, Task 1 -> Task 2) abgearbeitet.
**Lösung (Tier 2):** Der Orchestrator nutzt eine Graphen-Architektur.
*   **Funktionsweise:** Bei der Planung (`/swarm-plan`) generiert der Architect keinen Array aus Tasks, sondern eine JSON-basierte Knoten-Kanten-Struktur (Nodes & Edges).
*   **Ausführung:** Die Engine startet alle Knoten, die keine ungelösten Abhängigkeiten (Inbound Edges) haben, simultan (z.B. UI-Design und DB-Schema).
*   **Technologie-Optionen:** Eigene TypeScript State-Machine basierend auf einer Event-Queue in `.hive` (da LangGraph.js nachweislich Recursion-Bugs aufweist).

### 2. JIT Context Routing (Dynamic Blueprint System)
**Problem in Tier 3:** Jeder Agent bekommt das gesamte globale Regelwerk in den System-Prompt geladen (Token-Verschwendung, Halluzinations-Risiko).
**Lösung (Tier 2):** Ein Router "klebt" Prompts in Millisekunden zusammen.
*   **Struktur:**
    *   `.opencode/blueprints/` (JSON-Vorlagen: Welcher Agent wird wann mit welchen Tools gespawnt?)
    *   `.opencode/skills/` (Modulare Regelwerke, z.B. `ui-ux-pro-max.md`)
    *   `.opencode/agent_profiles/` (Rollenbeschreibungen, z.B. `coder_nextjs.md`)
*   **Funktionsweise:** Wenn Node 4 ("Login UI bauen") im DAG aktiv wird, liest der Router den Task-Typ, wählt das Blueprint `tier2_frontend_feature.json`, injiziert das Profil `coder_nextjs.md`, fügt den Skill `ui-ux-pro-max.md` hinzu und generiert einen Prompt < 2000 Tokens.

### 3. Inter-Agent Communication (Swarm Mail / Actor Model)
**Problem in Tier 3:** Fehlt einem Agenten Info, scheitert er (Gate schlägt zu) oder halluziniert.
**Lösung (Tier 2):** Agenten können sich gegenseitig beauftragen.
*   **Funktionsweise:** Einführung des Tools `swarmmail_send`.
*   **Beispiel:** Frontend-Agent braucht das API-Payload-Format. Er nutzt das Tool: `swarmmail_send({ to: "backend-agent", subject: "Need payload format for POST /login" })`.
*   **State:** Der DAG pausiert den Frontend-Node und weckt den Backend-Node auf. Sobald die Antwort vorliegt, wird der Frontend-Node reaktiviert.

---

## TIER 1: ENTERPRISE AUTONOMOUS SYSTEM

Das Ziel von Tier 1 ist maximale Sicherheit (Zero-Trust), Halluzinationsfreiheit im Code-Kontext und die Fähigkeit des Systems, sich selbst durch Code-Generierung zu verbessern.

### 1. Hybrid-Architektur (TypeScript Orchestrator + Python Worker)
**Problem in Tier 2:** Node.js ist nicht ideal für rechenintensive ML-Aufgaben oder komplexe Vektor-Embeddings unter Last.
**Lösung (Tier 1):** Trennung von Control Plane und Execution Plane.
*   **Orchestrator:** Die DAG-Engine und `.hive` (SQLite) bleiben in TypeScript (`node`). Das ist das superschnelle, I/O-basierte Gehirn.
*   **Worker/Services:** Machine-Learning-Tasks (Guardrails, Embeddings, AST-Parsing) werden als hochperformante Python-Microservices (z.B. FastAPI oder Quart) implementiert. Die Kommunikation erfolgt via HTTP/MCP.

### 2. AST-basiertes Code-RAG (Abstract Syntax Tree)
**Problem in Tier 2:** Textbasiertes Vektor-RAG (via `.hivemind`) findet zwar textlich ähnliche Fehler, versteht aber die Struktur von TypeScript (Klassen, Import-Pfade) nicht semantisch korrekt.
**Lösung (Tier 1):** Deterministische Code-Graphen.
*   **Tooling:** Einsatz von Tree-sitter (z.B. via der TS-Library `code-chopper`).
*   **Funktionsweise:** Bevor ein Coder Code ändert, wird der AST des Ziel-Repositories geparst. Der Agent bekommt nicht "Datei X", sondern den exakten Funktions-Graphen ("Funktion A ruft B auf, B importiert Interface C"). Das senkt Fehlerquoten bei komplexem Refactoring auf nahezu null.

### 3. Enterprise Governance (Guardrails & Risk Scoring)
**Problem in Tier 2:** Ein Coder-Agent kann durch Halluzination (oder bösartigen Prompt-Injection-Versuch) theoretisch kritische Routen löschen, solange der Linter (Gate 3) grün zeigt.
**Lösung (Tier 1):** Mehrschichtiger Security-Gateway.
*   **Input-Guard (NeMo Guardrails):** Ein Python-Microservice, der jeden Prompt *vor* dem LLM-Aufruf filtert.
*   **Output-Guard (DRS-OSS):** Nach der Code-Generierung, aber *vor* dem Git-Commit, läuft das "Diff Risk Scoring". Ein Llama-Modell bewertet den erzeugten Diff.
*   **Human-in-the-Loop (HitL):** Liegt der DRS-Score über Schwellenwert X (High Risk), pausiert der DAG und fordert eine menschliche CLI-Freigabe (`/approve`).

### 4. Autonome Selbstheilung (Structural Learning)
**Problem in Tier 2:** Der Orchestrator speichert Fehlerlösungen als Text ("Denke daran, XYZ zu tun") im Vector-Memory. Das LLM muss den Text beim nächsten Mal lesen und *verstehen*.
**Lösung (Tier 1):** Physische Constraints.
*   **Funktionsweise:** Wenn ein Coder-Agent 3x am selben Linter-Fehler scheitert und ihn schließlich löst, wird das nicht nur im `.hivemind` notiert. Der Architect-Agent schreibt autonom eine neue, harte Regel in die `biome.json` (oder erstellt ein Custom ESLint-Plugin).
*   **Resultat:** Das System verhindert den Fehler in Zukunft auf physikalischer Ebene (durch den Linter), bevor ein LLM überhaupt zum Nachdenken aufgerufen wird.
