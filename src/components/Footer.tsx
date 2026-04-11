interface FooterProps {
  locale: string;
  copyright: string;
  privacyLabel: string;
  termsLabel: string;
  legalNavLabel: string;
  variant?: 'site' | 'legal';
}

export default function Footer({
  locale,
  copyright,
  privacyLabel,
  termsLabel,
  legalNavLabel,
  variant = 'site',
}: FooterProps) {
  const year = new Date().getFullYear();
  const isLegal = variant === 'legal';

  return (
    <footer id={isLegal ? undefined : 'site-footer'} className={isLegal ? 'legal-footer' : undefined}>
      <div className="container footer__inner">
        <p className="footer__copyright">
          © {year} {copyright}
        </p>
        <nav className="footer__links" aria-label={legalNavLabel}>
          <a href={`/${locale}/privacy`} className="footer__link">{privacyLabel}</a>
          <a href={`/${locale}/terms`} className="footer__link">{termsLabel}</a>
        </nav>
      </div>
    </footer>
  );
}
