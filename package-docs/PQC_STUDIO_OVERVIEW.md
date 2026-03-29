# @omnituum/pqc-studio — Overview

**Date:** 2026-03-18
**Version:** 0.1.0
**Stack:** React 18 · Vite · Tailwind · @omnituum/pqc-shared
**License:** MIT

---

## What This Is

PQC Studio is a browser-native interactive demonstration of post-quantum cryptography. It runs hybrid encryption (X25519 + ML-KEM-768), identity vault management, and real-time encrypt/decrypt — all client-side, zero server dependency. Built-in documentation explains PQC basics, threat models, and NIST standards.

---

## Why It Exists

**Problem:** Post-quantum cryptography is abstract. Developers and evaluators can't assess PQC libraries without hands-on interaction, and most demos require server infrastructure or CLI tooling.

**Consequence:** Adoption stalls because decision-makers can't see the technology work before committing to integration.

**Why current solutions fail:** Existing PQC demos are either academic papers, CLI-only tools, or require installing native dependencies. None run in the browser with zero setup.

---

## Architecture

```
┌─────────────────────────────────────────────────┐
│              PQC Studio (Browser)                │
│                                                 │
│  ┌─────────────┐  ┌──────────────────────────┐  │
│  │ Identity     │  │ Encryption Demo          │  │
│  │ Vault UI     │  │                          │  │
│  │ • Create     │  │ • Hybrid encrypt/decrypt │  │
│  │ • Manage     │  │ • Visual feedback        │  │
│  │ • Export     │  │ • Real-time output       │  │
│  └──────┬──────┘  └────────────┬─────────────┘  │
│         │                      │                 │
│         └──────────┬───────────┘                 │
│                    ▼                             │
│  ┌─────────────────────────────────────────────┐ │
│  │         @omnituum/pqc-shared                │ │
│  │  X25519 · ML-KEM-768 · XSalsa20-Poly1305   │ │
│  │  PBKDF2 · AES-256-GCM · BLAKE3             │ │
│  └─────────────────────────────────────────────┘ │
│                                                 │
│  Everything runs in-browser. No server calls.   │
└─────────────────────────────────────────────────┘
```

---

## Data Flow

1. User generates a hybrid identity (X25519 + Kyber keypair)
2. Identity is stored in an encrypted vault (PBKDF2 + AES-256-GCM)
3. User encrypts a message with the recipient's public keys
4. Hybrid encryption: X25519 DH + Kyber KEM → shared secret → XSalsa20-Poly1305
5. User decrypts using their private keys
6. All operations display step-by-step visual output

---

## Key Guarantees

| Property | Implementation |
|----------|---------------|
| **Zero server** | All crypto runs client-side via @omnituum/pqc-shared |
| **NIST compliant** | ML-KEM-768 (FIPS 203), X25519 (RFC 7748), AES-GCM (SP 800-38D) |
| **Deterministic verification** | Same inputs always produce the same cryptographic outputs |
| **Educational** | Built-in docs covering PQC basics, hybrid encryption rationale, threat models |

---

## Dependencies

| Dependency | Purpose |
|------------|---------|
| `@omnituum/pqc-shared` | All cryptographic primitives |
| React 18 | UI framework |
| Vite | Build tooling |
| Tailwind CSS | Styling |
