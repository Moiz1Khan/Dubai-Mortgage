"use client";

const stroke = {
  width: 1.75 as const,
  cap: "round" as const,
  join: "round" as const,
};

/** Dedicated single consultant — figure with “1” badge */
function SvgOneConsultant({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      aria-hidden
    >
      <circle cx="10" cy="9" r="3.25" className="stroke-[#0b192e]" strokeWidth={stroke.width} />
      <path
        d="M5 20v-.5c0-2.8 2.25-5 5-5s5 2.2 5 5V20"
        className="stroke-[#0b192e]"
        strokeWidth={stroke.width}
        strokeLinecap={stroke.cap}
        strokeLinejoin={stroke.join}
      />
      <circle cx="17.5" cy="6.5" r="3.5" className="fill-emerald-500 stroke-white" strokeWidth="1.5" />
      <path
        d="M17.5 4.2v5.2"
        className="stroke-white"
        strokeWidth="1.85"
        strokeLinecap={stroke.cap}
      />
    </svg>
  );
}

/** Honest “no” — alert in circle */
function SvgHonestNo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" className="stroke-[#0b192e]" strokeWidth={stroke.width} />
      <path d="M12 8v4.5" className="stroke-[#0b192e]" strokeWidth={2} strokeLinecap={stroke.cap} />
      <circle cx="12" cy="16" r="1.15" className="fill-[#0b192e]" />
    </svg>
  );
}

/** Negotiate / better terms — upward trend */
function SvgNegotiate({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      aria-hidden
    >
      <path
        d="M4 18V6M4 18h16"
        className="stroke-[#0b192e]/35"
        strokeWidth={1.5}
        strokeLinecap={stroke.cap}
      />
      <path
        d="M6 14l4-4 3 3 5-6"
        className="stroke-[#0b192e]"
        strokeWidth={stroke.width}
        strokeLinecap={stroke.cap}
        strokeLinejoin={stroke.join}
      />
      <path
        d="M16 7h3v3"
        className="stroke-emerald-600"
        strokeWidth={stroke.width}
        strokeLinecap={stroke.cap}
        strokeLinejoin={stroke.join}
      />
    </svg>
  );
}

const differentiators = [
  {
    Icon: SvgOneConsultant,
    title: "You Get ONE Consultant",
    description:
      "You get assigned ONE mortgage consultant. That person handles everything from the first call to key collection.",
  },
  {
    Icon: SvgHonestNo,
    title: "We Tell You \"No\" When We Should",
    description:
      "If your situation isn't ready for approval, we say so immediately. And we tell you exactly what needs to change.\n\nOther brokers submit hopeless applications just to say they tried. We're selective upfront because we only get paid when you get approved.",
  },
  {
    Icon: SvgNegotiate,
    title: "We Negotiate Better Terms",
    description:
      "The rate the bank initially offers isn't final. We negotiate.\n\nAverage rate improvement: 0.3%\nThat saves you: AED 30,000+ over your loan's life\n\nWe've done 17,243 mortgages, so we have leverage you don't.",
  },
];

export function AboutDifferentiators() {
  return (
    <section className="py-12 md:py-16 bg-white" data-reveal>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-10 md:mb-12 tracking-tight">
          3 Things That Make Us Actually Different
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {differentiators.map((item) => {
            const SvgIcon = item.Icon;
            return (
              <div
                key={item.title}
                className="bg-card rounded-2xl p-6 md:p-7 border border-border shadow-sm hover:border-primary/25 hover:shadow-md transition-all"
              >
                <div
                  className="inline-flex size-[3.5rem] items-center justify-center rounded-xl bg-[#eef2f8] border border-[#dce4f0] mb-5"
                  aria-hidden
                >
                  <SvgIcon className="size-8" />
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
