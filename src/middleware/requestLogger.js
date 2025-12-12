import logger from '../config/logger.js';
import env from '../config/env.js';

export default function requestLogger(req, res, next) {
  const requestId = req.headers['x-request-id'] || null;
  const meta = {
    method: req.method,
    url: req.originalUrl || req.url,
    requestId,
  };

  if (env.nodeEnv === 'development') {
    logger.debug(meta, 'incoming request');
  } else {
    logger.info(meta, 'incoming request');
  }

  next();
}
