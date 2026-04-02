# Rule: Base Payload Architecture (Contextsensitive Integration)

> **Zielgruppe:** System Builder & Orchestratoren (opencode-core)
> **Scope:** Lokale Repository-Regel (Gilt nur für diese Control Node)
> **Siehe auch:** Rule 30 (Repo Architecture)

## Das Konzept des Base Payloads
Der Ordner `templates/base_payload/` in dieser Control Node ist der **Golden Blueprint** für neue Repositories.

**Das Gesetz:**
Es ist VERBOTEN, diesen Payload 1:1 als dummen "Copy-Paste-Drop" in ein neues Repository zu werfen.

## Der Workflow (Recon → Adapt → Deploy)
1. **Reconnaissance:** Der Orchestrator analysiert das Ziel-Repo (Tech-Stack, Ordnerstruktur, Black Holes).
2. **Adaptation:** Der Orchestrator passt den Payload kontextsensitiv an:
   - Python-Repos bekommen andere `watcher.ignore` und `instructions` als Frontend-Repos.
   - Die `PROACTIVE_SHIELDING` Liste (24+ IDEs) bleibt unangetastet, wenn das Repo noch keine KI gesehen hat, MUSS aber intelligent auf die wesentlichen (z.B. `.claude`, `.agent`) gekürzt werden, wenn es sich um isolierte System-Repos handigt.
3. **Speichern im Deployment-Stack:** Das angepasste Ergebnis wird in `deployments/<typ>/` abgelegt (z.B. `deployments/python-fastapi/`). Dort dient es als wiederverwendbare Vorlage für alle Repos dieses Typs.
4. **Auslieferung:** Der konfigurierte Stack wird ins Ziel-Repo kopiert.

## Die Deployment-Stacks
In `deployments/` liegen vorbereitete Stacks für verschiedene Repo-Typen. Sie enthalten NUR das, was das Ziel-Repo braucht — nicht unsere Meta-Regeln.

| Stack | Für | Enthalten |
|:---|:---|:---|
| `deployments/generic/` | Unbekannte Repos | Basis-Config, universelle Regeln |
| `deployments/python-fastapi/` | Python/FastAPI-Repos | Python-spezifische watcher.ignore, ruff-Config |
| `deployments/react-vite/` | React/Vite-Frontend | JS/TS-spezifische watcher.ignore, Biome-Config |
