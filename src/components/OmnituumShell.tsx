import { useState, useEffect, type ReactNode, type FormEvent } from 'react';
import { DocsPanel } from './DocsPanel';

interface OmnituumShellProps {
  children: ReactNode;
  currentApp?: 'studio' | 'demo' | 'vault';
  kyberStatus?: 'checking' | 'available' | 'unavailable';
  onBackToLanding?: () => void;
}

interface NavItem {
  id: string;
  label: string;
  href: string;
  active?: boolean;
  external?: boolean;
}

export function OmnituumShell({ children, currentApp = 'studio', kyberStatus = 'available', onBackToLanding }: OmnituumShellProps) {
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  const [walkthroughStep, setWalkthroughStep] = useState(0);
  const [showDocs, setShowDocs] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  const handleWaitlistSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In production, this would submit to an API
    console.log('Waitlist signup from Studio:', { email: waitlistEmail });
    setWaitlistSubmitted(true);
  };

  // Check if first visit
  useEffect(() => {
    const hasSeenWalkthrough = localStorage.getItem('omnituum_walkthrough_seen');
    if (!hasSeenWalkthrough) {
      setShowWalkthrough(true);
    }
  }, []);

  const dismissWalkthrough = () => {
    localStorage.setItem('omnituum_walkthrough_seen', 'true');
    setShowWalkthrough(false);
  };

  const navItems: NavItem[] = [
    { id: 'studio', label: 'Studio', href: '/', active: currentApp === 'studio' || currentApp === 'demo' },
    { id: 'docs', label: 'Docs', href: '#docs' },
    { id: 'github', label: 'GitHub', href: 'https://github.com/omnituum', external: true },
  ];

  const walkthroughSteps = [
    {
      title: 'What is Hybrid Encryption?',
      content: `Omnituum combines two encryption schemes:

• **X25519** — The gold-standard elliptic curve used today
• **Kyber ML-KEM-768** — NIST-approved post-quantum algorithm

Together, they create defense-in-depth: even if one scheme is broken, your data stays protected.`,
      icon: (
        <svg className="w-8 h-8 text-pqc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: 'How the Vault Protects You',
      content: `Your identity vault uses enterprise-grade encryption:

• **PBKDF2-SHA256** with 600,000 iterations
• **AES-256-GCM** authenticated encryption
• Keys never leave your browser
• Exportable encrypted backups

Your password is never stored — only you can unlock your vault.`,
      icon: (
        <svg className="w-8 h-8 text-verified-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
    {
      title: 'What Happens on Device?',
      content: `**Everything.**

• Key generation happens in your browser
• Encryption/decryption happens locally
• No servers see your plaintext
• No blockchain required
• No wallet needed

Omnituum is pure cryptography — no intermediaries.`,
      icon: (
        <svg className="w-8 h-8 text-classical-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-950 via-[#080c14] to-navy-950 text-white">
      {/* Controlled Access Banner */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-amber-900/90 border-b border-amber-700/50 px-4 py-2">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 text-center">
          <svg className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <p className="text-amber-100 text-xs font-medium">
            <strong>Controlled Evaluation</strong>
            <span className="hidden sm:inline"> — Vetted partners and pilot participants only</span>
          </p>
        </div>
      </div>

      {/* Animated background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pqc-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-classical-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header - with top offset for fixed banner */}
      <header className="relative border-b border-gray-800/50 bg-navy-900/80 backdrop-blur-xl sticky top-9 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              {onBackToLanding && (
                <button
                  onClick={onBackToLanding}
                  className="p-2 -ml-2 mr-1 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
                  title="Back to Home"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-classical-500 via-pqc-500 to-nist-500 p-[2px] animate-glow-pqc">
                <div className="w-full h-full rounded-[10px] bg-navy-950 flex items-center justify-center">
                  <svg className="w-5 h-5 text-pqc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="2" fill="currentColor" />
                    <circle cx="12" cy="4" r="1.5" />
                    <circle cx="12" cy="20" r="1.5" />
                    <circle cx="4" cy="12" r="1.5" />
                    <circle cx="20" cy="12" r="1.5" />
                    <circle cx="6" cy="6" r="1" />
                    <circle cx="18" cy="6" r="1" />
                    <circle cx="6" cy="18" r="1" />
                    <circle cx="18" cy="18" r="1" />
                    <path d="M12 4v16M4 12h16M6 6l12 12M18 6L6 18" strokeOpacity="0.3" />
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-semibold tracking-tight">
                  <span className="text-white">Omnituum</span>
                  <span className="text-pqc-400 ml-1.5">PQC Studio</span>
                </h1>
                <p className="text-[10px] text-gray-500 tracking-widest uppercase">Post-Quantum Cryptography Platform</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                item.id === 'docs' ? (
                  <button
                    key={item.id}
                    onClick={() => setShowDocs(true)}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all text-gray-400 hover:text-white hover:bg-gray-800/50"
                  >
                    {item.label}
                  </button>
                ) : (
                  <a
                    key={item.id}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      item.active
                        ? 'bg-pqc-900/30 text-pqc-300 border border-pqc-700/50'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }`}
                  >
                    {item.label}
                    {item.external && (
                      <svg className="w-3 h-3 ml-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    )}
                  </a>
                )
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Demo Mode Badge */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-900/20 border border-amber-700/30 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Demo
              </div>

              {/* NIST Badge */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-nist-900/20 border border-nist-700/30 text-nist-300 text-xs font-medium">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                NIST PQC
              </div>

              {/* Kyber Status */}
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
                kyberStatus === 'available'
                  ? 'bg-pqc-900/30 text-pqc-300 border border-pqc-700/50'
                  : kyberStatus === 'unavailable'
                  ? 'bg-red-900/30 text-red-400 border border-red-800'
                  : 'bg-gray-800 text-gray-400 border border-gray-700'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${
                  kyberStatus === 'available' ? 'bg-pqc-400 animate-pulse'
                  : kyberStatus === 'unavailable' ? 'bg-red-400'
                  : 'bg-gray-400 animate-pulse'
                }`} />
                {kyberStatus === 'available' && 'ML-KEM-768'}
                {kyberStatus === 'unavailable' && 'Unavailable'}
                {kyberStatus === 'checking' && 'Loading...'}
              </div>

              {/* Help button */}
              <button
                onClick={() => setShowWalkthrough(true)}
                className="p-2 text-gray-500 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
                title="Help"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">
        {children}
      </main>

      {/* Waitlist CTA Section */}
      <section className="relative border-t border-gray-800/30 mt-16 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-pqc-900/20 to-classical-900/20 rounded-2xl p-8 border border-pqc-700/20 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-pqc-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative">
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pqc-900/50 to-classical-900/50 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-pqc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Join the Waitlist</h3>
                <p className="text-gray-400 text-sm max-w-md mx-auto">
                  Get early access to production Omnituum with enterprise features,
                  team collaboration, and server-side key escrow.
                </p>
              </div>

              {waitlistSubmitted ? (
                <div className="flex items-center justify-center gap-3 py-4">
                  <div className="w-10 h-10 rounded-full bg-verified-900/30 flex items-center justify-center">
                    <svg className="w-5 h-5 text-verified-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-verified-300 font-medium">You're on the list!</p>
                    <p className="text-gray-500 text-xs">We'll be in touch soon.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    required
                    value={waitlistEmail}
                    onChange={(e) => setWaitlistEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="flex-1 px-4 py-3 bg-navy-950/80 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-pqc-500 focus:ring-1 focus:ring-pqc-500 transition-colors text-sm"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-pqc-600 to-classical-600 hover:from-pqc-500 hover:to-classical-500 text-white font-semibold rounded-lg transition-all text-sm whitespace-nowrap"
                  >
                    Join Waitlist
                  </button>
                </form>
              )}

              <p className="text-center text-xs text-gray-600 mt-4">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-gray-800/30 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="text-classical-500">X25519</span>
              <span className="text-gray-700">+</span>
              <span className="text-pqc-500">Kyber ML-KEM-768</span>
              <span className="text-gray-700">+</span>
              <span className="text-verified-500">XSalsa20-Poly1305</span>
            </div>
            <p className="text-gray-600 text-sm">
              <span className="text-white font-medium">Omnituum PQC Studio</span>
              <span className="mx-2 text-gray-700">|</span>
              Post-Quantum Cryptography Platform
            </p>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-800/20 text-center">
            <p className="text-[10px] text-gray-600 leading-relaxed max-w-xl mx-auto">
              <span className="text-amber-500/80 font-semibold">DEMO ENVIRONMENT</span> — This is a showcase application.
              All identities and encrypted messages are stored locally in your browser.
              Clearing browser data will permanently delete your vault unless exported.
              Not intended for production messaging.
            </p>
          </div>
        </div>
      </footer>

      {/* Walkthrough Modal */}
      {showWalkthrough && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-navy-900 rounded-2xl border border-gray-800/50 w-full max-w-lg overflow-hidden animate-fadeIn">
            {/* Progress */}
            <div className="flex gap-1 p-4">
              {walkthroughSteps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    i <= walkthroughStep ? 'bg-pqc-500' : 'bg-gray-700'
                  }`}
                />
              ))}
            </div>

            {/* Content */}
            <div className="px-6 pb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-classical-900/50 to-pqc-900/50 flex items-center justify-center mb-6">
                {walkthroughSteps[walkthroughStep].icon}
              </div>
              <h2 className="text-xl font-semibold text-white mb-4">
                {walkthroughSteps[walkthroughStep].title}
              </h2>
              <div className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">
                {walkthroughSteps[walkthroughStep].content.split('**').map((part, i) =>
                  i % 2 === 1 ? (
                    <span key={i} className="text-white font-medium">{part}</span>
                  ) : (
                    <span key={i}>{part}</span>
                  )
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 p-6 border-t border-gray-800/30">
              <button
                onClick={dismissWalkthrough}
                className="flex-1 py-3 px-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg text-sm font-medium text-gray-300 transition-colors"
              >
                Skip
              </button>
              <button
                onClick={() => {
                  if (walkthroughStep < walkthroughSteps.length - 1) {
                    setWalkthroughStep(walkthroughStep + 1);
                  } else {
                    dismissWalkthrough();
                  }
                }}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-classical-600 to-pqc-600 hover:from-classical-500 hover:to-pqc-500 rounded-lg text-sm font-medium text-white transition-colors"
              >
                {walkthroughStep < walkthroughSteps.length - 1 ? 'Next' : 'Get Started'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Documentation Panel */}
      <DocsPanel isOpen={showDocs} onClose={() => setShowDocs(false)} />
    </div>
  );
}
