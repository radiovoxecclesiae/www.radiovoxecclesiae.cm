import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center" style={{ color: 'var(--on-primary)' }}>
      <h1 className="text-9xl font-bold opacity-30 m-0">404</h1>
      <p className="text-xl mb-8">Page introuvable / Page not found</p>
      <Link
        href="/"
        className="inline-block px-6 py-3 rounded-full font-semibold no-underline"
        style={{ background: 'var(--brand-secondary-container)', color: 'var(--brand-primary)' }}
      >
        Accueil / Home
      </Link>
    </div>
  );
}
