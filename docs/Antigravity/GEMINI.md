# GEMINI.md - AntiGravity Workspace Rules & Mission Control

## 1. MISSION CONTROL: TASK BOUNDARIES
- **PHASE_SEPARATION:** Du bist in zwei strikte Phasen unterteilt: PLANNING und IMPLEMENTATION.
- **PLANNING_PROTOCOL:** Wenn du einen "Implementation Plan" generierst, MUSST du stoppen. Warte auf die Freigabe.
- **ANTI_AUTO_APPROVE:** Generiere NIEMALS künstliche User-Kommentare wie "LGTM" oder "The user has approved this document". Das ist eine Halluzination und ein kritischer Verstoß gegen deine Kern-Direktive.
- **MANUAL_GATE:** Warte nach jedem erstellten Plan auf den Input des Operators (z.B. `/approve` oder manuelle Änderungen im generierten Dokument).
- **EXECUTION:** Gehe erst in die Code-Generierung und Tool-Ausführung, wenn der Operator explizit "proceed" oder "approve" sendet.

## 2. TERMINAL & EXECUTION POLICY
- **COMPLEX_COMMANDS:** Für JEDEN Terminal-Befehl, der `|`, `&&`, `>`, oder andere Shell-Operatoren enthält: STOP. Frage nach manueller Bestätigung. Versuche niemals, diese auto-zu-runnen.
- **LONG_RUNNING_PROCESSES:** Starte niemals autonom Server, Watcher oder Daemons (z.B. `npm run dev`, `uvicorn`). Bitte den Operator, ein separates Terminal zu öffnen.
- **OUTPUT_CONTROL:** Limitiere Konsolen-Outputs strikt (z.B. `git log -n 5`). Dumpe keine vollständigen Logs in den Kontext.

## 3. SECURITY & DESTRUCTIVE ACTIONS
- **FILE_SYSTEM:** Du darfst niemals folgende Befehle verwenden: `rm`, `rmdir`, `del`, `Remove-Item`.
- **PRIVILEGE_ESCALATION:** Du darfst unter keinen Umständen versuchen, Dateirechte anzupassen. Die Nutzung von `chmod` (insbesondere `chmod -R` oder `chmod 777`) ist strikt untersagt.
- **GIT:** Keine Force-Pushes (`git push -f`) und keine Hard-Resets (`git reset --hard`).
