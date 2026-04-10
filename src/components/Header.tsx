import Link from 'next/link';
import Image from 'next/image';
import type { Locale } from '@/config';

interface HeaderProps {
  locale: Locale;
  langToggleText: string;
  langToggleLabel: string;
  stationName: string;
}

export default function Header({ locale, langToggleText, langToggleLabel, stationName }: HeaderProps) {
  const otherLocale: Locale = locale === 'fr' ? 'en' : 'fr';

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

        <Link
          href={`/${otherLocale}`}
          className="lang-toggle-btn"
          aria-label={langToggleLabel}
          hrefLang={otherLocale}
        >
          {langToggleText}
        </Link>
      </div>
    </header>
  );
}
