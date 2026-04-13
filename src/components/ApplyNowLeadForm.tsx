"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const financingTypes = ["Purchase Mortgage", "Refinance", "Renovation Loan"] as const;
const employmentTypes = ["Salaried", "Self-Employed", "Business Owner", "Freelancer"] as const;

export type LeadApiSource =
  | "calculator-modal"
  | "contact-page-form"
  | "cta-quote-form"
  | "rates-gate"
  | "commercial-checklist-cta"
  | "non-resident-checklist-cta";

function parseNumberFromString(str: string): number {
  return parseInt(str.replace(/\D/g, ""), 10) || 0;
}

type Props = {
  source: LeadApiSource;
  metadata?: Record<string, unknown>;
  initialLoanAmountStr?: string;
  initialDurationYears?: number;
  onSuccess: () => void;
  submitButtonText?: string;
};

export function ApplyNowLeadForm({
  source,
  metadata = {},
  initialLoanAmountStr = "600000",
  initialDurationYears = 25,
  onSuccess,
  submitButtonText = "Send",
}: Props) {
  const [financingType, setFinancingType] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [modalLoanAmountStr, setModalLoanAmountStr] = useState(initialLoanAmountStr);
  const [modalLoanDuration, setModalLoanDuration] = useState(initialDurationYears);
  const [submittingLead, setSubmittingLead] = useState(false);
  const [submitError, setSubmitError] = useState("");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setSubmittingLead(true);
        setSubmitError("");
        try {
          const response = await fetch("/api/leads", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              source,
              financingType: financingType || undefined,
              employmentType: employmentType || undefined,
              loanAmount: parseNumberFromString(modalLoanAmountStr),
              durationYears: modalLoanDuration,
              name,
              email,
              mobile,
              city,
              metadata,
            }),
          });
          if (!response.ok) {
            const text = await response.text();
            throw new Error(text || "Failed to submit form.");
          }
          onSuccess();
        } catch (error) {
          setSubmitError(error instanceof Error ? error.message : "Failed to submit form.");
        } finally {
          setSubmittingLead(false);
        }
      }}
      className="space-y-5 sm:space-y-6 p-6 sm:p-8 pt-0 sm:pt-0"
    >
      <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
        <div className="rounded-xl border border-[#e8eaef] bg-[#f6f7f9] p-4 sm:p-5">
          <label className="mb-3 block text-sm font-semibold text-[#1f2937]">
            Choose Your Financing Type
          </label>
          <div className="flex flex-wrap gap-2">
            {financingTypes.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setFinancingType(t)}
                className={cn(
                  "rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-150",
                  financingType === t
                    ? "bg-[#28303a] text-white shadow-sm"
                    : "border border-[#e2e5eb] bg-white text-[#1f2937] hover:border-[#28303a]/25 hover:bg-[#fafbfc]",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-[#e8eaef] bg-[#f6f7f9] p-4 sm:p-5">
          <label className="mb-3 block text-sm font-semibold text-[#1f2937]">Employment Type</label>
          <div className="flex flex-wrap gap-2">
            {employmentTypes.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setEmploymentType(t)}
                className={cn(
                  "rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-150",
                  employmentType === t
                    ? "bg-[#28303a] text-white shadow-sm"
                    : "border border-[#e2e5eb] bg-white text-[#1f2937] hover:border-[#28303a]/25 hover:bg-[#fafbfc]",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-[#e8eaef] bg-[#f6f7f9] p-4 sm:p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#111827]">Your loan amount (AED)</label>
            <input
              type="text"
              inputMode="numeric"
              value={modalLoanAmountStr}
              onChange={(e) => setModalLoanAmountStr(e.target.value.replace(/\D/g, ""))}
              placeholder="600000"
              className="h-12 w-full rounded-xl border border-[#d1d5db] bg-white px-4 text-[#111827] placeholder-[#9ca3af] focus:border-[#28303a]/30 focus:outline-none focus:ring-2 focus:ring-[#28303a]/25 sm:h-14 sm:px-5"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#111827]">Loan duration</label>
            <select
              value={modalLoanDuration}
              onChange={(e) => setModalLoanDuration(Number(e.target.value))}
              className="h-12 w-full rounded-xl border border-[#d1d5db] bg-white px-4 text-[#111827] focus:border-[#28303a]/30 focus:outline-none focus:ring-2 focus:ring-[#28303a]/25 sm:h-14 sm:px-5"
            >
              {Array.from({ length: 25 }, (_, i) => i + 1).map((y) => (
                <option key={y} value={y}>
                  {y} years
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#111827]">Name *</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Smith"
            className="h-12 w-full rounded-xl border border-[#d1d5db] bg-white px-4 text-[#111827] placeholder-[#9ca3af] focus:border-[#28303a]/30 focus:outline-none focus:ring-2 focus:ring-[#28303a]/25 sm:h-14 sm:px-5"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#111827]">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            className="h-12 w-full rounded-xl border border-[#d1d5db] bg-white px-4 text-[#111827] placeholder-[#9ca3af] focus:border-[#28303a]/30 focus:outline-none focus:ring-2 focus:ring-[#28303a]/25 sm:h-14 sm:px-5"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#111827]">Mobile Number *</label>
          <input
            type="tel"
            required
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="+971 50 123 4567"
            className="h-12 w-full rounded-xl border border-[#d1d5db] bg-white px-4 text-[#111827] placeholder-[#9ca3af] focus:border-[#28303a]/30 focus:outline-none focus:ring-2 focus:ring-[#28303a]/25 sm:h-14 sm:px-5"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#111827]">City *</label>
          <input
            type="text"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Dubai"
            className="h-12 w-full rounded-xl border border-[#d1d5db] bg-white px-4 text-[#111827] placeholder-[#9ca3af] focus:border-[#28303a]/30 focus:outline-none focus:ring-2 focus:ring-[#28303a]/25 sm:h-14 sm:px-5"
          />
        </div>
      </div>

      {submitError && <p className="text-sm text-red-600">{submitError}</p>}
      <button
        type="submit"
        disabled={submittingLead}
        className="h-14 w-full rounded-full bg-[#28303a] text-base font-semibold text-white shadow-[0_8px_24px_-4px_rgba(15,23,42,0.35)] transition-colors duration-150 hover:bg-[#323d48] focus:outline-none focus:ring-2 focus:ring-[#28303a]/40 focus:ring-offset-2 disabled:opacity-60 sm:h-16 sm:text-lg"
      >
        {submittingLead ? "Sending..." : submitButtonText}
      </button>
    </form>
  );
}
