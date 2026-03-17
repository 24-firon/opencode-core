# Architecture Decision Log (ADL): The Control Node Evolution

## Kontext: Warum existiert dieses Dokument?
Dieses Repository (`opencode-core`) dient als **Control Node** (Master-Orchestrator). Sein primärer Zweck ist nicht das Entwickeln von Feature-Code, sondern das *Management, die Analyse und die Bestückung fremder Repositories* mit maßgeschneiderten OpenCode-Umgebungen (Payloads).

Dieses Decision Log übersetzt die theoretischen Skalierungsstufen (Tier 2 & Tier 1) aus der ursprünglichen RSI-Roadmap (Reactive Swarm Intelligence) in konkrete, operative Konzepte für diesen spezifischen "Repo Management" Use Case.

---

## 1. Die Entscheidung gegen einen direkten Tier 2/1 Start
**Beschluss:** Das System wurde initial strikt als **Tier 3 (Base Swarm)** aufgebaut.
**Begründung:** 
Ein sofortiger Einsatz von parallelen Agenten (DAG-Engine) oder autonomen Guardrails in fremden Repositories wäre ohne ein massives Fundament katastrophal ("Garbage in, Garbage out"). 
Tier 3 etablierte die zwingend notwendige **Isolierung**:
1. Eine absolute Firewall (`opencode.json`), die globalen "Context Bleed" (aus `.claude`, `.roo`, etc.) verhindert.
2. Die strikte Nutzung von "Read-Only Reconnaissance Skills", bevor ein Agent überhaupt Schreibrechte in einem Ziel-Repo erhält.

Erst durch dieses Tier-3-Fundament ist die Control Node stabil genug, um zukünftig Tier 2 und Tier 1 Architekturen sicher zu deployen.

---

## 2. Tier 2 (Advanced Router Swarm) im Kontext des Repo-Managements
In der Theorie beschreibt Tier 2 eine DAG-Engine und JIT-Context. Für die Control Node bedeutet dies konkret:

*   **Vom statischen Payload zum dynamischen Baukasten (JIT Context):**
    Aktuell (Tier 3) kopiert der Orchestrator einen statischen `base_payload` in den Playground. In der Tier 2 Evolution wird er *während* der Reconnaissance-Phase (z.B. nach der Erkennung eines Next.js Repos) den Payload **Just-In-Time** aus modularen Bausteinen (Blueprints) zusammensetzen. Er lädt dann nicht die generische `biome.json`, sondern exakt die React-spezifischen Linting-Regeln.
*   **Paralleles Deployment (DAG Engine):**
    Wenn die Infrastruktur steht, erlaubt die Graphen-Architektur dem Master-Orchestrator, Updates an den OpenCode-Konfigurationen in 5 verschiedenen Microservice-Repositories *gleichzeitig* durchzuführen, anstatt sie sequenziell abzuarbeiten.

---

## 3. Tier 1 (Enterprise Autonomous System) im Kontext des Repo-Managements
In der Theorie steht Tier 1 für AST-Code-RAG und Python-Worker. Für die Control Node ist dies die ultimative "Röntgenbrille":

*   **Chirurgische Aufklärung (AST-Code-RAG):**
    Wenn der Orchestrator ein gigantisches Monorepo (500+ Dateien) analysieren muss, stößt er an harte Token-Limits. Mit Tier 1 (Tree-sitter AST RAG) muss er den Quellcode nicht mehr "lesen". Er lässt das Ziel-Repo durch einen Parser laufen und erhält einen deterministischen Graphen (AST), der ihm exakt zeigt, wo die Datenbank-Layer oder API-Routen liegen. Er operiert nicht mehr auf Textebene, sondern auf semantischer Strukturebene.
*   **Zero-Trust Injektionen (DRS-OSS & Guardrails):**
    Bevor der Orchestrator einen modifizierten Playground in ein fremdes Produktions-Repo kopiert, muss der Code (Diff) durch ein "Diff Risk Scoring" (DRS). Ein separates Kontroll-Modell (Guardrail) prüft, ob die Injektion versehentlich kritische Infrastruktur überschreibt, und löst bei Bedarf einen menschlichen Approval-Prozess (`HitL`) aus.

---
*Fazit: Tier 1 und Tier 2 sind keine abstrakten Träumereien, sondern der exakte architektonische Bauplan, um diese Control Node zu einer vollständig autonomen, sicheren und halluzinationsfreien DevOps-Maschine hochzurüsten.*