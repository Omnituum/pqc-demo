import { useState } from 'react';

type DocSection = 'overview' | 'pqc' | 'hybrid' | 'vault' | 'threat' | 'faq' | 'waitlist';

interface DocsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DocsPanel({ isOpen, onClose }: DocsPanelProps) {
  const [activeSection, setActiveSection] = useState<DocSection>('overview');

  if (!isOpen) return null;

  const sections: { id: DocSection; title: string; icon: JSX.Element }[] = [
    {
      id: 'overview',
      title: 'Overview',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
    },
    {
      id: 'pqc',
      title: 'PQC Basics',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />,
    },
    {
      id: 'hybrid',
      title: 'Hybrid Crypto',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />,
    },
    {
      id: 'vault',
      title: 'Vault Format',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />,
    },
    {
      id: 'threat',
      title: 'Threat Model',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
    },
    {
      id: 'faq',
      title: 'FAQ',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    },
    {
      id: 'waitlist',
      title: 'Join Waitlist',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-navy-900 rounded-2xl border border-gray-800/50 w-full max-w-4xl max-h-[85vh] overflow-hidden animate-fadeIn flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-classical-900/50 to-pqc-900/50 flex items-center justify-center">
              <svg className="w-5 h-5 text-pqc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Documentation</h2>
              <p className="text-xs text-gray-500">Omnituum PQC Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Demo Badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-900/20 border border-amber-700/30 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Demo
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <nav className="w-48 border-r border-gray-800/30 p-3 overflow-y-auto">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors mb-1 ${
                  activeSection === section.id
                    ? 'bg-pqc-900/30 text-pqc-300 border border-pqc-700/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {section.icon}
                </svg>
                {section.title}
              </button>
            ))}
          </nav>

          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeSection === 'overview' && <OverviewContent />}
            {activeSection === 'pqc' && <PQCContent />}
            {activeSection === 'hybrid' && <HybridContent />}
            {activeSection === 'vault' && <VaultContent />}
            {activeSection === 'threat' && <ThreatContent />}
            {activeSection === 'faq' && <FAQContent />}
            {activeSection === 'waitlist' && <WaitlistContent />}
          </div>
        </div>
      </div>
    </div>
  );
}

function DemoNotice() {
  return (
    <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-amber-900/30 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <h3 className="text-amber-300 font-semibold text-sm mb-1">Demo Environment</h3>
          <p className="text-amber-200/70 text-xs leading-relaxed">
            This is a <span className="text-amber-200 font-medium">demonstration application</span>.
            All identities, keys, and encrypted messages are stored <span className="text-amber-200 font-medium">only in your browser's localStorage</span>.
          </p>
          <div className="mt-3 p-2 bg-amber-950/50 rounded border border-amber-800/30">
            <p className="text-amber-200/80 text-xs font-medium mb-1">Your data will be permanently lost if you:</p>
            <ul className="text-amber-200/60 text-xs space-y-0.5 ml-3">
              <li>• Clear browsing data / cookies</li>
              <li>• Delete localStorage</li>
              <li>• Use private/incognito mode</li>
              <li>• Uninstall/reinstall browser</li>
            </ul>
          </div>
          <p className="text-amber-300 text-xs mt-3 font-medium">
            Export your vault to keep your keys safe.
          </p>
        </div>
      </div>
    </div>
  );
}

function OverviewContent() {
  return (
    <div className="prose prose-invert prose-sm max-w-none">
      <h1 className="text-2xl font-bold text-white mb-4">Omnituum</h1>
      <p className="text-gray-400 text-lg mb-6">Post-Quantum Security Platform</p>

      <DemoNotice />

      <p className="text-gray-300">
        Omnituum is a browser-native cryptographic platform implementing NIST-approved post-quantum
        algorithms alongside classical cryptography. No servers. No blockchain. No trust required.
      </p>

      <h2 className="text-lg font-semibold text-white mt-8 mb-4">Products</h2>

      <div className="grid gap-4">
        <div className="bg-navy-950/50 rounded-lg p-4 border border-gray-800/30">
          <h3 className="text-pqc-400 font-semibold mb-2">PQC Studio</h3>
          <p className="text-sm text-gray-400 mb-3">
            Interactive demonstration of hybrid encryption. Generate identities, encrypt messages,
            and verify quantum-resistant security — all in your browser.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-classical-900/30 text-classical-400 text-xs rounded">X25519</span>
            <span className="px-2 py-1 bg-pqc-900/30 text-pqc-400 text-xs rounded">Kyber ML-KEM-768</span>
            <span className="px-2 py-1 bg-verified-900/30 text-verified-400 text-xs rounded">XSalsa20-Poly1305</span>
          </div>
        </div>

        <div className="bg-navy-950/50 rounded-lg p-4 border border-gray-800/30">
          <h3 className="text-verified-400 font-semibold mb-2">PQC Vault</h3>
          <p className="text-sm text-gray-400 mb-3">
            Sovereign key management for the post-quantum era. Store, rotate, and export your
            cryptographic identities with enterprise-grade protection.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded">PBKDF2-SHA256</span>
            <span className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded">AES-256-GCM</span>
            <span className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded">600K iterations</span>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-semibold text-white mt-8 mb-4">Security Model</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-800">
            <th className="text-left py-2 text-gray-400">Threat</th>
            <th className="text-left py-2 text-gray-400">Protection</th>
          </tr>
        </thead>
        <tbody className="text-gray-300">
          <tr className="border-b border-gray-800/50">
            <td className="py-2">Classical attacks</td>
            <td className="py-2 text-classical-400">X25519 ECDH</td>
          </tr>
          <tr className="border-b border-gray-800/50">
            <td className="py-2">Quantum attacks</td>
            <td className="py-2 text-pqc-400">Kyber ML-KEM-768</td>
          </tr>
          <tr className="border-b border-gray-800/50">
            <td className="py-2">Harvest-now-decrypt-later</td>
            <td className="py-2 text-nist-400">Hybrid encryption</td>
          </tr>
          <tr className="border-b border-gray-800/50">
            <td className="py-2">Password brute force</td>
            <td className="py-2 text-verified-400">PBKDF2 600K iterations</td>
          </tr>
          <tr>
            <td className="py-2">Data tampering</td>
            <td className="py-2 text-verified-400">GCM authentication</td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-lg font-semibold text-white mt-8 mb-4">Standards Compliance</h2>
      <ul className="text-sm text-gray-300 space-y-1">
        <li><span className="text-nist-400">NIST FIPS 203</span> — ML-KEM (Kyber) for key encapsulation</li>
        <li><span className="text-classical-400">RFC 7748</span> — X25519 for ECDH</li>
        <li><span className="text-verified-400">RFC 8439</span> — ChaCha20-Poly1305 (XSalsa20 variant)</li>
        <li><span className="text-gray-400">NIST SP 800-132</span> — PBKDF2 key derivation</li>
        <li><span className="text-gray-400">NIST SP 800-38D</span> — AES-GCM authenticated encryption</li>
      </ul>
    </div>
  );
}

function PQCContent() {
  return (
    <div className="prose prose-invert prose-sm max-w-none">
      <h1 className="text-2xl font-bold text-white mb-4">Post-Quantum Cryptography</h1>

      <h2 className="text-lg font-semibold text-white mt-6 mb-3">The Quantum Threat</h2>
      <p className="text-gray-300 mb-4">
        Quantum computers pose an existential threat to current cryptographic systems.
        Shor's algorithm can break RSA, ECDSA, and ECDH in polynomial time:
      </p>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-red-900/20 border border-red-800/30 rounded-lg p-3">
          <span className="text-red-400 font-medium">TLS certificates</span>
          <p className="text-xs text-gray-500 mt-1">Broken by quantum</p>
        </div>
        <div className="bg-red-900/20 border border-red-800/30 rounded-lg p-3">
          <span className="text-red-400 font-medium">Bitcoin signatures</span>
          <p className="text-xs text-gray-500 mt-1">Broken by quantum</p>
        </div>
        <div className="bg-red-900/20 border border-red-800/30 rounded-lg p-3">
          <span className="text-red-400 font-medium">SSH keys</span>
          <p className="text-xs text-gray-500 mt-1">Broken by quantum</p>
        </div>
        <div className="bg-amber-900/20 border border-amber-800/30 rounded-lg p-3">
          <span className="text-amber-400 font-medium">Signal Protocol</span>
          <p className="text-xs text-gray-500 mt-1">Partially broken</p>
        </div>
      </div>

      <div className="bg-amber-900/20 border border-amber-800/30 rounded-lg p-4 mb-6">
        <h3 className="text-amber-400 font-semibold mb-2">Harvest Now, Decrypt Later</h3>
        <p className="text-sm text-gray-300">
          Adversaries are collecting encrypted traffic today to decrypt when quantum computers
          become available. The time to prepare is <span className="text-white font-semibold">now</span>.
        </p>
      </div>

      <h2 className="text-lg font-semibold text-white mt-8 mb-3">NIST Post-Quantum Standards</h2>

      <div className="space-y-4">
        <div className="bg-pqc-900/20 border border-pqc-700/30 rounded-lg p-4">
          <h3 className="text-pqc-400 font-semibold">FIPS 203: ML-KEM (Kyber)</h3>
          <p className="text-xs text-gray-400 mt-1">Module-Lattice Key Encapsulation Mechanism</p>
          <ul className="text-sm text-gray-300 mt-3 space-y-1">
            <li><span className="text-gray-500">Type:</span> Key encapsulation</li>
            <li><span className="text-gray-500">Security:</span> Lattice problems (Module-LWE)</li>
            <li><span className="text-gray-500">Omnituum uses:</span> <span className="text-pqc-400">ML-KEM-768</span></li>
          </ul>
        </div>

        <div className="bg-nist-900/20 border border-nist-700/30 rounded-lg p-4">
          <h3 className="text-nist-400 font-semibold">FIPS 204: ML-DSA (Dilithium)</h3>
          <p className="text-xs text-gray-400 mt-1">Module-Lattice Digital Signature Algorithm</p>
          <ul className="text-sm text-gray-300 mt-3 space-y-1">
            <li><span className="text-gray-500">Type:</span> Digital signatures</li>
            <li><span className="text-gray-500">Security:</span> Lattice problems (Module-LWE)</li>
            <li><span className="text-gray-500">Status:</span> <span className="text-amber-400">Planned</span></li>
          </ul>
        </div>
      </div>

      <h2 className="text-lg font-semibold text-white mt-8 mb-3">Key Sizes Comparison</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-800">
            <th className="text-left py-2 text-gray-400">Algorithm</th>
            <th className="text-left py-2 text-gray-400">Public Key</th>
            <th className="text-left py-2 text-gray-400">Private Key</th>
            <th className="text-left py-2 text-gray-400">Security</th>
          </tr>
        </thead>
        <tbody className="text-gray-300">
          <tr className="border-b border-gray-800/50">
            <td className="py-2">RSA-2048</td>
            <td className="py-2">256 bytes</td>
            <td className="py-2">1,190 bytes</td>
            <td className="py-2 text-classical-400">Classical</td>
          </tr>
          <tr className="border-b border-gray-800/50">
            <td className="py-2 text-classical-400">X25519</td>
            <td className="py-2">32 bytes</td>
            <td className="py-2">32 bytes</td>
            <td className="py-2 text-classical-400">Classical</td>
          </tr>
          <tr>
            <td className="py-2 text-pqc-400">Kyber-768</td>
            <td className="py-2">1,184 bytes</td>
            <td className="py-2">2,400 bytes</td>
            <td className="py-2 text-pqc-400">Post-Quantum</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function HybridContent() {
  return (
    <div className="prose prose-invert prose-sm max-w-none">
      <h1 className="text-2xl font-bold text-white mb-4">Hybrid Cryptography</h1>

      <p className="text-gray-300 mb-6">
        Omnituum implements hybrid encryption combining classical X25519 with post-quantum
        Kyber ML-KEM-768. This provides security against both current and future threats.
      </p>

      <h2 className="text-lg font-semibold text-white mt-6 mb-3">Why Hybrid?</h2>

      <div className="bg-navy-950/50 rounded-lg p-4 border border-gray-800/30 mb-6">
        <code className="text-pqc-400">Hybrid Security = Classical Security AND PQC Security</code>
        <ul className="text-sm text-gray-300 mt-4 space-y-2">
          <li><span className="text-classical-400">If classical is broken:</span> PQC protects you</li>
          <li><span className="text-pqc-400">If PQC is broken:</span> Classical protects you</li>
          <li><span className="text-red-400">If both are broken:</span> You have bigger problems</li>
        </ul>
      </div>

      <h2 className="text-lg font-semibold text-white mt-8 mb-3">Key Generation</h2>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-classical-900/20 border border-classical-700/30 rounded-lg p-4">
          <h3 className="text-classical-400 font-semibold mb-2">X25519 Keypair</h3>
          <ul className="text-xs text-gray-300 space-y-1">
            <li>Public Key: 32 bytes (hex)</li>
            <li>Secret Key: 32 bytes (hex)</li>
            <li>Security: ~128-bit classical</li>
          </ul>
        </div>
        <div className="bg-pqc-900/20 border border-pqc-700/30 rounded-lg p-4">
          <h3 className="text-pqc-400 font-semibold mb-2">Kyber ML-KEM-768</h3>
          <ul className="text-xs text-gray-300 space-y-1">
            <li>Public Key: 1,184 bytes (base64)</li>
            <li>Secret Key: 2,400 bytes (base64)</li>
            <li>Security: ~192-bit post-quantum</li>
          </ul>
        </div>
      </div>

      <h2 className="text-lg font-semibold text-white mt-8 mb-3">Encryption Flow</h2>

      <div className="bg-navy-950/50 rounded-lg p-4 border border-gray-800/30 space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-classical-900/50 text-classical-400 text-xs flex items-center justify-center">1</span>
          <div>
            <p className="text-sm text-white">X25519 Key Exchange</p>
            <p className="text-xs text-gray-500">Ephemeral ECDH with recipient's public key</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-pqc-900/50 text-pqc-400 text-xs flex items-center justify-center">2</span>
          <div>
            <p className="text-sm text-white">Kyber Encapsulation</p>
            <p className="text-xs text-gray-500">KEM with recipient's Kyber public key</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-nist-900/50 text-nist-400 text-xs flex items-center justify-center">3</span>
          <div>
            <p className="text-sm text-white">HKDF-SHA256 Key Derivation</p>
            <p className="text-xs text-gray-500">Combine both shared secrets</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-verified-900/50 text-verified-400 text-xs flex items-center justify-center">4</span>
          <div>
            <p className="text-sm text-white">XSalsa20-Poly1305 Encryption</p>
            <p className="text-xs text-gray-500">Authenticated encryption of message</p>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-semibold text-white mt-8 mb-3">Security Properties</h2>

      <div className="grid md:grid-cols-2 gap-3">
        <div className="bg-navy-950/50 rounded-lg p-3 border border-gray-800/30">
          <h4 className="text-verified-400 font-medium text-sm">Confidentiality</h4>
          <p className="text-xs text-gray-400 mt-1">Message content protected by XSalsa20 with hybrid key</p>
        </div>
        <div className="bg-navy-950/50 rounded-lg p-3 border border-gray-800/30">
          <h4 className="text-verified-400 font-medium text-sm">Integrity</h4>
          <p className="text-xs text-gray-400 mt-1">Poly1305 authenticator detects tampering</p>
        </div>
        <div className="bg-navy-950/50 rounded-lg p-3 border border-gray-800/30">
          <h4 className="text-classical-400 font-medium text-sm">Forward Secrecy</h4>
          <p className="text-xs text-gray-400 mt-1">Ephemeral keys used for each message</p>
        </div>
        <div className="bg-navy-950/50 rounded-lg p-3 border border-gray-800/30">
          <h4 className="text-pqc-400 font-medium text-sm">Quantum Resistance</h4>
          <p className="text-xs text-gray-400 mt-1">Kyber provides security against quantum adversaries</p>
        </div>
      </div>
    </div>
  );
}

function VaultContent() {
  return (
    <div className="prose prose-invert prose-sm max-w-none">
      <h1 className="text-2xl font-bold text-white mb-4">Vault File Format</h1>

      <DemoNotice />

      <p className="text-gray-300 mb-6">
        The Omnituum Vault stores encrypted identity data using a password-derived key.
        The format is designed for portability, security, and future extensibility.
      </p>

      <h2 className="text-lg font-semibold text-white mt-6 mb-3">Encrypted Vault File (.enc)</h2>

      <div className="bg-navy-950/50 rounded-lg p-4 border border-gray-800/30 mb-6">
        <pre className="text-xs text-gray-300 overflow-x-auto">{`{
  "version": "omnituum.vault.enc.v1",
  "kdf": "PBKDF2-SHA256",
  "iterations": 600000,
  "salt": "<base64, 32 bytes>",
  "iv": "<base64, 12 bytes>",
  "ciphertext": "<base64>",
  "algorithm": "AES-256-GCM"
}`}</pre>
      </div>

      <h2 className="text-lg font-semibold text-white mt-8 mb-3">Key Derivation</h2>

      <div className="bg-navy-950/50 rounded-lg p-4 border border-gray-800/30 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-gray-400 text-sm">password</span>
          <span className="text-gray-600">→</span>
          <span className="text-nist-400 text-sm">PBKDF2-SHA256</span>
          <span className="text-gray-600">→</span>
          <span className="text-verified-400 text-sm">256-bit AES key</span>
        </div>
        <ul className="text-xs text-gray-400 space-y-1">
          <li>Salt: 32 random bytes</li>
          <li>Iterations: 600,000</li>
          <li>Output: 32 bytes (256 bits)</li>
        </ul>
      </div>

      <div className="bg-nist-900/20 border border-nist-700/30 rounded-lg p-4 mb-6">
        <h4 className="text-nist-400 font-semibold text-sm mb-2">Why 600,000 iterations?</h4>
        <ul className="text-xs text-gray-300 space-y-1">
          <li>OWASP 2023 recommendation for PBKDF2-SHA256</li>
          <li>~500ms derivation time on modern hardware</li>
          <li>Significantly slows brute-force attacks</li>
        </ul>
      </div>

      <h2 className="text-lg font-semibold text-white mt-8 mb-3">Identity Record</h2>

      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-gray-800">
            <th className="text-left py-2 text-gray-400">Field</th>
            <th className="text-left py-2 text-gray-400">Size</th>
            <th className="text-left py-2 text-gray-400">Encoding</th>
          </tr>
        </thead>
        <tbody className="text-gray-300">
          <tr className="border-b border-gray-800/50">
            <td className="py-2 text-classical-400">X25519 Public</td>
            <td className="py-2">32 bytes</td>
            <td className="py-2">Hex (0x prefix)</td>
          </tr>
          <tr className="border-b border-gray-800/50">
            <td className="py-2 text-classical-400">X25519 Secret</td>
            <td className="py-2">32 bytes</td>
            <td className="py-2">Hex (0x prefix)</td>
          </tr>
          <tr className="border-b border-gray-800/50">
            <td className="py-2 text-pqc-400">Kyber Public</td>
            <td className="py-2">1,184 bytes</td>
            <td className="py-2">Base64</td>
          </tr>
          <tr>
            <td className="py-2 text-pqc-400">Kyber Secret</td>
            <td className="py-2">2,400 bytes</td>
            <td className="py-2">Base64</td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-lg font-semibold text-white mt-8 mb-3">Security Considerations</h2>

      <div className="grid gap-3">
        <div className="bg-verified-900/20 border border-verified-700/30 rounded-lg p-3">
          <h4 className="text-verified-400 font-medium text-sm">Encrypted at Rest</h4>
          <p className="text-xs text-gray-400 mt-1">All secret keys encrypted with AES-256-GCM. Password never stored.</p>
        </div>
        <div className="bg-verified-900/20 border border-verified-700/30 rounded-lg p-3">
          <h4 className="text-verified-400 font-medium text-sm">Memory Security</h4>
          <p className="text-xs text-gray-400 mt-1">Session keys in JavaScript memory only. Cleared on lock/close.</p>
        </div>
        <div className="bg-verified-900/20 border border-verified-700/30 rounded-lg p-3">
          <h4 className="text-verified-400 font-medium text-sm">Export Security</h4>
          <p className="text-xs text-gray-400 mt-1">Exports encrypted with current password. Portable across devices.</p>
        </div>
      </div>
    </div>
  );
}

function ThreatContent() {
  return (
    <div className="prose prose-invert prose-sm max-w-none">
      <h1 className="text-2xl font-bold text-white mb-4">Threat Model</h1>

      <p className="text-gray-300 mb-6">
        What Omnituum protects against, what it doesn't, and the security assumptions underlying the system.
      </p>

      <h2 className="text-lg font-semibold text-white mt-6 mb-3">Threat Actors</h2>

      <div className="space-y-3 mb-6">
        <div className="bg-navy-950/50 rounded-lg p-3 border border-gray-800/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-medium text-sm">State-Level Adversaries</span>
            <span className="text-xs px-2 py-0.5 bg-pqc-900/30 text-pqc-400 rounded">Mitigated</span>
          </div>
          <p className="text-xs text-gray-400">Unlimited compute, possible quantum access → Hybrid encryption</p>
        </div>
        <div className="bg-navy-950/50 rounded-lg p-3 border border-gray-800/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-medium text-sm">Sophisticated Attackers</span>
            <span className="text-xs px-2 py-0.5 bg-pqc-900/30 text-pqc-400 rounded">Mitigated</span>
          </div>
          <p className="text-xs text-gray-400">APTs, 0-days → Defense-in-depth, minimal attack surface</p>
        </div>
        <div className="bg-navy-950/50 rounded-lg p-3 border border-gray-800/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-medium text-sm">Opportunistic Attackers</span>
            <span className="text-xs px-2 py-0.5 bg-verified-900/30 text-verified-400 rounded">Mitigated</span>
          </div>
          <p className="text-xs text-gray-400">Credential stuffing → PBKDF2 600K iterations</p>
        </div>
      </div>

      <h2 className="text-lg font-semibold text-white mt-8 mb-3">What We Protect</h2>

      <div className="grid md:grid-cols-2 gap-3 mb-6">
        <div className="flex items-center gap-2 text-sm">
          <svg className="w-4 h-4 text-verified-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-gray-300">Private keys never transmitted</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <svg className="w-4 h-4 text-verified-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-gray-300">End-to-end encrypted messages</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <svg className="w-4 h-4 text-verified-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-gray-300">Password-derived encryption</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <svg className="w-4 h-4 text-verified-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-gray-300">No analytics or telemetry</span>
        </div>
      </div>

      <h2 className="text-lg font-semibold text-white mt-8 mb-3">What We Don't Protect</h2>

      <div className="space-y-3 mb-6">
        <div className="bg-red-900/10 border border-red-800/30 rounded-lg p-3">
          <h4 className="text-red-400 font-medium text-sm">Endpoint Compromise</h4>
          <p className="text-xs text-gray-400 mt-1">If attackers have code execution on your device, memory can be read.</p>
          <p className="text-xs text-amber-400 mt-2">Your responsibility: Keep your device secure</p>
        </div>
        <div className="bg-red-900/10 border border-red-800/30 rounded-lg p-3">
          <h4 className="text-red-400 font-medium text-sm">Weak Passwords</h4>
          <p className="text-xs text-gray-400 mt-1">600K iterations won't save "password123" from dictionary attacks.</p>
          <p className="text-xs text-amber-400 mt-2">Your responsibility: Use strong, unique passwords</p>
        </div>
        <div className="bg-red-900/10 border border-red-800/30 rounded-lg p-3">
          <h4 className="text-red-400 font-medium text-sm">Social Engineering</h4>
          <p className="text-xs text-gray-400 mt-1">If you're tricked into revealing your password or installing malware.</p>
          <p className="text-xs text-amber-400 mt-2">Your responsibility: Stay vigilant</p>
        </div>
      </div>

      <h2 className="text-lg font-semibold text-white mt-8 mb-3">Security Guarantees</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-verified-400 font-medium text-sm mb-2">We Guarantee:</h4>
          <ul className="text-xs text-gray-300 space-y-1">
            <li>Private keys encrypted at rest</li>
            <li>Password never stored or transmitted</li>
            <li>Hybrid encryption (classical + PQC)</li>
            <li>All crypto operations client-side</li>
            <li>Authenticated encryption</li>
          </ul>
        </div>
        <div>
          <h4 className="text-red-400 font-medium text-sm mb-2">We Don't Guarantee:</h4>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>Security against device compromise</li>
            <li>Protection of weak passwords</li>
            <li>Anonymity or metadata privacy</li>
            <li>Security of browser environment</li>
            <li>Availability (localStorage can be cleared)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function FAQContent() {
  const faqs = [
    {
      category: 'Demo Environment',
      questions: [
        {
          q: 'Is this a production application?',
          a: 'No. This is a demonstration environment. All data is stored in your browser\'s localStorage and will be lost if you clear browsing data. Export your vault to preserve your identities.',
        },
        {
          q: 'Will my data survive if I clear my browser history?',
          a: 'No. Clearing cookies, browsing data, or localStorage will permanently delete your vault and all identities. Always export your vault before clearing browser data.',
        },
        {
          q: 'Can I use this for real encrypted communication?',
          a: 'The cryptography is real and secure, but this demo lacks persistence guarantees. For production use, wait for official releases with proper storage backends. Use this for learning, testing, and experimentation.',
        },
      ],
    },
    {
      category: 'General',
      questions: [
        {
          q: 'What is Omnituum?',
          a: 'A browser-native post-quantum cryptography platform. It provides tools for hybrid encryption (classical + quantum-resistant) and secure identity management, all running entirely in your browser.',
        },
        {
          q: 'Do I need to create an account?',
          a: 'No. Omnituum has no accounts, no servers, and no registration. Everything runs locally.',
        },
      ],
    },
    {
      category: 'Security',
      questions: [
        {
          q: 'Where are my keys stored?',
          a: "In your browser's localStorage, encrypted with AES-256-GCM using your password.",
        },
        {
          q: 'Can you see my password or keys?',
          a: 'No. There is no server. Your password never leaves your device. Your keys are encrypted locally.',
        },
        {
          q: 'What if I forget my password?',
          a: "There is no recovery. We cannot help you. This is a feature, not a bug — it means no one else can recover your keys either.",
        },
      ],
    },
    {
      category: 'Vault',
      questions: [
        {
          q: 'Can I have multiple identities?',
          a: 'Yes. The Vault supports unlimited identities. Each has separate keypairs.',
        },
        {
          q: 'How do I backup my Vault?',
          a: 'Export → Downloads an encrypted .enc file. Import this file on any device with your password.',
        },
        {
          q: 'Is the Vault synced across devices?',
          a: 'No. Each device has its own vault. Use export/import to move identities between devices.',
        },
      ],
    },
    {
      category: 'Technical',
      questions: [
        {
          q: 'Does Omnituum work offline?',
          a: 'Yes, after the initial page load. All crypto operations are local.',
        },
        {
          q: 'Why XSalsa20-Poly1305 instead of AES-GCM?',
          a: 'Larger nonce (24 bytes vs 12) reduces collision risk. Pure JavaScript implementation works everywhere. Equivalent security to AES-256-GCM.',
        },
      ],
    },
  ];

  return (
    <div className="prose prose-invert prose-sm max-w-none">
      <h1 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h1>

      <DemoNotice />

      {faqs.map((category) => (
        <div key={category.category} className="mb-8">
          <h2 className="text-lg font-semibold text-pqc-400 mb-4">{category.category}</h2>
          <div className="space-y-4">
            {category.questions.map((faq, i) => (
              <div key={i} className="bg-navy-950/50 rounded-lg p-4 border border-gray-800/30">
                <h3 className="text-white font-medium text-sm mb-2">{faq.q}</h3>
                <p className="text-gray-400 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="bg-amber-900/20 border border-amber-800/30 rounded-lg p-4 mt-8">
        <h3 className="text-amber-400 font-semibold text-sm mb-2">Troubleshooting</h3>
        <div className="space-y-3 text-sm">
          <div>
            <p className="text-white">Kyber says "unavailable"</p>
            <p className="text-gray-400 text-xs mt-1">
              The Kyber WASM module failed to load. Try disabling extensions or updating your browser.
            </p>
          </div>
          <div>
            <p className="text-white">My vault won't unlock</p>
            <p className="text-gray-400 text-xs mt-1">
              Check that you're using the correct password and localStorage isn't disabled.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function WaitlistContent() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would submit to an API
    console.log('Waitlist signup:', { email, role });
    setSubmitted(true);
  };

  return (
    <div className="prose prose-invert prose-sm max-w-none">
      <h1 className="text-2xl font-bold text-white mb-6">Join the Waitlist</h1>

      <div className="bg-gradient-to-br from-pqc-900/30 to-classical-900/30 rounded-xl p-6 border border-pqc-700/30 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-pqc-900/50 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-pqc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white mb-2">Be First to Access Production Omnituum</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              We're building the production-ready version of Omnituum with server-side key escrow,
              team collaboration, and enterprise features. Join the waitlist to get early access
              and help shape the future of post-quantum secure messaging.
            </p>
          </div>
        </div>
      </div>

      {submitted ? (
        <div className="bg-verified-900/20 border border-verified-700/30 rounded-xl p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-verified-900/30 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-verified-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">You're on the list!</h3>
          <p className="text-gray-400 text-sm">
            We'll notify you when production Omnituum is ready. Check your inbox for updates.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="docs-email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="docs-email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full px-4 py-3 bg-navy-950 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-pqc-500 focus:ring-1 focus:ring-pqc-500 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="docs-role" className="block text-sm font-medium text-gray-300 mb-2">
              Your Role
            </label>
            <select
              id="docs-role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 bg-navy-950 border border-gray-700 rounded-lg text-white focus:border-pqc-500 focus:ring-1 focus:ring-pqc-500 transition-colors"
            >
              <option value="">Select your role...</option>
              <option value="developer">Developer / Engineer</option>
              <option value="security">Security Professional / CISO</option>
              <option value="researcher">Researcher / Academic</option>
              <option value="enterprise">Enterprise / Business</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-pqc-600 to-classical-600 hover:from-pqc-500 hover:to-classical-500 text-white font-semibold rounded-lg transition-all transform hover:scale-[1.02]"
          >
            Join Waitlist
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            We'll never share your email. Unsubscribe anytime.
          </p>
        </form>
      )}

      {/* What to expect */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold text-white mb-4">What You'll Get</h3>
        <div className="grid gap-4">
          {[
            {
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />,
              title: 'Early Access',
              desc: 'Be among the first to use production Omnituum before public launch',
            },
            {
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />,
              title: 'Direct Feedback Channel',
              desc: 'Shape the product roadmap with your input and requirements',
            },
            {
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />,
              title: 'PQC Migration Guides',
              desc: 'Exclusive documentation for transitioning to post-quantum security',
            },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 bg-navy-950/50 rounded-lg border border-gray-800/30">
              <div className="w-10 h-10 rounded-lg bg-pqc-900/30 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-pqc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {item.icon}
                </svg>
              </div>
              <div>
                <h4 className="text-white font-medium text-sm">{item.title}</h4>
                <p className="text-gray-400 text-xs mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
