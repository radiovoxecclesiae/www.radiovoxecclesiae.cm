import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from '@/config';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if pathname already starts with a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Rewrite / to /fr (serve content directly, no redirect — preserves OG scraping)
  // Redirect all other paths without locale prefix to their /fr equivalent
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  if (pathname === '/') {
    return NextResponse.rewrite(url);
  }
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon|images|site.webmanifest).*)'],
};
