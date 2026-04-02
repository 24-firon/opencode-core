---
name: testing-protocols
description: QA-Pipelines, Tests, Linting, Syntax-Validierung und Definition of Done.
license: MIT
compatibility: opencode
metadata:
  audience: all-agents
  workflow: testing
---

# 🧪 Testing & Definition of Done Protocol

## 1. Die Definition of Done (Acceptance Gate)

Ein Task darf nur dann als "✅ Erledigt" markiert werden, wenn die physische Funktionalität auf dem Zielsystem verifiziert wurde. Ein Commit oder eine erfolgreiche Terminal-Ausgabe eines Skripts reicht NICHT aus.

**Verifikations-Pflichten vor dem Haken:**
1. **Health-Check ausführen:** Service-Endpoint (z.B. `/health`) oder Status (`systemctl is-active`) abfragen.
2. **Beweis sichern:** Ergebnis mit Zeitstempel in der task.md oder dem Walkthrough dokumentieren.
3. **Operator-Bestätigung:** Bei User-interaktiven Diensten explizit fragen: "Bitte teste [Dienst] und gib ein Go."

**Verbotene Zustände:**
- Markieren als "Erledigt" basierend auf "Annahme" oder "Sollte jetzt gehen".
- Ignorieren von `unhealthy` Status-Meldungen, nur weil die Logs gut aussehen.
- "Silent Passing": Tests, die grün zeigen, aber keine echte Logik prüfen.
- **Bruch dieser Regel gilt als "Halluzination der Fertigstellung" und führt zum sofortigen STOPP.**

## 2. Die QA-Pipeline (7 Gates)

Für JEDE Aufgabe, die übergeben wird, muss folgende Pipeline (manuell oder via MCP) durchlaufen werden:

```text
1. syntax_check       → Tree-sitter parse validation
2. placeholder_scan   → TODO/FIXME/stub detection (ZERO tolerance)
3. lint_check         → Linting mit --apply (ZERO errors)
4. build_check        → TypeScript/Kompilierung
5. security_scan      → SAST-Prüfung
6. test_run           → Unit tests + coverage >= 70%
7. evidence_complete  → Evidence bundle generated
```

## 3. Escalation Matrix

| Versuch | Aktion |
|:---|:---|
| 1-3 | Auto-fix via Error-Logs |
| 4 | Architekt analysiert Historie, gibt strategischen Hinweis |
| 5 | **TASK FROZEN** (status: blocked), eskaliert an Operator |

## 4. Testing Rules

- Never skip tests if modifying core logic.
- Run lint and format before committing any changes.
- If a test fails outside of your immediate scope, report the failure and revert your changes if they caused the failure.
- **Coverage >= 70%** — non-negotiable.
- **Adversarial Tests** — edge cases, null inputs, boundary conditions.
