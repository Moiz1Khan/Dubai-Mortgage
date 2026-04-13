"use client";

import { useState, useEffect } from "react";
import { ApplyNowLeadModal } from "@/components/ApplyNowLeadModal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const residencyTypes = ["UAE Resident", "UAE National", "Non-Resident"] as const;
type Residency = (typeof residencyTypes)[number];

// Rate brackets from RatesTable: [minValue, variableLow, variableHigh, minDownPercent]
const RATE_BRACKETS: [number, number, number, number][] = [
  [0, 4.49, 4.99, 25],
  [1_000_000, 3.99, 4.79, 25],
  [3_000_000, 3.99, 4.49, 20],
  [5_000_000, 3.85, 4.25, 15],
];

function getRateAndMinDown(
  propertyValue: number,
  residency: Residency
): { annualRate: number; minDownPercent: number } {
  const bracket = [...RATE_BRACKETS]
    .reverse()
    .find(([min]) => propertyValue >= min);
  if (!bracket) {
    return { annualRate: 4.99 / 100, minDownPercent: 25 };
  }
  const [, low, high, minDownPercent] = bracket;
  const residencyFactor =
    residency === "UAE National" ? 0 : residency === "UAE Resident" ? 0.5 : 1;
  const annualRate = (low + (high - low) * residencyFactor) / 100;
  return { annualRate, minDownPercent };
}

function calculateMortgage(
  propertyValue: number,
  downPayment: number,
  years: number,
  annualRate: number
): {
  loanAmount: number;
  monthlyPayment: number;
  totalRepayment: number;
  totalInterest: number;
} {
  const loanAmount = Math.max(0, propertyValue - downPayment);
  if (loanAmount <= 0 || years <= 0) {
    return { loanAmount: 0, monthlyPayment: 0, totalRepayment: 0, totalInterest: 0 };
  }
  const monthlyRate = annualRate / 12;
  const numPayments = years * 12;
  const monthlyPayment =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);
  const totalRepayment = monthlyPayment * numPayments;
  const totalInterest = totalRepayment - loanAmount;
  return { loanAmount, monthlyPayment, totalRepayment, totalInterest };
}

function formatNumberWithCommas(num: number): string {
  return num.toLocaleString('en-US');
}

function parseNumberFromString(str: string): number {
  return parseInt(str.replace(/,/g, ''), 10) || 0;
}

export function MortgageCalculator() {
  const [residency, setResidency] = useState<Residency>("UAE Resident");
  const [propertyValueStr, setPropertyValueStr] = useState("1,000,000");
  const [downPaymentStr, setDownPaymentStr] = useState("400,000");
  const [loanDuration, setLoanDuration] = useState(25);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoanAmountStr, setModalLoanAmountStr] = useState("600000");
  const [modalLoanDuration, setModalLoanDuration] = useState(25);

  const propertyValue = Math.max(0, parseNumberFromString(propertyValueStr));
  const downPayment = Math.max(0, parseNumberFromString(downPaymentStr));

  const { annualRate, minDownPercent } = getRateAndMinDown(
    propertyValue,
    residency
  );
  const minDownPayment = Math.ceil((propertyValue * minDownPercent) / 100);
  const userDownPayment = Math.min(downPayment, propertyValue);
  const downPaymentError = downPayment < minDownPayment;

  const { loanAmount, monthlyPayment } =
    calculateMortgage(
      propertyValue,
      userDownPayment,
      loanDuration,
      annualRate
    );

  return (
    <section id="calculator" className="relative py-10 md:py-14 overflow-hidden bg-transparent" data-reveal>
      <div className="absolute inset-0 -z-10 [background:radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(40,48,58,0.06),transparent_50%)]" aria-hidden />
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
          See Your Real Monthly Payment <span className="text-primary">(Takes 30 Seconds)</span>
        </h2>
        <p className="text-center text-muted-foreground mt-2 mb-4">
          This is the average rate. Your exact rate might be lower.
        </p>

        <div className="mt-8 max-w-6xl mx-auto bg-card border-2 border-border rounded-3xl p-8">
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-start">
            {/* Left side - Inputs */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-3">
                  Residency status
                </label>
                <div className="flex gap-2 flex-wrap">
                  {residencyTypes.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setResidency(r)}
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                        residency === r
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Property Value
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="off"
                      placeholder="1,000,000"
                      value={propertyValueStr}
                      onChange={(e) => {
                        const v = e.target.value.replace(/\D/g, "");
                        if (v === "") {
                          setPropertyValueStr("");
                        } else {
                          const num = parseInt(v, 10);
                          setPropertyValueStr(formatNumberWithCommas(num));
                        }
                      }}
                      onBlur={() => {
                        if (propertyValueStr === "") setPropertyValueStr("0");
                      }}
                      className="w-full h-12 px-4 pr-16 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      aria-label="Property value in AED"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">AED</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Down Payment
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="off"
                      placeholder="400,000"
                      value={downPaymentStr}
                      onChange={(e) => {
                        const v = e.target.value.replace(/\D/g, "");
                        if (v === "") {
                          setDownPaymentStr("");
                        } else {
                          const num = parseInt(v, 10);
                          setDownPaymentStr(formatNumberWithCommas(num));
                        }
                      }}
                      onBlur={() => {
                        if (downPaymentStr === "") setDownPaymentStr("0");
                        else if (propertyValue > 0) {
                          const num = parseNumberFromString(downPaymentStr);
                          const capped = Math.min(num, propertyValue);
                          setDownPaymentStr(formatNumberWithCommas(capped));
                        }
                      }}
                      aria-label="Down payment in AED"
                      className={cn(
                        "w-full h-12 px-4 pr-16 rounded-lg bg-background border text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
                        downPaymentError
                          ? "border-red-500"
                          : "border-border"
                      )}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">AED</span>
                  </div>
                  {downPaymentError && (
                    <p className="text-xs text-red-600 mt-1">
                      Minimum {minDownPayment.toLocaleString()} AED ({minDownPercent}%) required
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">
                  Loan Duration
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={1}
                    max={25}
                    value={loanDuration}
                    onChange={(e) =>
                      setLoanDuration(Number(e.target.value))
                    }
                    className="flex-1 h-2 rounded-full appearance-none bg-secondary accent-primary"
                  />
                  <span className="w-20 text-sm font-medium">
                    {loanDuration} Years
                  </span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground pt-2">
                This calculation is based off of live products in our database
              </p>
            </div>

            {/* Right side - Results */}
            <div className="lg:border-l lg:border-border lg:pl-8 space-y-4">
              <div className="text-right">
                <div className="text-sm text-muted-foreground mb-1">
                  Loan Amount
                </div>
                <div className="text-4xl font-bold text-foreground">
                  {formatNumberWithCommas(loanAmount)} AED
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm text-muted-foreground mb-1">
                  Monthly Cost
                </div>
                <div className="text-3xl font-bold text-foreground">
                  {monthlyPayment > 0
                    ? `${formatNumberWithCommas(Math.round(monthlyPayment))} AED`
                    : "--"}
                </div>
              </div>

              <Button
                className="w-full mt-6"
                size="lg"
                onClick={() => {
                  setModalLoanAmountStr(
                    loanAmount > 0 ? loanAmount.toString() : "600000"
                  );
                  setModalLoanDuration(loanDuration);
                  setModalOpen(true);
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ApplyNowLeadModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        source="calculator-modal"
        initialLoanAmountStr={modalLoanAmountStr}
        initialDurationYears={modalLoanDuration}
        metadata={{
          residency,
          propertyValue,
          downPayment: userDownPayment,
          estimatedMonthlyPayment: Math.round(monthlyPayment),
        }}
        titleId="apply-modal-title"
      />
    </section>
  );
}
