/*
 * KALESH.LOVE — Writing Page
 * "The Sacred Glow" — Devotional Luminism
 * 2-column layout: article cards with hero images (left) + sticky sidebar with author photo/bio/links (right).
 */

import { Link } from "wouter";
import { useEffect, useRef, useState } from "react";
import { articles } from "@/lib/articles";
import { usePageMeta } from "@/hooks/usePageMeta";

const HERO_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/6pnsQyMjNn93WhuPNnqKo4/sacred-book-candlelight-JFxC9ZXa3SsactezK2R4fx.webp';
const KALESH_PHOTO = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/6pnsQyMjNn93WhuPNnqKo4/Paul3Black_c2570dbc.jpg';

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
        padding: '0.75rem 0.85rem',
        borderRadius: '8px',
        border: '1px solid rgba(200, 149, 108, 0.15)',
        background: hovered ? 'rgba(200, 149, 108, 0.06)' : 'transparent',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        marginBottom: '0.6rem',
      }}
    >
      <span style={{
        fontFamily: "var(--font-display)",
        fontSize: '14px',
        fontWeight: 500,
        color: hovered ? 'var(--gold-dark)' : 'var(--earth)',
        display: 'block',
        marginBottom: '0.15rem',
        transition: 'color 0.3s',
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: "var(--font-body)",
        fontSize: '12.5px',
        color: 'var(--earth-medium)',
        lineHeight: 1.4,
      }}>
        {description}
      </span>
    </a>
  );
}

function ArticleCard({ slug, title, subtitle, date, readingTime, excerpt, heroImage, index }: {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readingTime: number;
  excerpt: string;
  heroImage?: string;
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
        transition: `opacity 0.6s ease ${index * 0.03}s, transform 0.6s ease ${index * 0.03}s`,
      }}
    >
      <Link href={`/writing/${slug}`} style={{ textDecoration: 'none', display: 'block' }}>
        <article
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid rgba(200, 149, 108, 0.15)',
            background: 'var(--cream)',
            transition: 'all 0.4s ease',
            boxShadow: hovered ? '0 8px 32px rgba(200, 149, 108, 0.15)' : '0 2px 8px rgba(139, 107, 74, 0.04)',
            transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
            marginBottom: '1.5rem',
          }}
        >
          {/* Article hero image */}
          {heroImage && (
            <div style={{
              height: '200px',
              overflow: 'hidden',
            }}>
              <img
                src={heroImage}
                alt={title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s ease',
                  transform: hovered ? 'scale(1.04)' : 'scale(1)',
                }}
              />
            </div>
          )}

          {/* Card content */}
          <div style={{ padding: '1.25rem 1.5rem 1.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{
                fontFamily: "var(--font-accent)",
                fontSize: '12px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
              }}>
                {formatted}
              </span>
              <span style={{
                fontFamily: "var(--font-accent)",
                fontSize: '12px',
                color: 'var(--earth-medium)',
                letterSpacing: '0.04em',
              }}>
                {readingTime} min read
              </span>
            </div>
            <h3 style={{
              fontFamily: "var(--font-display)",
              fontSize: 'clamp(18px, 2.5vw, 22px)',
              fontWeight: 500,
              color: hovered ? 'var(--gold-dark)' : 'var(--earth)',
              marginBottom: '0.3rem',
              transition: 'color 0.4s ease',
              lineHeight: 1.3,
            }}>
              {title}
            </h3>
            <p style={{
              fontFamily: "var(--font-display)",
              fontStyle: 'italic',
              fontSize: '14px',
              color: 'var(--gold)',
              marginBottom: '0.65rem',
            }}>
              {subtitle}
            </p>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: '14px',
              color: 'var(--earth-medium)',
              lineHeight: 1.6,
            }}>
              {excerpt.length > 140 ? excerpt.slice(0, 140).trim() + '\u2026' : excerpt}
            </p>
          </div>
        </article>
      </Link>
    </div>
  );
}

export default function Writing() {
  usePageMeta({
    title: 'Writing \u2014 Kalesh',
    description: "Essays on consciousness, self-inquiry, the body's intelligence, and the architecture of perception. Two decades of contemplative inquiry.",
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

      {/* Two-column: Articles + Sidebar */}
      <section
        className="writing-two-col"
        style={{
          maxWidth: '1100px',
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: 'clamp(2rem, 4vw, 4rem) 1.25rem clamp(4rem, 6vw, 6rem)',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
        }}
      >
        {/* Left column — article cards */}
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
          }}>
            <span className="meta-text">{articles.length} Essays</span>
            <div style={{
              flex: 1,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, var(--gold-light), transparent)',
              marginLeft: '1.5rem',
            }} />
          </div>

          {articles.map((article, i) => (
            <ArticleCard
              key={article.slug}
              slug={article.slug}
              title={article.title}
              subtitle={article.subtitle}
              date={article.date}
              readingTime={article.readingTime}
              excerpt={article.excerpt}
              heroImage={article.heroImage}
              index={i}
            />
          ))}
        </div>

        {/* Right column — sticky sidebar */}
        <aside className="writing-sidebar" style={{
          position: 'sticky',
          top: '100px',
          alignSelf: 'start',
        }}>
          {/* Author photo + bio */}
          <div style={{
            textAlign: 'center',
            marginBottom: '1.5rem',
            padding: '1.5rem 1.25rem',
            background: 'linear-gradient(135deg, rgba(200, 149, 108, 0.06), rgba(245, 237, 224, 0.5))',
            borderRadius: '12px',
            border: '1px solid rgba(200, 149, 108, 0.12)',
          }}>
            <img
              src={KALESH_PHOTO}
              alt="Kalesh"
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                objectFit: 'cover',
                objectPosition: 'center 20%',
                border: '2px solid var(--gold-light)',
                marginBottom: '0.75rem',
              }}
            />
            <h4 style={{
              fontFamily: "var(--font-display)",
              fontSize: '17px',
              fontWeight: 500,
              color: 'var(--earth)',
              marginBottom: '0.35rem',
            }}>
              Kalesh
            </h4>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: '13px',
              color: 'var(--earth-medium)',
              lineHeight: 1.55,
              marginBottom: '0.75rem',
            }}>
              Consciousness teacher and contemplative practitioner. Two decades of inquiry across Vedantic philosophy, Buddhist psychology, and Taoist thought.
            </p>
            <Link
              href="/about"
              style={{
                fontFamily: "var(--font-accent)",
                fontSize: '12.5px',
                letterSpacing: '0.05em',
                color: 'var(--gold)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--gold-light)',
              }}
            >
              Read full bio &rarr;
            </Link>
          </div>

          {/* Links */}
          <div>
            <span style={{
              fontFamily: "var(--font-accent)",
              fontSize: '11px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              display: 'block',
              marginBottom: '0.65rem',
            }}>
              Explore
            </span>
            <SidebarLink
              href="https://theshankaraexperience.com"
              label="The Shankara Oracle"
              description="A contemplative tool for deep self-reflection"
            />
            <SidebarLink
              href="https://thepersonalitycards.com"
              label="The Personality Cards"
              description="Illuminating the patterns of your inner landscape"
            />
            <SidebarLink
              href="https://paulwagner.com/readings"
              label="Sessions & Readings"
              description="Private intuitive sessions and mentorship"
            />
          </div>
        </aside>
      </section>
    </div>
  );
}
