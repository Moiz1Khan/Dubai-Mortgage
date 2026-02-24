"use client";

import { useState } from "react";
import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

const everyone = [
  "Passport + Emirates ID",
  "Visa + residence permit",
  "Last 6 months bank statements",
  "Property documents",
];

const salaried = [
  "Salary certificate",
  "Last 6 months payslips",
  "Employment contract",
];

const selfEmployed = [
  "Trade license",
  "Last 6 months business statements",
  "Last 2 years financials (if available)",
  "MOA (Memorandum of Association)",
];

type Tab = "everyone" | "salaried" | "selfEmployed";

const tabs: { id: Tab; label: string }[] = [
  { id: "everyone", label: "Everyone" },
  { id: "salaried", label: "Salaried" },
  { id: "selfEmployed", label: "Self-Employed" },
];

const data: Record<Tab, string[]> = { everyone, salaried, selfEmployed };

export function EligibilityChecklist() {
  const [active, setActive] = useState<Tab>("everyone");
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const items = data[active];
  const checkedCount = items.filter((i) => checked[i]).length;

  const toggle = (item: string) => {
    setChecked((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  return (
    <section className="py-10 md:py-14 bg-transparent">
      <div className="max-w-2xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Home Loan Eligibility Checklist
        </h2>

        {/* Tab switcher */}
        <div className="flex gap-2 p-1.5 rounded-xl bg-secondary/60 border border-border mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={cn(
                "flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors",
                active === tab.id
                  ? "bg-[#28303a] text-white"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/60"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Interactive checklist - click to tick */}
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
          <p className="text-sm text-muted-foreground mb-4">
            Tap each item when you&apos;ve gathered it — {checkedCount}/{items.length} ready
          </p>
          <ul className="space-y-2.5">
            {items.map((item) => {
              const isChecked = checked[item];
              return (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => toggle(item)}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all",
                      isChecked
                        ? "bg-primary/10 border border-primary/20"
                        : "bg-secondary/40 border border-transparent hover:bg-secondary/60"
                    )}
                  >
                    {isChecked ? (
                      <Check className="size-5 text-primary shrink-0" />
                    ) : (
                      <Circle className="size-5 text-muted-foreground shrink-0" />
                    )}
                    <span
                      className={cn(
                        "font-medium",
                        isChecked ? "text-foreground line-through decoration-primary/50" : "text-muted-foreground"
                      )}
                    >
                      {item}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
