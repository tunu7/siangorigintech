-- Cover image for projects (Blob pathname under projects/, served via /media)
alter table projects add column if not exists image text;

-- Failed admin sign-in attempts, used to rate-limit the login form.
create table if not exists admin_login_attempts (
  id bigint generated always as identity primary key,
  ip text not null,
  created_at timestamptz not null default now()
);

create index if not exists admin_login_attempts_ip_idx
  on admin_login_attempts (ip, created_at desc);
