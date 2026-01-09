```markdown
# Module 05: Quality & Reliability

## 1. The Guard Rails: Biome
**"The Janitor and the English Teacher combined"**

In coding, we have two types of automated checks:
1.  **Formatting (The Janitor):** "You forgot a semicolon," or "This indentation is ugly." (Traditionally handled by *Prettier*).
2.  **Linting (The Teacher):** "You defined a variable `x` but never used it," or "This logic will cause a crash." (Traditionally handled by *ESLint*).

**The Problem:** Running both ESLint and Prettier is slow because they are written in JavaScript. They often fight each other (Prettier wants to break a line, ESLint yells that the line is broken).

**The Solution: Biome**
Biome is a single tool written in **Rust** that does *both* jobs.
* **Performance:** It formats code **35x faster** than Prettier. It formats an entire project in milliseconds.
* **Simplicity:** You don't need complex config files to make the two tools play nice. It just works.

---

## 2. The Lab: Vitest
**"Testing the Engine, not the Car"**

When you build a car engine, you don't put it in a car and drive it on the highway just to see if the pistons fire. You test it on a stand.

**Vitest** allows us to test our code's logic in isolation.

* **Why not Jest?** Jest is the old standard. It is heavy and requires a separate configuration from our build tool.
* **Why Vitest?** It is "Vite Native." It uses the exact same setup as our main app.
    * If we write a function `calculateTax(amount)`, we can write a Vitest script that runs `calculateTax(100)` and asserts that the result is `16`.
    * This runs instantly every time we save, ensuring we didn't break old math while writing new math.



> **The Testing Pyramid:** Vitest handles the bottom layer (Unit Tests)—fast, cheap, and precise.

---

## 3. The Accountant: Dinero.js
**"The Floating Point Trap"**

This is the most critical library for a Point of Sale system. **You cannot trust JavaScript with money.**

### The Problem: IEEE 754
Computers use "Floating Point" math (binary) to handle decimals. They cannot perfectly represent some numbers, like `0.1`.

**Try this in your browser console right now:**
```javascript
0.1 + 0.2
// Result: 0.30000000000000004

```

If you print that on a receipt, your customer will think your software is broken. If you run a store for a year with that math, your accounting will be off by hundreds of dollars.

### The Solution: Integer Math

**Dinero.js** solves this by storing all money as **Integers (Cents)**.

* It doesn't see `$10.50`.
* It sees `1050` cents.

It handles the math safely in integers and only adds the decimal point when showing the number to the human.

```javascript
// The Unsafe Way
const price = 10.50;

// The Dinero Way
const price = Dinero({ amount: 1050, currency: 'MXN' });

```

### Summary for the Student

Quality isn't just about "code that runs."

* **Biome** ensures the code is readable.
* **Vitest** ensures the logic is correct.
* **Dinero** ensures the math is legal.

```

```