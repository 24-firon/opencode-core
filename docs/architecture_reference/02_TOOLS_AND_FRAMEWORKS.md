# Benötigte und zu verwendende Tools und Frameworks (Raw Data)

## Orchestrierung & Agent Frameworks
- **VoltAgent**: Open Source TypeScript AI Agent Framework. Nutzt intern deklarative "Workflow Chains" (Graphen) und hat eine extrem starke, integrierte State-Machine. Hat native `suspend()` und `resume()` Methoden, die mit Zod-Schemas typisiert sind.
- **XState v5 + statelyai/agent**: Deterministische State-Machines in TypeScript. Trennt Logik strikt von Ausführung. Nutzt `actor.getPersistedState()` für JSON-Snapshots und `createActor(machine, { state: loadedState })` für Resume.
- **Vercel AI SDK (@ai-sdk/core)**: Abstraktionsschicht unter VoltAgent und XState.
- **LangGraph.js**: Explizit AUSGESCHLOSSEN (wegen inkonsistenter `recursionLimit` Bugs und State-Propagation Issues).

## LLM Provider & Modelle
- **Modelle**: Claude 4.6 (Backend), Gemini 3.0 Pro High (Frontend), Qwen2.5-Coder:7b, Llama-3.1-8B-Instruct.
- **Inference Engines**: vLLM (Empfohlen: Tag v0.16.0 mit `--gpu-memory-utilization`) und Ollama.
- **Vercel AI Provider**: `@ai-sdk/openai-compatible` oder `@ai-sdk/ollama`. Wird genutzt, um API Calls auf lokales lokales `http://127.0.0.1:11434/v1` umzubiegen (Kein Vendor-Lock-in).

## State, Memory & Message Queue
- **SQLite (.hive)**: Lokale Datenbank im WAL-Mode für State-Persistenz und Agent Inbox.
- **better-sqlite3**: Für direkten, blockierungsfreien SQLite Zugriff in Node.js (via Worker Threads / `setInterval` Polling für Queue).
- **workmatic**: Persistente Job-Queue für Node.js auf SQLite-Basis (falls reine Eigenentwicklung der Queue umgangen werden soll).
- **BullMQ / Redis / Postgres**: Explizit AUSGESCHLOSSEN für das lokale Enterprise Swarm CLI-Tool.

## Routing & Prompt Assembly
- **Transformers.js (v3)**: Lokale ONNX Runtime in Node.js für blitzschnelles (15ms) Embedden von User-Intents ohne API-Kosten (Modell: `Xenova/all-MiniLM-L6-v2`).
- **Handlebars (.hbs)**: Template-Engine zum Zusammenkleben des Just-In-Time Prompts (Blueprints). Erlaubt Logik wie `{{#each errors}}` vor dem LLM Call.
- **Tree-sitter / code-chopper**: Für TypeScript AST-Parsing und deterministisches JIT Code-Routing.

## Security & Governance
- **NeMo Guardrails**: Für Input/Output/Execution Rails (Microservices).
- **DRS-OSS**: LLM-Driven Diff Risk Scoring Tool.
