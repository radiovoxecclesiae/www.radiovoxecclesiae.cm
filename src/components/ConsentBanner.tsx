'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'rve_analytics_consent';

type ConsentValue = 'granted' | 'denied';

declare function gtag(...args: unknown[]): void;

function updateConsent(value: ConsentValue): void {
  if (typeof window === 'undefined' || typeof gtag === 'undefined') return;
  gtag('consent', 'update', {
    analytics_storage: value,
  });
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
    } else if (stored === 'denied') {
      // already denied by default — nothing to do
    } else {
      // no choice yet — show banner
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
    <div
      role="dialog"
      aria-live="polite"
      aria-label={message}
      className="consent-banner"
    >
      <p className="consent-banner__message">
        {message}{' '}
        <a href={privacyHref} className="consent-banner__link">
          {privacyLink}
        </a>
      </p>
      <div className="consent-banner__actions">
        <button
          onClick={handleDecline}
          className="consent-banner__btn consent-banner__btn--decline"
        >
          {declineLabel}
        </button>
        <button
          onClick={handleAccept}
          className="consent-banner__btn consent-banner__btn--accept"
        >
          {acceptLabel}
        </button>
      </div>
    </div>
  );
}
