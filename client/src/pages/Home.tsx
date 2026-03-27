/*
 * KALESH.LOVE — Home Page
 * "The Folio" Archival Manuscript Aesthetic
 *
 * Full-viewport hero: "Kalesh" centered in IBM Plex Serif.
 * Below: three text blocks (Writing, Books, Practice).
 * Closing: contemplative quote in serif italic.
 * Cool white throughout. No warmth. Clean and open.
 */

import { Link } from "wouter";
import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function Home() {
  const block1 = useInView();
  const block2 = useInView();
  const block3 = useInView();
  const quote = useInView();
  const nav = useInView(0.1);

  return (
    <div>
      {/* Hero — full viewport */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem 1.25rem',
          position: 'relative',
        }}
      >
        <h1
          className="fade-in"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 'clamp(36px, 8vw, 56px)',
            fontWeight: 400,
            color: '#1A1A2E',
            marginBottom: '1rem',
            letterSpacing: '-0.01em',
          }}
        >
          Kalesh
        </h1>
        <p
          className="fade-in delay-200"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: '18px',
            color: '#5B6B7D',
            marginBottom: '1.5rem',
          }}
        >
          Consciousness Teacher & Writer
        </p>
        <p
          className="fade-in delay-400"
          style={{
            fontFamily: "var(--font-sans)",
            fontStyle: 'italic',
            fontSize: '16px',
            color: '#5B6B7D',
            maxWidth: '480px',
            textAlign: 'center',
            lineHeight: 1.6,
          }}
        >
          Exploring the intersection of ancient contemplative traditions
          and the science of awareness.
        </p>

        {/* Subtle scroll indicator */}
        <div
          className="fade-in delay-600"
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <div
            style={{
              width: '1px',
              height: '40px',
              backgroundColor: '#E0E0E0',
              animation: 'scrollPulse 2s ease-in-out infinite',
            }}
          />
          <style>{`
            @keyframes scrollPulse {
              0%, 100% { opacity: 0.3; }
              50% { opacity: 0.8; }
            }
          `}</style>
        </div>
      </section>

      {/* Home navigation links */}
      <div
        ref={nav.ref}
        style={{
          maxWidth: '660px',
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: '0 1.25rem 1rem',
          display: 'flex',
          justifyContent: 'center',
          gap: '1.5rem',
          opacity: nav.visible ? 1 : 0,
          transform: nav.visible ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}
      >
        <Link href="/about" className="nav-link">About</Link>
        <Link href="/writing" className="nav-link">Writing</Link>
        <Link href="/books" className="nav-link">Books</Link>
        <Link href="/connect" className="nav-link">Connect</Link>
      </div>

      <hr className="manuscript-rule" style={{ maxWidth: '660px', margin: '0 auto' }} />

      {/* Three text blocks — no cards, no borders, just text */}
      <section
        style={{
          maxWidth: '660px',
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: '6rem 1.25rem',
        }}
      >
        {/* Block 1: Writing */}
        <div
          ref={block1.ref}
          style={{
            marginBottom: '5rem',
            opacity: block1.visible ? 1 : 0,
            transform: block1.visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <Link href="/writing" style={{ textDecoration: 'none' }}>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 'clamp(28px, 5vw, 36px)',
                fontWeight: 400,
                color: '#1A1A2E',
                marginBottom: '1rem',
              }}
            >
              Writing
            </h2>
          </Link>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: '18px',
              color: '#5B6B7D',
              lineHeight: 1.7,
              marginBottom: '1rem',
            }}
          >
            Two decades of inquiry into how consciousness works and why it matters.
          </p>
          <Link
            href="/writing"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: '13px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase' as const,
              color: '#5B6B7D',
              textDecoration: 'none',
              borderBottom: '1px solid #E0E0E0',
              paddingBottom: '2px',
              transition: 'border-color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = '#5B6B7D')}
            onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = '#E0E0E0')}
          >
            Read essays
          </Link>
        </div>

        {/* Block 2: Books */}
        <div
          ref={block2.ref}
          style={{
            marginBottom: '5rem',
            opacity: block2.visible ? 1 : 0,
            transform: block2.visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
          }}
        >
          <Link href="/books" style={{ textDecoration: 'none' }}>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 'clamp(28px, 5vw, 36px)',
                fontWeight: 400,
                color: '#1A1A2E',
                marginBottom: '1rem',
              }}
            >
              Books
            </h2>
          </Link>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: '18px',
              color: '#5B6B7D',
              lineHeight: 1.7,
              marginBottom: '1rem',
            }}
          >
            Published works on awareness, karma, healing, and the architecture of the self.
          </p>
          <Link
            href="/books"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: '13px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase' as const,
              color: '#5B6B7D',
              textDecoration: 'none',
              borderBottom: '1px solid #E0E0E0',
              paddingBottom: '2px',
              transition: 'border-color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = '#5B6B7D')}
            onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = '#E0E0E0')}
          >
            View books
          </Link>
        </div>

        {/* Block 3: Practice */}
        <div
          ref={block3.ref}
          style={{
            marginBottom: '0',
            opacity: block3.visible ? 1 : 0,
            transform: block3.visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
          }}
        >
          <a href="https://paulwagner.com/sessions" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 'clamp(28px, 5vw, 36px)',
                fontWeight: 400,
                color: '#1A1A2E',
                marginBottom: '1rem',
              }}
            >
              Practice
            </h2>
          </a>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: '18px',
              color: '#5B6B7D',
              lineHeight: 1.7,
              marginBottom: '1rem',
            }}
          >
            Sessions and mentorship for those drawn to serious inner work.
          </p>
          <a
            href="https://paulwagner.com/sessions"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: '13px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase' as const,
              color: '#5B6B7D',
              textDecoration: 'none',
              borderBottom: '1px solid #E0E0E0',
              paddingBottom: '2px',
              transition: 'border-color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = '#5B6B7D')}
            onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = '#E0E0E0')}
          >
            Begin
          </a>
        </div>
      </section>

      {/* Closing quote */}
      <section
        ref={quote.ref}
        style={{
          maxWidth: '660px',
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: '4rem 1.25rem 6rem',
          textAlign: 'center',
          opacity: quote.visible ? 1 : 0,
          transform: quote.visible ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        <hr className="manuscript-rule" style={{ marginBottom: '4rem' }} />
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: 'italic',
            fontSize: 'clamp(18px, 3vw, 22px)',
            color: '#5B6B7D',
            lineHeight: 1.6,
          }}
        >
          The mind is not the enemy. The identification with it is.
        </p>
      </section>
    </div>
  );
}
