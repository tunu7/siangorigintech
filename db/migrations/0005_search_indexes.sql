-- Trigram indexes so the admin's "contains" searches (ilike '%q%') stay
-- fast as applications and enquiries grow.
create extension if not exists pg_trgm;

create index if not exists applications_name_trgm_idx
  on applications using gin (name gin_trgm_ops);
create index if not exists applications_email_trgm_idx
  on applications using gin (email gin_trgm_ops);
create index if not exists applications_phone_trgm_idx
  on applications using gin (phone gin_trgm_ops);

create index if not exists enquiries_name_trgm_idx
  on enquiries using gin (name gin_trgm_ops);
create index if not exists enquiries_email_trgm_idx
  on enquiries using gin (email gin_trgm_ops);

-- Inbox tabs filter on these before sorting by date.
create index if not exists enquiries_archived_created_idx
  on enquiries (archived, created_at desc);
