import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, dictionaries, station } from '@/config';
import { buildJsonLd } from '@/lib/jsonld';
import type { Locale } from '@/config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollDots from '@/components/ScrollDots';
import StickyBar from '@/components/StickyBar';
import StoreBadges from '@/components/StoreBadges';
import ListenButton from '@/components/ListenButton';
import ContactGrid from '@/components/ContactGrid';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};

  const title = locale === 'fr'
    ? 'Radio Vox Ecclesiae — La radio du diocèse de Bafoussam | 97.3 FM'
    : 'Radio Vox Ecclesiae — The Radio of the Diocese of Bafoussam | 97.3 FM';
  const description = station.description[locale as Locale];
  const ogImage = `${station.canonicalUrl}${station.ogImageUrl}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${station.canonicalUrl}/${locale}`,
      siteName: station.name,
      locale: locale === 'fr' ? 'fr_CM' : 'en_US',
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: station.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const dict = dictionaries[locale as Locale];
  const jsonLd = buildJsonLd(locale as Locale);

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
        supportCtaLabel={dict.supportCta}
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
            <p className="hero__broadcast-hours reveal reveal-delay-4">{dict.heroBroadcastHours}</p>
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
            <div className="listen__live-row">
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
            </div>
            <h2 id="listen-title" className="section__title reveal reveal-delay-1">{dict.listenTitle}</h2>
            <p className="section__desc reveal reveal-delay-2">{dict.listenDescription}</p>
            <div className="listen__cta-wrap reveal reveal-delay-3">
              <ListenButton
                href={station.appUrl}
                label={dict.listenCta}
                ariaLabel={dict.listenBtnLabel}
              />
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
            <p className="section__desc reveal reveal-delay-1">{dict.contactDescription}</p>
            <ContactGrid
              whatsappHref={station.contact.whatsapp}
              whatsappDisplay={station.contact.whatsappDisplay}
              facebookHref={station.contact.facebook}
              facebookDisplay={station.contact.facebookDisplay}
              youtubeHref={station.contact.youtube}
              youtubeDisplay={station.contact.youtubDisplay}
              email={station.contact.email}
              address={station.contact.address}
              labelWhatsapp={dict.contactWhatsapp}
              labelFacebook={dict.contactFacebook}
              labelYoutube={dict.contactYoutube}
              labelEmail={dict.contactEmail}
              labelAddress={dict.contactAddress}
            />
          </div>
        </section>

      </main>

      <Footer
        locale={locale}
        copyright={dict.footerCopyrightPrefix}
        privacyLabel={dict.footerPrivacy}
        termsLabel={dict.footerTerms}
        legalNavLabel={dict.legalNavLabel}
      />

      {/* Sticky bar — mobile */}
      <StickyBar
        locale={locale}
        supportCta={dict.supportCta}
        downloadCta={dict.downloadCta}
        ariaLabel={dict.stickyBarAriaLabel}
      />
    </>
  );
}
