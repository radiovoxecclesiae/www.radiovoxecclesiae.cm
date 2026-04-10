import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, dictionaries, station } from '@/config';
import type { Locale } from '@/config';
import Header from '@/components/Header';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const dict = dictionaries[locale as Locale];

  return {
    title: dict.termsPageTitle,
    openGraph: {
      title: dict.termsPageTitle,
      url: `${station.canonicalUrl}/${locale}/terms`,
      type: 'website',
    },
  };
}

export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const dict = dictionaries[locale as Locale];

  return (
    <div className="legal-page-bg">
      <a href="#main-content" className="skip-link">{dict.skipLinkLabel}</a>

      <Header
        locale={locale as Locale}
        langToggleText={dict.langToggleText}
        langToggleLabel={dict.langToggleLabel}
        stationName={station.name}
      />

      <main id="main-content" className="legal-main">
        <div className="container">

          <div className="legal-page__header">
            <h1>{dict.termsTitle}</h1>
            <p className="legal-page__date">{dict.termsDate}</p>
          </div>

          <section className="legal-section" aria-labelledby="terms-sec1">
            <h2 id="terms-sec1">{dict.termsSec1Title}</h2>
            <p>{dict.termsSec1Body}</p>
          </section>

          <section className="legal-section" aria-labelledby="terms-sec2">
            <h2 id="terms-sec2">{dict.termsSec2Title}</h2>
            <p>{dict.termsSec2Body}</p>
          </section>

          <section className="legal-section" aria-labelledby="terms-sec3">
            <h2 id="terms-sec3">{dict.termsSec3Title}</h2>
            <p>{dict.termsSec3Body}</p>
          </section>

          <section className="legal-section" aria-labelledby="terms-sec4">
            <h2 id="terms-sec4">{dict.termsSec4Title}</h2>
            <p>{dict.termsSec4Body}</p>
          </section>

          <section className="legal-section" aria-labelledby="terms-sec5">
            <h2 id="terms-sec5">{dict.termsSec5Title}</h2>
            <p>{dict.termsSec5Body}</p>
            <a href={`mailto:${station.contact.email}`}>
              {station.contact.email}
            </a>
          </section>

        </div>
      </main>

      <footer id="site-footer" className="legal-footer">
        <div className="container footer__inner">
          <p className="footer__copyright">
            © {new Date().getFullYear()} {dict.footerCopyrightPrefix}
          </p>
          <nav className="footer__links" aria-label={locale === 'fr' ? 'Liens légaux' : 'Legal links'}>
            <a href={`/${locale}/privacy`} className="footer__link">{dict.footerPrivacy}</a>
            <a href={`/${locale}/terms`} className="footer__link">{dict.footerTerms}</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
