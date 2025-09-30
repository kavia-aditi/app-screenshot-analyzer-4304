# backend_nodejs

Node.js (Express) backend for the `app-screenshot-analyzer-4304` project. This service exposes a health-check endpoint and is structured for future API expansion to support the React frontend.

## Features
- Express server with JSON parsing
- CORS enabled and configurable via env
- Security headers via Helmet
- HTTP request logging via Morgan
- Health endpoint: `GET /health`
- Structured for future routes under `src/routes`

## Getting Started

1) Install dependencies
   npm install

2) Configure environment
   - Copy `.env.example` to `.env` and adjust values as needed.

3) Run in development
   npm run dev

4) Run in production
   npm start

Server starts on `http://localhost:PORT` (default `4000`).

## API

- GET /health
  - Purpose: Basic health and readiness check.
  - Response:
    {
      "status": "ok",
      "service": "backend_nodejs",
      "uptime": <seconds>,
      "timestamp": "<ISO8601>"
    }

- POST /chat
  - Purpose: Example chat endpoint with mocked logic to demonstrate backend-to-frontend flow.
  - Request (application/json):
    {
      "message": "What is AI?"
    }
  - Response (200):
    {
      "reply": "AI stands for Artificial Intelligence."
    }
  - Errors:
    - 400: when "message" is missing or not a non-empty string

## Project Structure

- src/
  - server.js       => App bootstrap and server startup
  - app.js          => Express app configuration (middleware, routes)
  - routes/
    - health.js     => Health endpoint router
  - routes/index.js => Central router aggregation

## Environment Variables

See `.env.example`. Do not commit sensitive values. Configure:
- PORT
- FRONTEND_ORIGIN
- NODE_ENV

## Notes

- Adjust CORS as needed for your deployment domains.
- Add new routes under `src/routes` and wire them in `src/routes/index.js`.
