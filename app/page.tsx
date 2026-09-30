import { RefreshOnPageview } from '@/app/refresh-on-pageview';
import { db } from '@/db/db';
import { pageviews } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

const websiteId = 'test';

function formatTime(date: Date) {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export default async function Home() {
  const visits = await db
    .select({
      id: pageviews.id,
      path: pageviews.path,
      device: pageviews.device,
      createdAt: pageviews.createdAt,
    })
    .from(pageviews)
    .where(eq(pageviews.websiteId, websiteId))
    .orderBy(desc(pageviews.createdAt))
    .limit(20);

  return (
    <main className="mx-auto flex max-w-xl flex-col gap-10 px-4 py-16">
      <RefreshOnPageview />
      <script
        dangerouslySetInnerHTML={{
          __html:
            "window.__owlRecorded=new Promise(function(resolve){addEventListener('owl:pageview',function(){resolve()},{once:true})})",
        }}
      />
      <script defer src="/script.js" data-website={websiteId} />
      <div className="flex flex-col gap-6">
        <h1 className="text-display-small-strong">Owl</h1>
        <p className="text-body-large-default text-foreground-neutral-faded">
          Minimal personal analytics.
        </p>
      </div>
      <section className="flex flex-col gap-4">
        <h2 className="text-title-small-strong">Latest visits</h2>
        {visits.length === 0 ? (
          <p className="text-body-medium-default text-foreground-neutral-faded">
            No visits yet.
          </p>
        ) : (
          <ul className="flex flex-col">
            {visits.map((visit) => (
              <li
                key={visit.id}
                className="border-border-neutral-faded flex items-baseline justify-between gap-4 border-b py-3"
              >
                <span className="text-body-medium-strong">{visit.path}</span>
                <span className="text-body-small-default text-foreground-neutral-faded">
                  {visit.device} · {formatTime(visit.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
