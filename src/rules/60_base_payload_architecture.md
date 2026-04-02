# 60. BASE PAYLOAD ARCHITECTURE

**Scope:** Nur diese Control Node. Siehe Rule 30.

**Gesetz:** `templates/base_payload/` wird NIEMALS 1:1 blind in ein Repo kopiert.

**Workflow:**
1. Recon: Ziel-Repo analysieren (Tech-Stack, Black Holes).
2. Adapt: `opencode.jsonc` anpassen (watcher.ignore, instructions, Linter). Proactive Shielding beibehalten.
3. Speichern: Ergebnis in `deployments/<typ>/` ablegen (wiederverwendbare Vorlage).
4. Deploy: Aus `deployments/<typ>/` ins Ziel-Repo kopieren.

**Deployment-Stacks:** `deployments/generic/` (unbekannt), `deployments/python-fastapi/`, `deployments/react-vite/`. Siehe `deployments/README.md`.
