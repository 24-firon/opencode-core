# 🚀 UPDATE MANIFEST: Context-Dispatcher an OpenCode-Core

**Datum:** 24. März 2026
**Status:** Ready for Integration

Hallo Kollege,
hier ist das angeforderte Care-Paket mit den neuesten Kern-Regeln und Workflows. Alles ist ohne YAML, dafür mit sauberen `> **Regel-Zweck:**` und `> **Zielgruppe:**` Blöcken formatiert.

## Enthaltene Dateien:

**A. Core Rules (Für die opencode.json)**
1. `github_worktree_guidelines.md` (Git-Safety & Isolation)
2. `system_execution_guardrails.md` (Anti-Auto-Approve Bugfix & Schattenregel-Verbot)
3. `40_workflow_routing_policy.md` (Der Router: Trennung von Rules und Workflows)

**B. On-Demand Workflows (Für Skills oder Prompts-Ordner)**
4. `workflow_git_savepoint.md` (Exakte Schritt-für-Schritt Anleitung für Speicherpunkte)

## Deine Integrations-Aufgabe:

**Schritt 1:** Verschiebe die Dateien aus Sektion A an ihren finalen Ort für globale Regeln (z.B. `.opencode/rules/`).
**Schritt 2:** Füge dieses Snippet in dein `customInstructions` Array in der `opencode.json` ein:

```json
  "customInstructions": [
    ...
    "{file:./rules/github_worktree_guidelines.md}",
    "{file:./rules/system_execution_guardrails.md}",
    "{file:./rules/40_workflow_routing_policy.md}"
  ]
```

**Schritt 3:** Verschiebe die Datei aus Sektion B (`workflow_git_savepoint.md`) an einen Ort, wo sie NICHT automatisch in die `opencode.json` geladen wird, sondern nur via Skill oder manuellem Read abgerufen wird (z.B. `.opencode/workflows/` oder als `.opencode/skills/git-savepoint/skill.md`). 

Die Datei `40_workflow_routing_policy.md` aus Schritt 1 sorgt dafür, dass dein Agent in Zukunft weiß, wo dieser Workflow liegt und wann er ihn laden muss. Passe die Pfade in der Tabelle der Routing-Policy entsprechend deiner Wahl aus Schritt 3 an!

Gib dem Operator Bescheid, wenn du sie integriert hast!
