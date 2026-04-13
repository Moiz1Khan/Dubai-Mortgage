"use client";

import { useEffect, useMemo, useRef, useCallback } from "react";
import { useDrag } from "@use-gesture/react";

const faqs = [
  { q: "How much can I borrow?", a: "General rule: 7x your annual salary. But max monthly debt can't exceed 50% of gross income. Example: AED 25,000 salary = roughly AED 1.8M borrowing capacity." },
  { q: "What credit score do I need?", a: "700+ gets best rates. But we've approved 580+ scores with strong income and down payment." },
  { q: "Can I apply on probation?", a: "Yes, but limited options. We work with 3 lenders. Need strong profile: good salary, 25%+ down payment, employer confirmation letter." },
  { q: "Fixed or variable rate?", a: "Fixed = certainty (same payment for 3-5 years). Variable = lower rate initially. Most choose fixed for 3-5 years, then refinance." },
  { q: "Buy to let or live in?", a: "Both work. Buy to let needs 25% down minimum. Rental income can help but banks calculate conservatively (70% of actual rent)." },
  { q: "Best loan for expats?", a: "Depends on your situation. We compare all banks and recommend best 2-3 for your specific profile." },
  { q: "Documents needed?", a: "Passport, visa, salary certificate, bank statements (6 months), Emirates ID. Self-employed need audited financials." },
  { q: "How long for approval?", a: "Typically 7-14 days from application to keys. We update you every 48 hours during bank review." },
  { q: "Pre-approval free?", a: "Yes. No obligation. We calculate your max borrowing and recommend best lenders before you view properties." },
  { q: "Refinancing worth it?", a: "Often yes. If rates dropped 0.5%+ or your profile improved, refinancing can save thousands. We compare for free." },
  { q: "Off-plan vs ready?", a: "Both eligible. Off-plan needs developer handover timeline. Ready properties can close in 2 weeks." },
  { q: "Joint application?", a: "Yes. Spouses or family can apply together. Combined income increases borrowing; both are liable for the loan." },
  { q: "Multiple properties?", a: "Yes. Investors can hold several mortgages. Rates and LTV differ for 2nd+ properties—we find best options." },
  { q: "AED or USD loan?", a: "Most UAE mortgages are in AED. Some banks offer USD. We recommend AED to avoid forex risk on your home." },
  { q: "Early settlement fees?", a: "Some banks charge 1-2% for early payoff. We factor this in and suggest lenders with low or no penalties." },
  { q: "Salary transfer required?", a: "Not always. Some banks accept non-transfer; rates may be slightly higher. We compare both options." },
];

type ItemDef = { faq: (typeof faqs)[0]; x: number; y: number; sizeX: number; sizeY: number };

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
const wrapAngleSigned = (deg: number) => {
  const a = (((deg + 180) % 360) + 360) % 360;
  return a - 180;
};

function buildItems(seg: number): ItemDef[] {
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 1.2);
  const evenYs = [-4.5, -3.2, -1.8, -0.5, 0.8, 2, 3.2, 4.5];
  const oddYs = [-3.9, -2.5, -1.1, 0.3, 1.6, 2.9, 4.2];
  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs;
    return ys.map((y) => ({ x, y, sizeX: 1, sizeY: 1 }));
  });
  return coords.map((c, i) => ({ ...c, faq: faqs[i % faqs.length] }));
}

const SEGMENTS = 16;
const TILE_SIZE = 62;
const MAX_VERTICAL_DEG = 12;
const DRAG_SENSITIVITY = 18;
const DRAG_DAMPENING = 2;

export function FAQDome() {
  const rootRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const rotationRef = useRef({ x: 0, y: 0 });
  const startRotRef = useRef({ x: 0, y: 0 });
  const draggingRef = useRef(false);
  const inertiaRAF = useRef<number | null>(null);

  const items = useMemo(() => buildItems(SEGMENTS), []);

  const applyTransform = useCallback((xDeg: number, yDeg: number) => {
    const el = sphereRef.current;
    if (el) el.style.transform = `translateZ(calc(var(--faq-radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
  }, []);

  const stopInertia = useCallback(() => {
    if (inertiaRAF.current) {
      cancelAnimationFrame(inertiaRAF.current);
      inertiaRAF.current = null;
    }
  }, []);

  const startInertia = useCallback(
    (vx: number, vy: number) => {
      let vX = clamp(vx, -1.4, 1.4) * 80;
      let vY = clamp(vy, -1.4, 1.4) * 80;
      const frictionMul = 0.94 + 0.055 * clamp(DRAG_DAMPENING, 0, 1);
      const step = () => {
        vX *= frictionMul;
        vY *= frictionMul;
        if (Math.abs(vX) < 0.01 && Math.abs(vY) < 0.01) {
          inertiaRAF.current = null;
          return;
        }
        const nextX = clamp(rotationRef.current.x - vY / 200, -MAX_VERTICAL_DEG, MAX_VERTICAL_DEG);
        const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);
        rotationRef.current = { x: nextX, y: nextY };
        applyTransform(nextX, nextY);
        inertiaRAF.current = requestAnimationFrame(step);
      };
      stopInertia();
      inertiaRAF.current = requestAnimationFrame(step);
    },
    [applyTransform, stopInertia]
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0].contentRect;
      const w = Math.max(1, cr.width);
      const h = Math.max(1, cr.height);
      const minDim = Math.min(w, h);
      const radius = Math.min(minDim * 0.65, h * 0.75, 480);
      root.style.setProperty("--faq-radius", `${Math.round(radius)}px`);
      applyTransform(rotationRef.current.x, rotationRef.current.y);
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [applyTransform]);

  useDrag(
    ({ first, last, movement: [mx, my], velocity: [vx, vy], direction: [dx, dy] }) => {
      if (first) {
        stopInertia();
        draggingRef.current = true;
        startRotRef.current = { ...rotationRef.current };
      }
      const nextX = clamp(startRotRef.current.x - my / DRAG_SENSITIVITY, -MAX_VERTICAL_DEG, MAX_VERTICAL_DEG);
      const nextY = startRotRef.current.y + mx / DRAG_SENSITIVITY;
      rotationRef.current = { x: nextX, y: nextY };
      applyTransform(nextX, nextY);
      if (last) {
        draggingRef.current = false;
        const dist2 = mx * mx + my * my;
        if (dist2 > 64) {
          let vMagX = vx * dx;
          let vMagY = vy * dy;
          if (Math.abs(vMagX) < 0.001 && Math.abs(vMagY) < 0.001) {
            vMagX = (mx / DRAG_SENSITIVITY) * 0.02;
            vMagY = (my / DRAG_SENSITIVITY) * 0.02;
          }
          if (Math.abs(vMagX) > 0.005 || Math.abs(vMagY) > 0.005) startInertia(vMagX, vMagY);
        }
      }
    },
    { target: mainRef, eventOptions: { passive: false } }
  );

  const closeFAQ = useCallback(() => {
    const ov = overlayRef.current;
    if (ov) {
      ov.classList.remove("faq-enlarge-visible");
      ov.onclick = null;
      setTimeout(() => ov.remove(), 280);
      overlayRef.current = null;
    }
    rootRef.current?.removeAttribute("data-enlarging");
  }, []);

  const openFAQ = useCallback((item: ItemDef) => {
    const overlay = document.createElement("div");
    overlay.className = "faq-enlarge-overlay";
    overlayRef.current = overlay;
    overlay.innerHTML = `
      <div class="faq-enlarge-content">
        <h4 class="faq-enlarge-q">${item.faq.q}</h4>
        <p class="faq-enlarge-a">${item.faq.a}</p>
      </div>
    `;
    overlay.onclick = () => closeFAQ();
    scrimRef.current?.parentElement?.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add("faq-enlarge-visible"));
    rootRef.current?.setAttribute("data-enlarging", "true");
  }, [closeFAQ]);

  useEffect(() => {
    const scrim = scrimRef.current;
    if (!scrim) return;
    const handler = () => closeFAQ();
    scrim.addEventListener("click", handler);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeFAQ();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      scrim.removeEventListener("click", handler);
      window.removeEventListener("keydown", onKey);
    };
  }, [closeFAQ]);

  return (
    <section id="faq" className="py-10 md:py-14 bg-transparent" data-reveal>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Everything you need to know about UAE home loans.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: FAQ 3D Globe */}
          <div
            ref={rootRef}
            className="faq-dome-root relative w-full min-h-[420px] md:min-h-[500px] rounded-2xl overflow-visible bg-transparent"
          >
            <style
              dangerouslySetInnerHTML={{
                __html: `
              .faq-dome-root { --faq-radius: 420px; }
              .faq-dome-root * { box-sizing: border-box; }
              .faq-dome-sphere, .faq-dome-item, .faq-dome-tile { transform-style: preserve-3d; }
              .faq-dome-stage { width:100%; height:100%; min-height:420px; display:grid; place-items:center; perspective: calc(var(--faq-radius) * 2.2); perspective-origin: 50% 50%; overflow: visible; }
              @media (min-width:768px){ .faq-dome-stage { min-height:480px; } }
              .faq-dome-sphere { position: absolute; transform: translateZ(calc(var(--faq-radius) * -1)); will-change: transform; }
              .faq-dome-item { position:absolute; top:50%; left:50%; margin:0; transform-origin: 50% 50%; backface-visibility: hidden; }
              .faq-dome-tile { border-radius: 8px; overflow: hidden; cursor: pointer; background: #ffffff; border: 2px solid #1e3a5f; box-shadow: 0 2px 6px rgba(30,58,95,0.2); transition: box-shadow 0.2s, transform 0.2s, border-color 0.2s; display: flex; align-items: center; justify-content: center; text-align: center; }
              .faq-dome-tile:hover { box-shadow: 0 6px 16px rgba(30,58,95,0.3); transform: translateZ(6px); border-color: #28303a; }
              .faq-dome-tile span { font-size: 0.7rem; font-weight: 600; line-height: 1.2; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; padding: 6px; color: #1e3a5f; }
              .faq-dome-scrim { position:absolute; inset:0; background:rgba(0,0,0,0.45); opacity:0; pointer-events:none; transition: opacity 0.25s; z-index:10; }
              .faq-dome-root[data-enlarging="true"] .faq-dome-scrim { opacity:1; pointer-events:all; }
              .faq-enlarge-overlay { position:absolute; inset:0; z-index:20; display:flex; align-items:center; justify-content:center; padding:1.5rem; opacity:0; transition: opacity 0.2s; pointer-events:all; }
              .faq-enlarge-overlay.faq-enlarge-visible { opacity:1; }
              .faq-enlarge-content { max-width:400px; background:white; border-radius:16px; padding:1.5rem 1.75rem; box-shadow:0 10px 40px rgba(0,0,0,0.2); border: 2px solid #1e3a5f; }
              .faq-enlarge-q { font-size:1.05rem; font-weight:600; color:#1e3a5f; margin-bottom:0.75rem; }
              .faq-enlarge-a { font-size:0.875rem; color:#28303a; line-height:1.6; }
            `,
              }}
            />
            <main ref={mainRef} className="absolute inset-0 overflow-hidden select-none" style={{ touchAction: "none" }}>
              <div className="faq-dome-stage">
                <div ref={sphereRef} className="faq-dome-sphere">
                  {items.map((it, i) => {
                    const unit = 360 / SEGMENTS / 2;
                    const rotY = unit * (it.x + (it.sizeX - 1) / 2);
                    const rotX = unit * (it.y - (it.sizeY - 1) / 2);
                    return (
                      <div
                        key={`${it.x}-${it.y}-${i}`}
                        className="faq-dome-item"
                        style={{
                          transform: `translate(-50%,-50%) rotateY(${rotY}deg) rotateX(${rotX}deg) translateZ(var(--faq-radius))`,
                        }}
                      >
                        <button
                          type="button"
                          className="faq-dome-tile"
                          style={{ width: TILE_SIZE, height: TILE_SIZE }}
                          onClick={() => {
                            if (draggingRef.current) return;
                            openFAQ(it);
                          }}
                        >
                          <span>{it.faq.q}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div ref={scrimRef} className="faq-dome-scrim" />
            </main>
          </div>

          {/* Right: FAQ Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 4 FAQ Cards */}
            {faqs.slice(0, 4).map((faq, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 transition-all"
              >
                <h4 className="font-semibold text-foreground mb-2 text-base">
                  {faq.q}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}

            {/* Have a Question Card */}
            <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-primary/40 transition-all sm:col-span-2">
              <div className="inline-flex p-3 rounded-full bg-primary/10 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                Have a Question?
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Can&apos;t find what you&apos;re looking for? Check out our complete FAQ page
              </p>
              <a
                href="/faq"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              >
                View All FAQs
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
