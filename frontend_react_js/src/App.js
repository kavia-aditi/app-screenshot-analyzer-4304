import React, { useEffect, useMemo, useState } from 'react';
import './App.css';

/**
 * Inline styles aligned with assets/style_guide.md and design notes.
 * We keep styling minimal and local to avoid adding dependencies.
 */
const styles = {
  page: {
    display: 'flex',
    justifyContent: 'center',
    background: 'var(--bg-canvas, #FFFFFF)',
    minHeight: '100vh',
  },
  container: {
    // Max widths per design (mobile-first)
    width: '100%',
    maxWidth: '840px',
    padding: '24px 20px 28px',
    boxSizing: 'border-box',
  },
  header: {
    margin: '0 auto',
    maxWidth: '720px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '8px',
  },
  h1: {
    margin: 0,
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    fontWeight: 700,
    fontSize: '25px',
    lineHeight: 1.25,
    color: 'var(--text-strong, #111111)',
    letterSpacing: '0.1px',
  },
  subtitle: {
    margin: 0,
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    fontWeight: 400,
    fontSize: '14.5px',
    lineHeight: 1.4,
    color: 'var(--text-muted, #6B7280)',
  },
  illustrationWrap: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '14px',
    marginBottom: '14px',
  },
  illustrationCircle: {
    width: '126px',
    height: '126px',
    borderRadius: '9999px',
    background: 'var(--illustration-bg, #DBEAFE)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationEmoji: {
    fontSize: '56px',
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '22px',
    margin: '0 auto',
    maxWidth: '720px',
  },
  card: {
    background: 'var(--surface, #FFFFFF)',
    border: '1px solid var(--stroke, #E5E7EB)',
    borderRadius: '12px',
    padding: '16px',
    boxSizing: 'border-box',
  },
  sectionTitle: {
    margin: 0,
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    fontWeight: 700,
    fontSize: '16.5px',
    color: 'var(--text-strong, #111111)',
  },
  sectionTitleCaps: {
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
  },
  chipRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    marginTop: '12px',
  },
  chip: {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: '9999px',
    background: 'var(--chip-bg, #FFFFFF)',
    border: '1px solid var(--chip-stroke, #D1D5DB)',
    color: 'var(--text-default, #1F2937)',
    padding: '9px 16px',
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    fontSize: '14.5px',
    fontWeight: 500,
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'background 0.15s ease, color 0.15s ease, border-color 0.15s ease',
  },
  chipSelected: {
    background: 'var(--brand, #2563EB)',
    color: '#FFFFFF',
    borderColor: 'var(--brand, #2563EB)',
  },
  quizSub: {
    marginTop: '8px',
    marginBottom: '12px',
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    fontSize: '13.5px',
    color: 'var(--text-subtle, #4B5563)',
  },
  button: {
    width: '100%',
    height: '46px',
    border: 'none',
    borderRadius: '12px',
    background: 'var(--brand, #2563EB)',
    color: '#FFFFFF',
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background 0.15s ease, opacity 0.15s ease, box-shadow 0.15s ease',
  },
  input: {
    width: '100%',
    height: '46px',
    borderRadius: '12px',
    border: '1px solid var(--stroke, #E5E7EB)',
    background: '#FFFFFF',
    padding: '0 12px',
    boxSizing: 'border-box',
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    fontSize: '15px',
    color: 'var(--text-default, #1F2937)',
    outline: 'none',
    transition: 'box-shadow 0.15s ease, border-color 0.15s ease',
  },
  topBar: {
    position: 'relative',
    height: 0, // keep space minimal; theme toggle floats
  },
  themeToggle: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'var(--brand, #2563EB)',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    padding: '8px 14px',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease',
  },
  // NEW: styles for chat area presentation
  chatArea: {
    marginTop: '12px',
    borderTop: '1px solid var(--stroke, #E5E7EB)',
    paddingTop: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  chatMsgUser: {
    alignSelf: 'flex-end',
    background: 'var(--brand, #2563EB)',
    color: '#fff',
    padding: '8px 12px',
    borderRadius: '12px',
    maxWidth: '80%',
  },
  chatMsgBot: {
    alignSelf: 'flex-start',
    background: 'var(--surface-muted, #F3F4F6)',
    color: 'var(--text-default, #1F2937)',
    padding: '8px 12px',
    border: '1px solid var(--stroke, #E5E7EB)',
    borderRadius: '12px',
    maxWidth: '80%',
  },
  chatRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '12px',
  },
  sendBtn: {
    height: '46px',
    padding: '0 14px',
    borderRadius: '12px',
    border: '1px solid var(--stroke, #E5E7EB)',
    background: 'var(--surface, #FFFFFF)',
    cursor: 'pointer',
    fontWeight: 600,
  },
  helperText: {
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    fontSize: '13px',
    color: 'var(--text-muted, #6B7280)',
    marginTop: '8px',
  },
  errorText: {
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    fontSize: '13px',
    color: '#DC2626',
    marginTop: '6px',
  },
};

/**
 * Utility hook for focus ring styling management.
 */
function useFocusRing() {
  const focusProps = useMemo(
    () => ({
      onFocus: (e) => {
        e.currentTarget.style.boxShadow = '0 0 0 3px var(--focus, #93C5FD)';
        e.currentTarget.style.borderColor = 'var(--brand, #2563EB)';
      },
      onBlur: (e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = 'var(--stroke, #E5E7EB)';
      },
    }),
    []
  );
  return focusProps;
}

/**
 * PUBLIC_INTERFACE
 * App - Main application root following the provided design notes and style guide.
 */
function App() {
  const [theme, setTheme] = useState('light');
  const [selectedTopic, setSelectedTopic] = useState('');

  // NEW: simple backend health status state for display
  const [backendStatus, setBackendStatus] = useState({
    loading: true,
    ok: false,
    message: 'Checking backend…',
    timestamp: null,
  });

  // NEW: chat state
  // Keeps the current input value, a list of messages, and request state flags.
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([]); // [{role: 'user'|'assistant', content: string}]
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState('');

  // Apply theme to the document element for CSS variables in App.css
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // NEW: On mount, call the backend /health endpoint using env-based API base.
  useEffect(() => {
    // Read the base URL from the CRA environment variable. See .env.example.
    const base = process.env.REACT_APP_API_BASE;
    if (!base) {
      // If not configured, inform the user in UI to set REACT_APP_API_BASE.
      setBackendStatus({
        loading: false,
        ok: false,
        message:
          'REACT_APP_API_BASE is not set. Create .env from .env.example and restart dev server.',
        timestamp: null,
      });
      return;
    }

    const controller = new AbortController();
    const url = `${base.replace(/\/+$/, '')}/health`; // ensure no trailing slash duplicates

    // Basic fetch with timeout handling
    const timeout = setTimeout(() => controller.abort(), 8000);

    fetch(url, { signal: controller.signal })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (res.ok) {
          setBackendStatus({
            loading: false,
            ok: true,
            message: data?.status ? `status: ${data.status}` : 'status: ok',
            timestamp: data?.timestamp || new Date().toISOString(),
          });
        } else {
          setBackendStatus({
            loading: false,
            ok: false,
            message: `Backend responded with ${res.status}`,
            timestamp: null,
          });
        }
      })
      .catch((err) => {
        const aborted = err?.name === 'AbortError';
        setBackendStatus({
          loading: false,
          ok: false,
          message: aborted
            ? 'Request to backend timed out.'
            : `Failed to reach backend: ${err?.message || 'unknown error'}`,
          timestamp: null,
        });
      })
      .finally(() => clearTimeout(timeout));

    // Cleanup abort on unmount
    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const focusRing = useFocusRing();

  const handleChipClick = (topic) => {
    setSelectedTopic((prev) => (prev === topic ? '' : topic));
  };

  const topics = ['History', 'Science', 'Art'];

  // PUBLIC_INTERFACE
  async function sendMessage() {
    /**
     * Sends the current chatInput to the backend POST /chat endpoint and appends
     * both the user message and the assistant reply into the messages array.
     *
     * Behavior:
     * - Validates non-empty input
     * - Shows loading state and clears previous error
     * - Reads API base from REACT_APP_API_BASE (must be set in .env)
     * - POSTs JSON: { message: "<user text>" }
     * - On 200 OK, expects { reply: "<assistant text>" }
     * - On error, sets chatError for UI display
     */
    const text = chatInput.trim();
    if (!text) return;

    const base = process.env.REACT_APP_API_BASE;
    if (!base) {
      setChatError('REACT_APP_API_BASE is not set. Please configure .env and restart the app.');
      return;
    }

    // Prepare optimistic UI update: show user's message immediately
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setChatLoading(true);
    setChatError('');
    setChatInput(''); // clear input field for better UX

    // Build request with timeout and proper headers
    const controller = new AbortController();
    const url = `${base.replace(/\/+$/, '')}/chat`;
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch(url, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        // Revert or show error; keep the user message already appended
        const reason =
          data?.error ||
          `Request failed with status ${res.status}`;
        throw new Error(reason);
      }

      const reply = typeof data?.reply === 'string' ? data.reply : '(No reply received)';
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setChatError(err?.message || 'Failed to send message');
    } finally {
      clearTimeout(timeout);
      setChatLoading(false);
    }
  }

  function handleInputKeyDown(e) {
    // Submit on Enter (without Shift) for quick chat interactions
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!chatLoading) {
        sendMessage();
      }
    }
  }

  return (
    <div className="App" style={styles.page}>
      <main style={styles.container} aria-label="Micro-Learning AI Tutor">
        {/* Top right theme toggle */}
        <div style={styles.topBar}>
          <button
            style={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.08)';
              e.currentTarget.style.background = 'var(--brand-hover, #1D4ED8)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.background = 'var(--brand, #2563EB)';
            }}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>

        {/* Header */}
        <header style={styles.header}>
          <h1 style={styles.h1}>Micro‑Learning AI Tutor</h1>
          <p style={styles.subtitle}>Learn any topic in 5-minute lessons</p>

          {/* NEW: Backend health status indicator */}
          <p
            style={{
              margin: 0,
              marginTop: '6px',
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
              fontSize: '13.5px',
              color: backendStatus.ok ? '#16A34A' : '#DC2626', // green or red
            }}
            aria-live="polite"
          >
            {backendStatus.loading
              ? 'Contacting backend…'
              : backendStatus.ok
              ? `Backend is reachable (${backendStatus.message})`
              : `Backend unreachable: ${backendStatus.message}`}
          </p>
        </header>

        {/* Illustration */}
        <div style={styles.illustrationWrap}>
          <div style={styles.illustrationCircle} aria-hidden="true">
            <span style={styles.illustrationEmoji} role="img" aria-label="Smiling student with graduation cap">
              🎓
            </span>
          </div>
        </div>

        {/* Cards */}
        <div style={styles.grid}>
          {/* Topic picker */}
          <section
            style={styles.card}
            aria-labelledby="topic-heading"
          >
            <h3 id="topic-heading" style={styles.sectionTitle}>
              Pick a topic
            </h3>
            <div style={styles.chipRow}>
              {topics.map((t) => {
                const selected = selectedTopic === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => handleChipClick(t)}
                    aria-pressed={selected}
                    style={{
                      ...styles.chip,
                      ...(selected ? styles.chipSelected : null),
                    }}
                    onMouseEnter={(e) => {
                      if (!selected) e.currentTarget.style.background = 'var(--surface-muted, #F3F4F6)';
                    }}
                    onMouseLeave={(e) => {
                      if (!selected) e.currentTarget.style.background = 'var(--chip-bg, #FFFFFF)';
                    }}
                    {...focusRing}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Daily quiz */}
          <section
            style={styles.card}
            aria-labelledby="quiz-heading"
          >
            <h3
              id="quiz-heading"
              style={{ ...styles.sectionTitle, ...styles.sectionTitleCaps }}
            >
              Daily Quiz
            </h3>
            <div style={styles.quizSub}>3 questions left</div>
            <button
              type="button"
              style={styles.button}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--brand-hover, #1D4ED8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--brand, #2563EB)';
              }}
              onFocus={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 3px var(--focus, #93C5FD)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
              aria-disabled={false}
            >
              Start Quiz
            </button>
          </section>

          {/* Chat section */}
          <section
            style={styles.card}
            aria-labelledby="chat-heading"
          >
            <h3
              id="chat-heading"
              style={{ ...styles.sectionTitle, ...styles.sectionTitleCaps }}
            >
              Chat with Einstein
            </h3>

            {/* Chat input row with send button */}
            <div style={styles.chatRow}>
              <input
                type="text"
                aria-label="Ask a question"
                placeholder="Ask a question"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={handleInputKeyDown}
                disabled={chatLoading}
                style={{
                  ...styles.input,
                  flex: 1,
                  opacity: chatLoading ? 0.9 : 1,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 0 3px var(--focus, #93C5FD)';
                  e.currentTarget.style.borderColor = 'var(--brand, #2563EB)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'var(--stroke, #E5E7EB)';
                }}
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={chatLoading || !chatInput.trim()}
                style={{
                  ...styles.sendBtn,
                  opacity: chatLoading || !chatInput.trim() ? 0.6 : 1,
                }}
                aria-label="Send message"
                onMouseEnter={(e) => {
                  if (!(chatLoading || !chatInput.trim())) {
                    e.currentTarget.style.background = 'var(--surface-muted, #F3F4F6)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--surface, #FFFFFF)';
                }}
              >
                {chatLoading ? 'Sending…' : 'Send'}
              </button>
            </div>

            {/* Helper text for users */}
            <div style={styles.helperText}>
              Press Enter to send. Messages are sent to POST /chat.
            </div>

            {/* Error state */}
            {chatError ? (
              <div role="alert" style={styles.errorText}>
                {chatError}
              </div>
            ) : null}

            {/* Chat messages area */}
            <div style={styles.chatArea} aria-live="polite">
              {messages.length === 0 && !chatLoading ? (
                <div style={styles.helperText}>No messages yet. Ask something like “What is AI?”</div>
              ) : null}

              {messages.map((m, idx) => (
                <div
                  key={`${m.role}-${idx}-${m.content.slice(0, 8)}`}
                  style={m.role === 'user' ? styles.chatMsgUser : styles.chatMsgBot}
                >
                  {m.content}
                </div>
              ))}

              {/* Loading placeholder for assistant while waiting */}
              {chatLoading ? (
                <div style={styles.chatMsgBot}>Thinking…</div>
              ) : null}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
