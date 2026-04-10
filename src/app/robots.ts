import type { MetadataRoute } from 'next';
import station from '@/config/station';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${station.canonicalUrl}/sitemap.xml`,
  };
}
