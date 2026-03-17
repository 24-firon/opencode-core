# Vorherige Recherche: Advanced Router Swarm (Raw Data)

## Fokus 1: Deterministische DAG-Engines & State Machines in TS
- Problem: LangGraph fällt aus (Bugs).
- Alternativen 2026:
  1. **XState v5 + statelyai/agent**: Bindet LLM-Loops an XState-Maschinen. Nutzt `actor.getPersistedState()` für SQLite Snapshot. `createActor` zum Aufwecken.
  2. **VoltAgent**: TypeScript Agent Framework. Besitzt native `suspend()` und `resume()` Methoden. Typisiert mit Zod-Schemas.
- LLM Anbindung: Beide nutzen Vercel AI SDK. `@ai-sdk/openai-compatible` verbiegt API Calls auf `http://127.0.0.1:11434/v1` (lokales vLLM oder Ollama). Keine OpenAI Lock-ins.

## Fokus 2: Inter-Agent Communication (Actor-Model)
- Problem: Node.js darf nicht blockieren (Timeouts). BullMQ nutzt Redis, was für das CLI ausgeschlossen ist.
- Best Practice SQLite Queue:
  - Einsatz von `better-sqlite3` im WAL-Mode.
  - "Agent Inbox" Tabelle in der `.hive` DB.
  - Atomares Dequeue Statement: `UPDATE agent_inbox SET status = 'processing', locked_at = CURRENT_TIMESTAMP WHERE id = (SELECT id FROM agent_inbox WHERE status = 'pending' ORDER BY rowid ASC LIMIT 1) RETURNING *;`
  - Polling-Interval: 50ms Worker-Loop.
  - Pattern: Agent A delegiert -> Pausiert (Stirbt/Suspend) -> Job in SQLite -> Agent B bearbeitet -> Orchestrator weckt Agent A mit ResumeData.

## Fokus 3: JIT Context Routing (Dynamic Prompt Assembly)
- Problem: Static RAG ist tot. Wir wollen Blueprints zusammenkleben ohne API Kosten.
- Best Practice Local Routing:
  - **Transformers.js (v3)**: Berechnet Embeddings in Node.js via ONNX Runtime (< 15ms). Modell `Xenova/all-MiniLM-L6-v2` (~90MB).
  - Cosine Similarity misst User-Intent gegen statische Blueprint-Utterances (Pre-Computed beim CLI Start).
- Dynamic Assembly:
  - **Handlebars**: Rendert den System Prompt zusammen mit MVI (Minimum Viable Information) wie gefilterten JSON-Schemas und AST-Snippets.
  - Beispiel: `Handlebars.compile(blueprint)({ ast_nodes, tools_allowed })` -> Ausgabeprompt < 2000 Tokens.
