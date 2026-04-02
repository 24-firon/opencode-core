# Rule: Repo Architecture — Source, Live, Deployment

> **Scope:** Nur diese Control Node (opencode-core).
> **NICHT relevant für:** Ziel-Repos, die nur den Payload empfangen.

---

## Die 3-Schichten-Logik

Dieses Repo **verwaltet** Regeln und Skills für andere Repos. Es ist NICHT ein normales Anwendungs-Repo.

| Schicht | Ordner | Zweck | Wer nutzt das? |
|:---|:---|:---|:---|
| **SOURCE** | `src/rules/`, `src/skills/`, `src/config/` | Die Wahrheit. Master-Regeln und Skills. | Wird kopiert — niemand liest direkt. |
| **LIVE** | `.opencode/rules/`, `.opencode/skills/` | Was DIESER Agent hier befolgt. | Der laufende Agent in dieser Session. |
| **DEPLOYMENT** | `deployments/<typ>/` | Konfigurierte Stacks für verschiedene Repo-Typen. | Wird ins Ziel-Repo kopiert. |

---

## Das Gesetz

1. **Meta-Regeln** (Regeln über Regeln, z.B. diese hier, Rule 00, Rule 80-82) leben NUR in `.opencode/rules/`. Sie werden NIEMALS in Ziel-Repos deployed.
2. **Technische Regeln** (Code-Style, Git-Workflow, Testing) leben in `src/rules/` UND `.opencode/rules/`.
3. `src/` ist die Quelle der Wahrheit. `.opencode/rules/` kann davon abweichen (Live-Anpassungen für diese Session).
4. **Deployment-Stacks** in `deployments/` enthalten nur, was das Ziel-Repo braucht. Nicht mehr.
5. **Nie mischen:** Die eigenen Live-Regeln sind NICHT die Deploy-Regeln. Ein Ziel-Repo braucht nicht unsere Meta-Regeln über Skill-Routing oder Repo-Architektur.

---

## Workflow: Neue Regel erstellen

| Schritt | Wo | Warum |
|:---|:---|:---|
| 1. Regel schreiben | `src/rules/<nr>_<name>.md` | Quelle der Wahrheit. |
| 2. Prüfen: Braucht DIESER Agent die Regel? | — | Entscheidung. |
| 3a. Falls JA | Kopiere nach `.opencode/rules/` | Agent befolgt sie live. |
| 3b. Falls NEIN | Bleibt nur in `src/rules/` | Für Deployment-Stacks. |
| 4. Prüfen: Gehört die Regel in einen Deployment-Stack? | — | Entscheidung. |
| 4a. Falls JA | Passe sie an und kopiere in `deployments/<typ>/.opencode/rules/` | Ziel-Repo bekommt sie. |

---

## Ordnerstruktur

```
src/
├── rules/          ← Master-Regeln (alle 20+)
├── skills/         ← Master-Skills (alle 19)
└── config/         ← JSON-Schema-Referenz

deployments/
├── README.md       ← Routing-Tabelle: Welcher Typ bekommt was?
├── generic/        ← Basis-Stack für unbekannte Repos
├── python-fastapi/
└── react-vite/

.opencode/rules/    ← Live-Regeln (dieser Agent)
.opencode/skills/   ← Live-Skills (dieser Agent)
```

---

## Was NIEMALS deployed wird

| Regel | Warum nicht |
|:---|:---|
| 00_master_orchestrator_directive.md | Identität der Control Node — nicht relevant für Ziel-Repos. |
| 13_forensic_analyst_mandate.md | Mindset der Control Node. |
| 30_repo_architecture.md (diese hier) | Beschreibt dieses Repo — nicht relevant für andere. |
| 80-82 Skill-Philosophie/Anatomie/Checklist | Skill-Erstellung ist Sache der Control Node. |
| 86_skill_construction_law.md | Skill-Erstellung ist Sache der Control Node. |
