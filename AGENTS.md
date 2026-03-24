# AGENTS.md — The Heart of OpenCode Control Node

> **Spirit:** „Ordnung im Chaos, Integrität in jedem Byte.“
> **Zweck:** Dies ist der Master-Router und das Bewusstsein der Control Node. Sie ist der erste Kontaktpunkt für jede Intelligenz, die dieses System betritt.

---

## 🏛️ Die Mission (The Forge)

Wir bauen hier nicht einfach nur Code. Wir schmieden die **Infrastruktur der Autonomie**. 
`opencode-core` ist das Hauptquartier, in dem wir die Standards für die Agenten-Zukunft definieren. Unsere Ausrichtung ist **strikte Trennung von Belangen, maximaler Schutz der Integrität und kompromisslose Disziplin bei der Wissenserhaltung.**

---

## 🗺️ System-Lageplan (Repository Map)

```text
Root (/)
├── AGENTS.md                 <-- Das Bewusstsein (Du bist hier)
├── opencode.jsonc            <-- Das Nervensystem (V3 Konfiguration)
│
├── .opencode/                <-- Das lokale Gehirn
│   ├── rules/                <-- Aktive Gesetze & Wissens-Bausteine
│   └── skills/               <-- Spezialisierte Werkzeuge (Recon, Audit)
│
├── templates/                <-- Die Geburtsstätte
│   └── base_payload/         <-- Der Goldstandard für alle Ziel-Repos
│
├── docs/                     <-- Die Bibliothek
│   ├── archive/              <-- Dunkle Vergangenheit (STRICT AVOIDANCE)
│   ├── learnings/            <-- Narben & Lektionen (Post-Mortems)
│   └── architecture_ref/     <-- Strategische Baupläne (Nordstern)
│
└── _IMPORT/                  <-- Das Tor zur Außenwelt (Staging Area)
```

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
