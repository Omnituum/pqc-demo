# @omnituum/pqc-studio — Gaps and Tasks

**Date:** 2026-04-24 (initial scaffold — DO-37 registered `pqc-studio` in MODULE_INDEX.json and completed canonical-4 via this file + `MONETIZATION_STRATEGY.md`. Discovered 2026-04-24 during Phase 2 closure audit: module existed on disk + rendered by docs-site SECTIONS but was unregistered in MODULE_INDEX. Dir-name drift preserved: directory is `pqc-demo` (legacy), module name is `pqc-studio`, package is `@omnituum/pqc-studio` — same pattern as `secure-intake` module ≠ `secure-intake-docs` dir. New **PS-##** prefix registered in DOC_STANDARD § Registered Prefixes via DO-37.)
**Module:** pqc-studio
**Status:** active
**Package:** `@omnituum/pqc-studio`
**Version:** 0.1.0
**Prefix:** **PS-##** (registered in DOC_STANDARD § Registered Prefixes 2026-04-24 via DO-37)
**Disposition:** Browser-native PQC demonstration; educational + evaluation surface. MIT-licensed; zero-server architecture. Consumes `@omnituum/pqc-shared` primitives per the pointer-only rule — shared crypto concerns track there, not here.

---

## Status Summary

- **Tracked:** 3
- **Complete:** 0
- **Open:** 3

---

## Gaps

- [ ] **PS-01** — Resolve dir-vs-module name drift decision. Options: (a) rename `libs/Omnituum/pqc-demo/` → `libs/Omnituum/pqc-studio/` (breaking change to paths in governance + docs-site SECTIONS); (b) accept drift permanently and document in MODULE_INVENTORY.md alongside the `secure-intake` precedent. Owner ruling required; low urgency since the registry already supports the drift via separate `module` + `path` fields.
- [ ] **PS-02** — Harden the vault against brute-force beyond PBKDF2. README currently cites PBKDF2 + AES-256-GCM; evaluators comparing against pqc-vault will ask about Argon2id. Either align to pqc-vault's upgrade roadmap (PBKDF2 → Argon2id, tracked under PQV-##) or document the deliberate simplicity choice for demo scope.
- [ ] **PS-03** — Instrument the demo's effectiveness as an evaluation funnel. Minimal analytics (opt-in, privacy-preserving) to measure whether hands-on demo → library evaluation conversion is load-bearing enough to justify maintenance cost. If not, clarify in MONETIZATION_STRATEGY.md whether the ROI is sales-enablement, technical-evangelism, or both.

---

## Cross-Cutting (not tracked as local gaps)

- **Shared crypto primitives** — owned by `@omnituum/pqc-shared` under the **PQC-##** prefix. Any changes to hybrid encryption internals (ML-KEM, X25519, AEAD) belong there; this package consumes via pointer.
- **Vault format evolution** — if the demo vault format needs versioning or migration work, coordinate with `@omnituum/pqc-vault` (**PQV-##**) which owns the production vault concerns.
- **PQC education content** — README + in-app docs explain NIST standards (FIPS 203, RFC 7748, RFC 8439). Content updates happen here, but authoritative standard references live in `governance/standards/package-docs/reference/` where applicable.
