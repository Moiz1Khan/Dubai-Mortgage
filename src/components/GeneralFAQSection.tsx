"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How much can I borrow?",
    a: "General rule: 7x your annual salary. But max monthly debt can't exceed 50% of gross income. Example: AED 25,000 salary = max AED 12,500 total monthly debt = roughly AED 1.8M borrowing capacity.",
  },
  {
    q: "What credit score do I need?",
    a: "700+ gets best rates. But we've approved 580+ scores with strong income and down payment.",
  },
  {
    q: "Can I apply for home loan while on probation?",
    a: "Yes, but limited options. We work with 3 lenders. Need strong profile: good salary, 25%+ down payment, employer confirmation letter.",
  },
  {
    q: "Fixed rate home loan or variable?",
    a: "Fixed = certainty (same payment for 3-5 years). Variable = lower rate initially but can change. Most people choose fixed for 3-5 years, then refinance when period ends.",
  },
  {
    q: "How long have you been in business?",
    a: "Since 2015. Started by former Emirates NBD underwriter who got tired of rejecting good people for bad reasons.",
  },
  {
    q: "How do you make money if you're free?",
    a: "Banks pay us when we bring them approved clients. You pay the same rate whether you go direct or through us—but we negotiate better terms.",
  },
];

export function GeneralFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-10 md:py-14 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            General & Residential Finance FAQs
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Common questions about residential mortgages and general financing
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
