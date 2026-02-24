"use client";

import { User, AlertCircle, TrendingUp } from "lucide-react";

const differentiators = [
  {
    icon: User,
    title: "You Get ONE Consultant",
    description: "You get assigned ONE mortgage consultant. That person handles everything from the first call to key collection.",
  },
  {
    icon: AlertCircle,
    title: "We Tell You \"No\" When We Should",
    description: "If your situation isn't ready for approval, we say so immediately. And we tell you exactly what needs to change.\n\nOther brokers submit hopeless applications just to say they tried. We're selective upfront because we only get paid when you get approved.",
  },
  {
    icon: TrendingUp,
    title: "We Negotiate Better Terms",
    description: "The rate the bank initially offers isn't final. We negotiate.\n\nAverage rate improvement: 0.3%\nThat saves you: AED 30,000+ over your loan's life\n\nWe've done 17,243 mortgages, so we have leverage you don't.",
  },
];

export function AboutDifferentiators() {
  return (
    <section className="py-10 md:py-14 bg-transparent" data-reveal>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          3 Things That Make Us Actually Different
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {differentiators.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all"
              >
                <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4">
                  <Icon className="size-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
