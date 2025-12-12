import { Router } from 'express';
import logger from '../config/logger.js';
import { EFSP_CONFIG } from '../efsp/efspConfig.js';
import { getRoutingStatus, submitFiling } from '../efsp/efspService.js';

const router = Router();

router.get('/status', (req, res, next) => {
  try {
    const jurisdiction = req.query.jurisdiction;

    if (!jurisdiction) {
      return res.status(400).json({
        error: 'jurisdiction query parameter is required',
      });
    }

    const routingStatus = getRoutingStatus(jurisdiction);

    logger.debug(
      {
        jurisdiction: routingStatus.jurisdiction,
        backend: routingStatus.backend,
        enabled: routingStatus.enabled,
      },
      'EFSP status requested',
    );

    res.json({
      service: EFSP_CONFIG.serviceName,
      env: EFSP_CONFIG.defaultEnv,
      jurisdiction: routingStatus.jurisdiction,
      backend: routingStatus.backend,
      enabled: routingStatus.enabled,
    });
  } catch (err) {
    next(err);
  }
});

router.post('/submit', async (req, res, next) => {
  try {
    const filingRequest = req.body;
    const filingResponse = await submitFiling(filingRequest);
    res.json(filingResponse);
  } catch (err) {
    next(err);
  }
});

export default router;
