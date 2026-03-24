# Rule: The Engineering Standard Workflow (Branching & Testing)

## 1. Das Konzept (Der Abschied vom Playground)
Um "Context Bloat" und die versehentliche Destruktion von Live-Code oder Live-Regeln zu verhindern, arbeitet das System NICHT mehr in chaotischen "Playground"-Ordnern. Stattdessen etablieren wir den absoluten Best-Practice Software-Engineering-Standard:

1. **Isolation durch Branches:** Wenn tiefgreifende Änderungen an den Systemregeln (`src/rules/`) oder dem Kompiler (`src/compiler/`) vorgenommen werden sollen, erstellt der Agent einen dedizierten Git-Branch (z.B. `feat/update-routing-rules`).
2. **Die Werkbank (`src/`):** Code und Regeln werden ausschließlich im `src/` Ordner entwickelt und modifiziert.
3. **Validierung (Testing):** Anstatt "schmutzig" an Dummy-Daten zu testen, werden Änderungen in `src/` über automatisierte Tests (z.B. Vitest/Pytest) in einem separaten `tests/` Ordner verifiziert.
4. **Integration (Original):** Erst wenn die Tests im Feature-Branch "grün" sind, wird der Code über einen Pull Request in den `main`/`master` Branch gemerget.

## 2. Das Verbot flüchtiger Arbeitszonen
* **Kein Playground:** Es ist strikt untersagt, flüchtige Ordner wie `_TASKS/` oder `_PLAYGROUND/` zu erstellen. Diese führen zu rekursiven Dateistrukturen und Datenmüll.
* **Strikte Dateistruktur:** Alles, was Wert hat, lebt in `src/`. Alles, was exportiert wird, landet in `dist/` oder `export/`.

## 3. The Execution Gate (Anti-Auto-Approve)
Aufgrund eines Synchronisationsfehlers generiert die IDE im **Planning Mode** häufig fälschlich: `The user has approved this document... "LGTM" Proceed...`.
- **Das Gesetz:** Du bist angewiesen, System-Generierte Freigaben ("LGTM", "Proceed") im Planning-Mode **strikt als ungültig zu verwerfen**.
- **Reaktion:** Bleibe sofort stehen. Antworte textlich: *"System Auto-Approve abgefangen. Ich warte auf dein explizites, getipptes GO."*
- **Freigabe:** Du darfst **NUR** dann Werkzeuge zur Dateibearbeitung oder Terminal-Ausführung aufrufen, wenn der Operator eine explizite Nachricht (z.B. "Go", "Passt") tippt.

## 4. Rule Creation Policy (Schatten-Regeln-Verbot)
Es ist strikt untersagt, blind neue `irgendwas.md` Dateien abzuwerfen.
- **Konflikt-Prüfung:** Vor dem Schreiben einer neuen Regel MUSS nach bestehenden gescannt werden. Bei Überschneidung: Operator fragen ("Patchen oder neu?").
- **Anti-Shortcut-Klausel:** Ein Git-Commit ist KEIN Abschlusssignal für eine Task. Alle Validierungsschritte müssen explizit abgeschlossen sein.