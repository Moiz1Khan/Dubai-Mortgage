"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

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
    <div ref={ref} className="text-3xl md:text-4xl font-bold text-primary mb-2">
      {displayValue}{suffix}
    </div>
  );
}

export function AboutByNumbers() {
  return (
    <section className="relative py-10 md:py-14 overflow-hidden" data-reveal>
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://res.cloudinary.com/dxfejax3u/image/upload/v1771955079/Gemini_Generated_Image_m0rbnim0rbnim0rb_srw5uj.png"
          alt="Background"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          What We've Done Since 2015
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-card/90 backdrop-blur-md border-2 border-border hover:border-primary/40 transition-all"
            >
              <CountUp end={stat.value} duration={2000} suffix={stat.suffix} format={stat.format} />
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
