---
name: secrets-management
description: Authentifizierung, JWT, Passwörter, Vaults, .env Dateien, API-Keys.
license: MIT
compatibility: opencode
metadata:
  audience: all-agents
  workflow: security
---

# 🔐 Security Guidelines & Secrets Management

## 1. Authentication & Authorization
- Never log tokens or passwords.
- Rate-limit sensitive endpoints: 5 attempts / 15 min per IP.
- Return 401 for invalid credentials (not 404) to prevent user enumeration.
- JWT TTL: 15 minutes; refresh TTL: 7 days.
- bcrypt cost factor: 12.

## 2. Secrets Management
- **Vault/Secret Injection:** Secrets werden dynamisch injiziert, niemals im Code gespeichert.
- Use `{file:/path/to/key}` syntax for external keys.
- Never commit secrets to git. Check `git diff --cached` before every commit.
- Use `.env` ONLY for local development (must be gitignored).

## 3. Boundary Security
- **Input-Validation at Boundaries:** Zod (oder Pydantic) Validierung an jeder Systemgrenze (API-Entry).
- **Outbound HTTP Timeout:** Jeder externe API-Call MUSS einen Timeout haben.

## 4. Logging constraints
- Never log: tokens, passwords, API keys, PII.
- Use structured JSON logging.
- Include request IDs for tracing.
