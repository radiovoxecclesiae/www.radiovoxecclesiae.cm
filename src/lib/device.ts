export type Device = 'ios' | 'android' | 'other';

export function detectDevice(): Device {
  if (typeof navigator === 'undefined') return 'other';
  const ua = navigator.userAgent || '';
  if (/iPad|iPhone|iPod/.test(ua) && !('MSStream' in window)) return 'ios';
  if (/android/i.test(ua)) return 'android';
  return 'other';
}
