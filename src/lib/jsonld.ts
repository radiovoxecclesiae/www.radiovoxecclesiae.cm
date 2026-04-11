import { station } from '@/config';
import type { Locale } from '@/config';

export function buildJsonLd(locale: Locale = 'fr') {
  return {
    '@context': 'https://schema.org',
    '@type': 'RadioStation',
    name: station.name,
    url: station.canonicalUrl,
    logo: `${station.canonicalUrl}${station.logoUrl}`,
    image: `${station.canonicalUrl}${station.ogImageUrl}`,
    description: station.description[locale],
    broadcastFrequency: station.frequencies.map((f) => ({
      '@type': 'BroadcastFrequencySpecification',
      broadcastFrequencyValue: f.value,
      broadcastSignalModulation: 'FM',
    })),
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Diocèse de Bafoussam',
      containedInPlace: { '@type': 'Country', name: 'Cameroun' },
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: station.contact.email,
      contactType: 'customer service',
    },
    sameAs: [station.contact.facebook],
  };
}
