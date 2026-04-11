'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'rve_analytics_consent';

type ConsentValue = 'granted' | 'denied';

declare function gtag(...args: unknown[]): void;

function updateConsent(value: ConsentValue): void {
  if (typeof window === 'undefined' || typeof gtag === 'undefined') return;
  gtag('consent', 'update', { analytics_storage: value });
}

interface ConsentBannerProps {
  message: string;
  privacyLink: string;
  privacyHref: string;
  acceptLabel: string;
  declineLabel: string;
}

export default function ConsentBanner({
  message,
  privacyLink,
  privacyHref,
  acceptLabel,
  declineLabel,
}: ConsentBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ConsentValue | null;
    if (stored === 'granted') {
      updateConsent('granted');
    } else if (stored !== 'denied') {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, 'granted');
    updateConsent('granted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(STORAGE_KEY, 'denied');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="consent-overlay" role="dialog" aria-modal="true" aria-label="Consentement cookies">
      <div className="consent-modal">
        {/* Icon */}
        <div className="consent-modal__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
          </svg>
        </div>

        {/* Text */}
        <p className="consent-modal__message">
          {message}{' '}
          <a href={privacyHref} className="consent-modal__link">
            {privacyLink}
          </a>
        </p>

        {/* Accept CTA */}
        <button onClick={handleAccept} className="consent-modal__accept">
          {acceptLabel}
        </button>

        {/* Decline — very subtle */}
        <button onClick={handleDecline} className="consent-modal__decline">
          {declineLabel}
        </button>
      </div>
    </div>
  );
}
