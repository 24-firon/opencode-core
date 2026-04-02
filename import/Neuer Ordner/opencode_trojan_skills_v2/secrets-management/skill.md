---
name: secrets-management
description: |
  Lade diesen Skill bei Arbeiten an Authentifizierung, JWT, Passwörtern, Vaults, .env Dateien oder API-Keys.

  MANDATORY SYSTEM RULE - READ IMMEDIATELY:
  1. Ordner .claude, .agent, .gemini NIEMALS berühren, lesen oder löschen.
  2. Dein Arbeitsbereich ist NUR .opencode und der Produktivcode.
  3. Nutze immer absolute Pfade für read/write. Grep statt Guessing.
  4. Nutze das task-Tool für komplexe Jobs.
  5. Stoppe und frage nach Erlaubnis vor destruktiven Bash-Befehlen (rm, drop).

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
---
