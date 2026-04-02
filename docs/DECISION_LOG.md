# 📋 DECISION LOG (Architektur-Entscheidungen)

> **Regel:** Jede wesentliche architektonische oder strategische Entscheidung wird hier dokumentiert.
> **Format:** WAS, WARUM, WANN, REVERSIBEL?

---

## ADR-001: Knowledge Harvesting Protocol als Standard-Workflow etablieren

| Feld | Inhalt |
|:---|:---|
| **Datum** | 26. März 2026 |
| **WAS** | Einen vollständigen 5-Phasen Workflow (Triage → RAG-Extraktion → User Manual → Community Reality Checks → Injection) als Standard-Skill (`doc-harvester-protocol`) etabliert. |
| **WARUM** | Offizielle Dokumentationen sind für KI-Agenten toxisch (Marketing-Prosa, Anfänger-Tutorials). Ein standardisierter Destillations-Prozess garantiert reproduzierbare, token-effiziente Wissensdatenbanken. |
| **REVERSIBEL** | Ja. Skill kann entfernt oder angepasst werden. |

---

## ADR-002: Rules auf 10er-Nummerierung + Registry-System umstellen

| Feld | Inhalt |
|:---|:---|
| **Datum** | 26. März 2026 |
| **WAS** | Alle Regeln von beliebiger Nummerierung (00-17) auf 10er-Schritte (00, 10, 20, ..., 90) umgestellt. RULE_REGISTRY.md als zentraler Router eingeführt. Klassifizierung in BOOT (permanent), WORKFLOW (situativ), SKILL (ausführbar), KNOWLEDGE (reines Wissen). |
| **WARUM** | Dispatcher-Kompatibilität. Nahtlose Kopien zwischen Repos. Token-Effizienz durch situatives Laden. |
| **REVERSIBEL** | Ja. Backup existiert unter `playground/opencode-rules-backup/`. |

---

## ADR-003: Sog-Prinzip (Flow of Integrity) statt Druck-Prinzip

| Feld | Inhalt |
|:---|:---|
| **Datum** | 26. März 2026 |
| **WAS** | 7 Kern-Regeln (02, 04, 07, 10, 12, 13, 14 → jetzt 20, 40, 70, 84, 85, 13, 87) von "VERBOTEN"-Sprache auf "Um deinen Flow zu schützen"-Sprache umgeschrieben. |
| **WARUM** | Druck-Regeln erzeugen Angst, Fake-Completion und versteckte Fehler. Sog-Regeln erzeugen Flow, Transparenz und Kollaboration mit dem Operator. |
| **REVERSIBEL** | Ja. Ursprüngliche "harte" Varianten sind im `_PLAYGROUND/opencode-core-flow-rules/` des Context-Dispatchers gesichert. |

---

## ADR-004: Identität als System-Architekt (Rule 00 Patch)

| Feld | Inhalt |
|:---|:---|
| **Datum** | 26. März 2026 |
| **WAS** | Rule 00 (`master_orchestrator_directive.md`) umgeschrieben: Von "Du bist NICHT der Coder" zu "Du bist System-Architekt. Du schreibst Konfigurationen, Skills und Regeln." |
| **WARUM** | Die alte Identität hat den Agenten gelähmt. In der Praxis schreibt der Orchestrator ausschließlich Code (SKILL.md, Rules, Configs). Die Identität muss die Realität widerspiegeln. |
| **REVERSIBEL** | Ja. Alte Version existiert im Backup. |

---

## ADR-005: Legacy-Regeln 01 und 09 gelöscht

| Feld | Inhalt |
|:---|:---|
| **Datum** | 26. März 2026 |
| **WAS** | `01_system_architecture.md` (beschrieb ein nicht existierendes `.hive/`, `generate-plan.js`, 5-Rollen-Agenten-Matrix) und `09_split_log_mandate.md` (beschrieb nicht existierende `_ARCHIVE/logs/` Dateien) gelöscht. |
| **WARUM** | Beide Regeln erzeugten eine Parallel-Realität, die Agenten verwirrt hat. Sie beschrieben Systeme, die in diesem Repo nicht existieren. |
| **REVERSIBEL** | Ja. Backup unter `playground/opencode-rules-backup/`. |

---

## ADR-006: Community Reality Checks in Knowledge Base injiziert

| Feld | Inhalt |
|:---|:---|
| **Datum** | 26. März 2026 |
| **WAS** | Ergebnisse der Community-Recherche (GitHub Issues, Reddit) wurden direkt als `⚠️ COMMUNITY REALITY CHECK` Blockquotes in 7 von 10 RAG-Clustern und 6 von 10 User Manuals injiziert — nicht als separate Dateien. |
| **WARUM** | Separate Community-Dateien werden von Agenten ignoriert. Inline-Injection an der relevanten Stelle garantiert, dass Bugs und Workarounds beim Lesen der offiziellen Doku sofort sichtbar sind. |
| **REVERSIBEL** | Ja. Rohdaten existieren in `docs/opencode_knowledge/SHADOW_KNOWLEDGE_RAW.md`. |

---

## ADR-007: Snapshot-Setting (snapshot: true) beibehalten — Testphase

| Feld | Inhalt |
|:---|:---|
| **Datum** | 26. März 2026 |
| **WAS** | `snapshot: true` in `opencode.jsonc` wird NICHT auf `false` gesetzt, obwohl Rule 18 (Platform Hazards) einen 8-Minuten-Freeze warnt. |
| **WARUM** | Der Operator (User) möchte den Freeze erst selbst testen, bevor er das Feature deaktiviert. Die Rule bleibt als Hinweis bestehen, aber die Config-Entscheidung liegt beim Operator. |
| **REVERSIBEL** | Ja. Einzeiler: `"snapshot": false` in `opencode.jsonc` setzen. |

---

## ADR-008: 8 Legacy-Skills auf V3 geupgraded

| Feld | Inhalt |
|:---|:---|
| **Datum** | 26. März 2026 |
| **WAS** | YAML-Header (name, description, license, compatibility, metadata) für agent-batching, handover-protocol, three-zone-workflow, secrets-management ergänzt. Content-Merges für git-policy (Commit-Budget + Secret-Check), memory-shrink (dateispezifische Anwendung), testing-protocols (Definition of Done + QA-Pipeline). |
| **WARUM** | Die alten Skills hatten keine V3-Header und verletzten unsere eigene Rule 11 (Skill Construction Law). Der git-policy Merge schloss die Lücke zum Commit-Budget. |
| **REVERSIBEL** | Ja. Die Skills existieren auch in der Archiv-Version. |

---

## ADR-009: 9 neue externe Skills in .opencode/skills/ kopiert

| Feld | Inhalt |
|:---|:---|
| **Datum** | 26. März 2026 |
| **WAS** | code-review, code-simplifier, find-bugs, security-review, skill-scanner, skill-creator, multi-agent-orchestration, verification-before-completion, ui-ux-pro-max aus `.agents/skills/` und `~/.agents/skills/` in `.opencode/skills/` kopiert. |
| **WARUM** | `**/.agents/**` in `watcher.ignore` blockiert das Laden von Skills aus dem `.agents/` Ordner. Kopieren in `.opencode/skills/` ist die saubere Lösung, konsistent mit den 10 Legacy-Skills. |
| **REVERSIBEL** | Ja. Originale liegen weiterhin in `.agents/skills/`. |
