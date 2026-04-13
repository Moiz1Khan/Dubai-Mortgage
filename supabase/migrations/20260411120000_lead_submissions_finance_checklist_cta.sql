-- Allow lead inserts from commercial / non-resident finance checklist "Get Started" CTAs.

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
