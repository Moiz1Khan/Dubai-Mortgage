-- Credit Link Supabase schema

create extension if not exists pgcrypto;

create table if not exists public.site_content (
  page_key text primary key,
  content_json jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  category text not null default 'Guides',
  read_time text not null default '4 min read',
  published_at date not null default current_date,
  image_url text not null default '',
  content_paragraphs text[] not null default '{}',
  keywords text not null default '',
  is_published boolean not null default false,
  updated_at timestamptz not null default now()
);

create index if not exists idx_blog_posts_is_published
  on public.blog_posts (is_published);
create index if not exists idx_blog_posts_published_at
  on public.blog_posts (published_at desc);
create index if not exists idx_blog_posts_slug
  on public.blog_posts (slug);

create table if not exists public.lead_submissions (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  financing_type text,
  employment_type text,
  loan_amount numeric(12,2),
  duration_years int,
  name text not null,
  email text,
  mobile text,
  city text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.button_events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  path text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.site_content enable row level security;
alter table public.blog_posts enable row level security;
alter table public.lead_submissions enable row level security;
alter table public.button_events enable row level security;

drop policy if exists "public_read_site_content" on public.site_content;
create policy "public_read_site_content"
on public.site_content
for select
to anon, authenticated
using (true);

drop policy if exists "public_read_published_blog_posts" on public.blog_posts;
create policy "public_read_published_blog_posts"
on public.blog_posts
for select
to anon, authenticated
using (is_published = true or auth.role() = 'authenticated');

drop policy if exists "public_insert_lead_submissions" on public.lead_submissions;
create policy "public_insert_lead_submissions"
on public.lead_submissions
for insert
to anon, authenticated
with check (
  source in (
    'calculator-modal',
    'contact-page-form',
    'cta-quote-form',
    'rates-gate',
    'newsletter-footer',
    'commercial-checklist-cta',
    'non-resident-checklist-cta'
  )
);

drop policy if exists "public_insert_button_events" on public.button_events;
create policy "public_insert_button_events"
on public.button_events
for insert
to anon, authenticated
with check (true);

-- Admin writes should be done from server-side service role key in API routes.
