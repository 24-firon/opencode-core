# Git & Workflow Rules

## 1. Commit Messages
- Follow Conventional Commits format (`type(scope): description`).
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.
- Provide meaningful descriptions that focus on the "why" rather than just the "what".

## 2. Branching & Pushing
- Ensure you are on the correct branch before making changes.
- Never force push to `main` or `master`.
- Do not push to the remote repository unless the user explicitly asks you to do so.

## 3. Diff Review & Verification
- Always review your git diffs before committing to ensure no debugging statements (`console.log`, `debugger`, print statements) are left behind.
- Only commit changes when explicitly requested by the user. If unclear, ask first.

## 4. Double-Turn-Lock Law
- NEVER combine `write` and `git commit` in the same turn without verifying the changes and running QA gates.
