import { NextResponse } from "next/server";
import { defaultSiteContent } from "@/lib/siteContent";
import { getSupabaseAnonServerClient } from "@/lib/supabase/server";
import { mapRowsToSiteContent } from "@/lib/contentMapper";

export async function GET() {
  try {
    const supabase = getSupabaseAnonServerClient();
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
