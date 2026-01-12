# Biome Configuration Guide

## Overview

Biome is the all-in-one toolchain that replaces ESLint, Prettier, and more. It's fast (written in Rust, like Ruff for Python), has great defaults, and provides a unified configuration.

**Official Documentation:** https://biomejs.dev/

---

## Installation

```bash
# Install Biome at the root of your monorepo
bun add -d @biomejs/biome

# Initialize configuration (if not already created)
bunx @biomejs/biome init
```

---

## Configuration File: `biome.json`

Place this file in the root of your monorepo. It will apply to all workspaces.

### Key Configuration Sections

#### 1. VCS Integration
```json
{
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true,
    "defaultBranch": "main"
  }
}
```
- Respects `.gitignore` automatically
- Integrates with Git for better performance

#### 2. File Patterns
```json
{
  "files": {
    "ignore": [
      "node_modules",
      "dist",
      "build",
      "*.min.js"
    ]
  }
}
```
- Similar to `.prettierignore` or `.eslintignore`
- Supports glob patterns

#### 3. Formatter (Like Prettier)
```json
{
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100,
    "lineEnding": "lf"
  }
}
```

**Key Options:**
- `indentStyle`: `"space"` or `"tab"`
- `indentWidth`: Number of spaces (usually 2 or 4)
- `lineWidth`: Max line length (similar to Ruff's line-length)
- `lineEnding`: `"lf"` (Unix) or `"crlf"` (Windows)

#### 4. Linter (Like ESLint)
```json
{
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "correctness": {
        "noUnusedVariables": "error"
      },
      "suspicious": {
        "noExplicitAny": "warn"
      }
    }
  }
}
```

**Rule Severities:**
- `"off"` - Disable the rule
- `"warn"` - Warning (doesn't fail CI)
- `"error"` - Error (fails CI)

**Rule Categories:**
- `complexity` - Code complexity issues
- `correctness` - Logical errors and bugs
- `security` - Security vulnerabilities
- `style` - Code style preferences
- `suspicious` - Suspicious patterns
- `performance` - Performance issues

#### 5. Import Organization
```json
{
  "organizeImports": {
    "enabled": true
  }
}
```
- Automatically sorts and groups imports
- Similar to `isort` in Python

#### 6. Language-Specific Settings
```json
{
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "semicolons": "always",
      "trailingCommas": "es5",
      "arrowParentheses": "always"
    }
  }
}
```

#### 7. Overrides (Like Ruff's per-file-ignores)
```json
{
  "overrides": [
    {
      "include": ["*.test.ts", "*.spec.ts"],
      "linter": {
        "rules": {
          "suspicious": {
            "noExplicitAny": "off"
          }
        }
      }
    }
  ]
}
```
- Apply different rules to specific files
- Great for test files, config files, etc.

---

## Package.json Scripts

Add these scripts to your root `package.json`:

```json
{
  "scripts": {
    "check": "biome check .",
    "check:write": "biome check --write .",
    "format": "biome format --write .",
    "lint": "biome lint .",
    "lint:fix": "biome lint --write .",
    "ci": "biome ci ."
  }
}
```

### Script Explanations

#### `bun run check`
Runs **both** linting and formatting checks without making changes.
```bash
bun run check
```
Use this to see all issues before committing.

#### `bun run check:write`
Runs linting and formatting, **applying safe fixes**.
```bash
bun run check:write
```
Similar to `ruff check --fix` - automatically fixes what it can.

#### `bun run format`
Only runs the formatter and applies changes.
```bash
bun run format
```
Like running Prettier or Black.

#### `bun run lint`
Only runs the linter (no formatting).
```bash
bun run lint
```

#### `bun run lint:fix`
Runs linter and applies safe fixes.
```bash
bun run lint:fix
```

#### `bun run ci`
Optimized for CI environments - fails fast if issues are found.
```bash
bun run ci
```

---

## CLI Usage

### Basic Commands

```bash
# Check all files (lint + format)
bunx @biomejs/biome check .

# Check and fix
bunx @biomejs/biome check --write .

# Format only
bunx @biomejs/biome format --write .

# Lint only
bunx @biomejs/biome lint .

# Check specific files
bunx @biomejs/biome check src/**/*.ts

# Explain a rule
bunx @biomejs/biome explain noUnusedVariables
```

### Flags

- `--write` - Apply safe fixes
- `--unsafe` - Apply unsafe fixes (be careful!)
- `--changed` - Only check changed files (Git integration)
- `--staged` - Only check staged files
- `--no-errors-on-unmatched` - Don't fail if no files match

---

## Comparison with Python Tools

| Python (Ruff) | Biome | Purpose |
|---------------|-------|---------|
| `ruff check` | `biome lint` | Linting |
| `ruff format` | `biome format` | Formatting |
| `ruff check --fix` | `biome check --write` | Auto-fix |
| `.ruff.toml` | `biome.json` | Configuration |
| Per-file ignores | `overrides` section | File-specific rules |
| `line-length` | `lineWidth` | Max line length |
| `select/ignore` | Rule configuration | Enable/disable rules |

---

## Workflow Integration

### Pre-commit Hook

Install `husky` and `lint-staged`:

```bash
bun add -d husky lint-staged

# Initialize husky
bunx husky init
```

Create `.husky/pre-commit`:
```bash
#!/usr/bin/env sh
bunx lint-staged
```

Add to `package.json`:
```json
{
  "lint-staged": {
    "*.{js,ts,jsx,tsx,json}": [
      "biome check --write --no-errors-on-unmatched"
    ]
  }
}
```

### VS Code Integration

Install the Biome extension:
1. Open VS Code
2. Search for "Biome" in extensions
3. Install it

Add to `.vscode/settings.json`:
```json
{
  "editor.defaultFormatter": "biomejs.biome",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "quickfix.biome": "explicit",
    "source.organizeImports.biome": "explicit"
  },
  "[javascript]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[typescript]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[json]": {
    "editor.defaultFormatter": "biomejs.biome"
  }
}
```

### CI/CD Integration

**GitHub Actions:**
```yaml
name: Code Quality

on: [push, pull_request]

jobs:
  biome:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      
      - name: Install dependencies
        run: bun install
      
      - name: Run Biome
        run: bun run ci
```

---

## Common Rules Explained

### Correctness Rules

#### `noUnusedVariables`
```typescript
// ❌ Error
const unused = 5;

// ✅ OK
const used = 5;
console.log(used);

// ✅ OK (prefix with underscore for intentionally unused)
const _unused = 5;
```

#### `noConstAssign`
```typescript
// ❌ Error
const x = 5;
x = 10;

// ✅ OK
let x = 5;
x = 10;
```

### Style Rules

#### `useConst`
```typescript
// ❌ Warning
let x = 5; // Never reassigned

// ✅ OK
const x = 5;
```

#### `noVar`
```typescript
// ❌ Error
var x = 5;

// ✅ OK
const x = 5;
let y = 10;
```

### Suspicious Rules

#### `noExplicitAny`
```typescript
// ❌ Warning
function process(data: any) { }

// ✅ OK
function process(data: unknown) { }
function process<T>(data: T) { }
```

#### `noDoubleEquals`
```typescript
// ❌ Warning
if (x == y) { }

// ✅ OK
if (x === y) { }
```

### Security Rules

#### `noDangerouslySetInnerHtml`
```typescript
// ❌ Warning
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ OK (if you must, sanitize first)
<div dangerouslySetInnerHTML={{ __html: sanitize(userInput) }} />
```

---

## Customizing for Your Project

### Relaxing Rules for Learning

Since this is a mentoring project, you might want to start with warnings:

```json
{
  "linter": {
    "rules": {
      "suspicious": {
        "noExplicitAny": "warn",  // Warn instead of error
        "noDoubleEquals": "warn"
      }
    }
  }
}
```

### Gradually Increasing Strictness

As your mentee improves:

**Month 1-2:** Warnings only
```json
{
  "linter": {
    "rules": {
      "recommended": true
    }
  }
}
```

**Month 3-4:** Convert to errors
```json
{
  "linter": {
    "rules": {
      "recommended": true,
      "suspicious": {
        "noExplicitAny": "error"
      }
    }
  }
}
```

---

## Troubleshooting

### Issue: "Module not found"
```bash
# Make sure Biome is installed
bun add -d @biomejs/biome

# Clear cache
rm -rf node_modules
bun install
```

### Issue: "File ignored"
Check your `biome.json` ignore patterns:
```json
{
  "files": {
    "ignore": ["node_modules", "dist"]
  }
}
```

### Issue: VS Code not formatting
1. Check Biome extension is installed
2. Verify `.vscode/settings.json` configuration
3. Restart VS Code
4. Check output panel for errors

### Issue: Too many errors
Start with just formatting:
```bash
# Format first
bun run format

# Then check linting issues
bun run lint
```

Fix issues gradually, file by file.

---

## Best Practices

1. **Start with formatting only** - Get consistent code style first
2. **Add linting gradually** - Don't overwhelm your mentee
3. **Use warnings for learning** - Convert to errors as they improve
4. **Explain the "why"** - When a rule triggers, explain why it matters
5. **Use overrides** - Different rules for tests vs production code
6. **Run in CI** - Enforce standards automatically
7. **Format on save** - Make it automatic in the editor

---

## Migration from ESLint/Prettier

If you had ESLint/Prettier before:

1. **Remove old dependencies:**
```bash
bun remove eslint prettier eslint-config-prettier
bun remove @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

2. **Remove config files:**
```bash
rm .eslintrc.* .prettierrc.* .prettierignore
```

3. **Update package.json scripts** to use Biome commands

4. **Update CI/CD** to use `bun run ci` instead of `eslint` or `prettier`

---

## Resources

- **Official Docs:** https://biomejs.dev/
- **Rules Reference:** https://biomejs.dev/linter/rules/
- **VS Code Extension:** https://marketplace.visualstudio.com/items?itemName=biomejs.biome
- **Playground:** https://biomejs.dev/playground/
- **GitHub:** https://github.com/biomejs/biome

---

## Quick Reference Card

```bash
# Check everything
bun run check

# Fix everything safe
bun run check:write

# Format only
bun run format

# Lint only
bun run lint

# CI check (fails fast)
bun run ci

# Explain a rule
bunx @biomejs/biome explain ruleName

# Check specific files
bunx @biomejs/biome check src/**/*.ts
```

**Remember:** Biome is like Ruff - it's fast, opinionated, and designed to enforce quality without making you think too much about configuration. Start simple, add rules as needed, and use it as a teaching tool!