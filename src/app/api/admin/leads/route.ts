import { NextRequest, NextResponse } from "next/server";
import { requireAdminFromRequest } from "@/lib/supabase/auth";
import { getSupabaseServiceClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const auth = await requireAdminFromRequest(request);
  if (!auth.ok) return auth.response;

  try {
    const supabase = getSupabaseServiceClient();
    const { data, error } = await supabase
      .from("lead_submissions")
      .select(
        "id, source, financing_type, employment_type, loan_amount, duration_years, name, email, mobile, city, metadata, created_at"
      )
      .order("created_at", { ascending: false })
      .limit(200);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ leads: data ?? [] });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch leads." },
      { status: 500 }
    );
  }
}
