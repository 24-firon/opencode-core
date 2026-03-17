# Learning Patterns Database

## Pattern #001: Trial-and-Error Eskalation

**Category**: Workflow Rule
**Status**: Established
**Failure Rate**: 0% (prevented by rule)
**Created**: 2026-03-04
**Confidence**: 100%

### Problem
Agent attempts multiple trial-and-error fixes without success, burning tokens and wasting time.

### Solution
After 2-3 failed attempts, agent MUST:
1. STOP attempting further fixes
2. ESCALATE to user OR
3. TRIGGER online research
4. Document the failure pattern

### Implementation
- Monitor failure count in `.hive/` events
- Hard stop at attempt #3
- Auto-trigger `/research` command

### Example
```
Attempt 1: Import error with libsql
Attempt 2: Changed import syntax - still fails  
Attempt 3: Try different destructuring - STILL FAILS
→ TRIGGER ESCALATION
→ Research: "libsql ES Module import 2025"
→ Solution: Use better-sqlite3 instead
```

### Tags
workflow, error-handling, escalation, learning

---

## Pattern #002: Package Selection - Prefer Established over Experimental

**Category**: Architecture Decision
**Status**: Established
**Created**: 2026-03-04
**Confidence**: 95%

### Problem
Choosing new/experimental packages (libsql) over established alternatives (better-sqlite3)

### Solution
When choosing packages:
1. Check npm download stats (>1M = established)
2. Check ES Module support
3. Check TypeScript declarations availability
4. Prefer battle-tested over bleeding-edge for core infrastructure

### Applied
Switched from `libsql` (experimental) to `better-sqlite3` (10M+ downloads, proven)

### Tags
architecture, dependencies, sqlite, database
