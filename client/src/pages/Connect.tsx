/*
 * KALESH.LOVE — Connect Page
 * Simple. No contact form. No email capture.
 * Three buttons. Cool white background. Slate blue button borders.
 * Clean, precise, unhurried.
 */

import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.1) {
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

function ConnectButton({ label, href, delay }: { label: string; href: string; delay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'block',
        fontFamily: "var(--font-mono)",
        fontSize: '14px',
        letterSpacing: '0.05em',
        textTransform: 'uppercase' as const,
        color: hovered ? '#1A1A2E' : '#5B6B7D',
        textDecoration: 'none',
        border: `1px solid ${hovered ? '#5B6B7D' : '#E0E0E0'}`,
        padding: '1rem 2rem',
        textAlign: 'center' as const,
        transition: 'all 0.3s ease',
        transitionDelay: `${delay}s`,
        backgroundColor: hovered ? 'rgba(91, 107, 125, 0.04)' : 'transparent',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </a>
  );
}

export default function Connect() {
  const hero = useInView();
  const links = useInView();
  const img = useInView();

  return (
    <div>
      {/* Page title */}
      <section
        ref={hero.ref}
        className="reading-column"
        style={{
          paddingTop: '2rem',
          paddingBottom: '3rem',
          opacity: hero.visible ? 1 : 0,
          transform: hero.visible ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 'clamp(32px, 6vw, 48px)',
            fontWeight: 400,
            color: '#1A1A2E',
            marginBottom: '1rem',
          }}
        >
          Connect
        </h1>
        <hr className="manuscript-rule" />
      </section>

      {/* Connection links */}
      <section
        ref={links.ref}
        className="reading-column"
        style={{
          paddingBottom: '4rem',
          opacity: links.visible ? 1 : 0,
          transform: links.visible ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
        }}
      >
        <div style={{ marginBottom: '3rem' }}>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: '18px',
              color: '#5B6B7D',
              lineHeight: 1.7,
              marginBottom: '1.5rem',
            }}
          >
            For sessions, mentorship, and deeper work:
          </p>
          <ConnectButton
            label="Visit PaulWagner.com"
            href="https://paulwagner.com/sessions"
            delay={0}
          />
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: '18px',
              color: '#5B6B7D',
              lineHeight: 1.7,
              marginBottom: '1.5rem',
            }}
          >
            To explore The Shankara Oracle:
          </p>
          <ConnectButton
            label="Visit TheShankaraExperience.com"
            href="https://theshankaraexperience.com"
            delay={0}
          />
        </div>

        <div>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: '18px',
              color: '#5B6B7D',
              lineHeight: 1.7,
              marginBottom: '1.5rem',
            }}
          >
            To explore the interactive oracle app:
          </p>
          <ConnectButton
            label="Visit Sovereign.love"
            href="https://sovereign.love"
            delay={0}
          />
        </div>
      </section>

      {/* Atmospheric image */}
      <div
        ref={img.ref}
        className="reading-column"
        style={{
          paddingBottom: '6rem',
          opacity: img.visible ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}
      >
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/6pnsQyMjNn93WhuPNnqKo4/single-stone-negative-space-hPRMw8xvZsMK3PeL2fsMTV.webp"
          alt="A single stone in negative space"
          style={{
            width: '100%',
            maxWidth: '400px',
            height: 'auto',
            filter: 'grayscale(100%) contrast(1.05)',
          }}
          loading="lazy"
        />
      </div>
    </div>
  );
}
