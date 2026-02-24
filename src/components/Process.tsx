"use client";

import Image from "next/image";
import { images } from "@/lib/media";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";

const phases = [
  {
    id: 1,
    days: "Day 1",
    title: "Meet Your Consultant",
    subtitle: "15-minute call. No pressure.",
    image: images.process[0],
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
    image: images.process[1],
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
    image: images.process[2],
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
    image: images.process[3],
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
  return (
    <section id="process" className="py-10 md:py-14 bg-transparent" data-reveal>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          HOW IT WORKS
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-8">
          From First Call to Keys in Hand: Here&apos;s the Whole Process
        </p>

        <div className="h-[600px] rounded-2xl overflow-hidden">
          <ScrollStack
            useWindowScroll={false}
            itemDistance={100}
            itemScale={0.05}
            itemStackDistance={30}
            stackPosition="20%"
            scaleEndPosition="10%"
            baseScale={0.9}
            className="scrollbar-hide-complete"
          >
            {phases.map((phase) => (
              <ScrollStackItem
                key={phase.id}
                itemClassName="border-2 border-border hover:border-primary/40 transition-colors overflow-hidden backdrop-blur-sm"
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src={phase.image}
                    alt={phase.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-card/60 via-card/50 to-card/60" />
                </div>

                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-mono text-sm font-bold text-primary-foreground bg-primary px-3 py-1.5 rounded-lg shrink-0">
                      {phase.days}
                    </span>
                    <div>
                      <h3 className="font-bold text-2xl text-foreground">
                        {phase.title}
                      </h3>
                      <p className="text-sm text-foreground">
                        {phase.subtitle}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-3 flex-1">
                    {phase.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-sm"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold mt-0.5">
                          ✓
                        </span>
                        <span className="text-foreground leading-relaxed font-semibold">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>

        <div className="mt-8 text-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Book Your Free 15-Minute Call Now
          </a>
        </div>
      </div>
    </section>
  );
}
