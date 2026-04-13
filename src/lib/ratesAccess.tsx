"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { ApplyNowLeadForm } from "@/components/ApplyNowLeadForm";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "creditlink_rates_unlocked_v1";

type RatesAccessContextValue = {
  unlocked: boolean;
  hydrated: boolean;
  openUnlockModal: () => void;
  closeUnlockModal: () => void;
};

const RatesAccessContext = createContext<RatesAccessContextValue | null>(null);

export function useRatesAccess() {
  const ctx = useContext(RatesAccessContext);
  if (!ctx) {
    throw new Error("useRatesAccess must be used within RatesAccessProvider");
  }
  return ctx;
}

function RatesUnlockModal({
  open,
  onClose,
  onUnlocked,
}: {
  open: boolean;
  onClose: () => void;
  onUnlocked: () => void;
}) {
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  const unlock = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    onUnlocked();
    onClose();
    window.dispatchEvent(new Event("rates-access-changed"));
  }, [onClose, onUnlocked]);

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
      className="fixed inset-0 z-[120] overflow-y-auto overscroll-y-contain bg-black/50 px-4 py-6 sm:px-6 sm:py-10 sm:pb-14"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rates-unlock-modal-title"
      onClick={onClose}
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
            <h2
              id="rates-unlock-modal-title"
              className="text-2xl font-bold tracking-tight text-[#1a1f26] sm:text-3xl"
            >
              Apply Now
            </h2>
            <button
              type="button"
              onClick={onClose}
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
            source="rates-gate"
            metadata={{ intent: "unlock_mortgage_rates_site_wide" }}
            onSuccess={unlock}
            submitButtonText="Send"
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function RatesAccessProvider({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const readStorage = useCallback(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    setUnlocked(readStorage());
    setHydrated(true);
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setUnlocked(readStorage());
    };
    const onCustom = () => setUnlocked(readStorage());
    window.addEventListener("storage", onStorage);
    window.addEventListener("rates-access-changed", onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("rates-access-changed", onCustom);
    };
  }, [readStorage]);

  const openUnlockModal = useCallback(() => setModalOpen(true), []);
  const closeUnlockModal = useCallback(() => setModalOpen(false), []);

  const value = useMemo(
    () => ({
      unlocked,
      hydrated,
      openUnlockModal,
      closeUnlockModal,
    }),
    [unlocked, hydrated, openUnlockModal, closeUnlockModal],
  );

  const markUnlocked = useCallback(() => {
    setUnlocked(true);
  }, []);

  return (
    <RatesAccessContext.Provider value={value}>
      {children}
      <RatesUnlockModal open={modalOpen} onClose={closeUnlockModal} onUnlocked={markUnlocked} />
    </RatesAccessContext.Provider>
  );
}
