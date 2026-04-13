"use client";

import type { EiborTableRow } from "@/lib/eiborFetch";

function fmt(n: number) {
  return n.toFixed(6);
}

type Props = {
  rows: EiborTableRow[];
  loading: boolean;
  fromCbuae: boolean;
  sourcePageUrl: string;
  /** Tighter spacing when stacked under another rates block */
  compact?: boolean;
};

export function EiborFixingsTable({
  rows,
  loading,
  fromCbuae,
  sourcePageUrl,
  compact = false,
}: Props) {
  return (
    <div className={compact ? "mb-10" : "mb-12 md:mb-14"}>
      <div className="max-w-5xl mx-auto">
        <h3 className="text-lg md:text-xl font-bold text-[#0b192e] tracking-tight">
          Current month
        </h3>
        <p className="text-sm text-[#4a5568] mt-1 mb-5 md:mb-6">
          Up to today&apos;s date (from 1st of the month until today)
        </p>

        <div className="overflow-x-auto rounded-lg border border-[#c5d0e0] bg-white shadow-sm">
          <table className="w-full min-w-[720px] text-sm border-collapse">
            <thead>
              <tr className="bg-[#0b192e] text-white">
                {[
                  "Date",
                  "O/N",
                  "1 Week",
                  "1 Month",
                  "3 Months",
                  "6 Months",
                  "1 Year",
                  "Value Date",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left font-semibold py-3 px-3 md:px-4 whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-10 px-4 text-center text-muted-foreground">
                    Loading EIBOR fixings from the Central Bank of the UAE…
                  </td>
                </tr>
              ) : !fromCbuae || rows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-10 px-4 text-center text-muted-foreground">
                    Live EIBOR table could not be loaded. Open the official CBUAE page for current
                    fixings, or try again later.
                  </td>
                </tr>
              ) : (
                rows.map((row, i) => (
                  <tr
                    key={`${row.dateLabel}-${row.valueDateLabel}-${i}`}
                    className={i % 2 === 0 ? "bg-[#f4f6f9]" : "bg-white"}
                  >
                    <td className="py-2.5 px-3 md:px-4 text-[#1a2332] border-b border-[#e2e8f0]">
                      {row.dateLabel}
                    </td>
                    <td className="py-2.5 px-3 md:px-4 font-mono tabular-nums text-[#1a2332] border-b border-[#e2e8f0]">
                      {fmt(row.overnight)}
                    </td>
                    <td className="py-2.5 px-3 md:px-4 font-mono tabular-nums text-[#1a2332] border-b border-[#e2e8f0]">
                      {fmt(row.week1)}
                    </td>
                    <td className="py-2.5 px-3 md:px-4 font-mono tabular-nums text-[#1a2332] border-b border-[#e2e8f0]">
                      {fmt(row.month1)}
                    </td>
                    <td className="py-2.5 px-3 md:px-4 font-mono tabular-nums text-[#1a2332] border-b border-[#e2e8f0]">
                      {fmt(row.month3)}
                    </td>
                    <td className="py-2.5 px-3 md:px-4 font-mono tabular-nums text-[#1a2332] border-b border-[#e2e8f0]">
                      {fmt(row.month6)}
                    </td>
                    <td className="py-2.5 px-3 md:px-4 font-mono tabular-nums text-[#1a2332] border-b border-[#e2e8f0]">
                      {fmt(row.year1)}
                    </td>
                    <td className="py-2.5 px-3 md:px-4 text-[#1a2332] border-b border-[#e2e8f0]">
                      {row.valueDateLabel}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs md:text-sm text-muted-foreground leading-relaxed">
          From 15 April 2018, Thomson Reuters Ltd is the calculating agent for EIBOR. The Central Bank
          of the UAE continues to publish daily fixings. Data is fetched from the same source as the
          official site and cached briefly for performance; refresh the page for the latest pull.{" "}
          <a
            href={sourcePageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0b192e] font-medium underline underline-offset-2 hover:opacity-90"
          >
            CBUAE EIBOR rates
          </a>
        </p>
      </div>
    </div>
  );
}
