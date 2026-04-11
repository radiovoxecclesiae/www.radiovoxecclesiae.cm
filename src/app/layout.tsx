import './globals.css';
import type { Metadata } from 'next';
import { station } from '@/config';

const defaultTitle = `${station.name} — La voix de l'Église | 97.3 FM Bafoussam`;
const defaultDescription = station.description.fr;
const ogImageUrl = `${station.canonicalUrl}${station.ogImageUrl}`;

export const metadata: Metadata = {
  metadataBase: new URL(station.canonicalUrl),
  title: defaultTitle,
  description: defaultDescription,
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: `${station.canonicalUrl}/fr`,
    siteName: station.name,
    type: 'website',
    images: [{ url: ogImageUrl, width: 1200, height: 630, alt: station.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
    images: [ogImageUrl],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    apple: { url: '/icon-192.png', sizes: '192x192' },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
