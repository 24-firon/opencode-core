# Aider Core Skill

> **Zielgruppe:** Coder-Agent (nur in Repos mit Aider-Konfiguration)
> **Scope:** Lokal (Projektspezifisch, NICHT global)
> **Härtegrad:** Nur bei Aider-Nutzung aktiv

## Wann diesen Skill nutzen?
Dieser Skill wird nur in Repositories geladen, die Aider als primäres Code-Editing-Tool konfiguriert haben (z.B. Viron-Server-Admin).

## Aider Core Execution

Für Code-Änderungen gilt:

### Execute
Nutze den `aider` Befehl im Terminal:
```bash
aider <file1> <file2> --message "..."
```

### Verbot
- Führe Aider **niemals** im interaktiven Chat-Modus aus.
- Nutze **immer** `--message` für nicht-interaktive Ausführung.

### Warte
- Warte bis Aider autonom ändert und committet.
- Keine parallelen Aider-Commands ketten.
- Ein Aider-Command nach dem anderen.

## Warum Aider?
Aider nutzt ein separates Kontextfenster und spezialisierte Modelle für Code-Änderungen. Es reduziert Token-Verbrauch im Haupt-Agenten und liefert deterministischere Code-Outputs.

## Achtung
Dieser Skill ist **NIEMALS** automatisch im `base_payload` aktiv. Er muss explizit vom Operator in Ziel-Repos injiziert werden, die Aider nutzen.
