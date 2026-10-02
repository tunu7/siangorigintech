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

Admin ─► /admin (password login, signed HttpOnly cookie)
           ├─ search / filter / paginate applications, status counts
           ├─ detail: status + internal notes, resume via 60s presigned URL
           └─ CSV export
```

Resumes go straight from the browser to Blob, so files never pass through
the Vercel Function (4.5MB request body limit).

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
   | `RESEND_API_KEY`, `RESEND_FROM_EMAIL` | Notification email sender (optional) |
   | `NEXT_PUBLIC_SITE_URL` | Base URL used in email links (optional) |

   `DATABASE_URL` (Neon) and `BLOB_READ_WRITE_TOKEN` (Blob) come from the
   integrations.

## Development

```bash
npm run dev
```

Jobs are defined in `data/jobs.ts`. Schema changes go in `db/migrations/`
as idempotent SQL files.
