import { buildJsonLd } from '@/lib/jsonld';

// Statically generated at build time — no dynamic data
export const dynamic = 'force-static';

export async function GET() {
  return Response.json(buildJsonLd());
}
