# 📍 LOCAL GOVERNANCE — Hybrid Swarm Repository

## 1. REPOSITORY IDENTITY
- Tier 3: `projects/tier3-base-swarm/` = stabile Ausführungsbasis.
- Tier 2: `projects/tier2-advanced-swarm/` = aktueller Fokus.
- `.hive/` ist die autoritative State-/Event-Schicht.
- Vor Architektur- oder Implementationsarbeit zuerst `.opencode/knowledge/BRAIN_UPLOAD.md` lesen.

## 2. ROOT HYGIENE
- Root bleibt sauber.
- Neue operative Skripte nur nach `ops/scripts/`.
- Keine ad-hoc Skripte in Root oder `src/`.

## 3. PROTECTED INFRASTRUCTURE
- Nicht anfassen ohne explizite Anweisung: `.agents/`, `.claude/`, `.cursor/`, `.gemini/`, `.hive/`, `.hivemind/`.

## 4. SKILL ROUTING
- Spezialregeln liegen unter `.opencode/skills/`.
- Lade Skills gezielt nach Task, statt alles dauerhaft im Basiskontext zu tragen.
