# 🤖 Kategorie 5: Agenten, Skills & Makros (Orchestrierung)

### 🎯 Worum geht es?
OpenCode ist kein einzelner Chatbot, sondern ein **Schwarm aus Spezialisten**. Du kannst steuern, *wer* (welcher Agent) *wann* auf *welches Wissen* (Skills) zugreifen darf. 
Statt einem Agenten ein 50-seitiges Regelwerk zu geben, baust du **dynamische Module** (Skills und Commands), die sich die Agenten nur dann holen, wenn sie sie wirklich brauchen.

### 🚀 Dein Enterprise-Vorteil
* **Token-Ersparnis:** Durch modulare *Skills* wird das Gedächtnis des Agenten nicht zugemüllt. Er holt sich das Wissen zum Thema "Datenbank", nur wenn er an der Datenbank arbeitet.
* **Sichere Hierarchien:** Du verhinderst Chaos, indem du klare **Aufgabentrennungen** definierst (z. B. der Architekt plant nur, der Coder tippt nur).
* **Automatisierte Workflows:** Mit *Commands* baust du dir auf Knopfdruck eigene "Zaubersprüche" (Makros) für Routineaufgaben.

---

### 📊 Matrix: Primary Agents vs. Subagents
*Wann nutzt man was?*

| Feature | 👑 Primary Agent (z. B. `@plan`) | 👷 Subagent (z. B. `@explore`) |
| :--- | :--- | :--- |
| **Fokus** | Dialog mit dir, Gesamtplanung | Hintergrundarbeit, isolierte Aufgaben |
| **Sichtbarkeit** | Du siehst jeden seiner Schritte im Chat | Arbeitet unsichtbar, liefert nur das Ergebnis |
| **Weck-Mechanismus** | Von dir manuell aufgerufen (`@`) | Wird vom Primary Agent (KI) geweckt |
| **Gefahr von Chaos** | Hoch (Kontextfenster wird schnell voll) | Gering (Startet immer mit frischem Gedächtnis) |

---

### 💡 Die Coach-Ecke (Hintergrund & Best Practices)
> **Der "Context Bloat" und warum Skills so wichtig sind**
> Stell dir vor, du gibst einem neuen Mitarbeiter an seinem ersten Tag ein 10.000-seitiges Handbuch und sagst: "Merk dir das alles, bevor du anfängst." Genau das passiert, wenn du alle Firmenregeln in eine einzige `AGENTS.md` Datei schreibst. Der Agent wird dumm, langsam und vergisst Dinge.
> **Die Lösung:** `SKILL.md` Dateien. Du legst kleine, mundgerechte Wissenshappen an (z. B. "Wie wir Git-Commits schreiben"). Der Agent weiß, dass dieser Skill existiert, und **lädt ihn aktiv herunter**, wenn er Code committen will.

> ### ⚠️ COMMUNITY REALITY CHECK (März 2026)
> **Die Doku sagt:** Subagenten erben den Context und arbeiten parallel. 
> **Die Realität:** In langen Sessions (>1h) verlieren Agenten nach der automatischen Context-Compaction ZIELE, offene TODOs und technische Entscheidungen. Subagent-Entscheidungen "bluten" in den Primäragenten zurück ("Context Bleeding"). Der Plan-Mode wird bei Modell-Wechseln ignoriert (Reddit r/opencodeCLI).
> **Workaround:** Community-Plugins wie `opencode-working-memory` oder `opencode-supermemory` installieren (erzwingen persistentes Gedächtnis). Für echte Isolation `permission.task` auf `"deny"` setzen.

---

### 🔗 Meta-Ebene & Abhängigkeiten
* **Abhängig von:** [Kategorie 03: Tools & Permissions](./03_TOOLS_PERMISSIONS.md) 
  *(Warum? Weil du über das Permission-System steuern musst, welcher Agent welche Skills überhaupt sehen darf!)*
* **Dateipfade:** 
  * Skills leben in `.opencode/skills/<name>/SKILL.md`
  * Commands leben in `.opencode/commands/<name>.md`

---

### 📋 Prompt-Bibliothek (Copy & Paste für deine Agenten)

#### 1. Einen neuen Subagenten erschaffen und delegieren
*Erzeugt einen Spezialisten, der im Hintergrund arbeitet, ohne deinen Haupt-Chat zu fluten.*

```text
@build Wir brauchen einen neuen Subagenten für Code-Reviews. 
Bitte erstelle oder konfiguriere in der `opencode.json` (oder im agents-Ordner) einen Agenten namens "reviewer".

WICHTIG für deine Konfiguration:
- Setze das Limit für seine autonomen Schleifen ("steps") auf maximal 3, damit er sich nicht verrennt.
- Verbirg ihn aus meinem UI-Menü ("hidden": true).
- Konfiguriere die Permissions so, dass unser Haupt-Agent (@build) das Recht hat, diesen Subagenten über das "task"-Tool zu wecken.

Beispiel-Logik für die Permission des Hauptagenten:
"permission": { "task": { "reviewer": "allow" } }
```

#### 2. Firmenwissen als "Skill" auslagern
*Verhindert das Vollmüllen des Agenten-Gedächtnisses.*

```text
@build Bitte lagere unsere Datenbank-Regeln in einen dynamischen Skill aus.
Erstelle dazu das Verzeichnis `.opencode/skills/db-rules/` und darin eine `SKILL.md`.

Regeln für den Aufbau der Datei:
1. Sie MUSS YAML-Frontmatter mit `name: db-rules` und einer kurzen `description` haben (z. B. "Nutze dies, wenn du SQL-Abfragen schreibst").
2. Darunter packst du als Markdown unsere Regeln: "Nutze immer Prepared Statements", "Keine DROP TABLE Befehle", etc.
3. Sag mir Bescheid, wenn der Skill registriert ist, damit ich ihn testen kann.
```

#### 3. Ein Makro (Command) bauen
*Für wiederkehrende Standard-Aufgaben, die du per /Befehl auslösen willst.*

```text
@build Erstelle mir einen Command für Routine-Checks.
Lege eine Datei `.opencode/commands/check.md` an. 

Der Command soll:
1. Den Bash-Output von `npm run lint` injizieren (Nutze dafür die !`Befehl` Syntax).
2. Zwingend in einem isolierten Hintergrund-Task laufen. Setze dafür im Frontmatter `subtask: true`.
3. Beschreibe im Text des Commands, dass der Agent die Fehler analysieren und Lösungswege vorschlagen soll.
```
