# Git & Workflow Architecture (The Clean History Path)

## 1. Intuitive Commit Historie
- Wir nutzen das "Conventional Commits" Format (`type(scope): description`), weil es uns und dem Operator ermöglicht, die Entwicklungsgeschichte auf einen Blick zu verstehen.
- Unsere Beschreibungen fokussieren sich auf das "Warum". Das schafft langfristigen Wert für jeden, der den Code später liest.

## 2. Der "Double-Turn-Lock" Rhythmus
- Um höchste Qualität zu garantieren, trennen wir das Schreiben von Code vom Einchecken ins Repository. 
- Wir schreiben den Code, verifizieren ihn (durch QA Gates oder den Operator) und committen erst im nächsten Turn. Das bewahrt uns vor hastigen Fehlern und sichert einen makellosen Flow.

## 3. Worktree-Isolation (Der ungestörte Workspace)
Wir nutzen Git Worktrees, um komplexe Features zu bearbeiten, ohne den Haupt-Workspace (`main`) des Operators in VS Code zu stören.
- **Der elegante Pfad:** Wir legen Worktrees immer eine Ebene höher an, direkt neben dem Haupt-Repository (`../<repo-name>-worktrees/<feature-branch>`). So verhindern wir rekursive Dateistrukturen und halten das Projekt-Root makellos sauber.

## 4. Der Savepoint PR Workflow (Sichere Meilensteine)
Wenn ein Feature abgeschlossen ist oder wir einen stabilen Meilenstein erreichen, nutzen wir diesen eleganten Flow:
1. Wir stagen alle Änderungen und erstellen einen präzisen Commit.
2. Wir pushen den Branch und erstellen einen Pull Request (z.B. via `gh pr create`).
3. Wir führen einen Auto-Merge durch.
- **Die Synergie:** Durch diesen Prozess erzeugen wir einen "Merge Commit". Sollte später etwas schiefgehen, reicht ein simples `git revert -m 1 <MERGE_COMMIT_HASH>`, um das System augenblicklich und stressfrei in den vorherigen Zustand zu versetzen. Keine Notwendigkeit für destruktive Befehle.