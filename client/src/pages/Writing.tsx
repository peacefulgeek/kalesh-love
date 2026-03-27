/*
 * KALESH.LOVE — Writing Page
 * "The Sacred Glow" — Devotional Luminism
 * Warm hero, golden-accented article listing with hover warmth.
 */

import { Link } from "wouter";
import { useEffect, useRef, useState } from "react";
import { articles } from "@/lib/articles";
import { usePageMeta } from "@/hooks/usePageMeta";

function useInView(threshold = 0.08) {
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

const HERO_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/6pnsQyMjNn93WhuPNnqKo4/sacred-book-candlelight-JFxC9ZXa3SsactezK2R4fx.webp';

function ArticleRow({ slug, title, subtitle, date, readingTime, excerpt, index }: {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readingTime: number;
  excerpt: string;
  index: number;
}) {
  const row = useInView();
  const [hovered, setHovered] = useState(false);

  const formatted = new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      ref={row.ref}
      style={{
        opacity: row.visible ? 1 : 0,
        transform: row.visible ? 'translateY(0)' : 'translateY(12px)',
        transition: `opacity 0.6s ease ${index * 0.04}s, transform 0.6s ease ${index * 0.04}s`,
      }}
    >
      <Link href={`/writing/${slug}`} style={{ textDecoration: 'none', display: 'block' }}>
        <article
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            padding: '2rem 1rem',
            borderBottom: '1px solid rgba(200, 149, 108, 0.15)',
            transition: 'all 0.4s ease',
            background: hovered ? 'rgba(200, 149, 108, 0.04)' : 'transparent',
            marginLeft: '-1rem',
            marginRight: '-1rem',
            borderRadius: '8px',
          }}
        >
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            <span
              style={{
                fontFamily: "var(--font-accent)",
                fontSize: '12px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
              }}
            >
              {formatted}
            </span>
            <span
              style={{
                fontFamily: "var(--font-accent)",
                fontSize: '12px',
                color: 'var(--earth-medium)',
                letterSpacing: '0.04em',
              }}
            >
              {readingTime} min read
            </span>
          </div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 'clamp(20px, 3vw, 26px)',
              fontWeight: 500,
              color: hovered ? 'var(--gold-dark)' : 'var(--earth)',
              marginBottom: '0.35rem',
              transition: 'color 0.4s ease',
              lineHeight: 1.3,
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-accent)",
              fontStyle: 'italic',
              fontSize: '15px',
              color: 'var(--gold)',
              marginBottom: '0.75rem',
            }}
          >
            {subtitle}
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: '15px',
              color: 'var(--earth-medium)',
              lineHeight: 1.65,
              maxWidth: '580px',
            }}
          >
            {excerpt.length > 160 ? excerpt.slice(0, 160).trim() + '…' : excerpt}
          </p>
        </article>
      </Link>
    </div>
  );
}

export default function Writing() {
  usePageMeta({
    title: 'Writing — Kalesh',
    description: 'Essays on consciousness, self-inquiry, the body\'s intelligence, and the architecture of perception. Two decades of contemplative inquiry.',
    ogImage: HERO_IMAGE,
    ogUrl: 'https://kalesh.love/writing',
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
            Writing
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
            Essays on consciousness, self-inquiry, and the architecture of awareness.
          </p>
        </div>
      </section>

      {/* Article listing */}
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
          <span className="meta-text">{articles.length} Essays</span>
          <div
            style={{
              flex: 1,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, var(--gold-light), transparent)',
              marginLeft: '1.5rem',
            }}
          />
        </div>

        {articles.map((article, i) => (
          <ArticleRow
            key={article.slug}
            slug={article.slug}
            title={article.title}
            subtitle={article.subtitle}
            date={article.date}
            readingTime={article.readingTime}
            excerpt={article.excerpt}
            index={i}
          />
        ))}
      </section>
    </div>
  );
}
