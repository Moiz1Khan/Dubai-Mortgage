"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const phases = [
  {
    id: 1,
    days: "Day 1",
    title: "Meet Your Consultant",
    subtitle: "15-minute call. No pressure.",
    image: "https://res.cloudinary.com/dxfejax3u/image/upload/v1772460406/WhatsApp_Image_2026-03-02_at_6.44.54_PM_1_y65paf.jpg",
    items: [
      "You get ONE person. Not a team. Not a department. One mortgage consultant who handles everything from this call until you're holding keys.",
      "They call you within 2 hours of inquiry. You talk. They listen. They tell you honestly if they can help.",
    ],
  },
  {
    id: 2,
    days: "Day 2-3",
    title: "Build Your Strategy",
    subtitle: "We prepare everything before submission.",
    image: "https://res.cloudinary.com/dxfejax3u/image/upload/v1772460408/WhatsApp_Image_2026-03-02_at_6.44.54_PM_y5n62h.jpg",
    items: [
      "Review every document before it goes to the banks",
      "Fix issues immediately (not after rejection)",
      "Only submit when we know you'll get approved",
      "Present your case for maximum approval odds",
    ],
  },
  {
    id: 3,
    days: "—",
    title: "Bank Submission & Negotiation",
    subtitle: "We submit to multiple lenders simultaneously.",
    image: "https://res.cloudinary.com/dxfejax3u/image/upload/v1772460406/WhatsApp_Image_2026-03-02_at_6.44.54_PM_2_mhie3u.jpg",
    items: [
      "While you wait, we: Handle all bank questions and requests",
      "Negotiate better rates and terms",
      "Push for faster decisions",
      "Update you every 48 hours minimum",
    ],
  },
  {
    id: 4,
    days: "—",
    title: "Approval & Closing",
    subtitle: "You sign papers and collect keys.",
    image: "https://res.cloudinary.com/dxfejax3u/image/upload/v1772460407/WhatsApp_Image_2026-03-02_at_6.44.53_PM_rkwtgy.jpg",
    items: [
      "We coordinate everything: Bank paperwork",
      "Lawyer appointments",
      "Developer handover",
      "Utility connections",
      "You show up. Sign. Get keys. Move in.",
    ],
  },
];

export function Process() {
  const [activePhase, setActivePhase] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = phaseRefs.current.findIndex((ref) => ref === entry.target);
            if (index !== -1) {
              setActivePhase(index);
            }
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-100px 0px",
      }
    );

    phaseRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="py-10 md:py-14 bg-transparent" data-reveal data-green-glow>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 green-underline">
          HOW IT WORKS
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-12">
          From First Call to Keys in Hand: Here&apos;s the Whole Process
        </p>

        {/* Desktop: Horizontal Timeline Layout */}
        <div className="hidden lg:block relative">
          {/* Connecting Line */}
          <div className="absolute top-32 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
          
          <div className="grid grid-cols-4 gap-6 relative z-10">
            {phases.map((phase, index) => {
              const isActive = activePhase === index;
              return (
                <div
                  key={phase.id}
                  ref={(el) => { phaseRefs.current[index] = el; }}
                  className={`group relative transition-all duration-700 ${
                    isActive ? "scale-105" : "scale-100 opacity-70"
                  }`}
                  data-phase-index={index}
                >
                  {/* Step Number Circle */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20">
                    <div
                      className={`w-16 h-16 rounded-full border-4 flex items-center justify-center font-bold text-lg transition-all duration-500 ${
                        isActive
                          ? "bg-green-500 border-green-500 text-white shadow-lg shadow-green-500/50 scale-110"
                          : "bg-background border-gray-300 text-gray-400"
                      }`}
                    >
                      {index + 1}
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className={`relative h-[500px] rounded-2xl overflow-hidden border-2 transition-all duration-500 card-green-accent ${
                      isActive
                        ? "border-green-500/50 shadow-2xl shadow-green-500/20"
                        : "border-border hover:border-green-500/30"
                    }`}
                  >
                    {/* Image */}
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={phase.image}
                        alt={phase.title}
                        fill
                        className={`object-cover transition-transform duration-700 ${
                          isActive ? "scale-110" : "scale-100"
                        }`}
                        sizes="(max-width: 1024px) 100vw, 25vw"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-b transition-opacity duration-500 ${
                          isActive
                            ? "from-black/60 via-black/50 to-black/70 opacity-100"
                            : "from-black/70 via-black/60 to-black/80 opacity-100"
                        }`}
                      />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col p-6">
                      {/* Days Badge */}
                      {phase.days !== "—" && (
                        <div className="mb-4">
                          <span className="inline-block font-mono text-xs font-bold text-white bg-green-500/90 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                            {phase.days}
                          </span>
                        </div>
                      )}

                      {/* Title */}
                      <h3
                        className={`font-bold text-xl mb-2 text-white transition-all duration-500 ${
                          isActive ? "text-2xl" : "text-xl"
                        }`}
                      >
                        {phase.title}
                      </h3>
                      <p className="text-sm text-white/90 mb-4">{phase.subtitle}</p>

                      {/* Items List */}
                      <ul className="space-y-2.5 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-green-500/50">
                        {phase.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-sm">
                            <span
                              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold mt-0.5 transition-all duration-300 ${
                                isActive
                                  ? "bg-green-500 text-white scale-110"
                                  : "bg-white/80 text-gray-700"
                              }`}
                            >
                              ✓
                            </span>
                            <span className="text-white/95 leading-relaxed font-medium text-xs">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: Vertical Accordion Layout */}
        <div className="lg:hidden space-y-6">
          {phases.map((phase, index) => {
            const isActive = activePhase === index;
            return (
              <div
                key={phase.id}
                ref={(el) => { phaseRefs.current[index] = el; }}
                className={`relative rounded-2xl overflow-hidden border-2 transition-all duration-500 card-green-accent ${
                  isActive
                    ? "border-green-500/50 shadow-xl shadow-green-500/20"
                    : "border-border"
                }`}
                onClick={() => setActivePhase(isActive ? null : index)}
              >
                {/* Image Background */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={phase.image}
                    alt={phase.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
                </div>

                {/* Content */}
                <div className="relative z-10 p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-full border-4 flex items-center justify-center font-bold text-lg shrink-0 transition-all duration-500 ${
                        isActive
                          ? "bg-green-500 border-green-500 text-white shadow-lg shadow-green-500/50"
                          : "bg-background/80 border-gray-300 text-gray-400"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      {phase.days !== "—" && (
                        <span className="inline-block font-mono text-xs font-bold text-white bg-green-500/90 px-2 py-1 rounded mb-2">
                          {phase.days}
                        </span>
                      )}
                      <h3 className="font-bold text-xl text-white mb-1">{phase.title}</h3>
                      <p className="text-sm text-white/90">{phase.subtitle}</p>
                    </div>
                  </div>

                  {/* Expandable Items */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      isActive ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <ul className="space-y-3 pt-4 border-t border-white/20">
                      {phase.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500 text-white text-xs font-bold mt-0.5">
                            ✓
                          </span>
                          <span className="text-white/95 leading-relaxed font-medium">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors btn-green-accent"
          >
            Book Your Free 15-Minute Call Now
          </a>
        </div>
      </div>
    </section>
  );
}
