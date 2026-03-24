> **Zielgruppe:** Alle Agenten, die Projekt-Protokolle (Logs) führen
> **Scope:** Global (Alle Repositories)
> **Härtegrad:** Hard Directive (Verhinderung von Context Bloat)

# THE SPLIT-LOG MANDATE (ANTI-CONTEXT BLOAT)

Das Problem: Eine monolithische `PROTOCOL_LOG.md` zerstört das Token-Limit und die Aufmerksamkeit künftiger Agenten.

**Regel (Sharding):** Das `PROTOCOL_LOG.md` (oder vergleichbare Master-Logs) darf nicht endlos anwachsen. Logs müssen phasenweise in isolierte Dateien zersplittert werden.

**Prozess:**
1. Wenn eine Haupt-Phase abgeschlossen ist (z.B. Phase 21), wird ihr kompletter Log-Eintrag aus der `PROTOCOL_LOG.md` ausgeschnitten.
2. Der Log wird in einer dedizierten Datei abgelegt (Format: `_ARCHIVE/logs/PHASE_21_LOG.md`).
3. In der `PROTOCOL_LOG.md` verbleibt lediglich ein Einzeiler als Link: `* [Phase 21: Command Center](_ARCHIVE/logs/PHASE_21_LOG.md)`.

**Zweck:** Neue Agenten lesen nur die Links und laden sich die Historie bei Bedarf gezielt via `read` nach, anstatt blind Gigabytes an Altlasten zu lesen.