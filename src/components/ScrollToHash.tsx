"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const RETRIES = 35;
const INTERVAL_MS = 90;

function scrollToId(id: string): boolean {
  if (!id) return false;
  const el = document.getElementById(id);
  if (!el) return false;
  const smooth =
    typeof window !== "undefined" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
  return true;
}

/**
 * Next.js client navigation updates the URL but does not always scroll to #hash
 * targets; lazy sections may mount the element later. Retries until the node exists.
 */
export function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    const id = window.location.hash.replace(/^#/, "");
    if (!id) return;
    const decoded = decodeURIComponent(id);
    let attempt = 0;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      if (scrollToId(decoded)) return;
      attempt += 1;
      if (attempt < RETRIES) {
        window.setTimeout(tick, INTERVAL_MS);
      }
    };

    tick();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  useEffect(() => {
    const onHashChange = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (!id) return;
      const decoded = decodeURIComponent(id);
      let n = 0;
      const tick = () => {
        if (scrollToId(decoded)) return;
        n += 1;
        if (n < RETRIES) window.setTimeout(tick, INTERVAL_MS);
      };
      tick();
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}
