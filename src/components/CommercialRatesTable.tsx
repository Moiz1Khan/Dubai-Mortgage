"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useEiborMortgageRates } from "@/lib/useEiborMortgageRates";
import { EiborFixingsTable } from "@/components/EiborFixingsTable";
import { RatesGateBoundary } from "@/components/RatesGateBoundary";

export function CommercialRatesTable() {
  const ref = useRef<HTMLElement>(null);
  const { data, loading } = useEiborMortgageRates();
  const rates = data.commercial;

  return (
    <section ref={ref} id="rates" className="py-10 md:py-14 bg-transparent" data-reveal>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            CURRENT COMMERCIAL MORTGAGE RATES
          </h2>
          <p className="text-sm text-muted-foreground md:text-base">
            Unlock once to view live EIBOR and commercial indicative ranges.
          </p>
        </div>

        <RatesGateBoundary>
          <p className="mb-6 text-center text-sm text-muted-foreground md:text-base">
            {loading
              ? "Loading latest EIBOR…"
              : data.fromCbuae && data.eibor
                ? `Indicative rates from CBUAE EIBOR · ${data.eibor.rateDateLabel}`
                : "Indicative rates (typical ranges if EIBOR feed unavailable)"}
          </p>

          <EiborFixingsTable
            rows={data.eiborTableRows}
            loading={loading}
            fromCbuae={data.fromCbuae}
            sourcePageUrl={data.sourcePageUrl}
            compact
          />

          <p className="mb-4 text-center text-sm font-semibold text-foreground">Indicative commercial ranges</p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-2xl bg-card shadow-lg">
              <thead>
                <tr className="bg-primary/10">
                  <th className="border-b border-border p-4 text-left font-semibold text-foreground md:p-5">
                    Property Type
                  </th>
                  <th className="border-b border-border p-4 text-left font-semibold text-foreground md:p-5">
                    Fixed Rate
                  </th>
                  <th className="border-b border-border p-4 text-left font-semibold text-foreground md:p-5">
                    Variable Rate
                  </th>
                  <th className="border-b border-border p-4 text-left font-semibold text-foreground md:p-5">
                    Typical LTV
                  </th>
                </tr>
              </thead>
              <tbody>
                {rates.map((rate) => (
                  <tr key={rate.propertyType} className="transition-colors hover:bg-secondary/20">
                    <td className="border-b border-border p-4 font-medium text-foreground last:border-b-0 md:p-5">
                      {rate.propertyType}
                    </td>
                    <td className="border-b border-border p-4 text-muted-foreground last:border-b-0 md:p-5">
                      {rate.fixed}
                    </td>
                    <td className="border-b border-border p-4 text-muted-foreground last:border-b-0 md:p-5">
                      {rate.variable}
                    </td>
                    <td className="border-b border-border p-4 text-muted-foreground last:border-b-0 md:p-5">
                      {rate.ltv}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-muted-foreground">
            Rates depend on: Business age, DSCR, property quality, tenant mix, LTV.{" "}
            <a
              href={data.sourcePageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2"
            >
              EIBOR source
            </a>
          </p>

          <div className="mt-10 text-center">
            <Button asChild size="lg">
              <a href="#contact">Get Commercial Property Loan Quote</a>
            </Button>
          </div>
        </RatesGateBoundary>
      </div>
    </section>
  );
}
