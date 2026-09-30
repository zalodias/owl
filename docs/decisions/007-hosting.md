# Host on Vercel’s free plan and Neon’s free Postgres

Status: locked  
Date: 2026-09-26

One Vercel Hobby project serves the script, ingest, the private read client, and the dashboard. Neon’s free Postgres is the only database, attached to production so preview deploys do not use the free database time.

The database sleeps after a few quiet minutes and wakes on the next visit. Half a gigabyte is enough for this site for a long time. If storage or monthly compute runs out, the database pauses until data is removed or the month resets. It does not start billing.

Also considered, and set aside for version 1:

- A single machine with a SQLite file (Fly.io, or an Oracle always-free VM). Real, and more to operate.
- Supabase’s free Postgres. Viable in front of the same app, and it stays down after a quiet week until someone restores it by hand.
- Cloudflare Workers with D1. Stronger free disk and no sleep, and a second platform from the rest of the work. The free plan also gives each request a very small amount of processing time, which makes the dashboard the hard part.
- AWS. The free database period ends and then it bills.
