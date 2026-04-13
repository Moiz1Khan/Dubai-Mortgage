import type { EiborSnapshot } from "@/lib/eiborFetch";

/** Indicative ranges: variable ≈ 3M EIBOR + bank margin; fixed (3–5Y) ≈ 1Y EIBOR + margin. */
export function formatRateRange(low: number, high: number): string {
  const f = (n: number) => n.toFixed(2);
  return `${f(low)}% - ${f(high)}%`;
}

function varRange(e: EiborSnapshot, addLow: number, addHigh: number) {
  return formatRateRange(e.month3 + addLow, e.month3 + addHigh);
}

function fixRange(e: EiborSnapshot, addLow: number, addHigh: number) {
  return formatRateRange(e.year1 + addLow, e.year1 + addHigh);
}

/** Spreads calibrated so values match prior static tables when EIBOR ≈ Apr 2026 fixing. */
const HOME_MARGIN = [
  { who: "UAE National", down: "15-20%", v: [0.04, 1.18] as const, f: [0.16, 1.3] as const },
  { who: "UAE Non-Resident", down: "20-25%", v: [0.18, 1.34] as const, f: [0.26, 1.5] as const },
  { who: "First-Time Buyer", down: "20%", v: [0.28, 1.24] as const, f: [0.36, 1.4] as const },
  { who: "Non-Resident", down: "40-50%", v: [0.44, 1.94] as const, f: [0.76, 2.26] as const },
  { who: "Commercial Property", down: "35-50%", v: [0.68, 2.44] as const, f: [1.0, 2.76] as const },
] as const;

const RESIDENTIAL_MARGIN = [
  {
    propertyValue: "Under AED 1M",
    down: "25%",
    v: [0.676, 1.176] as const,
    f: [0.996, 1.496] as const,
  },
  {
    propertyValue: "AED 1M - 3M",
    down: "25%",
    v: [0.176, 0.976] as const,
    f: [0.496, 1.296] as const,
  },
  {
    propertyValue: "AED 3M - 5M",
    down: "20-25%",
    v: [0.176, 0.676] as const,
    f: [0.256, 1.156] as const,
  },
  {
    propertyValue: "Over AED 5M",
    down: "15-20%",
    v: [0.036, 0.436] as const,
    f: [0.156, 0.996] as const,
  },
] as const;

const NON_RESIDENT_MARGIN = [
  {
    propertyValue: "AED 1M - 2M",
    ltv: "50%",
    v: [1.436, 1.936] as const,
    f: [1.756, 2.256] as const,
  },
  {
    propertyValue: "AED 2M - 4M",
    ltv: "50-55%",
    v: [0.936, 1.676] as const,
    f: [1.256, 1.996] as const,
  },
  {
    propertyValue: "AED 4M - 8M",
    ltv: "55-60%",
    v: [0.676, 1.436] as const,
    f: [0.996, 1.756] as const,
  },
  {
    propertyValue: "AED 8M+",
    ltv: "60%",
    v: [0.436, 1.176] as const,
    f: [0.756, 1.496] as const,
  },
] as const;

const COMMERCIAL_MARGIN = [
  {
    propertyType: "Owner-Occupied Office",
    ltv: "65%",
    v: [0.676, 1.676] as const,
    f: [0.996, 1.996] as const,
  },
  {
    propertyType: "Investment Office",
    ltv: "55-60%",
    v: [0.936, 1.936] as const,
    f: [1.256, 2.256] as const,
  },
  {
    propertyType: "Retail Property",
    ltv: "50-60%",
    v: [1.176, 2.176] as const,
    f: [1.496, 2.496] as const,
  },
  {
    propertyType: "Warehouse/Industrial",
    ltv: "55-65%",
    v: [0.936, 1.936] as const,
    f: [1.256, 2.256] as const,
  },
  {
    propertyType: "Mixed-Use",
    ltv: "50-55%",
    v: [1.436, 2.436] as const,
    f: [1.756, 2.756] as const,
  },
] as const;

export function buildHomeRateRows(e: EiborSnapshot) {
  return HOME_MARGIN.map((row) => ({
    who: row.who,
    fixed: fixRange(e, row.f[0], row.f[1]),
    variable: varRange(e, row.v[0], row.v[1]),
    down: row.down,
  }));
}

export function buildResidentialRateRows(e: EiborSnapshot) {
  return RESIDENTIAL_MARGIN.map((row) => ({
    propertyValue: row.propertyValue,
    fixed: fixRange(e, row.f[0], row.f[1]),
    variable: varRange(e, row.v[0], row.v[1]),
    down: row.down,
  }));
}

export function buildNonResidentRateRows(e: EiborSnapshot) {
  return NON_RESIDENT_MARGIN.map((row) => ({
    propertyValue: row.propertyValue,
    fixed: fixRange(e, row.f[0], row.f[1]),
    variable: varRange(e, row.v[0], row.v[1]),
    ltv: row.ltv,
  }));
}

export function buildCommercialRateRows(e: EiborSnapshot) {
  return COMMERCIAL_MARGIN.map((row) => ({
    propertyType: row.propertyType,
    fixed: fixRange(e, row.f[0], row.f[1]),
    variable: varRange(e, row.v[0], row.v[1]),
    ltv: row.ltv,
  }));
}

/** Shown when CBUAE fetch or parse fails. */
export const FALLBACK_HOME_ROWS = [
  { who: "UAE National", fixed: "4.15% - 5.29%", variable: "3.85% - 4.99%", down: "15-20%" },
  { who: "UAE Non-Resident", fixed: "4.25% - 5.49%", variable: "3.99% - 5.15%", down: "20-25%" },
  { who: "First-Time Buyer", fixed: "4.35% - 5.39%", variable: "4.09% - 5.05%", down: "20%" },
  { who: "Non-Resident", fixed: "4.75% - 6.25%", variable: "4.25% - 5.75%", down: "40-50%" },
  { who: "Commercial Property", fixed: "4.99% - 6.75%", variable: "4.49% - 6.25%", down: "35-50%" },
] as const;

export const FALLBACK_RESIDENTIAL_ROWS = [
  { propertyValue: "Under AED 1M", fixed: "4.99% - 5.49%", variable: "4.49% - 4.99%", down: "25%" },
  { propertyValue: "AED 1M - 3M", fixed: "4.49% - 5.29%", variable: "3.99% - 4.79%", down: "25%" },
  { propertyValue: "AED 3M - 5M", fixed: "4.25% - 5.15%", variable: "3.99% - 4.49%", down: "20-25%" },
  { propertyValue: "Over AED 5M", fixed: "4.15% - 4.99%", variable: "3.85% - 4.25%", down: "15-20%" },
] as const;

export const FALLBACK_NON_RESIDENT_ROWS = [
  { propertyValue: "AED 1M - 2M", fixed: "5.75% - 6.25%", variable: "5.25% - 5.75%", ltv: "50%" },
  { propertyValue: "AED 2M - 4M", fixed: "5.25% - 5.99%", variable: "4.75% - 5.49%", ltv: "50-55%" },
  { propertyValue: "AED 4M - 8M", fixed: "4.99% - 5.75%", variable: "4.49% - 5.25%", ltv: "55-60%" },
  { propertyValue: "AED 8M+", fixed: "4.75% - 5.49%", variable: "4.25% - 4.99%", ltv: "60%" },
] as const;

export const FALLBACK_COMMERCIAL_ROWS = [
  { propertyType: "Owner-Occupied Office", fixed: "4.99% - 5.99%", variable: "4.49% - 5.49%", ltv: "65%" },
  { propertyType: "Investment Office", fixed: "5.25% - 6.25%", variable: "4.75% - 5.75%", ltv: "55-60%" },
  { propertyType: "Retail Property", fixed: "5.49% - 6.49%", variable: "4.99% - 5.99%", ltv: "50-60%" },
  { propertyType: "Warehouse/Industrial", fixed: "5.25% - 6.25%", variable: "4.75% - 5.75%", ltv: "55-65%" },
  { propertyType: "Mixed-Use", fixed: "5.75% - 6.75%", variable: "5.25% - 6.25%", ltv: "50-55%" },
] as const;
