# Hybrid Swarm Architecture 2026

## Overview

This repository implements a **Power-User 2026 Architecture** combining:
- **OpenCode Swarm**: 9 specialized agents with asymmetric model routing
- **swarm-tools**: Event sourcing (`.hive/`) and vector memory (`.hivemind/`)
- **OAC**: Pattern control via `.opencode/context/`
- **Custom MCP Server**: 7-Gates QA Pipeline for uncompromising quality

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    ARCHITECT (Gemini 3.1 Pro)               │
│                     Hub & Orchestrator                        │
└────────────┬────────────────────────────────┬───────────────┘
             │                                │
    ┌────────▼────────┐            ┌──────────▼──────────┐
    │  .hive/ (SSoT)  │            │   MCP QA Server     │
    │  Event Log      │            │   (7 Gates Pipeline)│
    └────────┬────────┘            └──────────┬──────────┘
             │                                │
    ┌────────▼───────────────────────────────▼──────────┐
    │                   AGENT POOL                       │
    ├─────────┬──────────┬──────────┬──────────┬──────────┤
    │  Coder  │ Reviewer │  Tester  │   SME    │ Explorer │
    │Kimi K2.5│ Claude   │ Kimi     │ Gemini   │ Gemini   │
    │         │ Sonnet   │ K2.5     │ Flash    │ Flash    │
    └─────────┴──────────┴──────────┴──────────┴──────────┘
```

## The 7-Gates Pipeline

Every task MUST pass:

1. **Syntax Check** (Tree-sitter) - Parse validation
2. **Placeholder Scan** - No TODOs/FIXMEs/stubs
3. **Lint Check** (Biome) - 0 errors, auto-fix
4. **Build Check** (TypeScript) - Compiles cleanly
5. **Security Scan** (Semgrep) - SAST analysis
6. **Test Run** (Vitest) - >=70% coverage
7. **Evidence** - Proof bundle generated

## Directory Structure

```
.opencode/
  ├── context/          # Pattern files (MVI)
  ├── commands/         # Custom slash commands
  ├── scripts/          # Projection & automation
  └── swarm.json       # Agent configuration

.swarm/
  ├── plan.md           # Auto-generated from .hive (READ-ONLY)
  ├── context.md        # Decisions cache
  └── evidence/         # QA bundles

.hive/
  └── event-log.sqlite  # SSoT Event sourcing DB

.mcp-server/
  └── src/
      └── index.ts      # QA Gates MCP Server

src/                    # Project source code
tests/                  # Test files
```

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Build MCP server
cd .mcp-server && npm run build

# 3. Initialize hive
cd .. && node .opencode/scripts/generate-plan.js

# 4. Start developing
# Use /swarm commands in OpenCode
```

## Agent Commands

| Command | Description |
|---------|-------------|
| `/swarm-start "task description"` | Begin new task with full pipeline |
| `/swarm-status` | Check current phase and task |
| `/swarm-evidence <taskId>` | View QA results |
| `/swarm-reset` | Clear swarm state (use with caution) |

## Configuration

See `.opencode/swarm.json` for:
- Agent model assignments
- Tool permissions
- Guardrail limits
- Gate configurations

## State Management (SSoT)

**CRITICAL**: Agents MUST NOT manually edit `.swarm/plan.md`

Correct flow:
1. Emit event to `.hive/`
2. Run projection script
3. Read generated `.swarm/plan.md`

## Quality Standards

- **Zero Tolerance**: Syntax errors, lint errors, build failures
- **Coverage**: Minimum 70% test coverage
- **Security**: Semgrep must pass
- **Placeholders**: Production-ready code only

## Learn More

- [AGENTS.md](./AGENTS.md) - Detailed agent instructions
- `.opencode/context/` - Pattern files
- [OpenCode Swarm](https://github.com/zaxbysauce/opencode-swarm) - Reference implementation
- [swarm-tools](https://github.com/joelhooks/swarm-tools) - Event sourcing patterns

---

**Built for uncompromising quality. No half measures.**
