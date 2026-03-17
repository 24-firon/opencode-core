# Pre-Flight Check: Agent Startup

Before beginning any task, agents MUST verify:

## 1. State Sync
- [ ] `.swarm/plan.md` is fresh (check timestamp)
- [ ] Run `.opencode/scripts/generate-plan.js` if stale
- [ ] Verify current phase and task in `.hive/`

## 2. Dependencies
- [ ] `node_modules` exists
- [ ] `biome` is available: `npx biome --version`
- [ ] `tsc` is available: `npx tsc --version`
- [ ] MCP server is running: check `.mcp-server/dist/index.js` exists

## 3. Context Loading
- [ ] Read `.opencode/context/node-patterns.md`
- [ ] Read `.opencode/context/security-rules.md`
- [ ] Query `.hivemind` for similar past tasks

## 4. File Reservations
- [ ] Reserve files via `swarmmail_reserve()`
- [ ] Check no conflicts with other agents

## 5. Model Verification
- [ ] Confirm current model matches assigned role
- [ ] Switch if necessary before starting

**DO NOT PROCEED** if any check fails. Report to architect.
