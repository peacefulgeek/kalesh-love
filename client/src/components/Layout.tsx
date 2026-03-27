/*
 * KALESH.LOVE — Layout Component
 * "The Folio" Archival Manuscript Aesthetic
 * 
 * Minimal top navigation with IBM Plex Mono links.
 * No hamburger menu — just words. Clean, precise, unhurried.
 */

import { Link, useLocation } from "wouter";
import { useEffect, type ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const isHome = location === "/";

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAFBFC' }}>
      {/* Navigation — minimal, precise */}
      {!isHome && (
        <nav
          className="fade-in"
          style={{
            padding: '2rem 1.25rem',
            maxWidth: '660px',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            <Link href="/" style={{ textDecoration: 'none' }}>
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: '20px',
                  color: '#1A1A2E',
                  fontWeight: 400,
                }}
              >
                Kalesh
              </span>
            </Link>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <Link href="/about" className="nav-link">
                About
              </Link>
              <Link href="/writing" className="nav-link">
                Writing
              </Link>
              <Link href="/books" className="nav-link">
                Books
              </Link>
              <Link href="/connect" className="nav-link">
                Connect
              </Link>
            </div>
          </div>
        </nav>
      )}

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer — barely there */}
      <footer
        style={{
          maxWidth: '660px',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '100%',
          padding: '3rem 1.25rem',
        }}
      >
        <hr className="manuscript-rule" style={{ marginBottom: '2rem' }} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <span className="meta-text" style={{ fontSize: '11px' }}>
            Kalesh
          </span>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <Link href="/about" className="nav-link" style={{ fontSize: '11px' }}>
              About
            </Link>
            <Link href="/writing" className="nav-link" style={{ fontSize: '11px' }}>
              Writing
            </Link>
            <Link href="/books" className="nav-link" style={{ fontSize: '11px' }}>
              Books
            </Link>
            <Link href="/connect" className="nav-link" style={{ fontSize: '11px' }}>
              Connect
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
