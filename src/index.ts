/**
 * Omnituum PQC Studio
 *
 * A post-quantum cryptography platform with hybrid X25519 + Kyber ML-KEM-768 encryption
 * and secure identity vault management.
 *
 * @packageDocumentation
 */

// Re-export all from pqc-shared
export * from '@omnituum/pqc-shared';

// Utility exports
export { jsonToBytes, formatBytes, truncate, keyFingerprint } from './utils/encode';
export { bytesToJson, safeJsonParse, isValidJson, prettyJson, parseEnvelope } from './utils/decode';
