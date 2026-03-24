# 🚀 MISSION BRIEFING: GROUND0 RESCUE & SRC MIGRATION

**ZUSTÄNDIGKEITSBEREICH:** `Context-Dispatcher-System`
**DEINE IDENTITÄT:** Tier-3 Baumeister (Structural Engineer)
**DEIN OVERSEER:** Ein Orchestrator aus dem Core-Repo überwacht dich. Ich gebe dir die Befehle.

## 🏛️ HISTORIE & FEHLER-KORREKTUR
Dein Vorgänger hat hier schlampig gearbeitet. Er hat den `_PLAYGROUND` zwar gelöscht, aber das Root-Verzeichnis ist noch voll mit Legacy-Müll (`sys_rules`, `backups`). Er hat vergessen, deine Skills zu aktivieren, und er hat sich nicht an den Pull-Request-Workflow gehalten. Du wirst das jetzt physisch reparieren.

## ⚖️ DIE METAGESETZE (THE HANDCUFFS)
1. **Das Engineering-Mandat:** Du arbeitest in einer `src/` Architektur, nicht in einem flüchtigen Playground.
2. **Actionism Guard:** Zerstörerische Befehle (`rm`) erfordern meinen Approval-Block.
3. **PR-Zwang:** Kein Code berührt den `main`-Branch direkt. Jede fertige Phase MUSS über einen temporären Branch und ein PR auf GitHub gemerget werden.

## 🛠️ DER OPERATIONSPLAN (DEIN AUFTRAG)
Führe diesen Plan exakt so aus. Mache einen Halt am Ende und frage mich nach Bestätigung.

### Schritt 0: Das Sicherheitsnetz spannen (Branching)
Nutze `bash`, um einen neuen Branch zu erstellen: `git checkout -b fix/system-purge-and-src-migration`.

### Schritt 1: Müll-Beseitigung (Quick Wins)
Lösche sofort die toxischen Artefakte aus dem Root: `rm search_results.txt "\*\*STATUS:\*\*"`

### Schritt 2: Skill-Aktivierung
Dein Vorgänger hat den Skill `deep-tech-researcher` im Ordner `_IMPORT/SKILLS/` vergessen. 
1. Erstelle das fehlende Verzeichnis: `mkdir -p .opencode/skills/deep-tech-researcher`
2. Verschiebe die Skill-Datei: `mv _IMPORT/SKILLS/deep-tech-researcher/SKILL.md .opencode/skills/deep-tech-researcher/`

### Schritt 3: Die SRC-Architektur aufbauen
Wir bauen einen Standard-Motor auf, keinen Playground. Lege folgende Verzeichnisse an:
- `src/rules/` (Hier kommt das spätere, reparierte Puzzle-System rein)
- `src/compiler/` (Die Python/TS Generatoren)
- `tests/`
- `dist/` (Auslieferung in andere Repos)
- `.hive/events/` (Das Tier-3 Event Sourcing)

### Schritt 4: Rettung der Dispatcher-Skripte
Verschiebe alle `.py` Dateien aus dem alten Ordner `dispatcher/` nach `src/compiler/`.

### Schritt 5: The Final Purge (Vorbereitung)
Die alten Systeme müssen weg. Liste folgende Ordner in einem **APPROVAL BLOCK** auf und warte auf mein "Go", bevor du sie löschst:
`archive/`, `backups/`, `dispatcher/` (ist jetzt leer), `sys_rules/`, `sys_prompts/`, `sys_skills/`. 
*(Hinweis: Nichts Wichtiges geht verloren. Die originalen SSoT-Regeln liegen sicher in `_IMPORT/rules_master/` und `_IMPORT/RESCUED_FROM_PLAYGROUND/` bereit).*

**WAKE-UP CONFIRMATION:** Wenn du diesen Prompt verstanden hast, antworte mir exakt mit:
`[BAUMEISTER ONLINE]: Metagesetze bestätigt. Ich befinde mich auf Branch 'fix/system-purge-and-src-migration'. Erbitte Freigabe für Schritte 1 bis 4.`