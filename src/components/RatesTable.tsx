"use client";

import { Button } from "@/components/ui/button";
import { TrendingDown, Wallet, Calendar } from "lucide-react";
import { useEiborMortgageRates } from "@/lib/useEiborMortgageRates";
import { EiborFixingsTable } from "@/components/EiborFixingsTable";
import { RatesGateBoundary } from "@/components/RatesGateBoundary";

export function RatesTable() {
  const { data, loading } = useEiborMortgageRates();
  const rows = data.home;

  return (
    <section id="rates" className="py-10 md:py-14 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4">
            <TrendingDown className="size-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Current Mortgage Rates in Dubai
          </h2>
          <p className="mx-auto mb-2 max-w-xl text-sm text-muted-foreground md:text-base">
            Live EIBOR fixings and indicative ranges unlock after a one-time application.
          </p>
        </div>

        <RatesGateBoundary>
          <p className="mx-auto mb-6 max-w-xl text-center text-sm text-muted-foreground md:text-base">
            {loading
              ? "Loading latest EIBOR from the Central Bank of the UAE…"
              : data.fromCbuae && data.eibor
                ? `Indicative ranges from live EIBOR (3M variable · 1Y fixed base). CBUAE fixing: ${data.eibor.rateDateLabel}`
                : "Indicative ranges — live EIBOR unavailable; showing typical market bands."}
          </p>

          <EiborFixingsTable
            rows={data.eiborTableRows}
            loading={loading}
            fromCbuae={data.fromCbuae}
            sourcePageUrl={data.sourcePageUrl}
          />

          <p className="mb-4 text-center text-sm font-semibold text-foreground">
            Indicative mortgage ranges (EIBOR + typical bank margin)
          </p>

          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="p-4 text-left font-semibold md:p-5">
                      <span className="flex items-center gap-2">
                        <Wallet className="size-4 text-primary" />
                        Who You Are
                      </span>
                    </th>
                    <th className="p-4 text-left font-semibold md:p-5">Fixed Rate (3-5 Years)</th>
                    <th className="p-4 text-left font-semibold md:p-5">Variable Rate</th>
                    <th className="p-4 text-left font-semibold md:p-5">
                      <span className="flex items-center gap-2">
                        <Calendar className="size-4 text-primary" />
                        Down Payment
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.who} className="border-b border-border last:border-0">
                      <td className="p-4 font-medium md:p-5">{row.who}</td>
                      <td className="p-4 text-muted-foreground md:p-5">{row.fixed}</td>
                      <td className="p-4 text-muted-foreground md:p-5">{row.variable}</td>
                      <td className="p-4 text-muted-foreground md:p-5">{row.down}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-muted-foreground">
            Variable columns track <strong>3-month EIBOR</strong> plus an indicative bank margin; fixed (3–5Y) uses{" "}
            <strong>1-year EIBOR</strong> plus margin. Your actual rate depends on credit, property, loan size,
            employment, and bank policy — these are illustrations, not offers.{" "}
            <a
              href={data.sourcePageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2 hover:opacity-90"
            >
              Official EIBOR — CBUAE
            </a>
          </p>

          <div className="mt-10 text-center">
            <Button asChild size="lg">
              <a href="#contact">Get Personalized Rate Quote</a>
            </Button>
          </div>
        </RatesGateBoundary>
      </div>
    </section>
  );
}
