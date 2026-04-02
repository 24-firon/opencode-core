---
name: testing-protocols
description: Lade diesen Skill, wenn QA-Pipelines, Tests, Linting oder Syntax-Validierungen durchgeführt werden.
---

# 🧪 The 7-Gates Execution Pipeline & QA

For EVERY task delegated by the architect, the following pipeline MUST be executed via MCP tool `run_qa_pipeline` (or manually if tool unavailable):

```text
1. syntax_check       → Tree-sitter parse validation
2. placeholder_scan   → TODO/FIXME/stub detection (ZERO tolerance)
3. lint_check         → Biome with --apply (ZERO errors)
4. build_check        → TypeScript compilation
5. security_scan      → Semgrep SAST
6. test_run           → Unit tests + coverage >= 70%
7. evidence_complete  → Evidence bundle generated
```

## ESCALATION MATRIX:
- Attempt 1-3: Coder auto-fixes via error logs
- Attempt 4: Architect analyzes history, provides strategic hint
- Attempt 5: TASK FROZEN (status: `blocked`), escalate to human

## Testing Rules for Agents:
1. **Never skip tests** if modifying core logic.
2. **Run lint and format** before committing any changes.
3. If a test fails outside of your immediate scope, **do not attempt to fix it** unless requested by the user. Report the failure and revert your changes if they caused the failure.

## Test Engineer Directives:
- **COVERAGE >= 70%** - non-negotiable
- **ADVERSARIAL TESTS** - edge cases, null inputs, boundary conditions
- **INTEGRATION** - verify the task works in context
