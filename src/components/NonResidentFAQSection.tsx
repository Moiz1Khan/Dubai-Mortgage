"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Can I get UAE mortgage without visiting?",
    a: "Almost. Pre-approval and entire process happen remotely. You must visit once for 2-3 days for final signing and key collection.",
  },
  {
    q: "Do I need UAE bank account?",
    a: "Some banks require it for mortgage payments. Others accept international transfers. We recommend opening one anyway for rental income and property expenses. Many UAE banks allow remote account opening.",
  },
  {
    q: "What if my income is in different currency?",
    a: "Not a problem. Banks convert to AED equivalent. Accepted currencies: USD, EUR, GBP (most preferred), AUD, CAD, INR, PKR, CNY, most major currencies.",
  },
  {
    q: "Can I use rental income to qualify?",
    a: "Future rental income: Usually not counted for first property. Existing rental from other properties: Sometimes included if proven with 2+ years contracts.",
  },
  {
    q: "Should I buy off-plan or ready property?",
    a: "For non-residents, we recommend ready property. Lower risk, immediate rental income, easier financing, can actually inspect. Off-plan requires more trust since you can't monitor construction.",
  },
  {
    q: "How do I manage property from abroad?",
    a: "Property management companies handle everything: Tenant finding (one month rent fee), monthly management (5-8% of rent), maintenance, utilities, inspections, compliance. We can introduce 4-5 reputable companies.",
  },
  {
    q: "What about taxes in my home country?",
    a: "UAE has no property tax. But consult tax advisor in your country about foreign property ownership implications. Each country has different rules.",
  },
];

export function NonResidentFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-10 md:py-14 bg-transparent" data-reveal>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Non-Resident Finance FAQs
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Questions about getting a mortgage as a non-resident
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.q}
              className={cn(
                "bg-card border rounded-2xl overflow-hidden transition-all duration-300 h-fit",
                openIndex === index
                  ? "border-primary/30 shadow-lg"
                  : "border-border hover:border-primary/20 hover:shadow-md"
              )}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-start justify-between gap-4 p-6 text-left hover:bg-secondary/20 transition-colors"
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
                      "size-4 transition-transform duration-300",
                      openIndex === index && "rotate-180"
                    )}
                  />
                </span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    key={faq.q}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0 border-t border-border/50">
                      <p className="pt-4 text-muted-foreground leading-relaxed text-sm">
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
