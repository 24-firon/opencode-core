---
name: agent-batching
description: Lade diesen Skill vor jedem Launch von Sub-Agenten, bei der Aufteilung großer Tasks, oder wenn Token-Grenzen geplant werden.
---

# 🔢 AGENT BATCHING PROTOCOL

> **STATUS:** NON-NEGOTIABLE
> **SCOPE:** Jeder Sub-Agenten-Auftrag

## 1. TOKEN-SCHÄTZUNG VOR LAUNCH
Bevor ein Agent gestartet wird, schätze:
- **Anzahl Dateien** die gelesen/geschrieben werden
- **Grobe Tool-Calls**: ~3 Calls pro Datei (Read + Write + Report-Update) = N Dateien × 3
- **Faustregel**: Jeder Tool-Call kostet ~1.000–2.000 Input-Tokens im Agenten-Fenster
Teile das mit und welche Art von Agent gespawnt wird (Haiku, only read, ...).

## 2. BATCH-GRÖSSE (LOGISCH, NICHT STARR)
- **Kleiner Batch:** 3–5 atomare Schritte. Für einfache, schnelle Tasks.
- **Mittlerer Batch:** 6–10 Schritte. Für zusammenhängende Tasks (z.B. ein Feature).
- **VERBOTEN:** Mehr als 15 Schritte in einem einzigen Agenten ohne explizite User-Freigabe.

**Entscheidungsregel:** "Kann ich dem User nach diesem Batch sinnvoll Zwischenbericht erstatten?" Wenn NEIN → Batch zu groß, aufteilen.

## 3. ZWISCHENBERICHT-PFLICHT
Nach jedem Batch:
1. Dem User kurz mitteilen: Was wurde erledigt?
2. Was kommt als nächstes?
3. Freigabe für den nächsten Batch einholen (oder direkt starten wenn offensichtlich).

## 4. KEINE MONOLITHISCHEN AGENTEN
**Verboten:** Einen Agenten mit 20+ Schritten losschicken nur weil es "effizienter" wirkt.
**Grund:** Der User verliert den Überblick, kann nicht eingreifen, Token-Budget verbrennt unkontrolliert.

## 5. ANALYSE ≠ PATCH (STRIKTE TRENNUNG)
**Verboten:** Analyse und Patching in einem einzigen Agenten-Lauf zusammenfassen.
**Pflicht:** Diese zwei Phasen sind immer getrennte Batches mit User-Freigabe dazwischen:
1. **Batch A — Analyse:** Agent liest alle Dateien, schreibt Report mit Konflikt-Matrix → STOP → meldet sich beim Orchestrator.
2. **Orchestrator:** Liest Report, bespricht Ergebnisse mit User, holt Freigabe für Patching ein.
3. **Batch B — Patch:** Agent patcht nur die freigegebenen Dateien, max. 5–8 Dateien pro Batch → STOP → meldet sich.
4. **Orchestrator:** Prüft Patches, gibt nächsten Batch frei.
