/*
 * KALESH.LOVE — About Page
 * "The Sacred Glow" — Devotional Luminism
 * Warm hero with prayer hands image, rich bio in warm tones.
 */

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

const HERO_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/6pnsQyMjNn93WhuPNnqKo4/hands-light-prayer-2fEpto4VJ4y4pCyAS44hMh.webp';
const STONES_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/6pnsQyMjNn93WhuPNnqKo4/sacred-stones-warm-kumBbqKReuXb5LUzinSf2m.webp';

function ProseLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: 'var(--gold)',
        textDecoration: 'none',
        borderBottom: '1px solid var(--gold-light)',
        transition: 'border-color 0.3s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = 'var(--gold)')}
      onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = 'var(--gold-light)')}
    >
      {children}
    </a>
  );
}

export default function About() {
  usePageMeta({
    title: 'About Kalesh — Consciousness Teacher & Writer',
    description: 'Two decades of contemplative practice across Vedantic philosophy, Buddhist psychology, and Taoism. Writer, educator, and creator of The Shankara Oracle.',
    ogImage: HERO_IMAGE,
    ogUrl: 'https://kalesh.love/about',
  });

  const section1 = useInView();
  const section2 = useInView();
  const section3 = useInView();
  const imageSection = useInView();
  const section4 = useInView();

  return (
    <div>
      {/* Hero — prayer hands with warm overlay */}
      <section
        style={{
          position: 'relative',
          height: '55vh',
          minHeight: '380px',
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
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(26, 21, 32, 0.4), rgba(26, 21, 32, 0.6))',
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
            About
          </h1>
          <p
            className="fade-in-up delay-200"
            style={{
              fontFamily: "var(--font-accent)",
              fontSize: '14px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--gold-light)',
            }}
          >
            A Life of Contemplative Inquiry
          </p>
        </div>
      </section>

      {/* Bio content */}
      <div className="reading-column" style={{ padding: 'clamp(3rem, 6vw, 5rem) 1.25rem' }}>
        {/* Section 1 */}
        <div
          ref={section1.ref}
          className="article-body"
          style={{
            opacity: section1.visible ? 1 : 0,
            transform: section1.visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
            marginBottom: '2.5rem',
          }}
        >
          <p>
            Kalesh is a consciousness teacher, writer, and contemplative practitioner whose work
            spans more than two decades of sustained inquiry into the nature of awareness. His
            approach draws from the deep wells of Vedantic philosophy, Buddhist psychology, and
            Taoist thought — not as separate systems to be compared, but as converging tributaries
            of a single investigation into what it means to be fully present in a human life.
          </p>
          <p>
            Trained in somatic modalities and nervous system regulation, Kalesh brings a rare
            integration of contemplative depth and embodied understanding to his teaching. His
            work does not separate the life of the mind from the intelligence of the body; rather,
            it insists that genuine transformation requires both. This integration — of ancient
            wisdom and contemporary neuroscience, of philosophical inquiry and felt experience —
            is the hallmark of his approach.
          </p>
        </div>

        {/* Section 2 */}
        <div
          ref={section2.ref}
          className="article-body"
          style={{
            opacity: section2.visible ? 1 : 0,
            transform: section2.visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
            marginBottom: '2.5rem',
          }}
        >
          <p>
            As a writer and educator, Kalesh has dedicated himself to making the insights of the
            contemplative traditions accessible without diluting their depth. His essays explore
            consciousness, self-inquiry, karma, trauma, and the architecture of perception — always
            with the precision of a philosopher and the patience of a practitioner. Through{' '}
            <ProseLink href="https://paulwagner.com">his primary teaching platform</ProseLink>,
            he offers sessions, mentorship, and educational resources for those drawn to
            serious inner work.
          </p>
        </div>

        {/* Pull quote */}
        <blockquote className="pull-quote">
          The deepest transformation does not come from acquiring new knowledge,
          but from the willingness to meet what is already here with an open and
          undefended heart.
        </blockquote>

        {/* Section 3 */}
        <div
          ref={section3.ref}
          className="article-body"
          style={{
            opacity: section3.visible ? 1 : 0,
            transform: section3.visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
            marginBottom: '2.5rem',
          }}
        >
          <p>
            Kalesh is the creator of{' '}
            <ProseLink href="https://theshankaraexperience.com">The Shankara Oracle</ProseLink>,
            a contemplative tool designed for deep self-reflection and inquiry. Drawing from
            multiple wisdom traditions, the oracle system offers a structured yet intuitive framework
            for those seeking to understand the patterns of their own consciousness. He has also
            developed{' '}
            <ProseLink href="https://thepersonalitycards.com">The Personality Cards</ProseLink>,
            and{' '}
            <ProseLink href="https://sovereign.love">his interactive app</ProseLink>{' '}
            extends these contemplative tools into the digital space.
          </p>
        </div>
      </div>

      {/* Full-width image break — sacred stones */}
      <div
        ref={imageSection.ref}
        style={{
          position: 'relative',
          height: '45vh',
          minHeight: '300px',
          overflow: 'hidden',
          opacity: imageSection.visible ? 1 : 0,
          transition: 'opacity 1s ease',
        }}
      >
        <img
          src={STONES_IMAGE}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(253, 248, 240, 0.05), rgba(26, 21, 32, 0.2))',
          }}
        />
      </div>

      {/* Continued bio */}
      <div className="reading-column" style={{ padding: 'clamp(3rem, 6vw, 5rem) 1.25rem' }}>
        <div
          ref={section4.ref}
          className="article-body"
          style={{
            opacity: section4.visible ? 1 : 0,
            transform: section4.visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <p>
            Over the course of more than 10,000 intuitive consultations, Kalesh has developed
            a deep understanding of the patterns that shape human consciousness. His background
            includes a distinguished career as a 5-Time Emmy Award-Winning writer in entertainment,
            a path that cultivated his ability to articulate the subtleties of inner experience
            with precision and clarity.
          </p>
          <p>
            An ordained minister based in Colorado, Kalesh brings to his work the quiet authority
            of someone who has lived what he teaches. His approach is neither dogmatic nor
            performative — it is the natural expression of a life devoted to understanding the
            nature of awareness itself. His teaching does not ask you to believe anything; it
            invites you to look, to feel, to discover what is already present beneath the noise
            of the conditioned mind.
          </p>
        </div>
      </div>
    </div>
  );
}
