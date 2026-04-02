# 🛡️ Kategorie 3: Werkzeuge & Sicherheits-Schranken (Tools & Permissions)

### 🎯 Worum geht es?
Damit KI-Agenten nicht nur chatten, sondern echten Code schreiben können, haben sie **"Werkzeuge" (Tools)**. Sie können Dateien lesen (`read`), Code ändern (`edit`), Suchen durchführen (`grep`) oder direkt in deinem Terminal Befehle tippen (`bash`).
Das **Permission-System (Berechtigungen)** ist dein strenger Türsteher. Es regelt exakt, welches Werkzeug automatisch ausgeführt werden darf und wo der Agent zwingend auf deine Klick-Freigabe warten muss.

### 🚀 Dein Enterprise-Vorteil
* **Der Agenten-Sandkasten:** Du kannst dem Agenten erlauben, autonom Tests laufen zu lassen, ihn aber zwingen, dich zu fragen, bevor er Dateien löscht oder auf Server pusht.
* **Anti-Amok (Doom Loop):** Wenn der Agent sich in einem Fehler verbeißt und dreimal exakt denselben kaputten Code ausführt, erkennt das System diese Endlosschleife ("Doom Loop") und zieht automatisch die Notbremse.
* **Eigene Firmen-Werkzeuge:** Du kannst deine eigenen kleinen Skripte (z. B. "Lade Daten aus Jira" oder "Lösche Cache") als maßgeschneiderte Werkzeuge definieren. Der Agent lernt, diese Werkzeuge genauso natürlich zu nutzen wie seinen Lese-Befehl.

---

### 📊 Matrix: Die Sicherheits-Level (Permissions)
*Wie strikt willst du deine Agenten kontrollieren?*

| Kommando | Bedeutung | Auswirkung auf Autonomie |
| :--- | :--- | :--- |
| **`"allow"`** | **Blindflug Erlaubt** | Agent arbeitet rasend schnell, stoppt nicht. (Gut für Lesebefehle). |
| **`"ask"`** | **Check-Gate (Standard)** | Agent pausiert und ein UI-Popup fragt dich "Darf er das?". (Pflicht für Terminals). |
| **`"deny"`** | **Harte Wand** | Agent bekommt eine rote Fehlermeldung und darf die Aktion niemals ausführen. |

---

### 💡 Die Coach-Ecke (Hintergrund & Best Practices)
> **Was ist eigentlich "LSP" (Language Server Protocol)?**
> In der Doku wirst du oft über "LSP" stolpern. Kurz erklärt: Das ist die Technologie, die in deinem Code-Editor für das rote Unterstreichen von Fehlern oder für den Klick "Gehe zu Definition" zuständig ist. 
> **Warum ist das wichtig für dich?** Wenn OpenCode LSP nutzt, liest der Agent deinen Code nicht mehr wie dummen Text, sondern er **"versteht" ihn wie ein echter Entwickler**. Er weiß sofort, wo eine Funktion definiert wurde, ohne blind das ganze Projekt durchsuchen zu müssen. Das verhindert Halluzinationen und spart Token!

> ### ⚠️ COMMUNITY REALITY CHECK (März 2026)
> **Die Doku sagt:** `external_directory: "deny"` schützt vor Zugriffen außerhalb des Projekts. 
> **Die Realität:** Auf Windows-Systemen ist dieser Schutz **komplett wirkungslos**. Drive-Letter-Wechsel (z.B. von `D:\git` nach `C:\Windows`) werden nicht als "extern" erkannt (GitHub Issue #16126, #11042). Zudem können Community-Plugins wie `oh-my-opencode` existierende Security-Policies einfach zurücksetzen.
> **Workaround:** Auf Windows AUSSCHLIESSLICH in WSL/Docker arbeiten. API-Keys niemals in `auth.json` (Klartext!), sondern nur als Environment-Variablen übergeben.

---

### 🔗 Meta-Ebene & Abhängigkeiten
* **Abhängig von:** [Kategorie 01: Config](./01_CONFIG_NETWORK.md) (Das Permission-Objekt lebt in der zentralen Config-Datei).
* **Dateipfade:** Eigene (Custom) Tools schreibst du in den Ordner `.opencode/tools/*.ts`.

---

### 📋 Prompt-Bibliothek (Copy & Paste für deine Agenten)

#### 1. Projekt hart absichern (Das Sicherheits-Netz einziehen)
*Nutze diesen Prompt, um zu verhindern, dass der Agent versehentlich Dinge löscht oder geheime Keys liest.*

```text
@build Richte bitte ein striktes Permission-System in unserer `opencode.json` ein, um das Projekt abzusichern. 

Bitte setze folgende Logik um (nutze dafür das `permission` Objekt):
1. Terminal-Befehle (`bash`) müssen IMMER bei mir nachfragen ("ask"). 
   Einzige Ausnahmen: "git status" oder "npm run *" dürfen ohne Nachfrage ausgeführt werden ("allow").
2. Das Löschen von Dateien via bash ("rm *") ist strikt verboten ("deny").
3. Das Lesen (`read`) von jeglichen `.env` Dateien ist strikt verboten ("deny").

Orientierung für deine JSON-Struktur:
"permission": {
  "bash": { "*": "ask", "git status": "allow", "npm run *": "allow", "rm *": "deny" },
  "read": { "*.env": "deny", "*.env.*": "deny" }
}
```

#### 2. Ein eigenes Werkzeug anlegen (Custom Tools)
*Nutze diesen Prompt, wenn der Agent eine wiederkehrende Aufgabe mit einem festen Firmen-Skript erledigen soll.*

```text
@build Wir brauchen ein Custom Tool für OpenCode, damit du und andere Agenten diese Sandbox sicherer nutzen könnt.

Erstelle im Ordner `.opencode/tools/` eine neue Datei namens `db_check.ts`.
Das Tool soll ein lokales Skript ausführen, das unsere Datenbank testet.
Nutze die TypeScript-API von @opencode-ai/plugin mit dem `tool()` Helper.

Vorgaben für das Tool:
- description: "Prüft die lokale Datenbankverbindung und gibt Status zurück"
- execute: Führe über Bun.$ den Shell-Befehl `npm run db:ping` aus und gib das Ergebnis als Text zurück.

Bitte setze das Tool auf und bestätige mir, wenn es bereit ist.
```

#### 3. Den "Autopiloten" (LSP Code-Intelligenz) prüfen
*Nutze diesen Prompt, um dem Agenten tiefes, semantisches Code-Verständnis zu geben.*

```text
@build Stelle sicher, dass die Code-Intelligenz (LSP) für dieses Projekt optimal konfiguriert ist.
Prüfe in unserer `opencode.json`, ob der "lsp" Block existiert. 
Wenn wir z.B. TypeScript nutzen, stelle sicher, dass der "typescript" LSP nicht auf "disabled: true" steht.
Aktiviere das LSP-Tool, damit ihr Agenten Code-Definitionen präzise anspringen könnt.
```
