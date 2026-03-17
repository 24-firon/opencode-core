# Code Style & Node Patterns Guidelines

## 1. Naming Conventions
- **Files and Directories:** Use `kebab-case` for general files (e.g., `user-service.ts`) or follow the framework-specific standard (e.g., `PascalCase` for React components).
- **Variables and Functions:** Use `camelCase` (e.g., `getUserData`).
- **Classes and Interfaces:** Use `PascalCase` (e.g., `UserProfile`).
- **Constants:** Use `UPPER_SNAKE_CASE` (e.g., `MAX_RETRY_COUNT`).
- **Private Properties:** Prefix with an underscore `_privateVar` or use language-specific privacy features (e.g., `#privateVar` in JS/TS).

## 2. Types and Interfaces
- **NO `any` types** - Always define specific interfaces or types.
- Export interfaces that are shared across files from a centralized `types/` directory.
- Use explicit return types for all public functions and methods.

## 3. Formatting and Syntax
- **Indentation:** Use 2 spaces. Do not mix tabs and spaces.
- **Quotes:** Use single quotes `'` for strings by default, except for JSX attributes (use double quotes `"`).
- **Semicolons:** Always use semicolons at the end of statements.
- **Trailing Commas:** Enforce trailing commas in multiline object literals and arrays.

## 4. Imports and Exports
- Order imports logically:
  1. Standard library imports
  2. Third-party library imports
  3. Absolute project imports (e.g., `@/components/Button`)
  4. Relative local imports (e.g., `./styles.css`)
- Prefer absolute imports over deep relative paths (`../../../../utils.js`).
- Use named exports rather than default exports for better refactoring.

## 5. Error Handling
- Never silently swallow errors in `catch` blocks.
- Log errors using structured logging: `logger.error({ err, context: 'functionName' })`
- Throw descriptive, custom Error classes with proper context.
- Handle edge cases proactively: null checks, empty arrays, missing object properties.

## 6. Architecture & Structural Patterns
- **Single Responsibility:** Files and functions should do one thing. If a file exceeds 300 lines, consider refactoring.
- **SLC Pattern:** Single Layer Component - one component per file.
- **No Hardcoded Values:** Move configuration variables, URLs, and magic numbers into configuration files or environment variables.

## 7. The BOM-Parser Strict Ban
- **VERBOT:** Verwende niemals einfache Regex-Patterns (wie `^---`), um YAML-Frontmatter in Markdown-Dateien zu parsen oder abzuschneiden.
- **WARUM:** Unsichtbare Windows-BOM-Zeichen (`\ufeff`) am Anfang von Dateien zerstören Regex-Matches. Dies führt zum Totalverlust von Metadaten.
- **LÖSUNG:** Nutze zwingend dedizierte AST-Parser oder Bibliotheken wie `gray-matter`, die BOM-safes Parsing garantieren.
