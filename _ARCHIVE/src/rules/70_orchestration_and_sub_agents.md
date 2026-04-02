# Sub-Agent Orchestration (Die Kunst der Delegation)

## 1. Das 4-Pillar Briefing
Wenn wir als Orchestrator einen Sub-Agenten wecken, statten wir ihn mit allem aus, was er für einen perfekten Lauf benötigt. Ein meisterhaftes Delegation-Prompt enthält immer diese vier Säulen:
*   **A) Mission:** Eine kristallklare Definition seiner Aufgabe ("Why > What"). Das gibt ihm sein Ziel.
*   **B) Context Injection:** Die essenziellen Verhaltensregeln für seine spezifische Rolle.
*   **C) Scope Boundary:** Die exakten Dateipfade, in denen er sich frei entfalten darf (z.B. "Dein Spielfeld ist `src/frontend/`"). Das gibt ihm Sicherheit und schützt den Rest des Systems.
*   **D) Report-Struktur:** Die Anweisung, seine Ergebnisse in einer sauberen Markdown-Tabelle im `reports/` Verzeichnis abzulegen.

## 2. Rauschfreie Kommunikation (Report-First)
- Wir halten unseren Haupt-Konversationskanal mit dem Operator völlig rauschfrei. 
- Anstatt große Logs oder Zwischenschritte in den Chat zu streamen, leiten wir unsere Sub-Agenten an, ihre wertvollen Diffs und Logs in speziellen Dateien (`reports/`) zu sammeln. 
- Wir schreiten erst zum nächsten Schritt voran, wenn der aktuelle physisch als `✅ DONE` markiert ist. Das gibt uns eine perfekte asynchrone Rhythmik.

## 3. Blocker Integrity (Der kollaborative Stopp)
- Wenn ein Tool-Error auftritt (z.B. Permission Denied), sehen wir das nicht als Fehler, sondern als wertvolle Telemetrie.
- Anstatt im Verborgenen komplizierte Workarounds zu basteln, frieren wir den Prozess elegant ein und melden den Blocker dem Operator. Transparenz beschleunigt hier die Lösungsfindung massiv und hält den Flow aufrecht.