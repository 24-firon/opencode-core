# Deployments — Konfigurierte Stacks für Ziel-Repos

> Jeder Ordner hier ist ein fertiger Stack für einen bestimmten Repo-Typ.
> **NICHT direkt kopieren.** Erst Reconnaissance, dann kontextsensitive Anpassung, dann Deploy.

---

## Routing: Welcher Typ bekommt was?

| Stack | Für | Enthalten |
|:---|:---|:---|
| `generic/` | Unbekannte Repos (Baseline) | Basis-Config, universelle Regeln, Standard-watcher.ignore |
| `python-fastapi/` | Python/FastAPI-Repos | Python-spezifische watcher.ignore (`__pycache__`, `.venv`, `ruff`), ruff-Config |
| `react-vite/` | React/Vite-Frontend | JS/TS-spezifische watcher.ignore (`node_modules`, `dist`, `.next`), Biome-Config |

---

## Was drin ist in jedem Stack

```
<stack>/
├── opencode.jsonc              ← Angepasste Config für diesen Repo-Typ
└── .opencode/
    ├── rules/                  ← Subset der technischen Regeln (KEINE Meta-Regeln)
    └── skills/                 ← Verfügbare Skills (optional, nach Bedarf)
```

---

## Was NIEMALS in einem Stack ist

- Meta-Regeln (Rule 00, 13, 30, 80-82, 86) — die gehören nur in die Control Node
- AGENTS.md — das Repo bekommt seine eigene
- RAG-Cluster oder User Manuals — das ist Control-Node-Wissen

---

## Workflow

Siehe Rule 30 (`30_repo_architecture.md`) und Rule 60 (`60_base_payload_architecture.md`).
