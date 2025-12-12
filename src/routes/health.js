import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  const response = {
    status: 'ok',
    service: 'legal-mails',
  };

  if (process.env.DATABASE_URL) {
    response.database = {
      status: 'unknown',
      note: 'DATABASE_URL detected; DB health checks are not implemented in Phase 0/1',
    };
  }

  res.json(response);
});

router.get('/ready', (req, res) => {
  const response = {
    status: 'ready',
    service: 'legal-mails',
  };

  if (process.env.DATABASE_URL) {
    response.database = {
      status: 'unknown',
      note: 'DATABASE_URL detected; DB health checks are not implemented in Phase 0/1',
    };
  }

  res.json(response);
});

export default router;
