CREATE TABLE "pageviews" (
	"id" text PRIMARY KEY NOT NULL,
	"website_id" text NOT NULL,
	"visitor_hash" text NOT NULL,
	"path" text NOT NULL,
	"referrer" text,
	"country" text,
	"device" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"duration" integer
);
