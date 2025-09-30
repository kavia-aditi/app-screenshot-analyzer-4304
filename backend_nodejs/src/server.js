import 'dotenv/config';
import createApp from './app.js';

/**
 * PUBLIC_INTERFACE
 * startServer
 * Starts the Express HTTP server.
 * - Respects PORT from environment (default 4000)
 * - Logs a startup banner with environment and CORS origin
 */
export function startServer() {
  const app = createApp();

  const port = parseInt(process.env.PORT || '4000', 10);
  const env = process.env.NODE_ENV || 'development';
  const origin = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';

  const server = app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(
      `[backend_nodejs] Listening on http://localhost:${port} (env=${env}, cors-origin=${origin})`
    );
  });

  // Graceful shutdown
  const shutdown = () => {
    // eslint-disable-next-line no-console
    console.log('[backend_nodejs] Shutting down...');
    server.close(() => {
      // eslint-disable-next-line no-console
      console.log('[backend_nodejs] Server closed.');
      process.exit(0);
    });
    // Force exit if not closed in 10s
    setTimeout(() => process.exit(1), 10_000).unref();
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  return server;
}

// Auto-start when executed directly
if (import.meta.main) {
  startServer();
}
