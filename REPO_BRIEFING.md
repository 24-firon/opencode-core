# REPO BRIEFING — The Heart of OpenCode Control Node

> **Spirit:** „Ordnung im Chaos, Integrität in jedem Byte.“
> **Zweck:** Dies ist das Repo-Briefing und das Bewusstsein der Control Node. Es wird bei jedem Start automatisch in den Kontext geladen.

---

## 🏛️ Die Mission (The Forge)

Wir bauen hier nicht einfach nur Code. Wir schmieden die **Infrastruktur der Autonomie**. 
`opencode-core` ist das Hauptquartier, in dem wir die Standards für die Agenten-Zukunft definieren. Unsere Ausrichtung ist **strikte Trennung von Belangen, maximaler Schutz der Integrität und kompromisslose Disziplin bei der Wissenserhaltung.**

---

## 🗺️ System-Lageplan (Repository Map)

```text
Root (/)
├── REPO_BRIEFING.md          <-- Das Bewusstsein (Du bist hier)
├── RULE_REGISTRY.md          <-- Router für alle Regeln (BOOT/WORKFLOW/KNOWLEDGE)
├── opencode.jsonc            <-- Das Nervensystem (V3 Konfiguration)
│
├── .opencode/                <-- Das lokale Gehirn
│   ├── rules/                <-- Aktive Gesetze (10er-Nummerierung, auto-geladen)
│   └── skills/               <-- Spezialisierte Workflows (Router + Examples)
│
├── templates/                <-- Die Geburtsstätte
│   └── base_payload/         <-- Der Goldstandard für alle Ziel-Repos
│
├── docs/                     <-- Die Bibliothek
│   ├── prompts/              <-- Boot & Follow-Up Prompts (INITIAL_PROMPT.md)
│   ├── archive/              <-- Dunkle Vergangenheit (STRICT AVOIDANCE)
│   ├── learnings/            <-- Narben & Lektionen (Post-Mortems)
│   ├── opencode_knowledge/   <-- RAG-Wissen (MASCHINEN)
│   └── user_manual/          <-- Management-Dashboard (MENSCHEN)
│
├── playground/               <-- Sandbox für Entwürfe & Backups
└── _IMPORT/                  <-- Das Tor zur Außenwelt (Staging Area)
```

---

## 📚 Knowledge Routing (Wo ist was?)

| Du willst... | Lies das hier |
|:---|:---|
| Wissen, welche Regeln es gibt | `RULE_REGISTRY.md` im Root |
| Architektur-Entscheidungen nachvollziehen | `docs/DECISION_LOG.md` |
| Session-Lektionen lesen | `docs/learnings/` |
| OpenCode-Framework verstehen | `docs/opencode_knowledge/00_MASTER_INDEX.md` |
| Einen Skill nutzen | `skill({name: "knowledge-router"})` laden |
| Eine neue Technologie analysieren | `skill({name: "doc-harvester-protocol"})` laden |
| Community-Bugs nachschlagen | `docs/opencode_knowledge/SHADOW_KNOWLEDGE_RAW.md` |
| Einen Agent booten / neu starten | `docs/prompts/00_INITIAL_PROMPT.md` |
| Eine Spezialisierung zuweisen | `docs/prompts/01_*.md` oder `02_*.md` oder `03_*.md` |
| Eine Rolle definieren (Architekt/Operator/Wissen) | `docs/prompts/04_ARCHITECT_ROLE.md` oder `05_OPERATOR_ROLE.md` oder `06_KNOWLEDGE_ROLE.md` |
| Session-Status prüfen (Was ist erledigt?) | `docs/SESSION_HANDOVER.md` |
| Offene Tasks sehen (Was steht an?) | `docs/TASK_LIST.md` |

---

## 🔄 Agenten-Routing & Delegation

Wir arbeiten nicht monolithisch. Wir nutzen die volle Kraft des Frameworks durch gezielte Delegation:

- **@build** (Generalist): System-Integration, Konfiguration, Payload-Bau.
- **@plan** (Architekt): Tiefenanalyse, Review von Handovers (Read-only).
- **@explore** (Pfadfinder): Schnelle Orientierung in fremden Strukturen (Read-only).

**Gesetz:** Wenn eine Aufgabe komplex ist, nutze das `Task-Tool`, um spezialisierte Sub-Agenten parallel arbeiten zu lassen. Integrität bedingt, dass kein Agent mehr Kontext trägt, als er für seine spezifische Aufgabe benötigt.

---

## 🧘‍♂️ Die 4 Säulen unserer Soul

1. **Integrität vor Kompression:** Wir fassen Wissen nicht zusammen, wir bewahren es. Jedes Detail zählt.
2. **Keine Schattenregeln:** Wissen, das nicht in `.opencode/rules/` steht, existiert nicht.
3. **Proactive Shielding:** Wir vertrauen niemandem. Wir blockieren fremde Einflüsse präventiv.
4. **Dogfooding:** Wir essen unseren eigenen Brei. Jede Regel für den Payload gilt auch für uns.

---

## 🛠️ V3 Standards & Protokoll

Alle Handlungen müssen den V3-Vorgaben entsprechen:
- **Config:** Nur `opencode.jsonc`, `watcher.ignore` und Glob-`instructions`.
- **Workflow:** Jede signifikante Änderung endet mit einem `git-savepoint-pr`.
- **Disziplin:** Jede Sitzung hinterlässt einen Eintrag in `docs/learnings/`, wenn etwas Neues gelernt wurde.

---

## ✈️ Pre-Flight Checklist (Vor dem Boot)

Bevor du in eine Phase eintritts, prüfe:

| Phase | Relevante Skills | Nicht relevante Skills (via Config versteckt) |
|:---|:---|:---|
| **Architect** (Regeln/Skills ändern) | `knowledge-router`, `skill-constructor`, `skill-creator` | Alle analyzer-* Skills (falls vorhanden) |
| **Operator** (Repos bestücken) | `knowledge-router`, `doc-harvester-protocol`, analyzer-Skills | `skill-constructor`, `testing-protocols` |
| **Knowledge Master** (Doku verarbeiten) | `doc-harvester-protocol`, `knowledge-router`, `code-review` | Alle analyzer-* Skills |

> **Regel:** Wenn du Recon-Skills (analyzer-*) zu `.opencode/skills/` hinzufügst, trage `"analyzer-*": "deny"` im `permission.skill` Block der Config ein, damit sie nicht automatisch in jede Session geladen werden.
