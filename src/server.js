import app from './app.js';
import env from './config/env.js';
import logger from './config/logger.js';

const port = env.port;

const server = app.listen(port, () => {
  logger.info(`Legal-Mails listening on http://localhost:${port} (NODE_ENV=${env.nodeEnv})`);
});

function shutdown(signal) {
  logger.info({ signal }, 'Received shutdown signal, closing server');
  server.close(() => {
    logger.info('Server closed gracefully');
    process.exit(0);
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

process.on('uncaughtException', (err) => {
  logger.error({
    message: err.message,
    stack: err.stack,
  }, 'Uncaught exception');
});

process.on('unhandledRejection', (reason) => {
  logger.error({ reason }, 'Unhandled promise rejection');
});
