import { Router } from 'express';

const router = Router();

/**
 * PUBLIC_INTERFACE
 * GET /health
 * Basic health and readiness probe.
 * Response:
 *  - 200 OK on success
 *  {
 *    "status": "ok",
 *    "service": "backend_nodejs",
 *    "uptime": <seconds>,
 *    "timestamp": "<ISO8601>"
 *  }
 */
router.get('/', (req, res) => {
  const payload = {
    status: 'ok',
    service: 'backend_nodejs',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };
  res.status(200).json(payload);
});

export default router;
