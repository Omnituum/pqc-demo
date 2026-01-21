# Omnituum PQC Studio

A browser-native Post-Quantum Cryptography (PQC) demonstration platform. Experience hybrid encryption combining classical X25519 with NIST-standardized ML-KEM-768 (Kyber) — all running locally in your browser.

## Features

- **Hybrid Encryption**: Combines X25519 (classical) + ML-KEM-768 (post-quantum) for defense-in-depth
- **Identity Vault**: Local key management with PBKDF2 + AES-256-GCM encryption
- **Zero Server**: All cryptographic operations run client-side — no data leaves your browser
- **Interactive Demo**: Real-time encryption/decryption with visual feedback
- **Educational Docs**: Built-in documentation covering PQC basics, threat models, and standards

## Standards

- **NIST FIPS 203** — ML-KEM (Kyber) post-quantum KEM
- **RFC 7748** — X25519 elliptic curve Diffie-Hellman
- **RFC 8439** — XSalsa20-Poly1305 AEAD
- **NIST SP 800-132** — PBKDF2 key derivation
- **NIST SP 800-38D** — AES-GCM authenticated encryption

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Development

```bash
# Run dev server with hot reload
npm run dev

# Type check
npx tsc --noEmit

# Lint
npm run lint

# Preview production build
npm run preview
```

## Architecture

```
src/
├── components/
│   ├── LandingPage.tsx      # Marketing landing page
│   ├── OmnituumShell.tsx    # Main app shell
│   ├── VaultPanel.tsx       # Identity/key management
│   ├── MessageEncryptor.tsx # Encryption interface
│   ├── MessageDecryptor.tsx # Decryption interface
│   └── DocsPanel.tsx        # Interactive documentation
├── utils/
│   ├── encode.ts            # Encoding utilities
│   └── decode.ts            # Decoding utilities
├── App.tsx                  # Router and state
└── main.tsx                 # Entry point
```

## Security Model

**What this protects against:**
- Harvest-now-decrypt-later attacks
- Future quantum computer threats to key exchange
- Classical cryptanalysis attacks

**What this does NOT protect against:**
- Compromised endpoints
- Malware on your device
- Side-channel attacks
- Social engineering

**Important:** This is a demonstration platform. The vault uses browser localStorage which persists until cleared. For production use cases, integrate with [@omnituum/pqc-shared](https://github.com/omnituum/pqc-shared).

## Dependencies

- [@omnituum/pqc-shared](https://www.npmjs.com/package/@omnituum/pqc-shared) — Core PQC primitives
- React 18
- Vite 5
- Tailwind CSS

## License

MIT — see [LICENSE](LICENSE)

## Links

- [Omnituum](https://omnituum.com)
- [pqc-shared on npm](https://www.npmjs.com/package/@omnituum/pqc-shared)
- [pqc-shared on GitHub](https://github.com/omnituum/pqc-shared)
