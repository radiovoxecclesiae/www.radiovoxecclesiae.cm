'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'rve_analytics_consent';

declare function gtag(...args: unknown[]): void;

function grantConsent(): void {
  if (typeof window === 'undefined' || typeof gtag === 'undefined') return;
  gtag('consent', 'update', { analytics_storage: 'granted' });
}

interface ConsentBannerProps {
  message: string;
  privacyLink: string;
  privacyHref: string;
  dismissLabel: string;
}

export default function ConsentBanner({
  message,
  privacyLink,
  privacyHref,
  dismissLabel,
}: ConsentBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'granted') {
      grantConsent();
    } else if (!stored) {
      setVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, 'granted');
    grantConsent();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="consent-overlay" role="dialog" aria-modal="true" aria-labelledby="consent-title" aria-describedby="consent-desc">
      <div className="consent-modal">
        <div className="consent-modal__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
          </svg>
        </div>

        <p id="consent-title" className="sr-only">Cookies</p>
        <p id="consent-desc" className="consent-modal__message">
          {message}{' '}
          <a href={privacyHref} className="consent-modal__link">
            {privacyLink}
          </a>
        </p>

        <button onClick={handleDismiss} className="consent-modal__accept">
          {dismissLabel}
        </button>
      </div>
    </div>
  );
}
