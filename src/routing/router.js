import logger from '../config/logger.js';
import { EFSP_CONFIG } from '../efsp/efspConfig.js';

export function resolveBackend({ jurisdiction }) {
  const normalized = (jurisdiction || '').toString().trim().toUpperCase();

  const fallback = {
    backend: 'UNKNOWN',
    enabled: false,
  };

  if (!normalized) {
    logger.debug({ jurisdiction: jurisdiction ?? null }, 'No jurisdiction provided for backend resolution');
    return fallback;
  }

  const jurisdictions = EFSP_CONFIG.routing?.jurisdictions || [];
  const match = jurisdictions.find((entry) => entry.jurisdiction.toUpperCase() === normalized);

  if (!match) {
    logger.debug({ jurisdiction: normalized }, 'No backend mapping found for jurisdiction');
    return fallback;
  }

  const result = {
    backend: match.backend,
    enabled: Boolean(match.enabled),
  };

  logger.debug({ jurisdiction: normalized, ...result }, 'Resolved backend for jurisdiction');

  return result;
}
