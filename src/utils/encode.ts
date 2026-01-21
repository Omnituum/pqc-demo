/**
 * Encoding utilities for the PQC demo
 */

import { textEncoder } from '@omnituum/pqc-shared/crypto';

/**
 * Convert any JSON-serializable value to bytes
 */
export function jsonToBytes(value: unknown): Uint8Array {
  return textEncoder.encode(JSON.stringify(value));
}

/**
 * Format bytes as a human-readable string
 */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Truncate a string to a maximum length with ellipsis
 */
export function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen - 3) + '...';
}

/**
 * Format a hex string with 0x prefix
 */
export function formatHex(hex: string, prefix = true): string {
  const clean = hex.startsWith('0x') ? hex.slice(2) : hex;
  return prefix ? `0x${clean}` : clean;
}

/**
 * Generate a short fingerprint from a hex key
 */
export function keyFingerprint(hexKey: string): string {
  const clean = hexKey.startsWith('0x') ? hexKey.slice(2) : hexKey;
  return clean.slice(0, 8) + '...' + clean.slice(-8);
}
