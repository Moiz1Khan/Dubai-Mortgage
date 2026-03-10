"use client";

import { useEffect } from "react";

export function ScrollAnimations() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // ── Hero fade-in (no scroll cost — fires once on mount) ──────────────
    const hero = document.querySelector("[data-animate='hero']") as HTMLElement | null;
    if (hero) {
      hero.style.opacity = "0";
      hero.style.transform = "translateY(32px)";
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          hero.style.transition = "opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1)";
          hero.style.opacity = "1";
          hero.style.transform = "translateY(0)";
        });
      });
    }

    // ── IntersectionObserver — fires ONLY when element enters viewport ────
    // Zero scroll-event cost. GPU handles the CSS transition.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;

          if (el.dataset.reveal !== undefined) {
            el.classList.add("reveal-visible");
          }

          if (el.dataset.scaleIn !== undefined) {
            el.classList.add("scale-in-visible");
          }

          if (el.dataset.stagger !== undefined) {
            const items = el.querySelectorAll<HTMLElement>("[data-stagger-item]");
            items.forEach((item, i) => {
              item.style.transitionDelay = `${i * 60}ms`;
              item.classList.add("reveal-visible");
            });
          }

          // Add green glow effect for sections with data-green-glow
          if (el.dataset.greenGlow !== undefined) {
            el.classList.add("visible");
            // Also trigger green underline animations within this section
            const greenUnderlines = el.querySelectorAll<HTMLElement>(".green-underline");
            greenUnderlines.forEach((underline) => {
              underline.classList.add("visible");
            });
          }

          io.unobserve(el); // fire only once
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" }
    );

    // Seed initial hidden state via JS so SSR HTML is visible without JS
    document.querySelectorAll<HTMLElement>("[data-reveal], [data-scale-in], [data-stagger], [data-green-glow]").forEach((el) => {
      if (el.dataset.reveal !== undefined) el.classList.add("reveal-enter");
      if (el.dataset.scaleIn !== undefined) el.classList.add("scale-in-enter");
      if (el.dataset.stagger !== undefined) {
        el.querySelectorAll<HTMLElement>("[data-stagger-item]").forEach((item) => {
          item.classList.add("reveal-enter");
        });
      }
      if (el.dataset.greenGlow !== undefined) {
        el.classList.add("section-green-glow");
      }
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return null;
}
