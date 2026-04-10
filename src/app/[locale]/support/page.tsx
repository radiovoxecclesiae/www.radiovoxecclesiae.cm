import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, dictionaries, station } from '@/config';
import type { Locale } from '@/config';
import Header from '@/components/Header';
import CopyButton from '@/components/CopyButton';

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
      images: [{ url: station.ogImageUrl, width: 1200, height: 630, alt: station.name }],
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
      />

      <main id="main-content" className="support-main">
        <div className="support-wrap">

          {/* Hero */}
          <div className="support-hero">
            <div className="support-hero__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <h1 className="support-hero__title">{dict.supportTitle}</h1>
            <p className="support-hero__subtitle">{dict.supportSubtitle}</p>
          </div>

          {/* How-to */}
          <div className="intention-box">
            <div className="intention-box__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
            </div>
            <div className="intention-box__text">
              <strong>{dict.supportHowTitle}</strong><br />
              {dict.supportHowBody}
            </div>
          </div>

          {/* Payment card */}
          <div className="payment-card">
            <div className="payment-card__header">
              <h2 className="payment-card__title">{dict.supportPaymentTitle}</h2>
              <p className="payment-card__subtitle">{dict.supportPaymentSubtitle}</p>
            </div>
            <div className="payment-card__providers">
              <CopyButton
                number={station.payment.mtn.number}
                display={station.payment.mtn.display}
                label={dict.supportMtnCta}
                ariaLabel={dict.supportMtnAriaLabel}
                receiptLabel={dict.supportReceiptLabel}
                toastMsg={dict.toastCopied}
                variant="mtn"
                hintColor="#FFCC00"
              />
              <CopyButton
                number={station.payment.orange.number}
                display={station.payment.orange.display}
                label={dict.supportOrangeCta}
                ariaLabel={dict.supportOrangeAriaLabel}
                receiptLabel={dict.supportReceiptLabel}
                toastMsg={dict.toastCopied}
                variant="orange"
                hintColor="#FF6600"
              />
            </div>
            <div className="payment-card__footer">
              <div className="security-badge">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 14l-3-3 1.41-1.41L11 12.17l4.59-4.58L17 9l-6 6z"/>
                </svg>
                <span className="security-badge__text">{dict.supportSecurityNote}</span>
              </div>
            </div>
          </div>

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
