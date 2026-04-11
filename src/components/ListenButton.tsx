'use client';

import { trackEvent } from '@/lib/analytics';

interface ListenButtonProps {
  href: string;
  label: string;
  ariaLabel: string;
}

export default function ListenButton({ href, label, ariaLabel }: ListenButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="listen__btn"
      aria-label={ariaLabel}
      onClick={() => trackEvent({ name: 'listen_live_click' })}
    >
      <svg className="listen__btn-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M8 5v14l11-7z"/>
      </svg>
      {label}
    </a>
  );
}
