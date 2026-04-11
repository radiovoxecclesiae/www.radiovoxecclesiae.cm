import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, dictionaries, station } from '@/config';
import type { Locale } from '@/config';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import ConsentBanner from '@/components/ConsentBanner';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const dict = dictionaries[locale as Locale];

  return {
    metadataBase: new URL(station.canonicalUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        fr: '/fr',
        en: '/en',
      },
    },
    openGraph: {
      siteName: station.name,
      locale: locale === 'fr' ? 'fr_CM' : 'en_US',
      images: [{ url: `${station.canonicalUrl}${station.ogImageUrl}`, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image' },
    other: {
      'geo.region': 'CM-OU',
      'geo.placename': 'Bafoussam, Cameroun',
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const dict = dictionaries[locale as Locale];

  return (
    <html lang={locale} className="h-full">
      <head>
        <meta name="theme-color" content="#011449" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;700&family=DM+Sans:wght@400;500&display=swap"
        />
        <link rel="alternate" hrefLang="fr" href={`${station.canonicalUrl}/fr`} />
        <link rel="alternate" hrefLang="en" href={`${station.canonicalUrl}/en`} />
        <link rel="alternate" hrefLang="x-default" href={`${station.canonicalUrl}/fr`} />
      </head>
      <body>
        <GoogleAnalytics />
        {children}
        <ConsentBanner
          message={dict.consentMessage}
          privacyLink={dict.consentPrivacyLink}
          privacyHref={`/${locale}/privacy`}
          dismissLabel={dict.consentDismiss}
        />
      </body>
    </html>
  );
}
