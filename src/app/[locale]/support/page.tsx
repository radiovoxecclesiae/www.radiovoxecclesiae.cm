import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, dictionaries, station } from '@/config';
import type { Locale } from '@/config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DonateCard from '@/components/DonateCard';

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
    title: dict.supportPageTitle,
    description: dict.supportPageDescription,
    openGraph: {
      title: dict.supportPageTitle,
      description: dict.supportPageDescription,
      url: `${station.canonicalUrl}/${locale}/support`,
      type: 'website',
      images: [{ url: `${station.canonicalUrl}${station.ogImageUrl}`, width: 1200, height: 630, alt: station.name }],
    },
  };
}

export default async function SupportPage({ params }: PageProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const dict = dictionaries[locale as Locale];

  return (
    <div className="support-page-bg">
      <a href="#main-content" className="skip-link">{dict.skipLinkLabel}</a>

      <Header
        locale={locale as Locale}
        langToggleText={dict.langToggleText}
        langToggleLabel={dict.langToggleLabel}
        stationName={station.name}
        langToggleHref={`/${locale === 'fr' ? 'en' : 'fr'}/support`}
      />

      <main id="main-content" className="support-main">
        <div className="container">
        <div className="support-wrap">

          {/* Hero */}
          <div className="support-hero">
            <div className="support-hero__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <h1 className="support-hero__title">{dict.supportTitle}</h1>
            <p className="support-hero__subtitle">{dict.supportSubtitle}</p>
          </div>

          {/* Instruction */}
          <p className="support-instruction">{dict.supportInstruction}</p>

          {/* Donate cards */}
          <div className="support-cards">
            <DonateCard
              number={station.payment.mtn.number}
              display={station.payment.mtn.display}
              providerName={dict.supportMtnName}
              ctaLabel={dict.supportMtnCta}
              ariaLabel={dict.supportMtnAriaLabel}
              toastMsg={dict.toastCopied}
              variant="mtn"
              imgSrc="/mtn-momo.png"
              imgAlt="MTN Mobile Money"
            />
            <DonateCard
              number={station.payment.orange.number}
              display={station.payment.orange.display}
              providerName={dict.supportOrangeName}
              ctaLabel={dict.supportOrangeCta}
              ariaLabel={dict.supportOrangeAriaLabel}
              toastMsg={dict.toastCopied}
              variant="orange"
              imgSrc="/orange-om.png"
              imgAlt="Orange Money"
            />
          </div>

          {/* Trust note */}
          <div className="support-trust">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" className="support-trust__icon">
              <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7l5 5 5-5h-4V7h-2v4z"/>
            </svg>
            <p className="support-trust__title">{dict.supportTrustTitle}</p>
            <p className="support-trust__text">{dict.supportTrustNote}</p>
          </div>

        </div>
        </div>
      </main>

      <Footer
        locale={locale}
        copyright={dict.footerCopyrightPrefix}
        privacyLabel={dict.footerPrivacy}
        termsLabel={dict.footerTerms}
        legalNavLabel={dict.legalNavLabel}
        variant="legal"
      />
    </div>
  );
}
