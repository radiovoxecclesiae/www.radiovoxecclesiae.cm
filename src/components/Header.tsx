'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Locale } from '@/config';
import { trackEvent } from '@/lib/analytics';

interface HeaderProps {
  locale: Locale;
  langToggleText: string;
  langToggleLabel: string;
  stationName: string;
  /** Full href for the lang toggle — defaults to /{otherLocale} if omitted */
  langToggleHref?: string;
  /** Label for the support CTA button — hidden on mobile */
  supportCtaLabel?: string;
}

export default function Header({ locale, langToggleText, langToggleLabel, stationName, langToggleHref, supportCtaLabel }: HeaderProps) {
  const otherLocale: Locale = locale === 'fr' ? 'en' : 'fr';
  const toggleHref = langToggleHref ?? `/${otherLocale}`;

  return (
    <header id="site-header">
      <div className="container header__inner">
        <Link href={`/${locale}`} className="header__brand">
          <Image
            src="/logo.png"
            alt={`Logo ${stationName}`}
            width={40}
            height={40}
            className="header__logo"
            priority
          />
          <span className="header__station-name">{stationName}</span>
        </Link>

        {/* header__actions — future nav links go here too */}
        <div className="header__actions">
          {supportCtaLabel && (
            <Link
              href={`/${locale}/support`}
              className="header__support-btn"
            >
              {supportCtaLabel}
            </Link>
          )}
          <Link
            href={toggleHref}
            className="lang-toggle-btn"
            aria-label={langToggleLabel}
            hrefLang={otherLocale}
            onClick={() => trackEvent({ name: 'language_switch', from: locale, to: otherLocale })}
          >
            {langToggleText}
          </Link>
        </div>
      </div>
    </header>
  );
}
