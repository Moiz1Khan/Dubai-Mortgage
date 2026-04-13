"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ApplyNowLeadForm, type LeadApiSource } from "@/components/ApplyNowLeadForm";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source: LeadApiSource;
  metadata?: Record<string, unknown>;
  initialLoanAmountStr?: string;
  initialDurationYears?: number;
  title?: string;
  titleId?: string;
};

/**
 * Same Apply Now lead modal shell as the home-page mortgage calculator (portal to document.body).
 */
export function ApplyNowLeadModal({
  open,
  onOpenChange,
  source,
  metadata = {},
  initialLoanAmountStr = "600000",
  initialDurationYears = 25,
  title = "Apply Now",
  titleId = "apply-now-lead-modal-title",
}: Props) {
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open || !portalReady) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[110] overflow-y-auto overscroll-y-contain bg-black/50 px-4 py-6 sm:px-6 sm:py-10 sm:pb-14"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={() => onOpenChange(false)}
    >
      <div className="flex min-h-full items-start justify-center">
        <div
          className={cn(
            "w-full max-w-4xl",
            "rounded-2xl bg-white shadow-[0_24px_64px_-12px_rgba(15,23,42,0.35)] ring-1 ring-black/[0.06] sm:rounded-3xl",
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-2xl border-b border-[#e8eaef] bg-white px-6 py-4 sm:rounded-t-3xl sm:px-8 sm:py-5">
            <h2 id={titleId} className="text-2xl font-bold tracking-tight text-[#1a1f26] sm:text-3xl">
              {title}
            </h2>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-full p-2 text-[#374151] transition-colors hover:bg-[#f3f4f6]"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          <ApplyNowLeadForm
            source={source}
            initialLoanAmountStr={initialLoanAmountStr}
            initialDurationYears={initialDurationYears}
            metadata={metadata}
            onSuccess={() => onOpenChange(false)}
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}
