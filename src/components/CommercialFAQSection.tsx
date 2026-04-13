"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "What's the minimum commercial mortgage amount?",
    a: "AED 1M typically. Below that, consider a business loan or personal financing.",
  },
  {
    q: "How is investor property loan different?",
    a: "Investment properties require proven cash flow (DSCR 1.25x+), lower LTV (55-60%), and banks count only 70% of rental income.",
  },
  {
    q: "Do all commercial loans require personal guarantees?",
    a: "Almost all under AED 50M revenue. Your personal assets are at risk if business defaults. This is standard, not negotiable.",
  },
  {
    q: "Can foreign companies get commercial mortgage Dubai?",
    a: "Yes. Need UAE subsidiary/branch, local trade license, parent company guarantee. LTV: 50%, rates: 5.75-7.25%, timeline: 12-16 weeks.",
  },
  {
    q: "What if property valuation comes in low?",
    a: "Happens frequently. Options: Challenge valuation (30-40% success), renegotiate purchase price, or increase down payment.",
  },
  {
    q: "How long do business mortgage loan applications take?",
    a: "8-12 weeks average. More complex than residential due to business analysis, higher amounts, more stakeholders.",
  },
  {
    q: "Should I choose fixed or variable commercial loan terms?",
    a: "Fixed for first 3-5 years (payment certainty while business establishes). Then refinance or switch to variable.",
  },
];

export function CommercialFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-10 md:py-14 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Commercial Finance FAQs
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Questions about commercial mortgages and business financing
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.q}
              className={cn(
                "bg-card border rounded-2xl overflow-hidden transition-all duration-300 h-fit",
                openIndex === index
                  ? "border-primary/30"
                  : "border-border"
              )}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-start justify-between gap-4 p-6 text-left"
              >
                <span className="font-semibold text-foreground pr-2 text-base">
                  {faq.q}
                </span>
                <span
                  className={cn(
                    "shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300",
                    openIndex === index
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  )}
                >
                  <ChevronDown
                    className={cn(
                      "size-4",
                      openIndex === index && "rotate-180"
                    )}
                  />
                </span>
              </button>
              {openIndex === index && (
                <div className="overflow-hidden">
                  <div className="px-6 pb-6 pt-0 border-t border-border/50">
                    <p className="pt-4 text-muted-foreground leading-relaxed text-sm">
                      {faq.a}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
