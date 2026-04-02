# Cluster 03: Memory, Models & Utility Abstraction

## 0. ⚠️ COMMUNITY REALITY CHECKS (März 2026)

> **Ollama Utility Model Crash - 405 Method Not Allowed:**
> **Die Realität:** Bei langen Chats (Kompression) sendet A0 an Ollama. Bestimmte Modelle crashen fatal mit `OllamaException - 405 method not allowed` an `/api/generate`. Grund: LiteLLM Bug im Container (Version 1.79.3).
> **Workaround:** Im Container upgraden via `docker exec -it agent-zero bash` -> `pip install --upgrade litellm` (Muss nach jedem Image-Update wiederholt werden!).
>
> **Embedding-Model Wechsel zerstört Memory:**
> **Die Doku sagt:** Man kann das Embedding-Modell in Settings ändern, Vektoren werden re-indiziert.
> **Die Realität:** Wenn das neue Modell ein Colon `:` enthält (z.B. `mxbai-embed-large:latest`), crasht die FAISS-DB permanent mit `Invalid characters in key`.
> **Workaround:** 1. Modell-Tag ohne Colon pullen (`mxbai-embed-large`). 2. Memory-Ordner manuell löschen: `rm -rf /a0/usr/memory/`.
> 
> **Die Performance-Isolations Strategie:**
> **Die Realität:** Das Utility-Modell blockiert oft das Chat-Modell, wenn beide in derselben Ollama-Instanz laufen.
> **Workaround (Power User):** Zwei separate Ollama-Container in docker-compose. `ollama-chat` auf GPU (Port 11434), `ollama-utility` auf CPU (Port 11435).

## 1. Das Dual-Model Paradigma (Chat vs. Utility)
Agent Zero unterscheidet strikt zwischen Modellen für Konversation und für systeminterne Operationen. 

*   `chat_llm`: Für die User-Interaktion und das Tool-Calling (z.B. GPT-4o / Claude).
*   `utility_llm`: Für das Komprimieren des Context-Windows und das Extrahieren von Memories. 
    **Architektur-Warnung:** Sehr kleine Modelle (z.B. 4B) scheitern an der RAG-Extraktion! Für das Utility-Model sind fähige Modelle (z.B. Qwen2.5:3b oder 70B+ class Modelle) erforderlich, da sonst die Context-Extraktion unzuverlässig wird.

## 2. Memory System (Vector DB)
Das Memory ist in vier Vektoren aufgeteilt:
1.  **Storage:** Explizite Fakten (API-Keys, User-Names).
2.  **Fragments:** Automatisch bereinigte Konversationsfetzen.
3.  **Solutions:** Gelernte Lösungswege, die reaktiviert werden.
4.  **Metadata:** IDs und Timestamps.

**Context Window Compaction:**
Neue Nachrichten bleiben roh, ältere werden durch das `utility_llm` in thematische "Chunks" aggregiert. Dies verhindert OOM (Out of Memory) Crash im LLM-Kontext.

## 3. RAG-Bypass Hack (Power-User Strategie)
Statt den langsamen FAISS-Re-Index via UI zu triggern, legen Enterprise-User pre-prozessierte Markdown-Dateien direkt in `/a0/usr/knowledge/` ab.
**Der Trick:** Chunk-Strategie anwenden! Dateien mit Headings strukturieren, sodass jede Sektion maximal 500 Tokens groß ist. (Achtung: Niemals Dateinamen mit Doppelpunkt `:` verwenden!).

## 4. Lokale Modelle (Ollama Integration)
Host-Maschinen mit Ollama müssen den Port für den Docker-Container freigeben.
*   **Base URL:** Wenn Ollama auf dem Host läuft und A0 im Docker, MUSS die Base-URL `http://host.docker.internal:11434` sein (oder IP im Netzwerk).
*   **Provider Naming:** Ollama erwartet nackte Namen (`llama3.2`). OpenRouter erwartet Prefixe (`anthropic/claude-sonnet`). Falsches Naming führt zum "Invalid model ID" Error.