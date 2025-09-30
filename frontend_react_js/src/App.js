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

  // Apply theme to the document element for CSS variables in App.css
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const focusRing = useFocusRing();

  const handleChipClick = (topic) => {
    setSelectedTopic((prev) => (prev === topic ? '' : topic));
  };

  const topics = ['History', 'Science', 'Art'];

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
            role="region"
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
            role="region"
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
            role="region"
          >
            <h3
              id="chat-heading"
              style={{ ...styles.sectionTitle, ...styles.sectionTitleCaps }}
            >
              Chat with Einstein
            </h3>
            <div style={{ marginTop: '12px' }}>
              <input
                type="text"
                aria-label="Ask a question"
                placeholder="Ask a question"
                style={styles.input}
                onFocus={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 0 3px var(--focus, #93C5FD)';
                  e.currentTarget.style.borderColor = 'var(--brand, #2563EB)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'var(--stroke, #E5E7EB)';
                }}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
