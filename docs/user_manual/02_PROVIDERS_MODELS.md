# 🧠 Kategorie 2: Modelle, Kostenkontrolle & Lokale KIs (Providers)

### 🎯 Worum geht es?
Die Wahl des KIs (Modell) ist der **Motor** deines Agenten. Hier steuerst du nicht nur, ob du Claude, GPT oder ein **komplett lokales Modell** ohne Internetverbindung nutzt. Du steuerst auch das **"Thinking Budget"** (Reasoning Effort): Wie lange darf die KI über ein Problem nachdenken, bevor sie tippt?

### 🚀 Dein Enterprise-Vorteil
* **Kosten- & Geschwindigkeits-Steuerung:** Du kannst **Varianten (Variants)** anlegen. So hat dein Architekten-Agent ein hohes Budget zum Denken, während der schnelle Coder-Agent auf Sparflamme ("low effort") läuft, um schnell Ergebnisse zu liefern.
* **Absolute Datensouveränität:** Du kannst OpenCode komplett an **lokale Server** (wie LM Studio oder llama.cpp) binden. Es fließen keine Daten mehr in die Cloud.
* **Observability (Überwachung):** Du kannst versteckte Header in die Server-Anfragen mogeln, um über Tools wie "Helicone" genau zu tracken, **welcher Agent wie viel Geld verbrennt**.

---

### 📊 Matrix: Reasoning-Variants (Wer darf wie lange denken?)
*Steuere das Denk-Budget (`reasoningEffort`), um API-Kosten nicht explodieren zu lassen.*

| Variante | Effort-Level | Perfekt für... | Kosten / Dauer |
| :--- | :--- | :--- | :--- |
| **`high`** | Hoch | Architekten (`@plan`), komplexe Bugfixes, Architektur-Entscheidungen | 💰💰💰 / 🐢 |
| **`medium`** | Mittel | Normale Feature-Entwicklung, Refactoring | 💰💰 / 🚶 |
| **`low`** | Niedrig / Aus | Reine Syntax-Korrekturen, Tests schreiben, Tippfehler fixen | 💰 / 🚀 |

---

### 💡 Die Coach-Ecke (Hintergrund & Best Practices)
> **Das Fallback-Routing (Nie wieder Offline-Panik)**
> Was passiert, wenn die OpenAI API ausfällt? Normalerweise bricht dein Agent ab. 
> **Der Trick:** Wenn du Provider wie *Vercel AI Gateway* nutzt, kannst du ein **Routing-Array** anlegen. Fällt Anbieter A aus, schaltet das System in Millisekunden unsichtbar auf Anbieter B um. Der Agent arbeitet einfach weiter.

---

### 🔗 Meta-Ebene & Abhängigkeiten
* **Dateipfade:** Credentials/API-Keys leben *niemals* in der Config, sondern im System-Safe (`~/.local/share/opencode/auth.json`).
* **Verwandt mit:** [Kategorie 05: Agenten](./05_AGENTS_SKILLS.md) (Dort teilst du diese "Variants" dann den spezifischen Agenten zu).

---

### 📋 Prompt-Bibliothek (Copy & Paste für deine Agenten)

#### 1. Denk-Profile (Variants) anlegen
*Schafft die Voraussetzung, um später teure und billige Agenten zu trennen.*

```text
@build Wir müssen die Token-Kosten unserer LLMs besser steuern.
Bitte lege in der `opencode.json` für das Modell "gpt-5" (beim Provider "openai") zwei "Variants" an.

1. Variante "deep_think": Soll einen hohen Reasoning-Effort haben ("high").
2. Variante "fast_code": Soll einen niedrigen Reasoning-Effort haben ("low").

Hinweis für dich:
Die Struktur ist: "provider" -> "openai" -> "models" -> "gpt-5" -> "variants" -> {"deep_think": {"reasoningEffort": "high"}, "fast_code": {...}}.
```

#### 2. Ein komplett lokales Modell (ohne Cloud) anbinden
*Ideal für streng geheime Projekte.*

```text
@build Ich habe lokal einen llama.cpp Server auf Port 8080 laufen.
Bitte binde diesen als Provider in unsere `opencode.json` ein.

Vorgaben:
- Der Provider heißt "llama.cpp".
- Er nutzt das npm-Paket "@ai-sdk/openai-compatible".
- Die BaseURL ist "http://127.0.0.1:8080/v1".
- Definiere das Modell "qwen3-coder:a3b" mit einem Kontext-Limit von 128.000.

Konfiguriere das im "provider" Block.
```

#### 3. Tracking und Caching (Custom Headers) aktivieren
*Leitet alle Anfragen über einen Tracker (z. B. Helicone), um Kosten pro Agent zu loggen.*

```text
@build Wir wollen unseren API-Traffic überwachen.
Bitte füge dem "anthropic" Provider in der `opencode.json` Custom Headers hinzu.

Vorgaben:
- Füge unter "options" -> "headers" folgende Werte hinzu:
  - "Helicone-Cache-Enabled": "true"
  - "Helicone-User-Id": "opencode-agent"

Wenn wir Helicone bereits nutzen, stelle sicher, dass die BaseURL auf das Gateway zeigt.
```
