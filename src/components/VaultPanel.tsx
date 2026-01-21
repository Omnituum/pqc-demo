import { useState, useEffect, useCallback } from 'react';
import {
  type OmnituumVault,
  type HybridIdentityRecord,
  createEmptyVault,
  createIdentity,
  addIdentity,
  removeIdentity,
  rotateIdentityKeys,
  setActiveIdentity,
  encryptVault,
  decryptVaultFromJson,
  downloadVault,
} from '@omnituum/pqc-shared/vault';
import { type HybridIdentity } from '@omnituum/pqc-shared/crypto';

const VAULT_STORAGE_KEY = 'omnituum_vault_encrypted';

interface VaultPanelProps {
  onIdentityChange: (identity: HybridIdentity | null) => void;
  currentIdentity: HybridIdentity | null;
}

type VaultState = 'locked' | 'empty' | 'unlocked';

export function VaultPanel({ onIdentityChange, currentIdentity: _currentIdentity }: VaultPanelProps) {
  // _currentIdentity is available for future sync features
  const [vaultState, setVaultState] = useState<VaultState>('locked');
  const [vault, setVault] = useState<OmnituumVault | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newIdentityName, setNewIdentityName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCreateIdentity, setShowCreateIdentity] = useState(false);
  const [sessionPassword, setSessionPassword] = useState<string | null>(null);
  const [showExportReminder, setShowExportReminder] = useState(false);
  const [newlyCreatedIdentity, setNewlyCreatedIdentity] = useState<HybridIdentityRecord | null>(null);

  // Check for existing vault on mount
  useEffect(() => {
    const stored = localStorage.getItem(VAULT_STORAGE_KEY);
    if (stored) {
      setVaultState('locked');
    } else {
      setVaultState('empty');
    }
  }, []);

  // Sync active identity with parent
  useEffect(() => {
    if (vault && vault.settings.lastUsedIdentity) {
      const active = vault.identities.find(i => i.id === vault.settings.lastUsedIdentity);
      if (active) {
        onIdentityChange(identityRecordToHybrid(active));
      }
    }
  }, [vault, onIdentityChange]);

  const identityRecordToHybrid = (record: HybridIdentityRecord): HybridIdentity => ({
    id: record.id,
    name: record.name,
    x25519PubHex: record.x25519PubHex,
    x25519SecHex: record.x25519SecHex,
    kyberPubB64: record.kyberPubB64,
    kyberSecB64: record.kyberSecB64,
    createdAt: record.createdAt,
    lastRotatedAt: record.lastRotatedAt,
    rotationCount: record.rotationCount,
  });

  const saveVault = useCallback(async (v: OmnituumVault, pwd: string) => {
    const encrypted = await encryptVault(v, pwd);
    localStorage.setItem(VAULT_STORAGE_KEY, JSON.stringify(encrypted));
  }, []);

  const handleCreateVault = async () => {
    if (!password || password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const newVault = createEmptyVault();
      await saveVault(newVault, password);
      setVault(newVault);
      setVaultState('unlocked');
      setSessionPassword(password);
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create vault');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnlock = async () => {
    if (!password) {
      setError('Password is required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const stored = localStorage.getItem(VAULT_STORAGE_KEY);
      if (!stored) {
        setError('No vault found');
        return;
      }

      const decrypted = await decryptVaultFromJson(stored, password);
      setVault(decrypted);
      setVaultState('unlocked');
      setSessionPassword(password);
      setPassword('');
    } catch (err) {
      setError('Incorrect password or corrupted vault');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLock = () => {
    setVault(null);
    setVaultState('locked');
    setSessionPassword(null);
    onIdentityChange(null);
  };

  const handleCreateIdentity = async () => {
    if (!vault || !sessionPassword) return;
    if (!newIdentityName.trim()) {
      setError('Identity name is required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const identity = await createIdentity(newIdentityName.trim());
      if (!identity) {
        setError('Failed to generate identity - Kyber not available');
        return;
      }

      let updatedVault = addIdentity(vault, identity);
      updatedVault = setActiveIdentity(updatedVault, identity.id);

      await saveVault(updatedVault, sessionPassword);
      setVault(updatedVault);
      setNewIdentityName('');
      setShowCreateIdentity(false);
      setNewlyCreatedIdentity(identity);
      setShowExportReminder(true);
      onIdentityChange(identityRecordToHybrid(identity));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create identity');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectIdentity = async (id: string) => {
    if (!vault || !sessionPassword) return;

    const identity = vault.identities.find(i => i.id === id);
    if (!identity) return;

    const updatedVault = setActiveIdentity(vault, id);
    await saveVault(updatedVault, sessionPassword);
    setVault(updatedVault);
    onIdentityChange(identityRecordToHybrid(identity));
  };

  const handleRotateKeys = async (id: string) => {
    if (!vault || !sessionPassword) return;

    setIsLoading(true);
    try {
      const updatedVault = await rotateIdentityKeys(vault, id);
      if (!updatedVault) {
        setError('Failed to rotate keys');
        return;
      }

      await saveVault(updatedVault, sessionPassword);
      setVault(updatedVault);

      // Update current identity if it was rotated
      if (vault.settings.lastUsedIdentity === id) {
        const rotated = updatedVault.identities.find(i => i.id === id);
        if (rotated) {
          onIdentityChange(identityRecordToHybrid(rotated));
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to rotate keys');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteIdentity = async (id: string) => {
    if (!vault || !sessionPassword) return;

    const updatedVault = removeIdentity(vault, id);
    await saveVault(updatedVault, sessionPassword);
    setVault(updatedVault);

    if (vault.settings.lastUsedIdentity === id) {
      const firstIdentity = updatedVault.identities[0];
      if (firstIdentity) {
        onIdentityChange(identityRecordToHybrid(firstIdentity));
      } else {
        onIdentityChange(null);
      }
    }
  };

  const handleExport = async () => {
    if (!vault || !sessionPassword) return;
    await downloadVault(vault, sessionPassword);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !sessionPassword) return;

    setIsLoading(true);
    setError(null);

    try {
      const text = await file.text();
      const imported = await decryptVaultFromJson(text, sessionPassword);
      await saveVault(imported, sessionPassword);
      setVault(imported);
    } catch (err) {
      setError('Failed to import vault - check password or file');
    } finally {
      setIsLoading(false);
    }
  };

  // Render locked/empty state
  if (vaultState !== 'unlocked') {
    return (
      <div className="bg-navy-900/50 rounded-xl p-6 border border-gray-800/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-classical-900/50 to-pqc-900/50 flex items-center justify-center">
            <svg className="w-5 h-5 text-pqc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Identity Vault</h2>
            <p className="text-xs text-gray-500">
              {vaultState === 'empty' ? 'Create a new vault' : 'Unlock to access identities'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password..."
              className="w-full px-4 py-2.5 bg-navy-950/50 border border-gray-800/50 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-pqc-500/50 transition-colors"
              onKeyDown={(e) => e.key === 'Enter' && (vaultState === 'empty' ? handleCreateVault() : handleUnlock())}
            />
          </div>

          {vaultState === 'empty' && (
            <div>
              <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password..."
                className="w-full px-4 py-2.5 bg-navy-950/50 border border-gray-800/50 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-pqc-500/50 transition-colors"
              />
            </div>
          )}

          {error && (
            <div className="text-red-400 text-xs bg-red-900/20 border border-red-800/30 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            onClick={vaultState === 'empty' ? handleCreateVault : handleUnlock}
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              isLoading
                ? 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-classical-600 to-pqc-600 hover:from-classical-500 hover:to-pqc-500 text-white'
            }`}
          >
            {isLoading ? 'Processing...' : vaultState === 'empty' ? 'Create Vault' : 'Unlock Vault'}
          </button>

          <div className="flex items-center gap-2 text-xs text-gray-600">
            <svg className="w-3.5 h-3.5 text-verified-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            PBKDF2-SHA256 (600K iterations) + AES-256-GCM
          </div>
        </div>
      </div>
    );
  }

  // Render unlocked state
  return (
    <div className="bg-navy-900/50 rounded-xl border border-gray-800/30">
      {/* Header */}
      <div className="p-4 border-b border-gray-800/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-verified-900/30 flex items-center justify-center">
              <svg className="w-5 h-5 text-verified-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Identity Vault</h2>
              <p className="text-xs text-verified-400">{vault?.identities.length ?? 0} identities</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCreateIdentity(true)}
              className="p-2 bg-pqc-900/30 hover:bg-pqc-900/50 rounded-lg transition-colors"
              title="Add Identity"
            >
              <svg className="w-4 h-4 text-pqc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <button
              onClick={handleLock}
              className="p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors"
              title="Lock Vault"
            >
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Create Identity Form */}
      {showCreateIdentity && (
        <div className="p-4 border-b border-gray-800/30 bg-navy-950/30">
          <div className="space-y-3">
            <input
              type="text"
              value={newIdentityName}
              onChange={(e) => setNewIdentityName(e.target.value)}
              placeholder="Identity name..."
              className="w-full px-4 py-2.5 bg-navy-950/50 border border-gray-800/50 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-pqc-500/50 transition-colors text-sm"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowCreateIdentity(false)}
                className="flex-1 py-2 px-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg text-sm text-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateIdentity}
                disabled={isLoading || !newIdentityName.trim()}
                className="flex-1 py-2 px-3 bg-pqc-600 hover:bg-pqc-500 disabled:bg-gray-800/50 disabled:text-gray-600 rounded-lg text-sm font-medium transition-colors"
              >
                {isLoading ? 'Creating...' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Identity List */}
      <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
        {!vault || vault.identities.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <p className="text-sm">No identities yet</p>
            <button
              onClick={() => setShowCreateIdentity(true)}
              className="mt-3 text-pqc-400 hover:text-pqc-300 text-sm"
            >
              Create your first identity
            </button>
          </div>
        ) : (
          vault.identities.map((identity) => {
            const isActive = vault?.settings.lastUsedIdentity === identity.id;
            return (
              <div
                key={identity.id}
                className={`p-3 rounded-lg border transition-all ${
                  isActive
                    ? 'bg-pqc-900/20 border-pqc-700/30'
                    : 'bg-navy-950/30 border-gray-800/30 hover:border-gray-700/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isActive ? 'bg-pqc-900/50' : 'bg-gray-800/50'
                    }`}>
                      <span className={`font-semibold ${isActive ? 'text-pqc-400' : 'text-gray-400'}`}>
                        {identity.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white text-sm">{identity.name}</span>
                        {isActive && (
                          <span className="px-1.5 py-0.5 bg-pqc-900/50 rounded text-[10px] text-pqc-400 font-medium">
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600">
                        {identity.x25519PubHex.slice(0, 8)}...{identity.x25519PubHex.slice(-4)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {!isActive && (
                      <button
                        onClick={() => handleSelectIdentity(identity.id)}
                        className="px-2 py-1 bg-gray-800/50 hover:bg-pqc-900/50 rounded text-xs text-gray-400 hover:text-pqc-400 transition-colors"
                      >
                        Use
                      </button>
                    )}
                    <button
                      onClick={() => handleRotateKeys(identity.id)}
                      className="p-1.5 bg-gray-800/50 hover:bg-gray-700/50 rounded transition-colors"
                      title="Rotate Keys"
                    >
                      <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteIdentity(identity.id)}
                      className="p-1.5 bg-gray-800/50 hover:bg-red-900/30 rounded transition-colors"
                      title="Delete"
                    >
                      <svg className="w-3.5 h-3.5 text-gray-500 hover:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-800/30 flex items-center gap-2">
        <button
          onClick={handleExport}
          className="flex-1 py-2 px-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg text-xs text-gray-400 transition-colors"
        >
          Export Vault
        </button>
        <label className="flex-1 py-2 px-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg text-xs text-gray-400 text-center cursor-pointer transition-colors">
          Import Vault
          <input type="file" accept=".enc,.json" onChange={handleImport} className="hidden" />
        </label>
      </div>

      {error && (
        <div className="px-4 pb-4">
          <div className="text-red-400 text-xs bg-red-900/20 border border-red-800/30 p-3 rounded-lg">
            {error}
          </div>
        </div>
      )}

      {/* Demo Mode Notice */}
      <div className="p-3 bg-amber-900/10 border-t border-amber-800/20">
        <div className="flex items-start gap-2">
          <svg className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div className="text-[10px] text-amber-300/80 leading-relaxed">
            <span className="font-semibold text-amber-300">Demo Mode</span> — Your identities are stored only in this browser.
            Clearing cookies or localStorage will permanently delete your vault unless exported.
          </div>
        </div>
      </div>

      {/* Export Reminder Modal */}
      {showExportReminder && newlyCreatedIdentity && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-navy-900 rounded-2xl border border-gray-800/50 w-full max-w-md overflow-hidden animate-fadeIn">
            {/* Icon */}
            <div className="p-6 pb-0 flex justify-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-verified-900/50 to-pqc-900/50 flex items-center justify-center">
                <svg className="w-8 h-8 text-verified-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 text-center">
              <h2 className="text-xl font-semibold text-white mb-2">
                Identity Created!
              </h2>
              <p className="text-sm text-gray-400 mb-4">
                <span className="text-pqc-400 font-medium">{newlyCreatedIdentity.name}</span> has been created with hybrid X25519 + Kyber keys.
              </p>

              <div className="bg-amber-900/20 border border-amber-800/30 rounded-lg p-3 text-left">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div className="text-xs text-amber-200/80">
                    <span className="font-semibold text-amber-200">Save your vault now.</span><br />
                    If your browser storage resets, you will lose this identity permanently.
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 p-6 pt-0">
              <button
                onClick={() => {
                  setShowExportReminder(false);
                  setNewlyCreatedIdentity(null);
                }}
                className="flex-1 py-3 px-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg text-sm font-medium text-gray-300 transition-colors"
              >
                Continue Anyway
              </button>
              <button
                onClick={async () => {
                  await handleExport();
                  setShowExportReminder(false);
                  setNewlyCreatedIdentity(null);
                }}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-classical-600 to-pqc-600 hover:from-classical-500 hover:to-pqc-500 rounded-lg text-sm font-medium text-white transition-colors"
              >
                Export Vault
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
