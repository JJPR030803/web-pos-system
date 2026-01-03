**Perfect! Let's create a comprehensive, production-ready README that your alumni can follow step-by-step.**

I'll create a complete setup guide with modern best practices, including all the tooling we discussed.

---

## **Create the README.md:**

```bash
# You're in: /mnt/shared/cursos/luis/web-pos
nvim README.md
```

**Copy this entire README:**

```markdown
# Web POS System - Modern React + TypeScript Setup Guide

A production-ready Point of Sale system built with modern web technologies and enterprise-grade tooling.

## 📚 Table of Contents

- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Initial Setup](#-initial-setup)
- [Project Structure](#-project-structure)
- [Development Workflow](#-development-workflow)
- [Code Quality Tools](#-code-quality-tools)
- [Testing](#-testing)
- [Git Workflow](#-git-workflow)
- [Available Scripts](#-available-scripts)
- [Learning Resources](#-learning-resources)
- [Troubleshooting](#-troubleshooting)

---

## 🚀 Tech Stack

### Core Technologies
- **Runtime:** [Bun](https://bun.sh) - Fast all-in-one JavaScript runtime
- **Build Tool:** [Vite](https://vitejs.dev) - Next generation frontend tooling
- **Framework:** [React 18](https://react.dev) - UI library
- **Language:** [TypeScript](https://www.typescriptlang.org) (Strict mode) - Type safety

### Styling
- **CSS Framework:** [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- **Components:** [shadcn/ui](https://ui.shadcn.com) - Re-usable components
- **Icons:** [Lucide React](https://lucide.dev) - Beautiful icons

### Code Quality
- **Linter/Formatter:** [Biome](https://biomejs.dev) - Fast linter & formatter (like Ruff for Python)
- **Type Checking:** TypeScript strict mode
- **Git Hooks:** Husky + lint-staged - Pre-commit checks

### Testing
- **Test Runner:** [Vitest](https://vitest.dev) - Vite-native testing framework
- **React Testing:** [@testing-library/react](https://testing-library.com/react) - React component testing
- **Coverage:** Built-in with Vitest

### Future Additions
- **Backend:** Hono (lightweight, type-safe web framework)
- **Database:** Drizzle ORM + SQLite
- **Validation:** Zod (runtime type validation)
- **State Management:** Zustand or TanStack Query
- **Routing:** React Router or TanStack Router

---

## 📋 Prerequisites

### Required Software

1. **Bun** (latest version)
   ```bash
   # Install Bun
   curl -fsSL https://bun.sh/install | bash
   
   # Verify installation
   bun --version
   ```

2. **Git**
   ```bash
   # Arch Linux
   sudo pacman -S git
   
   # Configure Git (first time only)
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

3. **GitHub CLI** (optional but recommended)
   ```bash
   # Arch Linux
   yay -S github-cli
   
   # Authenticate
   gh auth login
   ```

4. **Code Editor**
   - VS Code (recommended): `yay -S vscodium-bin`
   - OR Zed: `yay -S zed`

### Recommended VS Code Extensions

```bash
code --install-extension biomejs.biome
code --install-extension bradlc.vscode-tailwindcss
code --install-extension dbaeumer.vscode-eslint
code --install-extension dsznajder.es7-react-js-snippets
code --install-extension usernamehw.errorlens
```

---

## 🛠️ Initial Setup

### Step 1: Clone the Repository

```bash
# Clone the repo
gh repo clone JJPR030803/web-pos-system
cd web-pos-system

# OR if you don't have gh CLI:
git clone git@github.com:JJPR030803/web-pos-system.git
cd web-pos-system
```

### Step 2: Install Dependencies

```bash
# Install all dependencies (this also creates bun.lockb)
bun install
```

**What gets installed:**
- React & React DOM
- TypeScript
- Vite & plugins
- Tailwind CSS
- Biome (linter/formatter)
- Vitest (testing)
- All dev dependencies

### Step 3: Verify Setup

```bash
# Run type checking
bun run type-check
# Should output: "Found 0 errors"

# Run linter
bun run lint
# Should pass with no errors

# Start dev server
bun run dev
# Should start at http://localhost:5173
```

Open your browser to `http://localhost:5173` - you should see the React app running!

---

## 📁 Project Structure

```
web-pos-system/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components (auto-generated)
│   │   ├── Cart.tsx        # Example: Cart component
│   │   └── ProductGrid.tsx # Example: Product grid
│   ├── lib/                # Utility functions
│   │   └── utils.ts        # Helper utilities
│   ├── hooks/              # Custom React hooks
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts        # Shared types
│   ├── test/               # Test utilities
│   │   └── setup.ts        # Test setup file
│   ├── App.tsx             # Main app component
│   ├── App.css             # App styles
│   ├── main.tsx            # Application entry point
│   ├── index.css           # Global styles + Tailwind imports
│   └── vite-env.d.ts       # Vite type definitions
├── public/                 # Static assets (images, fonts, etc.)
├── tests/                  # Test files (mirrors src structure)
│   ├── components/
│   └── integration/
├── .github/
│   └── workflows/
│       └── ci.yml          # GitHub Actions CI/CD
├── biome.json             # Biome configuration
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS configuration
├── tsconfig.json          # TypeScript configuration
├── tsconfig.node.json     # TypeScript config for build tools
├── vite.config.ts         # Vite configuration
├── package.json           # Dependencies and scripts
├── bun.lockb              # Dependency lock file (binary)
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

### Key Files Explained

- **`src/main.tsx`** - Entry point, renders React app
- **`src/App.tsx`** - Root component
- **`src/index.css`** - Tailwind directives + global styles
- **`vite.config.ts`** - Vite configuration (aliases, plugins)
- **`tsconfig.json`** - TypeScript strict mode configuration
- **`biome.json`** - Code quality rules (linting + formatting)
- **`tailwind.config.js`** - Tailwind theme customization

---

## 🔧 Development Workflow

### Daily Development

1. **Start the dev server:**
   ```bash
   bun run dev
   ```
   - Hot Module Replacement (HMR) - changes appear instantly
   - TypeScript errors shown in terminal
   - Available at http://localhost:5173

2. **Make changes to code:**
   - Edit files in `src/`
   - Save file → browser auto-updates
   - Check terminal for TypeScript errors

3. **Before committing:**
   ```bash
   # Format code
   bun run format
   
   # Check for errors
   bun run lint
   
   # Check types
   bun run type-check
   
   # Run tests
   bun test
   ```

### Creating New Components

**Example: Creating a Product Card component**

```bash
# Create component file
touch src/components/ProductCard.tsx
```

**src/components/ProductCard.tsx:**
```tsx
interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  onAddToCart: (id: string) => void;
}

export function ProductCard({ id, name, price, image, onAddToCart }: ProductCardProps) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
      <img src={image} alt={name} className="h-48 w-full object-cover rounded" />
      <h3 className="mt-2 text-lg font-semibold">{name}</h3>
      <p className="text-gray-600">${price.toFixed(2)}</p>
      <button
        onClick={() => onAddToCart(id)}
        className="mt-2 w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
```

**Create test file:**
```bash
touch tests/components/ProductCard.test.tsx
```

**tests/components/ProductCard.test.tsx:**
```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from '@/components/ProductCard';

describe('ProductCard', () => {
  it('renders product information', () => {
    render(
      <ProductCard
        id="1"
        name="Coffee"
        price={4.99}
        image="/coffee.jpg"
        onAddToCart={vi.fn()}
      />
    );
    
    expect(screen.getByText('Coffee')).toBeInTheDocument();
    expect(screen.getByText('$4.99')).toBeInTheDocument();
  });
  
  it('calls onAddToCart when button clicked', () => {
    const handleAddToCart = vi.fn();
    
    render(
      <ProductCard
        id="1"
        name="Coffee"
        price={4.99}
        image="/coffee.jpg"
        onAddToCart={handleAddToCart}
      />
    );
    
    fireEvent.click(screen.getByText('Add to Cart'));
    expect(handleAddToCart).toHaveBeenCalledWith('1');
  });
});
```

**Run the test:**
```bash
bun test ProductCard
```

---

## ✅ Code Quality Tools

### Biome (Linter + Formatter)

**What it does:**
- Lints JavaScript/TypeScript for errors and bad patterns
- Formats code consistently
- Organizes imports automatically
- 100x faster than ESLint + Prettier

**Configuration:** See `biome.json`

**Usage:**
```bash
# Check code (lint + format check)
bun run lint

# Fix issues automatically
bun run lint:fix

# Format code
bun run format
```

**In VS Code:**
- Code formats automatically when you save (if configured)
- Errors show inline with red squiggles

### TypeScript Strict Mode

**What it does:**
- Catches errors at compile time (before running code)
- Forces you to handle null/undefined cases
- Prevents common bugs

**Configuration:** See `tsconfig.json`

**Common errors you'll see:**

```typescript
// ❌ Error: Type 'null' is not assignable to type 'string'
let name: string = null;

// ✅ Fix: Use union type or handle null case
let name: string | null = null;

// ❌ Error: Object is possibly 'undefined'
const items = [1, 2, 3];
const first = items[0];
first.toString(); // Error! Could be undefined

// ✅ Fix: Check before using
if (first !== undefined) {
  first.toString();
}
```

**Usage:**
```bash
# Check types
bun run type-check

# TypeScript also checks automatically in dev mode
bun run dev
```

### Git Hooks (Pre-commit Checks)

**What it does:**
- Runs checks automatically before you commit
- Prevents committing broken code
- Formats code automatically

**What runs on commit:**
1. Biome formats changed files
2. Type checking
3. Linting
4. Related tests

**Setup (already done, but here's how it works):**

```bash
# Husky creates git hooks
# lint-staged runs commands on staged files

# When you commit:
git add .
git commit -m "Add ProductCard component"

# Automatically runs:
# 1. biome format --write (on staged files)
# 2. bun run type-check
# 3. bun run lint
# 4. bun test --related

# If any fail → commit is blocked
# Fix errors → try again
```

---

## 🧪 Testing

### Test Framework: Vitest

**Why Vitest:**
- Built for Vite (same config, instant HMR)
- Compatible with Jest API (familiar if you know Jest)
- Fast - runs tests in parallel
- Great TypeScript support

### Running Tests

```bash
# Run all tests
bun test

# Run tests in watch mode (re-runs on file changes)
bun test --watch

# Run specific test file
bun test ProductCard

# Run with coverage report
bun run test:coverage

# Open test UI (interactive)
bun run test:ui
```

### Writing Tests

**Component test example:**

```tsx
// tests/components/Cart.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Cart } from '@/components/Cart';

describe('Cart', () => {
  it('shows empty message when no items', () => {
    render(<Cart items={[]} onCheckout={() => {}} />);
    expect(screen.getByText(/cart is empty/i)).toBeInTheDocument();
  });
  
  it('calculates total correctly', () => {
    const items = [
      { id: '1', name: 'Coffee', price: 5, quantity: 2 },
      { id: '2', name: 'Tea', price: 3, quantity: 1 },
    ];
    
    render(<Cart items={items} onCheckout={() => {}} />);
    expect(screen.getByText('$13.00')).toBeInTheDocument(); // (5*2) + (3*1) = 13
  });
});
```

**Utility function test example:**

```tsx
// tests/lib/utils.test.ts
import { describe, it, expect } from 'vitest';
import { calculateTotal } from '@/lib/utils';

describe('calculateTotal', () => {
  it('returns 0 for empty array', () => {
    expect(calculateTotal([])).toBe(0);
  });
  
  it('calculates total correctly', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 3 },
    ];
    expect(calculateTotal(items)).toBe(35); // (10*2) + (5*3) = 35
  });
});
```

### Test Coverage

```bash
# Generate coverage report
bun run test:coverage

# Opens HTML report showing:
# - Which lines are tested
# - Which branches are covered
# - Overall percentage

# Goal: >80% coverage
```

---

## 🌳 Git Workflow

### Branch Strategy

**Main branches:**
- `main` - Production-ready code (protected, requires PR)
- `develop` - Integration branch (optional for larger projects)

**Feature branches:**
- `feature/cart-component` - New features
- `fix/cart-calculation-bug` - Bug fixes
- `refactor/simplify-cart-logic` - Code improvements
- `docs/update-readme` - Documentation updates

### Typical Workflow

**1. Start new feature:**
```bash
# Make sure you're on main and up to date
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/product-grid

# Now you're on feature/product-grid branch
```

**2. Make changes:**
```bash
# ... edit files ...

# Check what changed
git status

# Stage changes
git add src/components/ProductGrid.tsx
git add tests/components/ProductGrid.test.tsx

# Commit (triggers pre-commit hooks)
git commit -m "Add ProductGrid component with tests"
```

**3. Push to GitHub:**
```bash
git push origin feature/product-grid
```

**4. Create Pull Request:**
```bash
# Using GitHub CLI
gh pr create --title "Add ProductGrid component" --body "Implements responsive product grid with filtering"

# OR: Go to GitHub website
# - Click "Compare & pull request"
# - Fill in title and description
# - Click "Create pull request"
```

**5. Code Review:**
- Mentor reviews code on GitHub
- Leaves comments on specific lines
- Requests changes OR approves

**6. Address feedback:**
```bash
# Make requested changes
# ... edit files ...

# Commit and push
git add .
git commit -m "Address review feedback: improve accessibility"
git push origin feature/product-grid

# PR automatically updates
```

**7. Merge:**
```bash
# After approval, merge PR
gh pr merge --merge

# OR: Click "Merge pull request" on GitHub

# Delete feature branch
git checkout main
git pull origin main
git branch -d feature/product-grid
```

### Commit Message Guidelines

**Format:**
```
<type>: <subject>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks (dependencies, config)

**Examples:**
```bash
git commit -m "feat: add product filtering to catalog"

git commit -m "fix: correct total calculation in cart"

git commit -m "refactor: extract cart logic into custom hook"

git commit -m "test: add integration tests for checkout flow"

git commit -m "docs: update setup instructions in README"
```

---

## 📜 Available Scripts

### Development

```bash
# Start dev server (hot reload)
bun run dev

# Build for production
bun run build

# Preview production build locally
bun run preview
```

### Code Quality

```bash
# Type checking
bun run type-check

# Lint code
bun run lint

# Fix linting issues automatically
bun run lint:fix

# Format code
bun run format
```

### Testing

```bash
# Run all tests
bun test

# Watch mode (re-run on changes)
bun test --watch

# Coverage report
bun run test:coverage

# Interactive test UI
bun run test:ui

# Run specific test file
bun test ProductCard
```

### Adding Dependencies

```bash
# Add production dependency
bun add <package-name>

# Examples:
bun add react-router-dom
bun add zustand
bun add zod

# Add dev dependency
bun add -D <package-name>

# Examples:
bun add -D @types/node
bun add -D vitest
```

---

## 📚 Learning Resources

### Official Documentation

- [React Docs](https://react.dev) - Official React documentation (new site)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) - TypeScript guide
- [Vite Guide](https://vitejs.dev/guide/) - Vite documentation
- [Tailwind CSS Docs](https://tailwindcss.com/docs) - Tailwind reference
- [Vitest Guide](https://vitest.dev/guide/) - Testing documentation

### Recommended Tutorials

**React Basics:**
- [React Tutorial (Official)](https://react.dev/learn) - Interactive tutorial
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/) - TypeScript patterns

**Tailwind CSS:**
- [Tailwind CSS Tutorial](https://www.youtube.com/watch?v=pfaSUYaSgRo) - Crash course
- [Tailwind Components](https://tailwindui.com/components) - Pre-built components

**Testing:**
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - Testing guide
- [Vitest Examples](https://github.com/vitest-dev/vitest/tree/main/examples) - Example tests

### Learning Path

**Week 1-2: React Fundamentals**
- JSX syntax
- Components and props
- State with useState
- Effects with useEffect
- Conditional rendering
- Lists and keys

**Week 3-4: TypeScript + Tailwind**
- TypeScript basics (types, interfaces)
- Type annotations for React
- Tailwind utility classes
- Responsive design
- Component composition

**Week 5-6: Testing**
- Writing component tests
- Testing user interactions
- Mocking and test utilities
- Test coverage

**Week 7-8: Advanced React**
- Custom hooks
- Context API
- Performance optimization (useMemo, useCallback)
- Error boundaries

**Week 9-10: Full POS Features**
- Product catalog
- Shopping cart
- Checkout flow
- Receipt generation

---

## 🐛 Troubleshooting

### Common Issues

**1. "bun: command not found"**
```bash
# Reinstall Bun
curl -fsSL https://bun.sh/install | bash

# Add to PATH (add to ~/.bashrc or ~/.zshrc)
export PATH="$HOME/.bun/bin:$PATH"

# Reload shell
source ~/.bashrc  # or source ~/.zshrc
```

**2. Port 5173 already in use**
```bash
# Kill process using port 5173
lsof -ti:5173 | xargs kill -9

# Or change port in vite.config.ts:
server: {
  port: 3000,  // Use different port
}
```

**3. TypeScript errors in editor but not in terminal**
```bash
# Restart TypeScript server in VS Code
# Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"

# Or restart VS Code
```

**4. Git hooks not running**
```bash
# Reinstall husky
bun run prepare

# Make hooks executable
chmod +x .husky/pre-commit
```

**5. Tests failing with "cannot find module"**
```bash
# Make sure test setup is correct
# Check vite.config.ts has:
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
},

# Reinstall dependencies
rm -rf node_modules bun.lockb
bun install
```

**6. Tailwind styles not applying**
```bash
# Check src/index.css has:
@tailwind base;
@tailwind components;
@tailwind utilities;

# Restart dev server
bun run dev
```

### Getting Help

1. **Check error message carefully** - often tells you exactly what's wrong
2. **Search in documentation** - official docs are very good
3. **Google the error** - likely someone had same issue
4. **Ask in Discord** - post in #code-help channel
5. **Create GitHub issue** - for project-specific bugs
6. **Ask mentor** - schedule pairing session

### Debugging Tips

**Console logging:**
```tsx
function ProductCard({ name, price }: ProductCardProps) {
  console.log('ProductCard rendered with:', { name, price });
  return (
    // ... component code
  );
}
```

**React DevTools:**
- Install [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) browser extension
- Inspect component props and state
- Track component re-renders

**TypeScript errors:**
```bash
# Get detailed type information
bun run type-check --verbose
```

---

## 🎯 Next Steps

### Immediate Tasks

1. **Complete setup verification:**
   ```bash
   bun install
   bun run dev      # Should start successfully
   bun test         # Should pass
   bun run lint     # Should pass
   ```

2. **Read through this entire README**
   - Understand project structure
   - Familiarize with available scripts
   - Bookmark learning resources

3. **Create your first component:**
   - Follow the "Creating New Components" section
   - Write component + test
   - Commit using proper git workflow

### This Week's Goals

- [ ] Setup development environment
- [ ] Understand project structure
- [ ] Complete React tutorial (official docs)
- [ ] Build first component with tests
- [ ] Create and merge first Pull Request

### Monthly Roadmap

**Month 1:** React + TypeScript fundamentals
**Month 2:** Build POS UI (products, cart, checkout)
**Month 3:** Add backend (Hono + Drizzle)
**Month 4:** ML integration (sales predictions)

---

## 🤝 Contributing

### Code Review Checklist

Before requesting review, ensure:

- [ ] Code follows TypeScript strict mode (no `any` types)
- [ ] All components have proper TypeScript interfaces
- [ ] Code is formatted (`bun run format`)
- [ ] No linting errors (`bun run lint`)
- [ ] Tests are written and passing (`bun test`)
- [ ] No console.log statements in production code
- [ ] Commit messages follow convention
- [ ] PR description explains what and why

### Pull Request Template

```markdown
## What does this PR do?

Brief description of changes.

## Type of change

- [ ] New feature
- [ ] Bug fix
- [ ] Refactoring
- [ ] Documentation

## How to test

1. Step one
2. Step two
3. Expected result

## Screenshots (if applicable)

[Add screenshots of UI changes]

## Checklist

- [ ] Code follows style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No breaking changes
```

---

## 📄 License

MIT License - see LICENSE file for details

---

## 📞 Support

- **Mentor:** Available via Discord for code reviews and questions
- **GitHub Discussions:** For project-specific questions
- **Documentation:** Check official docs first
- **Discord #code-help:** For quick questions

---

**Happy coding! 🚀**

Remember: 
- Write clean, typed code
- Test your components
- Ask questions when stuck
- Commit often with clear messages
- Learn from code reviews
```

---

## **Now create the actual project files:**

```bash
# You should still be in /mnt/shared/cursos/luis/web-pos

# Save the README.md (from above)

# Now let's add Tailwind CSS and shadcn/ui to the project
```

---

## **Install Tailwind CSS:**

```bash
# Install Tailwind and dependencies
bun add -D tailwindcss postcss autoprefixer
bunx tailwindcss init -p
```

This creates:
- `tailwind.config.js`
- `postcss.config.js`

---

## **Configure Tailwind:**

```bash
# Edit tailwind.config.js
nvim tailwind.config.js
```

**Replace with:**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {},
    },
  },
  plugins: [],
};
```

---

## **Update src/index.css:**

```bash
nvim src/index.css
```

**Replace entire file with:**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --radius: 0.5rem;
  }
}
```

---

## **Install shadcn/ui dependencies:**

```bash
# Install required dependencies for shadcn/ui
bun add class-variance-authority clsx tailwind-merge
bun add lucide-react
```

---

## **Create lib/utils.ts:**

```bash
mkdir -p src/lib
nvim src/lib/utils.ts
```

**src/lib/utils.ts:**

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## **Update package.json scripts:**

```bash
nvim package.json
```

**Make sure scripts section looks like this:**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "lint": "biome check .",
    "lint:fix": "biome check --apply .",
    "format": "biome format --write .",
    "type-check": "tsc --noEmit",
    "prepare": "husky install"
  }
}
```

---

## **Setup Git hooks (Husky):**

```bash
# Install husky and lint-staged
bun add -D husky lint-staged

# Initialize husky
bunx husky init

# Create pre-commit hook
cat > .husky/pre-commit << 'EOF'
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

bunx lint-staged
EOF

chmod +x .husky/pre-commit
```

**Add lint-staged config to package.json:**

```bash
nvim package.json
```

**Add this section:**

```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": [
      "biome check --apply --no-errors-on-unmatched",
      "vitest related --run"
    ]
  }
}
```

---

## **Create GitHub Actions CI:**

```bash
mkdir -p .github/workflows
nvim .github/workflows/ci.yml
```

**.github/workflows/ci.yml:**

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest
      
      - name: Install dependencies
        run: bun install
      
      - name: Lint
        run: bun run lint
      
      - name: Type check
        run: bun run type-check
      
      - name: Run tests
        run: bun test --coverage
      
      - name: Build
        run: bun run build
```

---

## **Update .gitignore:**

```bash
nvim .gitignore
```

**Make sure it includes:**

```
# Dependencies
node_modules
bun.lockb

# Build outputs
dist
dist-ssr
*.local

# Editor
.vscode/*
!.vscode/settings.json
!.vscode/extensions.json
.idea
.DS_Store

# Environment
.env
.env.local
.env.production

# Testing
coverage
.nyc_output

# Logs
*.log

# OS
.DS_Store
Thumbs.db
```

---

## **Create .vscode/settings.json (recommended settings):**

```bash
mkdir -p .vscode
nvim .vscode/settings.json
```

**.vscode/settings.json:**

```json
{
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "quickfix.biome": "explicit",
    "source.organizeImports.biome": "explicit"
  },
  "editor.defaultFormatter": "biomejs.biome",
  "[typescript]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[javascript]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[json]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

---

## **Final commit and push:**

```bash
# Check status
git status

# Add all files
git add .

# Commit (will trigger pre-commit hooks)
git commit -m "feat: complete modern React + TypeScript setup with Tailwind, Biome, and testing"

# Push to GitHub
git push origin main
```

---

## **Verification checklist for your alumni:**

**Create this as a separate file:**

```bash
nvim SETUP_VERIFICATION.md
```

**SETUP_VERIFICATION.md:**

```markdown
# Setup Verification Checklist

Follow these steps to verify your development environment is working correctly.

## Prerequisites Check

- [ ] Bun installed: `bun --version` shows version number
- [ ] Git configured: `git config user.name` shows your name
- [ ] GitHub authenticated: `gh auth status` shows logged in

## Project Setup

1. Clone repository:
   ```bash
   gh repo clone JJPR030803/web-pos-system
   cd web-pos-system
   ```

2. Install dependencies:
   ```bash
   bun install
   ```
   - Should complete without errors
   - Creates `node_modules` directory
   - Creates `bun.lockb` file

## Verification Steps

### 1. TypeScript Check
```bash
bun run type-check
```
**Expected:** `Found 0 errors`

### 2. Linting
```bash
bun run lint
```
**Expected:** All checks passed

### 3. Formatting
```bash
bun run format
```
**Expected:** Files formatted (or "No files to format")

### 4. Tests
```bash
bun test
```
**Expected:** Tests pass (might be 0 tests initially)

### 5. Dev Server
```bash
bun run dev
```
**Expected:**
- Server starts on http://localhost:5173
- No errors in terminal
- Browser shows React app

### 6. Build
```bash
bun run build
```
**Expected:**
- Build completes successfully
- Creates `dist/` directory

### 7. Git Hooks
```bash
# Make a small change
echo "// test" >> src/App.tsx

# Try to commit
git add src/App.tsx
git commit -m "test: verify git hooks"
```
**Expected:**
- Pre-commit hook runs
- Code gets formatted automatically
- If everything passes, commit succeeds

```bash
# Undo test commit
git reset HEAD~1
git restore src/App.tsx
```

## Common Issues

### "command not found: bun"
```bash
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc  # or ~/.zshrc
```

### Port 5173 already in use
```bash
lsof -ti:5173 | xargs kill -9
```

### TypeScript errors in editor
- Restart VS Code
- Run: `bun run type-check` to see actual errors

## Success Criteria

If all checks pass:
✅ Environment is set up correctly
✅ Ready to start development
✅ Proceed to building first component

## Next Steps

1. Read the main README.md thoroughly
2. Complete React tutorial (https://react.dev/learn)
3. Create first Pull Request with a simple component
4. Schedule first pairing session with mentor

---

**If any step fails, don't proceed. Ask for help in Discord #code-help!**
```

---

## **One more helpful file - Component Template:**

```bash
nvim COMPONENT_TEMPLATE.md
```

**COMPONENT_TEMPLATE.md:**

```markdown
# Component Creation Template

Use this template when creating new components.

## Step 1: Create Component File

```bash
# Create component
touch src/components/MyComponent.tsx

# Create test file
touch tests/components/MyComponent.test.tsx
```

## Step 2: Component Code

**src/components/MyComponent.tsx:**

```tsx
// Import dependencies
import { useState } from 'react';

// Define props interface
interface MyComponentProps {
  title: string;
  onAction: () => void;
}

// Component function
export function MyComponent({ title, onAction }: MyComponentProps) {
  // State
  const [count, setCount] = useState(0);
  
  // Event handlers
  const handleClick = () => {
    setCount(count + 1);
    onAction();
  };
  
  // Render
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-gray-600">Count: {count}</p>
      <button
        onClick={handleClick}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Click me
      </button>
    </div>
  );
}
```

## Step 3: Test Code

**tests/components/MyComponent.test.tsx:**

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MyComponent } from '@/components/MyComponent';

describe('MyComponent', () => {
  it('renders with title', () => {
    render(<MyComponent title="Test Title" onAction={vi.fn()} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });
  
  it('increments count on click', () => {
    render(<MyComponent title="Test" onAction={vi.fn()} />);
    
    const button = screen.getByText('Click me');
    fireEvent.click(button);
    
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });
  
  it('calls onAction when button clicked', () => {
    const handleAction = vi.fn();
    render(<MyComponent title="Test" onAction={handleAction} />);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleAction).toHaveBeenCalledOnce();
  });
});
```

## Step 4: Run Tests

```bash
bun test MyComponent
```

## Step 5: Use Component

**src/App.tsx:**

```tsx
import { MyComponent } from './components/MyComponent';

export function App() {
  const handleAction = () => {
    console.log('Action triggered!');
  };
  
  return (
    <div className="min-h-screen p-8">
      <MyComponent title="My Awesome Component" onAction={handleAction} />
    </div>
  );
}
```

## Checklist

Before committing:

- [ ] Component has TypeScript interfaces for props
- [ ] Component is exported
- [ ] Test file exists with at least 2-3 tests
- [ ] Tests pass: `bun test MyComponent`
- [ ] No TypeScript errors: `bun run type-check`
- [ ] No linting errors: `bun run lint`
- [ ] Component used in App.tsx (to verify it works)
```

---

## **Final file structure:**

```bash
tree -L 3 -I 'node_modules|dist'

# Should show:
web-pos-system/
├── .github/
│   └── workflows/
│       └── ci.yml
├── .husky/
│   └── pre-commit
├── .vscode/
│   └── settings.json
├── src/
│   ├── components/
│   ├── lib/
│   │   └── utils.ts
│   ├── test/
│   │   └── setup.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── tests/
│   └── components/
├── .gitignore
├── README.md
├── SETUP_VERIFICATION.md
├── COMPONENT_TEMPLATE.md
├── biome.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## **Commit everything:**

```bash
git add .
git commit -m "docs: add setup verification and component template guides"
git push origin main
```

---

## **Share with your alumni:**

```bash
# Send him the repo link
echo "Repository ready at: https://github.com/JJPR030803/web-pos-system"

# Tell him to:
# 1. Read README.md
# 2. Follow SETUP_VERIFICATION.md
# 3. Use COMPONENT_TEMPLATE.md when creating components
```

---

**The setup is now complete! Your alumni has:**

✅ Production-ready React + TypeScript + Tailwind project
✅ Modern tooling (Bun, Vite, Biome)
✅ Testing setup (Vitest)
✅ Git hooks (prevents bad commits)
✅ CI/CD (GitHub Actions)
✅ Comprehensive documentation
✅ Step-by-step verification guide
✅ Component creation template

**Everything is documented and ready for him to start learning!**

Want me to create a "Week 1 Learning Plan" document next?
