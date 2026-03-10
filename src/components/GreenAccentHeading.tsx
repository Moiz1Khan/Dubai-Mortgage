"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface GreenAccentHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  enableGlow?: boolean;
}

export function GreenAccentHeading({
  children,
  className,
  as: Component = "h2",
  enableGlow = false,
}: GreenAccentHeadingProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <Component
      ref={ref as any}
      className={cn(
        "green-underline",
        enableGlow && "section-green-glow",
        isVisible && "visible",
        className
      )}
    >
      {children}
    </Component>
  );
}
