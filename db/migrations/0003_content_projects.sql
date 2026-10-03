-- Editable page content, one JSON document per section (see
-- lib/content-schema.ts). Sections without a row use the code defaults.
create table if not exists site_content (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

drop trigger if exists site_content_touch_updated_at on site_content;
create trigger site_content_touch_updated_at
before update on site_content
for each row execute function touch_updated_at();

-- Portfolio projects managed from /admin/projects (replaces data/projects.ts)
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  title text not null,
  mark text not null,
  category text not null,
  description text not null,
  url text,
  published boolean not null default true,
  featured boolean not null default true,
  sort_order integer not null default 0
);

create index if not exists projects_sort_idx
  on projects (published, sort_order, created_at);

drop trigger if exists projects_touch_updated_at on projects;
create trigger projects_touch_updated_at
before update on projects
for each row execute function touch_updated_at();

-- Seed the projects that previously lived in data/projects.ts.
insert into projects (title, mark, category, description, sort_order)
select * from (values
  ('TP Cakes & Bakes', 'TP', 'Digital Experience',
   'A digital platform for a growing baking academy.', 10),
  ('Arunachal Rents', 'AR', 'Digital Product',
   'A rental discovery platform built for Arunachal Pradesh.', 20),
  ('Himverse.ai', 'HV', 'AI Product',
   'An intelligent travel platform for exploring the Himalayas.', 30)
) as seed(title, mark, category, description, sort_order)
where not exists (select 1 from projects);
