import pino from 'pino';
import env from './env.js';

const isDevelopment = env.nodeEnv === 'development';

const logger = pino({
  level: env.logLevel,
  ...(isDevelopment && {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
      },
    },
  }),
});

export default logger;
