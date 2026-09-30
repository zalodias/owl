import postgres from "postgres";

const url = process.env.DATABASE_URL;

if (!url) {
  throw new Error("DATABASE_URL is not set");
}

export const sql = postgres(url, { ssl: url.includes("localhost") ? false : "require" });

export async function ensureSchema() {
  await sql`
    create table if not exists pageviews (
      id text primary key,
      website_id text not null,
      visitor_hash text not null,
      path text not null,
      referrer text,
      country text,
      device text,
      created_at timestamptz not null default now(),
      duration_ms integer
    )
  `;
}
