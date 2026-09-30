import { db } from '@/db/db';
import { pageviews } from '@/db/schema';
import {
  clientIp,
  deviceClass,
  pagePath,
  referrerHost,
  visitorHash,
} from '@/lib/utils';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (
    !body ||
    typeof body.id !== 'string' ||
    typeof body.website !== 'string' ||
    typeof body.path !== 'string'
  ) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const website = body.website.slice(0, 64);
  const path = pagePath(body.path);
  const referrer =
    typeof body.referrer === 'string' ? referrerHost(body.referrer) : null;
  const userAgent = request.headers.get('user-agent') || '';
  const country = request.headers.get('x-vercel-ip-country');

  await db
    .insert(pageviews)
    .values({
      id: body.id,
      websiteId: website,
      visitorHash: visitorHash(clientIp(request.headers), userAgent),
      path,
      referrer,
      country,
      device: deviceClass(userAgent),
    })
    .onConflictDoNothing();

  return Response.json({ ok: true });
}
