# AGENTS.md — OpenCode Control Node

> **Gilt permanent.** Diese Datei definiert, was dieses Repo ist und wie es funktioniert.
> Sie wird bei jedem Session-Start automatisch geladen.

---

## Was ist dieses Repo?

`opencode-core` ist die **Control Node** — sie verwaltet Regeln und Skills für andere Repos.
Sie ist NICHT ein normales Anwendungs-Repo. Sie ist das Werkzeug, das andere Repos mit KI-Infrastruktur ausstattet.

---

## Ordnerstruktur

```
Root (/)
├── AGENTS.md                   ← Diese Datei (permanent aktiv)
├── REPO_BRIEFING.md            ← Detailierte Übersicht
├── RULE_REGISTRY.md            ← Router für alle Regeln (BOOT/WORKFLOW/KNOWLEDGE)
├── opencode.jsonc              ← V3 Konfiguration
│
├── src/                        ← QUELLE: Master-Regeln und Skills
│   ├── rules/                  ← Die Wahrheit. Wird kopiert, nicht direkt gelesen.
│   ├── skills/                 ← Master-Skills
│   └── config/                 ← JSON-Schema-Referenz
│
├── deployments/                ← Konfigurierte Stacks für Repo-Typen
│   ├── README.md               ← Routing: Welcher Typ bekommt was?
│   ├── generic/                ← Basis-Stack für unbekannte Repos
│   ├── python-fastapi/         ← Python/FastAPI-Repos
│   └── react-vite/             ← React/Vite-Frontend
│
├── .opencode/                  ← LIVE: Was DIESER Agent hier befolgt
│   ├── rules/                  ← Aktive Regeln (auto-geladen)
│   └── skills/                 ← Aktive Skills
│
├── templates/                  ← Der Goldstandard (base_payload)
├── docs/                       ← Wissen, Prompts, Learnings, RAG-Cluster
├── import/                     ← Import & Export (Context Dispatcher Export)
└── playground/                 ← Sandbox für Entwürfe
```

---

## Die 3-Schichten-Logik (KERNREGEL)

| Schicht | Ordner | Zweck |
|:---|:---|:---|
| **SOURCE** | `src/` | Die Wahrheit. Master-Regeln. Wird kopiert. |
| **LIVE** | `.opencode/rules/` | Was DIESER Agent befolgt. |
| **DEPLOYMENT** | `deployments/` | Konfigurierte Stacks für Ziel-Repos. |

**Gesetz:** Meta-Regeln (Regeln über Regeln) leben NUR in `.opencode/rules/`. Sie werden NIEMALS deployed.
Ziel-Repos brauchen keine Regeln darüber, wie man Regeln verwaltet.

Details: Siehe Rule 30 (`30_repo_architecture.md`).

---

## Grundregeln (permanent)

1. **Integrität vor Kompression.** Keine `//...` oder `etc.` in Code-Übernahmen.
2. **Grep, don't guess.** Bei Unsicherheit: `grep` statt erfinden.
3. **Safety over Obedience.** Destruktive Befehle erst nach Reversibilitätsprüfung.
4. **Double-Turn-Lock.** `write` und `git commit` nie im selben Turn.
5. **Meta-Regeln deployed man nicht.** Regel 00, 30 bleiben hier.

Details: Siehe Rule 10 (`10_local_dev_standards.md`).

---

## Routing

| Was du tun willst | Wo du hin musst |
|:---|:---|
| Regel schreiben | `src/rules/` (Quelle), dann ggf. nach `.opencode/rules/` kopieren |
| Ziel-Repo bestücken | `deployments/<typ>/` anpassen, dann ins Ziel-Repo kopieren |
| Skill nutzen | `skill({name: "..."})` laden |
| Wissen nachschlagen | `docs/opencode_knowledge/` oder `RULE_REGISTRY.md` |
| Session-Status prüfen | `docs/SESSION_HANDOVER.md` + `docs/TASK_LIST.md` |
