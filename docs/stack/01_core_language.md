
# Module 01: Core Runtime & Language

## 1. The Foundation: Bun (The Runtime)
**"Why aren't we just using Node.js?"**

For the last 10+ years, Node.js has been the standard way to run JavaScript outside of a browser. However, as modern development got more complex, we started needing a dozen external tools just to get a project running (Tooling Fatigue).

**Bun** is a modern reimagining of the JavaScript runtime, built from scratch in a high-performance language called **Zig**.

### Key Advantages for our POS:
* **All-in-One Toolchain:**
    * *In Node:* You need `npm` (install), `jest` (test), `dotenv` (env vars), and `nodemon` (restarts).
    * *In Bun:* It does all of this natively. `bun install`, `bun test`, `bun run`. This reduces our project complexity significantly.
* **Speed:** Bun starts up up to **4x faster** than Node.js. For a local POS system that might need to restart if a machine crashes, these milliseconds add up to a better user experience.
* **TypeScript Native:** Bun understands TypeScript files (`.ts`) out of the box. You don't need to install `ts-node` or configure compilation steps just to run a script.

> **Mental Model:** Think of Node.js as a reliable sedan that requires you to attach a trailer for every extra tool you need. Bun is a sports car with the trailer built into the trunk.

---

## 2. The Language: TypeScript (The Safety Net)
**"Why strictly typed JavaScript?"**

JavaScript is a "loose" language. It lets you add a `Number` to a `String` without crashing immediately—it just creates a weird result (e.g., `5 + "10" = "510"`).

In a **Point of Sale (POS)** system handling money, "weird results" are unacceptable. We use **TypeScript** to force JavaScript to behave strictly.

### Why it is non-negotiable for this project:
1.  **Financial Safety:**
    * *JavaScript:* You might accidentally calculate `price * tax` where `tax` is undefined. The result is `NaN` (Not a Number), which looks unprofessional on a receipt.
    * *TypeScript:* The compiler will refuse to build the app if there is even a 1% chance `tax` could be undefined.
2.  **Autocompletion (Developer Experience):**
    * When you type `product.`, TypeScript knows exactly what fields exist (`sku`, `price`, `name`). This speeds up development and prevents typos (like typing `product.prsce`).



---

## 3. The Configuration: "Strict Mode"
We are not just using TypeScript; we are using it in **Strict Mode**. This is enabled in our `tsconfig.json`.

### What strict mode actually does:
* **`noImplicitAny`:** You cannot just say "this variable is *whatever*." You must define what it is.
    * *Bad:* `function calculate(total)` -> TypeScript doesn't know if `total` is a number or a text.
    * *Good:* `function calculate(total: number)`
* **`strictNullChecks`:** The billion-dollar mistake killer.
    * If a user *might* not be logged in, TypeScript forces you to check for that possibility before trying to access `user.name`.

### Summary for the Student
We chose this stack because it respects your time and your code quality.
* **Bun** respects your time by being fast and requiring zero config.
* **TypeScript** respects your code by catching bugs before you even save the file.
