# 🔌 Kategorie 4: Externe Tools & Plugins (MCP & ACP)

### 🎯 Worum geht es?
Dein Agent kann nicht nur Code schreiben, er kann das gesamte Internet und deine Firmen-Infrastruktur bedienen. Dazu nutzt OpenCode das **MCP (Model Context Protocol)**. Das ist eine Art USB-Anschluss für KI. Du kannst darüber Datenbanken, Jira, Sentry oder GitHub an deinen Agenten "anstöpseln". 
Außerdem kannst du mit **Plugins (TypeScript)** tief in das Gehirn des Agenten eingreifen und seine Denkprozesse abfangen (z. B. als Firewall).

### 🚀 Dein Enterprise-Vorteil
* **Der allwissende Agent:** Wenn du das Sentry-MCP (Bug-Tracker) anbindest, musst du Fehler nicht mehr erklären. Du sagst nur: *"Fixe den neusten Sentry Error"*. Der Agent loggt sich ein, liest den Stacktrace und schreibt den Code.
* **Token-Kosten sparen (Routing):** Nicht jeder Agent braucht alle Werkzeuge. Du kannst das teure Jira-Werkzeug nur dem `@plan` Agenten geben und es für den Coder-Agenten verstecken.
* **Die absolute Firewall (Plugins):** Mit dem `tool.execute.before` Plugin-Event kannst du einen Skript-Wächter bauen, der JEDEN Bash-Befehl des Agenten per Regex prüft, bevor er ausgeführt wird.

---

### 📊 Matrix: Plugins vs. MCP vs. Custom Tools
*Wann baue ich was?*

| Technologie | Wer baut es? | Wann nutzt du das? |
| :--- | :--- | :--- |
| **MCP Server** | Meist fremde Firmen | Um große, existierende Plattformen (GitHub, Jira, Google Drive) an die KI anzubinden. |
| **Custom Tool** | Du (intern) | Wenn der Agent ein einfaches, lokales Firmen-Skript (z.B. Python-Tests) ausführen soll. |
| **Plugin** | Du (intern) | Um in den KI-Lifecycle einzugreifen (z.B. Context vor dem Löschen retten, Befehle blockieren). |

---

### 💡 Die Coach-Ecke (Hintergrund & Best Practices)
> **Die OAuth-Magie bei Remote-Tools**
> Wenn du einen Remote-MCP (wie z.B. Jira) anbindest, musst du keine Passwörter ins Klartext-Config schreiben. OpenCode unterstützt **OAuth**. Das bedeutet: Beim ersten Aufruf des Tools durch den Agenten öffnet sich dein Browser. Du klickst auf "Erlauben", und OpenCode speichert das Token verschlüsselt auf deiner Festplatte. Der Agent bekommt niemals dein Passwort zu sehen!

---

### 🔗 Meta-Ebene & Abhängigkeiten
* **Abhängig von:** [Kategorie 05: Agenten](./05_AGENTS_SKILLS.md) (Um Tools zielgerichtet an Agenten zu verteilen).
* **Dateipfade:** Plugins legst du unter `.opencode/plugins/*.ts` an.

---

### 📋 Prompt-Bibliothek (Copy & Paste für deine Agenten)

#### 1. Ein externes MCP-Tool anbinden (z. B. GitHub oder Sentry)
*Macht den Agenten produktiver, indem er Fehler-Logs oder Pull-Requests selbst lesen kann.*

```text
@build Wir müssen einen neuen externen Server (MCP) an unser System anbinden, damit ihr Agenten mehr Kontext habt.
Bitte erweitere die `opencode.json` um den MCP-Block.

Füge als Beispiel den "sentry" Server hinzu:
- name: "sentry"
- type: "remote"
- url: "https://mcp.sentry.dev/mcp"
- oauth: {} (ein leeres Objekt, damit das automatische Browser-Popup getriggert wird)

Stelle sicher, dass du das bestehende JSON nicht kaputt machst!
```

#### 2. MCP-Tools nur für Spezial-Agenten freigeben (Token-Schutz)
*Verhindert, dass Coder-Agenten mit Jira-Tools überladen werden.*

```text
@build Wir haben aktuell zu viel Token-Verbrauch, weil alle Agenten alle MCP-Tools laden.
Bitte passe das Routing in der `opencode.json` an.

Regeln:
1. Deaktiviere das Tool "sentry_*" und "jira_*" GLOBAL im "tools" Block ("sentry_*": false).
2. Gehe in die Konfiguration für unseren "@plan" Agenten.
3. Erlaube NUR dem "@plan" Agenten explizit die Nutzung von "sentry_*" und "jira_*" in seinem eigenen "tools" Block.
```

#### 3. Ein Security-Plugin bauen (Firewall)
*Die absolute Lebensversicherung gegen destruktive Bash-Befehle der KI.*

```text
@build Baue mir ein Security-Plugin als letzte Verteidigungslinie.
Erstelle die Datei `.opencode/plugins/firewall.ts`.

Das Plugin soll:
1. Die TypeScript-API `@opencode-ai/plugin` nutzen.
2. Das Event `"tool.execute.before"` abhören.
3. Wenn `input.tool` den Wert "bash" hat UND `output.args.command` den String "rm -rf" enthält, dann soll das Plugin hart mit einem `throw new Error("Destruktive Befehle blockiert!")` abbrechen.
```
