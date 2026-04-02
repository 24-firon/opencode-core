# Cluster 08: GitHub & GitLab Integration

Dieses Cluster fokussiert sich auf die Ausführung von OpenCode innerhalb von CI/CD Pipelines und das Scannen/Triage von Issues und Pull Requests auf den beiden größten Git-Plattformen.

## 1. GitHub Actions Integration
OpenCode kann als nativer Agent innerhalb von GitHub Actions laufen und asynchron auf Events reagieren.
*   **Setup:** `opencode github install` oder manuelles Setup der GitHub App (`github.com/apps/opencode-agent`).
*   **Workflow-File:** `.github/workflows/opencode.yml`.
*   **Token-Handling:** OpenCode nutzt standardmäßig das Installation Token der GitHub App. Man kann aber auch das native Action Runner Token nutzen (wichtig für Self-Hosted Runner ohne App-Installationsrechte).

### Relevante Workflow Events
Agenten können durch verschiedene Trigger aufgeweckt werden:
*   `issue_comment` / `pull_request_review_comment`: Reagiert auf `/opencode` oder `/oc` Mentions. Liest den Kontext der spezifischen Code-Zeile (`pull_request_review_comment` inkludiert Diff und Zeilennummern).
*   `issues` / `pull_request`: Automatisches Triage bei Neu-Erstellung.
*   `schedule` / `workflow_dispatch`: Headless Cron-Jobs (z.B. wöchentlicher Scan nach TODO-Kommentaren). *Wichtig:* Hier MUSS der `prompt`-Parameter im Workflow übergeben werden, da es keinen User-Kommentar gibt.

### Custom Prompts im Workflow
Die Orchestrierung lässt sich durch dedizierte Prompts pro Workflow anpassen:
```yaml
- uses: anomalyco/opencode/github@latest
  with:
    model: anthropic/claude-sonnet-4-5
    prompt: |
      Review this pull request:
      - Check for code quality issues
      - Look for potential bugs
```

## 2. GitLab Integration
OpenCode kann auch in GitLab CI/CD Pipelines laufen.
*   **GitLab CI Component:** `nagyv/gitlab-opencode` übernimmt das Boilerplate-Setup im `.gitlab-ci.yml`.
*   **GitLab Duo:** Direkte Integration durch Erwähnung von `@opencode` in Issues und Merge Requests. Benötigt GitLab Premium/Ultimate.

### GitLab Architektur (Self-Hosted)
Für Self-Hosted Instanzen müssen kritische Umgebungsvariablen in den Runner injiziert werden:
*   `GITLAB_INSTANCE_URL=https://gitlab.company.com`
*   `GITLAB_AI_GATEWAY_URL=https://ai-gateway.company.com` (falls ein internes Gateway betrieben wird)
*   `GITLAB_OAUTH_CLIENT_ID` für die Oauth App-Registrierung.

### Security Compliance (GitLab)
In restriktiven GitLab Umgebungen sollte der Fallback auf OpenCode Zen Modelle blockiert werden:
```jsonc
{
  "small_model": "gitlab/duo-chat-haiku-4-5",
  "share": "disabled"
}
```
Dadurch nutzt OpenCode auch für Metadaten-Generierung (wie Session-Titel) ausschließlich den firmeninternen GitLab Duo Provider.
