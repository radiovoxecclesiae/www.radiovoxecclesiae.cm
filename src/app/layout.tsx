import './globals.css';
import type { Metadata } from 'next';
import { station } from '@/config';

export const metadata: Metadata = {
  metadataBase: new URL(station.canonicalUrl),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
