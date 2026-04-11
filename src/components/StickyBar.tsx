'use client';

import { useEffect, useState } from 'react';
import { links } from '@/config';
import { trackEvent } from '@/lib/analytics';

type Device = 'ios' | 'android' | 'other';

interface StickyBarProps {
  locale: string;
  supportCta: string;
  downloadCta: string;
}

function detectDevice(): Device {
  if (typeof navigator === 'undefined') return 'other';
  const ua = navigator.userAgent || '';
  if (/iPad|iPhone|iPod/.test(ua) && !('MSStream' in window)) return 'ios';
  if (/android/i.test(ua)) return 'android';
  return 'other';
}

export default function StickyBar({ locale, supportCta, downloadCta }: StickyBarProps) {
  const [device, setDevice] = useState<Device>('other');

  useEffect(() => {
    setDevice(detectDevice());
  }, []);

  const downloadHref =
    device === 'ios' ? links.appStore :
    device === 'android' ? links.playStore :
    '#download';

  const downloadTarget = device !== 'other' ? '_blank' : undefined;
  const downloadRel = device !== 'other' ? 'noopener noreferrer' : undefined;

  return (
    <div id="sticky-bar" role="complementary" aria-label="Actions rapides">
      {/* Bouton Nous soutenir */}
      <a
        href={`/${locale}/support`}
        className="sticky-bar__btn sticky-bar__btn--primary"
        onClick={() => trackEvent({ name: 'sticky_bar_click', action: 'support' })}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        <span>{supportCta}</span>
      </a>

      {/* Bouton Télécharger — adapté selon le device */}
      <a
        href={downloadHref}
        target={downloadTarget}
        rel={downloadRel}
        className="sticky-bar__btn sticky-bar__btn--secondary"
        onClick={() => trackEvent({ name: 'sticky_bar_click', action: 'download', platform: device === 'other' ? 'unknown' : device })}
      >
        {device === 'ios' ? (
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
        ) : device === 'android' ? (
          <svg viewBox="0 0 27.23 32" aria-hidden="true" focusable="false">
            <path d="M13.54 15.28.12 29.34a3.64 3.64 0 0 0 5.33 2.16l15.1-8.6z" fill="#EA4335"/>
            <path d="m27.11 12.89-6.53-3.74-7.35 6.45 7.38 7.28 6.48-3.7a3.55 3.55 0 0 0 0-6.29z" fill="#FBBC04"/>
            <path d="M.12 2.66a3.46 3.46 0 0 0-.12.92v24.84a3.66 3.66 0 0 0 .12.92L14 15.64Z" fill="#4285F4"/>
            <path d="m13.64 16 6.94-6.85L5.5.51A3.72 3.72 0 0 0 3.63 0 3.64 3.64 0 0 0 .12 2.65Z" fill="#34A853"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
          </svg>
        )}
        <span>
          {device === 'ios' ? 'App Store' : device === 'android' ? 'Google Play' : downloadCta}
        </span>
      </a>
    </div>
  );
}
