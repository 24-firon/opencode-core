# ⚙️ Kategorie 6: Hintergrund-Betrieb & APIs (Server & Headless)

### 🎯 Worum geht es?
Du bist nicht darauf beschränkt, mit OpenCode über das Chat-Fenster (TUI) zu sprechen. Im Hintergrund ist OpenCode ein vollwertiger **REST-Server (OpenAPI)**. Das bedeutet, du kannst OpenCode über Skripte, externe Tools oder Cron-Jobs "fernsteuern", als wäre es ein unsichtbarer Motor.

### 🚀 Dein Enterprise-Vorteil
* **Automation ohne Klicks:** Du kannst ein Python-Skript schreiben, das jede Nacht um 3:00 Uhr einen OpenCode-Agenten weckt, ihn bittet, alle neuen GitHub-Issues zu lesen und Entwürfe dafür zu programmieren.
* **Warm-Boot für Speed:** Externe Tools (MCPs) brauchen oft lange zum Starten. Wenn du OpenCode als `daemon` (im Hintergrund) laufen lässt, entfällt die Boot-Zeit. Jeder neue Prompt startet sofort.
* **Fire-and-Forget:** Über spezielle API-Endpunkte kannst du dem System riesige Datenmengen zuwerfen, ohne dass das System antworten muss. Es lernt einfach "leise" mit.

---

### 📊 Matrix: Die 3 wichtigsten API-Routen für Manager
*Wenn du eigene Skripte baust, sind diese HTTP-Endpoints dein Werkzeug.*

| Endpoint | Methode | Warum ist das geil? |
| :--- | :--- | :--- |
| **`/session/:id/message`** | `POST` | Der Standard-Weg, um einen Prompt abzusenden. Unterstützt `noReply: true` – damit fütterst du den Agenten mit 100 Seiten Doku, und er liest sie sofort, ohne dir mit Text zu antworten. Spart extrem Zeit! |
| **`/session/:id/prompt_async`** | `POST` | Feuert einen Befehl ab und blockiert dein System nicht. Perfekt, wenn der Agent im Hintergrund eine stundenlange Aufgabe erledigen soll. |
| **`/find`** | `GET` | OpenCode hat eine rasend schnelle Code-Suchmaschine eingebaut (Ripgrep). Über diese API kannst du in Millisekunden jeden Begriff im ganzen Projekt finden. |

---

### 💡 Die Coach-Ecke (Hintergrund & Best Practices)
> **Die Gefahr des "Context Compacting" (Auto-Zerstörung)**
> KI-Modelle haben ein Gedächtnislimit (Token-Limit). Wenn ein Agent zu lange läuft, erreicht er dieses Limit. OpenCode ist clever: Es fasst alte Chat-Nachrichten automatisch zusammen, löscht sie und rettet so den Speicher ("Compaction"). 
> **Die Warnung:** Wenn du OpenCode über die API für extrem präzise Code-Generierungen nutzt, kann diese Zusammenfassung wichtige Details verschlucken! Wenn du absolute Genauigkeit über lange Zeit brauchst, schalte das Feature per Env-Var ab (`OPENCODE_DISABLE_AUTOCOMPACT=1`), aber bereite dich auf hohe API-Kosten vor!

> ### ⚠️ COMMUNITY REALITY CHECK (März 2026)
> **Die Doku sagt:** `OPENCODE_DISABLE_AUTOCOMPACT` verhindert Context-Loss. 
> **Die Realität:** Diese Env-Var verhindert JEDE Compaction. Bei langen Headless-Sessions wächst der Memory-Footprint exponentiell bis zum **OOM Crash**. Zudem hat der REST-Server by default KEIN Authentication-Layer — wer `opencode serve` auf `0.0.0.0` exposed, exponiert die gesamte Entwicklungsumgebung.
> **Workaround:** Stattdessen `experimental.session.compacting` in der Config tunen (nicht komplett abschalten). Und ZWINGEND `OPENCODE_SERVER_PASSWORD` setzen, wenn der Server im Netzwerk erreichbar ist.

---

### 🔗 Meta-Ebene & Abhängigkeiten
* **Abhängig von:** [Kategorie 01: Config](./01_CONFIG_NETWORK.md) (Um den Server-Port und Passwörter festzulegen).
* **Verwandt mit:** [Kategorie 09: SDK](./09_SDK_FORMATTERS.md) (Das TypeScript SDK ist der einfachste Weg, diesen Server anzusprechen).

---

### 📋 Prompt-Bibliothek (Copy & Paste für deine Agenten)

#### 1. Den Server-Daemon starten (Warm-Boot)
*Nutze diesen Befehl nicht beim Agenten, sondern in deinem eigenen Terminal, um OpenCode als Hintergrund-Dienst laufen zu lassen.*

```bash
# Sichert den Server mit einem Passwort und öffnet ihn auf Port 4096
OPENCODE_SERVER_PASSWORD=geheim opencode serve --port 4096
```

#### 2. Ein Skript schreiben, das den Agenten steuert
*Lass den Agenten ein kleines Node.js Skript bauen, das OpenCode über die REST-API fernsteuert.*

```text
@build Baue mir ein kleines Node.js Skript (fetch_example.js), das unseren Headless OpenCode Server anspricht.

Das Skript soll:
1. Einen POST Request an `http://localhost:4096/session/123/message` senden.
2. Das JSON-Body soll enthalten: 
   - `parts: [{ type: "text", text: "Lese die README und lerne den Inhalt." }]`
   - `noReply: true` (Ganz wichtig, damit wir nicht auf eine KI-Antwort warten müssen).

Bitte setze Basic Auth (opencode:geheim) im Header.
```

#### 3. Das Auto-Compacting deaktivieren
*Nutze dies, wenn dein Agent im Hintergrund extrem tiefen Code analysieren muss und nichts vergessen darf.*

```text
@build Wir wollen OpenCode im Headless-Modus für ein riesiges Refactoring nutzen. 
Um zu verhindern, dass Kontext durch Zusammenfassungen verloren geht, richte in unserem Bash-Startskript (oder Dockerfile) folgende Environment Variable ein:
`export OPENCODE_DISABLE_AUTOCOMPACT=1`
Erkläre mir kurz in 2 Sätzen die Risiken (Token-Limits) bei dieser Einstellung.
```
