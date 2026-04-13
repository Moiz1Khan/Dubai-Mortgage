"use client";

import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRatesAccess } from "@/lib/ratesAccess";
import type { ReactNode } from "react";

/**
 * Hides live EIBOR + rate tables until the user submits the Apply Now lead form once.
 * Unlock persists in localStorage for this browser.
 */
export function RatesGateBoundary({ children }: { children: ReactNode }) {
  const { unlocked, hydrated, openUnlockModal } = useRatesAccess();

  if (!hydrated) {
    return (
      <div
        className="min-h-[280px] rounded-2xl border border-border bg-muted/30 md:min-h-[320px]"
        aria-busy="true"
        aria-label="Loading rates section"
      />
    );
  }

  if (!unlocked) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-gradient-to-b from-muted/40 to-muted/20 p-10 text-center md:p-14">
        <Lock className="mx-auto mb-4 size-11 text-muted-foreground" strokeWidth={1.5} aria-hidden />
        <p className="text-lg font-semibold text-foreground">View live mortgage rates</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Submit a short application once to unlock current EIBOR fixings and indicative mortgage ranges across this
          site. Your details are sent to our team the same way as other enquiries.
        </p>
        <Button type="button" size="lg" className="mt-8" onClick={openUnlockModal}>
          View
        </Button>
      </div>
    );
  }

  return <>{children}</>;
}
