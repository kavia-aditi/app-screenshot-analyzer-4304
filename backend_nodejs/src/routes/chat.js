import { Router } from 'express';

const router = Router();

/**
 * PUBLIC_INTERFACE
 * POST /chat
 * Mock chat endpoint that accepts a user message and returns a canned reply.
 *
 * Request Body (application/json):
 *  {
 *    "message": "What is AI?"
 *  }
 *
 * Successful Response (200):
 *  {
 *    "reply": "AI stands for Artificial Intelligence."
 *  }
 *
 * Error Responses:
 *  - 400 Bad Request: Missing or invalid message field
 *
 * Notes:
 *  - This is a demo endpoint to illustrate backend-to-frontend data flow.
 *  - In a real application, replace the mock logic with actual model/service calls.
 */
router.post('/', (req, res) => {
  const { message } = req.body ?? {};

  // Basic validation
  if (typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({
      error: 'Invalid request: "message" must be a non-empty string.',
      example: { message: 'What is AI?' },
    });
  }

  // Simple mock logic: respond with a canned answer for known prompts
  const normalized = message.trim().toLowerCase();

  let reply = 'I am a mock assistant. Ask me about AI, math, or greetings!';
  if (normalized.includes('what is ai') || normalized.includes('ai')) {
    reply = 'AI stands for Artificial Intelligence.';
  } else if (normalized.includes('2+2') || normalized.includes('2 + 2') || normalized.includes('math')) {
    reply = '2 + 2 equals 4.';
  } else if (normalized.includes('hello') || normalized.includes('hi')) {
    reply = 'Hello! How can I help you today?';
  }

  return res.status(200).json({ reply });
});

export default router;
