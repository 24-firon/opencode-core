# Cluster 07: TUI, Web, IDE & Share

Dieses Cluster behandelt die primären User-Interfaces und die Teilen-Funktion. Da Orchestrator-Agenten selten mit GUIs interagieren, ist dieses Cluster extrem ausgedünnt (Triage) und fokussiert sich auf die wenigen programmatisch relevanten Punkte.

## 1. TUI (Terminal User Interface)
*   Die TUI liest ihre Konfiguration aus `tui.json` (nicht `opencode.json`).
*   **Editor Setup:** Für Commands wie `/editor` oder `/export` greift die TUI auf die `EDITOR` Env-Var zu. WICHTIG: Für GUI-Editoren (VS Code, Cursor) MUSS die `--wait` Flag gesetzt sein (`export EDITOR="code --wait"`), andernfalls bricht der TUI-Prozess sofort ab.
*   **Architektur:** Die TUI ist im Grunde nur ein Client, der sich gegen einen lokalen HTTP-Server verbindet.

## 2. Web Interface
*   `opencode web` startet einen lokalen Server und öffnet den Browser.
*   Wie bei `opencode serve` kann dieser Server über `OPENCODE_SERVER_PASSWORD` mit Basic-Auth gesichert werden.
*   Man kann eine TUI gegen eine laufende Web-Instanz verbinden:
    ```bash
    opencode web --port 4096 --hostname 0.0.0.0
    opencode attach http://localhost:4096
    ```

## 3. IDE Integration
*   OpenCode kann direkt im VS Code Terminal ausgeführt werden (`Cmd+Esc` bzw. `Ctrl+Esc`).
*   Keine nennenswerten programmatischen Settings vorhanden (stark UI-fokussiert).

## 4. Share (CDN Uploads)
*   Mit `/share` lädt OpenCode den kompletten Session-Verlauf auf ein globales CDN (`opncd.ai/s/...`) hoch.
*   **Enterprise-Relevanz:** Dies muss via `{"share": "disabled"}` in der Konfiguration zwingend abgeschaltet werden, wenn Code lokal bleiben soll.
*   Es gibt die Modi `"manual"` (Default), `"auto"` (Jede Session wird geteilt) und `"disabled"`.
