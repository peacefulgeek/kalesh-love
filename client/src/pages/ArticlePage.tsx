/*
 * KALESH.LOVE — Article Page
 * 660px reading column. Pull quotes in IBM Plex Serif italic
 * with slate blue left border. Reading time and date in Plex Mono.
 * Generous paragraph spacing. No drop-cap.
 */

import { useParams, Link, Redirect } from "wouter";
import { getArticleBySlug, articles } from "@/lib/articles";
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

function renderBody(body: string) {
  const paragraphs = body.split('\n\n').filter(p => p.trim());
  return paragraphs.map((p, i) => {
    const trimmed = p.trim();
    // Pull quote
    if (trimmed.startsWith('>>')) {
      const quoteText = trimmed.replace(/^>>?\s*/, '');
      return (
        <blockquote key={i} className="pull-quote">
          {quoteText}
        </blockquote>
      );
    }
    return (
      <p key={i} style={{ fontFamily: "var(--font-sans)", lineHeight: 1.75 }}>
        {trimmed}
      </p>
    );
  });
}

export default function ArticlePage() {
  const params = useParams<{ slug: string }>();
  const article = getArticleBySlug(params.slug || '');
  const hero = useInView();
  const content = useInView();

  if (!article) {
    return <Redirect to="/404" />;
  }

  const formattedDate = new Date(article.date + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Find adjacent articles for navigation
  const currentIndex = articles.findIndex(a => a.slug === article.slug);
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  return (
    <div>
      {/* Article header */}
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
        <div className="meta-text" style={{ marginBottom: '1.5rem', fontSize: '12px' }}>
          {formattedDate} — {article.readingTime} min read
        </div>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 'clamp(28px, 5vw, 42px)',
            fontWeight: 400,
            color: '#1A1A2E',
            marginBottom: '0.75rem',
            lineHeight: 1.2,
          }}
        >
          {article.title}
        </h1>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: 'italic',
            fontSize: '18px',
            color: '#5B6B7D',
            marginBottom: '2rem',
          }}
        >
          {article.subtitle}
        </p>
        <hr className="manuscript-rule" />
      </section>

      {/* Article body */}
      <section
        ref={content.ref}
        className="reading-column article-body"
        style={{
          paddingBottom: '4rem',
          opacity: content.visible ? 1 : 0,
          transform: content.visible ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s',
        }}
      >
        {renderBody(article.body)}
      </section>

      {/* Article navigation */}
      <section
        className="reading-column"
        style={{ paddingBottom: '6rem' }}
      >
        <hr className="manuscript-rule" style={{ marginBottom: '2rem' }} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '2rem',
            flexWrap: 'wrap',
          }}
        >
          {prevArticle ? (
            <Link
              href={`/writing/${prevArticle.slug}`}
              style={{ textDecoration: 'none', maxWidth: '45%' }}
            >
              <span className="meta-text" style={{ fontSize: '11px', display: 'block', marginBottom: '0.5rem' }}>
                Previous
              </span>
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: '16px',
                  color: '#1A1A2E',
                  lineHeight: 1.3,
                }}
              >
                {prevArticle.title}
              </span>
            </Link>
          ) : <div />}
          {nextArticle ? (
            <Link
              href={`/writing/${nextArticle.slug}`}
              style={{ textDecoration: 'none', textAlign: 'right', maxWidth: '45%', marginLeft: 'auto' }}
            >
              <span className="meta-text" style={{ fontSize: '11px', display: 'block', marginBottom: '0.5rem' }}>
                Next
              </span>
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: '16px',
                  color: '#1A1A2E',
                  lineHeight: 1.3,
                }}
              >
                {nextArticle.title}
              </span>
            </Link>
          ) : <div />}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link
            href="/writing"
            className="nav-link"
            style={{ fontSize: '12px' }}
          >
            All Essays
          </Link>
        </div>
      </section>
    </div>
  );
}
