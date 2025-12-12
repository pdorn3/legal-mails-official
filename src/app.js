import express from 'express';
import cors from 'cors';

import env from './config/env.js';
import logger from './config/logger.js';
import healthRouter from './routes/health.js';
import requestLogger from './middleware/requestLogger.js';
import errorHandler from './middleware/errorHandler.js';
import efspRoutes from './api/efspRoutes.js';

const app = express();

logger.info({ nodeEnv: env.nodeEnv }, 'Initializing Legal-Mails app');

app.use(requestLogger);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    service: 'legal-mails',
    status: 'ok',
  });
});

app.use('/health', healthRouter);

app.use('/api/efsp', efspRoutes);

app.use(errorHandler);

export default app;
