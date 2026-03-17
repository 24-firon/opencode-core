# Vorherige Recherche: Phase 1-4 Enterprise Swarm 2026 (Raw Data)

## Phase 1: Frameworks & DAGs
- **OpenAI Swarm**: OFFICIALLY REPLACED by OpenAI Agents SDK. NUR NOCH EDUCATIONAL, keine Production-Nutzung.
- **LangGraph.js (TypeScript)**: Production-ready ABER kritische Issues: Tool call bugs & infinite loops, Recursion limit errors, Platform deployment issues ("Graph not found").
- **Microsoft AutoGen**: Apache/WSGI Kompatibilitätsprobleme, Logging-Output-Konflikte (termcolor, isatty).
- **CrewAI**: Enterprise Beta instabil, Agent loops (unnötige Tools invocations).
- **ControlFlow**: Task-centric (nicht agent-centric) approach. Event-based orchestrator. Python-only.
- **PydanticAI**: Production-ready für structured outputs, Graph-based control flow für komplexe Cases. Python-only.

## Phase 2: Context Routing & Memory
- **Memory Patterns**: Best Practice ist Memory-first architecture. Query memory -> If missing -> Trigger RAG -> Merge results -> Store summary.
- **AST-based Context Chunking**: Tree-Sitter + CodeT5 + hnswlib. Syntaktisch valide chunks (functions, loops, conditionals).
- **Graph-RAG für Code**: Deterministisch aus AST abgeleitete Graphen schlagen LLM-Extracted Knowledge Graphs in Geschwindigkeit und Vollständigkeit (Studie 2026).

## Phase 3: Autonome Selbstheilung & Structural Learning
- **Self-Healing Agents (REAL)**: Aider (Self-healing test loops: edit -> test -> fix). SWE-agent (Self-correction capabilities, GitHub issue resolution).
- **General Pattern**: Agent generates code -> Evaluator runs Pyrite/linter in sandbox (E2B) -> If errors -> Feed error message back -> Agent regenerates.
- **AST-based Code Generation**: Research-Phase (AST-T5, AST(NIT), ASTxplainer). Reinforcement Learning mit EDA Tools zeigt 7-20% verbesserte Functional Correctness.

## Phase 4: Enterprise Governance & Risk-Based HitL
- **NeMo Guardrails**: Programmable guardrails mit Colang 2.0. NIM microservices: content safety, topic control, jailbreak detection.
- **Git Diff Risk Scoring**: DRS-OSS (LLM-Driven Diff Risk Scoring Tool). Llama 3.1 8B sequence classifier. Structured output: Severity, Risk, Improvements. Blockiert die riskantesten 30% der Commits.
- **Sequential Scoring Pattern**: Complexity Score, Permission Score, Risk Score, Emotional Intelligence Score.
