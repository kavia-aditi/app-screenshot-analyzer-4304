import { Router } from 'express';
import healthRouter from './health.js';
import chatRouter from './chat.js';

const router = Router();

// Base welcome route to confirm server is reachable
router.get('/', (req, res) => {
  res.json({
    message: 'backend_nodejs API',
    docs: null,
    endpoints: ['GET /health', 'POST /chat'],
  });
});

// Health-check endpoint
router.use('/health', healthRouter);

// Example chat endpoint
router.use('/chat', chatRouter);

export default router;
