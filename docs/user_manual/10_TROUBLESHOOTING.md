# 🚑 Kategorie 10: Fehlerbehebung & Windows (Troubleshooting)

### 🎯 Worum geht es?
Auch das beste System klemmt mal. Wenn die KI plötzlich wirre Dinge tut, APIs (z. B. OpenAI) nicht mehr gefunden werden oder das System extrem langsam ist, findest du hier die **Notfall-Protokolle**. Besonders auf **Windows-Systemen** gibt es Architektur-Besonderheiten, die du als Manager kennen musst, um dein Team zu entblocken.

### 🚀 Dein Enterprise-Vorteil
* **Self-Healing (Selbstheilung):** Oft liegt das Problem nicht an deinem Code, sondern an einem korrupten Paket-Download im Hintergrund. Wenn du weißt, wo der versteckte Cache liegt, löst ein einziger Lösch-Befehl 90% aller API-Probleme.
* **Windows-Flaschenhälse umgehen:** Wenn Entwickler auf Windows klagen, dass die KI extrem langsam beim Datei-Lesen ist, weißt du, dass sie das System falsch installiert haben (außerhalb von WSL).
* **Beweissicherung (Logs):** Wenn ein Agent etwas gelöscht hat und du wissen willst, *warum*, kannst du genau in den tiefen Timestamp-Logs nachvollziehen, was die KI "gedacht" hat.

---

### 📊 Matrix: Die 3 kritischen System-Ordner
*Wo versteckt OpenCode seine Daten?*

| Pfad (Linux/Mac/WSL) | Was liegt dort? | Wann solltest du das löschen/prüfen? |
| :--- | :--- | :--- |
| `~/.local/share/opencode/log/` | Die letzten 10 extrem detaillierten Fehler-Logs. | Wenn CI-Pipelines unerklärlich abbrechen. (Tipp: Schau immer in die neuste Datei). |
| `~/.local/share/opencode/` | Der "Tresor" (`auth.json`) und aktuelle Session-States. | Wenn Anmeldedaten fehlschlagen oder alte Sessions "hängen". |
| `~/.cache/opencode/` | **Der Paket-Cache.** Hier liegen die NPM-Pakete für die Provider (z.B. Anthropic/OpenAI Anbindungen). | **Dein erster Schritt bei "ProviderInitError"!** |

---

### 💡 Die Coach-Ecke (Hintergrund & Best Practices)
> **Die harte Windows-Wahrheit (WSL)**
> KI-Agenten müssen tausende Dateien extrem schnell lesen (Grep) und schreiben können. Das native Windows-Dateisystem (NTFS) ist dafür zu langsam. 
> **Die Regel:** OpenCode MUSS auf Windows-Rechnern immer innerhalb von **WSL (Windows Subsystem for Linux)** installiert werden. Alles andere führt früher oder später zu massiven Lags und Abbrüchen.

> ### ⚠️ COMMUNITY REALITY CHECK (März 2026)
> **Die Doku sagt:** Headless-Linux und Wayland-Setups seien unterstützt. 
> **Die Realität:** Auf headless Linux crasht OpenCode beim Start, weil `xclip`/`wl-clipboard` vorausgesetzt, aber nicht gecheckt werden. Auf Wayland öffnet sich die Desktop-App mit einem leeren weißen Fenster. Die WebView2-Runtime (Windows) fehlt oft.
> **Workaround (Headless):** `apt install xclip xsel wl-clipboard` + `Xvfb :99 &` starten. 
> **Workaround (Wayland):** `WEBKIT_DISABLE_COMPOSITING_MODE=1 opencode`. 
> **Workaround (Windows):** WebView2 manuell installieren. 

---

### 🔗 Meta-Ebene & Abhängigkeiten
* **Abhängig von:** [Kategorie 01: Config](./01_CONFIG_NETWORK.md) (Fehlerhafte Configs sind nach dem Cache die häufigste Absturzursache).

---

### 📋 Prompt-Bibliothek (Copy & Paste für deine Agenten/Entwickler)

#### 1. Die "Nukleare Option" bei API-Fehlern (Cache Reset)
*Wenn die KI plötzlich "Model not available" oder "ProviderInitError" wirft, obwohl dein Key stimmt.*
*Diesen Befehl gibst du nicht dem Agenten, sondern tippst ihn selbst ins Terminal!*

```bash
# Löscht den versteckten Cache und zwingt OpenCode, die Provider-Pakete neu zu laden.
rm -rf ~/.cache/opencode
```

#### 2. Den Debug-Modus für CI-Pipelines erzwingen
*Wenn OpenCode als unsichtbarer Bot in GitHub läuft und abstürzt, brauchst du mehr Output.*

```text
@build Unsere OpenCode-Skripte im CI-Server schlagen fehl und wir sehen den Grund nicht.
Bitte passe unser Bash-Skript (oder die GitHub Action) an.

Füge beim Start von OpenCode zwingend folgende Flags hinzu:
1. `--print-logs`
2. `--log-level DEBUG`

Das zwingt das System, jeden Denkschritt und jeden API-Fehler direkt in die Konsole zu spucken, statt ihn in den versteckten Log-Ordnern zu vergraben.
```

#### 3. Das "Copy/Paste" Crash-Problem beheben (Headless Linux)
*Wenn du OpenCode auf einem nackten Linux-Server (ohne Desktop) betreibst und es sofort abstürzt.*

```text
@build OpenCode crasht auf unserem Ubuntu-Server, weil es versucht, auf die Zwischenablage (Clipboard) zuzugreifen, die auf dem Server nicht existiert.

Schreibe mir ein kleines Skript (`fix_clipboard.sh`), das die fehlenden Linux-Abhängigkeiten installiert.
Wir brauchen zwingend "xclip" oder "wl-clipboard".
Falls der Server komplett "headless" ist, richte zusätzlich "xvfb" (einen virtuellen Desktop) ein und dokumentiere, wie man OpenCode damit startet.
```
