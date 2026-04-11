'use client';

import { useEffect, useState } from 'react';
import { links } from '@/config';
import { trackEvent } from '@/lib/analytics';
import { type Device, detectDevice } from '@/lib/device';

interface StoreBadgesProps {
  downloadOnLabel: string;
  downloadGetOnLabel: string;
  downloadAppStoreLabel: string;
  downloadPlayStoreLabel: string;
}


export default function StoreBadges({
  downloadOnLabel,
  downloadGetOnLabel,
  downloadAppStoreLabel,
  downloadPlayStoreLabel,
}: StoreBadgesProps) {
  const [device, setDevice] = useState<Device>('other');

  useEffect(() => {
    setDevice(detectDevice());
  }, []);

  return (
    <div className="download__badges reveal reveal-delay-2">
      {/* App Store */}
      <a
        href={links.appStore}
        target="_blank"
        rel="noopener noreferrer"
        className={`store-badge${device === 'ios' ? ' store-badge--primary' : ''}`}
        aria-label={downloadAppStoreLabel}
        onClick={() => trackEvent({ name: 'app_download_click', platform: 'ios', source: 'store_badges' })}
      >
        <svg className="store-badge__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
        </svg>
        <div className="store-badge__text">
          <span className="store-badge__label">{downloadOnLabel}</span>
          <span className="store-badge__name">App Store</span>
        </div>
      </a>

      {/* Google Play */}
      <a
        href={links.playStore}
        target="_blank"
        rel="noopener noreferrer"
        className={`store-badge${device === 'android' ? ' store-badge--primary' : ''}`}
        aria-label={downloadPlayStoreLabel}
        onClick={() => trackEvent({ name: 'app_download_click', platform: 'android', source: 'store_badges' })}
      >
        <svg className="store-badge__icon" viewBox="0 0 27.23 32" aria-hidden="true" focusable="false">
          <path d="M13.54 15.28.12 29.34a3.64 3.64 0 0 0 5.33 2.16l15.1-8.6z" fill="#EA4335"/>
          <path d="m27.11 12.89-6.53-3.74-7.35 6.45 7.38 7.28 6.48-3.7a3.55 3.55 0 0 0 0-6.29z" fill="#FBBC04"/>
          <path d="M.12 2.66a3.46 3.46 0 0 0-.12.92v24.84a3.66 3.66 0 0 0 .12.92L14 15.64Z" fill="#4285F4"/>
          <path d="m13.64 16 6.94-6.85L5.5.51A3.72 3.72 0 0 0 3.63 0 3.64 3.64 0 0 0 .12 2.65Z" fill="#34A853"/>
        </svg>
        <div className="store-badge__text">
          <span className="store-badge__label">{downloadGetOnLabel}</span>
          <span className="store-badge__name">Google Play</span>
        </div>
      </a>
    </div>
  );
}
