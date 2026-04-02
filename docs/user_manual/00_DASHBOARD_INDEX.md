# 🧭 OpenCode Management Dashboard (Master Index)

### 🎯 Worum geht es?
Dieses Verzeichnis ist dein **Steuerungspult** für das OpenCode KI-System. Hier findest du nicht das technische "Wie" (das überlässt du deinen Agenten), sondern das **"Was"** und **"Warum"**. 

Jede Kategorie enthält:
- Die **strategischen Hebel** und Enterprise-Vorteile
- **Community Reality Checks** (Echte Bugs & Workarounds aus GitHub/Reddit — markiert mit ⚠️)
- **Coach-Ecken** (Hintergrundwissen auch für Nicht-Entwickler)
- **Fertige Prompts** per Copy & Paste für deine Agenten

> ### 📅 Aktualitäts-Status
> Letzte Community-Prüfung: **März 2026** — Stand der entdeckten Bugs und Workarounds.
> **Nächste Prüfung fällig:** April 2026

---

### 📂 Die strategischen Kategorien

| # | Modul | Worum geht es? (Dein Fokus) |
| :--- | :--- | :--- |
| **01** | [**Sicherheit & Basis-Setup**](./01_CONFIG_NETWORK.md) | Wie verhinderst du Datenabfluss? Wie schützt du riesige Repos vor KI-Crashes? |
| **02** | [**Modelle & Kostenkontrolle**](./02_PROVIDERS_MODELS.md) | Wie steuerst du, wie lange ein Agent "nachdenkt" (Kosten)? Wie nutzt du lokale Modelle? |
| **03** | [**Werkzeuge & Berechtigungen**](./03_TOOLS_PERMISSIONS.md) | Der Türsteher. Wie stellst du sicher, dass die KI niemals etwas ohne deine Erlaubnis löscht? |
| **04** | [**Plugins & Externe Anbindungen**](./04_MCP_PLUGINS.md) | Wie bringst du dem Agenten bei, Jira-Tickets zu lesen oder eigene Skripte als Schutzwall zu nutzen? |
| **05** | [**Agenten-Schwarm & Makros**](./05_AGENTS_SKILLS.md) | Wie baust du Spezialisten (z.B. Tester), wie lagerst du Firmenwissen in "Skills" aus? |
| **06** | [**Hintergrund-Automatisierung**](./06_CLI_SERVER.md) | Wie nutzt du OpenCode als unsichtbaren Motor ohne die Benutzeroberfläche (für eigene Tools)? |
| **07** | [**Benutzeroberflächen & Privacy**](./07_TUI_WEB_SHARE.md) | Wie stoppst du das automatische "Teilen" von Chats ins offene Internet? |
| **08** | [**GitHub / GitLab Integration**](./08_CI_CD_INTEGRATION.md) | Wie scannen Agenten nachts automatisch deinen Code nach TODOs oder reviewen Pull Requests? |
| **09** | [**Strikte Outputs & Formatierung**](./09_SDK_FORMATTERS.md) | Wie zwingst du die KI, sauberes JSON statt chaotischem Text zu liefern? Wie formatiert sie Code? |
| **10** | [**Fehlerbehebung (Troubleshooting)**](./10_TROUBLESHOOTING.md) | Was tust du, wenn die KI plötzlich "Model not found" schreit? Wo liegen die unsichtbaren Caches? |

---

### 💡 So nutzt du dieses Handbuch am besten
1. **Überfliege** die Matrizen und fettgedruckten Begriffe.
2. Wenn du ein Feature brauchst, scrolle zur **Prompt-Bibliothek**.
3. **Kopiere den Prompt** und wirf ihn deinem Haupt-Agenten (z. B. `@build` oder `@plan`) vor.
4. **Lehne dich zurück.** Der Prompt enthält bereits den versteckten Maschinen-Code (JSON-Beispiele), sodass der Agent exakt weiß, in welcher Datei er drehen muss.
