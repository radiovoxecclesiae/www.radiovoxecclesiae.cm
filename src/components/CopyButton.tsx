'use client';

import { useState } from 'react';
import Image from 'next/image';

interface CopyButtonProps {
  number: string;
  display: string;
  label: string;
  ariaLabel: string;
  receiptLabel: string;
  toastMsg: string;
  variant: 'mtn' | 'orange';
  hintColor: string;
}

export default function CopyButton({
  number,
  display,
  label,
  ariaLabel,
  receiptLabel,
  toastMsg,
  variant,
  hintColor,
}: CopyButtonProps) {
  const [toastVisible, setToastVisible] = useState(false);

  const handleCopy = async () => {
    const text = `+${number}`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  const imgSrc = variant === 'mtn' ? '/mtn-momo.png' : '/orange-om.png';
  const imgAlt = variant === 'mtn' ? 'MTN Mobile Money' : 'Orange Money';

  return (
    <>
      <div>
        <button
          className={`provider-btn provider-btn--${variant}`}
          onClick={handleCopy}
          aria-label={ariaLabel}
        >
          <div className="provider-btn__inner">
            <div className="provider-btn__left">
              <div className="provider-btn__icon">
                <Image src={imgSrc} alt={imgAlt} width={40} height={40} />
              </div>
              <div>
                <div className="provider-btn__label">{label}</div>
                <div className="provider-btn__number">{display}</div>
              </div>
            </div>
            <span className="provider-btn__arrow">→</span>
          </div>
        </button>
        <div className="provider-hint">
          <div className="provider-hint__dot">
            <svg viewBox="0 0 24 24" aria-hidden="true" fill={hintColor}>
              <path d="M17 1.01 7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
            </svg>
          </div>
          <div>
            <p className="provider-hint__overline">{receiptLabel}</p>
            <p className="provider-hint__value">{display}</p>
          </div>
        </div>
      </div>

      {/* Toast per-button */}
      <div
        className={`toast${toastVisible ? ' visible' : ''}`}
        role="status"
        aria-live="polite"
      >
        {toastMsg}
      </div>
    </>
  );
}
