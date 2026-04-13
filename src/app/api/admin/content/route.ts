import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { defaultSiteContent, type SiteContent } from "@/lib/siteContent";
import { requireAdminFromRequest } from "@/lib/supabase/auth";
import { getSupabaseServiceClient } from "@/lib/supabase/server";
import { mapRowsToSiteContent } from "@/lib/contentMapper";

const pageSchema = z.record(z.string(), z.string());
const siteContentSchema = z.object({
  home: pageSchema,
  residentialFinance: pageSchema,
  commercialFinance: pageSchema,
  nonResidentFinance: pageSchema,
  about: pageSchema,
  faq: pageSchema,
  contact: pageSchema,
  footer: pageSchema,
  blog: pageSchema,
});

export async function GET(request: NextRequest) {
  const auth = await requireAdminFromRequest(request);
  if (!auth.ok) return auth.response;

  try {
    const supabase = getSupabaseServiceClient();
    const { data, error } = await supabase
      .from("site_content")
      .select("page_key, content_json");
    if (error) throw error;
    const content = mapRowsToSiteContent(
      (data ?? []) as Array<{ page_key: string; content_json: unknown }>
    );
    return NextResponse.json({ content });
  } catch {
    return NextResponse.json({ content: defaultSiteContent });
  }
}

export async function PUT(request: NextRequest) {
  const auth = await requireAdminFromRequest(request);
  if (!auth.ok) return auth.response;

  const body = await request.json();
  const parseResult = siteContentSchema.safeParse(body?.content);
  if (!parseResult.success) {
    return NextResponse.json(
      { error: "Invalid content payload." },
      { status: 400 }
    );
  }

  const content = parseResult.data as SiteContent;
  const rows = Object.entries(content).map(([pageKey, pageContent]) => ({
    page_key: pageKey,
    content_json: pageContent,
    updated_at: new Date().toISOString(),
  }));

  try {
    const supabase = getSupabaseServiceClient();
    const { error } = await supabase
      .from("site_content")
      .upsert(rows, { onConflict: "page_key" });
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
