# Cluster 02: Providers & Models

Dieses Cluster behandelt die Anbindung von LLMs, das Handling von Providern und die Modell-Konfiguration (insbesondere Custom Variants und lokale Modelle).

## 0. ⚠️ COMMUNITY REALITY CHECKS (März 2026)

> **Ollama Inkompatibilität (GitHub Issue #1034):** 40-60% der Ollama-Modelle (insb. Reasoning-Varianten wie `deepseek-r1`) unterstützen KEIN Tool-Calling. Der Agent degradiert stillschweigend (silent failure). Zudem überläuft der Context-Window häufig, da OpenCode alle Tool-Schemata in den Prompt injiziert.
> **Workaround:** `--ctx-size 32768` setzen, `reasoningEffort` auf `"none"`, nur absolut notwendige MCP-Tools aktivieren.
>
> **Auth.json Plaintext (GitHub Issue #343):** Alle API-Keys werden in `~/.local/share/opencode/auth.json` im **Klartext** gespeichert, KEINE Verschlüsselung.
> **Workaround:** Keys ZWINGEND nur als Environment-Variablen (`export ANTHROPIC_API_KEY=...`) übergeben, `auth.json` leer halten.
>
> **ProviderInitError:** Nach Updates oder Netzwerkfehlern kann der Provider-Cache korrumpieren.
> **Workaround:** `rm -rf ~/.cache/opencode` löschen.

## 1. Provider-Konfiguration & Auth

Wenn Credentials via TUI (`/connect`) hinzugefügt werden, speichert OpenCode diese in:
*   `~/.local/share/opencode/auth.json` (bzw. unter `%USERPROFILE%` auf Windows).

Für die automatisierte/programmatische Steuerung können API-Keys in der `opencode.json` mittels Variablen-Substitution referenziert werden (siehe Cluster 01).

### Base URL Overrides & Custom Endpoints
Für Enterprise-Gateways (oder lokale Proxies) kann die Base-URL für jeden Provider überschrieben werden:
```jsonc
{
  "provider": {
    "anthropic": {
      "options": {
        "baseURL": "https://api.your-company.com/v1"
      }
    }
  }
}
```

## 2. Lokale Modelle (Ollama, LM Studio, llama.cpp)
OpenCode kann via `@ai-sdk/openai-compatible` an lokale Server angebunden werden. Beispiel für `llama-server`:

```jsonc
{
  "provider": {
    "llama.cpp": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "llama-server (local)",
      "options": {
        "baseURL": "http://127.0.0.1:8080/v1"
      },
      "models": {
        "qwen3-coder:a3b": {
          "name": "Qwen3-Coder (local)",
          "limit": {
            "context": 128000,
            "output": 65536
          }
        }
      }
    }
  }
}
```

## 3. Observability & Custom Headers (z.B. Helicone)
Für zentrale Logs, Caching und User-Tracking können benutzerdefinierte HTTP-Header an Provider gesendet werden:
```jsonc
{
  "provider": {
    "helicone": {
      "npm": "@ai-sdk/openai-compatible",
      "options": {
        "baseURL": "https://ai-gateway.helicone.ai",
        "headers": {
          "Helicone-Cache-Enabled": "true",
          "Helicone-User-Id": "opencode-agent"
        }
      }
    }
  }
}
```

## 4. Model Variants (Reasoning Control)
Um für dasselbe Modell unterschiedliche Verhaltensweisen (z.B. Thinking-Budgets) zu definieren, ohne Duplikate anzulegen, nutzt OpenCode **Variants**.

```jsonc
{
  "provider": {
    "openai": {
      "models": {
        "gpt-5": {
          "variants": {
            "high": {
              "reasoningEffort": "high",
              "textVerbosity": "low"
            },
            "fast": {
              "disabled": true
            }
          }
        }
      }
    }
  }
}
```
*Tipp:* Diese Varianten lassen sich dann in Agent-Definitionen aufrufen (z.B. für einen `Plan`-Agenten mit hohem Reasoning-Budget).

## 5. Model Fallbacks & Routing (via OpenRouter/Vercel AI Gateway)
Um Ausfälle zu kompensieren, kann die Routing-Logik von Providern wie Vercel AI Gateway oder OpenRouter in der Config vorgegeben werden:
```jsonc
{
  "provider": {
    "vercel": {
      "models": {
        "anthropic/claude-sonnet-4": {
          "options": {
            "order": ["anthropic", "vertex"]
          }
        }
      }
    }
  }
}
```

## 6. OpenCode Zen
OpenCode Zen (`https://opencode.ai/zen/v1/messages`) ist ein integrierter Gateway der OpenCode-Entwickler für verifizierte Coding-Modelle. Relevantes Enterprise-Detail: Requests an Zen werden im CDN der Provider (US-Region) verarbeitet, mit Zero-Retention-Policies (Ausnahme: zeitlich begrenzte Free-Tier Modelle).
