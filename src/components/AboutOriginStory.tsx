"use client";

import { Lanyard } from "@/components/Lanyard";

export function AboutOriginStory() {
  return (
    <section className="relative py-10 md:py-14 bg-transparent min-h-[600px]" data-reveal>
      {/* Lanyard on the left side */}
      <Lanyard />
      
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Started Because Banks Made Us Angry…
        </h2>

        <div className="space-y-6 text-base md:text-lg leading-relaxed">
          <p className="text-foreground">
            In 2015, our founder, Hassan, spent 10 years as a senior underwriter at Emirates NBD. Every day, he rejected good people for stupid reasons.
          </p>

          <div className="bg-card border-l-4 border-primary p-6 rounded-r-xl space-y-2">
            <p className="text-muted-foreground italic">"Your income is too variable…"</p>
            <p className="text-muted-foreground italic">"You just changed jobs…"</p>
            <p className="text-muted-foreground italic">"Your credit score is 680, we need 700..."</p>
          </div>

          <p className="text-foreground">
            The thing is, most of these people COULD afford the mortgage. They just didn't fit the bank's rigid boxes.
          </p>

          <div className="bg-primary/5 border border-primary/20 p-6 md:p-8 rounded-2xl">
            <p className="text-foreground font-semibold text-lg md:text-xl mb-3">
              So he left. Started Credit Link. And built a business around one idea:
            </p>
            <p className="text-foreground text-lg md:text-xl">
              Get real people approved by finding the right lender for their actual situation.
            </p>
            <p className="text-muted-foreground mt-2 text-base">
              Not perfect situations. Real ones.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
