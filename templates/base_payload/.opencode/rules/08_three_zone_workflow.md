# Workflow: The 3-Zone Execution Architecture

## 1. Das Konzept
Um "Context Bloat" und versehentliche Destruktion von Live-Code zu verhindern, arbeitet der Orchestrator strikt im 3-Zonen Modell:
1. **Brain:** Informationsbeschaffung und Planung (Read-Only).
2. **Drafts:** Die isolierte `_TASKS/` Zone. Hier wird "schmutzig" experimentiert und Skripte entwickelt, ohne den Live-Code zu gefährden.
3. **Original:** Erst wenn ein Draft das Approval Gate passiert hat, wird der finale, saubere Code in das produktive Verzeichnis (z.B. `src/`) oder das Ziel-Repo kopiert.

## 2. Der Task Envelope (`_TASKS/`)
Jede komplexe Operation beginnt mit der Erstellung eines "Task Envelopes" (z.B. `_TASKS/001_feature_xyz/`). 
*   **Isolation:** Dieser Ordner ist die Werkbank. 
*   **Schutz:** Das System (Tree-sitter) ignoriert diesen Ordner (via `.opencodeignore`), damit Brainstorming-Müll nicht das Kontextfenster nachfolgender Agenten vergiftet.

## 3. Begründung der Erstellung (Meta-Kontext)
*Erstellt aus der Erfahrung der Ground0-Analyse, bei der KIs Live-Dateien zerschossen haben, weil sie "in-place" editierten, anstatt Drafts anzufertigen.*