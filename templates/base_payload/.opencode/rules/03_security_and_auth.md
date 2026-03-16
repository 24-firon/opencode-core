# Security & Authentication Guidelines

## 1. Authentication & Authorization
- Never log tokens or passwords.
- Rate-limit sensitive endpoints: 5 attempts / 15 min per IP.
- Return 401 for invalid credentials (not 404) to prevent user enumeration.
- JWT TTL: 15 minutes; refresh TTL: 7 days.
- bcrypt cost factor: 12.
- **MUST DO**: Use OpenID Connect and Descope auth for Agents (JIT Tokens).

## 2. Code Security
- **Gate 5 (Semgrep)** must pass before any commit.
- Check for hardcoded secrets, SQL injection, XSS, path traversal, command injection.
- Validate all inputs using `zod`. No implicit trusting of incoming payloads.

## 3. Secrets Management
- Use `{file:/path/to/key}` syntax for external keys.
- Never commit secrets to git.
- Use `.env` for local development (gitignored).
- Store no plaintext secrets.

## 4. Logging
- Never log: tokens, passwords, API keys, PII.
- Use structured JSON logging.
- Include request IDs for tracing.
