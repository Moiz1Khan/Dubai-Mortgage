import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAnonServerClient } from "@/lib/supabase/server";

const leadSchema = z.object({
  source: z.enum([
    "calculator-modal",
    "contact-page-form",
    "cta-quote-form",
    "rates-gate",
    "commercial-checklist-cta",
    "non-resident-checklist-cta",
  ]),
  financingType: z.string().optional(),
  employmentType: z.string().optional(),
  loanAmount: z.number().optional(),
  durationYears: z.number().int().optional(),
  name: z.string().min(1),
  email: z.string().email().optional().or(z.literal("")),
  mobile: z.string().optional(),
  city: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid lead payload." }, { status: 400 });
  }

  const lead = parsed.data;
  try {
    const supabase = getSupabaseAnonServerClient();
    const { error } = await supabase.from("lead_submissions").insert({
      source: lead.source,
      financing_type: lead.financingType ?? null,
      employment_type: lead.employmentType ?? null,
      loan_amount: lead.loanAmount ?? null,
      duration_years: lead.durationYears ?? null,
      name: lead.name,
      email: lead.email || null,
      mobile: lead.mobile ?? null,
      city: lead.city ?? null,
      metadata: lead.metadata ?? {},
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Supabase not configured." },
      { status: 500 }
    );
  }
}
