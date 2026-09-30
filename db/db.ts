import * as schema from '@/db/schema';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const url = process.env.DATABASE_URL;

if (!url) {
  throw new Error('DATABASE_URL is not set');
}

const client = postgres(url, {
  ssl: url.includes('localhost') ? false : 'require',
});

export const db = drizzle(client, { schema });
