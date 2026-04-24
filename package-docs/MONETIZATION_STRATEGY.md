# @omnituum/pqc-studio — Monetization Strategy

**Date:** 2026-04-24
**Module:** pqc-studio
**Disposition:** Educational / demo surface. Not a direct revenue surface; enables monetizable downstreams via awareness + evaluation.

---

## Positioning

PQC Studio is a browser-native demonstration of hybrid post-quantum cryptography (X25519 + ML-KEM-768 + AEAD). It is the *evaluation front door* for prospects and technical buyers deciding whether to adopt Omnituum PQC libraries. It has no direct commercial surface of its own — no paywall, no account tier, no hosted service.

## Value Captured Downstream

Revenue accrues at the consumer boundary, not here:

| Consumer | Revenue surface | Studio's role |
|---|---|---|
| `@omnituum/pqc-shared` (and downstream pqc-vault / pqc-web / pqc-ble / secure-intake) | Private workspace library; support contracts on consumer products | Studio is the hands-on proof point that moves decision-makers from "I read about PQC" to "I tried it and it worked" |
| Omnituum enterprise / licensing engagements | Per-engagement revenue | Studio is the 10-minute qualification demo that replaces 1-hour sales calls |
| Community awareness → inbound | Long-tail funnel into paid surfaces | Zero-friction in-browser demo (no install, no signup) reaches evaluators who wouldn't install a CLI |

## Commercial Posture

- **License:** MIT (open) — demo value is maximized by open distribution; the monetizable artifacts are the library support, enterprise deployments, and hosted adjacent products, not the demo code.
- **Hosting:** static-site hostable on any CDN; deployment is not a revenue surface.
- **Pricing:** N/A at this layer.
- **Support:** N/A — demo-scope; issues go through the Omnituum library support contracts.

## Non-Goals

- **Not a production crypto tool.** The browser vault is illustrative; production use belongs in `@omnituum/pqc-shared` + `@omnituum/pqc-vault`.
- **Not a hosted SaaS.** No account system, no multi-tenant backend. Keeping zero-server is load-bearing for the trust story.
- **Not a library.** Studio is an application; extracting reusable crypto code into a library belongs in `@omnituum/pqc-shared`.

## Strategic Importance

Scored 6/10 in `MODULE_INDEX.json`. Demonstration value for the Omnituum PQC portfolio. Load-bearing in the funnel sense (first-touch for many technical evaluators) but not in the product-integration sense.
