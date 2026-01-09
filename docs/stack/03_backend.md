
# Module 03: The Backend (The Brain)

## 1. The Framework: ElysiaJS
**"The Express.js Killer"**

If you have learned backend development before, you likely used **Express.js**. While Express is famous, it is old (built for Node.js over 10 years ago) and slow.

**ElysiaJS** is a modern framework built specifically for **Bun**.

### Why Elysia?
1.  **Raw Speed:** Because it uses Bun's internal HTTP tools instead of Node's, it is significantly faster. It can handle thousands of requests per second with barely any memory usage.
2.  **Developer Experience:** It looks like Express (easy to learn) but acts like a compiler. It validates data *before* your code even runs.

---

## 2. The Superpower: Eden Treaty
**"End-to-End Type Safety"**

This is the main reason we chose this stack. In a traditional "Frontend vs Backend" setup, they are strangers.

* **The Problem:** The Backend sends a user object `{ id: 1, name: "Juan" }`. The Frontend *guesses* what it will receive. If the backend changes `name` to `fullName`, the Frontend breaks, and you won't know until the app crashes.
* **The Solution (Eden Treaty):**
    Elysia allows the Frontend to **import the Backend's types**.
    Your Frontend code treats the Backend API like a local JavaScript function.

```typescript
// Traditional Fetch (Risky)
fetch('/api/user').then(data => data.json().name) // TypeScript doesn't know if 'name' exists

// Eden Treaty (Safe)
api.user.get() // VS Code autocompletes '.get()'
   .then(({ data }) => data.name) // TypeScript knows 'name' is a string!

```

> **Key Takeaway:** If you change the database schema in the Backend folder, the Frontend folder instantly throws a red error line. We catch bugs at compile time, not runtime.

---

## 3. The Translator: Drizzle ORM

**"SQL with Superpowers"**

An **ORM** (Object-Relational Mapper) translates your JavaScript code into SQL database commands.
The industry giant is **Prisma**, but we are using **Drizzle**.

### Why Drizzle over Prisma?

* **No "Black Box":** Prisma hides the SQL it generates. Drizzle is "SQL-like." If you know how to write a `SELECT` statement, you already know how to use Drizzle.
* **Zero "Cold Start":** Prisma relies on a heavy Rust engine that takes time to load (bad for serverless). Drizzle is just lightweight TypeScript.
* **Performance:** Drizzle is currently the fastest TypeScript ORM on the market.

**Example Comparison:**

```typescript
// Drizzle Code
await db.select().from(products).where(eq(products.id, 1));

// Translates directly to:
// SELECT * FROM products WHERE id = 1;

```

---

## 4. The Database: SQLite & Turso

**"Local First, Cloud Ready"**

For a POS system, reliability is everything. We cannot depend on an always-online AWS database.

* **Development (SQLite):** We use a simple `file.db` on your computer. It is fast, free, and requires no internet.
* **Production (Turso/LibSQL):** This is where it gets cool. Turso is a fork of SQLite that works **over HTTP**.
* It allows us to have a database that sits on the "Edge" (servers close to the store).
* It supports **Replication**: The POS can have a local copy of the database for offline speed, which syncs to the cloud when the internet comes back.



### Summary Architecture

1. **Elysia** receives the request (e.g., "Scan Item").
2. **Elysia** checks the data type (Validation).
3. **Drizzle** translates the request to SQL.
4. **SQLite** finds the item.
5. **Eden Treaty** ensures the Frontend receives exactly what it expects.


