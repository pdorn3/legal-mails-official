import logger from '../config/logger.js';

export default function errorHandler(err, req, res, next) {
  logger.error({
    message: err.message,
    stack: err.stack,
  }, 'Unhandled error');

  const status = err.status || 500;
  const requestId = req.headers['x-request-id'] || null;

  res.status(status).json({
    error: 'Internal server error',
    requestId,
  });
}
