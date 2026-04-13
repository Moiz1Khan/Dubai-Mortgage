"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1400;

const statTargets = [
  { kind: "int" as const, end: 17243 },
  { kind: "currencyB" as const, end: 4.2 },
  { kind: "int" as const, end: 47 },
  { kind: "percent" as const, end: 92 },
];

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function formatStat(index: number, progress: number): string {
  const eased = easeOutCubic(progress);
  const t = statTargets[index];
  if (!t) return "";

  if (t.kind === "int") {
    const n = Math.floor(t.end * eased);
    return n.toLocaleString("en-US");
  }
  if (t.kind === "currencyB") {
    const n = t.end * eased;
    return `AED ${n.toFixed(1)}B`;
  }
  if (t.kind === "percent") {
    const n = Math.round(t.end * eased);
    return `${n}%`;
  }
  return "";
}

function finalDisplay(index: number): string {
  const t = statTargets[index];
  if (!t) return "";
  if (t.kind === "int" && t.end === 17243) return "17,243";
  if (t.kind === "currencyB") return "AED 4.2B";
  if (t.kind === "int") return String(t.end);
  if (t.kind === "percent") return `${t.end}%`;
  return "";
}

const labels = ["approvals", "financed", "countries", "approval rate"];

export function StatsBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const startedRef = useRef(false);
  const rafRef = useRef<number>(0);
  const [values, setValues] = useState<string[]>(() =>
    statTargets.map(() => "0")
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setValues(statTargets.map((_, i) => finalDisplay(i)));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries[0];
        if (!hit?.isIntersecting || startedRef.current) return;
        startedRef.current = true;
        observer.disconnect();

        const start = performance.now();

        const tick = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(1, elapsed / DURATION_MS);
          setValues(statTargets.map((_, i) => formatStat(i, progress)));
          if (progress < 1) {
            rafRef.current = requestAnimationFrame(tick);
          } else {
            setValues(statTargets.map((_, i) => finalDisplay(i)));
          }
        };

        rafRef.current = requestAnimationFrame(tick);
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-10 md:py-14 bg-transparent" data-reveal>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <p className="text-center text-sm font-medium text-muted-foreground mb-6">
          Since 2015:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {labels.map((label, i) => (
            <div
              key={label}
              className="text-center p-6 rounded-2xl bg-card border border-border"
            >
              <div className="text-2xl md:text-3xl font-bold text-primary tabular-nums">
                {values[i]}
              </div>
              <div className="text-sm text-muted-foreground mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
