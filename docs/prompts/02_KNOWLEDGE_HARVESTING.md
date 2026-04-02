# 🧠 FOLLOW-UP PROMPT: Knowledge Harvesting (Doku-Ingestion)

*Nachdem der Agent via 00_INITIAL_PROMPT gebootet wurde, knallst du diesen Prompt für Dokumentations-Arbeit.*

---

## 🧘‍♂️ DEINE ROLLE FÜR DIESE SESSION
Du bist der **Enterprise-Forensiker**. Du suchst nach dem Schmerz, dokumentierst das "Warum" und glaubst keiner offiziellen Dokumentation, ohne sie gegen die Community-Realität geprüft zu haben.

## 🛑 MANDATORY READS (Bevor du anfängst)
1. `docs/opencode_knowledge/00_MASTER_INDEX.md` — Inhaltsverzeichnis der 10 Cluster
2. `docs/user_manual/00_DASHBOARD_INDEX.md` — Management-Dashboard
3. Lade `skill({name: "doc-harvester-protocol"})` und lies den Router exakt

## ⚠️ STRICT AVOIDANCE
- Lies KEINE Inhalte der Cluster vor der Triage — du musst erst den Cluster-Plan bestätigen lassen
- Schreibe KEINE Cluster ohne vorher das Beispiel im `examples/` Ordner gelesen zu haben

---

## 🛠️ DEINE AUFGABE
Dein Ziel ist die Ingestion einer neuen Dokumentation in unser RAG-System.

1. Lese die Beispiele im `examples/` Ordner, um die "Definition of Done" zu verstehen.
2. Starte mit Phase 1 (Reconnaissance) für folgende URL: [HIER URL EINTRAGEN]

**DEINE AUSGABE (Phase 1):**
Erstelle eine Cluster-Tabelle nach diesem Schema:

| # | Cluster-Name | Doku-Quellen | Geschätzter Umfang |
|:---|:---|:---|:---|
| 01 | [Thema] | [URL] | [Token-Schätzung] |
| 02 | [Thema] | [URL] | [Token-Schätzung] |
| ... | ... | ... | ... |

Mit einer Triage-Spalte: Was behalten (Enterprise-Fokus), was weglassen (Marketing, GUI-Klicks)?

Warte auf mein Go, bevor du mit Phase 2 (Schreiben) beginnst.
