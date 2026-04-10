import type { MetadataRoute } from 'next';
import { locales } from '@/config';
import station from '@/config/station';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = station.canonicalUrl;

  const routes = ['', '/support', '/privacy', '/terms'];

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${base}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'weekly' : 'monthly' as const,
      priority: route === '' ? 1.0 : 0.6,
    }))
  );
}
