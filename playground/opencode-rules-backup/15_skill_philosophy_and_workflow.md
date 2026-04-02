# Wie man Skills wirklich nutzt (Für Agenten)

> **Dieses Dokument ist eine Pflichtlektüre. Lies es, BEVOR du einen Skill benutzt.**
> Es erklärt, was Skills sind, was sie NICHT sind, und warum du sie fast immer falsch benutzt.

---

## Die Grundwahrheit

Ein Skill ist kein Textbuch. Er ist kein Archiv. Er ist ein **Router**.

Ein Skill sagt dir: **"Wenn du X tun willst, lies Datei Y."**

Das ist alles. Alles andere ist Overhead.

---

## Die 3 Fehler, die du machst

### Fehler 1: Du mergst alles in die SKILL.md
Du siehst einen `templates/` Ordner und denkst: "Ah, das muss ich in die SKILL.md kopieren."

**FALSCH.** Die SKILL.md zeigt auf die Templates. Sie enthält sie nicht. Warum? Weil du in Phase 1 nur die Triage-Regeln brauchst, nicht das Manual-Template. Wenn alles in einer Datei steht, verschwendest du 80% deines Context-Fensters auf Zeug, das du gerade nicht brauchst.

### Fehler 2: Du liest alles von vorne bis hinten
Du öffnest die SKILL.md, liest den YAML-Header, den Context-Block, die Matrix, die Templates, die Examples — alles auf einmal.

**FALSCH.** Ein guter Skill hat eine **Bedingungs-Matrix**. Sie sagt: "Wenn du Phase 1 ausführst, lies X. Wenn du Phase 3 ausführst, lies Y." Du folgst den Bedingungen. Du liest nicht blind alles.

### Fehler 3: Du ignorierst die Examples
Du siehst den `examples/` Ordner und denkst: "Ach, das sind nur Referenzen, ich weiß schon, wie das geht."

**FALSCH.** Ohne das Example zu lesen, weißt du NICHT, wie das Ergebnis aussehen soll. Du ratst. Du produzierst Müll. Das Example ist deine "Definition of Done". Lies es. Vergleiche dein Ergebnis damit. Korrigiere, wenn es abweicht.

---

## Der korrekte Workflow

### Schritt 1: SKILL.md öffnen (Nur die ersten 50 Zeilen)
1. Lies den YAML-Header: Name, Zielgruppe, Zweck.
2. Lies den Context-Block: Wann wird dieser Skill benötigt?
3. **Entscheidung:** Passt dieser Skill zu meiner Aufgabe? Wenn NEIN → Skill schließen. Wenn JA → weiter.

### Schritt 2: Die Bedingungs-Matrix lesen
Finde die Tabelle, die sagt: "WENN du X tust, MUSST du Y lesen."
Identifiziere, in welcher Phase du bist.
Lies NUR die Datei, die zu deiner aktuellen Phase gehört.

### Schritt 3: Das Example lesen (PFLICHT)
Öffne die Datei aus dem `examples/` Ordner, die zu deiner Phase gehört.
Analysiere: Welche Sektionen hat es? Welche Formatierung? Welche Tiefe?
**Das Example ist das Ergebnis, das du liefern musst.** Nicht annähernd. Exakt.

### Schritt 4: Ausführen
Arbeite deine Phase ab. Vergleiche kontinuierlich mit dem Example.
Wenn du fertig bist: Vergleiche dein Ergebnis nochmal mit dem Example.
Wenn es abweicht: Korrigiere.

### Schritt 5: Zurück zur Matrix
Wenn deine Phase fertig ist, schaue in die Matrix: Was ist der nächste Schritt?
Wiederhole Schritt 2-4 für die nächste Phase.

---

## Zusammenfassung

| Falsch | Richtig |
|:---|:---|
| Alles in SKILL.md mergen | SKILL.md als Router nutzen, Templates/Examples separat lassen |
| Alles von vorne lesen | Bedingungs-Matrix folgen, nur das Nötige lesen |
| Examples ignorieren | Examples als "Definition of Done" behandeln |
| Ergebnis raten | Ergebnis mit Example vergleichen |
| "Ich bin fertig" sagen | "Mein Ergebnis erfüllt die Kriterien des Examples" sagen |
