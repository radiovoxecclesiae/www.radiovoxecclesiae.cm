interface FooterProps {
  locale: string;
  copyright: string;
  privacyLabel: string;
  termsLabel: string;
  className?: string;
}

export default function Footer({ locale, copyright, privacyLabel, termsLabel, className = '#site-footer' }: FooterProps) {
  const year = new Date().getFullYear();
  const id = className === 'legal-footer' ? undefined : 'site-footer';

  return (
    <footer id={id} className={className === 'legal-footer' ? 'legal-footer' : undefined}>
      <div className="container footer__inner">
        <p className="footer__copyright">
          © {year} {copyright}
        </p>
        <nav className="footer__links" aria-label="Liens légaux">
          <a href={`/${locale}/privacy`} className="footer__link">{privacyLabel}</a>
          <a href={`/${locale}/terms`} className="footer__link">{termsLabel}</a>
        </nav>
      </div>
    </footer>
  );
}
