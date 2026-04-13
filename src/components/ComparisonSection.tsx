"use client";

import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSiteContentSection } from "@/lib/useSiteContent";

const rows = [
  { traditional: "6-8 week approval times", digital: "Algorithms don't understand your situation", credit: "7-14 day approvals" },
  { traditional: "Endless paperwork requests", digital: "No human to explain rejections", credit: "One dedicated consultant" },
  { traditional: "Nobody returns your calls", digital: "Complex cases get auto-rejected", credit: "Answers within 2 hours" },
  { traditional: "Get rejected without explanation", digital: "Can't ask questions", credit: "We explain everything" },
  { traditional: "Feel like just a number", digital: "Impersonal and cold", credit: "You're a person, not a data point" },
] as const;

const cols = [
  { key: "traditional" as const, label: "Traditional Banks", isCredit: false },
  { key: "digital" as const, label: "Digital Platforms", isCredit: false },
  { key: "credit" as const, label: "Credit Link Approach", isCredit: true },
];

export function ComparisonSection() {
  const content = useSiteContentSection("home");
  return (
    <section className="py-10 md:py-14 bg-transparent" data-reveal data-green-glow>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3">
            <span className="green-underline inline-block">{content.comparisonTitle}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {content.comparisonSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {cols.map((col) => (
            <div
              key={col.key}
              className={cn(
                "rounded-2xl border p-6 shadow-sm",
                col.isCredit
                  ? "bg-[#14284a] border-[#2c4f7f] text-white"
                  : "bg-card border-border"
              )}
            >
              <div
                className={cn(
                  "font-extrabold text-xl mb-5",
                  col.isCredit ? "text-white" : "text-foreground"
                )}
              >
                {col.label}
              </div>
              <div className="space-y-3.5">
                {rows.map((row, i) => {
                  const val = row[col.key];
                  const isCheck = col.isCredit;
                  return (
                    <div key={i} className="flex items-start gap-2.5 text-sm md:text-base">
                      {isCheck ? (
                        <Check className="size-4 text-teal-400 shrink-0 mt-0.5" />
                      ) : (
                        <X className="size-4 text-red-400 shrink-0 mt-0.5" />
                      )}
                      <span
                        className={cn(
                          isCheck ? "text-white/95" : "text-muted-foreground"
                        )}
                      >
                        {val}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
