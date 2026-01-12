# POS System - Package Documentation

Complete documentation for all packages used in the POS monorepo, organized by workspace.

---

## Root Workspace

### Bun
**Version:** Runtime (latest)  
**Purpose:** JavaScript runtime and package manager  
**Documentation:** https://bun.sh/docs

Fast all-in-one JavaScript runtime that replaces Node.js, npm, and bundler. Provides native TypeScript support and workspace management.

**Key Features:**
- Native TypeScript execution
- Workspace management (`bun workspaces`)
- Fast package installation
- Built-in test runner
- Hot reload with `--hot` flag

**Common Commands:**
```bash
bun install              # Install all dependencies
bun run <script>        # Run a script
bun --hot src/index.ts  # Run with hot reload
```

### Biome
**Version:** TBD (when installed)  
**Purpose:** Code quality tooling (linter & formatter)  
**Documentation:** https://biomejs.dev/

Modern toolchain for web projects that replaces ESLint and Prettier with a single fast tool.

**Key Features:**
- Linting with auto-fix
- Code formatting
- Import sorting
- Fast performance (written in Rust)
- Compatible with ESLint/Prettier configs

**Configuration:** `biome.json` in root

### Vitest
**Version:** TBD (when installed)  
**Purpose:** Unit and integration testing  
**Documentation:** https://vitest.dev/

Vite-native testing framework with Jest-compatible API.

**Key Features:**
- Fast test execution
- Watch mode
- TypeScript support
- React Testing Library integration
- Coverage reports

**Configuration:** `vitest.config.ts`

---

## Frontend Workspace (`apps/frontend`)

### Core Framework

#### React
**Version:** ^19.2.0  
**Purpose:** UI library  
**Documentation:** https://react.dev/

JavaScript library for building user interfaces with a component-based architecture.

**Key Concepts:**
- Components (functional with hooks)
- Props and state
- Effects and lifecycle
- Context for state sharing
- Concurrent rendering (React 19)

**Common Patterns:**
```tsx
// Functional component with hooks
function ProductList() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    // Fetch data
  }, []);
  
  return <div>{/* JSX */}</div>;
}
```

#### React DOM
**Version:** ^19.2.0  
**Purpose:** React renderer for web  
**Documentation:** https://react.dev/reference/react-dom

Provides DOM-specific methods for React, including rendering and hydration.

**Usage:**
```tsx
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
```

### Build Tools

#### Vite
**Version:** ^7.2.4  
**Purpose:** Build tool and dev server  
**Documentation:** https://vitejs.dev/

Next-generation frontend build tool with instant server start and lightning-fast HMR.

**Key Features:**
- Native ES modules in dev
- Hot Module Replacement (HMR)
- Optimized production builds
- Plugin ecosystem
- TypeScript support

**Configuration:** `vite.config.ts`

#### @vitejs/plugin-react
**Version:** ^5.1.1  
**Purpose:** React support for Vite  
**Documentation:** https://github.com/vitejs/vite-plugin-react

Official Vite plugin for React with Fast Refresh support.

**Features:**
- Fast Refresh (preserves state during edits)
- Automatic JSX runtime
- React DevTools integration

### TypeScript

#### TypeScript
**Version:** ~5.9.3  
**Purpose:** Type-safe JavaScript  
**Documentation:** https://www.typescriptlang.org/

Typed superset of JavaScript that compiles to plain JavaScript.

**Configuration:** `tsconfig.json`

**Key Features:**
- Static type checking
- IntelliSense support
- Interfaces and type aliases
- Generics
- Null safety

#### @types/react
**Version:** ^19.2.5  
**Purpose:** TypeScript definitions for React  
**Documentation:** https://www.npmjs.com/package/@types/react

Type definitions for React library.

#### @types/react-dom
**Version:** ^19.2.3  
**Purpose:** TypeScript definitions for React DOM  
**Documentation:** https://www.npmjs.com/package/@types/react-dom

Type definitions for React DOM library.

#### @types/node
**Version:** ^24.10.1  
**Purpose:** TypeScript definitions for Node.js APIs  
**Documentation:** https://www.npmjs.com/package/@types/node

Required for path resolution and build scripts.

### Styling (To Be Added)

#### Tailwind CSS
**Version:** TBD  
**Purpose:** Utility-first CSS framework  
**Documentation:** https://tailwindcss.com/

Utility-first CSS framework for rapid UI development.

**Key Concepts:**
- Utility classes (`flex`, `mt-4`, `text-blue-500`)
- Responsive design (`md:flex`, `lg:w-1/2`)
- Custom theme configuration
- JIT (Just-In-Time) compiler

**Configuration:** `tailwind.config.js`

**Example:**
```tsx
<div className="flex items-center justify-between p-4 bg-white shadow-md">
  <h1 className="text-2xl font-bold">Product</h1>
  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
    Add
  </button>
</div>
```

#### PostCSS
**Version:** TBD  
**Purpose:** CSS transformation tool  
**Documentation:** https://postcss.org/

Required for Tailwind CSS processing.

#### Autoprefixer
**Version:** TBD  
**Purpose:** Auto-add vendor prefixes  
**Documentation:** https://github.com/postcss/autoprefixer

Automatically adds vendor prefixes to CSS rules.

#### clsx
**Version:** TBD  
**Purpose:** Conditional className utility  
**Documentation:** https://github.com/lukeed/clsx

Tiny utility for constructing className strings conditionally.

**Usage:**
```tsx
import clsx from 'clsx';

<div className={clsx(
  'base-class',
  isActive && 'active-class',
  { 'error-class': hasError }
)} />
```

#### tailwind-merge
**Version:** TBD  
**Purpose:** Merge Tailwind classes without conflicts  
**Documentation:** https://github.com/dcastil/tailwind-merge

Merges Tailwind CSS classes and removes conflicts.

**Usage:**
```tsx
import { twMerge } from 'tailwind-merge';

// Later classes override earlier ones
const className = twMerge('p-4 bg-red-500', 'bg-blue-500'); // 'p-4 bg-blue-500'
```

#### class-variance-authority (CVA)
**Version:** TBD  
**Purpose:** Component variant management  
**Documentation:** https://cva.style/docs

Creates type-safe component variants with Tailwind CSS.

**Usage:**
```tsx
import { cva } from 'class-variance-authority';

const button = cva('button-base', {
  variants: {
    intent: {
      primary: 'bg-blue-500',
      secondary: 'bg-gray-500',
    },
    size: {
      small: 'text-sm',
      large: 'text-lg',
    }
  }
});

<button className={button({ intent: 'primary', size: 'large' })} />
```

#### lucide-react
**Version:** TBD  
**Purpose:** Icon library  
**Documentation:** https://lucide.dev/

Beautiful, consistent icon set as React components.

**Usage:**
```tsx
import { ShoppingCart, Plus, Trash2 } from 'lucide-react';

<button>
  <Plus className="w-4 h-4" />
  Add Product
</button>
```

### Routing (To Be Added)

#### react-router-dom
**Version:** TBD  
**Purpose:** Client-side routing  
**Documentation:** https://reactrouter.com/

Declarative routing for React applications.

**Key Concepts:**
- Routes and nested routes
- Links and navigation
- URL parameters
- Loaders and actions (v6.4+)

**Usage:**
```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/products" element={<ProductList />} />
    <Route path="/products/:id" element={<ProductDetail />} />
  </Routes>
</BrowserRouter>
```

### Data Fetching (To Be Added)

#### @tanstack/react-query
**Version:** TBD  
**Purpose:** Server state management  
**Documentation:** https://tanstack.com/query/latest

Powerful asynchronous state management for React.

**Key Features:**
- Automatic caching
- Background refetching
- Optimistic updates
- Infinite scrolling
- DevTools

**Usage:**
```tsx
import { useQuery } from '@tanstack/react-query';

function ProductList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetch('/api/products').then(r => r.json())
  });
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{/* Render products */}</div>;
}
```

### Forms (To Be Added)

#### react-hook-form
**Version:** TBD  
**Purpose:** Form state management  
**Documentation:** https://react-hook-form.com/

Performant, flexible forms with easy validation.

**Key Features:**
- Minimal re-renders
- Easy validation integration
- TypeScript support
- Small bundle size

**Usage:**
```tsx
import { useForm } from 'react-hook-form';

function ProductForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    console.log(data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name', { required: true })} />
      {errors.name && <span>Name is required</span>}
      <button type="submit">Submit</button>
    </form>
  );
}
```

#### zod
**Version:** TBD  
**Purpose:** Schema validation  
**Documentation:** https://zod.dev/

TypeScript-first schema validation library.

**Usage:**
```tsx
import { z } from 'zod';

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.number().positive('Price must be positive'),
  sku: z.string().regex(/^[A-Z0-9-]+$/, 'Invalid SKU format')
});

type Product = z.infer<typeof productSchema>;
```

#### @hookform/resolvers
**Version:** TBD  
**Purpose:** Validation resolvers for React Hook Form  
**Documentation:** https://github.com/react-hook-form/resolvers

Connects validation libraries (like Zod) to React Hook Form.

**Usage:**
```tsx
import { zodResolver } from '@hookform/resolvers/zod';

const { register, handleSubmit } = useForm({
  resolver: zodResolver(productSchema)
});
```

---

## Backend Workspace (`apps/backend`)

### Core Framework

#### Elysia
**Version:** ^1.1.29  
**Purpose:** Fast web framework for Bun  
**Documentation:** https://elysiajs.com/

Type-safe, end-to-end framework built for Bun with excellent performance.

**Key Features:**
- Built for Bun runtime
- End-to-end type safety
- Plugin ecosystem
- Schema validation
- Automatic OpenAPI documentation

**Basic Usage:**
```tsx
import { Elysia } from 'elysia';

const app = new Elysia()
  .get('/', () => 'Hello World')
  .get('/products', () => {
    return [
      { id: 1, name: 'Product 1' }
    ];
  })
  .listen(3000);

console.log(`Server running at http://localhost:3000`);
```

**Route Patterns:**
```tsx
// Simple routes
.get('/products', handler)
.post('/products', handler)
.put('/products/:id', handler)
.delete('/products/:id', handler)

// With params
.get('/products/:id', ({ params }) => {
  const { id } = params;
  // ...
})

// With body
.post('/products', ({ body }) => {
  const { name, price } = body;
  // ...
})

// With validation
import { t } from 'elysia';

.post('/products', ({ body }) => {
  // body is typed and validated
}, {
  body: t.Object({
    name: t.String(),
    price: t.Number()
  })
})
```

#### @types/bun
**Version:** latest  
**Purpose:** TypeScript definitions for Bun  
**Documentation:** https://bun.sh/docs/typescript

Type definitions for Bun runtime APIs.

**Provides types for:**
- Bun global object
- File I/O APIs
- SQLite APIs
- Password hashing
- Testing utilities

### Middleware (To Be Added)

#### @elysiajs/cors
**Version:** TBD  
**Purpose:** CORS middleware  
**Documentation:** https://elysiajs.com/plugins/cors

Enables Cross-Origin Resource Sharing for your API.

**Usage:**
```tsx
import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';

const app = new Elysia()
  .use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true
  }))
  .listen(3000);
```

### Database (Future Consideration)

#### Drizzle ORM
**Purpose:** TypeScript ORM  
**Documentation:** https://orm.drizzle.team/

Lightweight TypeScript ORM with excellent Bun support.

**Why consider it:**
- Type-safe queries
- Great Bun integration
- Migrations support
- Better than writing raw SQL
- Smaller than Prisma

**Example:**
```tsx
import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';

const sqlite = new Database('pos.db');
const db = drizzle(sqlite);

// Type-safe queries
const products = await db.select().from(productsTable);
```

---

## Shared Workspace (`packages/shared`)

This workspace contains shared TypeScript types, utilities, and constants used across frontend and backend.

**Current Structure:**
```
packages/shared/
├── src/
│   ├── index.ts          # Main export file
│   ├── types/            # Shared TypeScript types
│   ├── constants/        # Shared constants
│   └── utils/            # Shared utility functions
└── package.json
```

**Purpose:**
- Define API contracts (request/response types)
- Share business logic types (Product, Order, etc.)
- Share validation schemas
- Share utility functions
- Ensure type consistency across stack

**Example Types:**
```tsx
// packages/shared/src/types/product.ts
export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductDto {
  name: string;
  sku: string;
  price: number;
  stock: number;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {
  id: string;
}
```

**Usage in Backend:**
```tsx
import { Product, CreateProductDto } from '@pos/shared';

app.post('/api/products', ({ body }) => {
  const product: Product = createProduct(body);
  return product;
}, {
  body: t.Object({
    // Validate according to CreateProductDto
  })
});
```

**Usage in Frontend:**
```tsx
import { Product } from '@pos/shared';

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  // ...
}
```

---

## Package Installation Guide

### Installing Frontend Packages
```bash
# Navigate to frontend workspace
cd apps/frontend

# Install styling utilities
bun add clsx tailwind-merge class-variance-authority

# Install Tailwind CSS
bun add -d tailwindcss postcss autoprefixer
bunx tailwindcss init -p

# Install icons
bun add lucide-react

# Install routing (when needed)
bun add react-router-dom

# Install data fetching (when needed)
bun add @tanstack/react-query

# Install forms (when needed)
bun add react-hook-form zod @hookform/resolvers
```

### Installing Backend Packages
```bash
# Navigate to backend workspace
cd apps/backend

# Install CORS
bun add @elysiajs/cors

# Install database (future)
# bun add drizzle-orm
# bun add -d drizzle-kit
```

### Installing Root Packages
```bash
# Navigate to root
cd ../..

# Install Biome (when ready)
bun add -d @biomejs/biome

# Install Vitest (when ready)
bun add -d vitest @vitest/ui
```

---

## Development Workflow

### Starting Development Servers

**Terminal 1 - Backend:**
```bash
cd apps/backend
bun run dev
# Server runs on http://localhost:3000
```

**Terminal 2 - Frontend:**
```bash
cd apps/frontend
bun run dev
# Dev server runs on http://localhost:5173
```

### Running Tests
```bash
# From root
bun test

# With UI
bun test:ui

# Watch mode
bun test:watch
```

### Code Quality
```bash
# Check formatting
bun run check

# Fix formatting
bun run format

# Lint
bun run lint
```

### Building for Production
```bash
# Build frontend
cd apps/frontend
bun run build

# Build output in dist/

# Preview production build
bun run preview
```

---

## Best Practices

### Import Aliases

Configure path aliases for cleaner imports:

**Frontend tsconfig.json:**
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"]
    }
  }
}
```

**Usage:**
```tsx
// Instead of
import { Button } from '../../../components/ui/button';

// Use
import { Button } from '@/components/ui/button';
```

### Component Organization

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── features/        # Feature-specific components
│   └── layout/          # Layout components
├── lib/                 # Utilities and helpers
├── hooks/              # Custom React hooks
├── pages/              # Page components
└── styles/             # Global styles
```

### API Client Pattern

Create a typed API client:

```tsx
// src/lib/api.ts
import type { Product, CreateProductDto } from '@pos/shared';

const API_BASE = 'http://localhost:3000/api';

export const api = {
  products: {
    list: () => 
      fetch(`${API_BASE}/products`).then(r => r.json() as Promise<Product[]>),
    
    get: (id: string) =>
      fetch(`${API_BASE}/products/${id}`).then(r => r.json() as Promise<Product>),
    
    create: (data: CreateProductDto) =>
      fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(r => r.json() as Promise<Product>)
  }
};
```

### Error Handling

Backend:
```tsx
app.get('/products/:id', async ({ params, error }) => {
  const product = await getProduct(params.id);
  
  if (!product) {
    return error(404, 'Product not found');
  }
  
  return product;
});
```

Frontend:
```tsx
const { data, error, isLoading } = useQuery({
  queryKey: ['product', id],
  queryFn: () => api.products.get(id),
  retry: 1
});

if (error) {
  return <ErrorMessage error={error} />;
}
```

---

## Resources

### Official Documentation
- **Bun:** https://bun.sh/docs
- **React:** https://react.dev/
- **Elysia:** https://elysiajs.com/
- **Vite:** https://vitejs.dev/
- **TypeScript:** https://www.typescriptlang.org/
- **Tailwind CSS:** https://tailwindcss.com/

### Learning Resources
- **React Beta Docs:** Best place to learn modern React
- **Elysia Examples:** https://github.com/elysiajs/elysia/tree/main/example
- **TypeScript Handbook:** https://www.typescriptlang.org/docs/handbook/
- **Tailwind Play:** https://play.tailwindcss.com/ (experiment with classes)

### Tools
- **React DevTools:** Browser extension for debugging React
- **Bun Shell:** https://bun.sh/docs/runtime/shell
- **Thunder Client / Postman:** API testing
- **VS Code Extensions:**
    - Tailwind CSS IntelliSense
    - ESLint / Biome
    - TypeScript Vue Plugin

---

## Next Steps

1. **Initialize Tailwind CSS** in frontend
2. **Set up CORS** in backend
3. **Create first shared types** for Product
4. **Build first vertical slice** (product listing)
5. **Add React Query** when making API calls
6. **Add forms** when creating/editing products

This documentation will be updated as new packages are added to the project.