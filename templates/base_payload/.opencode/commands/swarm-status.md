# Swarm Status Command
# Usage: /swarm-status

Lies die Datei `.swarm/plan.md` und gib dem User einen kompakten, übersichtlichen Statusbericht in die Konsole aus.

## Struktur der Antwort
1. **Aktuelle Phase**: In welcher Phase befinden wir uns?
2. **Fortschritt**: Wieviele Tasks sind PENDING, IN_PROGRESS und COMPLETED in der aktuellen Phase?
3. **Aktueller Task**: Welcher Task (T-X.Y) wird gerade bearbeitet?
4. **Nächste Schritte**: Was ist als Nächstes zu tun? (z.B. "Warten auf /swarm-execute" oder "Fehlerbehebung in T-1.2").

Nutze keine Tools, die den Code verändern. Dies ist ein reiner Lese-Befehl.