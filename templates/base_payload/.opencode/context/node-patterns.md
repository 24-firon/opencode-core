# Node.js / TypeScript Best Practices

## Project Structure
- **Single Responsibility**: Files should do one thing. >300 lines → consider refactoring
- **SLC Pattern**: Single Layer Component - one component per file
- **No Hardcoded Values**: Config in `.env` or `config/`

## Imports
Order: 1) stdlib, 2) third-party, 3) absolute project, 4) relative
Prefer absolute imports over deep relative paths

## Types
- No `any` types - always define interfaces
- Explicit return types on public functions
- Export shared types from `types/` directory

## Naming
- Files: kebab-case (user-service.ts) or PascalCase for React components
- Variables/Functions: camelCase (getUserData)
- Classes/Interfaces: PascalCase (UserProfile)
- Constants: UPPER_SNAKE_CASE (MAX_RETRY_COUNT)
- Private: _privateVar or #privateVar

## Error Handling
- Never silently swallow errors in catch blocks
- Use structured logging: `logger.error({ err, context: 'fnName' })`
- Throw descriptive, custom Error classes
- Proactive null checks, empty array checks

## Security
- Never commit `.env` files
- Input validation with Zod at system boundaries
- No PII in logs
- No secrets in code (use `{file:/path/to/key}` syntax)

## Testing
- Coverage >= 70% (enforced by gate)
- Write adversarial tests (edge cases, nulls)
- Integration tests for critical paths

## Git
- Conventional Commits: `type(scope): description`
- Types: feat, fix, refactor, test, docs, chore
- Never force push to main
