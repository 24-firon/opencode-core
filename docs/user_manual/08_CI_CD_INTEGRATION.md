# 🔄 Kategorie 8: GitHub & GitLab Integration (CI/CD)

### 🎯 Worum geht es?
Du musst nicht warten, bis ein Entwickler OpenCode auf seinem Laptop startet. Du kannst OpenCode direkt in eure **GitHub Actions** oder **GitLab Pipelines** einbauen. Der Agent wird dann unsichtbar im Hintergrund aktiv, sobald bestimmte Dinge in eurem Code-Repository passieren (z. B. wenn jemand einen Pull Request eröffnet oder einen Kommentar schreibt).

### 🚀 Dein Enterprise-Vorteil
* **Automatisches Code-Review:** Sobald ein Mitarbeiter Code einreicht (Pull Request), wacht der Agent auf, liest den Code, sucht nach Sicherheitslücken und schreibt Kommentare direkt in die Datei – genau wie ein Senior Developer.
* **Der Slack-Bot für Git:** Entwickler können den Agenten in GitHub-Issues einfach mit `@opencode` markieren und ihm Aufgaben geben (z. B. "Bitte schreib einen Fix für diesen Bug"). Der Agent antwortet mit einem fertigen Code-Entwurf.
* **Proaktive Nachtschichten:** Du kannst einen "Cron-Job" (Zeitplan) einrichten. Der Agent wacht z. B. jeden Samstag um 2:00 Uhr nachts auf, sucht im gesamten Code nach `TODO:` Kommentaren und versucht, diese abzuarbeiten.

---

### 📊 Matrix: Wann wacht der CI-Agent auf? (Trigger)
*Welches Event löst welche KI-Aktion aus?*

| Event-Trigger | Was passiert? | Typischer Anwendungsfall |
| :--- | :--- | :--- |
| **`issue_comment`** | Jemand erwähnt `@opencode` im Chat. | "Fixe diesen Bug für mich." |
| **`pull_request`** | Jemand reicht neuen Code ein. | Automatisches Code-Review (Linter, Security). |
| **`schedule`** | Es ist 3:00 Uhr nachts. | Code-Wartung, Refactoring, veraltete Libraries updaten. |

---

### 💡 Die Coach-Ecke (Hintergrund & Best Practices)
> **Das Token-Problem bei Self-Hosted Runnern**
> Wenn du GitHub Actions nutzt, nutzt OpenCode standardmäßig das Token der installierten GitHub App. 
> **Die Falle:** Wenn deine Firma aus Sicherheitsgründen eigene, abgeschirmte Server ("Self-Hosted Runner") für die Pipelines nutzt, hat die App dort oft keine Rechte. 
> **Die Lösung:** Du musst OpenCode anweisen, das native Action-Token (`GITHUB_TOKEN`) der Pipeline zu nutzen, nicht das App-Token.

---

### 🔗 Meta-Ebene & Abhängigkeiten
* **Abhängig von:** [Kategorie 06: Headless Ops](./06_CLI_SERVER.md) (Da der Agent hier rein im Hintergrund ohne Oberfläche läuft).
* **Dateipfade:** GitHub-Workflows leben im Ordner `.github/workflows/`. GitLab in `.gitlab-ci.yml`.

---

### 📋 Prompt-Bibliothek (Copy & Paste für deine Agenten)

#### 1. Den Pull-Request Reviewer einrichten
*Lass den Agenten eine GitHub Action bauen, die neuen Code automatisch kontrolliert.*

```text
@build Bitte richte für uns einen automatischen Code-Reviewer über GitHub Actions ein.
Erstelle die Datei `.github/workflows/opencode-review.yml`.

Vorgaben für die Action:
1. Sie soll bei jedem neuen "pull_request" auslösen.
2. Nutze die Action "anomalyco/opencode/github@latest".
3. Verwende das Modell "anthropic/claude-sonnet-4-5".
4. Übergib folgenden fixen "prompt" an die Action:
   "Du bist ein Senior Reviewer. Prüfe diesen Pull Request auf Security-Lücken, Performance-Probleme und schlechten Code-Style. Schreibe nur Kommentare, wenn du echte Probleme findest."
```

#### 2. Das Chat-Bot Feature aktivieren (Mention-Trigger)
*Erlaubt es dem Team, den Agenten direkt in GitHub Issues mit Fragen zu löchern.*

```text
@build Wir wollen OpenCode wie einen Kollegen in GitHub anpingen können.
Erstelle die Datei `.github/workflows/opencode-chat.yml`.

Vorgaben:
1. Löse die Action bei den Events "issue_comment" und "pull_request_review_comment" aus.
2. Nutze wieder die "anomalyco/opencode/github@latest" Action.
3. WICHTIG: Setze KEINEN harten "prompt" in der Action, da der Agent auf den tatsächlichen Kommentar des Users reagieren soll.
```

#### 3. GitLab Duo für Self-Hosted Server konfigurieren
*Wenn eure Firma GitLab auf eigenen Servern betreibt.*

```text
@build Wir nutzen eine Self-Hosted GitLab Instanz und wollen OpenCode in die CI/CD Pipeline hängen.
Bitte dokumentiere für mich (oder baue ein `.env` Template) die 3 kritischen Environment-Variablen, die wir im Runner setzen müssen.

Fokus:
- GITLAB_INSTANCE_URL
- GITLAB_AI_GATEWAY_URL (falls wir ein eigenes Gateway haben)
- Die Blockade von Fallback-Modellen (share: disabled), damit keine Daten an OpenCode Zen fließen.
```
