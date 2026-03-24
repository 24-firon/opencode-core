> **Zielgruppe:** Orchestrator
> **Scope:** Global (Architektur)
> **Härtegrad:** Non-Negotiable (Immer prüfen vor Task-Start)

> **Regel-Zweck:** Definiert, WANN der Agent WELCHEN isolierten Workflow laden muss, um Context-Bloat im globalen System-Prompt zu verhindern.

# 🛑 CRITICAL RULE: WORKFLOW ROUTING POLICY

## 1. Das Prinzip der Trennung (Rules vs. Workflows)
Ein wesentliches Architektur-Prinzip von OpenCode und Viron ist die strikte Trennung von **Regeln** (Grenzen, Verbote, always_on) und **Workflows** (Exakte Handlungsanweisungen, On-Demand).
- **Rules:** Werden permanent im Kontext gehalten (via `opencode.json` -> `customInstructions`).
- **Workflows:** Werden NUR geladen, wenn eine spezifische Aufgabe ansteht.

## 2. Der Router (Wann lade ich was?)
Wenn du vom Operator eine Aufgabe erhältst, prüfe diese Matrix, BEVOR du mit der Arbeit (oder dem Schreiben von Skripten) beginnst:

| Trigger / Aufgabe des Operators | Zu ladender Workflow (Pfad / Skill) |
| :--- | :--- |
| "Mach einen Speicherpunkt", "Committe das", "Feature abschließen" | `workflow_git_savepoint.md` (als Skill oder `cat`/`read` auf die Datei) |
| "Setze das neue Repo auf", "Schirme das Repo ab" | `00_proactive_shielding_workflow.md` (Die Firewall einrichten) |
| "Räume das defekte Repo auf" | `00_iterative_deep_clean.md` (The Crime Scene Cleanup) |

## 3. Die Ausführung (The Pull-Mechanism)
- Lade den Workflow NIEMALS aus dem Gedächtnis! Halluziniere keine Schritte.
- Nutze dein Lese-Werkzeug (`read` oder `cat`), um die exakte Workflow-Datei in den Kontext zu ziehen, sobald der Trigger auslöst.
- Folge dem Workflow dann streng sequenziell (Phase 1, Phase 2, etc.). Kein Überspringen von Cleanups.
