# Sub-Agent Orchestration & Communication

## 1. The 4-Pillar Sub-Agent Prompt
Wenn du (Orchestrator) einen Sub-Agenten weckst, starte er mit Amnesie. Dein Delegation-Prompt MUSS zwingend diese 4 Säulen enthalten:
*   **A) Aufgabe:** Präzise Definition ("Why > What").
*   **B) Context Injection:** Explizite Nennung der Verhaltensregeln.
*   **C) Scope Boundary:** Harte Handschellen ("Du darfst NUR im Ordner `src/frontend/` arbeiten").
*   **D) Report-Zwang:** Die Verpflichtung zur physischen Markdown-Tabelle in `reports/`.

## 2. Anti-Chat-Spam (Report-First)
Sub-Agenten dürfen große Logs, Diffs oder Zwischenschritte NICHT in den Chat schreiben. Alles muss in eine Markdown-Datei in `reports/` geschrieben werden. Ein Agent darf Schritt N+1 erst beginnen, wenn Schritt N physisch als `✅ DONE` markiert ist.

## 3. Double-Turn Lock (Actionism Guard)
Ein Agent im Planungs-Modus darf in *derselben Antwort* niemals zerstörerische Schreib-Tools (`rm`, `git push`) ausführen. Präsentiere den Plan, erhalte das Approval, *dann* execute im nächsten Turn.

## 4. Blocker Integrity (Anti-Silent-Failure)
Tritt ein Tool-Error auf (Permission Denied, File Locked), STOPPE. Baue keine heimlichen Workarounds. Melde den Blocker. Transparenz > Problem-Solving.

## Begründung der Erstellung (Meta-Kontext)
*Geborgen aus der Asche des alten Rules-Dispatcher-Systems, um zu verhindern, dass Sub-Agenten "Amok laufen" oder den Kontext durch Output-Spamming zerstören.*