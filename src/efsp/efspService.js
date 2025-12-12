import logger from '../config/logger.js';
import env from '../config/env.js';
import { assertRequiredFields } from './contracts.js';
import { buildFilingEnvelope } from '../envelopes/envelopeBuilder.js';
import { resolveBackend } from '../routing/router.js';

function createPayloadHash(payload) {
  try {
    const json = JSON.stringify(payload) || '';
    return Buffer.from(json).toString('base64').slice(0, 32);
  } catch (err) {
    return 'unhashable';
  }
}

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

  if (env.txCertMode) {
    const payloadHash = createPayloadHash(filingRequest);
    const scenario =
      (filingRequest && filingRequest.metadata && filingRequest.metadata.txCertScenario) ||
      'success';

    let response;

    if (scenario === 'validation_error') {
      response = {
        status: 'error',
        message: 'TX_CERT_MODE: mock validation error',
        backend: resolution.backend,
        correlationId,
        providerResponse: {
          code: 'TX_CERT_VALIDATION_ERROR',
          httpStatus: 400,
        },
      };
    } else if (scenario === 'server_error') {
      response = {
        status: 'error',
        message: 'TX_CERT_MODE: mock internal error',
        backend: resolution.backend,
        correlationId,
        providerResponse: {
          code: 'TX_CERT_SERVER_ERROR',
          httpStatus: 500,
        },
      };
    } else {
      response = {
        status: 'accepted',
        message: 'TX_CERT_MODE: mock accepted',
        backend: resolution.backend,
        correlationId,
        providerResponse: {
          code: 'TX_CERT_ACCEPTED',
          httpStatus: 200,
        },
      };
    }

    logger.info(
      {
        correlationId,
        jurisdiction: filingRequest.jurisdiction,
        filingType: filingRequest.filingType,
        backend: resolution.backend,
        txCertMode: true,
        txCertScenario: scenario,
        payloadHash,
        deterministic: true,
      },
      'TX certification dry-run response',
    );

    return response;
  }

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
