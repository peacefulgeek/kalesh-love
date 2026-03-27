/*
 * KALESH.LOVE — Books Page
 * "The Sacred Glow" — Devotional Luminism
 * Warm hero with lotus image, golden-accented book cards.
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

const HERO_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/6pnsQyMjNn93WhuPNnqKo4/lotus-golden-water-oP2AnZKKEU4KmZV54odWd9.webp';

const books = [
  {
    title: "Holy Shift",
    description: "A guide to navigating the profound shifts in consciousness that arrive uninvited and change everything.",
    link: "https://paulwagner.com",
  },
  {
    title: "Forensic Forgiveness",
    description: "An unflinching examination of forgiveness as a contemplative practice — not as absolution, but as liberation.",
    link: "https://paulwagner.com",
  },
  {
    title: "The Electric Rose",
    description: "A meditation on energy, healing, and the luminous architecture of the subtle body.",
    link: "https://paulwagner.com",
  },
  {
    title: "You're Spiritual But an Asshole",
    description: "A direct and necessary confrontation with the shadow side of spiritual seeking.",
    link: "https://paulwagner.com",
  },
  {
    title: "Setting Boundaries",
    description: "On the contemplative art of sacred separation — knowing where one ends and another begins.",
    link: "https://paulwagner.com",
  },
  {
    title: "Startup Confidential",
    description: "Lessons from the intersection of entrepreneurship and awareness — building something from nothing.",
    link: "https://paulwagner.com",
  },
  {
    title: "The Personality Oracle",
    description: "A system for understanding the patterns of personality through the lens of contemplative inquiry.",
    link: "https://thepersonalitycards.com",
  },
];

function BookCard({ title, description, link, index }: {
  title: string;
  description: string;
  link: string;
  index: number;
}) {
  const card = useInView();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={card.ref}
      style={{
        opacity: card.visible ? 1 : 0,
        transform: card.visible ? 'translateY(0)' : 'translateY(12px)',
        transition: `opacity 0.6s ease ${index * 0.06}s, transform 0.6s ease ${index * 0.06}s`,
      }}
    >
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none', display: 'block' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="warm-card"
          style={{
            padding: '2rem 2.25rem',
            marginBottom: '1.25rem',
            background: hovered ? 'rgba(200, 149, 108, 0.06)' : 'var(--cream)',
            transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
            {/* Book number */}
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: '36px',
                fontWeight: 300,
                color: 'var(--gold-light)',
                lineHeight: 1,
                minWidth: '36px',
                marginTop: '4px',
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <div style={{ flex: 1 }}>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 'clamp(20px, 3vw, 26px)',
                  fontWeight: 500,
                  color: hovered ? 'var(--gold-dark)' : 'var(--earth)',
                  marginBottom: '0.5rem',
                  lineHeight: 1.3,
                  transition: 'color 0.4s ease',
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
                  marginBottom: '0.75rem',
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
                  transition: 'color 0.3s',
                }}
              >
                Learn more &rarr;
              </span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default function Books() {
  usePageMeta({
    title: 'Books — Kalesh',
    description: 'Seven published works on awareness, karma, healing, and the architecture of the self. Two decades of contemplative inquiry.',
    ogImage: HERO_IMAGE,
    ogUrl: 'https://kalesh.love/books',
  });

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
              background: 'linear-gradient(to bottom, rgba(26, 21, 32, 0.35), rgba(26, 21, 32, 0.6))',
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
            Books
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
            Two decades of inquiry into consciousness, healing, and the human condition.
          </p>
        </div>
      </section>

      {/* Book cards */}
      <section
        style={{
          maxWidth: '740px',
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: 'clamp(2rem, 4vw, 4rem) 1.25rem clamp(4rem, 6vw, 6rem)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
          }}
        >
          <span className="meta-text">{books.length} Published Works</span>
          <div
            style={{
              flex: 1,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, var(--gold-light), transparent)',
              marginLeft: '1.5rem',
            }}
          />
        </div>

        {books.map((book, i) => (
          <BookCard
            key={book.title}
            title={book.title}
            description={book.description}
            link={book.link}
            index={i}
          />
        ))}
      </section>
    </div>
  );
}
