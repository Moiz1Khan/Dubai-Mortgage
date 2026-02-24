"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { images } from "@/lib/media";

const CardSwap = dynamic(
  () => import("./CardSwap").then((m) => ({ default: m.default })),
  { ssr: false }
);
const Card = dynamic(
  () => import("./CardSwap").then((m) => ({ default: m.Card })),
  { ssr: false }
);

const caseStudies = [
  {
    title: "From 'Too Risky' to Villa Owner in 10 Days",
    imageIdx: 0,
    quote: "Three banks looked at my bank statements and panicked. Ahmad looked at my business and got it immediately. Perspective matters.",
    person: "Sarah (names changed for privacy)",
    problem:
      "Sarah runs a consulting business. Makes AED 45K/month average, but it fluctuates (some months AED 80K, some AED 20K). Four banks rejected \"variable income\" immediately.",
    solution:
      "We showed her 3-year average, client retention rate, and contract pipeline. Found a bank that understands modern consultancy businesses.",
    results: [
      "AED 3.2M approved at 4.1%",
      "75% LTV (higher than expected)",
      "10 days from first call to approval",
      "Now owns 3-bed villa in Dubai Marina",
    ],
  },
  {
    title: "First Apartment at 26 Despite Being on Probation",
    imageIdx: 1,
    quote: "I was ready to wait 3 months. Chandan found a way in under 2 weeks. Now I'm building equity instead of enriching a landlord.",
    person: "David (names changed for privacy)",
    problem:
      "David, 26, marketing manager at AED 18K salary. Found a perfect apartment in Dubai Marina, but still on 3-month probation. Every bank said, \"Come back after probation ends.\"",
    solution:
      "Found a lender who accepts probation employees with strong profiles. Emphasized his UK degree, 25% down payment saved, and an employer letter confirming a permanent role.",
    results: [
      "AED 1.2M approved at 4.75%",
      "Still on probation when approved",
      "11 days from consultation to approval",
      "Paying AED 6,450/month vs AED 7,500 rent",
    ],
  },
  {
    title: "AED 15M Commercial Loan at 60% LTV When Market Offered 50%",
    imageIdx: 2,
    quote: "Three banks said 50% maximum. Faraz didn't accept it. Saving AED 1.5M in down payment meant I could pursue another deal immediately.",
    person: "Investor (names changed for privacy)",
    problem:
      "Investor wanted to buy 12-unit retail plaza in Dubai Marina. High rental income, but banks offered only 50% LTV due to \"retail uncertainty.\"",
    solution:
      "We prepared a detailed tenant analysis showing 8 of 12 on 5+ year leases, zero vacancy in 3 years, premium location. Found bank that valued quality over category.",
    results: [
      "AED 15M approved at 5.2% (vs 6.5% initial offers)",
      "60% LTV saved AED 1.5M in down payment",
      "20-year term",
      "Annual cash flow after debt: AED 720K",
    ],
  },
];

export function CaseStudies() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const cardSwapRef = useRef<{ goToCard: (index: number) => void }>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    cardSwapRef.current?.goToCard(index);
  };

  return (
    <section
      ref={sectionRef}
      className="py-10 md:py-14 bg-transparent relative min-h-[400px] md:min-h-[520px]"
      data-reveal
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
          Case Studies
        </h2>
        <p className="text-muted-foreground text-center mb-8">
          Names changed for privacy, but these are actual cases we&apos;ve handled.
        </p>

        <div className="relative grid grid-cols-[1fr_1fr] gap-4 md:gap-8 items-center min-h-[420px] md:min-h-[480px]">
          <div className="flex flex-col gap-3 md:gap-4 min-w-0">
            {caseStudies.map((study, index) => (
              <motion.button
                key={study.person}
                type="button"
                onClick={() => handleSelect(index)}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`text-left p-4 md:p-5 rounded-xl border-2 transition-all duration-200 ${
                  selectedIndex === index
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card/80 hover:border-primary/40 hover:bg-primary/5"
                }`}
              >
                <h3 className="font-bold text-sm md:text-lg mb-1">
                  {study.title}
                </h3>
                <p className="text-sm text-muted-foreground">{study.person}</p>
              </motion.button>
            ))}
          </div>

          <motion.div
            className="relative h-[380px] md:h-[480px] min-w-0 flex items-end justify-end overflow-visible"
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={
              isInView
                ? { opacity: 1, scale: 1, x: 0 }
                : { opacity: 0, scale: 0.9, x: 30 }
            }
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {isInView && (
            <CardSwap
              ref={cardSwapRef}
              width={340}
              height={420}
              cardDistance={50}
              verticalDistance={55}
              delay={6000}
              pauseOnHover
              skewAmount={5}
              easing="elastic"
            >
              {caseStudies.map((study) => (
                <Card key={study.person}>
                  <div className="w-full h-full overflow-y-auto p-6">
                    <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-4">
                      <Image
                        src={images.caseStudies[study.imageIdx]}
                        alt={study.title}
                        fill
                        className="object-cover"
                        sizes="380px"
                      />
                    </div>
                    <p className="text-sm italic text-primary mb-2">
                      &quot;{study.quote}&quot;
                    </p>
                    <h3 className="text-lg font-bold mb-2">{study.title}</h3>
                    <p className="text-sm text-primary font-medium mb-4">
                      {study.person}
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      <span className="font-semibold text-foreground">
                        The Problem:
                      </span>{" "}
                      {study.problem}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      <span className="font-semibold text-foreground">
                        What Changed:
                      </span>{" "}
                      {study.solution}
                    </p>
                    <div className="pt-4 border-t border-border">
                      <p className="font-semibold text-sm mb-2">The Numbers:</p>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {study.results.map((r) => (
                          <li key={r}>→ {r}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              ))}
            </CardSwap>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
