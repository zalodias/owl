# Owl

Owl is a simple, minimal analytics platform.

## Local

```bash
docker compose up -d
npm run db:migrate
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and refresh. The latest row is the visit you just made.

Production is a Vercel project plus Neon Postgres. Set `DATABASE_URL` and `HASH_SECRET` there. Point the script at this app:

```html
<script defer src="https://<your-owl-host>/script.js" data-website="public-id"></script>
```

