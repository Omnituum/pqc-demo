import { useState } from 'react';

interface LandingPageProps {
  onEnterStudio: () => void;
}

export function LandingPage({ onEnterStudio }: LandingPageProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would submit to a backend
    console.log('Waitlist signup:', email);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-950 via-[#080c14] to-navy-950 text-white">
      {/* Controlled Access Banner */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-amber-900/90 border-b border-amber-700/50 px-4 py-2.5">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-3 text-center">
          <svg className="w-4 h-4 text-amber-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <p className="text-amber-100 text-xs sm:text-sm font-medium">
            <strong>Controlled Evaluation Environment</strong>
            <span className="hidden sm:inline"> — Access is granted to vetted partners and pilot participants only.</span>
          </p>
        </div>
      </div>

      {/* Animated background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pqc-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-classical-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-nist-500/3 rounded-full blur-3xl" />
      </div>

      {/* Header - with top margin for fixed banner */}
      <header className="relative border-b border-gray-800/30 bg-navy-900/50 backdrop-blur-xl mt-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="https://omnituum.com" target="_blank" rel="noopener noreferrer" className="flex items-center">
              <img
                src="/omnituum-text-logo.png"
                alt="Omnituum"
                className="h-12 md:h-14 w-auto"
              />
            </a>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a>
              <a href="#standards" className="text-gray-400 hover:text-white transition-colors">Standards</a>
              <a href="#why" className="text-gray-400 hover:text-white transition-colors">Why PQC</a>
              <a href="#waitlist" className="text-gray-400 hover:text-white transition-colors">Waitlist</a>
            </nav>
            <button
              onClick={onEnterStudio}
              className="px-4 py-2 bg-pqc-600 hover:bg-pqc-500 rounded-lg text-sm font-medium transition-colors"
            >
              Try Demo
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex flex-col items-center gap-1 px-5 py-3 rounded-2xl bg-nist-900/30 border border-nist-700/30 mb-8">
            <div className="flex items-center gap-2 text-nist-300 text-sm font-medium">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Implements NIST FIPS 203 (ML-KEM-768)
            </div>
            <span className="text-nist-400/60 text-xs">Pre-certification</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">Post-Quantum Security</span>
            <br />
            <span className="bg-gradient-to-r from-classical-400 via-pqc-400 to-nist-400 bg-clip-text text-transparent">
              That Runs in Your Browser
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Hybrid encryption combining <span className="text-classical-400">X25519</span> + <span className="text-pqc-400">Kyber ML-KEM-768</span>.
            No servers. No blockchain. No trust required.
            <span className="text-white font-medium"> Your keys never leave your device.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onEnterStudio}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-classical-600 to-pqc-600 hover:from-classical-500 hover:to-pqc-500 rounded-xl text-lg font-semibold transition-all shadow-lg shadow-pqc-500/20"
            >
              Launch PQC Studio
            </button>
            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-4 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 rounded-xl text-lg font-medium transition-colors"
            >
              Learn More
            </a>
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-12">
            <span className="px-3 py-1.5 bg-classical-900/30 border border-classical-700/30 rounded-full text-classical-400 text-xs font-medium">X25519 ECDH</span>
            <span className="px-3 py-1.5 bg-pqc-900/30 border border-pqc-700/30 rounded-full text-pqc-400 text-xs font-medium">Kyber ML-KEM-768</span>
            <span className="px-3 py-1.5 bg-verified-900/30 border border-verified-700/30 rounded-full text-verified-400 text-xs font-medium">XSalsa20-Poly1305</span>
            <span className="px-3 py-1.5 bg-gray-800 border border-gray-700/30 rounded-full text-gray-400 text-xs font-medium">AES-256-GCM</span>
            <span className="px-3 py-1.5 bg-gray-800 border border-gray-700/30 rounded-full text-gray-400 text-xs font-medium">PBKDF2-SHA256</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Two Tools. One Security Model.</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Experience post-quantum cryptography today with tools designed for developers, researchers, and security professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Hybrid Encryption Demo */}
            <div className="bg-navy-900/50 rounded-2xl border border-gray-800/30 p-8 hover:border-pqc-700/30 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-classical-900/50 to-pqc-900/50 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-pqc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">Hybrid Encryption Demo</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Generate identities, encrypt messages, and verify quantum-resistant security.
                See exactly how X25519 + Kyber work together to protect your data.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <svg className="w-5 h-5 text-verified-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Real-time hybrid key exchange
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <svg className="w-5 h-5 text-verified-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  JSON envelope format for interoperability
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <svg className="w-5 h-5 text-verified-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Zero server dependencies
                </li>
              </ul>
              <button
                onClick={onEnterStudio}
                className="px-6 py-3 bg-pqc-900/30 hover:bg-pqc-800/50 border border-pqc-700/30 rounded-lg text-pqc-300 font-medium transition-colors"
              >
                Try Encryption Demo
              </button>
            </div>

            {/* PQC Identity Vault */}
            <div className="bg-navy-900/50 rounded-2xl border border-gray-800/30 p-8 hover:border-verified-700/30 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-verified-900/50 to-nist-900/50 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-verified-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">PQC Identity Vault</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Sovereign key management for the post-quantum era.
                Store, rotate, and export your cryptographic identities with enterprise-grade protection.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <svg className="w-5 h-5 text-verified-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  PBKDF2-SHA256 (600K iterations)
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <svg className="w-5 h-5 text-verified-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  AES-256-GCM vault encryption
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <svg className="w-5 h-5 text-verified-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Encrypted portable backups
                </li>
              </ul>
              <button
                onClick={onEnterStudio}
                className="px-6 py-3 bg-verified-900/30 hover:bg-verified-800/50 border border-verified-700/30 rounded-lg text-verified-300 font-medium transition-colors"
              >
                Open Vault Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why PQC Section */}
      <section id="why" className="relative py-20 px-4 bg-navy-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Why Post-Quantum Now?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Quantum computers will break today's encryption. The threat is real, and the time to prepare is now.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Harvest Now, Decrypt Later */}
            <div className="bg-navy-950/50 rounded-xl border border-red-800/20 p-6">
              <div className="w-12 h-12 rounded-lg bg-red-900/30 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Harvest Now, Decrypt Later</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Adversaries are collecting encrypted data today, waiting for quantum computers to break it.
                Your secrets from 2024 could be exposed in 2034.
              </p>
            </div>

            {/* Migration Timeline */}
            <div className="bg-navy-950/50 rounded-xl border border-amber-800/20 p-6">
              <div className="w-12 h-12 rounded-lg bg-amber-900/30 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Migration Takes Time</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Enterprise systems take 5-10 years to upgrade cryptography.
                NIST estimates cryptographically relevant quantum computers within 10-15 years.
                The math doesn't leave room for waiting.
              </p>
            </div>

            {/* Defense in Depth */}
            <div className="bg-navy-950/50 rounded-xl border border-verified-800/20 p-6">
              <div className="w-12 h-12 rounded-lg bg-verified-900/30 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-verified-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Hybrid = Defense in Depth</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Omnituum combines classical (X25519) with post-quantum (Kyber).
                Even if one algorithm is broken, the other protects you.
                Security that hedges against unknown unknowns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Standards Section */}
      <section id="standards" className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Built on NIST Standards</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Omnituum implements the official NIST post-quantum cryptography standards finalized in 2024.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-navy-900/50 rounded-xl border border-gray-800/30 p-6 text-center">
              <div className="text-4xl font-bold text-nist-400 mb-2">FIPS 203</div>
              <div className="text-white font-medium mb-1">ML-KEM (Kyber)</div>
              <p className="text-gray-500 text-sm">Key Encapsulation</p>
            </div>
            <div className="bg-navy-900/50 rounded-xl border border-gray-800/30 p-6 text-center">
              <div className="text-4xl font-bold text-classical-400 mb-2">RFC 7748</div>
              <div className="text-white font-medium mb-1">X25519</div>
              <p className="text-gray-500 text-sm">ECDH Key Exchange</p>
            </div>
            <div className="bg-navy-900/50 rounded-xl border border-gray-800/30 p-6 text-center">
              <div className="text-4xl font-bold text-verified-400 mb-2">RFC 8439</div>
              <div className="text-white font-medium mb-1">ChaCha20-Poly1305</div>
              <p className="text-gray-500 text-sm">Authenticated Encryption</p>
            </div>
            <div className="bg-navy-900/50 rounded-xl border border-gray-800/30 p-6 text-center">
              <div className="text-4xl font-bold text-gray-400 mb-2">SP 800-132</div>
              <div className="text-white font-medium mb-1">PBKDF2</div>
              <p className="text-gray-500 text-sm">Key Derivation</p>
            </div>
          </div>
          <p className="text-center text-gray-600 text-xs mt-8">
            Implements NIST-standardized algorithms. Formal validation is pending and not implied.
          </p>
        </div>
      </section>

      {/* Security Model Section */}
      <section className="relative py-20 px-4 bg-navy-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Zero Trust Architecture</h2>
            <p className="text-gray-400">Everything stays local. Your keys never touch a server.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-verified-400 mb-4">What We Protect</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-verified-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300 text-sm">Private keys generated in your browser</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-verified-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300 text-sm">All encryption/decryption client-side</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-verified-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300 text-sm">Password never stored or transmitted</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-verified-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300 text-sm">No analytics, tracking, or telemetry</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-400 mb-4">Threat Coverage</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-classical-400 text-sm font-medium w-32">Classical attacks</span>
                  <span className="text-gray-300 text-sm">X25519 ECDH</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pqc-400 text-sm font-medium w-32">Quantum attacks</span>
                  <span className="text-gray-300 text-sm">Kyber ML-KEM-768</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-nist-400 text-sm font-medium w-32">Data tampering</span>
                  <span className="text-gray-300 text-sm">Poly1305 authentication</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-verified-400 text-sm font-medium w-32">Password brute force</span>
                  <span className="text-gray-300 text-sm">600K PBKDF2 iterations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="relative py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join the Waitlist</h2>
          <p className="text-gray-400 mb-8">
            Be the first to know when Omnituum launches production-grade post-quantum cryptographic tooling.
          </p>

          {submitted ? (
            <div className="bg-verified-900/20 border border-verified-700/30 rounded-xl p-8">
              <svg className="w-16 h-16 text-verified-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-white mb-2">You're on the list!</h3>
              <p className="text-gray-400">We'll notify you when production tools are ready.</p>
            </div>
          ) : (
            <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 bg-navy-950/50 border border-gray-800/50 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-pqc-500/50 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-classical-600 to-pqc-600 hover:from-classical-500 hover:to-pqc-500 rounded-lg font-medium transition-colors whitespace-nowrap"
              >
                Join Waitlist
              </button>
            </form>
          )}

          <p className="text-gray-600 text-xs mt-4">
            No spam. Only major announcements.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-gray-800/30 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <a href="https://omnituum.com" target="_blank" rel="noopener noreferrer">
              <img
                src="/omnituum-text-logo.png"
                alt="Omnituum"
                className="h-12 w-auto"
              />
            </a>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="text-classical-500">X25519</span>
              <span className="text-gray-700">+</span>
              <span className="text-pqc-500">Kyber ML-KEM-768</span>
              <span className="text-gray-700">+</span>
              <span className="text-verified-500">XSalsa20-Poly1305</span>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800/20 text-center space-y-3">
            <p className="text-gray-600 text-xs max-w-xl mx-auto">
              Omnituum provides cryptographic software components implementing NIST-standardized algorithms. It is not itself FIPS-certified.
            </p>
            <p className="text-gray-500 text-sm">
              Security that endures. Performance that feels invisible.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
