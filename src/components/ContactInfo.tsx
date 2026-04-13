"use client";

import type { ReactNode } from "react";
import { Clock, Mail, MapPin } from "lucide-react";
import { useSiteContentSection } from "@/lib/useSiteContent";

function TealIconBox({ children }: { children: ReactNode }) {
  return (
    <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-[#0d9488] text-white shadow-sm">
      {children}
    </div>
  );
}

export function ContactInfo() {
  const contact = useSiteContentSection("contact");
  const email = contact.supportEmail?.trim() || "info@creditlink.ae";

  return (
    <section className="py-10 md:py-14 bg-transparent" data-reveal>
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Address */}
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="flex items-start gap-4">
              <TealIconBox>
                <MapPin className="size-6" strokeWidth={2} />
              </TealIconBox>
              <div>
                <h3 className="mb-2 text-xl font-bold text-foreground">Address</h3>
                <p className="text-muted-foreground">
                  {contact.officeAddressLine1}
                  <br />
                  {contact.officeAddressLine2}
                </p>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="flex items-start gap-4">
              <TealIconBox>
                <Mail className="size-6" strokeWidth={2} />
              </TealIconBox>
              <div>
                <h3 className="mb-2 text-xl font-bold text-foreground">Email Support</h3>
                <a
                  href={`mailto:${email}`}
                  className="text-muted-foreground underline-offset-2 transition-colors hover:text-primary hover:underline"
                >
                  {email}
                </a>
              </div>
            </div>
          </div>

          {/* Office hours — spans full row on md when 2-col, or 3rd col on lg */}
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8 md:max-lg:col-span-2 lg:col-span-1">
            <div className="flex items-start gap-4">
              <TealIconBox>
                <Clock className="size-6" strokeWidth={2} />
              </TealIconBox>
              <div>
                <h3 className="mb-2 text-xl font-bold text-foreground">Office Hours</h3>
                <p className="text-muted-foreground">
                  {contact.officeHoursLine1}
                  <br />
                  {contact.officeHoursLine2}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
