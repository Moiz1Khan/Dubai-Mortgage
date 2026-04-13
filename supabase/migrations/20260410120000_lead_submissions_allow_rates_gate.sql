-- Allow public lead inserts from the mortgage rates unlock form (source = rates-gate).
-- Run in Supabase SQL Editor if your project was created before this source existed.

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
    'rates-gate'
  )
);
