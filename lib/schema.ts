import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const pageviews = pgTable('pageviews', {
  id: text('id').primaryKey(),
  websiteId: text('website_id').notNull(),
  visitorHash: text('visitor_hash').notNull(),
  path: text('path').notNull(),
  referrer: text('referrer'),
  country: text('country'),
  device: text('device'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  duration: integer('duration'),
});
