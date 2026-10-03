-- Job postings managed from /admin/jobs (replaces data/jobs.ts)
create table if not exists jobs (
  slug text primary key,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  title text not null,
  department text not null,
  type text not null,
  location text not null,
  experience text not null,
  salary text,
  description text not null,
  responsibilities text[] not null default '{}',
  requirements text[] not null default '{}',
  benefits text[] not null default '{}',
  is_open boolean not null default true,
  sort_order integer not null default 0
);

create index if not exists jobs_open_sort_idx
  on jobs (is_open, sort_order, created_at desc);

drop trigger if exists jobs_touch_updated_at on jobs;
create trigger jobs_touch_updated_at
before update on jobs
for each row execute function touch_updated_at();

-- Seed the role that previously lived in data/jobs.ts.
insert into jobs (
  slug, title, department, type, location, experience, salary,
  description, responsibilities, requirements, benefits
) values (
  'marketing-manager',
  'Marketing Manager',
  'Marketing',
  'Full-time',
  'Itanagar / Hybrid',
  '2–5 years',
  '₹22,000–₹30,000/month',
  'Own the digital marketing workflow for our clients and turn business goals into clear, measurable growth strategies.',
  array[
    'Develop marketing strategies and campaigns for clients.',
    'Create and manage content calendars.',
    'Coordinate with the production team to execute campaigns.',
    'Manage social media, SEO and paid advertising activities.',
    'Track campaign performance and identify opportunities for improvement.',
    'Communicate with clients and maintain strong working relationships.'
  ],
  array[
    '2–5 years of experience in digital marketing.',
    'Strong understanding of social media marketing.',
    'Working knowledge of Meta Ads and Google Ads.',
    'Ability to create and execute marketing strategies.',
    'Strong communication and project management skills.',
    'Ability to work independently and take ownership.'
  ],
  array[
    'Work directly with the founding team.',
    'Exposure to technology, AI and automation.',
    'Work across multiple industries and businesses.',
    'Opportunity to grow with an early-stage technology company.'
  ]
)
on conflict (slug) do nothing;

-- Contact form enquiries (previously email-only)
create table if not exists enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  message text not null,
  read_at timestamptz,
  archived boolean not null default false
);

create index if not exists enquiries_created_at_idx
  on enquiries (created_at desc);
