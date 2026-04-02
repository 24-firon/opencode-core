---
name: testing-protocols
description: |
  Lade diesen Skill, wenn QA-Pipelines, Tests, Linting oder Syntax-Validierungen durchgeführt werden.

  MANDATORY SYSTEM RULE - READ IMMEDIATELY:
  1. Ordner .claude, .agent, .gemini NIEMALS berühren, lesen oder löschen.
  2. Dein Arbeitsbereich ist NUR .opencode und der Produktivcode.
  3. Nutze immer absolute Pfade für read/write. Grep statt Guessing.
  4. Nutze das task-Tool für komplexe Jobs.
  5. Stoppe und frage nach Erlaubnis vor destruktiven Bash-Befehlen (rm, drop).

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
  - Attempt 5: TASK FROZEN (status: blocked), escalate to human

  ## Testing Rules for Agents:
  - Never skip tests if modifying core logic.
  - Run lint and format before committing any changes.
  - If a test fails outside of your immediate scope, do not attempt to fix it unless requested by the user. Report the failure and revert your changes if they caused the failure.

  ## Test Engineer Directives:
  - **COVERAGE >= 70%** - non-negotiable
  - **ADVERSARIAL TESTS** - edge cases, null inputs, boundary conditions
  - **INTEGRATION** - verify the task works in context
---
