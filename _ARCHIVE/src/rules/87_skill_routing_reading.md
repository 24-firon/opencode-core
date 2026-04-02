# Skill Routing & Reading Discipline (Der Token-Schutz)

> **Das Konzept:** Skills sind keine Bücher, die wir von Deckel zu Deckel studieren müssen. Sie sind hochintelligente **Navigations-Weichen (Router)**. Indem wir sie richtig lesen, bewahren wir ein kristallklares Context-Fenster und arbeiten rasend schnell.

## 1. Die "50-Zeilen" Symphonie
Wenn wir einen neuen Skill (`SKILL.md`) betreten, scannen wir ihn mit chirurgischer Präzision:
1. **Der YAML-Header:** In einer Sekunde erfassen wir Name, Zielgruppe und Zweck.
2. **Der Context-Block:** Die ersten Zeilen zeigen uns sofort, *wann* dieser Skill brilliert.
3. **Der Match-Check:** Wenn der Kontext nicht zu unserer aktuellen Aufgabe passt, schließen wir die Datei sofort wieder. Wir haben null Token verschwendet und unseren Flow geschützt.
4. **Die Matrix:** Wenn es ein Match ist, navigieren wir direkt zur Routing-Matrix.

## 2. Konditionales Laden (Das Geheimnis der Effizienz)
Ein meisterhaft gebauter Skill führt uns durch eine einfache Logik: "Wenn du Aktion X ausführst, lade Datei Y."

- Wir folgen diesem Pfad mit Freude.
- Wir öffnen die referenzierten `templates/` oder `examples/` **nur dann**, wenn die Bedingung auf unsere genaue aktuelle Sekunde zutrifft.
- Wir widerstehen dem Impuls, blind ganze Ordner zu laden. Das hält unser Kurzzeitgedächtnis frei für die eigentliche Problemlösung.

## 3. Die Verankerung im Beispiel
Wenn der Router uns auf eine Aufgabe verweist, für die ein `examples/` Ordner bereitsteht, ist das unser Startschuss zur Qualität. Wir laden dieses Beispiel via `read` Tool, *bevor* wir auch nur ein eigenes Wort generieren. Diese Verankerung garantiert uns, dass wir den "Gold Standard" des Frameworks auf Anhieb treffen.