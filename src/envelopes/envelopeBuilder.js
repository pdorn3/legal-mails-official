import { makeCorrelationId } from '../efsp/contracts.js';

export function buildFilingEnvelope(filingRequest) {
  const correlationId = makeCorrelationId();

  return {
    correlationId,
    jurisdiction: filingRequest.jurisdiction,
    caseType: filingRequest.caseType,
    filingType: filingRequest.filingType,
    documents: Array.isArray(filingRequest.documents) ? filingRequest.documents : [],
    createdAt: new Date().toISOString(),
  };
}
