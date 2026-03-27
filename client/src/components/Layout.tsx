/*
 * KALESH.LOVE — Layout Component
 * "The Sacred Glow" — Devotional Luminism
 * Warm navigation, golden accents, temple-like atmosphere.
 */

import { Link, useLocation } from "wouter";
import { useEffect, useState, type ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location === "/";

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--cream)' }}>
      {/* Subtle grain texture */}
      <div className="grain-overlay" />

      {/* Navigation */}
      {!isHome && (
        <nav
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            padding: '1.25rem 1.5rem',
            backgroundColor: scrolled ? 'rgba(253, 248, 240, 0.92)' : 'transparent',
            backdropFilter: scrolled ? 'blur(12px)' : 'none',
            transition: 'all 0.5s ease',
            borderBottom: scrolled ? '1px solid rgba(200, 149, 108, 0.15)' : '1px solid transparent',
          }}
        >
          <div
            style={{
              maxWidth: '1100px',
              marginLeft: 'auto',
              marginRight: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Link href="/" style={{ textDecoration: 'none' }}>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: '22px',
                  color: 'var(--earth)',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                }}
              >
                Kalesh
              </span>
            </Link>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              {[
                { href: '/about', label: 'About' },
                { href: '/writing', label: 'Writing' },
                { href: '/books', label: 'Books' },
                { href: '/connect', label: 'Connect' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="nav-link"
                  style={{
                    color: location === href ? 'var(--gold)' : undefined,
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      )}

      {/* Main content */}
      <main style={{ flex: 1 }}>
        {children}
      </main>

      {/* Footer — warm, grounded */}
      <footer
        style={{
          backgroundColor: 'var(--twilight)',
          padding: '4rem 1.5rem 3rem',
          marginTop: isHome ? 0 : '4rem',
        }}
      >
        <div
          style={{
            maxWidth: '1100px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          {/* Golden divider */}
          <div
            style={{
              height: '1px',
              background: 'linear-gradient(90deg, transparent, var(--gold-light), transparent)',
              marginBottom: '2.5rem',
              opacity: 0.4,
            }}
          />

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1.5rem',
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: '18px',
                  color: 'var(--gold-light)',
                  fontWeight: 400,
                }}
              >
                Kalesh
              </span>
              <p
                style={{
                  fontFamily: "var(--font-accent)",
                  fontSize: '13px',
                  color: 'rgba(253, 248, 240, 0.45)',
                  marginTop: '0.5rem',
                  letterSpacing: '0.03em',
                }}
              >
                Consciousness Teacher & Writer
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1.75rem' }}>
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
                    fontSize: '13px',
                    letterSpacing: '0.05em',
                    color: 'rgba(253, 248, 240, 0.5)',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-light)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(253, 248, 240, 0.5)')}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
