-- Job applications (replaces the Google Sheet)
create extension if not exists pgcrypto;

do $$
begin
  create type application_status as enum (
    'new',
    'reviewing',
    'shortlisted',
    'rejected',
    'hired'
  );
exception
  when duplicate_object then null;
end
$$;

create table if not exists applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  job_slug text not null,
  job_title text not null,
  name text not null,
  email text not null,
  phone text not null,
  linkedin text,
  portfolio text,
  message text not null,
  resume_pathname text not null unique,
  resume_name text not null,
  status application_status not null default 'new',
  notes text
);

create index if not exists applications_created_at_idx
  on applications (created_at desc);
create index if not exists applications_job_slug_idx
  on applications (job_slug);
create index if not exists applications_status_idx
  on applications (status);
create index if not exists applications_email_job_idx
  on applications (lower(email), job_slug);

create or replace function touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists applications_touch_updated_at on applications;
create trigger applications_touch_updated_at
before update on applications
for each row execute function touch_updated_at();
