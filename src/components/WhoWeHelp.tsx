"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { WhoWeHelpBottomRightAccent, WhoWeHelpTopLeftAccent } from "@/components/WhoWeHelpImageAccents";

const profiles = [
  {
    id: 1,
    title: "Self-Employed & Business Owners",
    tagline: "Variable Income Isn't a Problem When You Know How to Present It.",
    image: "https://res.cloudinary.com/dxfejax3u/image/upload/v1772462434/WhatsApp_Image_2026-03-02_at_7.08.02_PM_1_r4q1xi.jpg",
    copy: "Three banks said your income is \"inconsistent.\" We've approved 2,400+ self-employed clients because we know how to show banks the full picture.",
  },
  {
    id: 2,
    title: "Non-UAE Residents",
    tagline: "Buy Dubai Property From London, Mumbai, or New York, and Visit the UAE Once.",
    image: "https://res.cloudinary.com/dxfejax3u/image/upload/v1772462434/WhatsApp_Image_2026-03-02_at_7.08.02_PM_gzenky.jpg",
    copy: "Financed buyers from 47 countries. The whole process happens remotely. You fly in for 2 days to sign papers and collect keys. That's it.",
  },
  {
    id: 3,
    title: "Previously Rejected Applications",
    tagline: "60% of 'Rejected' Applications We Review Get Approved.",
    image: "https://res.cloudinary.com/dxfejax3u/image/upload/v1772462433/WhatsApp_Image_2026-03-02_at_7.08.01_PM_vkryes.jpg",
    copy: "Banks said no. We say, \"let's fix what went wrong.\" Most rejections aren't because you don't qualify; you applied to the wrong bank or presented incorrect information.",
  },
  {
    id: 4,
    title: "Complex Situations",
    tagline: "The More Complicated Your Case, the More We Shine.",
    image: "https://res.cloudinary.com/dxfejax3u/image/upload/v1772462419/WhatsApp_Image_2026-03-02_at_7.08.01_PM_1_xybvsl.jpg",
    copy: "Cookie-cutter is boring. We love puzzles. Multiple properties? Unusual income? Commercial deal? Bring it.",
  },
];

export function WhoWeHelp() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex(
              (ref) => ref === entry.target
            );
            if (index !== -1) {
              setActiveIndex(index);
            }
          }
        });
      },
      {
        threshold: 0.6,
        rootMargin: "-20% 0px -20% 0px",
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section className="py-10 md:py-14 bg-transparent" data-reveal data-green-glow>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 green-underline">
          WHO WE HELP
        </h2>
        <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
          We Handle the Cases Other Mortgage Brokers Run From
        </p>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Scrollable text content */}
          <div className="space-y-32">
            {profiles.map((profile, index) => (
              <div
                key={profile.id}
                ref={(el) => {
                  sectionRefs.current[index] = el;
                }}
                className="min-h-[60vh] flex flex-col justify-center"
              >
                <div className="space-y-4">
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                    {profile.title}
                  </h3>
                  <p className="text-lg md:text-xl text-primary font-semibold">
                    {profile.tagline}
                  </p>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    {profile.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Sticky image that changes */}
          <div className="relative lg:sticky lg:top-24 h-[60vh] hidden lg:block">
            {/* Corner accents: EIBOR-style trend (TL) + home / trust / liquidity (BR) */}
            <div
              className="pointer-events-none absolute -top-4 -left-4 z-0 h-[5.25rem] w-[5.25rem] sm:h-28 sm:w-28"
              aria-hidden
            >
              <div className="flex h-full w-full items-center justify-center rounded-2xl border-2 border-[#c5d0e0] bg-card/95 p-3 shadow-sm backdrop-blur-sm dark:border-slate-600 dark:bg-card/90">
                <WhoWeHelpTopLeftAccent className="h-[4.25rem] w-[4.25rem] sm:h-[5.25rem] sm:w-[5.25rem]" />
              </div>
            </div>
            <div
              className="pointer-events-none absolute -bottom-5 -right-5 z-0 h-[5.75rem] w-[5.75rem] sm:h-32 sm:w-32"
              aria-hidden
            >
              <div className="flex h-full w-full items-center justify-center rounded-2xl border border-white/80 bg-white/80 p-3 shadow-sm backdrop-blur-sm dark:border-slate-600/70 dark:bg-slate-800/80">
                <WhoWeHelpBottomRightAccent className="h-[4.5rem] w-[4.5rem] sm:h-[5.75rem] sm:w-[5.75rem]" />
              </div>
            </div>

            <div className="relative z-10 h-full w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/[0.06] dark:ring-white/10">
              {profiles.map((profile, index) => (
                <div
                  key={profile.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    activeIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={profile.image}
                    alt={profile.title}
                    fill
                    className="object-cover"
                    sizes="50vw"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Which Category Sounds Like You? Tell Us Your Information
          </a>
        </div>
      </div>
    </section>
  );
}
