declare function gtag(...args: unknown[]): void;

type AppDownloadPlatform = 'ios' | 'android' | 'unknown';

type AnalyticsEvent =
  | { name: 'app_download_click'; platform: AppDownloadPlatform; source: 'store_badges' | 'sticky_bar' }
  | { name: 'listen_live_click' }
  | { name: 'donate_number_copy'; provider: 'mtn' | 'orange' }
  | { name: 'sticky_bar_click'; action: 'support' | 'download'; platform?: AppDownloadPlatform }
  | { name: 'contact_click'; channel: 'whatsapp' | 'facebook' | 'email' }
  | { name: 'language_switch'; from: string; to: string };

export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === 'undefined' || typeof gtag === 'undefined') return;

  const { name, ...params } = event;
  gtag('event', name, params);
}
