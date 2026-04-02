# Skill Creation Checklist (Für Skill-Bauer)

> Wenn du einen neuen Skill erstellst, gehe diese Checkliste Punkt für Punkt durch.
> Ein Skill, der einen dieser Punkte verfehlt, ist kein Skill — er ist eine unverbindliche Empfehlung.

---

## ✅ Vor dem Schreiben

- [ ] **Habe ich ein konkretes Example?** Nicht "Ich weiß, wie das geht", sondern ein physisches Artefakt im `examples/` Ordner, das zeigt, wie das fertige Ergebnis aussieht.
- [ ] **Habe ich die Bedingungen definiert?** Wann liest man Template A? Wann Example B? Die Bedingungen müssen in der SKILL.md als Tabelle stehen.
- [ ] **Habe ich die Rolle definiert?** Ist der Agent ein "Dokumentar", "Forensiker", "Tester" oder etwas anderes? Die Rolle steht im Context-Block der SKILL.md.

---

## ✅ Die SKILL.md (Der Router)

- [ ] **YAML-Header:** `name`, `description`, `license`, `compatibility`, `metadata`.
- [ ] **Context-Block (erste ~30 Zeilen):** Worum geht es? Wann wird dieser Skill benötigt? Wer liest das?
- [ ] **Harter Stopp:** Eine Regel, die sagt: "Wenn deine Aufgabe nicht passt, lies nicht weiter."
- [ ] **Bedingungs-Matrix:** Eine Tabelle mit Spalten: "WENN du X tust → MUSST du Y lesen → WAS du dort findest."
- [ ] **Relative Pfade:** Alle Verweise auf Templates/Examples nutzen `./templates/` oder `./examples/`, NICHT absolute Pfade.
- [ ] **Sub-Action-Prompts:** Mindestens 1 Copy-Paste-Prompt für den User, der den Skill auslösen kann.

---

## ✅ Der examples/ Ordner

- [ ] **Mindestens 1 Example pro Artefakt-Typ:** Wenn der Skill RAG-Cluster UND User Manuals produziert, braucht es mindestens 1 Example für jeden Typ.
- [ ] **Examples sind VOLLSTÄNDIG:** Keine Platzhalter, keine "[TODO]", keine Halbfertigen. Das Example ist das, was der Agent als "fertig" betrachten wird.
- [ ] **Examples sind QUALITATIV HOCHWERTIG:** Wenn du das Example nicht als Enterprise-Ready bezeichnen würdest, verbessere es, bevor du es als Referenz einfügst.

---

## ✅ Der templates/ Ordner

- [ ] **Templates haben Sektions-Funktionen:** Jede Sektion im Template hat eine kurze Erklärung in einem Blockquote: `> **Zweck dieser Datei:** ...`
- [ ] **Templates sind GERÜSTE, nicht Ergebnisse:** Sie zeigen die Struktur, aber der Agent muss sie mit echten Daten füllen.
- [ ] **Templates haben Beispiele:** Mindestens 1 ausgefülltes Beispiel-Blockquote pro Template.

---

## ✅ Nach dem Schreiben (Validierung)

- [ ] **Habe ich die SKILL.md geprüft?** Hat sie weniger als 100 Zeilen? Wenn nicht, habe ich zu viel Content reingemergt.
- [ ] **Habe ich die Bedingungen getestet?** Simuliere: "Ich bin in Phase 1. Lese ich die Matrix? Finde ich die richtige Datei? Lese ich das Example? Verstehe ich das Format?"
- [ ] **Kann ein Fremder den Skill benutzen?** Stelle dir vor, du gibst den Skill einem Agenten, der noch nie davon gehört hat. Versteht er, was er tun muss?

---

## ❌ Häufige Fehler

| Fehler | Warum es falsch ist |
|:---|:---|
| Alles in SKILL.md mergen | Token-Bloat. Der Agent lädt 800 Zeilen, obwohl er 200 braucht. |
| Kein Example | Der Agent rät. Das Ergebnis ist unvorhersehbar. |
| Absolute Pfade | Der Skill ist nicht portabel. Er funktioniert nur auf dem System, auf dem er geschrieben wurde. |
| Keine Bedingungen | Der Agent liest alles. Er verschwendet Token und Zeit. |
| Templates ohne Funktionsbeschreibung | Der Agent weiß nicht, WOFÜR die Sektion da ist. Er füllt sie mit Müll. |
