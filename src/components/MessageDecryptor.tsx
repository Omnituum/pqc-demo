import { useState, useRef, useEffect } from 'react';
import {
  hybridDecryptToString,
  getSecretKeys,
  type HybridIdentity,
  type HybridEnvelope,
} from '@omnituum/pqc-shared/crypto';
import { parseEnvelope } from '../utils/decode';

interface MessageDecryptorProps {
  identity: HybridIdentity | null;
  currentEnvelope: HybridEnvelope | null;
}

export function MessageDecryptor({ identity, currentEnvelope }: MessageDecryptorProps) {
  const [envelopeJson, setEnvelopeJson] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState<string | null>(null);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [decryptMethod, setDecryptMethod] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const decryptedRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to result on successful decryption
  useEffect(() => {
    if (decryptedMessage !== null && decryptedRef.current) {
      setShowSuccess(true);
      // Slight delay to let the DOM update
      setTimeout(() => {
        decryptedRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 100);
      // Hide success state after 2 seconds
      const timer = setTimeout(() => setShowSuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [decryptedMessage]);

  const handleDecrypt = async (envelope: HybridEnvelope) => {
    if (!identity) {
      setError('Please generate an identity first');
      return;
    }

    setIsDecrypting(true);
    setError(null);
    setDecryptedMessage(null);
    setDecryptMethod(null);

    try {
      const secretKeys = getSecretKeys(identity);
      const plaintext = await hybridDecryptToString(envelope, secretKeys);
      setDecryptedMessage(plaintext);
      setDecryptMethod('Hybrid (X25519 + Kyber)');
    } catch (e) {
      setError(`Decryption failed: ${e instanceof Error ? e.message : 'Unknown error'}`);
    } finally {
      setIsDecrypting(false);
    }
  };

  const handlePasteDecrypt = async () => {
    if (!envelopeJson.trim()) {
      setError('Please paste an encrypted envelope');
      return;
    }

    const parsed = parseEnvelope(envelopeJson);
    if (!parsed) {
      setError('Invalid envelope format');
      return;
    }

    await handleDecrypt(parsed as HybridEnvelope);
  };

  const handleDecryptCurrent = async () => {
    if (currentEnvelope) {
      await handleDecrypt(currentEnvelope);
    }
  };

  const loadFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setEnvelopeJson(text);
      setError(null);
    } catch {
      setError('Failed to read from clipboard');
    }
  };

  return (
    <div className="bg-navy-900/50 rounded-xl p-6 border border-gray-800/30">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-classical-900/30 flex items-center justify-center">
          <svg className="w-5 h-5 text-classical-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Local Decryption</h2>
          <p className="text-xs text-gray-500">No servers. No logs. Your keys.</p>
        </div>
      </div>

      {!identity ? (
        <div className="text-gray-500 text-center py-10">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
          </svg>
          <p className="text-sm">Generate an identity to decrypt messages</p>
        </div>
      ) : (
        <div className="space-y-4">
          {currentEnvelope && (
            <div className="bg-pqc-900/20 border border-pqc-700/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-pqc-300 text-sm font-medium">Envelope Ready</span>
                {currentEnvelope.meta.senderName && (
                  <span className="text-xs text-gray-500">From: {currentEnvelope.meta.senderName}</span>
                )}
              </div>
              <button
                onClick={handleDecryptCurrent}
                disabled={isDecrypting}
                className={`w-full py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 disabled:opacity-50 ${
                  showSuccess
                    ? 'bg-verified-600 text-white'
                    : 'bg-pqc-600 hover:bg-pqc-500'
                }`}
              >
                {isDecrypting ? (
                  'Decrypting...'
                ) : showSuccess ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Decrypted — see below
                  </span>
                ) : (
                  'Decrypt Current Envelope'
                )}
              </button>
            </div>
          )}

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800/30"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-navy-900/50 text-xs text-gray-600 uppercase tracking-wider">Or paste envelope</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs text-gray-500 uppercase tracking-wider">Encrypted Envelope</label>
              <button
                onClick={loadFromClipboard}
                className="text-xs text-classical-400 hover:text-classical-300 transition-colors"
              >
                Paste from clipboard
              </button>
            </div>
            <textarea
              value={envelopeJson}
              onChange={(e) => setEnvelopeJson(e.target.value)}
              placeholder='{"v": "pqc-demo.hybrid.v1", ...}'
              rows={5}
              className="w-full px-4 py-3 bg-navy-950/50 border border-gray-800/50 rounded-lg text-gray-300 placeholder-gray-700 focus:outline-none focus:border-classical-500/50 transition-colors resize-none font-mono text-xs"
            />
          </div>

          {error && (
            <div className="text-red-400 text-xs bg-red-900/20 border border-red-800/30 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            onClick={handlePasteDecrypt}
            disabled={isDecrypting || !envelopeJson.trim()}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              isDecrypting || !envelopeJson.trim()
                ? 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-classical-600 to-classical-500 hover:from-classical-500 hover:to-classical-400 text-white'
            }`}
          >
            {isDecrypting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Decrypting...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
                Decrypt Envelope
              </span>
            )}
          </button>

          {decryptedMessage !== null && (
            <div ref={decryptedRef} className="mt-4 space-y-3 pt-4 border-t border-gray-800/30 scroll-mt-4">
              <div className="flex items-center justify-between">
                <span className="text-verified-400 text-sm font-medium flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Decrypted
                </span>
                {decryptMethod && (
                  <span className="text-xs text-gray-600">{decryptMethod}</span>
                )}
              </div>

              <div className="bg-navy-950/70 p-4 rounded-lg border border-verified-800/20">
                <div className="text-white whitespace-pre-wrap break-words leading-relaxed">
                  {decryptedMessage}
                </div>
              </div>

              <p className="text-xs text-gray-600 text-center">
                Your keys, your screen, your message.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
