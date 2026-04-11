import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Noto_Serif, DM_Sans } from 'next/font/google';
import { locales, dictionaries } from '@/config';
import type { Locale } from '@/config';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import ConsentBanner from '@/components/ConsentBanner';

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-heading',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-body',
});

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

  return {
    alternates: {
      canonical: `/${locale}`,
      languages: {
        fr: '/fr',
        en: '/en',
      },
    },
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
    <html lang={locale} className={`h-full ${notoSerif.variable} ${dmSans.variable}`}>
      <head>
        <meta name="theme-color" content="#011449" />
        <link rel="manifest" href="/site.webmanifest" />
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
