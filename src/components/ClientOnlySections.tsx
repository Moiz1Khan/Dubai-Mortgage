"use client";

import dynamic from "next/dynamic";

// Client-only to avoid hydration mismatch from extensions (e.g. fdprocessedid)
export const ClientMortgageCalculator = dynamic(
  () => import("@/components/MortgageCalculator").then((m) => ({ default: m.MortgageCalculator })),
  { ssr: false, loading: () => <section id="calculator" className="py-10 md:py-14 min-h-[420px]" /> }
);

export const ClientProcess = dynamic(
  () => import("@/components/Process").then((m) => ({ default: m.Process })),
  { ssr: false, loading: () => <section id="process" className="py-10 md:py-14 min-h-[320px]" /> }
);

export const ClientFAQ = dynamic(
  () => import("@/components/FAQDome").then((m) => ({ default: m.FAQDome })),
  { ssr: false, loading: () => <section id="faq" className="py-10 md:py-14 min-h-[400px]" /> }
);

export const ClientCTAAndLeadSection = dynamic(
  () => import("@/components/CTAAndLeadSection").then((m) => ({ default: m.CTAAndLeadSection })),
  { ssr: false, loading: () => <section id="contact" className="py-10 md:py-14 min-h-[480px]" /> }
);
