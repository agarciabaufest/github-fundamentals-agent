import { Router } from 'express';

const apiRouter = Router();

apiRouter.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend' });
});

export default apiRouter;
