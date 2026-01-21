import { useState, useEffect, useCallback } from 'react';
import { OmnituumShell } from './components/OmnituumShell';
import { VaultPanel } from './components/VaultPanel';
import { MessageEncryptor } from './components/MessageEncryptor';
import { MessageDecryptor } from './components/MessageDecryptor';
import { LandingPage } from './components/LandingPage';
import { isKyberAvailable, type HybridIdentity, type HybridEnvelope } from '@omnituum/pqc-shared/crypto';

type AppView = 'landing' | 'studio';

function App() {
  const [view, setView] = useState<AppView>(() => {
    // Check URL hash for routing
    const hash = window.location.hash;
    if (hash === '#studio' || hash === '#demo') return 'studio';
    return 'landing';
  });
  const [identity, setIdentity] = useState<HybridIdentity | null>(null);
  const [currentEnvelope, setCurrentEnvelope] = useState<HybridEnvelope | null>(null);
  const [kyberStatus, setKyberStatus] = useState<'checking' | 'available' | 'unavailable'>('checking');

  useEffect(() => {
    isKyberAvailable().then((available) => {
      setKyberStatus(available ? 'available' : 'unavailable');
    });
  }, []);

  // Handle browser back/forward
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#studio' || hash === '#demo') {
        setView('studio');
      } else {
        setView('landing');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleIdentityChange = useCallback((newIdentity: HybridIdentity | null) => {
    setIdentity(newIdentity);
  }, []);

  const handleEnterStudio = useCallback(() => {
    window.location.hash = '#studio';
    setView('studio');
  }, []);

  const handleBackToLanding = useCallback(() => {
    window.location.hash = '';
    setView('landing');
  }, []);

  // Landing Page
  if (view === 'landing') {
    return <LandingPage onEnterStudio={handleEnterStudio} />;
  }

  // Studio View
  return (
    <OmnituumShell currentApp="demo" kyberStatus={kyberStatus} onBackToLanding={handleBackToLanding}>
      {/* Hero Section */}
      <section className="py-16 px-4 border-b border-gray-800/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 tracking-tight">
            <span className="text-white">Quantum-Resistant</span>
            <br />
            <span className="bg-gradient-to-r from-classical-400 via-pqc-400 to-nist-400 bg-clip-text text-transparent">
              Messaging
            </span>
          </h2>

          <p className="text-gray-400 text-lg mb-4 leading-relaxed max-w-2xl mx-auto">
            Hybrid encryption combining classical X25519 with post-quantum Kyber ML-KEM-768.
            Secure against both today's computers and tomorrow's quantum threats.
          </p>

          <p className="text-gray-500 text-sm mb-10">
            Security that endures. Performance that feels invisible.
          </p>

          {/* Algorithm Badges */}
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-classical-900/20 border border-classical-700/30 rounded-lg text-classical-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              X25519 ECDH
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-pqc-900/20 border border-pqc-700/30 rounded-lg text-pqc-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Kyber ML-KEM-768
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-verified-900/20 border border-verified-700/30 rounded-lg text-verified-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              XSalsa20-Poly1305
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Vault Column */}
          <div className="lg:col-span-1">
            <VaultPanel
              onIdentityChange={handleIdentityChange}
              currentIdentity={identity}
            />
          </div>

          {/* Encrypt/Decrypt Columns */}
          <div className="lg:col-span-2 space-y-6">
            <MessageEncryptor
              identity={identity}
              onEnvelopeCreated={setCurrentEnvelope}
            />
            <MessageDecryptor
              identity={identity}
              currentEnvelope={currentEnvelope}
            />
          </div>
        </div>

        {/* Messaging Pillars */}
        <section className="mt-16 grid md:grid-cols-5 gap-4">
          <div className="bg-navy-900/50 rounded-xl p-5 border border-gray-800/30 hover:border-classical-700/30 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-classical-900/30 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-classical-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold mb-2 text-white">Hybrid Resilience</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Built for a world where classical and quantum threats coexist.
            </p>
          </div>

          <div className="bg-navy-900/50 rounded-xl p-5 border border-gray-800/30 hover:border-pqc-700/30 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-pqc-900/30 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-pqc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold mb-2 text-white">Zero Assumptions</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Pure browser cryptography. No blockchain. No servers. No trust required.
            </p>
          </div>

          <div className="bg-navy-900/50 rounded-xl p-5 border border-gray-800/30 hover:border-nist-700/30 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-nist-900/30 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-nist-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold mb-2 text-white">Future-Locked</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Kyber ML-KEM-768 secured. X25519 compatible. Designed for today and tomorrow.
            </p>
          </div>

          <div className="bg-navy-900/50 rounded-xl p-5 border border-gray-800/30 hover:border-verified-700/30 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-verified-900/30 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-verified-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold mb-2 text-white">Open Standard</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              JSON envelope. Open formats. Portable to any messaging system.
            </p>
          </div>

          <div className="bg-navy-900/50 rounded-xl p-5 border border-gray-800/30 hover:border-gray-600/30 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-gray-800/50 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold mb-2 text-white">Local Sovereignty</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Identities and keys stay in your hands - not ours.
            </p>
          </div>
        </section>
      </section>
    </OmnituumShell>
  );
}

export default App;
