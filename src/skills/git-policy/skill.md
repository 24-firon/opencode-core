---
name: git-policy
description: |
  Lade diesen gesamten Skill IMMER, wenn du einen git commit, git push, git reset oder andere Versionskontroll-Aktionen durchführst.

  MANDATORY SYSTEM RULE - READ IMMEDIATELY:
  1. Ordner .claude, .agent, .gemini NIEMALS berühren, lesen oder löschen.
  2. Dein Arbeitsbereich ist NUR .opencode und der Produktivcode.
  3. Nutze immer absolute Pfade für read/write. Grep statt Guessing.
  4. Nutze das task-Tool für komplexe Jobs.
  5. Stoppe und frage nach Erlaubnis vor destruktiven Bash-Befehlen (rm, drop).
---

# 🛑 CRITICAL RULESET: GIT SAFETY & COMMIT PROTOCOL

## 1. GITHUB ACCOUNT AUTHENTICITY (2 SEPARATE ACCOUNTS)
- **Standard-Account:** `24-firon` (MIT Bindestrich). Jede andere Schreibweise ist FALSCH.
- **Externer Account:** `24Firon` (OHNE Bindestrich, CamelCase). Dies ist ein anderer, separater Account und darf NIEMALS for Standard-Operationen dieses Projekts genutzt werden.
- **Regel:** Bei allen Git-Operationen (Origin-URL, User-Config, SSH-Auth) ist EXAKT auf die Schreibweise `24-firon` zu achten. Eine Verwechslung führt zu Fehlern in der Rechtestruktur und im organisatorischen Kontext.

## 2. 🛑 NON-NEGOTIABLE
- **Double-Turn-Lock:** Verify nobody else is pushing to this branch. Niemals write und git commit im selben Turn kombinieren.
- **Safety-Lock:** NEVER run destuctive commands (`reset --hard`, `clean -fd`) without `force_override` auth.
- **Commit Mandate:** You MUST offer a commit after every Task/Deliverable.

## 3. DAS COMMIT-BUDGET
- **Maximum:** Max. 5 logische Tool-Calls oder 1 Milestone-Block → Commit-Pflicht.
- Danach: `git add -A && git commit -m "..."` — **ohne Ausnahme**.
- **Begründung:** Ohne regelmäßige Git-Anker wird der Diff unleserlich, Rollback unmöglich, und das "Was hat der Agent eigentlich getan?" nicht nachvollziehbar.

## 4. 🛡️ ZERO-TOLERANCE COMMIT FORMAT (CONVENTIONAL COMMITS)
- **Rule:** All commits MUST strictly follow the Conventional Commits specification.
- **Format:** `<type>[optional scope]: <description>`
- **Forbidden:** Emojis in commit messages.
- **Forbidden:** Vague terms like update, fix, change, modify, wip, misc.
- **Forbidden:** Meta-comments or conversational text before/after the commit output (e.g., "Hier ist der Commit:"). Output ONLY the exact Git commit message block.
- **Mandatory:** `git diff --cached` MUST be run and reviewed prior to the commit to ensure no secrets or unintended files are staged.
- **Secret-Check (Pflicht):** Vor JEDEM Commit: `git diff --cached | grep -iE '(api_key|password|token|secret)'` ausführen. Das Ergebnis MUSS leer sein.
