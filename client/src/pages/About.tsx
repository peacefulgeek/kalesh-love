/*
 * KALESH.LOVE — About Page
 * "The Sacred Glow" — Devotional Luminism
 * Author photo centered, full bio, links to offerings below.
 */

import { useEffect, useRef, useState } from "react";
import { usePageMeta } from "@/hooks/usePageMeta";

const HERO_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/6pnsQyMjNn93WhuPNnqKo4/hands-light-prayer-2fEpto4VJ4y4pCyAS44hMh.webp';
const STONES_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/6pnsQyMjNn93WhuPNnqKo4/sacred-stones-warm-kumBbqKReuXb5LUzinSf2m.webp';
const KALESH_PHOTO = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/6pnsQyMjNn93WhuPNnqKo4/Paul3Black_c2570dbc.jpg';

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

function OfferingCard({ href, title, description }: { href: string; title: string; description: string }) {
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
        padding: '1.25rem 1.5rem',
        borderRadius: '10px',
        border: '1px solid rgba(200, 149, 108, 0.2)',
        background: hovered ? 'rgba(200, 149, 108, 0.06)' : 'var(--cream)',
        textDecoration: 'none',
        transition: 'all 0.4s ease',
        boxShadow: hovered ? '0 4px 20px rgba(200, 149, 108, 0.12)' : '0 2px 8px rgba(139, 107, 74, 0.04)',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
    >
      <span style={{
        fontFamily: "var(--font-display)",
        fontSize: '17px',
        fontWeight: 500,
        color: hovered ? 'var(--gold-dark)' : 'var(--earth)',
        display: 'block',
        marginBottom: '0.35rem',
        transition: 'color 0.3s',
      }}>
        {title}
      </span>
      <span style={{
        fontFamily: "var(--font-body)",
        fontSize: '14px',
        color: 'var(--earth-medium)',
        lineHeight: 1.55,
      }}>
        {description}
      </span>
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

  const photoSection = useInView();
  const section1 = useInView();
  const section2 = useInView();
  const section3 = useInView();
  const imageSection = useInView();
  const section4 = useInView();
  const linksSection = useInView();

  return (
    <div>
      {/* Hero — prayer hands with warm overlay */}
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

      {/* Author Photo — centered, medium size */}
      <div
        ref={photoSection.ref}
        style={{
          textAlign: 'center',
          padding: 'clamp(2.5rem, 5vw, 4rem) 1.25rem 0',
          opacity: photoSection.visible ? 1 : 0,
          transform: photoSection.visible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        <img
          src={KALESH_PHOTO}
          alt="Kalesh"
          style={{
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            objectFit: 'cover',
            objectPosition: 'center 20%',
            border: '3px solid var(--gold-light)',
            boxShadow: '0 8px 40px rgba(200, 149, 108, 0.2)',
          }}
        />
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: '28px',
          fontWeight: 500,
          color: 'var(--earth)',
          marginTop: '1.25rem',
          marginBottom: '0.25rem',
        }}>
          Kalesh
        </h2>
        <p style={{
          fontFamily: "var(--font-accent)",
          fontSize: '14px',
          letterSpacing: '0.06em',
          color: 'var(--gold)',
        }}>
          Consciousness Teacher &middot; Writer &middot; Contemplative Practitioner
        </p>
      </div>

      {/* Bio content */}
      <div className="reading-column" style={{ padding: 'clamp(2rem, 4vw, 3rem) 1.25rem' }}>
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
          height: '40vh',
          minHeight: '280px',
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
            marginBottom: '3rem',
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

      {/* Offerings / Links Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--cream-deep), var(--cream))',
          padding: 'clamp(3rem, 6vw, 5rem) 1.25rem',
        }}
      >
        <div
          ref={linksSection.ref}
          style={{
            maxWidth: '680px',
            marginLeft: 'auto',
            marginRight: 'auto',
            opacity: linksSection.visible ? 1 : 0,
            transform: linksSection.visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="meta-text" style={{ marginBottom: '0.75rem', display: 'block' }}>
              Explore
            </span>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: 'clamp(24px, 4vw, 32px)',
              fontWeight: 500,
              color: 'var(--earth)',
            }}>
              Continue the Inquiry
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
          }}>
            <OfferingCard
              href="https://theshankaraexperience.com"
              title="The Shankara Oracle"
              description="A contemplative tool for deep self-reflection, drawing from multiple wisdom traditions to illuminate the patterns of consciousness."
            />
            <OfferingCard
              href="https://thepersonalitycards.com"
              title="The Personality Cards"
              description="Illuminating the patterns of your inner landscape through an intuitive card system designed for self-understanding."
            />
            <OfferingCard
              href="https://paulwagner.com/readings"
              title="Sessions & Readings"
              description="Private intuitive sessions and spiritual mentorship for those drawn to serious, sustained inner work."
            />
            <OfferingCard
              href="https://paulwagner.com"
              title="PaulWagner.com"
              description="The primary teaching platform — articles, resources, and educational content on consciousness and contemplative practice."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
