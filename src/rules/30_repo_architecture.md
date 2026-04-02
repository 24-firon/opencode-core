# 30. REPO ARCHITECTURE — Source, Live, Deployment

**Scope:** Nur diese Control Node. Nicht relevant für Ziel-Repos.

**Die 3 Schichten:**
| Schicht | Ordner | Zweck |
|:---|:---|:---|
| SOURCE | `src/` | Master-Regeln & Skills. Wird kopiert. |
| LIVE | `.opencode/rules/` | Was DIESER Agent befolgt. |
| DEPLOYMENT | `deployments/<typ>/` | Konfigurierte Stacks für Ziel-Repos. |

**Gesetz:** Meta-Regeln (Regeln über Regeln, z.B. diese hier) leben NUR in `.opencode/rules/`. Sie werden NIEMALS deployed. Siehe `AGENTS.md` für die vollständige Ordnerstruktur.

**Workflow:** Neue Regel → `src/`. Braucht dieser Agent sie? → Kopiere nach `.opencode/rules/`. Gehört sie in einen Deployment-Stack? → Passe an und kopiere nach `deployments/<typ>/`.
