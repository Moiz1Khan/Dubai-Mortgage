import { NextRequest, NextResponse } from "next/server";
import { requireAdminFromRequest } from "@/lib/supabase/auth";
import { getSupabaseServiceClient } from "@/lib/supabase/server";

const LEAD_SOURCES = [
  "calculator-modal",
  "contact-page-form",
  "cta-quote-form",
  "rates-gate",
  "newsletter-footer",
  "commercial-checklist-cta",
  "non-resident-checklist-cta",
] as const;

function startOfDayUtc(d: Date): Date {
  const x = new Date(d);
  x.setUTCHours(0, 0, 0, 0);
  return x;
}

export async function GET(request: NextRequest) {
  const auth = await requireAdminFromRequest(request);
  if (!auth.ok) return auth.response;

  try {
    const supabase = getSupabaseServiceClient();
    const now = new Date();
    const today = startOfDayUtc(now);
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setUTCDate(sevenDaysAgo.getUTCDate() - 7);
    const fourteenDaysAgo = new Date(today);
    fourteenDaysAgo.setUTCDate(fourteenDaysAgo.getUTCDate() - 14);

    const [
      totalLeadsRes,
      leads7dRes,
      leadsPrev7dRes,
      blogsTotalRes,
      blogsPublishedRes,
      contentPagesRes,
      recentLeadsRes,
      ...sourceCountRes
    ] = await Promise.all([
      supabase.from("lead_submissions").select("*", { count: "exact", head: true }),
      supabase
        .from("lead_submissions")
        .select("*", { count: "exact", head: true })
        .gte("created_at", sevenDaysAgo.toISOString()),
      supabase
        .from("lead_submissions")
        .select("*", { count: "exact", head: true })
        .gte("created_at", fourteenDaysAgo.toISOString())
        .lt("created_at", sevenDaysAgo.toISOString()),
      supabase.from("blog_posts").select("*", { count: "exact", head: true }),
      supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("is_published", true),
      supabase.from("site_content").select("page_key", { count: "exact", head: true }),
      supabase
        .from("lead_submissions")
        .select("id, source, name, email, created_at")
        .order("created_at", { ascending: false })
        .limit(8),
      ...LEAD_SOURCES.map((source) =>
        supabase.from("lead_submissions").select("*", { count: "exact", head: true }).eq("source", source),
      ),
    ]);

    const totalLeads = totalLeadsRes.count ?? 0;
    const leadsLast7Days = leads7dRes.count ?? 0;
    const leadsPrevious7Days = leadsPrev7dRes.count ?? 0;

    const bySource: Record<string, number> = {};
    LEAD_SOURCES.forEach((source, i) => {
      const c = sourceCountRes[i]?.count ?? 0;
      if (c > 0) bySource[source] = c;
    });
    const sumLabeled = Object.values(bySource).reduce((a, b) => a + b, 0);
    const otherLeads = Math.max(0, totalLeads - sumLabeled);
    if (otherLeads > 0) {
      bySource.other = otherLeads;
    }

    const blogsTotal = blogsTotalRes.count ?? 0;
    const blogsPublished = blogsPublishedRes.count ?? 0;

    if (recentLeadsRes.error) {
      return NextResponse.json(
        { error: recentLeadsRes.error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({
      leads: {
        total: totalLeads,
        last7Days: leadsLast7Days,
        previous7Days: leadsPrevious7Days,
        bySource,
      },
      blogs: {
        total: blogsTotal,
        published: blogsPublished,
        drafts: Math.max(0, blogsTotal - blogsPublished),
      },
      content: {
        pagesWithContent: contentPagesRes.count ?? 0,
      },
      recentLeads: recentLeadsRes.data ?? [],
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Dashboard load failed." },
      { status: 500 },
    );
  }
}
