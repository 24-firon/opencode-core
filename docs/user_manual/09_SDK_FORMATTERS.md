# 🧩 Kategorie 9: Daten-Strukturierung & Auto-Formatierung (SDK & Formatters)

### 🎯 Worum geht es?
KI-Modelle neigen dazu, viel zu schwafeln ("Hier ist deine Antwort..."). Wenn du OpenCode über eigene Skripte ansteuerst, brauchst du aber keine Prosa, sondern **harte, lesbare Daten** (JSON). Mit dem `@opencode-ai/sdk` kannst du die KI zwingen, in perfekten Datenstrukturen zu antworten. 
Zusätzlich sorgt das **Formatter-System** dafür, dass jeder Code, den die KI schreibt, automatisch nach deinen Firmen-Vorgaben (z.B. Einrückungen, Tabs vs. Spaces) schön gemacht wird.

### 🚀 Dein Enterprise-Vorteil
* **JSON-Zwang (Structured Output):** Du definierst ein Schema (z. B. "Ich brauche ein Feld 'Firmenname' und ein Feld 'Jahresumsatz'"). Der Agent darf *nur* ein gültiges JSON-Objekt zurückgeben, das exakt in deine Datenbank passt. Kein Parsing-Chaos mehr!
* **Unsichtbare Kontext-Fütterung:** Über das SDK kannst du dem Agenten heimlich hunderte Seiten Dokumentation in den Speicher laden (`noReply: true`). Er liest es, aber er verschwendet keine teure API-Zeit damit, dir "Okay, habe ich gelesen" zu antworten.
* **Auto-Formatter:** Du musst den Code der KI nicht mehr aufräumen. OpenCode erkennt eure Werkzeuge (Prettier, Biome, Ruff) und wendet sie in der Millisekunde an, in der die KI die Datei speichert.

---

### 📊 Matrix: Die Macht der "Format"-Befehle im SDK
*Wie zwingst du die KI zu perfekten Ergebnissen?*

| Output-Typ | Was liefert die KI? | Perfekt für... |
| :--- | :--- | :--- |
| **`"text"`** | Normale Chat-Antworten (Markdown) | Dialoge, Erklärungen, Code-Snippets im Chat. |
| **`"json_schema"`** | Strikt validiertes JSON (z. B. `{ "firma": "Apple" }`) | Daten-Extraktion (Scraping), API-Verknüpfungen, Datenbank-Einträge. |

---

### 💡 Die Coach-Ecke (Hintergrund & Best Practices)
> **Der $FILE Trick bei Custom Formattern**
> OpenCode kennt die meisten Formatierungs-Tools (wie `prettier`) automatisch. Wenn deine Firma aber ein völlig exotisches Tool benutzt, musst du es OpenCode beibringen. 
> **Das Wichtigste:** In der Config musst du den Befehl definieren (z. B. `mein-firmen-tool --clean`). OpenCode weiß aber nicht, *welche* Datei es putzen soll. Dafür musst du zwingend das magische Platzhalter-Wort `$FILE` in den Befehl einbauen! (Siehe Prompt 3).

---

### 🔗 Meta-Ebene & Abhängigkeiten
* **Abhängig von:** [Kategorie 06: Headless Ops](./06_CLI_SERVER.md) (Um das SDK nutzen zu können, muss der OpenCode Server laufen).

---

### 📋 Prompt-Bibliothek (Copy & Paste für deine Agenten)

#### 1. Ein Node.js Skript für striktes JSON (Structured Output) bauen
*Lass den Agenten ein Skript schreiben, das strukturierte Daten extrahiert, ohne zu schwafeln.*

```text
@build Wir brauchen ein Node.js Skript, das das @opencode-ai/sdk nutzt, um Daten aus einem Text zu ziehen.

Vorgaben für das Skript:
1. Nutze `client.session.prompt()`.
2. Sende den Text: "Finde alle genannten Personen und ihr Alter in diesem Text: ..."
3. Wende den "json_schema" Zwang an (Structured Output).
4. Das Schema MUSS ein Array aus Objekten sein, wobei jedes Objekt "name" (String) und "age" (Number) erfordert. Setze "retryCount" auf 2.
5. Logge am Ende `result.data.info.structured_output` in die Konsole.
```

#### 2. Kontext "leise" injizieren (Geld & Zeit sparen)
*Schiebt Wissen in den Agenten, ohne eine nutzlose Antwort zu provozieren.*

```text
@build Baue mir ein kurzes Skript-Snippet (SDK), das unserem Agenten Kontext beibringt, ohne ihn zum Antworten zu zwingen.

Vorgaben:
1. Nutze `client.session.prompt()`.
2. Übergib einen langen String mit Firmenregeln als "text" Part.
3. WICHTIG: Setze die Flag `noReply: true` im Body!
```

#### 3. Einen exotischen Auto-Formatter (Firmen-Standard) einrichten
*Zwingt den Agenten, seinen generierten Code durch euer eigenes Putz-Skript zu jagen.*

```text
@build Wir nutzen ein eigenes Tool, um Markdown-Dateien hübsch zu formatieren. OpenCode kennt das nicht automatisch.
Bitte konfiguriere unsere `opencode.json` so, dass dieser Custom Formatter immer greift.

Vorgaben:
- Block: "formatter"
- Name des Formatters: "custom-markdown-formatter"
- Dateiendungen ("extensions"): Nur für ".md" Dateien.
- Command: Führe "deno fmt" aus. WICHTIG: Du MUSST das "$FILE" Token am Ende des Befehls anhängen, damit OpenCode die Zieldatei übergeben kann!
```
