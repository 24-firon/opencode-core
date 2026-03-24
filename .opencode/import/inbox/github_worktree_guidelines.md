> **Zielgruppe:** Ausführender Coder-Agent
> **Scope:** Global (Alle Repositories)
> **Härtegrad:** Hard Approval-Gate (Keine zerstörerischen Befehle ohne Override, strenges Worktree-Protokoll)

> **Regel-Zweck:** Zwingende Vorschriften für Pull Requests, Auto-Merges, Git-Sicherheit und die korrekte Orchestrierung von Git-Worktrees (Isolation, Cleanup).

# 🛑 CRITICAL RULESET: GIT LIFECYCLE, SYNC & WORKTREE ORCHESTRATION

## 1. Das Worktree-Sichtbarkeits- und Isolations-Gesetz
Worktrees SIND ERLAUBT, um den VS Code Workspace des Operators nicht zu stören, aber sie unterliegen strikten Regeln:
- **Verbot:** Erstelle NIEMALS Worktrees in versteckten Ordnern (z.B. `.claude/worktrees`) oder *innerhalb* des aktuellen Projektverzeichnisses (Sprengt den Kontextfenster bei Suchen!).
- **Pflicht-Ort:** Wenn du einen Worktree nutzt, MUSS er physisch eine Ebene höher, **neben** dem Hauptrepository erstellt werden. 
  *Format-Vorgabe:* `../<repo-name>-worktrees/<feature-branch>`

## 2. GitHub Account Authenticity
- **Standard-Account:** `24-viron` (MIT Bindestrich). 
- **Externer Account:** `24Viron` (OHNE Bindestrich). Darf NIEMALS für Standard-Operationen dieses Projekts genutzt werden.
- Bei allen Git-Operationen ist EXAKT auf die Schreibweise `24-viron` zu achten.

## 3. Der Speicherpunkt-Zyklus (Auto-Merge & PR)
Wenn ein Feature abgeschlossen oder ein Speicherpunkt erstellt werden soll:
1. **Sichern:** Stage alle Änderungen (`git add .`) und committe mit sauberem Conventional Commit (`<type>[optional scope]: <description>`). Keine Emojis, keine vagen Begriffe wie `update`, `fix`.
2. **Push:** Pushe den Branch zum Origin.
3. **Undo-Punkt (PR):** Erstelle den Pull Request via GitHub CLI (`gh pr create`).
4. **Auto-Merge:** Führe den PR sofort mit dem Hauptbranch zusammen und lösche den Remote-Branch: `gh pr merge --merge --delete-branch`.
*Warum PR statt Direct Merge?* Der erzeugte Merge Commit bündelt alles und erlaubt einen sofortigen Rollback per `git revert -m 1 <MERGE_COMMIT_HASH>`. 

## 4. Zwingender Cleanup & VS Code Sync
Nach einem Auto-Merge MUSS die Umgebung des Operators synchronisiert werden:
1. **Worktree vernichten:** `git worktree remove --force <pfad-zum-worktree>` und `git worktree prune`.
2. **VS Code synchronisieren (KRITISCH):** Navigiere zurück in das **primäre Hauptverzeichnis** des Operators.
3. **Pull & Cleanup:** Wechsle auf den Hauptbranch (`git checkout main`), lade den Stand herunter (`git pull`) und lösche den lokalen Feature-Branch (`git branch -d <branch-name>`).

## 5. Non-Negotiable Safety Locks
1. **Double-Turn-Lock:** Verify nobody else is pushing to this branch.
2. **Safety-Lock:** NEVER run destuctive commands (`reset --hard`, `clean -fd`) without `force_override` auth. Panik/Fehler bedeutet: NIE `git reset --hard`, IMMER `git revert -m 1`.
