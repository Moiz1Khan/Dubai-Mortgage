"use client";

import { SvgBadge } from "@/components/SvgBadge";

const loanTypes = [
  {
    icon: "home" as const,
    title: "PURCHASE MORTGAGE",
    subtitle: "Buy Your Dream Home with Financing That Fits Your Budget.",
    description: "Whether it's your first apartment or you're upgrading to a villa, we secure competitive rates from over 15 UAE lenders.",
  },
  {
    icon: "refresh" as const,
    title: "REFINANCE MORTGAGE",
    subtitle: "Lower Your Rate, Reduce Payments, or Access Your Equity.",
    description: "Your mortgage doesn't have to stay the same forever. If rates drop or your financial situation improves, refinancing could save you thousands of dollars each month.",
  },
  {
    icon: "hammer" as const,
    title: "HOME RENOVATION LOAN",
    subtitle: "Finance Your Property Improvements Up to 85% of Home Value.",
    description: "Need a new kitchen? Adding a room? Complete renovation? Finance it through your mortgage at lower rates than personal loans.",
  },
];

export function ResidentialLoanTypes() {
  return (
    <section className="py-10 md:py-14 bg-transparent" data-reveal>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
          Which Home Loan Do You Need?
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {loanTypes.map((loan) => {
            return (
              <div
                key={loan.title}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <div className="inline-flex mb-4">
                  <SvgBadge variant={loan.icon} className="size-14" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 uppercase tracking-wide">
                  {loan.title}
                </h3>
                <p className="text-base font-semibold text-primary mb-3">
                  {loan.subtitle}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {loan.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
