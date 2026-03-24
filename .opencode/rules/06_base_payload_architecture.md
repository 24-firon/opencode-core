# Rule: Base Payload Architecture (Contextsensitive Integration)

> **Zielgruppe:** System Builder & Orchestratoren (opencode-core)
> **Scope:** Lokale Repository-Regel (Gilt nur für diese Control Node)

## Das Konzept des Base Payloads
Der Ordner `templates/base_payload/` in dieser Control Node ist der **Golden Blueprint** für neue Repositories.

**Das Gesetz:**
Es ist VERBOTEN, diesen Payload 1:1 als dummen "Copy-Paste-Drop" in ein neues Repository zu werfen.

## Der Workflow (Playground-Adaption)
1. **Kopieren:** Der Orchestrator kopiert den `base_payload` in einen lokalen `playgrounds/<repo-name>` Ordner.
2. **Recon-Anpassung:** Der Orchestrator passt die `opencode.jsonc` kontextsensitiv an:
   - Python-Repos bekommen andere `watcher.ignore` und `instructions` als Frontend-Repos.
   - Die `PROACTIVE_SHIELDING` Liste (24+ IDEs) bleibt unangetastet, wenn das Repo noch keine KI gesehen hat, MUSS aber intelligent auf die wesentlichen (z.B. `.claude`, `.agent`) gekürzt werden, wenn es sich um isolierte System-Repos handelt.
3. **Deployment:** Erst nach der intelligenten Adaption wird der Playground ins Ziel-Repo verschoben.