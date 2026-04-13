"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 17243, suffix: "", label: "Mortgages approved", format: "number" },
  { value: 4.2, suffix: "B", label: "Total financing secured", format: "currency" },
  { value: 92, suffix: "%", label: "Approval rate", format: "percent" },
  { value: 47, suffix: "", label: "Countries financed (non-residents)", format: "number" },
  { value: 15, suffix: "+", label: "UAE lenders we work with", format: "number" },
  { value: 14, suffix: " days", label: "Average approval time", format: "number" },
  { value: 2, suffix: " hours", label: "Average response time", format: "number" },
  { value: 21, suffix: "", label: "Real people on our team (no offshore)", format: "number" },
];

function CountUp({
  end,
  duration,
  suffix,
  format,
  valueClassName = "text-primary",
}: {
  end: number;
  duration: number;
  suffix: string;
  format: string;
  valueClassName?: string;
}) {
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
    <div ref={ref} className={`text-3xl md:text-4xl font-bold mb-2 ${valueClassName}`}>
      {displayValue}{suffix}
    </div>
  );
}

export function AboutByNumbers() {
  return (
    <section className="py-12 md:py-16 bg-[#0b192e]" data-reveal>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-10 md:mb-12 tracking-tight">
          What We&apos;ve Done Since 2015
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-5 md:p-6 rounded-2xl bg-white border border-white/10 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.35)] hover:shadow-[0_20px_44px_-18px_rgba(0,0,0,0.4)] transition-shadow"
            >
              <CountUp
                end={stat.value}
                duration={2000}
                suffix={stat.suffix}
                format={stat.format}
                valueClassName="text-[#0b192e]"
              />
              <div className="text-sm text-[#475569] leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
