"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type LazySectionProps = {
  children: ReactNode;
  minHeightClassName?: string;
  rootMargin?: string;
  /** Fade/slide-in when the section loads (CSS only; respects prefers-reduced-motion). */
  reveal?: boolean;
  /** Set on the placeholder before lazy load so /#id and in-page hash links resolve immediately. */
  anchorId?: string;
};

export function LazySection({
  children,
  minHeightClassName = "min-h-[280px]",
  rootMargin = "300px 0px",
  reveal = true,
  anchorId,
}: LazySectionProps) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [revealShown, setRevealShown] = useState(false);

  useEffect(() => {
    const node = anchorRef.current;
    if (!node || visible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [visible, rootMargin]);

  useEffect(() => {
    if (!visible || !reveal) {
      setRevealShown(false);
      return;
    }
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setRevealShown(true));
    });
    return () => cancelAnimationFrame(id);
  }, [visible, reveal]);

  return (
    <div ref={anchorRef}>
      {visible ? (
        reveal ? (
          <div
            className={cn("scroll-reveal-section", revealShown && "scroll-reveal-section--shown")}
          >
            {children}
          </div>
        ) : (
          children
        )
      ) : (
        <section id={anchorId} className={minHeightClassName} aria-hidden />
      )}
    </div>
  );
}
