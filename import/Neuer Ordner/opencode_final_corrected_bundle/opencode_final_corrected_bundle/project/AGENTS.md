# 📍 LOCAL GOVERNANCE — Hybrid Swarm (Viron/OpenCode)

## 1. IDENTITÄT & ARCHITEKTUR
- **Repo:** Reactive Swarm Intelligence (RSI), Power-User Architektur 2026
- **Tier 3** (`projects/tier3-base-swarm/`): Stable Base. Execution. Nicht destabilisieren.
- **Tier 2** (`projects/tier2-advanced-swarm/`): 🔴 AKTUELLER FOKUS. DAG-Executor bauen.
- **Tier 1**: Konzept. Nicht anfassen.
- **Session-Handover:** IMMER zuerst `.opencode/knowledge/BRAIN_UPLOAD.md` lesen.

## 2. VERZEICHNISHYGIENE (ABSOLUT)
- **Root bleibt clean.** Keine Skripte, Dumps, Testdateien im Root-Verzeichnis.
- **Operative Skripte:** NUR in `ops/scripts/`. Nicht in `.opencode/scripts/`, nicht in `src/`.
- **Entwicklung:** Ausschließlich in `projects/tier2-advanced-swarm/` oder `projects/tier3-base-swarm/`.
- **Multi-Agent-Koexistenz:** Berühre NIEMALS `.agents/`, `.claude/`, `.cursor/`, `.gemini/`. Kein „Aufräumen", kein Löschen.

## 3. SOURCE OF TRUTH
- **Events/State:** `.hive/` ist die einzige autoritative Quelle. NIEMALS manuell in `.swarm/plan.md` schreiben.
- **Session-Handover:** `.opencode/knowledge/BRAIN_UPLOAD.md` (Append-Only, niemals kürzen).
- **Architekturentscheidungen:** Werden in `BRAIN_UPLOAD.md` oder `docs/DECISION_LOG.md` dokumentiert — Execution ohne Log-Eintrag ist verboten.

## 4. 3-ZONEN WORKFLOW
- **Zone 1 (Brain):** Denken, Planen → keine Repo-Dateien anfassen.
- **Zone 2 (_wip/):** Entwürfe in `src/_wip/` oder `ops/patches/` zeigen. Original bleibt unberührt.
- **Zone 3 (Original):** Nur nach explizitem „Go" des Users mergen. Danach sofort `git diff --staged`.

## 5. SKILL ROUTING (ON-DEMAND)
Lade aus `.opencode/skills/` per Skill-Tool, wenn der Task es erfordert:
| Trigger | Skill |
|---|---|
| Git-Operation | `git-policy.md` |
| Tests schreiben/ausführen | `testing-protocols.md` |
| Sub-Agenten spawnen | `agent-batching.md` |
| Secrets / Environment | `secrets-management.md` |
| Session-Ende / Brain Update | `handover-protocol.md` |
| Handover-Datei zu groß | `memory-shrink.md` |
| Datei im Original ändern | `three-zone-workflow.md` |
| Viron Stack (n8n/asyncpg) | `viron-stack-constraints.md` |
