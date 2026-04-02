# Cluster 05: Agents, Skills, Commands & Rules

Dieses Cluster behandelt die Architektur der Multi-Agenten-Orchestrierung, das Laden dynamischer System-Prompts (Skills & Rules) und die Erstellung von Makros (Commands).

## 0. ⚠️ COMMUNITY REALITY CHECKS (März 2026)

> **Context-Compaction Amnesie (Reddit r/opencodeCLI):** Nach automatischer Context-Compaction verlieren Agenten ihre operativen Ziele, offene Todos und technische Entscheidungen. In langen Sessions (>1h, >50 Tool-Calls) ist Context-Loss der häufigste Produktivitätskiller.
> **Workaround:** Community-Plugin `opencode-working-memory` oder `opencode-supermemory` installieren. Diese implementieren Hot/Cold File Pool, Protected Slots und SQLite Todo-Sync.
>
> **Subagent Context-Bleeding:** Primäragent und Subagenten teilen in bestimmten Konfigurationen denselben Context-State. Subagent-Entscheidungen "bluten" in den Primäragenten zurück.
> **Workaround:** `permission.task` auf `"deny"` setzen für Agents, die isoliert arbeiten sollen.
>
> **Plan-Mode Bug (Reddit r/opencodeCLI, Jan 2026):** OpenCode ignoriert den "Plan Mode" und führt Aktionen aus, wenn das Modell gewechselt wird. Permission-Check ist modell-spezifisch gecacht.

## 1. Agenten-Architektur
OpenCode unterscheidet zwischen **Primary Agents** (Haupt-Konversation) und **Subagents** (spezialisierte Arbeiter, die durch andere Agenten per Task-Tool geweckt werden).
*   **Built-in Primaries:** `build` (Standard), `plan` (Read-only). Interne System-Agenten: `compaction`, `title`, `summary`.
*   **Built-in Subagents:** `general`, `explore`.

### Erweiterte Agenten-Konfiguration (`opencode.json` oder `agents/*.md`)
Jeder Agent kann tiefgehend konfiguriert werden. Besonders relevant für autonome Systeme:
*   `steps`: Setzt ein hartes Limit für die maximale Anzahl agentischer Iterationen. Ist dieses Limit erreicht, bricht der Agent ab und fasst zusammen. (Vormals `maxSteps`).
*   `permission.task`: Erlaubt granulare Steuerung (globbing), welche Subagenten dieser Agent wecken darf. Beispiel: `{"*": "deny", "dev-*": "allow"}`.
*   `hidden`: Verbirgt den Agenten im `@` UI-Menü (erlaubt aber den Aufruf durch andere Agenten).
*   **Provider Passthrough:** Parameter wie `reasoningEffort` oder `textVerbosity` können direkt im Agenten-Objekt definiert und an die LLM-API durchgereicht werden.

## 2. Skills (Dynamische Instruktionen)
Skills (`SKILL.md`) erlauben es Agenten, fallbezogenes Wissen via Tool-Call (`skill({ name: "..." })`) in ihren Kontext zu laden, anstatt das globale System-Prompt aufzublähen.
*   **Speicherorte:** `.opencode/skills/<name>/`, `.claude/skills/<name>/`, `.agents/skills/<name>/`.
*   **Namenskonvention:** 1-64 Zeichen, Regex `^[a-z0-9]+(-[a-z0-9]+)*$`. MUSS exakt dem Ordnernamen entsprechen.
*   **Frontmatter-Pflicht:** `name` und `description` (1-1024 Zeichen) MÜSSEN YAML-formatiert am Anfang der Datei stehen.
*   **Berechtigungen:** Die Sichtbarkeit von Skills lässt sich pro Agent oder global via Permission-Config steuern (z.B. `{"skill": {"internal-*": "deny"}}`).

## 3. Rules (AGENTS.md & dynamische Injections)
Das globale System-Wissen lebt in der Datei `AGENTS.md` (im Projekt-Root oder global).
**WICHTIG (Anti-Bloat):** Anstatt `AGENTS.md` riesig werden zu lassen, sollten Instruktionen modularisiert werden.
*   Nutze die `instructions`-Config in `opencode.json`:
    ```jsonc
    {
      "instructions": [
        "docs/guidelines.md",
        "packages/*/AGENTS.md",
        "https://raw.githubusercontent.com/org/rules/main.md" // Remote URLs (5s Timeout)
      ]
    }
    ```
*   Der Fallback auf `.claude/CLAUDE.md` existiert, lässt sich aber per Env-Var (`OPENCODE_DISABLE_CLAUDE_CODE=1`) deaktivieren.

## 4. Commands (Makros)
Commands (`.opencode/commands/*.md`) sind Makros, die aus der UI aufgerufen werden. Sie haben jedoch auch für Automatisierungen Wert:
*   **Shell Output Injection:** Der Prompt-Text kann Bash-Outputs inkludieren: `Here are the logs: !`npm run test``
*   **Subtask-Zwang:** In der Frontmatter eines Commands kann `subtask: true` gesetzt werden. Dies zwingt die Ausführung in einen isolierten Subagenten-Kontext, selbst wenn der zugewiesene Agent eigentlich ein Primary Agent ist (verhindert Context-Verschmutzung).
*   **Argumente:** Können per `$ARGUMENTS` (kompletter String) oder positionell (`$1`, `$2`) ausgelesen werden.
