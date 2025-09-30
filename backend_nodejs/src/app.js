import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes/index.js';

/**
 * Create and configure the Express application.
 * This module sets up middlewares and mounts the API routes.
 */
const createApp = () => {
  const app = express();

  // Trust proxy if behind a reverse proxy in future deployments
  app.set('trust proxy', 1);

  // Basic security headers
  app.use(helmet());

  // JSON body parsing
  app.use(express.json({ limit: '1mb' }));

  // CORS configuration - origin allowed via env
  const allowedOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';
  app.use(
    cors({
      origin: allowedOrigin,
      credentials: true,
    })
  );

  // HTTP request logging
  const env = process.env.NODE_ENV || 'development';
  app.use(morgan(env === 'production' ? 'combined' : 'dev'));

  // Mount API routes
  app.use('/', routes);

  // 404 handler for unmatched routes
  app.use((req, res) => {
    res.status(404).json({
      error: 'Not Found',
      path: req.originalUrl,
    });
  });

  // Error handler
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    // Avoid leaking stack traces in production
    const status = err.status || 500;
    const body =
      env === 'production'
        ? { error: 'Internal Server Error' }
        : { error: err.message || 'Internal Server Error', stack: err.stack };
    res.status(status).json(body);
  });

  return app;
};

export default createApp;
