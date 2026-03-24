# Code Style Rules

> Spezifische Code-Stil-Vorgaben für dieses Projekt.
> Automatisch via `instructions`-Glob geladen.

## TypeScript-Spezifika

```typescript
// ✅ RICHTIG: Explizite Return-Types
function processAgent(id: string): Promise<AgentResult> { ... }

// ❌ FALSCH: Impliziter Return-Type
function processAgent(id) { ... }

// ✅ RICHTIG: Interface für Datenstrukturen
interface AgentConfig {
  description: string;      // required
  model?: string;           // optional
  temperature?: number;     // optional, 0.0-1.0
  mode: 'primary' | 'subagent' | 'all';
}

// ❌ FALSCH: type-alias für Objects mit vielen Props
type AgentConfig = { ... }
```

## Naming-Konventionen

| Kontext | Convention | Beispiel |
|---|---|---|
| Variablen | camelCase | `agentConfig` |
| Klassen | PascalCase | `ContextDispatcher` |
| Konstanten | UPPER_SNAKE | `MAX_RETRY_COUNT` |
| Dateien | kebab-case | `context-dispatcher.ts` |
| Agenten-IDs | kebab-case | `docs-writer` |

## Verbote (werden im Review abgelehnt)

- `any` Typ ohne Kommentar-Begründung
- `console.log` in Production-Code (Logger verwenden)
- Magic Numbers ohne benannte Konstante
- `// TODO` ohne Issue-Link
