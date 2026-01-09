# B2B Point of Sale (POS) System

## 1. Project Overview
This project is a high-performance, offline-capable Point of Sale system designed for onsite B2B transactions. 

Unlike traditional e-commerce sites, this application prioritizes **speed**, **keyboard navigation**, and **instant state management**. It is built on a "Headless Architecture," where the backend logic is decoupled from the frontend, allowing us to eventually attach a public Storefront to the same inventory system in Phase 2.

## 2. The Technology Stack ("The Speed Stack")

We have chosen this stack to maximize performance (milliseconds matter in a POS) and developer experience (Type Safety).

### Core Runtime & Language
* **[Bun](https://bun.sh/):** The all-in-one JavaScript runtime, package manager, and bundler. Used to run our server and install packages 30x faster than Node.js.
* **[TypeScript](https://www.typescriptlang.org/):** Statically typed JavaScript. Configured in "Strict Mode" to prevent runtime errors during financial transactions.

### Frontend (The Terminal)
* **[React](https://react.dev/):** (v18.3.1) The UI library. We use the latest hooks/patterns to manage the complex DOM.
* **[Vite](https://vitejs.dev/):** The build tool. Provides instant Hot Module Replacement (HMR) and optimized production builds.
* **[TanStack Router](https://tanstack.com/router):** Type-safe routing. Ensures we cannot accidentally navigate to a broken page URL.
* **[Zustand](https://docs.pmnd.rs/zustand):** Global State Management. Handles the "Shopping Cart" state outside of the React render cycle for maximum performance.
* **[TanStack Query](https://tanstack.com/query):** Async State Management. Handles data syncing with the backend, caching, and background updates.

### Backend (The Brain)
* **[ElysiaJS](https://elysiajs.com/):** A high-performance web framework optimized for Bun. It uses the **Eden Treaty** to share TypeScript types directly with the frontend (no manual API typing required).
* **[Drizzle ORM](https://orm.drizzle.team/):** A lightweight TypeScript ORM. It lets us write safe SQL-like commands without the overhead of heavy frameworks like Prisma.
* **[SQLite](https://www.sqlite.org/) / [Turso](https://turso.tech/):** The database. We use SQLite for local development and Turso (LibSQL) for edge replication.

### UI & UX (The Look)
* **[Tailwind CSS](https://tailwindcss.com/):** Utility-first CSS framework for rapid styling.
* **[Lucide React](https://lucide.dev/):** Modern, tree-shakeable SVG icons.
* **[Radix UI](https://www.radix-ui.com/) (via shadcn/ui):** Headless, accessible UI primitives (Dialogs, Popovers) styled with Tailwind.
* **[Class Variance Authority (CVA)](https://cva.style/):** Manages complex component variants (e.g., `Button variant="destructive" size="lg"`).

### Quality & Reliability
* **[Biome](https://biomejs.dev/):** A single Rust-based tool that replaces both ESLint and Prettier for instant linting and formatting.
* **[Vitest](https://vitest.dev/):** Unit testing framework. Compatible with Vite, allowing us to test logic without starting the whole app.
* **[Dinero.js](https://dinerojs.com/):** Immutable monetary handling. Ensures we never have floating-point math errors (e.g., `$0.10 + $0.20 = $0.30`, not `$0.30000004`).

## 3. Project Structure (Monorepo-lite)

```text
/pos-system
├── /backend       # ElysiaJS API + Database Schema
├── /frontend      # Vite React App (POS Interface)
└── /shared        # Shared Types and Constants
'''

