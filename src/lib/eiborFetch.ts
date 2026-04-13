/**
 * Fetches and parses EIBOR fixings from CBUAE Umbraco surface (HTML tables).
 * CBUAE is behind Cloudflare; server-side fetch often gets a challenge page instead of HTML.
 * When direct fetch fails or returns a challenge, we fall back to r.jina.ai (read-only fetch of the same URL)
 * unless EIBOR_SKIP_JINA_FALLBACK=1.
 * @see https://www.centralbank.ae/en/FOREX-EIBOR/EIBOR-RATES
 */

const EIBOR_URLS = [
  "https://www.centralbank.ae/umbraco/Surface/Eibor/GetEiborData",
  "https://centralbank.ae/umbraco/Surface/Eibor/GetEiborData",
  "https://www.centralbank.ae/umbraco/Surface/EiborHome/GetEiborData",
] as const;

const EIBOR_PRIMARY_FOR_READER = EIBOR_URLS[0]!;

export type EiborSnapshot = {
  overnight: number;
  week1: number;
  month1: number;
  month3: number;
  month6: number;
  year1: number;
  rateDateLabel: string;
};

export type EiborTableRow = {
  dateLabel: string;
  overnight: number;
  week1: number;
  month1: number;
  month3: number;
  month6: number;
  year1: number;
  valueDateLabel: string;
};

function stripHtml(s: string): string {
  return s
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Every data row: Date + 6 rates + Value date (8 columns). */
function parseRawRows(html: string): EiborTableRow[] {
  const out: EiborTableRow[] = [];
  const trRe = /<tr\b[^>]*>([\s\S]*?)<\/tr>/gi;
  let trMatch: RegExpExecArray | null;
  while ((trMatch = trRe.exec(html)) !== null) {
    const inner = trMatch[1];
    const tds: string[] = [];
    const tdRe = /<td\b[^>]*>([\s\S]*?)<\/td>/gi;
    let tdMatch: RegExpExecArray | null;
    while ((tdMatch = tdRe.exec(inner)) !== null) {
      tds.push(stripHtml(tdMatch[1]));
    }
    if (tds.length < 8) continue;
    const nums = tds.slice(1, 7).map((t) => parseFloat(t.replace(",", ".")));
    if (nums.length !== 6 || nums.some((n) => !Number.isFinite(n) || n < 0.5 || n > 20)) {
      continue;
    }
    out.push({
      dateLabel: tds[0] ?? "",
      overnight: nums[0]!,
      week1: nums[1]!,
      month1: nums[2]!,
      month3: nums[3]!,
      month6: nums[4]!,
      year1: nums[5]!,
      valueDateLabel: tds[7] ?? "",
    });
  }
  return out;
}

/** Same calendar date may appear in more than one block; keep the last row (usually the detailed fixing). */
function dedupeByDatePreserveOrder(rows: EiborTableRow[]): EiborTableRow[] {
  const order: string[] = [];
  const byDate = new Map<string, EiborTableRow>();
  for (const r of rows) {
    if (!byDate.has(r.dateLabel)) order.push(r.dateLabel);
    byDate.set(r.dateLabel, r);
  }
  return order.map((d) => byDate.get(d)!);
}

export function parseEiborHtmlAllRows(html: string): EiborTableRow[] {
  return dedupeByDatePreserveOrder(parseRawRows(html));
}

/** Markdown pipe tables (e.g. from r.jina.ai reader of the same CBUAE page). */
function rowFromEightCells(cells: string[]): EiborTableRow | null {
  if (cells.length < 8) return null;
  const nums = cells.slice(1, 7).map((t) => parseFloat(t.replace(",", ".")));
  if (nums.length !== 6 || nums.some((n) => !Number.isFinite(n) || n < 0.5 || n > 20)) {
    return null;
  }
  return {
    dateLabel: cells[0] ?? "",
    overnight: nums[0]!,
    week1: nums[1]!,
    month1: nums[2]!,
    month3: nums[3]!,
    month6: nums[4]!,
    year1: nums[5]!,
    valueDateLabel: cells[7] ?? "",
  };
}

function parseEiborMarkdownPipeRows(text: string): EiborTableRow[] {
  const out: EiborTableRow[] = [];
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("|") || !trimmed.endsWith("|")) continue;
    const cells = trimmed
      .slice(1, -1)
      .split("|")
      .map((c) => c.trim());
    if (cells.length < 8) continue;
    if (/^date$/i.test(cells[0] ?? "")) continue;
    if (cells.every((c) => /^[\s:-]+$/.test(c))) continue;
    const row = rowFromEightCells(cells);
    if (row) out.push(row);
  }
  return out;
}

export function parseEiborMarkdownAllRows(text: string): EiborTableRow[] {
  return dedupeByDatePreserveOrder(parseEiborMarkdownPipeRows(text));
}

/** Try HTML tables first, then markdown pipe tables (Jina reader output). */
export function parseEiborContent(raw: string): EiborTableRow[] {
  const fromHtml = parseEiborHtmlAllRows(raw);
  if (fromHtml.length > 0) return fromHtml;
  return parseEiborMarkdownAllRows(raw);
}

function isCloudflareChallenge(html: string): boolean {
  const h = html.slice(0, 16_000).toLowerCase();
  return (
    h.includes("just a moment") ||
    h.includes("cf-browser-verification") ||
    h.includes("checking your browser") ||
    h.includes("/cdn-cgi/challenge-platform/")
  );
}

export function parseEiborHtml(html: string): EiborSnapshot | null {
  const rows = parseEiborContent(html);
  if (rows.length === 0) return null;
  const last = rows[rows.length - 1]!;
  return snapshotFromLastRow(last);
}

function snapshotFromLastRow(last: EiborTableRow): EiborSnapshot {
  return {
    overnight: last.overnight,
    week1: last.week1,
    month1: last.month1,
    month3: last.month3,
    month6: last.month6,
    year1: last.year1,
    rateDateLabel: last.dateLabel,
  };
}

const BROWSER_HEADERS: Record<string, string> = {
  Accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  Referer: "https://www.centralbank.ae/en/forex-eibor/eibor-rates/",
};

async function fetchText(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: url.startsWith("https://r.jina.ai/")
        ? { Accept: "text/plain" }
        : BROWSER_HEADERS,
      signal: AbortSignal.timeout(45_000),
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

/** Direct CBUAE request; may return Cloudflare interstitial HTML. */
export async function fetchEiborHtml(): Promise<string | null> {
  for (const url of EIBOR_URLS) {
    const text = await fetchText(url);
    if (text && !isCloudflareChallenge(text)) return text;
  }
  return null;
}

const JINA_READER_URLS = [
  () => `https://r.jina.ai/${EIBOR_PRIMARY_FOR_READER}`,
  () => `https://r.jina.ai/http://www.centralbank.ae/umbraco/Surface/Eibor/GetEiborData`,
] as const;

async function fetchEiborViaJinaReader(): Promise<string | null> {
  if (process.env.EIBOR_SKIP_JINA_FALLBACK === "1") return null;
  for (const buildUrl of JINA_READER_URLS) {
    const text = await fetchText(buildUrl());
    if (text && parseEiborContent(text).length > 0) return text;
  }
  return null;
}

export async function fetchEiborBundle(): Promise<{
  snapshot: EiborSnapshot | null;
  tableRows: EiborTableRow[];
}> {
  // Run direct CBUAE and Jina in parallel — CBUAE is often Cloudflare-blocked on the server;
  // Jina is slower but usually works. Next.js must not cache these upstream fetches (see fetchText).
  const [directRaw, jinaRaw] = await Promise.all([fetchEiborHtml(), fetchEiborViaJinaReader()]);

  let tableRows = directRaw ? parseEiborContent(directRaw) : [];
  if (tableRows.length === 0 && jinaRaw) {
    tableRows = parseEiborContent(jinaRaw);
  }

  if (tableRows.length === 0) return { snapshot: null, tableRows: [] };
  return {
    snapshot: snapshotFromLastRow(tableRows[tableRows.length - 1]!),
    tableRows,
  };
}

export async function fetchEiborSnapshot(): Promise<EiborSnapshot | null> {
  const { snapshot } = await fetchEiborBundle();
  return snapshot;
}
