# Security Guidelines

## Authentication & Authorization
- Never log tokens or passwords
- Rate-limit sensitive endpoints: 5 attempts / 15 min per IP
- Return 401 for invalid credentials (not 404) to prevent user enumeration
- JWT TTL: 15 minutes; refresh TTL: 7 days
- bcrypt cost factor: 12

## API Security
- Validate all inputs with Zod schemas
- Sanitize user input before rendering
- Use parameterized queries (no SQL injection)
- CORS properly configured

## Code Security
- **Gate 5 (Semgrep)** must pass before any commit
- Check for:
  - Hardcoded secrets
  - SQL injection vectors
  - XSS vulnerabilities
  - Path traversal
  - Command injection

## Secrets Management
- Use `{file:/path/to/key}` syntax for external keys
- Never commit secrets to git
- Use `.env` for local development (gitignored)

## Dependencies
- Run `npm audit` regularly
- Gate checks `package-lock.json` for vulnerabilities
- Pin versions in package.json

## Logging
- Never log: tokens, passwords, API keys, PII
- Use structured JSON logging
- Include request IDs for tracing
