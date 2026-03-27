/*
 * KALESH.LOVE — Writing Page
 * Article listing. Simple list — no grid, no cards.
 * Title in IBM Plex Serif, excerpt in Sans, date in Mono.
 * One article per row. Clean and spacious. No images.
 */

import { Link } from "wouter";
import { articles } from "@/lib/articles";
import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.05) {
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

function ArticleRow({ slug, title, excerpt, date, readingTime, index }: {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: number;
  index: number;
}) {
  const row = useInView();
  const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      ref={row.ref}
      style={{
        paddingBottom: '2.5rem',
        marginBottom: '2.5rem',
        borderBottom: '1px solid #E0E0E0',
        opacity: row.visible ? 1 : 0,
        transform: row.visible ? 'translateY(0)' : 'translateY(8px)',
        transition: `opacity 0.5s ease ${index * 0.03}s, transform 0.5s ease ${index * 0.03}s`,
      }}
    >
      <div className="meta-text" style={{ marginBottom: '0.75rem', fontSize: '12px' }}>
        {formattedDate} — {readingTime} min read
      </div>
      <Link href={`/writing/${slug}`} style={{ textDecoration: 'none' }}>
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 'clamp(22px, 4vw, 28px)',
            fontWeight: 400,
            color: '#1A1A2E',
            marginBottom: '0.75rem',
            lineHeight: 1.3,
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#5B6B7D')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#1A1A2E')}
        >
          {title}
        </h2>
      </Link>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: '16px',
          color: '#5B6B7D',
          lineHeight: 1.65,
          maxWidth: '580px',
        }}
      >
        {excerpt}
      </p>
    </div>
  );
}

export default function Writing() {
  const hero = useInView();

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
          Writing
        </h1>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: '18px',
            color: '#5B6B7D',
            lineHeight: 1.7,
            marginBottom: '2rem',
          }}
        >
          Essays on consciousness, contemplative practice, and the nature of awareness.
        </p>
        <hr className="manuscript-rule" />
      </section>

      {/* Article list */}
      <section
        className="reading-column"
        style={{ paddingBottom: '4rem' }}
      >
        {articles.map((article, i) => (
          <ArticleRow
            key={article.slug}
            slug={article.slug}
            title={article.title}
            excerpt={article.excerpt}
            date={article.date}
            readingTime={article.readingTime}
            index={i}
          />
        ))}
      </section>
    </div>
  );
}
