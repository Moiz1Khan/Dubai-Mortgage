"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  FileStack,
  Inbox,
  Loader2,
  RefreshCcw,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

type RecentLead = {
  id: string;
  source: string;
  name: string;
  email: string | null;
  created_at: string;
};

type DashboardPayload = {
  leads: {
    total: number;
    last7Days: number;
    previous7Days: number;
    bySource: Record<string, number>;
  };
  blogs: { total: number; published: number; drafts: number };
  content: { pagesWithContent: number };
  recentLeads: RecentLead[];
};

const SOURCE_LABELS: Record<string, string> = {
  "calculator-modal": "Mortgage calculator",
  "contact-page-form": "Contact page",
  "cta-quote-form": "CTA / quote",
  "rates-gate": "Rates unlock",
  "newsletter-footer": "Newsletter",
  "commercial-checklist-cta": "Commercial finance",
  "non-resident-checklist-cta": "Non-resident finance",
  other: "Other / legacy",
};

async function getAdminToken() {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return "";
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token ?? "";
}

function formatTrend(current: number, previous: number): {
  label: string;
  positive: boolean | null;
} {
  if (previous === 0 && current === 0) return { label: "No change", positive: null };
  if (previous === 0 && current > 0) return { label: "New this week", positive: true };
  const pct = Math.round(((current - previous) / previous) * 100);
  if (pct === 0) return { label: "Same as prior week", positive: null };
  return {
    label: `${pct > 0 ? "+" : ""}${pct}% vs prior 7 days`,
    positive: pct > 0,
  };
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const token = await getAdminToken();
      if (!token) throw new Error("Admin session missing. Please sign in again.");
      const res = await fetch("/api/admin/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      const json = (await res.json()) as DashboardPayload & { error?: string };
      if (!res.ok) throw new Error(json.error || "Failed to load dashboard.");
      setData(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load dashboard.");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const trend = data
    ? formatTrend(data.leads.last7Days, data.leads.previous7Days)
    : null;

  const sourceRows = data
    ? Object.entries(data.leads.bySource)
        .filter(([, n]) => n > 0)
        .sort((a, b) => b[1] - a[1])
    : [];

  const maxSource = sourceRows.length ? Math.max(...sourceRows.map(([, n]) => n), 1) : 1;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="mt-1 text-muted-foreground">
            Live snapshot of leads, blog posts, and CMS coverage from your database.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void load()}
          disabled={loading}
          className="inline-flex items-center gap-2 self-start rounded-lg border border-border px-4 py-2 text-sm transition-colors hover:border-primary/30 disabled:opacity-50"
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : <RefreshCcw className="size-4" />}
          Refresh
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {loading && !data && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-28 animate-pulse rounded-xl border border-border bg-muted/40"
            />
          ))}
        </div>
      )}

      {data && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-muted-foreground">Total leads</span>
                <Inbox className="size-5 text-muted-foreground" aria-hidden />
              </div>
              <p className="mt-3 text-3xl font-bold tabular-nums">{data.leads.total}</p>
              <p className="mt-1 text-xs text-muted-foreground">All-time submissions</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-muted-foreground">Last 7 days</span>
                <Users className="size-5 text-muted-foreground" aria-hidden />
              </div>
              <p className="mt-3 text-3xl font-bold tabular-nums">{data.leads.last7Days}</p>
              {trend && (
                <p
                  className={`mt-2 inline-flex items-center gap-1 text-xs font-medium ${
                    trend.positive === true
                      ? "text-emerald-600 dark:text-emerald-400"
                      : trend.positive === false
                        ? "text-amber-700 dark:text-amber-400"
                        : "text-muted-foreground"
                  }`}
                >
                  {trend.positive === true && <TrendingUp className="size-3.5" aria-hidden />}
                  {trend.positive === false && <TrendingDown className="size-3.5" aria-hidden />}
                  {trend.label}
                </p>
              )}
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-muted-foreground">Blog posts</span>
                <BookOpen className="size-5 text-muted-foreground" aria-hidden />
              </div>
              <p className="mt-3 text-3xl font-bold tabular-nums">{data.blogs.published}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Published · {data.blogs.drafts} draft{data.blogs.drafts === 1 ? "" : "s"} ·{" "}
                {data.blogs.total} total
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-muted-foreground">CMS pages</span>
                <FileStack className="size-5 text-muted-foreground" aria-hidden />
              </div>
              <p className="mt-3 text-3xl font-bold tabular-nums">{data.content.pagesWithContent}</p>
              <p className="mt-1 text-xs text-muted-foreground">Page keys in site_content</p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <BarChart3 className="size-5 text-muted-foreground" aria-hidden />
                <h3 className="font-semibold">Leads by source</h3>
              </div>
              {sourceRows.length === 0 ? (
                <p className="text-sm text-muted-foreground">No leads recorded yet.</p>
              ) : (
                <ul className="space-y-3">
                  {sourceRows.map(([source, count]) => (
                    <li key={source}>
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="text-foreground">
                          {SOURCE_LABELS[source] ?? source}
                        </span>
                        <span className="tabular-nums font-medium">{count}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${Math.min(100, Math.round((count / maxSource) * 100))}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <Link
                href="/admin/leads"
                className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                View all leads
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 font-semibold">Recent activity</h3>
              {data.recentLeads.length === 0 ? (
                <p className="text-sm text-muted-foreground">No recent submissions.</p>
              ) : (
                <ul className="divide-y divide-border">
                  {data.recentLeads.map((lead) => (
                    <li key={lead.id} className="flex flex-wrap items-baseline justify-between gap-2 py-3 first:pt-0">
                      <div className="min-w-0">
                        <p className="truncate font-medium">{lead.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {SOURCE_LABELS[lead.source] ?? lead.source}
                          {lead.email ? ` · ${lead.email}` : ""}
                        </p>
                      </div>
                      <time
                        className="shrink-0 text-xs text-muted-foreground tabular-nums"
                        dateTime={lead.created_at}
                      >
                        {new Date(lead.created_at).toLocaleString(undefined, {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </time>
                    </li>
                  ))}
                </ul>
              )}
              <Link
                href="/admin/leads"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Open leads inbox
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/admin/content"
              className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
            >
              <h3 className="font-semibold group-hover:text-primary">Content Studio</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Edit site copy, FAQs, footer, and blog posts in one place.
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Open
                <ArrowRight className="size-4" />
              </span>
            </Link>
            <Link
              href="/admin/settings"
              className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
            >
              <h3 className="font-semibold group-hover:text-primary">Settings</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Environment and integration notes for this deployment.
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Open
                <ArrowRight className="size-4" />
              </span>
            </Link>
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
            >
              <h3 className="font-semibold group-hover:text-primary">Live website</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Preview the public site in a new tab.
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Open site
                <ArrowRight className="size-4" />
              </span>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
