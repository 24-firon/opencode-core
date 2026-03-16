# Workspace and Templates

This file serves as the index for the pre-configured tech stacks and boilerplates available in this pristine OpenCode foundation repository. It acts as the "Golden Master" reference for agents cloning this repository for new projects.

## 1. Core Tech Stack (Tier 3 Base Swarm)

This repository comes pre-loaded with the "Tier 3 Base Swarm" orchestrator stack:

### TypeScript & Node.js
- **Strict Typing:** `tsconfig.json` enforces strict mode with `noImplicitAny` and strict null checks.
- **Validation:** `zod` is installed for robust schema validation, particularly for API boundaries and agent prompt parsing.

### Code Quality (The 7-Gates Pipeline)
- **Linter & Formatter:** `biome.json` is configured for lightning-fast, uncompromising code style enforcement. Agents must run `npm run biome:check` to ensure zero errors.
- **Security:** Ensure `semgrep` is available in your environment for SAST scanning before any commits.
- **Testing:** `vitest` is pre-configured. All new features must include tests achieving >=70% coverage.

## 2. Event-Sourcing & State (The `.hive/` Backend)

This repository does not use flat markdown files for state. It uses Event-Sourcing.
- **SQLite Database:** The state lives in `.hive/event-log.sqlite`.
- **Projection:** The `plan.md` is strictly **Read-Only**. Agents emit events via the `HiveAPI` (found in `src/hive/index.ts`), and the system automatically projects these events into markdown for human readability.

## 3. Vector Memory (The `.hivemind/`)

To prevent agents from repeating mistakes:
- **Provider-Agnostic Setup:** The `VectorMemory` class in `src/hivemind/index.ts` works with both Ollama (default port `11441`) and vLLM.
- **Usage:** Agents should query `.hivemind/` for similar past tasks before executing a plan, and log their success/failure patterns after completing a task.

## 4. MCP Server (The QA Gates)

The `.mcp-server/` directory contains a Model Context Protocol server that enforces the 7-Gates Quality Pipeline locally.
- **Build the Server:** `cd .mcp-server && npm install && npm run build`
- **Execution:** The Orchestrator CLI (`src/cli/index.ts`) connects to this MCP server to rigorously test code outputs in an isolated sandbox.

## 5. Working Zones (`_TASKS/`)

- Agents should never "draft" code directly in `src/` if the logic is complex.
- Create an envelope in `_TASKS/` (e.g., `_TASKS/001_feature_name/`) to act as your "Brain" and "Drafts" zone.
- This folder is explicitly ignored by Tree-sitter (via `opencode.json` and `.opencodeignore`) to prevent Context Bleed.
- Only finalized, 100% working code that passes the QA Gates should be copied into `src/`.
