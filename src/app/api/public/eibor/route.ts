import { NextResponse } from "next/server";
import { fetchEiborBundle } from "@/lib/eiborFetch";
import {
  buildHomeRateRows,
  buildResidentialRateRows,
  buildNonResidentRateRows,
  buildCommercialRateRows,
  FALLBACK_HOME_ROWS,
  FALLBACK_RESIDENTIAL_ROWS,
  FALLBACK_NON_RESIDENT_ROWS,
  FALLBACK_COMMERCIAL_ROWS,
} from "@/lib/eiborMortgageRows";

export const dynamic = "force-dynamic";

export async function GET() {
  const { snapshot: eibor, tableRows: eiborTableRows } = await fetchEiborBundle();
  const fromCbuae = Boolean(eibor);

  const body = {
    ok: true as const,
    fromCbuae,
    sourceLabel: "Central Bank of the UAE (EIBOR)",
    sourcePageUrl: "https://www.centralbank.ae/en/FOREX-EIBOR/EIBOR-RATES",
    eibor: eibor
      ? {
          overnight: eibor.overnight,
          week1: eibor.week1,
          month1: eibor.month1,
          month3: eibor.month3,
          month6: eibor.month6,
          year1: eibor.year1,
          rateDateLabel: eibor.rateDateLabel,
        }
      : null,
    eiborTableRows,
    home: eibor ? buildHomeRateRows(eibor) : [...FALLBACK_HOME_ROWS],
    residential: eibor ? buildResidentialRateRows(eibor) : [...FALLBACK_RESIDENTIAL_ROWS],
    nonResident: eibor ? buildNonResidentRateRows(eibor) : [...FALLBACK_NON_RESIDENT_ROWS],
    commercial: eibor ? buildCommercialRateRows(eibor) : [...FALLBACK_COMMERCIAL_ROWS],
  };

  // Do not cache failed/empty payloads at the edge — that would serve "no EIBOR" to everyone.
  const cacheControl = fromCbuae
    ? "public, s-maxage=1800, stale-while-revalidate=3600"
    : "private, no-store, max-age=0, must-revalidate";

  return NextResponse.json(body, {
    headers: {
      "Cache-Control": cacheControl,
    },
  });
}
