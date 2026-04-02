---
name: memory-shrink
description: 4-Tier Memory Modell für iteratives, sicheres Schrumpfen von Handover-Dateien.
license: MIT
compatibility: opencode
metadata:
  audience: orchestrator-agents
  workflow: session-management
---

# 🗜️ Das 4-Tier Memory & Shrink Protocol

## 🎯 Zweck
Handover-Dateien wachsen unweigerlich. Um Token-Timeouts und Kontext-Verwirrung zu verhindern, MÜSSEN sie iterativ geschrumpft werden.
ABER: KIs haben eine toxische Tendenz, wertvollen Kontext beim "Aufräumen" blind zu vernichten. Diese Regel stoppt das.

## ⚖️ Das eiserne Gesetz: "Archive First, Shrink Later"
Ehe auch nur ein einziges Wort aus einer aktiven Handover-Datei gelöscht oder zusammengefasst wird, gilt zwingend diese Reihenfolge:
1. **Sichern:** Die Vollversion der Datei wird zwingend archiviert (z.B. in `_ARCHIVE/` oder `.opencode/archive/`) und committet.
2. **Review:** Der Agent erstellt einen Entwurf (Draft/Diff) der gekürzten Datei.
3. **Approval:** Der Operator MUSS den Entwurf prüfen. Erst nach explizitem "Go" darf die aktive Datei abgesaugt werden.

## 🍰 Das 4-Tier Relevanz-Modell (Wie geschrumpft wird)
Wenn ein Abschnitt in die Vergangenheit rückt, wird er nach diesem Raster abgewertet und gekürzt:

- **Tier 1 (Gegenwart / Aktueller Sprint):**
  - Status: Volle Details, Code-Schnipsel, exakte Terminal-Outputs, Architekturentscheidungen. Nichts wird gekürzt.
- **Tier 2 (Jüngste Vergangenheit / Aktuell extrem relevant):**
  - Status: Zusammenfassung auf das Wesentliche.
  - Formatierung: Bulletpoints. Was wurde gemacht, welche Systeme waren primär betroffen.
- **Tier 3 (Ältere Historie / Nur noch kontextuell relevant):**
  - Status: Stark kondensiert auf 2 Sätze.
  - Formatierung: Nur noch "Warum wurde es entwickelt?" und "Welchen Einfluss hat es auf die aktuelle Architektur?" (Sinn der Existenz).
- **Tier 4 (Abgeschlossen / Inaktiver Ballast):**
  - Status: Physisch aus der aktiven Datei GELÖSCHT.
  - Routing: Existiert nur noch in der eingefrorenen Volldatei im Archiv. Im aktiven Handover wird es nicht mehr erwähnt. Ein Pointer existiert im Archiv-Index.

## 📌 Dateispezifische Anwendung

| Datei | Was darf hier bleiben | Was wird entfernt |
|:---|:---|:---|
| `implementation_plan.md` | Nur die reine Zukunft (ausstehende Tasks). Von Tier-Modell ausgenommen. | Abgeschlossene Tasks werden restlos gelöscht. |
| `task.md` | Tier 1 (Aktuell) und Tier 2 (Letzte Aufgaben). | Ältere Checklisten. |
| `walkthrough.md` | Tier 1 bis Tier 3. Das "Warum" alter Entscheidungen bleibt als 2-Satz-Echo. | Nur bei Tier 4 (komplett irrelevant). |
