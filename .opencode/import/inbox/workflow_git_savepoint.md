> **Zielgruppe:** Ausführender Coder-Agent & Orchestrator
> **Scope:** Git Operations (Global)
> **Härtegrad:** Strict Workflow (Muss exakt in dieser Reihenfolge ausgeführt werden, wenn ein Savepoint angefordert wird).

> **Regel-Zweck:** Standard Protocol for Git Commits (Savepoint PR & Auto-Merge)

Ich brauche jetzt einen harten Speicherpunkt (Pull Request mit sofortigem Auto-Merge) für meine aktuellen Änderungen.

Gehe hochgradig systematisch vor und halte dich an diese strikten Regeln:

### PHASE 1: INTELLIGENTE ANALYSE (Nur gucken, nicht anfassen)

1. Führe `git status` aus, um meine Änderungen und den aktuellen Branch zu sehen.
2. Führe `git branch` und `git worktree list` aus. 
   - Wenn du komplexe, fremde Worktrees oder abweichende Feature-Branches entdeckst, STOPPE hier und frage mich, wie wir umgehen sollen.
   - Wenn das Repo sauber ist (wir arbeiten im Haupt-Ordner auf main/master oder einem klaren lokalen Branch), gehe zu Phase 2.
3. (**Optional** WORKTREE ERSTELLUNG): Wenn du isoliert in einem Worktree arbeiten möchtest, MUSST du den Worktree physisch eine Ebene höher (neben dem Repo) erstellen:
   Format: `git worktree add ../<repo-name>-worktrees/<feature-branch>`
   Erstelle Worktrees NIEMALS im eigentlichen Repo oder in versteckten Ordnern. Wechsle danach in diesen neuen Pfad.

**VERBOTE (Sicherheits-Handschellen):**
- KEINE Worktrees: Erstelle keine versteckten `.claude` oder `.agents` Ordner. Arbeite exakt in diesem Verzeichnis.
- KEIN Löschen: Führe niemals `git clean`, `rm` oder Reset-Befehle aus.

### PHASE 2: DER SPEICHERPUNKT-ZYKLUS (Ausführung)

1. Erstelle einen neuen, temporären Branch für diesen Speicherpunkt (z.B. `savepoint/feature-name`).
2. Stage alles (`git add .`) und committe mit einer klaren Zusammenfassung (`git commit -m "feat: [Zusammenfassung]"`).
3. Pushe den Branch (`git push -u origin <branch-name>`).
4. Erstelle den Pull Request via GitHub CLI (`gh pr create --title "..." --body "..."`).
5. MERGE den Pull Request SOFORT automatisch via CLI: 
   `gh pr merge --merge --delete-branch` 
   (Dies erzeugt den gewünschten Merge-Commit als Speicherpunkt in der Historie).

### PHASE 3: LOKALER CLEANUP (VS Code Synchronisation)

1. **(Falls Worktree genutzt)**: Navigiere heraus und lösche den Worktree SOFORT:
   `git worktree remove --force <pfad-zum-worktree>`
   `git worktree prune`
   **Zwingend**: Navigiere zurück ins primäre Hauptverzeichnis (das in VS Code geöffnet ist).
2. Wechsle lokal zurück auf den Hauptbranch im regulären Repo (`git checkout main` oder `master`).
3. Ziehe den gerade gemergten Speicherpunkt herunter (`git pull origin main`).
4. Lösche den lokalen temporären Branch (`git branch -d <branch-name>`).

**Ziel:** Wenn du fertig bist, muss meine lokale VS Code Source Control absolut leer sein, ich bin auf dem aktuellen Hauptbranch, und der Speicherpunkt liegt sicher als Merge-Commit auf GitHub.
