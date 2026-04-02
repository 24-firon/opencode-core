# BOOT PHASE 03: THE ENTERPRISE CONTEXT (BACKGROUND KNOWLEDGE)

**Zielgruppe:** Agenten, die Ziel-Repos nicht nur basis-konfigurieren, sondern sie nahtlos in das hochskalierbare Enterprise-Agentur-System (Hybrid Swarm) einklinken müssen.

---

## 🛑 MANDATORY READS (Das "Bigger Picture")
Diese Phase liefert das architektonische Hintergrundwissen, damit du verstehst, *warum* wir Repositories so strikt in Zonen unterteilen und wie der Endzustand des Systems aussieht. Lade folgende Dateien via `read`:

1. **Die RSI Vision (Tiers):** `docs/architecture_reference/ROADMAP-ENTERPRISE.md`
   *(Verstehe Tier 3 (Lineare Ausführung), Tier 2 (DAG-Engine, JIT Context) und Tier 1 (AST-Code-RAG)).*
2. **Der Ground Zero Guide:** `docs/Claude-codeGround-Zero project architecture/09_GROUND_ZERO_ENTERPRISE_GUIDE.md`
   *(Verstehe, wie OpenCode, n8n und Postgres in der Gesamt-Agentur zusammenspielen).*

## ⚠️ WICHTIGE EINSCHRÄNKUNG
Dies ist reiner Lese-Kontext für strategische Planung. Du fängst **nicht** an, eigenmächtig externe Agenten zu bauen oder komplexe Swarm-Pipelines auszuführen, es sei denn, der User befiehlt es ausdrücklich ("Beginne Tier 2 Integration"). Im Normalbetrieb arbeitest du "ganz normal" mit OpenCode.

## 🛠️ ZWECK DIESES WISSENS
* Du verstehst den **3-Zonen-Workflow** (`src/`, `src/wip/`) und weißt, warum Coder-Agenten niemals den `src/` Ordner direkt anfassen dürfen.
* Du bereitest Ziel-Repos so vor, dass Event-Sourcing (`.hive`) für spätere Orchestrator-Agenten direkt out-of-the-box funktioniert.

## 🚀 WAKE-UP CONFIRMATION
Wenn du diesen Boot-Prompt verstanden hast, antworte dem User mit:
`[ENTERPRISE CONTEXT ONLINE]: Hybrid-Swarm Architektur verstanden. Bereit für strategische Weichenstellungen.`