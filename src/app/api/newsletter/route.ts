import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAnonServerClient } from "@/lib/supabase/server";

const bodySchema = z.object({
  email: z.string().email(),
});

/**
 * Footer newsletter signup — stored in lead_submissions for admin visibility (filter by source).
 */
export async function POST(request: NextRequest) {
  const json = await request.json();
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const { email } = parsed.data;
  try {
    const supabase = getSupabaseAnonServerClient();
    const { error } = await supabase.from("lead_submissions").insert({
      source: "newsletter-footer",
      name: "Newsletter subscriber",
      email,
      metadata: { subscribedFrom: "footer" },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not subscribe." },
      { status: 500 },
    );
  }
}
