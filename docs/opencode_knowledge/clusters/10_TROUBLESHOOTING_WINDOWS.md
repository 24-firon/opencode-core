# Cluster 10: Troubleshooting & Windows (WSL)

Dieses Cluster behandelt die Debugging-Pfade bei fehlerhaften Agenten-Sessions, Cache-Korruption und die Besonderheiten von Windows-Umgebungen.

## 0. ⚠️ COMMUNITY REALITY CHECKS (März 2026)

> **Clipboard-Crash auf Headless-Linux (GitHub Issue #4283):** Auf Servern ohne Display-Manager crasht OpenCode, weil `xclip`, `wl-clipboard`, `xsel` vorausgesetzt, aber nicht gecheckt werden.
> **Workaround:** `apt install xclip xsel wl-clipboard` + virtuellen Display via `Xvfb :99 &` starten.
>
> **WebView2-Crash (Windows Desktop):** OpenCode Desktop öffnet ein leeres Fenster wenn Microsoft Edge WebView2 fehlt oder veraltet ist.
> **Workaround:** WebView2 Runtime manuell neu installieren.
>
> **Wayland Compositor-Fehler:** Leeres weißes Fenster auf GNOME/KDE Wayland.
> **Workaround:** `WEBKIT_DISABLE_COMPOSITING_MODE=1 opencode` oder `GDK_BACKEND=x11 opencode`.
>
> **Windows Pfade:** OpenCode MUSS auf Windows zwingend in WSL laufen für stabile Performance.

## 1. Storage & Logs
Agenten-Status, Auth-Daten und Fehler-Logs werden an spezifischen Orten persistiert. Bei hartnäckigen Systemfehlern ist das Leeren dieser Verzeichnisse der erste Schritt.

*   **Logs:** `~/.local/share/opencode/log/` (Enthält die letzten 10 Timestamp-Logs).
    *   *Tipp:* Die CLI-Flag `--print-logs` und `--log-level DEBUG` sind kritisch für CI-Integrationen.
*   **State & Auth:** `~/.local/share/opencode/` (Beinhaltet `auth.json` und Projektdaten).
*   **Package Cache:** `~/.cache/opencode/` (Beinhaltet NPM-Abhängigkeiten und **Provider-Packages**).

## 2. Kritische Fehlermuster
*   `ProviderInitError` / `AI_APICallError`: Tritt oft auf, wenn Provider-APIs sich ändern und das intern gecachte Provider-Package (`@ai-sdk/...`) veraltet ist.
    *   *Fix:* `rm -rf ~/.cache/opencode` erzwingt den Neu-Download der Provider-Pakete.
*   `Model not available`: Oft ein Typo. Modelle müssen strikt im Format `providerId/modelId` referenziert werden (z.B. `openai/gpt-4.1`). Zur Laufzeit kann `opencode models` aufgerufen werden.
*   **Copy/Paste in Linux-Headless-Runnern:** Wenn Agenten im Hintergrund laufen und X11/Wayland Clipboard-Abhängigkeiten fehlen, crasht das TUI.
    *   *Fix:* `xclip` oder `wl-clipboard` installieren. In komplett headless Umgebungen: `xvfb` nutzen.

## 3. Windows & WSL Architektur
Die native Windows-Performance (insbesondere bei großen Dateioperationen durch AI) ist oft mangelhaft.
*   **Best Practice:** OpenCode MUSS in WSL (Windows Subsystem for Linux) laufen.
*   **Network Bridging:** Wenn ein Orchestrator (Windows) mit OpenCode (WSL) kommunizieren muss, startet man den Server in WSL explizit offen:
    ```bash
    # Ausführung in WSL
    OPENCODE_SERVER_PASSWORD=secret opencode serve --hostname 0.0.0.0 --port 4096
    ```
    Der Client (Windows) kann dann via `http://localhost:4096` oder WSL-IP zugreifen.
