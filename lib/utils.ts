export { cn } from 'cn';
import { createHmac } from 'crypto';

export function visitorHash(ip: string, userAgent: string) {
  const secret = process.env.HASH_SECRET;
  if (!secret) throw new Error('HASH_SECRET is not set');
  return createHmac('sha256', secret)
    .update(`${ip}\n${userAgent}`)
    .digest('hex');
}

export function deviceClass(userAgent: string) {
  const ua = userAgent.toLowerCase();
  if (/ipad|tablet|playbook|silk/.test(ua)) return 'tablet';
  if (/mobi|iphone|android/.test(ua)) return 'mobile';
  return 'desktop';
}

export function pagePath(input: string) {
  const url = new URL(input, 'https://owl.local');
  return url.pathname || '/';
}

export function referrerHost(input: string) {
  try {
    return new URL(input).hostname || null;
  } catch {
    return null;
  }
}

export function clientIp(headers: Headers) {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() || '0.0.0.0';
  return headers.get('x-real-ip') || '0.0.0.0';
}
