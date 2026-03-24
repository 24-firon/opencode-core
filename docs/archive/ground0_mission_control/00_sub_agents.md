## ABSOLUTE PROHIBITIONS (Legacy Core Rules)

- **TodoWrite is FORBIDDEN** — sub-agents must NOT use the TodoWrite tool
- **Opus model is FORBIDDEN** — only `sonnet` or `haiku`; Opus only on explicit user instruction
- **Scope violation is FORBIDDEN** — every prompt must explicitly name the allowed scope

## REPORT-ZWANG (REPORT-FIRST TRACKING)

- **Single tracking instrument:** Sub-Agenten müssen ihre Erkenntnisse und Zwischenschritte zwingend als physische Markdown-Dateien im Ordner `reports/` (oder ihrem zugewiesenen Task-Envelope wie `_TASKS/`) speichern.
- **CHAT-SPAM VERBOTEN:** Reine Text-Ausgaben im Chatfenster sind bei komplexen Tasks strengstens verboten (Gefahr von Session-Abstürzen durch Context-Overflow). Jeglicher Output/Log gehört in die Report-Datei!
- The report file must be **created before the first code step** (table with PENDING status)
- **Hard condition (NOT a suggestion):** "You are FORBIDDEN from starting step N+1 before marking step N as ✅ DONE in the report file." (This integrates with the Anti-Amok Rule!).
- Report format:

```markdown
| # | Step | Status |
|---|------|--------|
| 1 | Create file X | ✅ DONE |
| 2 | Edit file Y | ⏳ PENDING |
```

## BUILD-MODE MIT HANDSCHELLEN (SCOPE INHERITANCE)

Wenn ein Sub-Agent Dateien schreiben muss (z.B. für seine Reports), muss er zwar mit Schreibrechten gestartet werden (Build-Mode / `general` Type). **ABER:**
- Der System-Prompt muss ihm **explizit verbieten**, Dateien außerhalb von `reports/` oder seinem zugewiesenen `_TASKS/` Envelope anzufassen.
- **Handschellen-Regel:** "Dein Schreibzugriff ist STRIKT limitiert auf `reports/xyz.md` (und explizit freigegebene Dateien). Jeder Versuch, unautorisiert Produktivcode oder andere System-Dateien zu verändern, führt zum sofortigen Abbruch."

## MODEL ROUTING

| Task Type | Model | When |
|---|---|---|
| Implementation (>50 lines) | `sonnet` | Writing code, creating files |
| Exploration / search | `haiku` | Grep, Glob, read-only |
| Architectural decisions | **Ask user** | Never decide alone |
| Opus | **FORBIDDEN** | Only on explicit user instruction |

## MANDATORY PROMPT STRUCTURE

Every sub-agent prompt must contain:

1. **CONTEXT INHERITANCE** — "Lies `docs/system/rules_master/global/sub-agents.md`" or inline constraints.
2. **SCOPE** — Explicit list of files that may be touched (inkl. "Handschellen"-Regel für Schreibzugriffe).
3. **GOAL & NO-SCRIPTING** — Exact result. Explizites Verbot, Skripte zu schreiben.
4. **CONSTRAINTS** — List all prohibitions (Anti-Amok pauses required, TodoWrite, Opus, scope violations, Chat-Spam).
5. **REPORT FILE** — Path to report file + instruction: "Update report after every step. Write insights here, NOT in chat."
6. **STEPS (WITH PAUSES)** — Atomic step list: "Step 1: create X → update report → **STOP AND AWAIT ORCHESTRATOR APPROVAL**"

## WHEN NOT TO SPAWN A SUB-AGENT

- Single curl tests / API calls → main agent directly
- Tool-rejections → main agent finds alternative approach (no sub-agent as workaround)
- Plan-mode exploration → `Explore` agent type (not `general-purpose`)
- Any task under ~50 lines of code → main agent directly

## HISTORIC FAILURE PATTERNS

- **Anti-pattern:** Sub-agent makes 13+ tool calls without updating the report → all checkboxes remain PENDING.
- **Root cause:** Prompt phrased report-update as a suggestion, not a hard precondition.
- **Fix:** Always write: "You MUST NOT begin step N+1 until step N is marked ✅ DONE in the report."