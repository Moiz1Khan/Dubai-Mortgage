"use client";

import { useEffect, useState } from "react";
import type { EiborTableRow } from "@/lib/eiborFetch";
import {
  FALLBACK_HOME_ROWS,
  FALLBACK_RESIDENTIAL_ROWS,
  FALLBACK_NON_RESIDENT_ROWS,
  FALLBACK_COMMERCIAL_ROWS,
} from "@/lib/eiborMortgageRows";

export type HomeRateRow = { who: string; fixed: string; variable: string; down: string };
export type ResidentialRateRow = {
  propertyValue: string;
  fixed: string;
  variable: string;
  down: string;
};
export type NonResidentRateRow = {
  propertyValue: string;
  fixed: string;
  variable: string;
  ltv: string;
};
export type CommercialRateRow = {
  propertyType: string;
  fixed: string;
  variable: string;
  ltv: string;
};

export type EiborPublicResponse = {
  ok: boolean;
  fromCbuae: boolean;
  sourceLabel: string;
  sourcePageUrl: string;
  eibor: {
    overnight: number;
    week1: number;
    month1: number;
    month3: number;
    month6: number;
    year1: number;
    rateDateLabel: string;
  } | null;
  /** Full “current month” table from CBUAE HTML (same columns as centralbank.ae). */
  eiborTableRows: EiborTableRow[];
  home: HomeRateRow[];
  residential: ResidentialRateRow[];
  nonResident: NonResidentRateRow[];
  commercial: CommercialRateRow[];
};

const initial: EiborPublicResponse = {
  ok: true,
  fromCbuae: false,
  sourceLabel: "Central Bank of the UAE (EIBOR)",
  sourcePageUrl: "https://www.centralbank.ae/en/FOREX-EIBOR/EIBOR-RATES",
  eibor: null,
  eiborTableRows: [],
  home: [...FALLBACK_HOME_ROWS],
  residential: [...FALLBACK_RESIDENTIAL_ROWS],
  nonResident: [...FALLBACK_NON_RESIDENT_ROWS],
  commercial: [...FALLBACK_COMMERCIAL_ROWS],
};

export function useEiborMortgageRates() {
  const [data, setData] = useState<EiborPublicResponse>(initial);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/public/eibor", { cache: "no-store" });
        if (!res.ok) throw new Error("eibor");
        const json = (await res.json()) as EiborPublicResponse;
        if (!cancelled) setData(json);
      } catch {
        if (!cancelled) setData(initial);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();

    const onVis = () => {
      if (document.visibilityState === "visible") void load();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return { data, loading };
}
