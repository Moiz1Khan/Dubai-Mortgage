-- Allow newsletter signups from the footer (source = newsletter-footer).

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
    'newsletter-footer'
  )
);
