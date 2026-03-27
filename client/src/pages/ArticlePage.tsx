/*
 * KALESH.LOVE — Article Page
 * "The Sacred Glow" — Devotional Luminism
 * Full hero image, 2-column layout: article body (left) + sticky sidebar (right) with author photo, bio, links.
 */

import { useParams, Link, Redirect } from "wouter";
import { getArticleBySlug, articles } from "@/lib/articles";
import { useEffect, useRef, useState } from "react";
import { usePageMeta } from "@/hooks/usePageMeta";

const KALESH_PHOTO = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/6pnsQyMjNn93WhuPNnqKo4/Paul3Black_c2570dbc.jpg';

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

function SidebarLink({ href, label, description }: { href: string; label: string; description: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        padding: '0.85rem 1rem',
        borderRadius: '8px',
        border: '1px solid rgba(200, 149, 108, 0.15)',
        background: hovered ? 'rgba(200, 149, 108, 0.06)' : 'transparent',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        marginBottom: '0.65rem',
      }}
    >
      <span style={{
        fontFamily: "var(--font-display)",
        fontSize: '15px',
        fontWeight: 500,
        color: hovered ? 'var(--gold-dark)' : 'var(--earth)',
        display: 'block',
        marginBottom: '0.2rem',
        transition: 'color 0.3s',
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: "var(--font-body)",
        fontSize: '13px',
        color: 'var(--earth-medium)',
        lineHeight: 1.4,
      }}>
        {description}
      </span>
    </a>
  );
}

export default function ArticlePage() {
  const params = useParams<{ slug: string }>();
  const article = getArticleBySlug(params.slug || '');

  usePageMeta({
    title: article ? `${article.title} — Kalesh` : 'Article — Kalesh',
    description: article ? article.subtitle : 'An essay on consciousness and contemplative practice.',
    ogImage: article?.heroImage || KALESH_PHOTO,
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
      image: article.heroImage,
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
      {/* Full-width Hero Image */}
      <section
        ref={hero.ref}
        style={{
          position: 'relative',
          height: '55vh',
          minHeight: '380px',
          maxHeight: '550px',
          overflow: 'hidden',
          opacity: hero.visible ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}
      >
        <img
          src={article.heroImage}
          alt={article.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 40%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(26, 21, 32, 0.15) 0%, rgba(26, 21, 32, 0.55) 100%)',
          }}
        />
        {/* Title overlay on hero */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: 'clamp(2rem, 4vw, 3.5rem) clamp(1.5rem, 4vw, 3rem)',
          background: 'linear-gradient(to top, rgba(26, 21, 32, 0.7), transparent)',
        }}>
          <div style={{ maxWidth: '800px' }}>
            <Link
              href="/writing"
              style={{
                fontFamily: "var(--font-accent)",
                fontSize: '13px',
                letterSpacing: '0.08em',
                color: 'var(--gold-light)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1rem',
                textTransform: 'uppercase',
              }}
            >
              <span style={{ fontSize: '16px' }}>&larr;</span> All Essays
            </Link>
            <h1 style={{
              fontFamily: "var(--font-display)",
              fontSize: 'clamp(28px, 5vw, 44px)',
              fontWeight: 500,
              color: 'var(--cream)',
              marginBottom: '0.5rem',
              lineHeight: 1.2,
              textShadow: '0 2px 20px rgba(0,0,0,0.3)',
            }}>
              {article.title}
            </h1>
            <p style={{
              fontFamily: "var(--font-display)",
              fontStyle: 'italic',
              fontSize: 'clamp(15px, 2vw, 19px)',
              color: 'var(--gold-light)',
              marginBottom: '0.75rem',
            }}>
              {article.subtitle}
            </p>
            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
              <span style={{
                fontFamily: "var(--font-accent)",
                fontSize: '12px',
                letterSpacing: '0.06em',
                color: 'rgba(253, 248, 240, 0.7)',
              }}>
                {formattedDate}
              </span>
              <span style={{
                fontFamily: "var(--font-accent)",
                fontSize: '12px',
                letterSpacing: '0.06em',
                color: 'rgba(253, 248, 240, 0.7)',
              }}>
                {article.readingTime} min read
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Two-column layout: Article body + Sticky sidebar */}
      <section
        ref={content.ref}
        style={{
          maxWidth: '1100px',
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: 'clamp(2.5rem, 5vw, 4rem) 1.25rem clamp(3rem, 6vw, 5rem)',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          opacity: content.visible ? 1 : 0,
          transform: content.visible ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
        }}
        className="article-two-col"
      >
        {/* Left column — article body */}
        <div className="article-body" style={{ maxWidth: '680px' }}>
          {renderBody(article.body)}
        </div>

        {/* Right column — sticky sidebar */}
        <aside className="article-sidebar" style={{
          position: 'sticky',
          top: '100px',
          alignSelf: 'start',
        }}>
          {/* Author photo + bio */}
          <div style={{
            textAlign: 'center',
            marginBottom: '1.5rem',
            padding: '1.5rem',
            background: 'linear-gradient(135deg, rgba(200, 149, 108, 0.06), rgba(245, 237, 224, 0.5))',
            borderRadius: '12px',
            border: '1px solid rgba(200, 149, 108, 0.12)',
          }}>
            <img
              src={KALESH_PHOTO}
              alt="Kalesh"
              style={{
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                objectFit: 'cover',
                objectPosition: 'center 20%',
                border: '2px solid var(--gold-light)',
                marginBottom: '0.85rem',
              }}
            />
            <h4 style={{
              fontFamily: "var(--font-display)",
              fontSize: '18px',
              fontWeight: 500,
              color: 'var(--earth)',
              marginBottom: '0.4rem',
            }}>
              Kalesh
            </h4>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: '13.5px',
              color: 'var(--earth-medium)',
              lineHeight: 1.6,
              marginBottom: 0,
            }}>
              Consciousness teacher, writer, and contemplative practitioner. Two decades of inquiry across Vedantic philosophy, Buddhist psychology, and Taoist thought.
            </p>
          </div>

          {/* Links */}
          <div style={{ marginBottom: '1rem' }}>
            <span style={{
              fontFamily: "var(--font-accent)",
              fontSize: '11px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              display: 'block',
              marginBottom: '0.75rem',
            }}>
              Explore
            </span>
            <SidebarLink
              href="https://theshankaraexperience.com"
              label="The Shankara Oracle"
              description="A contemplative tool for deep self-reflection and inquiry"
            />
            <SidebarLink
              href="https://thepersonalitycards.com"
              label="The Personality Cards"
              description="Illuminating the patterns of your inner landscape"
            />
            <SidebarLink
              href="https://paulwagner.com/readings"
              label="Sessions & Readings"
              description="Private intuitive sessions and spiritual mentorship"
            />
          </div>

          {/* Link to About */}
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Link
              href="/about"
              style={{
                fontFamily: "var(--font-accent)",
                fontSize: '13px',
                letterSpacing: '0.06em',
                color: 'var(--gold)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--gold-light)',
                transition: 'border-color 0.3s',
              }}
            >
              Read full bio &rarr;
            </Link>
          </div>
        </aside>
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
