"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { images } from "@/lib/media";

const steps = [
  {
    id: 1,
    title: "Honest Assessment",
    description: "You tell us your situation. We tell you honestly:",
    bullets: [
      "If you'll get approved",
      "Which banks will say yes",
      "What rate to expect",
      "Potential problems",
      "Exact timeline",
    ],
    footer: "If we can't help, we say so immediately and tell you what needs to change.",
    image: "https://res.cloudinary.com/dxfejax3u/image/upload/v1771955066/Gemini_Generated_Image_evuustevuustevuu_nskhbx.png",
  },
  {
    id: 2,
    title: "Perfect the Application (Before Submission)",
    description: "We don't submit and hope. We prepare until it's perfect.",
    bullets: [
      "Review every document",
      "Fix issues before banks see them",
      "Present your financials optimally",
      "Only submit when we know you'll get approved",
    ],
    footer: "This is why our approval rate is 92%.",
    image: "https://res.cloudinary.com/dxfejax3u/image/upload/v1771955066/Gemini_Generated_Image_evuustevuustevuu_nskhbx.png",
  },
  {
    id: 3,
    title: "Submit & Negotiate (Simultaneously)",
    description: "We submit to multiple lenders at once. Not one at a time.",
    bullets: [
      "Lower interest rates",
      "Better LTV",
      "Reduced fees",
      "Flexible terms",
    ],
    footer: "Banks give us better deals because we bring them volume (17,243 mortgages since 2015).",
    image: "https://res.cloudinary.com/dxfejax3u/image/upload/v1771955066/Gemini_Generated_Image_evuustevuustevuu_nskhbx.png",
  },
  {
    id: 4,
    title: "Updates (Every 48 Hours Minimum)",
    description: "You never wonder \"what's happening?\"",
    bullets: [
      "We update you every 48 hours minimum",
      "Usually more",
      "Even if nothing changed, we tell you",
    ],
    footer: "",
    image: images.process[3],
  },
  {
    id: 5,
    title: "Closing",
    description: "Bank paperwork. Lawyer appointments. Developer handover. Utility connections.",
    bullets: [
      "We coordinate all of it",
      "You just show up to sign and collect keys",
    ],
    footer: "",
    image: images.process[0],
  },
];

export function AboutHowWeWork() {
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
    <section className="py-10 md:py-14 bg-transparent" data-reveal>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          How We Actually Work
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Scrollable text content */}
          <div className="space-y-32">
            {steps.map((step, index) => (
              <div
                key={step.id}
                ref={(el) => {
                  sectionRefs.current[index] = el;
                }}
                className="min-h-[60vh] flex flex-col justify-center"
              >
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-base md:text-lg text-foreground">
                    {step.description}
                  </p>
                  <ul className="space-y-2">
                    {step.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm md:text-base text-muted-foreground">
                        <span className="text-primary mt-1">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  {step.footer && (
                    <p className="text-sm md:text-base text-primary font-semibold pt-2">
                      {step.footer}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Sticky image that changes */}
          <div className="relative lg:sticky lg:top-24 h-[60vh] hidden lg:block">
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    activeIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={step.image}
                    alt={step.title}
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
      </div>
    </section>
  );
}
