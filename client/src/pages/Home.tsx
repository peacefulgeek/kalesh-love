/*
 * KALESH.LOVE — Home Page
 * "The Sacred Glow" — Devotional Luminism
 *
 * Full-viewport hero with mountain sunrise image.
 * Three immersive sections with background imagery.
 * Closing: contemplative quote over ocean sunset.
 * Every section radiates warmth, light, and presence.
 */

import { Link } from "wouter";
import { useEffect, useRef, useState } from "react";
import { usePageMeta } from "@/hooks/usePageMeta";

function useInView(threshold = 0.12) {
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

const IMAGES = {
  hero: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/6pnsQyMjNn93WhuPNnqKo4/mountain-sunrise-golden-VB9MVwkWxont5Ggxx3vuFA.webp',
  writing: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/6pnsQyMjNn93WhuPNnqKo4/sacred-book-candlelight-JFxC9ZXa3SsactezK2R4fx.webp',
  books: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/6pnsQyMjNn93WhuPNnqKo4/golden-forest-path-C5TxUDJHPnJwd4KnZiTKw2.webp',
  practice: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/6pnsQyMjNn93WhuPNnqKo4/meditation-golden-light-dRUWp8T7ggbJxXPGzQRwVy.webp',
  closing: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/6pnsQyMjNn93WhuPNnqKo4/ocean-golden-horizon-FZ3ZFNQrrkTiAyCBmV64qd.webp',
};

export default function Home() {
  usePageMeta({
    title: 'Kalesh — Consciousness Teacher & Writer',
    description: 'Exploring the intersection of ancient contemplative traditions and the science of awareness. Essays, books, and mentorship from a contemplative practitioner.',
    ogImage: IMAGES.hero,
    ogUrl: 'https://kalesh.love',
  });

  const intro = useInView();
  const writingSection = useInView();
  const booksSection = useInView();
  const practiceSection = useInView();
  const closingSection = useInView(0.2);

  return (
    <div>
      {/* ═══ HERO — Full viewport with mountain sunrise ═══ */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Background image */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src={IMAGES.hero}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 40%',
            }}
          />
          {/* Warm overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(26, 21, 32, 0.35) 0%, rgba(26, 21, 32, 0.15) 35%, rgba(26, 21, 32, 0.55) 100%)',
            }}
          />
        </div>

        {/* Hero content */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            textAlign: 'center',
            padding: '2rem 1.5rem',
          }}
        >
          <h1
            className="fade-in-up"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 'clamp(42px, 10vw, 72px)',
              fontWeight: 500,
              color: '#FDF8F0',
              marginBottom: '1rem',
              letterSpacing: '0.02em',
              textShadow: '0 2px 40px rgba(0,0,0,0.3)',
            }}
          >
            Kalesh
          </h1>
          <p
            className="fade-in-up delay-200"
            style={{
              fontFamily: "var(--font-accent)",
              fontSize: 'clamp(16px, 2.5vw, 20px)',
              color: 'var(--gold-light)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}
          >
            Consciousness Teacher & Writer
          </p>
          <p
            className="fade-in-up delay-400"
            style={{
              fontFamily: "var(--font-body)",
              fontStyle: 'italic',
              fontSize: 'clamp(15px, 2vw, 18px)',
              color: 'rgba(253, 248, 240, 0.8)',
              maxWidth: '520px',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.7,
            }}
          >
            Exploring the intersection of ancient contemplative traditions
            and the science of awareness.
          </p>

          {/* Navigation links */}
          <div
            className="fade-in-up delay-600"
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              marginTop: '3rem',
              flexWrap: 'wrap',
            }}
          >
            {[
              { href: '/about', label: 'About' },
              { href: '/writing', label: 'Writing' },
              { href: '/books', label: 'Books' },
              { href: '/connect', label: 'Connect' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{
                  fontFamily: "var(--font-accent)",
                  fontSize: '14px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(253, 248, 240, 0.7)',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  padding: '0.25rem 0',
                  borderBottom: '1px solid rgba(200, 149, 108, 0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--gold-light)';
                  e.currentTarget.style.borderBottomColor = 'var(--gold-light)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(253, 248, 240, 0.7)';
                  e.currentTarget.style.borderBottomColor = 'rgba(200, 149, 108, 0.3)';
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="fade-in delay-1000"
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: '1px',
              height: '48px',
              background: 'linear-gradient(to bottom, var(--gold-light), transparent)',
              animation: 'gentlePulse 3s ease-in-out infinite',
            }}
          />
        </div>
      </section>

      {/* ═══ INTRO TEXT — warm cream background ═══ */}
      <section
        ref={intro.ref}
        style={{
          padding: 'clamp(4rem, 8vw, 7rem) 1.5rem',
          textAlign: 'center',
          opacity: intro.visible ? 1 : 0,
          transform: intro.visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        <div style={{ maxWidth: '640px', marginLeft: 'auto', marginRight: 'auto' }}>
          <div
            style={{
              width: '40px',
              height: '1px',
              background: 'var(--gold)',
              margin: '0 auto 2.5rem',
            }}
          />
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 'clamp(18px, 2.5vw, 22px)',
              lineHeight: 1.8,
              color: 'var(--earth-light)',
            }}
          >
            For over two decades, Kalesh has explored the territory where ancient wisdom
            meets the living body — where Vedantic inquiry, Buddhist psychology, and the
            science of the nervous system converge into a single, intimate investigation
            of what it means to be fully awake in a human life.
          </p>
        </div>
      </section>

      {/* ═══ WRITING SECTION — with candlelight book image ═══ */}
      <section
        ref={writingSection.ref}
        style={{
          position: 'relative',
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          opacity: writingSection.visible ? 1 : 0,
          transition: 'opacity 1s ease',
        }}
      >
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src={IMAGES.writing}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, rgba(26, 21, 32, 0.8) 0%, rgba(26, 21, 32, 0.5) 50%, rgba(26, 21, 32, 0.3) 100%)',
            }}
          />
        </div>
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: '1100px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: 'clamp(3rem, 6vw, 5rem) 1.5rem',
            width: '100%',
          }}
        >
          <div style={{ maxWidth: '520px' }}>
            <span className="meta-text" style={{ color: 'var(--gold-light)', marginBottom: '1rem', display: 'block' }}>
              Essays
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontWeight: 500,
                color: 'var(--cream)',
                marginBottom: '1.5rem',
                lineHeight: 1.15,
              }}
            >
              Writing
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 'clamp(16px, 2vw, 19px)',
                color: 'rgba(253, 248, 240, 0.8)',
                lineHeight: 1.75,
                marginBottom: '2rem',
              }}
            >
              Two decades of inquiry into how consciousness works and why it matters.
              Essays on awareness, self-inquiry, the body's intelligence, and the
              architecture of perception.
            </p>
            <Link href="/writing" className="warm-button-light">
              Read Essays
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ BOOKS SECTION — warm cream with golden forest ═══ */}
      <section
        ref={booksSection.ref}
        style={{
          position: 'relative',
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          opacity: booksSection.visible ? 1 : 0,
          transition: 'opacity 1s ease',
        }}
      >
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src={IMAGES.books}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to left, rgba(26, 21, 32, 0.8) 0%, rgba(26, 21, 32, 0.5) 50%, rgba(26, 21, 32, 0.3) 100%)',
            }}
          />
        </div>
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: '1100px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: 'clamp(3rem, 6vw, 5rem) 1.5rem',
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <div style={{ maxWidth: '520px', textAlign: 'right' }}>
            <span className="meta-text" style={{ color: 'var(--gold-light)', marginBottom: '1rem', display: 'block' }}>
              Published Works
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontWeight: 500,
                color: 'var(--cream)',
                marginBottom: '1.5rem',
                lineHeight: 1.15,
              }}
            >
              Books
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 'clamp(16px, 2vw, 19px)',
                color: 'rgba(253, 248, 240, 0.8)',
                lineHeight: 1.75,
                marginBottom: '2rem',
              }}
            >
              Published works on awareness, karma, healing, and the architecture
              of the self. Seven books spanning two decades of contemplative inquiry.
            </p>
            <Link href="/books" className="warm-button-light">
              View Books
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ PRACTICE SECTION — meditation at golden lake ═══ */}
      <section
        ref={practiceSection.ref}
        style={{
          position: 'relative',
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          opacity: practiceSection.visible ? 1 : 0,
          transition: 'opacity 1s ease',
        }}
      >
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src={IMAGES.practice}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, rgba(26, 21, 32, 0.75) 0%, rgba(26, 21, 32, 0.4) 50%, rgba(26, 21, 32, 0.2) 100%)',
            }}
          />
        </div>
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: '1100px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: 'clamp(3rem, 6vw, 5rem) 1.5rem',
            width: '100%',
          }}
        >
          <div style={{ maxWidth: '520px' }}>
            <span className="meta-text" style={{ color: 'var(--gold-light)', marginBottom: '1rem', display: 'block' }}>
              Sessions & Mentorship
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontWeight: 500,
                color: 'var(--cream)',
                marginBottom: '1.5rem',
                lineHeight: 1.15,
              }}
            >
              Practice
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 'clamp(16px, 2vw, 19px)',
                color: 'rgba(253, 248, 240, 0.8)',
                lineHeight: 1.75,
                marginBottom: '2rem',
              }}
            >
              Sessions and mentorship for those drawn to serious inner work.
              A space for genuine inquiry, not spiritual performance.
            </p>
            <a
              href="https://paulwagner.com/sessions"
              target="_blank"
              rel="noopener noreferrer"
              className="warm-button-light"
            >
              Begin
            </a>
          </div>
        </div>
      </section>

      {/* ═══ CLOSING QUOTE — ocean golden horizon ═══ */}
      <section
        ref={closingSection.ref}
        style={{
          position: 'relative',
          minHeight: '50vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          opacity: closingSection.visible ? 1 : 0,
          transition: 'opacity 1.2s ease',
        }}
      >
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src={IMAGES.closing}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(26, 21, 32, 0.5)',
            }}
          />
        </div>
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            textAlign: 'center',
            padding: 'clamp(3rem, 6vw, 5rem) 1.5rem',
            maxWidth: '680px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '1px',
              background: 'var(--gold-light)',
              margin: '0 auto 2rem',
            }}
          />
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: 'italic',
              fontSize: 'clamp(22px, 3.5vw, 32px)',
              color: 'var(--cream)',
              lineHeight: 1.5,
              textShadow: '0 2px 20px rgba(0,0,0,0.3)',
            }}
          >
            The mind is not the enemy.<br />
            The identification with it is.
          </p>
          <div
            style={{
              width: '40px',
              height: '1px',
              background: 'var(--gold-light)',
              margin: '2rem auto 0',
            }}
          />
        </div>
      </section>
    </div>
  );
}
