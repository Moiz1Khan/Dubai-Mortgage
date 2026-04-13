"use client";

import { useSiteContentSection } from "@/lib/useSiteContent";

export function ContactMap() {
  const contact = useSiteContentSection("contact");
  const query = contact.mapQuery?.trim() || "Business Bay, Dubai, United Arab Emirates";
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className="py-10 md:py-14 bg-transparent" data-reveal>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-6 md:mb-8">
          {contact.mapHeading}
        </h2>
        <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-muted/30 shadow-[0_20px_50px_-28px_rgba(15,23,42,0.35)] aspect-[4/3] md:aspect-[21/9] min-h-[260px] max-h-[min(52vh,520px)]">
          <iframe
            title={`Map: ${query}`}
            src={src}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          {contact.officeAddressLine1}
          <br />
          {contact.officeAddressLine2}
        </p>
      </div>
    </section>
  );
}
