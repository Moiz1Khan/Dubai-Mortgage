"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useEiborMortgageRates } from "@/lib/useEiborMortgageRates";
import { EiborFixingsTable } from "@/components/EiborFixingsTable";
import { RatesGateBoundary } from "@/components/RatesGateBoundary";

export function ResidentialRatesTable() {
  const ref = useRef<HTMLElement | null>(null);
  const { data, loading } = useEiborMortgageRates();
  const rates = data.residential;

  return (
    <section ref={ref} id="rates" className="py-10 md:py-14 bg-transparent" data-reveal>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            What You&apos;ll Actually Pay
          </h2>
          <p className="text-sm text-muted-foreground md:text-base">
            Unlock once to view live EIBOR and indicative residential ranges (same as the main site).
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

          <p className="mb-4 text-center text-sm font-semibold text-foreground">Indicative residential ranges</p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-2xl bg-card shadow-lg">
              <thead>
                <tr className="bg-primary/10">
                  <th className="border-b border-border p-4 text-left font-semibold text-foreground md:p-5">
                    Property Value
                  </th>
                  <th className="border-b border-border p-4 text-left font-semibold text-foreground md:p-5">
                    Fixed Rate (3-5Y)
                  </th>
                  <th className="border-b border-border p-4 text-left font-semibold text-foreground md:p-5">
                    Variable Rate
                  </th>
                  <th className="border-b border-border p-4 text-left font-semibold text-foreground md:p-5">
                    Down Payment
                  </th>
                </tr>
              </thead>
              <tbody>
                {rates.map((rate) => (
                  <tr key={rate.propertyValue} className="transition-colors hover:bg-secondary/20">
                    <td className="border-b border-border p-4 font-medium text-foreground last:border-b-0 md:p-5">
                      {rate.propertyValue}
                    </td>
                    <td className="border-b border-border p-4 text-muted-foreground last:border-b-0 md:p-5">
                      {rate.fixed}
                    </td>
                    <td className="border-b border-border p-4 text-muted-foreground last:border-b-0 md:p-5">
                      {rate.variable}
                    </td>
                    <td className="border-b border-border p-4 text-muted-foreground last:border-b-0 md:p-5">
                      {rate.down}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-muted-foreground">
            Based on CBUAE 3M / 1Y EIBOR plus indicative margins. Your rate depends on credit score, employment type,
            property type, and down payment.{" "}
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
              <a href="#contact">Get My Exact Rate Quote</a>
            </Button>
          </div>
        </RatesGateBoundary>
      </div>
    </section>
  );
}
