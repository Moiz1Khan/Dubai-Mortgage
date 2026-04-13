"use client";

import { CircleHelp } from "lucide-react";

const faqs = [
  {
    q: "How long have you been in business?",
    a: "Since 2015. Started by former Emirates NBD underwriter who got tired of rejecting good people for bad reasons.",
  },
  {
    q: "How do you make money if you're free?",
    a: "Banks pay us when we bring them approved clients. You pay the same rate whether you go direct or through us—but we negotiate better terms.",
  },
  {
    q: "Why should I use a broker instead of going to my bank directly?",
    a: "Your bank gives you their rates. We check 15 banks and get you the best one. Plus we negotiate. Average rate improvement: 0.3% = AED 30K+ saved.",
  },
  {
    q: "What if I'm not in Dubai?",
    a: "We handle 35% of clients remotely (especially non-residents). Video calls, WhatsApp, secure document upload. You only visit UAE once for signing.",
  },
  {
    q: "Do you have offices?",
    a: "One office in Dubai. But most clients never visit it—everything happens via phone/WhatsApp/video.",
  },
  {
    q: "Can I meet my consultant in person?",
    a: "Yes. Book appointment and they'll meet you at our office or a convenient location.",
  },
];

export function AboutFAQ() {
  return (
    <section id="faq" className="py-10 md:py-14 bg-transparent" data-reveal>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            FAQ's
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:border-primary/25 hover:shadow-md transition-all"
            >
              <div className="flex gap-4">
                <div
                  className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#f0f0f0] border border-[#e6e6e6]"
                  aria-hidden
                >
                  <CircleHelp
                    className="size-5 text-[#2d3748]"
                    strokeWidth={1.75}
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-foreground mb-3 text-base">
                    {faq.q}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
