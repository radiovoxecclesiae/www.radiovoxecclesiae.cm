'use client';

import Script from 'next/script';

const GA_ID = 'G-36ZKFTPT5Q';

export default function GoogleAnalytics() {
  return (
    <>
      {/* Consent Mode v2 — denied by default, updated by ConsentBanner on accept */}
      <Script id="ga4-consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500,
          });
        `}
      </Script>

      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_location: window.location.href,
            page_title: document.title,
          });
        `}
      </Script>
    </>
  );
}
