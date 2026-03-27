import { Link } from "wouter";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 1.25rem',
        textAlign: 'center',
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: '48px',
          fontWeight: 400,
          color: '#1A1A2E',
          marginBottom: '1rem',
        }}
      >
        404
      </h1>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: '18px',
          color: '#5B6B7D',
          marginBottom: '2rem',
        }}
      >
        This page does not exist.
      </p>
      <Link
        href="/"
        className="nav-link"
      >
        Return home
      </Link>
    </div>
  );
}
