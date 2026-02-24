"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 17243, suffix: "", label: "approvals", format: "number" },
  { value: 4.2, suffix: "B+", label: "financed", format: "currency" },
  { value: 92, suffix: "%", label: "approval rate", format: "percent" },
];

function CountUp({ end, duration, suffix, format }: { end: number; duration: number; suffix: string; format: string }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const increment = end / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration, hasStarted]);

  const displayValue = format === "number" 
    ? Math.floor(count).toLocaleString()
    : format === "currency"
    ? `AED ${count.toFixed(1)}`
    : Math.floor(count);

  return (
    <div ref={ref} className="text-3xl md:text-4xl font-bold text-primary">
      {displayValue}{suffix}
    </div>
  );
}

export function AboutStatsBar() {
  return (
    <section className="py-8 md:py-10 border-b border-border/50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-3 gap-6 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <CountUp end={stat.value} duration={2000} suffix={stat.suffix} format={stat.format} />
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
