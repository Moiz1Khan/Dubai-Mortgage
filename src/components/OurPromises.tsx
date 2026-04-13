"use client";

type PromiseIcon = "consultant" | "updates" | "approved" | "assessment";

const promises = [
  {
    icon: "consultant" as PromiseIcon,
    title: "YOUR DEDICATED CONSULTANT",
    copy: "One Person. Your Entire Journey.",
  },
  {
    icon: "updates" as PromiseIcon,
    title: "48-HOUR UPDATES",
    copy: "You'll Never Be Left in the Dark",
  },
  {
    icon: "approved" as PromiseIcon,
    title: "NO FEE UNLESS APPROVED",
    copy: "We Only Win When You Win",
  },
  {
    icon: "assessment" as PromiseIcon,
    title: "HONEST ASSESSMENT",
    copy: "We'll Tell You the Truth Upfront",
  },
];

function PromiseBadge({ icon }: { icon: PromiseIcon }) {
  const accent =
    icon === "consultant"
      ? { from: "#0ea5e9", to: "#2563eb", stroke: "#ffffff" }
      : icon === "updates"
        ? { from: "#22c55e", to: "#16a34a", stroke: "#ffffff" }
        : icon === "approved"
          ? { from: "#8b5cf6", to: "#6d28d9", stroke: "#ffffff" }
          : { from: "#f59e0b", to: "#d97706", stroke: "#ffffff" };

  return (
    <div className="relative inline-flex mb-4">
      <div className="absolute inset-0 rounded-2xl blur-md opacity-35 bg-gradient-to-br from-white to-transparent" />
      <svg
        viewBox="0 0 72 72"
        className="relative size-16 drop-shadow-[0_8px_18px_rgba(15,23,42,0.25)]"
        aria-hidden
      >
        <defs>
          <linearGradient id={`badge-${icon}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={accent.from} />
            <stop offset="100%" stopColor={accent.to} />
          </linearGradient>
        </defs>
        <rect x="6" y="6" width="60" height="60" rx="16" fill={`url(#badge-${icon})`} />
        {icon === "consultant" && (
          <>
            <circle cx="36" cy="30" r="7" fill="none" stroke={accent.stroke} strokeWidth="3" />
            <path d="M23 49c3-6 8-9 13-9s10 3 13 9" fill="none" stroke={accent.stroke} strokeWidth="3" strokeLinecap="round" />
          </>
        )}
        {icon === "updates" && (
          <>
            <circle cx="36" cy="36" r="15" fill="none" stroke={accent.stroke} strokeWidth="3" />
            <path d="M36 26v10l7 4" fill="none" stroke={accent.stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </>
        )}
        {icon === "approved" && (
          <>
            <path d="M36 20 50 26v11c0 9-5 14-14 17-9-3-14-8-14-17V26z" fill="none" stroke={accent.stroke} strokeWidth="3" />
            <path d="m30 37 4 4 8-8" fill="none" stroke={accent.stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </>
        )}
        {icon === "assessment" && (
          <>
            <path d="M21 33c0-8 7-14 15-14s15 6 15 14-7 14-15 14h-4l-7 6 2-8c-4-2-6-6-6-12Z" fill="none" stroke={accent.stroke} strokeWidth="3" strokeLinejoin="round" />
            <circle cx="31" cy="33" r="2" fill={accent.stroke} />
            <circle cx="36" cy="33" r="2" fill={accent.stroke} />
            <circle cx="41" cy="33" r="2" fill={accent.stroke} />
          </>
        )}
      </svg>
    </div>
  );
}

export function OurPromises() {
  return (
    <section className="py-10 md:py-14 bg-transparent" data-reveal>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Our Promises to You
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {promises.map(({ icon, title, copy }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-card p-6 text-center hover:border-primary/40 hover:shadow-[0_14px_32px_-18px_rgba(37,99,235,0.45)] hover:-translate-y-0.5 transition-all"
            >
              <PromiseBadge icon={icon} />
              <h3 className="font-bold text-sm uppercase tracking-wide mb-2">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
