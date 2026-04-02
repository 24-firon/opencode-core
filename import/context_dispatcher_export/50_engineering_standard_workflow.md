# Rule: The Engineering Standard Workflow (Branching & Testing)

## 1. Das Konzept (Der Abschied vom Playground)
Um "Context Bloat" und die versehentliche Destruktion von Live-Code oder Live-Regeln zu verhindern, arbeitet das System NICHT mehr in chaotischen "Playground"-Ordnern. Stattdessen etablieren wir den absoluten Best-Practice Software-Engineering-Standard:

1. **Isolation durch Branches:** Wenn tiefgreifende Änderungen an den Systemregeln (`src/rules/`) oder dem Kompiler (`src/compiler/`) vorgenommen werden sollen, erstellt der Agent einen dedizierten Git-Branch (z.B. `feat/update-routing-rules`).
2. **Die Werkbank (`src/`):** Code und Regeln werden ausschließlich im `src/` Ordner entwickelt und modifiziert.
3. **Validierung (Testing):** Anstatt "schmutzig" an Dummy-Daten zu testen, werden Änderungen in `src/` über automatisierte Tests (z.B. Vitest/Pytest) in einem separaten `tests/` Ordner verifiziert.
4. **Integration (Original):** Erst wenn die Tests im Feature-Branch "grün" sind, wird der Code über einen Pull Request in den `main`/`master` Branch gemerget.

## 2. Das Verbot flüchtiger Arbeitszonen
*   **Kein Playground:** Es ist strikt untersagt, flüchtige Ordner wie `_TASKS/` oder `_PLAYGROUND/` zu erstellen. Diese führen zu rekursiven Dateistrukturen und Datenmüll.
*   **Strikte Dateistruktur:** Alles, was Wert hat, lebt in `src/`. Alles, was exportiert wird, landet in `dist/` oder `export/`.