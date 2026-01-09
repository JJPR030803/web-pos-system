# Module 06: Workflow & The Real World

## 1. Collaboration: Git & Conventional Commits
**"Coding is a Team Sport"**

In a university project, you might email zip files or push generic messages like "fixed bug." In professional software (and this project), we follow strict rules so we can trace history.

* **The Problem:** You fix the cart logic. 3 months later, it breaks. You look at the history and see 50 commits named "update." You have no idea which one broke it.
* **The Solution:** **Conventional Commits**. We structure our messages so machines (and humans) can read them.

### The Rules:
* `feat: allow user to add discount` (New feature)
* `fix: prevent crash when scanning empty barcode` (Bug fix)
* `chore: update bun version` (Maintenance)
* `refactor: clean up product list code` (No logic change)

> **Teaching Moment:** This allows us to auto-generate "Changelogs" for the shop owner so they know what changed in the update.

---

## 2. Security: Environment Variables (.env)
**"The Secret Vault"**

Never hardcode secrets. Even if this runs locally, you might eventually sync to a cloud DB.

* **The Mistake:** `const dbPassword = "supersecret123";` committed to GitHub.
* **The Solution:** `.env` files.
    * **Bun** handles this natively. We create a `.env` file that is *ignored* by Git.
    * In code: `process.env.DB_PASSWORD`.

> **The Lesson:** "If it's a secret, it lives in the environment, not the code."

---

## 3. The Hardware: "The Physical Bridge"
**"It's not just a website"**

This is the most exciting part of a POS. Students often think they need complex drivers to make a barcode scanner work.

* **Barcode Scanners:** They are just **Keyboards**.
    * *How it works:* The scanner types the numbers really fast and hits "Enter."
    * *The Code:* We write a global listener for the "Enter" key. If 12 numbers were typed in the last 50ms, we assume it was a scan, not a human typing.
* **Receipt Printers:** They are just **Browsers**.
    * *How it works:* We use the standard `window.print()` API, but we style a specific CSS media query `@media print` that hides the buttons and sidebar, leaving only the receipt text formatted for 80mm paper.

---

## 4. Deployment: "It works on my machine... now what?"
**"The Docker Container"**

Since we are using **Bun**, we can package the entire backend and frontend into a **Docker Container**.

* **Why?** The computer at the shop might be running Windows 10, or Linux Mint, or an old Mac.
* **The Solution:** We ship a "Container." It contains a tiny version of Linux + Bun + Our Code.
* **The Benefit:** If it runs on your laptop, it runs on the shop computer. 100% guaranteed.