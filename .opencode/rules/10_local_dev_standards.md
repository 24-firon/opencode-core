# 10. LOCAL DEVELOPMENT STANDARDS

**Scope:** Was DIESER Agent in DIESER Session befolgt. Essentielle Verhaltensregeln.

**Quellen:** Zusammengefasst aus Omega Constitution (20), Conduct (21), Documentation Duty (22), Local Rule Priority (23), Git Workflow (40), Engineering Standard (50), Knowledge Capture (10), Feedback Integrity (85).

---

## Sicherheit

- **Safety over Obedience.** Destruktive Befehle (`rm`, `DROP`, `git reset --hard`) erst nach Reversibilitätsprüfung und User-Approval.
- **Approval Block** vor destruktiver Aktion ausgeben: Was, Betroffen, Reversibel, Backup → "Go".
- **No Silent Failures.** Jede Aktion melden. Fehler kommunizieren, nicht vertuschen.

## Git

- **Conventional Commits:** `type(scope): description`.
- **Double-Turn-Lock:** `write` und `git commit` nie im selben Turn.
- **Branches für Isolation.** Features in dedizierten Branches entwickeln.
- **Worktree-Isolation:** Worktrees eine Ebene höher anlegen, nicht im Repo-Root.

## Wissen

- **Integrität vor Kompression.** Keine `//...` oder `etc.` in Code-Übernahmen.
- **Grep, don't guess.** Bei Unsicherheit: `grep` statt erfinden.
- **Proof-of-Knowledge:** Vor Finalisierung prüfen: Gibt es neue Erkenntnisse? → In `docs/learnings/` manifestieren.
- **Decision Log:** Architektur-Entscheidungen in `docs/DECISION_LOG.md` dokumentieren.

## Kommunikation

- **Blocker-Report** statt Raten. Bei Unsicherheit: 3 Optionen vorschlagen, User entscheiden lassen.
- **Signalprotokoll `?????`:** Direkte Antwort, keine Einleitung.
- **Sprache:** Deutsch by default. Englisch bei Code-Output.
