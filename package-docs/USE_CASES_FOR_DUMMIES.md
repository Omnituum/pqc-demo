# PQC Studio — Use Cases (Plain English)

**Date:** 2026-03-18

---

## What This Does (Simple)

PQC Studio is a sandbox that shows how next-generation encryption works — the kind that can't be broken by future quantum computers. You open it in your browser, generate keys, encrypt messages, and decrypt them. No installation, no server, no accounts.

Think of it like a chemistry set for cryptography. You can experiment safely without building a full lab.

---

## Example 1 — Learning How PQC Works

**The story:** A developer has heard about post-quantum cryptography but hasn't used it. They want to see the full lifecycle before integrating it into their product.

**Step by step:**
1. Open PQC Studio in the browser
2. Generate a hybrid keypair (X25519 + Kyber)
3. Encrypt a message — see both the classical and quantum-safe components
4. Decrypt it with the private key
5. Read the built-in docs explaining what each step does and why

**Why it matters:** Understanding the encrypt/decrypt lifecycle hands-on takes 5 minutes. Reading the spec takes hours.

---

## Example 2 — Evaluating Omnituum for Integration

**The story:** A technical lead is evaluating whether to adopt @omnituum/pqc-shared in their product. They want to see it work before committing.

**Step by step:**
1. Open PQC Studio — no installation, no API keys
2. Run through the encryption demo with their own test data
3. Inspect the vault: create identity, export, re-import
4. Verify that the same operation produces the same output (deterministic)
5. Decision: the library does what it claims, proceed with integration

**Why it matters:** The demo is the sales tool. It lets evaluators verify the library's claims without trusting documentation alone.

---

## Example 3 — Conference or Workshop Demo

**The story:** A presenter at a security conference wants to show hybrid PQC encryption live on stage.

**Step by step:**
1. Open PQC Studio on the projector — it's a static site, works offline after first load
2. Generate a keypair live, encrypt a message from the audience
3. Show the ciphertext — classical + quantum-safe components visible
4. Decrypt it, show the round-trip
5. Audience sees real PQC in action, not slides

**Why it matters:** Live demos build trust. Static slides don't.

---

## Why It Matters

Quantum computers will eventually break today's encryption (RSA, ECDH). The migration to post-quantum algorithms is happening now (NIST finalized ML-KEM in 2024). PQC Studio makes that migration tangible — you can see it, touch it, and verify it yourself.

---

## When NOT to Use This

- **Production systems** — this is a demo, not a deployment target. Use @omnituum/pqc-shared directly.
- **Key storage** — vault data lives in browser memory/localStorage. Not suitable for real key management.
- **Security audits** — the demo prioritizes clarity over hardening. Use the library directly for security-critical code.
