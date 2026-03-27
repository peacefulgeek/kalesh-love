/*
 * KALESH.LOVE — About Page
 * Full bio of Kalesh. Third person.
 * Measured, intellectual, contemplative tone.
 * Natural links to PW, Shankara, Sovereign, Personality Cards.
 * B&W corridor image as atmospheric element.
 */

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

export default function About() {
  const hero = useInView();
  const bio1 = useInView();
  const bio2 = useInView();
  const bio3 = useInView();
  const bio4 = useInView();
  const img = useInView();

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
          About
        </h1>
        <hr className="manuscript-rule" />
      </section>

      {/* Atmospheric image */}
      <div
        ref={img.ref}
        className="reading-column"
        style={{
          marginBottom: '3rem',
          opacity: img.visible ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}
      >
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/6pnsQyMjNn93WhuPNnqKo4/empty-corridor-light-TPTKsvx3m9frR5mThJJ5fP.webp"
          alt="Morning light through a stone corridor"
          style={{
            width: '100%',
            maxWidth: '400px',
            height: 'auto',
            filter: 'grayscale(100%) contrast(1.05)',
            marginBottom: '0.5rem',
          }}
          loading="lazy"
        />
        <p className="meta-text" style={{ fontSize: '11px' }}>
          Contemplative spaces
        </p>
      </div>

      {/* Bio section 1 */}
      <section
        ref={bio1.ref}
        className="reading-column article-body"
        style={{
          paddingBottom: '2rem',
          opacity: bio1.visible ? 1 : 0,
          transform: bio1.visible ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}
      >
        <p style={{ fontFamily: "var(--font-sans)", lineHeight: 1.75 }}>
          Kalesh is a consciousness teacher, writer, and contemplative practitioner whose work spans more than two decades of sustained inquiry into the nature of awareness. His approach draws from the deep wells of Vedantic philosophy, Buddhist psychology, and Taoist thought — not as separate systems to be compared, but as converging tributaries of a single investigation into what it means to be fully present in a human life.
        </p>
        <p style={{ fontFamily: "var(--font-sans)", lineHeight: 1.75 }}>
          Trained in somatic modalities and nervous system regulation, Kalesh brings a rare integration of contemplative depth and embodied understanding to his teaching. His work does not separate the life of the mind from the intelligence of the body; rather, it insists that genuine transformation requires both. This integration — of ancient wisdom and contemporary neuroscience, of philosophical inquiry and felt experience — is the hallmark of his approach.
        </p>
      </section>

      {/* Bio section 2 */}
      <section
        ref={bio2.ref}
        className="reading-column article-body"
        style={{
          paddingBottom: '2rem',
          opacity: bio2.visible ? 1 : 0,
          transform: bio2.visible ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
        }}
      >
        <p style={{ fontFamily: "var(--font-sans)", lineHeight: 1.75 }}>
          As a writer and educator, Kalesh has dedicated himself to making the insights of the contemplative traditions accessible without diluting their depth. His essays explore consciousness, self-inquiry, karma, trauma, and the architecture of perception — always with the precision of a philosopher and the patience of a practitioner. Through{' '}
          <a href="https://paulwagner.com" target="_blank" rel="noopener noreferrer" className="prose-link">
            his primary teaching platform
          </a>, he offers sessions, mentorship, and educational resources for those drawn to serious inner work.
        </p>
        <p style={{ fontFamily: "var(--font-sans)", lineHeight: 1.75 }}>
          Kalesh is the creator of{' '}
          <a href="https://theshankaraexperience.com" target="_blank" rel="noopener noreferrer" className="prose-link">
            The Shankara Oracle
          </a>, a contemplative tool designed for deep self-reflection and inquiry. Drawing from multiple wisdom traditions, the oracle system offers a structured yet intuitive framework for those seeking to understand the patterns of their own consciousness. He has also developed{' '}
          <a href="https://thepersonalitycards.com" target="_blank" rel="noopener noreferrer" className="prose-link">
            The Personality Cards
          </a>, and{' '}
          <a href="https://sovereign.love" target="_blank" rel="noopener noreferrer" className="prose-link">
            his interactive app
          </a>{' '}
          extends these contemplative tools into the digital space.
        </p>
      </section>

      {/* Bio section 3 */}
      <section
        ref={bio3.ref}
        className="reading-column article-body"
        style={{
          paddingBottom: '2rem',
          opacity: bio3.visible ? 1 : 0,
          transform: bio3.visible ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
        }}
      >
        <p style={{ fontFamily: "var(--font-sans)", lineHeight: 1.75 }}>
          Over the course of his career, Kalesh has conducted more than ten thousand intuitive consultations, working with individuals navigating the complexities of inner transformation. His approach is neither prescriptive nor formulaic; it meets each person where they are, with the understanding that genuine insight cannot be imposed from outside but must be discovered within.
        </p>
        <p style={{ fontFamily: "var(--font-sans)", lineHeight: 1.75 }}>
          Before dedicating himself fully to contemplative work, Kalesh built a distinguished career in entertainment as a five-time Emmy Award-winning writer. That earlier life — with its demands for precision, narrative structure, and the ability to communicate complex ideas with clarity — continues to inform his teaching and writing. The discipline of craft, he has noted, is not so different from the discipline of attention.
        </p>
      </section>

      {/* Bio section 4 */}
      <section
        ref={bio4.ref}
        className="reading-column article-body"
        style={{
          paddingBottom: '6rem',
          opacity: bio4.visible ? 1 : 0,
          transform: bio4.visible ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s',
        }}
      >
        <p style={{ fontFamily: "var(--font-sans)", lineHeight: 1.75 }}>
          An ordained minister based in Colorado, Kalesh lives and works at the intersection of contemplative tradition and contemporary understanding. His writing, teaching, and oracle systems all share a single aim: to support the uncovering of awareness that is already present — not as an achievement to be reached, but as a reality to be recognized.
        </p>
      </section>
    </div>
  );
}
