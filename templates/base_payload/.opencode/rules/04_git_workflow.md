# Git & Workflow Rules

## 1. Commit Messages
- Follow Conventional Commits format (`type(scope): description`).
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.
- Provide meaningful descriptions that focus on the "why" rather than just the "what".
- No emojis, no vague terms like `update`, `fix`.

## 2. Branching & Pushing
- Ensure you are on the correct branch before making changes.
- Never force push to `main` or `master`.
- Do not push to the remote repository unless the user explicitly asks you to do so.

## 3. Diff Review & Verification
- Always review your git diffs before committing to ensure no debugging statements (`console.log`, `debugger`, print statements) are left behind.
- Only commit changes when explicitly requested by the user. If unclear, ask first.

## 4. Double-Turn-Lock Law
- NEVER combine `write` and `git commit` in the same turn without verifying the changes and running QA gates.

## 5. Worktree Isolation (Critical)
Worktrees are ALLOWED to not disturb the VS Code workspace, but must follow strict rules:
- **Verbot:** NEVER create worktrees in hidden folders (e.g., `.claude/worktrees`) or *inside* the project directory.
- **Pflicht-Ort:** Worktrees MUST be created one level higher, **next to** the main repository.
- **Format:** `../<repo-name>-worktrees/<feature-branch>`

## 6. GitHub Account Authenticity
- **Standard-Account:** `24-viron` (WITH hyphen).
- **External Account:** `24Viron` (WITHOUT hyphen). NEVER use for standard operations.
- Always check exact spelling `24-viron` for all Git operations.

## 7. Savepoint PR Workflow (Auto-Merge)
When a feature is complete or a savepoint is needed:
1. Stage all changes (`git add .`) and commit with Conventional Commit.
2. Push branch to origin.
3. Create Pull Request via GitHub CLI (`gh pr create`).
4. Auto-Merge immediately: `gh pr merge --merge --delete-branch`.
- **Why PR?** The merge commit allows instant rollback via `git revert -m 1 <MERGE_COMMIT_HASH>`.

## 8. Mandatory Cleanup & VS Code Sync
After an auto-merge:
1. Destroy worktree: `git worktree remove --force <path>` and `git worktree prune`.
2. Navigate back to primary main directory (VS Code sync).
3. Switch to main branch: `git checkout main`.
4. Pull: `git pull`.
5. Delete local feature branch: `git branch -d <branch-name>`.

## 9. Non-Negotiable Safety Locks
- **Double-Turn-Lock:** Verify nobody else is pushing to this branch.
- **Safety-Lock:** NEVER run destructive commands (`reset --hard`, `clean -fd`) without `force_override` auth.
- **Panik/Fehler:** NIE `git reset --hard`, IMMER `git revert -m 1`.
