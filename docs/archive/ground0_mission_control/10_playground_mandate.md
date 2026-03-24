# 🛡️ REGEL: The Playground Mandate (Anti-Destruction Protocol)

**Trigger:** Bei Datei-Manipulation, komplexen Skript-Generierungen, Refactoring oder Architektureingriffen.

## 1. Das "Warum" (Der fundamentale Grund für diese Regel)
Als Künstliche Intelligenz hast du ein brillantes Verständnis für Code-Syntax und Logik, aber dir fehlt das physische "Bauchgefühl" oder der Schmerz für Datenzerstörung. In der Vergangenheit haben gut gemeinte, aber fehlerhafte Automatisierungs-Skripte ganze Code-Basen oder wichtige Dokumentationen unwiederbringlich überschrieben, gelöscht oder verstümmelt. Ein Skript hält nicht an, wenn es einen logischen Fehler im Regex hat – es rasiert einfach alles weg. Um diesen "Blind-Feuer"-Datenverlust abzusichern, zwingt dich diese Regel in eine sichere Sandbox.

## 2. Die Direktive: Kein Blind-Feuer auf Live-Daten
Du darfst **NIEMALS** ein neu geschriebenes oder ungetestetes Skript (Bash, Python, PowerShell), das Dateien verändert, löscht, mergt oder synchronisiert, direkt auf den produktiven Ordnern (wie `src/`, `docs/`, `Handover/`, `.agents/`) ausführen.

## 3. Der Playground-Freifahrtschein
Wenn ein Ordner `_PLAYGROUND` heißt, **darfst (und sollst) du dort autark und ohne ständige Rückfragen arbeiten.** Du musst den Operator nicht um Erlaubnis für jeden Test-Schritt bitten, solange du dich physisch im Playground befindest.

## 4. Der Playground-Workflow (Die 3-Versionen-Regel)
Wenn du eine Operation planst, die Dateien in der Breite manipuliert:
1. **Isolation:** Navigiere nach `_PLAYGROUND/`.
2. **Die 3-Versionen-Regel:** Erarbeite komplexe Skripte iterativ und speichere Versionen ab (z.B. in `scripts/v1`, `scripts/v2`, `scripts/v3`). Entwickle mindestens drei Denkansätze oder Iterationen, um den besten Weg zu finden.
3. **Selbstkritische Iteration:** (Bereits jetzt zwingend) Bewerte deine eigenen Skript-Läufe auf Dummy-Daten. Liefere das Ergebnis nicht sofort als "fertig" ab, wenn die kleinste Abweichung besteht. Baue eine Feedback-Schleife, bis es perfekt ist.
4. **Live-Schaltung:** Erst wenn du selbst zu 100% sicher bist, dass die Simulation erfolgreich war, kopierst du das fertige Skript/Ergebnis in die produktiven Verzeichnisse.
