/*
 * KALESH.LOVE — 404 Page
 * "The Sacred Glow" — Devotional Luminism
 */

import { Link } from "wouter";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 1.5rem',
        textAlign: 'center',
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: '72px',
          fontWeight: 300,
          color: 'var(--gold-light)',
          lineHeight: 1,
          marginBottom: '1rem',
        }}
      >
        404
      </span>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 'clamp(24px, 4vw, 36px)',
          fontWeight: 500,
          color: 'var(--earth)',
          marginBottom: '1rem',
        }}
      >
        This path does not lead here
      </h1>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: '16px',
          color: 'var(--earth-medium)',
          lineHeight: 1.7,
          maxWidth: '400px',
          marginBottom: '2.5rem',
        }}
      >
        The page you are looking for has moved, or perhaps it was never here to begin with.
      </p>
      <Link href="/" className="warm-button">
        Return Home
      </Link>
    </div>
  );
}
