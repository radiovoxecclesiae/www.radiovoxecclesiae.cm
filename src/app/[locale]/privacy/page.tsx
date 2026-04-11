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
    description: dict.privacyPageDescription,
    openGraph: {
      title: dict.privacyPageTitle,
      description: dict.privacyPageDescription,
      url: `${station.canonicalUrl}/${locale}/privacy`,
      type: 'website',
      images: [{ url: `${station.canonicalUrl}${station.ogImageUrl}`, width: 1200, height: 630, alt: station.name }],
    },
    twitter: {
      title: dict.privacyPageTitle,
      description: dict.privacyPageDescription,
      images: [`${station.canonicalUrl}${station.ogImageUrl}`],
    },
  };
}

const sections = [
  { id: 'privacy-sec1', key: 'privacySec1Title' },
  { id: 'privacy-sec2', key: 'privacySec2Title' },
  { id: 'privacy-sec3', key: 'privacySec3Title' },
  { id: 'privacy-sec4', key: 'privacySec4Title' },
] as const;

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
        langToggleHref={`/${locale === 'fr' ? 'en' : 'fr'}/privacy`}
        supportCtaLabel={dict.supportCta}
      />

      <main id="main-content" className="legal-main">
        <div className="container">
          <article className="legal-article">

            <header className="legal-page__header">
              <h1>{dict.privacyTitle}</h1>
              <p className="legal-page__date">{dict.privacyDate}</p>
            </header>

            {/* Table of contents */}
            <nav className="legal-toc" aria-label={dict.tocAriaLabel}>
              <p className="legal-toc__label" aria-hidden="true">
                {dict.tocHeading}
              </p>
              <ol className="legal-toc__list">
                {sections.map(({ id, key }, i) => (
                  <li key={id}>
                    <a href={`#${id}`}>{i + 1}. {dict[key]}</a>
                  </li>
                ))}
              </ol>
            </nav>

            <section className="legal-section" aria-labelledby="privacy-sec1">
              <h2 id="privacy-sec1">
                <span className="sec-num" aria-hidden="true">01</span>
                {dict.privacySec1Title}
              </h2>
              <p>{dict.privacySec1Body}</p>
              <ul>
                {dict.privacySec1Items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="legal-section" aria-labelledby="privacy-sec2">
              <h2 id="privacy-sec2">
                <span className="sec-num" aria-hidden="true">02</span>
                {dict.privacySec2Title}
              </h2>
              <p>{dict.privacySec2Body}</p>
            </section>

            <section className="legal-section" aria-labelledby="privacy-sec3">
              <h2 id="privacy-sec3">
                <span className="sec-num" aria-hidden="true">03</span>
                {dict.privacySec3Title}
              </h2>
              <p>{dict.privacySec3Body}</p>
              <ul>
                {dict.privacySec3Items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="legal-section" aria-labelledby="privacy-sec4">
              <h2 id="privacy-sec4">
                <span className="sec-num" aria-hidden="true">04</span>
                {dict.privacySec4Title}
              </h2>
              <p>
                {dict.privacySec4Body}{' '}
                <a
                  href={`mailto:${station.contact.email}`}
                  aria-label={`${dict.emailAriaLabel} ${station.contact.email}`}
                >
                  {station.contact.email}
                </a>
              </p>
            </section>

          </article>
        </div>
      </main>

      <footer className="legal-footer">
        <div className="container footer__inner">
          <p className="footer__copyright">
            © {new Date().getFullYear()} {dict.footerCopyrightPrefix}
          </p>
          <nav className="footer__links" aria-label={dict.legalNavLabel}>
            <a href={`/${locale}/privacy`} className="footer__link">{dict.footerPrivacy}</a>
            <a href={`/${locale}/terms`} className="footer__link">{dict.footerTerms}</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
