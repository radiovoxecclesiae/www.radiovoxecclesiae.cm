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
    title: dict.privacyPageTitle,
    openGraph: {
      title: dict.privacyPageTitle,
      url: `${station.canonicalUrl}/${locale}/privacy`,
      type: 'website',
    },
  };
}

export default async function PrivacyPage({ params }: PageProps) {
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
            <h1>{dict.privacyTitle}</h1>
            <p className="legal-page__date">{dict.privacyDate}</p>
          </div>

          <section className="legal-section" aria-labelledby="privacy-sec1">
            <h2 id="privacy-sec1">{dict.privacySec1Title}</h2>
            <p>{dict.privacySec1Body}</p>
            <ul>
              {dict.privacySec1Items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="legal-section" aria-labelledby="privacy-sec2">
            <h2 id="privacy-sec2">{dict.privacySec2Title}</h2>
            <p>{dict.privacySec2Body}</p>
          </section>

          <section className="legal-section" aria-labelledby="privacy-sec3">
            <h2 id="privacy-sec3">{dict.privacySec3Title}</h2>
            <p>{dict.privacySec3Body}</p>
            <ul>
              {dict.privacySec3Items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="legal-section" aria-labelledby="privacy-sec4">
            <h2 id="privacy-sec4">{dict.privacySec4Title}</h2>
            <p>{dict.privacySec4Body}</p>
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
