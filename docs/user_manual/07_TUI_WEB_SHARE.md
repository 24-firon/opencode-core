# 🖥️ Kategorie 7: Benutzeroberfläche & Privacy (TUI, Web & Share)

### 🎯 Worum geht es?
OpenCode hat keine traditionelle Windows/Mac "App" mit Fenstern, sondern nutzt ein **TUI (Terminal User Interface)** – eine grafische Oberfläche, die direkt in deiner schwarzen Kommandozeile läuft. 
Dieser Bereich behandelt die Steuerung dieser Ansicht, die Anbindung an deinen Code-Editor (wie VS Code) und vor allem die **Datenschutz-Einstellungen (Share-Feature)**.

### 🚀 Dein Enterprise-Vorteil
* **Vollständige Datensicherheit:** Das "Share"-Feature von OpenCode ist zwar praktisch, um Fehler mit Kollegen zu teilen, lädt deine Firmendaten aber auf das öffentliche CDN von OpenCode (`opncd.ai`) hoch. Diesen Leak kannst du hier sofort stopfen.
* **Nahtlose Editor-Verknüpfung:** Du musst nicht zwischen Terminal und Editor wechseln. Du drückst einen Knopf im TUI, und die Datei öffnet sich exakt in VS Code.
* **Remote-Zugriff über Web:** Du kannst OpenCode auf einem starken Firmen-Server laufen lassen, während du von deinem lahmen Laptop nur über den Browser (`opencode web`) auf die volle Power zugreifst.

---

### 📊 Matrix: Die 3 Wege, OpenCode zu bedienen
*Wie willst du heute arbeiten?*

| Modus | Start-Befehl | Perfekt für... |
| :--- | :--- | :--- |
| **TUI (Terminal)** | `opencode` | Tägliches Coden direkt in deiner Konsole. |
| **Web Browser** | `opencode web` | Remote-Arbeit (Server steht woanders, du nutzt den Browser). |
| **ACP (IDE-Mode)** | `opencode acp` | Wenn du OpenCode direkt *innerhalb* von Zed, Neovim oder JetBrains nutzen willst. |

---

### 💡 Die Coach-Ecke (Hintergrund & Best Practices)
> **Der "Blockierende Editor" Trick**
> Wenn du im OpenCode-TUI den Befehl `/editor` tippst, öffnet sich dein Code-Editor. Aber oft crasht danach das TUI oder reagiert nicht mehr. Warum?
> **Die Lösung:** OpenCode muss *warten*, bis du die Datei im Editor geschlossen hast. Wenn du VS Code nutzt, musst du zwingend das `--wait` Flag in deiner System-Umgebung setzen! 
> (Siehe Prompt unten, wie du das fixt).

---

### 🔗 Meta-Ebene & Abhängigkeiten
* **Abhängig von:** [Kategorie 01: Config](./01_CONFIG_NETWORK.md) (Das Share-Feature wird dort zentral abgeschaltet).
* **Dateipfade:** TUI-spezifische Layout-Einstellungen (wie Themes) speicherst du nicht in der `opencode.json`, sondern isoliert in der `tui.json`.

---

### 📋 Prompt-Bibliothek (Copy & Paste für deine Agenten)

#### 1. Den Daten-Abfluss (Share-Feature) hart blockieren
*Die wichtigste Einstellung für Unternehmen mit Geheimhaltung.*

```text
@build Aus Gründen der Unternehmenssicherheit müssen wir das Teilen von Sitzungen komplett verbieten.
Bitte aktualisiere unsere `opencode.json` so, dass das Share-Feature hart deaktiviert ist. 

Hinweis für dich: Setze den Key `"share"` auf `"disabled"`.
Stelle sicher, dass er weder auf "manual" noch auf "auto" steht.
```

#### 2. Den VS Code Editor richtig verknüpfen
*Repariert das Problem, dass OpenCode abstürzt, wenn du externe Editoren öffnest.*

```text
@build Ich habe Probleme, wenn ich aus dem OpenCode-Terminal heraus VS Code aufrufe. Das System wartet nicht auf mich.
Bitte schreibe mir ein kleines Bash-Skript oder passe meine `.zshrc` / `.bashrc` an.

Ich brauche folgende Environment-Variable gesetzt:
`export EDITOR="code --wait"`

Erkläre mir danach kurz, wie ich diese Änderung anwende (z.B. per `source`).
```

#### 3. Einen Remote-Web-Server für das Team starten
*Ideal, wenn das ganze Team einen zentralen, starken Server nutzen soll.*

```text
@build Ich möchte, dass OpenCode als Web-Server auf unserem starken Firmen-Rechner läuft, sodass mein Team über den Browser darauf zugreifen kann.

Bitte gib mir den exakten Terminal-Befehl, um `opencode web` zu starten.
Bedingungen:
1. Er muss auf Port 8080 laufen.
2. Er muss über das Netzwerk erreichbar sein (Hostname 0.0.0.0).
3. Er MUSS zwingend mit einem Passwort geschützt sein (z.B. über die Environment-Variable OPENCODE_SERVER_PASSWORD).
```
