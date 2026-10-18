-- Which services an enquiry is about (titles at the time it was sent) and
-- the page the visitor started from, e.g. /services/ai-automation.
alter table enquiries
  add column if not exists services text[] not null default '{}',
  add column if not exists source text;

-- Filter the inbox by service.
create index if not exists enquiries_services_idx
  on enquiries using gin (services);
