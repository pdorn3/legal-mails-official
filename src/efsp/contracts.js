/**
 * @typedef {Object} FilingFiler
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 */

/**
 * @typedef {Object} FilingDocument
 * @property {string} name
 * @property {string} mimeType
 * @property {string} contentBase64
 */

/**
 * @typedef {Object} FilingRequest
 * @property {string} jurisdiction
 * @property {string} caseType
 * @property {string} filingType
 * @property {FilingFiler} filer
 * @property {FilingDocument[]} documents
 * @property {Object<string, any>} [metadata]
 */

/**
 * @typedef {('accepted'|'rejected'|'submitted'|'error')} FilingStatus
 */

/**
 * @typedef {Object} FilingResponse
 * @property {FilingStatus} status
 * @property {string} message
 * @property {string} backend
 * @property {string} correlationId
 * @property {Object<string, any>} providerResponse
 */

/**
 * @typedef {Object} CaseSearchRequest
 * @property {string} jurisdiction
 * @property {string} caseNumber
 * @property {Object<string, any>} [metadata]
 */

/**
 * @typedef {Object} CaseSearchResponse
 * @property {string} status
 * @property {string} backend
 * @property {string} correlationId
 * @property {Object<string, any>} providerResponse
 */

/**
 * Generate a correlation ID for tracking EFSP operations.
 * @returns {string}
 */
export function makeCorrelationId() {
  const ts = new Date().toISOString();
  const rand = Math.random().toString(36).slice(2, 10);
  return `lm-${ts}-${rand}`;
}

/**
 * Assert that the given request contains all required fields.
 * @param {Object} request
 * @param {string[]} requiredFields
 * @throws {Error & { status?: number }} If any required field is missing.
 */
export function assertRequiredFields(request, requiredFields) {
  const missing = requiredFields.filter((field) => {
    const value = request?.[field];
    return value === undefined || value === null || value === '';
  });

  if (missing.length > 0) {
    const message = `Missing required fields: ${missing.join(', ')}`;
    const error = new Error(message);
    error.status = 400;
    throw error;
  }
}
