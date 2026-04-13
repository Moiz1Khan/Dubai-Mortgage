"use client";

import { useEffect, useState } from "react";
import { Loader2, RefreshCcw } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

type Lead = {
  id: string;
  source: string;
  financing_type: string | null;
  employment_type: string | null;
  loan_amount: number | null;
  duration_years: number | null;
  name: string;
  email: string | null;
  mobile: string | null;
  city: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
};

async function getAdminToken() {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return "";
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token ?? "";
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadLeads() {
    setLoading(true);
    setError("");
    try {
      const token = await getAdminToken();
      if (!token) throw new Error("Admin session missing. Please sign in again.");
      const response = await fetch("/api/admin/leads", {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      if (!response.ok) throw new Error(await response.text());
      const data = (await response.json()) as { leads?: Lead[] };
      setLeads(data.leads ?? []);
    } catch (fetchError) {
      setError(
        fetchError instanceof Error ? fetchError.message : "Failed to load leads."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadLeads();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold mb-1">Leads</h2>
          <p className="text-muted-foreground">
            Website lead submissions from calculator and contact forms.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void loadLeads()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm hover:border-primary/30 transition-colors"
        >
          <RefreshCcw className="size-4" />
          Refresh
        </button>
      </div>

      {loading && (
        <div className="rounded-xl border border-border bg-card p-4 inline-flex items-center gap-2 text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          Loading leads...
        </div>
      )}
      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="rounded-xl border border-border bg-card overflow-auto">
          <table className="w-full min-w-[980px] text-sm">
            <thead className="bg-secondary/30 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Mobile</th>
                <th className="px-4 py-3 font-semibold">City</th>
                <th className="px-4 py-3 font-semibold">Source</th>
                <th className="px-4 py-3 font-semibold">Financing</th>
                <th className="px-4 py-3 font-semibold">Employment</th>
                <th className="px-4 py-3 font-semibold">Loan</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-t border-border align-top">
                  <td className="px-4 py-3 whitespace-nowrap">
                    {new Date(lead.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">{lead.name}</td>
                  <td className="px-4 py-3">{lead.email ?? "-"}</td>
                  <td className="px-4 py-3">{lead.mobile ?? "-"}</td>
                  <td className="px-4 py-3">{lead.city ?? "-"}</td>
                  <td className="px-4 py-3">{lead.source}</td>
                  <td className="px-4 py-3">{lead.financing_type ?? "-"}</td>
                  <td className="px-4 py-3">{lead.employment_type ?? "-"}</td>
                  <td className="px-4 py-3">
                    {lead.loan_amount
                      ? `${Number(lead.loan_amount).toLocaleString()} AED / ${lead.duration_years ?? "-"}y`
                      : "-"}
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-muted-foreground">
                    No leads yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
