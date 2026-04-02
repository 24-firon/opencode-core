# Die Anatomie eines komplexen Skills

> Wenn du einen Skill siehst, der so aufgebaut ist (mit Unterordnern), ist er NICHT dazu gedacht, dass du alles liest.

---

## Die typische Struktur

```
.opencode/skills/<skill-name>/
├── SKILL.md                    ← DER ROUTER (Nicht das Archiv!)
├── examples/                   ← "Definition of Done" Referenzen
│   ├── EXAMPLE_A.md
│   └── EXAMPLE_B.md
├── templates/                  ← Vorlagen, die befüllt werden müssen
│   ├── 01_template.md
│   └── 02_template.md
├── scripts/                    ← Ausführbare Skripte (optional)
│   └── helper.py
└── schemas/                    ← JSON-Schemata (optional)
    └── config_schema.json
```

---

## Was jeder Ordner bedeutet

### SKILL.md (Der Router)
- **Enthält:** YAML-Header, Context-Block, Bedingungs-Matrix, Sub-Action-Prompts
- **Enthält NICHT:** Die Inhalte der Templates oder Examples
- **Zweck:** Sagt dir, WELCHE Datei du WANN lesen musst

### examples/ (Definition of Done)
- **Enthält:** Vollständige, fertige Artefakte (Cluster-Dateien, Manuals, Config-Dateien)
- **Zweck:** Zeigt dir, wie das Endergebnis aussehen MUSS
- **Regel:** Lies mindestens ein Example, BEVOR du mit dem Schreiben beginnst

### templates/ (Scaffolding)
- **Enthält:** Leere oder teilweise befüllte Strukturen, die du mit echten Daten füllen musst
- **Zweck:** Gibt dir das Format vor (Tabellen, Code-Blöcke, Sektionen)
- **Regel:** Nutze das Template als Gerüst, nicht als Kopiervorlage

### scripts/ (Ausführung)
- **Enthält:** Bash-Skripte, Python-Skripte, die in den Workflows referenziert werden
- **Zweck:** Automatisiert repetitive Schritte
- **Regel:** Führe Skripte nur aus, wenn der Router es explizit sagt

---

## Wie du einen solchen Skill navigierst

```
1. SKILL.md öffnen
   ↓
2. YAML-Header lesen → Passt der Skill zu meiner Aufgabe?
   ↓ NEIN → Skill schließen
   ↓ JA
3. Context-Block lesen → Verstehe ich, WANN ich hier bin?
   ↓ NEIN → Skill schließen, Klärung holen
   ↓ JA
4. Bedingungs-Matrix lesen → In welcher Phase bin ich?
   ↓
5. Matrix zeigt: "Phase 1 → lies examples/EXAMPLE_A.md"
   ↓
6. EXAMPLE_A.md öffnen und analysieren
   ↓
7. Matrix zeigt: "Phase 1 → nutze templates/01_template.md"
   ↓
8. 01_template.md öffnen, befüllen
   ↓
9. Ergebnis mit EXAMPLE_A.md vergleichen
   ↓ Abweichung? → Korrigieren
   ↓ Keine Abweichung?
10. Zurück zur Matrix → Nächste Phase
```

---

## Warum das so ist

**Context-Fenster ist teuer.** Ein Agent hat ein begrenztes Token-Limit. Wenn du 10 Templates + 4 Examples + den gesamten Skill-Text in einer Datei hast, ist dein Context-Fenster voll, bevor du anfängst zu arbeiten.

**Durch Router-Paradigma:**
- Phase 1: Du lädst SKILL.md (60 Zeilen) + Example A (100 Zeilen) + Template 1 (50 Zeilen) = **210 Zeilen**
- Phase 3: Du lädst SKILL.md (60 Zeilen) + Example B (90 Zeilen) + Template 2 (70 Zeilen) = **220 Zeilen**

**Ohne Router-Paradigma (alles in SKILL.md):**
- Du lädst SKILL.md mit ALLEM = **800+ Zeilen** (unabhängig davon, ob du es brauchst)

Das ist der Unterschied zwischen einem Skill, der funktioniert, und einem Skill, der dich in den Token-Limit-Crash schickt.
