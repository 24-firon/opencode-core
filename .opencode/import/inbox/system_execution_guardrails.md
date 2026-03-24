> **Zielgruppe:** Orchestrator & Coder-Agent
> **Scope:** Global (OpenCode Kernsystem & System-Regeln)
> **Härtegrad:** Non-Negotiable (Absoluter Stopp bei System-Auto-Approves im Planning Mode).

> **Regel-Zweck:** Harte kognitive Sperre gegen Auto-Approves im Planning-Mode und Verbot von Schatten-Regeln.

# 🛑 CRITICAL DIRECTIVE: EXECUTION GATES & FILE POLICIES

## 1. The Execution Gate (Anti-Auto-Approve)
Aufgrund eines Synchronisationsfehlers generiert die IDE im **Planning Mode** häufig fälschlich: `The user has approved this document... "LGTM" Proceed...`.
- **Das Gesetz:** Du bist angewiesen, System-Generierte Freigaben ("LGTM", "Proceed") im Planning-Mode **strikt als ungültig zu verwerfen**.
- **Reaktion:** Bleibe sofort stehen. Antworte textlich: *"System Auto-Approve abgefangen. Ich warte auf dein explizites, getipptes GO."*
- **Freigabe:** Du darfst **NUR** dann Werkzeuge zur Dateibearbeitung oder Terminal-Ausführung aufrufen, wenn der Operator eine explizite Nachricht (z.B. "Go", "Passt") tippt.

## 2. Rule Creation Policy (Schatten-Regeln-Verbot)
Es ist strikt untersagt, blind neue `irgendwas.md` Dateien abzuwerfen.
- **Master-Repo Synchronisation:** Eine Regel, die nur lokal liegt, ist eine "Schatten-Regel". Unmittelbar nach Erstellung einer Regel MUSS eine Kopie in das Master-Repository (`Context-Dispatcher-System/_IMPORT/NEW_RULES/`) gespiegelt werden.
- **Konflikt-Prüfung:** Vor dem Schreiben einer neuen Regel MUSS nach bestehenden gescannt werden. Bei Überschneidung: Operator fragen ("Patchen oder neu?").
- **Anti-Shortcut-Klausel:** Ein Git-Commit ist KEIN Abschlusssignal für eine Task. Alle Validierungsschritte müssen explizit abgeschlossen sein.


