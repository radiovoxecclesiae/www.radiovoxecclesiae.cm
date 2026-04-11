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
    description: dict.termsPageDescription,
    openGraph: {
      title: dict.termsPageTitle,
      description: dict.termsPageDescription,
      url: `${station.canonicalUrl}/${locale}/terms`,
      type: 'website',
      images: [{ url: `${station.canonicalUrl}${station.ogImageUrl}`, width: 1200, height: 630, alt: station.name }],
    },
    twitter: {
      title: dict.termsPageTitle,
      description: dict.termsPageDescription,
      images: [`${station.canonicalUrl}${station.ogImageUrl}`],
    },
  };
}

const sections = [
  { id: 'terms-sec1', key: 'termsSec1Title' },
  { id: 'terms-sec2', key: 'termsSec2Title' },
  { id: 'terms-sec3', key: 'termsSec3Title' },
  { id: 'terms-sec4', key: 'termsSec4Title' },
  { id: 'terms-sec5', key: 'termsSec5Title' },
] as const;

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
        langToggleHref={`/${locale === 'fr' ? 'en' : 'fr'}/terms`}
        supportCtaLabel={dict.supportCta}
      />

      <main id="main-content" className="legal-main">
        <div className="container">
          <article className="legal-article">

            <header className="legal-page__header">
              <h1>{dict.termsTitle}</h1>
              <p className="legal-page__date">{dict.termsDate}</p>
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

            <section className="legal-section" aria-labelledby="terms-sec1">
              <h2 id="terms-sec1">
                <span className="sec-num" aria-hidden="true">01</span>
                {dict.termsSec1Title}
              </h2>
              <p>{dict.termsSec1Body}</p>
            </section>

            <section className="legal-section" aria-labelledby="terms-sec2">
              <h2 id="terms-sec2">
                <span className="sec-num" aria-hidden="true">02</span>
                {dict.termsSec2Title}
              </h2>
              <p>{dict.termsSec2Body}</p>
            </section>

            <section className="legal-section" aria-labelledby="terms-sec3">
              <h2 id="terms-sec3">
                <span className="sec-num" aria-hidden="true">03</span>
                {dict.termsSec3Title}
              </h2>
              <p>{dict.termsSec3Body}</p>
            </section>

            <section className="legal-section" aria-labelledby="terms-sec4">
              <h2 id="terms-sec4">
                <span className="sec-num" aria-hidden="true">04</span>
                {dict.termsSec4Title}
              </h2>
              <p>{dict.termsSec4Body}</p>
            </section>

            <section className="legal-section" aria-labelledby="terms-sec5">
              <h2 id="terms-sec5">
                <span className="sec-num" aria-hidden="true">05</span>
                {dict.termsSec5Title}
              </h2>
              <p>
                {dict.termsSec5Body}{' '}
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
