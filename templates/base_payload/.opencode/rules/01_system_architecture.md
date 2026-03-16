# 1. System Architecture: Hybrid Swarm 2026

This repository implements a **Power-User 2026 Architecture** combining OpenCode Swarm, swarm-tools, and OAC pattern control.

## Single Source of Truth (SSoT)
**CRITICAL**: The `.hive/` directory contains the authoritative event log. Agents MUST NOT manually edit `.swarm/plan.md`. Instead:
1. Emit events via `hive_create()`, `hive_close()`, `hive_update()`
2. The projection script `.opencode/scripts/generate-plan.js` regenerates `.swarm/plan.md` deterministically
3. Agents only READ `.swarm/plan.md`, never WRITE

## 2. Agent Matrix & Asymmetric Model Routing

| Agent | Model | Responsibility | Tools | Max Failures |
|-------|-------|----------------|-------|--------------|
| **architect** | Gemini 3.1 Pro | Orchestration, planning, validation, root cause analysis | ALL | N/A |
| **coder** | Kimi K2.5 | Code generation for ONE task only | read, edit, write, grep | 5 |
| **reviewer** | Claude 3.5 Sonnet | Security & correctness review (MUST be different model from coder) | read, grep, bash | 3 |
| **test_engineer** | Kimi K2.5 | Test writing & execution | read, write, bash | 3 |
| **sme** | Gemini Flash | Domain expertise, codebase scanning | read, grep, glob | N/A |

**CRITICAL**: The reviewer MUST use a different model than the coder to catch blind spots.

## 3. The 7-Gates Execution Pipeline

For EVERY task delegated by the architect, the following pipeline MUST be executed via MCP tool `run_qa_pipeline`:

```
1. syntax_check       → Tree-sitter parse validation
2. placeholder_scan   → TODO/FIXME/stub detection (ZERO tolerance)
3. lint_check         → Biome with --apply (ZERO errors)
4. build_check        → TypeScript compilation
5. security_scan      → Semgrep SAST
6. test_run           → Unit tests + coverage >= 70%
7. evidence_complete  → Evidence bundle generated
```

**ESCALATION MATRIX**:
- Attempt 1-3: Coder auto-fixes via error logs
- Attempt 4: Architect analyzes history, provides strategic hint
- Attempt 5: TASK FROZEN (status: `blocked`), escalate to human

## 4. Meta-Rules (Agent Responsibilities)
1. **Read before acting:** Always use read tools or grep to analyze surrounding context before editing a file.
2. **Mimic existing code:** Adapt to the style, syntax, and architecture of the neighboring files.
3. **No destructive actions:** Never delete databases, drop tables, or forcefully remove directories without explicit, repeated user consent.
4. **Be concise:** Output clear, concise explanations. Do not output massive walls of text unless explicitly requested.
5. **Self-Correction:** If a build or test fails after an edit, the agent should attempt to self-correct by analyzing the error output before asking the user for help.
