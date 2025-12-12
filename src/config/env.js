import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8081;
const nodeEnv = process.env.NODE_ENV || 'development';
const logLevel = process.env.LOG_LEVEL || 'info';
const txCertMode = process.env.TX_CERT_MODE === 'true';

const env = {
  port,
  nodeEnv,
  logLevel,
  txCertMode,
};

export default env;
