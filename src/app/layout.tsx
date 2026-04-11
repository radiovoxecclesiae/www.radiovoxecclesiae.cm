import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://radiovoxecclesiae.cm'),
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
