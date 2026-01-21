import { useState } from 'react';
import {
  hybridEncrypt,
  getPublicKeys,
  type HybridIdentity,
  type HybridEnvelope,
} from '@omnituum/pqc-shared/crypto';
import { prettyJson } from '../utils/decode';
import { formatBytes } from '../utils/encode';

interface MessageEncryptorProps {
  identity: HybridIdentity | null;
  onEnvelopeCreated: (envelope: HybridEnvelope) => void;
}

export function MessageEncryptor({ identity, onEnvelopeCreated }: MessageEncryptorProps) {
  const [message, setMessage] = useState('');
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastEnvelope, setLastEnvelope] = useState<HybridEnvelope | null>(null);
  const [showEnvelope, setShowEnvelope] = useState(false);

  const handleEncrypt = async () => {
    if (!identity) {
      setError('Please generate an identity first');
      return;
    }

    if (!message.trim()) {
      setError('Please enter a message');
      return;
    }

    setIsEncrypting(true);
    setError(null);

    try {
      const recipientPublicKeys = getPublicKeys(identity);
      const envelope = await hybridEncrypt(message, recipientPublicKeys, { name: identity.name });
      setLastEnvelope(envelope);
      onEnvelopeCreated(envelope);
      setMessage('');
    } catch (e) {
      setError(`Encryption failed: ${e instanceof Error ? e.message : 'Unknown error'}`);
    } finally {
      setIsEncrypting(false);
    }
  };

  const copyEnvelope = async () => {
    if (lastEnvelope) {
      await navigator.clipboard.writeText(JSON.stringify(lastEnvelope));
    }
  };

  const envelopeSize = lastEnvelope ? JSON.stringify(lastEnvelope).length : 0;

  return (
    <div className="bg-navy-900/50 rounded-xl p-6 border border-gray-800/30">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-verified-900/30 flex items-center justify-center">
          <svg className="w-5 h-5 text-verified-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Hybrid Encryption Engine</h2>
          <p className="text-xs text-gray-500">Classical + post-quantum protection</p>
        </div>
      </div>

      {!identity ? (
        <div className="text-gray-500 text-center py-10">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <p className="text-sm">Generate an identity to start encrypting</p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-gray-400 leading-relaxed">
            Protect messages using classical and post-quantum algorithms simultaneously.
            Either key can decrypt - both add security.
          </p>

          <div>
            <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your secret message..."
              rows={4}
              className="w-full px-4 py-3 bg-navy-950/50 border border-gray-800/50 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-verified-500/50 transition-colors resize-none"
            />
            <div className="text-xs text-gray-600 mt-1.5">
              {message.length} characters
            </div>
          </div>

          {error && (
            <div className="text-red-400 text-xs bg-red-900/20 border border-red-800/30 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            onClick={handleEncrypt}
            disabled={isEncrypting || !message.trim()}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              isEncrypting || !message.trim()
                ? 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-verified-600 to-verified-500 hover:from-verified-500 hover:to-verified-400 text-white'
            }`}
          >
            {isEncrypting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Encrypting...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Encrypt with X25519 + Kyber
              </span>
            )}
          </button>

          {lastEnvelope && (
            <div className="mt-4 space-y-3 pt-4 border-t border-gray-800/30">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 uppercase tracking-wider">Sealed Envelope</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-600">{formatBytes(envelopeSize)}</span>
                  <button
                    onClick={() => setShowEnvelope(!showEnvelope)}
                    className="text-xs text-pqc-400 hover:text-pqc-300 transition-colors"
                  >
                    {showEnvelope ? 'Hide' : 'Inspect'}
                  </button>
                  <button
                    onClick={copyEnvelope}
                    className="text-xs text-classical-400 hover:text-classical-300 transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>

              {showEnvelope && (
                <pre className="bg-navy-950/70 p-4 rounded-lg text-xs text-gray-400 overflow-auto max-h-64 font-mono border border-gray-800/30">
                  {prettyJson(lastEnvelope)}
                </pre>
              )}

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-navy-950/50 p-2.5 rounded-lg border border-gray-800/20">
                  <span className="text-gray-600">Suite</span>
                  <span className="text-pqc-400 ml-2 font-mono">{lastEnvelope.suite}</span>
                </div>
                <div className="bg-navy-950/50 p-2.5 rounded-lg border border-gray-800/20">
                  <span className="text-gray-600">AEAD</span>
                  <span className="text-verified-400 ml-2 font-mono">{lastEnvelope.aead}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
