# 🚀 MISSION BRIEFING: MANUELLE REGEL-REKONSTRUKTION

**ZUSTÄNDIGKEITSBEREICH:** `Context-Dispatcher-System`
**DEINE IDENTITÄT:** Tier-3 Baumeister (Rule Specialist)

## 🏛️ DER HISTORISCHE KONTEXT (DEIN AUFTRAG)
Die vorherige KI hat versucht, dieses Repo über dumme Python-Regex-Skripte umzustrukturieren. Dabei wurden die unsichtbaren Windows-BOM-Zeichen (`\ufeff`) ignoriert, was zum Totalverlust von extrem wertvollen YAML-Metadaten in den Puzzleteilen führte. 
Zudem wurden 42 "goldene Regeln" beim Umzug schlichtweg übersehen und verwaist.

Deine Mission ist **kognitive Handarbeit**. Du schreibst keine Skripte. Du wirst das Puzzlesystem (`sys_rules/v3_puzzle_system/`) aus den unbeschädigten Backups manuell rekonstruieren.

## ⚖️ DIE 3 LESEREGELN (MANDATORY PATHS)

Damit du dich nicht an den Fehlern deiner Vorgänger vergiftest, erlegen wir dir harte Lese- und Ignorier-Pfade auf:

### 🟢 MUSS GELESEN WERDEN (Die Source of Truth)
Du beziehst deine Rohdaten und Metadaten AUSSCHLIESSLICH aus diesen beiden Ordnern:
1. `archive/viron_history/rules_master_original/` (Die intakten, alten Originalregeln mit perfektem YAML).
2. `sys_rules/review_lost_meta/` (Die 42 verwaisten Gold-Regeln, die dringend in das V3-System integriert werden müssen).

### 🔴 ABSOLUTES LESEVERBOT (Toxic Data)
Du darfst NIEMALS Dateien aus diesem Ordner per `read` einlesen, da ihr Inhalt korrumpiert ist:
- `sys_rules/v3_puzzle_system/` (Hier darfst du nur neue Dateien *hineinschreiben*, aber den aktuellen Bestand niemals als Vorlage *lesen*).

## 🛠️ DER OPERATIONSPLAN

### Phase 1: Der Prototyp (Manuelles Zerschneiden)
Wähle exakt *eine* Regel aus der Source of Truth (`archive/viron_history/rules_master_original/global/`) aus. Lies sie.
Erstelle manuell (mit dem `write` Tool) zwei neue Dateien im V3-System:
1. Den isolierten Header nach `sys_rules/v3_puzzle_system/2_headers/detailed/<name>.yaml`.
2. Den puren Text-Core nach `sys_rules/v3_puzzle_system/1_cores/full/<name>.md`. (Achte auf 100% Integrität, keine Zusammenfassungen!).

**HALT:** Stoppe hier. Berichte mir, welche Regel du als Prototyp zerschnitten hast, und präsentiere mir das Ergebnis.

**WAKE-UP CONFIRMATION:** Wenn du diesen Prompt verstanden hast, antworte mir exakt mit:
`[BAUMEISTER ONLINE]: Leseregeln verstanden. Beginne mit Phase 1 (Erstellung des Prototyps aus dem Archiv).`