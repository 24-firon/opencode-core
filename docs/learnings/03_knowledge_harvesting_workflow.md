# Learning 03: Das Knowledge Harvesting Workflow

> **Session:** 26. März 2026 | **Dauer:** ~8 Stunden | **Pain Level:** Hoch (V1-Desaster → V2 Meisterwerk)

## Was haben wir gebaut?
Wir haben einen vollständigen **Knowledge Harvesting Workflow** entwickelt, der offizielle Dokumentationen in drei Output-Formate destilliert:

1. **RAG-Cluster** (`docs/opencode_knowledge/clusters/`) — Maschinen-Wissen. JSON-Snippets, Pfade, Env-Vars. Keine Prosa.
2. **User Manuals** (`docs/user_manual/`) — Menschen-Wissen. Matrizen, Coach-Ecken, Copy-Paste-Prompts.
3. **Community Reality Checks** — Inline-Injection von GitHub/Reddit-Bugs direkt in die Doku-Dateien als `⚠️ COMMUNITY REALITY CHECK` Blockquotes.

## Was war der Schmerz?
Die erste Version des Skills (`doc-harvester-protocol`) war ein katastrophaler V1-Müll: Flache Zusammenfassungen, keine Examples, keine Bedingungs-Matrix. Ein anderer Agent (Agent Zero) hat den Skill gelesen und trotzdem katastrophale Ergebnisse geliefert.

## Was haben wir daraus gelernt?
- **Skills sind Router, nicht Archive.** Die SKILL.md zeigt auf Templates/Examples, enthält sie aber nicht.
- **Jeder Skill braucht ein `examples/` Ordner** mit vollständigen Referenz-Artefakten. Ohne Examples rät der Agent.
- **Die Bedingungs-Matrix** ("WENN du Phase 1 tust, MUSST du Datei Y lesen") ist der Schlüssel zu Token-Effizienz.
- **Community Reality Checks** gehören INLINE in die Doku-Dateien, nicht in separate Dateien.
- **Der Flow/Sog-Ansatz** ("Um deinen Flow zu schützen, tue X") funktioniert besser als Druck ("VERBOTEN: Y").

## Die 3 wichtigsten Artefakte die wir erschaffen haben
| Artefakt | Pfad | Zweck |
|:---|:---|:---|
| `doc-harvester-protocol` Skill | `.opencode/skills/doc-harvester-protocol/` | Die Blaupause für Doku-Destillation |
| Rule 10-17 | `.opencode/rules/` | Die Sog-basierten Anti-Bias-Regeln |
| Rule 18 (Platform Hazards) | `.opencode/rules/18_opencode_platform_hazards.md` | OpenCode-spezifische Fallstricke |

## Nächster Schritt
Die 30+ Legacy-Analyzer-Skills (vue-nuxt, terraform, react, etc.) sind noch V1 (keine Examples, keine Router). Sie müssen an die neue Rule 11 (Skill Construction Law) angepasst werden.
