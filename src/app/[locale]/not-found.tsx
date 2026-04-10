import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--on-primary)' }}>
      <h1 style={{ fontSize: '6rem', margin: 0, opacity: 0.3 }}>404</h1>
      <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>Page introuvable / Page not found</p>
      <Link
        href="/fr"
        style={{
          display: 'inline-block',
          padding: '0.75rem 1.5rem',
          background: 'var(--brand-secondary-container)',
          color: 'var(--brand-primary)',
          borderRadius: '9999px',
          fontWeight: 600,
          textDecoration: 'none',
        }}
      >
        Accueil / Home
      </Link>
    </div>
  );
}
