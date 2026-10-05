# Siang Origin Technologies

Next.js 16 (App Router) site on Vercel. Job applications are stored in
Neon Postgres, resumes in a private Vercel Blob store, and reviewed in the
admin dashboard at `/admin`. All of it runs in Singapore (`sin1`), the
closest region to India.

## Architecture

```
Browser ──1. upload() ─► /api/apply/upload (client token) ─► Vercel Blob (private, PDF ≤10MB)
   │
   └──2. POST /api/apply (JSON) ─► Vercel Function ─► Neon Postgres (applications)
                                                 └─► after(): Resend email to the team

Admin ─► /admin  (also /login, /dashboard, or "Team login" in the footer)
           password login, signed HttpOnly cookie, returns you to the page
           you asked for; 5 failed attempts per IP → 15 min lockout

           Overview        what needs attention: new applications, unread
                           enquiries, open roles, latest activity
           Recruitment     Applications (search / filter / sort / bulk
                           actions / CSV), Jobs (create / edit / open / close)
           Inbox           Enquiries (unread / archived, bulk actions)
           Website         Pages (text of every page), Projects (with cover
                           images via /media/projects/*), Navigation & settings

Every content, project and job change revalidates the public site, so it
updates immediately while pages stay statically cached.
```

Resumes go straight from the browser to Blob, so files never pass through
the Vercel Function (4.5MB request body limit).

## Performance notes

- Public pages are static and re-render instantly when admin content
  changes (`revalidatePath`), plus hourly as a safety net for database
  changes made outside the admin, so visitors never wait on the database.
- Dashboard pages live in `app/admin/(dashboard)/` under one layout: the
  sidebar persists across navigations, unread counts stream in via
  `<Suspense>`, and `loading.tsx` shows a skeleton instantly.
- Each admin page loads its data in a single HTTP round trip to Neon using
  `batch()` from `lib/db.ts` (a read-only transaction). Prefer adding
  queries to a page's batch over adding new awaits.
- Search uses trigram (`pg_trgm`) indexes.
- Neon suspends idle compute after ~5 minutes; the first request after
  that pays a cold start. Disable scale-to-zero on the production branch
  in the Neon console if that matters.

## SEO

- The primary domain is `https://www.siangorigintechnologies.com` (Vercel
  redirects the apex to it). `lib/site.ts` uses it for canonical URLs,
  the sitemap and social previews; override with `NEXT_PUBLIC_SITE_URL`.
- `app/sitemap.ts`, `app/robots.ts` and `app/manifest.ts` are generated
  from the database and refresh with admin saves. Preview deployments
  disallow all crawling.
- Every public page sets a canonical URL, Open Graph and Twitter tags via
  `pageMetadata()` in `lib/seo.tsx`, plus JSON-LD: Organization and
  WebSite site-wide, breadcrumbs per page, and `JobPosting` on each role
  (eligible for Google for Jobs).
- Share images are generated per page (`opengraph-image.tsx`, rendered by
  `lib/og.tsx` with the font in `assets/fonts/`).
- Keywords, social profile links and Google/Bing verification codes are
  edited under Site settings → SEO.

## Setup

1. Provision storage (one-time; sets env vars on the Vercel project):

   ```bash
   vercel integration add neon -m region=sin1
   vercel blob create-store siangorigin-resumes --access private --region sin1
   vercel env pull --yes
   ```

2. Create the tables:

   ```bash
   npm run db:migrate
   ```

3. Set the remaining env vars in Vercel (`vercel env add`) and `.env.local`:

   | Variable | Purpose |
   | --- | --- |
   | `ADMIN_PASSWORD` | Password for `/admin` (use a long random one) |
   | `ADMIN_SESSION_SECRET` | ≥32 random chars used to sign the admin cookie |
   | `APPLICATIONS_NOTIFY_EMAIL` | Where new-application emails go (optional, comma-separated) |
   | `CONTACT_NOTIFY_EMAIL` | Where contact-form enquiry emails go (defaults to `APPLICATIONS_NOTIFY_EMAIL`); enquiries are always saved to the admin inbox |
   | `RESEND_API_KEY`, `RESEND_FROM_EMAIL` | Email sender for notifications (optional) |
   | `NEXT_PUBLIC_SITE_URL` | Base URL used in email links (optional) |

   `DATABASE_URL` (Neon) and `BLOB_READ_WRITE_TOKEN` (Blob) come from the
   integrations.

## Development

```bash
npm run dev
```

Page text and site settings are edited at `/admin/content`. Each section is
one JSON row in `site_content`; the editable fields and their default text
are defined in `lib/content-schema.ts` (add a field there and it appears in
the editor). Projects (`/admin/projects`) and jobs (`/admin/jobs`) have
their own tables, and contact enquiries are saved to `enquiries`. Schema changes go in `db/migrations/`
as idempotent SQL files.

## Design

Warm paper (`--color-paper`) and ink (`--color-ink`) with deep green as a
sparing accent; Instrument Serif for display type (`.font-display`) and
Geist for text. Tokens live in `app/globals.css`; shared public components
in `app/components/ui.tsx`, admin components in `app/admin/components/ui.tsx`.
