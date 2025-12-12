import logger from '../config/logger.js';
import { assertRequiredFields } from './contracts.js';
import { buildFilingEnvelope } from '../envelopes/envelopeBuilder.js';
import { resolveBackend } from '../routing/router.js';

export async function submitFiling(filingRequest) {
  assertRequiredFields(filingRequest, ['jurisdiction', 'caseType', 'filingType', 'documents']);

  const envelope = buildFilingEnvelope(filingRequest);
  const correlationId = envelope.correlationId;

  const resolution = resolveBackend({ jurisdiction: filingRequest.jurisdiction });

  logger.info(
    {
      correlationId,
      jurisdiction: filingRequest.jurisdiction,
      backend: resolution.backend,
      enabled: resolution.enabled,
    },
    'EFSP submitFiling invoked',
  );

  if (!resolution.enabled) {
    return {
      status: 'error',
      message: 'Backend not enabled for this jurisdiction',
      backend: resolution.backend,
      correlationId,
      providerResponse: {},
    };
  }

  logger.warn(
    {
      correlationId,
      jurisdiction: filingRequest.jurisdiction,
      backend: resolution.backend,
    },
    'Backend integration not implemented (Phase 1)',
  );

  return {
    status: 'error',
    message: 'Backend integration not implemented (Phase 1)',
    backend: resolution.backend,
    correlationId,
    providerResponse: {},
  };
}

export function getRoutingStatus(jurisdiction) {
  const resolution = resolveBackend({ jurisdiction });
  const normalizedJurisdiction = (jurisdiction || '').toString().trim().toUpperCase();

  logger.debug(
    {
      jurisdiction: normalizedJurisdiction,
      backend: resolution.backend,
      enabled: resolution.enabled,
    },
    'EFSP routing status lookup',
  );

  return {
    jurisdiction: normalizedJurisdiction,
    backend: resolution.backend,
    enabled: resolution.enabled,
  };
}
