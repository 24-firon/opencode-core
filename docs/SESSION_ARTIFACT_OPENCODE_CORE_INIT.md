# Session Artifact: OpenCode Control Node Genesis
**Datum:** 16. März 2026
**Zweck:** Erhaltung des globalen Systemkontexts für zukünftige Agenten, die dieses Repository übernehmen.

## 1. Ausgangslage & Die "Context Sandwich" Problematik
Wir begannen im Repository `quiet-panda`. Das Problem: OpenCode verhielt sich in fremden Repositories erratisch. Es scannte ungefragt hunderte Dateien, lud globale Verzeichnisse ein und litt unter "Context Bloat" und Halluzinationen. 
**Die Erkenntnis:** OpenCode arbeitet nach einem **Opt-Out-Prinzip**. Es baut ein 6-schichtiges "Context Sandwich" (insbesondere Schicht 4: Die Workspace Map via Tree-sitter). Ohne extreme `ignore_patterns` wird der Agent durch irrelevanten Code und Altlasten (wie z. B. `.claude`, `.roo`, oder globale `AGENTS.md`) vergiftet.

## 2. Der Paradigmenwechsel: Vom Template zur "Control Node"
Ursprünglich sollte hier nur ein sauberes "Template" entstehen. Im Laufe der Session eskalierte die Architektur (positiv) zu einem **Deployment Orchestrator (Control Node)**.
*   Dieses Repo (`opencode-core`) ist **nicht** der Quellcode einer Software.
*   Es ist die **Kommandozentrale**, von der aus ein OpenCode-Agent *andere* Repositories (z. B. Next.js, FastAPI) untersucht und mit OpenCode-Strukturen ausrüstet.

## 3. Die implementierte Architektur im Detail

### A. Das Root-Verzeichnis (Der Orchestrator)
Das Root-Verzeichnis wurde in eine absolute Sandbox verwandelt:
*   **Die Firewall (`.opencode/opencode.json`):** Blockiert rekursiv über 24 verschiedene KI-Editor-Verzeichnisse (z. B. `**/.roo/**`, `**/.cursor/**`) und verhindert das Laden von globalen Windows-User-Konfigurationen (`~/.config/opencode/AGENTS.md`).
*   **Die Master-Directive (`.opencode/rules/00_master_orchestrator_directive.md`):** Definiert den Agenten als reinen Deployment-Orchestrator. Er darf nicht programmieren, er darf nur analysieren und Payloads in `templates/playgrounds/` zusammensetzen.
*   **Reconnaissance Skills (`.opencode/skills/`):** 33 von Perplexity generierte "Aufklärungs-Skills" (z. B. `react-vite-analyzer`). Der Agent nutzt diese, um fremde Repos sicher zu scannen, ohne in `node_modules` oder Build-Ordner abzustürzen.
*   **Die OMEGA Constitution (`02_omega_constitution.md`):** Das importierte Grundgesetz für Agenten (Golden Axiom, Anti-Hallucination, Approval Blocks).

### B. Das Template-Archiv (`templates/base_payload/`)
Hier liegt das Erbe des "Tier 3 Base Swarms" aus dem alten `quiet-panda` Repo.
*   **Zweck:** Dies ist die Blaupause, die der Orchestrator kopiert, anpasst und in Ziel-Repos injiziert.
*   **Inhalt:** Ein Event-Sourcing Backend (`.hive`), ein Vektor-Gedächtnis (`.hivemind`), eine 7-Gates QA-Pipeline (`.mcp-server`), und strikte Code-Regeln.

### C. Das Architektur-Gedächtnis (`docs/architecture_reference/`)
In einem iterativen Deep-Clean-Prozess (siehe `WORKFLOW_ITERATIVE_DEEP_CLEAN.md`) haben wir das alte Repo bis auf den letzten Textkrümel durchforstet und die intellektuelle Basis gerettet:
*   `ARCHITECTURE_DECISION_LOG.md`: Erklärt, warum wir bei Tier 3 (statisches Event-Sourcing) anfangen mussten und nicht sofort Tier 2 (DAG-Engine) oder Tier 1 (AST-Code-RAG) gebaut haben.
*   `tier2_reference_src/`: Der komplette, rettende TypeScript-Code für die zukünftige Entwicklung (XState-Machines, Swarm-Mail, Semantic Router).
*   Diverse Deep-Research-Dokumente zu LangGraph.js-Bugs, Guardrails und RAG.

## 4. Wichtiges Learning für Folge-Agenten
Wenn du (Agent) diesen Text liest: **Geh niemals blind in ein anderes Repo.** Nutze immer einen Skill aus `.opencode/skills/`, baue einen Playground, passe die Vorlage an und zeige dem User (dem Menschen) dein Ergebnis, bevor du es in das echte Repo verschiebst.