type AppDownloadPlatform = 'ios' | 'android' | 'unknown';

type AnalyticsEvent =
  | { name: 'app_download_click'; platform: AppDownloadPlatform; source: 'store_badges' | 'sticky_bar' }
  | { name: 'listen_live_click' }
  | { name: 'donation_intent'; payment_method: 'mtn' | 'orange'; source_screen: string }
  | { name: 'sticky_bar_click'; action: 'support' | 'download'; platform?: AppDownloadPlatform }
  | { name: 'contact_click'; channel: 'whatsapp' | 'facebook' | 'youtube' | 'email' }
  | { name: 'language_switch'; from: string; to: string };

export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === 'undefined') return;

  const { name, ...params } = event;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: name,
    ...params,
  });
}

declare global {
  interface Window {
    dataLayer: Array<{ event?: string; [key: string]: unknown }>;
  }
}
