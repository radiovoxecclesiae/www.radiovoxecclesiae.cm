import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, dictionaries, station } from '@/config';
import type { Locale } from '@/config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollDots from '@/components/ScrollDots';
import StickyBar from '@/components/StickyBar';
import StoreBadges from '@/components/StoreBadges';

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
    title: locale === 'fr'
      ? 'Radio Vox Ecclesiae — La voix de l\'Église | 97.3 FM Bafoussam'
      : 'Radio Vox Ecclesiae — The Voice of the Church | 97.3 FM Bafoussam',
    description: station.description[locale as Locale],
    openGraph: {
      title: locale === 'fr'
        ? 'Radio Vox Ecclesiae — La voix de l\'Église | 97.3 FM Bafoussam'
        : 'Radio Vox Ecclesiae — The Voice of the Church | 97.3 FM Bafoussam',
      description: station.description[locale as Locale],
      url: `${station.canonicalUrl}/${locale}`,
      type: 'website',
      images: [{ url: station.ogImageUrl, width: 1200, height: 630, alt: station.name }],
    },
    twitter: {
      title: locale === 'fr'
        ? 'Radio Vox Ecclesiae — La voix de l\'Église | 97.3 FM Bafoussam'
        : 'Radio Vox Ecclesiae — The Voice of the Church | 97.3 FM Bafoussam',
      description: station.description[locale as Locale],
      images: [station.ogImageUrl],
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const dict = dictionaries[locale as Locale];
  const year = new Date().getFullYear();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RadioStation',
    name: station.name,
    url: station.canonicalUrl,
    logo: `${station.canonicalUrl}${station.logoUrl}`,
    image: `${station.canonicalUrl}${station.ogImageUrl}`,
    description: station.description.fr,
    broadcastFrequency: station.frequencies.map((f) => ({
      '@type': 'BroadcastFrequencySpecification',
      broadcastFrequencyValue: f.value,
      broadcastSignalModulation: 'FM',
    })),
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Diocèse de Bafoussam',
      containedInPlace: { '@type': 'Country', name: 'Cameroun' },
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: station.contact.email,
      contactType: 'customer service',
    },
    sameAs: [station.contact.facebook],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Skip link */}
      <a href="#main-content" className="skip-link">{dict.skipLinkLabel}</a>

      {/* Header */}
      <Header
        locale={locale as Locale}
        langToggleText={dict.langToggleText}
        langToggleLabel={dict.langToggleLabel}
        stationName={station.name}
      />

      {/* Scroll dots */}
      <ScrollDots sections={[
        { id: 'hero',     label: dict.dotLabelHero },
        { id: 'about',    label: dict.dotLabelAbout },
        { id: 'listen',   label: dict.dotLabelListen },
        { id: 'download', label: dict.dotLabelDownload },
        { id: 'contact',  label: dict.dotLabelContact },
      ]} />

      {/* Main */}
      <main id="main-content">

        {/* ===== SECTION 1 — Hero ===== */}
        <section id="hero" className="snap-section" aria-labelledby="hero-title">
          <div className="container text-center">
            <span className="hero__eyebrow reveal">{dict.heroEyebrow}</span>
            <h1 id="hero-title" className="reveal reveal-delay-1">{dict.heroSlogan}</h1>
            <p className="hero__diocese reveal reveal-delay-2">{dict.heroDiocese}</p>
            <div
              className="hero__frequencies reveal reveal-delay-3"
              aria-label={dict.frequenciesLabel}
            >
              {station.frequencies.map((f) => (
                <span key={f.value} className="frequency-badge">{f.label}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SECTION 2 — About ===== */}
        <section id="about" className="snap-section" aria-labelledby="about-title">
          <div className="container">
            <h2 id="about-title" className="section__title reveal">{dict.aboutTitle}</h2>
            <p className="section__desc reveal reveal-delay-1">{dict.aboutDescription}</p>
            <ol className="mission-list" aria-label={dict.aboutTitle}>

              <li className="mission-item reveal reveal-delay-2">
                <span className="mission-item__num" aria-hidden="true">01</span>
                <div className="mission-item__body">
                  <h3 className="mission-item__title">{dict.missionCard2Title}</h3>
                  <p className="mission-item__desc">{dict.missionCard2Desc}</p>
                </div>
              </li>

              <li className="mission-item reveal reveal-delay-3">
                <span className="mission-item__num" aria-hidden="true">02</span>
                <div className="mission-item__body">
                  <h3 className="mission-item__title">{dict.missionCard3Title}</h3>
                  <p className="mission-item__desc">{dict.missionCard3Desc}</p>
                </div>
              </li>

              <li className="mission-item reveal reveal-delay-4">
                <span className="mission-item__num" aria-hidden="true">03</span>
                <div className="mission-item__body">
                  <h3 className="mission-item__title">{dict.missionCard4Title}</h3>
                  <p className="mission-item__desc">{dict.missionCard4Desc}</p>
                </div>
              </li>

            </ol>
          </div>
        </section>

        {/* ===== SECTION 3 — Listen ===== */}
        <section id="listen" className="snap-section" aria-labelledby="listen-title">
          <div className="container text-center">
            <div className="live-badge reveal">
              <span className="live-dot" aria-hidden="true" />
              LIVE
            </div>
            <div className="equalizer reveal reveal-delay-1" aria-hidden="true">
              <div className="eq-bar" />
              <div className="eq-bar" />
              <div className="eq-bar" />
              <div className="eq-bar" />
              <div className="eq-bar" />
            </div>
            <h2 id="listen-title" className="section__title reveal reveal-delay-1">{dict.listenTitle}</h2>
            <p className="section__desc reveal reveal-delay-2">{dict.listenDescription}</p>
            <div className="listen__cta-wrap reveal reveal-delay-3">
              <a
                href={station.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="listen__btn"
                aria-label={dict.listenBtnLabel}
              >
                <svg className="listen__btn-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                {dict.listenCta}
              </a>
            </div>
          </div>
        </section>

        {/* ===== SECTION 4 — Download ===== */}
        <section id="download" className="snap-section" aria-labelledby="download-title">
          <div className="container text-center">
            <h2 id="download-title" className="section__title reveal">{dict.downloadTitle}</h2>
            <p className="section__desc reveal reveal-delay-1">{dict.downloadDescription}</p>
            <StoreBadges
              downloadOnLabel={dict.downloadOnLabel}
              downloadGetOnLabel={dict.downloadGetOnLabel}
              downloadAppStoreLabel={dict.downloadAppStoreLabel}
              downloadPlayStoreLabel={dict.downloadPlayStoreLabel}
            />
          </div>
        </section>

        {/* ===== SECTION 5 — Contact ===== */}
        <section id="contact" className="snap-section" aria-labelledby="contact-title">
          <div className="container">
            <h2 id="contact-title" className="section__title reveal">{dict.contactTitle}</h2>
            <div className="contact-grid">

              {/* WhatsApp */}
              <a
                href={station.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card contact-card--link reveal reveal-delay-1"
              >
                <div className="contact-card__icon contact-card__icon--whatsapp" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div className="contact-card__body">
                  <span className="contact-card__label">{dict.contactWhatsapp}</span>
                  <span className="contact-card__value">{station.contact.whatsappDisplay}</span>
                </div>
              </a>

              {/* Facebook */}
              <a
                href={station.contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card contact-card--link reveal reveal-delay-2"
              >
                <div className="contact-card__icon contact-card__icon--facebook" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <div className="contact-card__body">
                  <span className="contact-card__label">{dict.contactFacebook}</span>
                  <span className="contact-card__value">{station.contact.facebookDisplay}</span>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${station.contact.email}`}
                className="contact-card contact-card--link reveal reveal-delay-3"
              >
                <div className="contact-card__icon contact-card__icon--email" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <div className="contact-card__body">
                  <span className="contact-card__label">{dict.contactEmail}</span>
                  <span className="contact-card__value">{station.contact.email}</span>
                </div>
              </a>

              {/* Adresse */}
              <div className="contact-card reveal reveal-delay-4">
                <div className="contact-card__icon contact-card__icon--address" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div className="contact-card__body">
                  <span className="contact-card__label">{dict.contactAddress}</span>
                  <span className="contact-card__value">{station.contact.address}</span>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer id="site-footer">
        <div className="container footer__inner">
          <p className="footer__copyright">
            © {year} {dict.footerCopyrightPrefix}
          </p>
          <nav className="footer__links" aria-label="Liens légaux">
            <a href={`/${locale}/privacy`} className="footer__link">{dict.footerPrivacy}</a>
            <a href={`/${locale}/terms`} className="footer__link">{dict.footerTerms}</a>
          </nav>
        </div>
      </footer>

      {/* Sticky bar — mobile */}
      <StickyBar
        locale={locale}
        supportCta={dict.supportCta}
        downloadCta={dict.downloadCta}
      />
    </>
  );
}
