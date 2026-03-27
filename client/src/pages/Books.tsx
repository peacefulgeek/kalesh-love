/*
 * KALESH.LOVE — Books Page
 * 7 book cards: cover image, title, one-line description, "Learn More" link.
 * Measured tone. Cool white background.
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

const books = [
  {
    title: "Holy Shift",
    description: "A guide to navigating the profound shifts in consciousness that arrive uninvited and change everything.",
    link: "https://paulwagner.com",
  },
  {
    title: "Forensic Forgiveness",
    description: "An unflinching examination of forgiveness as a contemplative practice — not as absolution, but as liberation.",
    link: "https://paulwagner.com",
  },
  {
    title: "The Electric Rose",
    description: "A meditation on energy, healing, and the luminous architecture of the subtle body.",
    link: "https://paulwagner.com",
  },
  {
    title: "You're Spiritual But an Asshole",
    description: "A direct and necessary confrontation with the shadow side of spiritual seeking.",
    link: "https://paulwagner.com",
  },
  {
    title: "Setting Boundaries",
    description: "On the contemplative art of sacred separation — knowing where one ends and another begins.",
    link: "https://paulwagner.com",
  },
  {
    title: "Startup Confidential",
    description: "Lessons from the intersection of entrepreneurship and awareness — building something from nothing.",
    link: "https://paulwagner.com",
  },
  {
    title: "The Personality Oracle",
    description: "A system for understanding the patterns of personality through the lens of contemplative inquiry.",
    link: "https://thepersonalitycards.com",
  },
];

function BookCard({ title, description, link, index }: {
  title: string;
  description: string;
  link: string;
  index: number;
}) {
  const card = useInView();

  return (
    <div
      ref={card.ref}
      style={{
        paddingBottom: '2.5rem',
        marginBottom: '2.5rem',
        borderBottom: '1px solid #E0E0E0',
        opacity: card.visible ? 1 : 0,
        transform: card.visible ? 'translateY(0)' : 'translateY(8px)',
        transition: `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`,
      }}
    >
      <h3
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: 'clamp(20px, 4vw, 26px)',
          fontWeight: 400,
          color: '#1A1A2E',
          marginBottom: '0.75rem',
          lineHeight: 1.3,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: '16px',
          color: '#5B6B7D',
          lineHeight: 1.65,
          marginBottom: '1rem',
        }}
      >
        {description}
      </p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: '13px',
          letterSpacing: '0.05em',
          textTransform: 'uppercase' as const,
          color: '#5B6B7D',
          textDecoration: 'none',
          borderBottom: '1px solid #E0E0E0',
          paddingBottom: '2px',
          transition: 'border-color 0.3s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = '#5B6B7D')}
        onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = '#E0E0E0')}
      >
        Learn more
      </a>
    </div>
  );
}

export default function Books() {
  const hero = useInView();
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
          Books
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
          These works span two decades of inquiry into consciousness, healing, and the human condition.
        </p>
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
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/6pnsQyMjNn93WhuPNnqKo4/morning-light-book-cRw2drxcyNtrCiiroTPsye.webp"
          alt="Morning light on an open book"
          style={{
            width: '100%',
            maxWidth: '500px',
            height: 'auto',
            filter: 'grayscale(100%) contrast(1.05)',
          }}
          loading="lazy"
        />
      </div>

      {/* Book list */}
      <section
        className="reading-column"
        style={{ paddingBottom: '4rem' }}
      >
        {books.map((book, i) => (
          <BookCard
            key={book.title}
            title={book.title}
            description={book.description}
            link={book.link}
            index={i}
          />
        ))}
      </section>
    </div>
  );
}
