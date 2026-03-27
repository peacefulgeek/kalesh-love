/*
 * KALESH.LOVE — Connect Page
 * "The Sacred Glow" — Devotional Luminism
 * Warm hero with cosmic consciousness image, golden connect buttons.
 */

import { useEffect, useRef, useState } from "react";
import { usePageMeta } from "@/hooks/usePageMeta";

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

const HERO_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/6pnsQyMjNn93WhuPNnqKo4/cosmic-consciousness-aTuNVvWqko9EnXgEUyEPa8.webp';

const connections = [
  {
    title: 'Sessions & Mentorship',
    description: 'For those drawn to serious inner work — personal sessions, mentorship, and deeper inquiry.',
    label: 'Visit PaulWagner.com',
    href: 'https://paulwagner.com/sessions',
  },
  {
    title: 'The Shankara Oracle',
    description: 'A contemplative tool for deep self-reflection, drawing from multiple wisdom traditions.',
    label: 'Visit TheShankaraExperience.com',
    href: 'https://theshankaraexperience.com',
  },
  {
    title: 'Interactive Oracle App',
    description: 'Contemplative tools extended into the digital space — inquiry at your fingertips.',
    label: 'Visit Sovereign.love',
    href: 'https://sovereign.love',
  },
];

export default function Connect() {
  usePageMeta({
    title: 'Connect — Kalesh',
    description: 'Pathways to deeper inquiry and contemplative practice. Sessions, mentorship, and contemplative tools.',
    ogImage: HERO_IMAGE,
    ogUrl: 'https://kalesh.love/connect',
  });

  const section = useInView();

  return (
    <div>
      {/* Hero */}
      <section
        style={{
          position: 'relative',
          height: '50vh',
          minHeight: '350px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src={HERO_IMAGE}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(26, 21, 32, 0.4), rgba(26, 21, 32, 0.65))',
            }}
          />
        </div>
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '2rem 1.5rem' }}>
          <h1
            className="fade-in-up"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 'clamp(36px, 8vw, 56px)',
              fontWeight: 500,
              color: 'var(--cream)',
              marginBottom: '0.75rem',
              textShadow: '0 2px 30px rgba(0,0,0,0.3)',
            }}
          >
            Connect
          </h1>
          <p
            className="fade-in-up delay-200"
            style={{
              fontFamily: "var(--font-body)",
              fontStyle: 'italic',
              fontSize: 'clamp(15px, 2vw, 18px)',
              color: 'rgba(253, 248, 240, 0.8)',
              maxWidth: '480px',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.6,
            }}
          >
            Pathways to deeper inquiry and contemplative practice.
          </p>
        </div>
      </section>

      {/* Connection cards */}
      <section
        ref={section.ref}
        style={{
          maxWidth: '740px',
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: 'clamp(3rem, 6vw, 5rem) 1.25rem clamp(4rem, 6vw, 6rem)',
          opacity: section.visible ? 1 : 0,
          transform: section.visible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        {connections.map((item, i) => (
          <ConnectCard key={item.href} {...item} index={i} />
        ))}

        {/* Closing text */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '3rem',
            padding: '2rem 0',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '1px',
              background: 'var(--gold)',
              margin: '0 auto 2rem',
            }}
          />
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: 'italic',
              fontSize: 'clamp(16px, 2.5vw, 20px)',
              color: 'var(--earth-light)',
              lineHeight: 1.7,
              maxWidth: '480px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            The invitation is not to become something new,
            but to discover what has always been present.
          </p>
        </div>
      </section>
    </div>
  );
}

function ConnectCard({ title, description, label, href, index }: {
  title: string;
  description: string;
  label: string;
  href: string;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: 'none', display: 'block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="warm-card"
        style={{
          padding: '2.25rem 2.5rem',
          marginBottom: '1.5rem',
          background: hovered ? 'rgba(200, 149, 108, 0.06)' : 'var(--cream)',
          transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        }}
      >
        <span className="meta-text" style={{ display: 'block', marginBottom: '0.75rem', fontSize: '11px' }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 'clamp(22px, 3vw, 28px)',
            fontWeight: 500,
            color: hovered ? 'var(--gold-dark)' : 'var(--earth)',
            marginBottom: '0.5rem',
            transition: 'color 0.4s ease',
            lineHeight: 1.3,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: '15px',
            color: 'var(--earth-medium)',
            lineHeight: 1.65,
            marginBottom: '1rem',
          }}
        >
          {description}
        </p>
        <span
          style={{
            fontFamily: "var(--font-accent)",
            fontSize: '13px',
            letterSpacing: '0.06em',
            color: 'var(--gold)',
          }}
        >
          {label} &rarr;
        </span>
      </div>
    </a>
  );
}
