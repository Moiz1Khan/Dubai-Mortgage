"use client";

import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

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
  return (
    <section className="py-10 md:py-14 bg-transparent" data-reveal>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          Tired of Being Treated Like Application #4,729?
        </h2>
        <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
          See why more buyers choose a human consultant over algorithms and call centers.
        </p>

        <div className="overflow-x-auto">
          <div className="grid grid-cols-3 min-w-[600px] gap-0 border border-border rounded-2xl overflow-hidden bg-card">
            {cols.map((col) => (
              <div
                key={col.key}
                className={cn(
                  "p-4 md:p-6 border-b border-border last:border-b-0",
                  col.isCredit && "bg-primary/5 border-l border-r border-primary/20"
                )}
              >
                <h3
                  className={cn(
                    "font-bold text-sm md:text-base mb-4",
                    col.isCredit ? "text-primary" : "text-foreground"
                  )}
                >
                  {col.label}
                </h3>
                <div className="space-y-3">
                  {rows.map((row, i) => {
                    const val = row[col.key];
                    const isCheck = col.isCredit;
                    return (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-sm"
                      >
                        {isCheck ? (
                          <Check className="size-4 text-primary shrink-0 mt-0.5" />
                        ) : (
                          <X className="size-4 text-red-500 shrink-0 mt-0.5" />
                        )}
                        <span
                          className={cn(
                            isCheck ? "text-foreground" : "text-muted-foreground"
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
      </div>
    </section>
  );
}
