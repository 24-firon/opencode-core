# 📋 OpenCode Context-Dispatcher — Architekturbericht

> **Version:** März 2026 | Validiert gegen offizielle Dokumentation: [opencode.ai/docs](https://opencode.ai/docs/config/)
> **Scope:** Vollständige Erklärung der Konfigurationsarchitektur, Abhängigkeiten, Potenziale und Risiken.
> **Zielgruppe:** Entwickler, die dieses System erstmalig einrichten oder von einer älteren Version migrieren.

---

## 🗺️ Inhaltsverzeichnis

1. [Was ist OpenCode?](#was-ist-opencode)
2. [Die Migrations-Geschichte: Was hat sich geändert?](#die-migrations-geschichte)
3. [Konfigurationsarchitektur im Detail](#konfigurationsarchitektur)
4. [Die Dateien dieses Projekts erklärt](#die-dateien-dieses-projekts)
5. [Abhängigkeitsgraph](#abhängigkeitsgraph)
6. [MCP — Model Context Protocol](#mcp--model-context-protocol)
7. [Das Agenten-System](#das-agenten-system)
8. [Bekannte Probleme & Workarounds](#bekannte-probleme--workarounds)
9. [Potenziale & Synergie-Effekte](#potenziale--synergie-effekte)
10. [Sicherheitsbetrachtung](#sicherheitsbetrachtung)
11. [Checkliste: Inbetriebnahme](#checkliste-inbetriebnahme)

---

## Was ist OpenCode?

OpenCode ist eine AI-gestützte Entwicklungsumgebung — konzeptionell vergleichbar mit Cursor oder Claude Code, aber Open Source, terminal-basiert und hochgradig konfigurierbar. Es verbindet verschiedene LLM-Provider (Anthropic, OpenAI, Amazon Bedrock, lokale Modelle etc.) mit einem agentengesteuerten Entwicklungsworkflow direkt im Terminal.

Das System funktioniert grundlegend so: Der Nutzer beschreibt eine Aufgabe. OpenCode wählt den passenden Agenten, gibt ihm die konfigurierten Werkzeuge (File-Lesen, Bash, Web-Fetch, MCP-Server) und führt iterative Schritte aus, bis die Aufgabe erledigt ist. Die gesamte Konfiguration — welches Modell, welche Regeln, welche Werkzeuge, welche Agenten — steuert man über die in diesem Projekt enthaltenen Dateien.

---

## Die Migrations-Geschichte

### Das Problem (Stand: vor v1.2.x)

Ältere Versionen von OpenCode verwendeten Keys in `opencode.json`, die inzwischen **vollständig entfernt** wurden. Der Fehler beim Start der IDE:

```
Unrecognized keys: "ignore_patterns", "customInstructions"
```

...ist eindeutig: Diese Keys existieren im Schema schlicht nicht mehr. Es handelt sich **nicht** um eine Umbenennung mit Fallback — sie wurden ohne Migration entfernt.

### Die Migrations-Tabelle

| Alter Key (❌ entfernt) | Neuer Key (✅ aktuell) | Strukturänderung | Anmerkung |
|---|---|---|---|
| `"ignore_patterns": [...]` | `"watcher": { "ignore": [...] }` | Top-Level → verschachtelt | Glob-Syntax identisch |
| `"customInstructions": [...]` | `"instructions": [...]` | Name geändert | Pfade direkt, kein `{file:...}` |
| `"theme": "..."` in opencode.json | In `tui.json` ausgelagert | Separate Datei | Automatisch migriert wenn möglich |
| `"keybinds": { ... }` in opencode.json | In `tui.json` ausgelagert | Separate Datei | Automatisch migriert wenn möglich |
| `"tui": { ... }` in opencode.json | In `tui.json` ausgelagert | Separate Datei | Deprecated, aber noch parsbar |

### Die Variablensubstitutions-Konfusion

Ein häufiges Missverständnis: Die Syntax `{file:./pfad.md}` existiert zwar in OpenCode, aber sie gehört **nicht** in das `instructions`-Array. Sie ist eine allgemeine Variablensubstitution, die in Feldern wie API-Keys oder Custom-Strings funktioniert:

```jsonc
// ✅ Korrekt: Variablensubstitution in einem String-Feld
"someApiKey": "{file:~/.secrets/api-key.txt}"

// ✅ Korrekt: instructions akzeptiert direkte Pfade
"instructions": [
  ".opencode/rules/global-context.md",   // relativer Pfad
  "~/.config/opencode/global-rules.md",  // absoluter Pfad mit ~
  ".opencode/rules/*.md",                // Glob-Pattern
  "https://example.com/rules.md"         // Remote-URL
]

// ❌ Falsch: {file:...} in instructions
"instructions": [
  "{file:.opencode/rules/global-context.md}"  // FUNKTIONIERT NICHT
]
```

---

## Konfigurationsarchitektur

### Die 6-Ebenen-Hierarchie

OpenCode's Konfiguration ist additiv — Einstellungen werden zusammengeführt, nicht ersetzt. Spätere Quellen überschreiben nur bei Konflikten:

```
Priorität (niedrig → hoch)
────────────────────────────────────────────────────────────
1. Remote Config         (.well-known/opencode)
   Org-weite Defaults, automatisch geladen beim Auth
   │
2. Global Config         (~/.config/opencode/opencode.json)
   User-weite Einstellungen, Provider-Credentials
   │
3. Custom Config         (OPENCODE_CONFIG Env-Var)
   Spezielle Override-Datei, zwischen Global und Projekt
   │
4. Projekt Config        (opencode.jsonc im Projekt-Root)
   ← DAS IST UNSERE DATEI
   │
5. .opencode Directory   (.opencode/ Agenten, Commands, Plugins)
   Projektspezifische Erweiterungen
   │
6. Inline Config         (OPENCODE_CONFIG_CONTENT Env-Var)
   Runtime-Override, höchste Priorität
────────────────────────────────────────────────────────────
```

### Was bedeutet "additiv"?

Stell dir vor, du hast in deiner globalen Config `autoupdate: true` und in deiner Projekt-Config `model: "anthropic/claude-sonnet-4-5"`. Das Ergebnis ist **nicht** das eine oder das andere — es ist **beides**:

```json
// Effektive Konfiguration (Merge-Ergebnis):
{
  "autoupdate": true,           // aus global
  "model": "anthropic/claude-sonnet-4-5"  // aus projekt
}
```

Nur bei direkten Konflikten (beide Ebenen setzen denselben Key) gewinnt die höhere Ebene.

### Warum zwei Config-Dateien? (opencode.jsonc vs. tui.json)

OpenCode unterscheidet strikt zwischen **Server-Config** und **TUI-Config**:

- **`opencode.jsonc`** (Schema: `opencode.ai/config.json`): Alles was die KI betrifft — Modelle, Provider, MCP-Server, Agenten, Permissions, Instructions. Diese Datei ist sicher für Git-Commits.
- **`tui.json`** (Schema: `opencode.ai/tui.json`): Alles was das Interface betrifft — Theme, Keybindings, visuelle Einstellungen. Kann persönlich sein, muss nicht ins Repo.

Diese Trennung ist seit v1.2.x verbindlich. Wer `theme` oder `keybinds` noch in `opencode.json` hat, bekommt eine Deprecation-Warnung — OpenCode versucht automatisch zu migrieren, aber das ist kein dauerhafter Zustand.

---

## Die Dateien dieses Projekts

### Übersicht aller generierten Dateien

```
Projekt-Root/
│
├── opencode.jsonc                    ← Haupt-Konfiguration
│   Scope: Gesamtes Projekt
│   Git: JA (kein Secrets-Klartext)
│   Schema: opencode.ai/config.json
│
├── tui.json                          ← Interface-Einstellungen
│   Scope: Gesamtes Projekt (oder global)
│   Git: OPTIONAL (persönlicher Geschmack)
│   Schema: opencode.ai/tui.json
│
├── AGENTS.md                         ← Primäre Regelquelle
│   Scope: Gesamtes Projekt
│   Git: JA (Team-Regeln)
│   Lädt: Automatisch bei jedem Session-Start
│
└── .opencode/
    │
    ├── agents/                       ← Custom-Agenten-Definitionen
    │   ├── dispatcher.md             Subagent: Task-Routing
    │   ├── reviewer.md               Subagent: Code-Review
    │   └── docs-writer.md            Subagent: Dokumentation
    │   Scope: Dieses Projekt
    │   Git: JA
    │
    └── rules/                        ← Modulare Instruction-Files
        ├── global-context.md         Kontext & universelle Regeln
        ├── code-style.md             Stil-Vorgaben
        └── agent-dispatch.md         Routing-Logik
        Scope: Via instructions-Array geladen
        Git: JA
```

### Detailbeschreibung jeder Datei

#### `opencode.jsonc` — Die Schaltzentrale

Dies ist die primäre Konfigurationsdatei. Hier werden alle Runtime-Entscheidungen getroffen: Welches KI-Modell wird verwendet? Welche externen Tools (MCP-Server) stehen zur Verfügung? Welche Dateien soll der File-Watcher ignorieren? Welche externe Markdown-Regeln sollen geladen werden?

Die Datei nutzt das JSONC-Format (JSON with Comments), was durch den `.jsonc`-Suffix signalisiert wird. OpenCode unterstützt beide Formate — `.json` und `.jsonc` — vollständig. JSONC empfohlen, weil Kommentare bei Konfigurations-Dateien entscheidend für Wartbarkeit sind.

Kritisch: **Kein einziger API-Key oder Secret sollte jemals im Klartext in dieser Datei stehen.** Für sensible Werte gibt es die `{env:VAR_NAME}`-Syntax.

#### `AGENTS.md` — Das Regelwerk

Die `AGENTS.md` im Projekt-Root ist der primäre Eintrittspunkt für Verhaltensregeln. Sie wird bei jedem Session-Start automatisch geladen — ohne jegliche Konfiguration. OpenCode unterstützt darüber hinaus Claude Code-Kompatibilität: Falls keine `AGENTS.md` existiert, wird nach `CLAUDE.md` gesucht.

Wichtig: `AGENTS.md` und die via `instructions` geladenen Dateien werden **kombiniert**, nicht ersetzt. Das bedeutet, man kann allgemeine Regeln in `AGENTS.md` haben und spezialisierte Detail-Regeln in `.opencode/rules/`.

#### `.opencode/agents/*.md` — Custom-Agenten

Jede Markdown-Datei in `.opencode/agents/` wird automatisch zu einem benutzbaren Agenten. Der Dateiname (ohne `.md`) wird die Agenten-ID: `dispatcher.md` → erreichbar als `@dispatcher`.

Das YAML-Frontmatter (zwischen `---` Trennlinien) definiert alle technischen Parameter. Der Markdown-Body unterhalb ist der System-Prompt des Agenten. Diese Trennung von Konfiguration und Anweisung ist elegant: Techniker pflegen das Frontmatter, Domänen-Experten können den Prompt-Teil anpassen.

#### `.opencode/rules/*.md` — Modulare Regelfiles

Diese Dateien werden **nur geladen**, weil sie explizit im `instructions`-Array in `opencode.jsonc` referenziert sind. Sie existieren nicht als Auto-Discovery-Files. Die Glob-Syntax `".opencode/rules/*.md"` lädt alle `.md`-Dateien in diesem Verzeichnis — praktisch für wachsende Regelsammlungen.

Vorteil dieser Modularisierung: Einzelne Regelfiles können pro Branch, per Feature oder per Team-Rolle variiert werden, ohne die Haupt-AGENTS.md zu berühren.

---

## Abhängigkeitsgraph

```
┌─────────────────────────────────────────────────────────────────┐
│                     OpenCode Session-Start                      │
└──────────────────────────┬──────────────────────────────────────┘
                           │ lädt
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    opencode.jsonc                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │  model/      │  │  watcher.    │  │  instructions:       │  │
│  │  small_model │  │  ignore: []  │  │  - global-context.md │  │
│  └──────────────┘  └──────────────┘  │  - code-style.md     │  │
│  ┌──────────────┐  ┌──────────────┐  │  - agent-dispatch.md │  │
│  │  mcp: {}     │  │  agent: {}   │  │  - *.md (glob)       │  │
│  │  (externe    │  │  (inline     │  └──────────────────────┘  │
│  │   Server)    │  │   overrides) │                            │
│  └──────────────┘  └──────────────┘                            │
└──────────────────────────┬──────────────────────────────────────┘
                           │ kombiniert mit
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                      AGENTS.md                                  │
│              (automatisch, immer geladen)                       │
└──────────────────────────┬──────────────────────────────────────┘
                           │ Auto-Discovery
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│              .opencode/agents/*.md                              │
│   dispatcher.md   reviewer.md   docs-writer.md                  │
│   (alle Dateien werden als Agenten registriert)                 │
└──────────────────────────┬──────────────────────────────────────┘
                           │ Agenten können via Task-Tool
                           │ andere Agenten aufrufen
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│              MCP-Server (externe Werkzeuge)                     │
│   context7 (remote)   filesystem (local)   fetch (local)        │
│   Agenten haben Zugriff auf MCP-Tools gemäß ihren Permissions   │
└─────────────────────────────────────────────────────────────────┘
```

---

## MCP — Model Context Protocol

### Was ist MCP?

MCP (Model Context Protocol) ist ein offenes Protokoll, das KI-Assistenten mit externen Datenquellen und Tools verbindet — vergleichbar mit einem Plugin-System für LLMs. Statt den Agenten nur auf lokale Dateien und Bash-Commands zu beschränken, kann er über MCP-Server auf externe Systeme zugreifen: Datenbanken, APIs, spezialisierte Suche, GitHub, und vieles mehr.

### Lokale vs. Remote MCP-Server

| Eigenschaft | `"type": "local"` | `"type": "remote"` |
|---|---|---|
| Ausführung | Lokaler Prozess (stdio) | HTTPS-Endpunkt |
| Latenz | Sehr niedrig | Netzwerk-abhängig |
| Einrichtung | `command` Array nötig | Nur URL nötig |
| Auth | Via `env` Block | Via `headers` Block |
| Verfügbarkeit offline | Ja | Nein |
| Beispiel | `@modelcontextprotocol/server-filesystem` | `mcp.context7.com/mcp` |

### Sicherheit: Die `{env:...}`-Syntax

Dieser Punkt kann nicht genug betont werden: **MCP-Server-Credentials gehören niemals in die Config-Datei im Klartext.** OpenCode bietet die `{env:VAR_NAME}`-Substitution genau dafür:

```jsonc
// ❌ GEFÄHRLICH — niemals so konfigurieren
"headers": {
  "Authorization": "Bearer sk-ant-api03-abc123..."
}

// ✅ SICHER — Wert wird aus Umgebungsvariable gelesen
"headers": {
  "Authorization": "Bearer {env:ANTHROPIC_API_KEY}"
}
```

Wenn die Umgebungsvariable nicht gesetzt ist, wird sie durch einen leeren String ersetzt — der MCP-Server schlägt dann bei der Authentifizierung fehl, aber die Config-Datei bleibt sicher.

Analog funktioniert `{file:path/to/file}` für Werte in separaten Dateien, die nicht ins Git-Repo gehören.

---

## Das Agenten-System

### Built-in Agenten (immer verfügbar)

OpenCode kommt mit vier eingebauten Agenten, die nicht konfiguriert werden müssen:

| Agent | Typ | Zugriff | Anwendungsfall |
|---|---|---|---|
| **Build** | Primary | Alles | Standard-Entwicklung, Implementierung |
| **Plan** | Primary | Nur Lesen (edit/bash: ask) | Analyse, Architektur, Planning |
| **General** | Subagent | Fast alles (kein todo) | Parallele Multi-Step-Tasks |
| **Explore** | Subagent | Read-only | Schnelle Codebase-Exploration |

Zusätzlich gibt es versteckte System-Agenten (`compaction`, `title`, `summary`), die automatisch im Hintergrund laufen.

### Inline vs. Markdown-Agenten

Es gibt zwei Wege, Agenten zu konfigurieren:

**Inline in `opencode.jsonc`** — geeignet für einfache Overrides der Built-in-Agenten:
```jsonc
"agent": {
  "build": {
    "temperature": 0.3,
    "model": "anthropic/claude-sonnet-4-5"
  }
}
```

**Markdown-Files in `.opencode/agents/`** — der empfohlene Weg für Custom-Agenten. Bietet volle Kontrolle über System-Prompt, Permissions, Mode und alle Parameter. Der Markdown-Body wird direkt als System-Prompt genutzt.

### Primary vs. Subagent: Der entscheidende Unterschied

- **Primary Agenten** sind direkt interaktiv: Der Nutzer wechselt zwischen ihnen (Tab-Taste), sie haben eine TUI-Repräsentation. Es kann mehrere primäre Agenten geben, aber immer nur einer ist aktiv.

- **Subagenten** werden von primären Agenten über das Task-Tool aufgerufen oder via `@mention`. Sie laufen in Child-Sessions, können parallelisiert werden und sind spezialisiert. Der Nutzer sieht ihre Ergebnisse, interagiert aber nicht direkt mit ihnen.

Ein Context-Dispatcher-System wie dieses nutzt die Subagenten-Architektur intensiv: Der `@dispatcher`-Subagent analysiert, entscheidet und delegiert an `@reviewer`, `@docs-writer` etc.

### Agent-Permissions im Detail

```
Permission-Werte:
  "allow" = Führe aus ohne Nachfrage
  "ask"   = Zeige Bestätigungs-Dialog
  "deny"  = Tool komplett deaktivieren

Konfigurierbare Tools:
  "edit"      = Datei-Bearbeitung (write, patch, create)
  "bash"      = Bash-Commands ausführen
  "webfetch"  = URLs abrufen

Granulares Bash-Permissions (per Command):
  "bash": {
    "patterns": {
      "*": "ask",           // Default: alles nachfragen
      "git status": "allow", // Spezifisch: git status erlauben
      "rm *": "deny"         // Spezifisch: rm verbieten
    }
  }
```

**Letzte Regel gewinnt** bei Permissions — deshalb kommt der Wildcard `"*"` immer **vor** den spezifischen Regeln.

---

## Bekannte Probleme & Workarounds

### Problem 1: instructions-Dateien werden nicht immer geladen (GitHub Issue #4758)

**Symptom:** Nach dem Start der IDE werden die via `instructions` konfigurierten Markdown-Dateien nicht konsistent in den Kontext geladen.

**Ursache:** In bestimmten Versionen gibt es einen Race-Condition beim Session-Start.

**Workaround:** Redundanz schaffen — kritische Regeln sowohl in `instructions` als auch direkt in `AGENTS.md` referenzieren. Alternativ: In `AGENTS.md` explizit anweisen, bestimmte Dateien zu lesen:

```markdown
## Beim Session-Start IMMER lesen:
- `.opencode/rules/global-context.md`
- `.opencode/rules/code-style.md`
```

### Problem 2: `experimental: {}` ohne dokumentierte Keys

**Symptom:** Der `experimental`-Block ist im Schema dokumentiert und valide, aber die offiziellen Docs listen keine stabilen Keys auf.

**Empfehlung:** Block in der Config leer lassen (`"experimental": {}`). Vor Nutzung experimenteller Features immer das CHANGELOG des verwendeten Releases prüfen.

### Problem 3: Glob-Pattern-Reihenfolge in `instructions`

**Symptom:** Wenn mehrere Dateien via Glob geladen werden, ist die Ladereihenfolge nicht garantiert.

**Workaround:** Kritische Regeln (die anderen Regeln überschreiben könnten) **vor** dem Glob explizit listen:

```jsonc
"instructions": [
  ".opencode/rules/global-context.md",  // erst explizit
  ".opencode/rules/code-style.md",       // dann explizit
  ".opencode/rules/*.md"                 // dann der Rest per Glob
]
```

### Problem 4: `tools` in Agent-Config ist deprecated

**Symptom:** Ältere Agenten-Configs nutzen `tools: { bash: false }`. Dies funktioniert noch, generiert aber Deprecation-Warnings.

**Migration:**
```yaml
# ALT (deprecated):
tools:
  bash: false
  read: true

# NEU (korrekt):
permission:
  bash: deny
  edit: deny
```

### Problem 5: `snapshot: true` verlangsamt große Repos

**Symptom:** Bei Repositories mit vielen Submodulen oder tausenden Dateien wird der Start signifikant langsamer — OpenCode indexiert alle Änderungen über ein internes Git-Repo.

**Entscheidung:** Abwägen zwischen Performance und Undo-Fähigkeit:
- Dev-Repos mit häufigen Agent-Änderungen: `snapshot: true` lassen
- CI/CD-Environments oder Repos mit > 50.000 Dateien: `snapshot: false` erwägen

---

## Potenziale & Synergie-Effekte

### 1. Prompt-Caching via `setCacheKey: true`

Das unterschätzteste Feature für Projekte mit vielen Instruction-Files: Anthropic's Prompt-Caching hält wiederholt verwendete Prompt-Teile (wie die Instructions-Dateien) zwischen API-Calls gecacht. Das bedeutet:

- **Kosten:** Instructions werden nur beim ersten Call berechnet, danach stark reduziert
- **Latenz:** Folgecalls mit demselben System-Prompt sind schneller
- **Relevanz:** Bei einem System mit 5+ Markdown-Regeldateien amortisiert sich das sofort

Aktivierung: `"provider": { "anthropic": { "setCacheKey": true } }`

### 2. Remote Config für Team-Standardisierung

Die `.well-known/opencode`-Endpoint-Mechanismus ermöglicht es einer Organisation, Basis-Konfigurationen zentral bereitzustellen. Ein Team kann z.B.:

- Standard-MCP-Server vorkonfigurieren (disabled by default, lokal aktivierbar)
- Approved-Model-Liste durchsetzen
- Basis-Instructions aus der Knowledge-Base laden

Individuelle Entwickler können in ihrer globalen Config oder Projekt-Config übersteuern — aber die Org-Defaults sind immer der Ausgangspunkt.

### 3. Parallel-Subagenten via Task-Tool

Das Task-Tool erlaubt primären Agenten, mehrere Subagenten **parallel** zu starten. Für ein Context-Dispatcher-System ist das der Kern-Use-Case:

```
User-Anfrage: "Analysiere die Sicherheit, aktualisiere die Docs und erstelle einen Testplan"
│
└─ @dispatcher entscheidet:
    ├─ @reviewer    (parallel) → Sicherheits-Analyse
    ├─ @docs-writer (parallel) → Docs-Update
    └─ @plan        (parallel) → Testplan
```

Statt sequenziell (3x Wartezeit) werden alle drei parallel ausgeführt. Bei typischen API-Latenzen bedeutet das **~3x Zeitersparnis** für komplexe Multi-Domain-Tasks.

### 4. `small_model` für Kosten-Optimierung

Der `small_model`-Key konfiguriert ein günstiges Modell für automatische Hintergrund-Tasks (Session-Titel generieren, Context zusammenfassen für Compaction). Bei intensiver Nutzung mit vielen Sessions kann das die Kosten um 10-20% reduzieren — ohne Qualitätsverlust bei den eigentlichen Development-Tasks.

### 5. Config-Schichtung für Multi-Environment-Setups

Die 6-Ebenen-Hierarchie ermöglicht elegante Environment-Trennung ohne Datei-Duplizierung:

```
.env.development:
  OPENCODE_CONFIG_CONTENT='{"model":"anthropic/claude-haiku-3-5"}'  # günstig

.env.production:
  OPENCODE_CONFIG_CONTENT='{"model":"anthropic/claude-opus-4-5"}'   # mächtig
```

Die Basis-Config bleibt identisch — nur das Override-Layer wechselt.

---

## Sicherheitsbetrachtung

### Was DARF in die Config-Datei (Git-sicher)

✅ Modell-IDs (`"anthropic/claude-sonnet-4-5"`)
✅ MCP-Server-URLs (kein Auth)
✅ Permission-Einstellungen
✅ Watcher-Ignore-Patterns
✅ Agent-Definitionen
✅ `{env:VAR_NAME}` Referenzen
✅ `{file:path}` Referenzen (Pfad, nicht Inhalt)

### Was NIEMALS in die Config-Datei (nie committen)

❌ API-Keys im Klartext
❌ Passwörter oder Tokens
❌ Private Endpoint-URLs mit Auth-Informationen
❌ Persönliche Identifikationsdaten

### Empfohlenes Setup für Team-Repos

```bash
# .gitignore anpassen:
echo "*.local.jsonc" >> .gitignore
echo ".opencode/secrets/" >> .gitignore

# Für lokal-überschriebene Werte:
# opencode.local.jsonc (ignoriert von Git) + OPENCODE_CONFIG Env-Var
```

### MCP-Security-Checkliste

Vor dem Aktivieren eines MCP-Servers prüfen:

- [ ] Ist der Server Open Source oder von einem vertrauenswürdigen Anbieter?
- [ ] Welche Permissions benötigt er? (filesystem-Server hat vollen Dateizugriff!)
- [ ] Werden Daten an externe Server gesendet? (Context7, GitHub etc. sehen Code-Snippets)
- [ ] Ist der Agenten-Zugriff auf diesen Server sinnvoll eingeschränkt?
- [ ] Werden Secrets über den Server geleitet? (dann Auth-Channel prüfen)

---

## Checkliste: Inbetriebnahme

### Ersteinrichtung

- [ ] `opencode.jsonc` in Projekt-Root platzieren
- [ ] `tui.json` in Projekt-Root (oder global) platzieren
- [ ] `AGENTS.md` in Projekt-Root erstellen
- [ ] `.opencode/agents/` Verzeichnis anlegen, Agent-Files hineinkopieren
- [ ] `.opencode/rules/` Verzeichnis anlegen, Rules-Files hineinkopieren
- [ ] Env-Variablen setzen: `ANTHROPIC_API_KEY`, ggf. `CONTEXT7_API_KEY`, `GITHUB_TOKEN`
- [ ] OpenCode starten: `opencode` im Projekt-Root

### Migration von alter Config

- [ ] `ignore_patterns` → `watcher.ignore` migrieren
- [ ] `customInstructions` → `instructions` umbenennen
- [ ] `theme`/`keybinds` aus `opencode.json` in `tui.json` auslagern
- [ ] `tools: { bash: false }` → `permission: { bash: "deny" }` in Agenten-Files
- [ ] `$schema` auf `https://opencode.ai/config.json` setzen (für Editor-Autocomplete)

### Validierung

```bash
# Schema-Validierung (wenn opencode CLI installiert):
opencode config validate

# Test-Start mit erhöhtem Log-Level:
OPENCODE_LOG=debug opencode

# Prüfen ob Instructions geladen werden:
# In opencode → /status eingeben
```

---

*Erstellt: März 2026 | Basierend auf: [opencode.ai/docs/config/](https://opencode.ai/docs/config/), [opencode.ai/docs/rules/](https://opencode.ai/docs/rules/), [opencode.ai/docs/agents/](https://opencode.ai/docs/agents/)*
