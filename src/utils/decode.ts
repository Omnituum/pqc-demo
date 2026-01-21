/**
 * Decoding utilities for the PQC demo
 */

import { textDecoder } from '@omnituum/pqc-shared/crypto';

/**
 * Convert bytes to a JSON value
 */
export function bytesToJson<T = unknown>(bytes: Uint8Array): T {
  return JSON.parse(textDecoder.decode(bytes));
}

/**
 * Parse a JSON string with error handling
 */
export function safeJsonParse<T = unknown>(str: string): T | null {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}

/**
 * Check if a string is valid JSON
 */
export function isValidJson(str: string): boolean {
  return safeJsonParse(str) !== null;
}

/**
 * Pretty print JSON with indentation
 */
export function prettyJson(value: unknown, indent = 2): string {
  return JSON.stringify(value, null, indent);
}

/**
 * Parse an envelope from a JSON string
 */
export function parseEnvelope(str: string): unknown | null {
  const parsed = safeJsonParse(str);
  if (!parsed || typeof parsed !== 'object') return null;
  if (!('v' in (parsed as object))) return null;
  return parsed;
}
