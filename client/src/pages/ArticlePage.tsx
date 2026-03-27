/*
 * KALESH.LOVE — Article Page
 * "The Sacred Glow" — Devotional Luminism
 * Warm reading experience with golden accents, pull quotes, and prev/next navigation.
 */

import { useParams, Link, Redirect } from "wouter";
import { getArticleBySlug, articles } from "@/lib/articles";
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

function renderBody(body: string) {
  const paragraphs = body.split('\n\n').filter(p => p.trim());
  return paragraphs.map((p, i) => {
    const trimmed = p.trim();
    if (trimmed.startsWith('>>')) {
      const quoteText = trimmed.replace(/^>>?\s*/, '');
      return (
        <blockquote key={i} className="pull-quote">
          {quoteText}
        </blockquote>
      );
    }
    return (
      <p key={i}>{trimmed}</p>
    );
  });
}

const ARTICLE_OG_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/6pnsQyMjNn93WhuPNnqKo4/sacred-book-candlelight-JFxC9ZXa3SsactezK2R4fx.webp';

export default function ArticlePage() {
  const params = useParams<{ slug: string }>();
  const article = getArticleBySlug(params.slug || '');

  usePageMeta({
    title: article ? `${article.title} — Kalesh` : 'Article — Kalesh',
    description: article ? article.subtitle : 'An essay on consciousness and contemplative practice.',
    ogImage: ARTICLE_OG_IMAGE,
    ogUrl: article ? `https://kalesh.love/writing/${article.slug}` : 'https://kalesh.love/writing',
  });

  const hero = useInView();
  const content = useInView();

  // Inject Article JSON-LD structured data
  useEffect(() => {
    if (!article) return;
    const id = 'article-jsonld';
    let script = document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.subtitle,
      image: ARTICLE_OG_IMAGE,
      datePublished: article.date,
      author: {
        '@type': 'Person',
        name: 'Kalesh',
        url: 'https://kalesh.love/about',
      },
      publisher: {
        '@type': 'Person',
        name: 'Kalesh',
        url: 'https://kalesh.love',
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://kalesh.love/writing/${article.slug}`,
      },
      wordCount: article.body.split(/\s+/).length,
    });
    return () => {
      script?.remove();
    };
  }, [article]);

  if (!article) {
    return <Redirect to="/404" />;
  }

  const formattedDate = new Date(article.date + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const currentIndex = articles.findIndex(a => a.slug === article.slug);
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  return (
    <div>
      {/* Article header — warm cream background with golden accents */}
      <section
        style={{
          background: 'linear-gradient(to bottom, var(--cream-deep), var(--cream))',
          padding: 'clamp(3rem, 6vw, 5rem) 1.25rem clamp(2rem, 4vw, 3rem)',
        }}
      >
        <div
          ref={hero.ref}
          style={{
            maxWidth: '680px',
            marginLeft: 'auto',
            marginRight: 'auto',
            opacity: hero.visible ? 1 : 0,
            transform: hero.visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          {/* Back to writing */}
          <Link
            href="/writing"
            style={{
              fontFamily: "var(--font-accent)",
              fontSize: '13px',
              letterSpacing: '0.06em',
              color: 'var(--gold)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '2rem',
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-dark)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--gold)')}
          >
            <span style={{ fontSize: '16px' }}>&larr;</span> All Essays
          </Link>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <span className="meta-text" style={{ fontSize: '12px' }}>
              {formattedDate}
            </span>
            <span
              style={{
                fontFamily: "var(--font-accent)",
                fontSize: '12px',
                letterSpacing: '0.06em',
                color: 'var(--earth-medium)',
              }}
            >
              {article.readingTime} min read
            </span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 'clamp(30px, 5vw, 44px)',
              fontWeight: 500,
              color: 'var(--earth)',
              marginBottom: '0.75rem',
              lineHeight: 1.2,
            }}
          >
            {article.title}
          </h1>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: 'italic',
              fontSize: 'clamp(16px, 2.5vw, 20px)',
              color: 'var(--gold)',
              marginBottom: '2rem',
            }}
          >
            {article.subtitle}
          </p>

          {/* Golden divider */}
          <div
            style={{
              height: '1px',
              background: 'linear-gradient(90deg, var(--gold), var(--gold-light), transparent)',
            }}
          />
        </div>
      </section>

      {/* Article body */}
      <section
        ref={content.ref}
        className="reading-column article-body"
        style={{
          padding: 'clamp(2rem, 4vw, 3rem) 1.25rem clamp(3rem, 6vw, 5rem)',
          opacity: content.visible ? 1 : 0,
          transform: content.visible ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
        }}
      >
        {renderBody(article.body)}
      </section>

      {/* Article navigation */}
      <section
        style={{
          maxWidth: '680px',
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: '0 1.25rem clamp(4rem, 6vw, 6rem)',
        }}
      >
        <div className="golden-rule" style={{ marginBottom: '2.5rem' }} />

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
                  fontFamily: "var(--font-display)",
                  fontSize: '16px',
                  color: 'var(--earth)',
                  lineHeight: 1.3,
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-dark)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--earth)')}
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
                  fontFamily: "var(--font-display)",
                  fontSize: '16px',
                  color: 'var(--earth)',
                  lineHeight: 1.3,
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-dark)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--earth)')}
              >
                {nextArticle.title}
              </span>
            </Link>
          ) : <div />}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/writing" className="warm-button" style={{ fontSize: '13px', padding: '0.65rem 1.75rem' }}>
            All Essays
          </Link>
        </div>
      </section>
    </div>
  );
}
