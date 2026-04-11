'use client';

import { useState } from 'react';
import Image from 'next/image';
import { trackEvent } from '@/lib/analytics';

interface DonateCardProps {
  number: string;
  display: string;
  providerName: string;
  ctaLabel: string;
  ariaLabel: string;
  toastMsg: string;
  variant: 'mtn' | 'orange';
  imgSrc: string;
  imgAlt: string;
}

export default function DonateCard({
  number,
  display,
  providerName,
  ctaLabel,
  ariaLabel,
  toastMsg,
  variant,
  imgSrc,
  imgAlt,
}: DonateCardProps) {
  const [copied, setCopied] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`+${number.replace(/\s+/g, '')}`);
      trackEvent({ name: 'donation_intent', payment_method: variant, source_screen: 'support' });
      setCopied(true);
      setToastVisible(true);
      setTimeout(() => {
        setCopied(false);
        setToastVisible(false);
      }, 2500);
    } catch {
      // Clipboard API indisponible (permissions refusées, contexte non sécurisé)
    }
  };

  return (
    <div>
      <button
        className={`donate-card donate-card--${variant}${copied ? ' donate-card--copied' : ''}`}
        onClick={handleCopy}
        aria-label={ariaLabel}
      >
        <div className="donate-card__top">
          <div className="donate-card__logo">
            <Image src={imgSrc} alt={imgAlt} width={48} height={48} />
          </div>
          <div className="donate-card__info">
            <span className="donate-card__provider">{providerName}</span>
            <span className="donate-card__number">{display}</span>
          </div>
          <div className="donate-card__state" aria-hidden="true">
            {copied ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
              </svg>
            )}
          </div>
        </div>
        <div className="donate-card__cta">
          <span>{copied ? '✓ ' : ''}{ctaLabel}</span>
        </div>
      </button>

      <div
        className={`toast${toastVisible ? ' visible' : ''}`}
        role="status"
        aria-live="polite"
      >
        {toastMsg}
      </div>
    </div>
  );
}
