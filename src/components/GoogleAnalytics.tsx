'use client';

import Script from 'next/script';

const GA_ID = 'G-36ZKFTPT5Q';

export default function GoogleAnalytics() {
  return (
    <>
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
