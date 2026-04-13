"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ApplyNowLeadModal } from "@/components/ApplyNowLeadModal";
import type { LeadApiSource } from "@/components/ApplyNowLeadForm";

type Variant = "commercial" | "non-resident";

const copy: Record<
  Variant,
  { description: string; modalTitleId: string }
> = {
  commercial: {
    description:
      "Share your details and we’ll help you prepare your commercial application and checklist.",
    modalTitleId: "commercial-checklist-apply-title",
  },
  "non-resident": {
    description:
      "Share your details and we’ll help you prepare your non-resident application and checklist.",
    modalTitleId: "non-resident-checklist-apply-title",
  },
};

const sourceByVariant: Record<Variant, LeadApiSource> = {
  commercial: "commercial-checklist-cta",
  "non-resident": "non-resident-checklist-cta",
};

export function ChecklistGetStartedCard({
  variant,
  className = "",
}: {
  variant: Variant;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const c = copy[variant];

  return (
    <>
      <div
        className={`bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center lg:w-[320px] ${className}`}
      >
        <FileText className="size-16 text-white mx-auto mb-6 opacity-80" aria-hidden />
        <h3 className="text-2xl font-bold mb-2">Get Started</h3>
        <p className="text-white/70 mb-8">{c.description}</p>
        <Button
          type="button"
          size="lg"
          className="w-full bg-white text-primary hover:bg-white/90"
          onClick={() => setOpen(true)}
        >
          Get Started
        </Button>
      </div>
      <ApplyNowLeadModal
        open={open}
        onOpenChange={setOpen}
        source={sourceByVariant[variant]}
        metadata={{ intent: `${variant}_checklist_get_started` }}
        titleId={c.modalTitleId}
      />
    </>
  );
}
