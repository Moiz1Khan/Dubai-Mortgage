"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Interest = "purchase" | "refinance" | "renovation" | "";

export function CTAAndLeadSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState<Interest>("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "cta-quote-form",
          financingType: interest || undefined,
          name,
          email,
          mobile: phone,
        }),
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to submit quote request.");
      }
      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Failed to submit quote request."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section id="contact" className="py-8 md:py-10 bg-transparent" data-reveal>
        <div className="max-w-xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Thank you!</h2>
          <p className="text-muted-foreground">
            We&apos;ll contact you within 24 hours with your personalized rate quote.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-8 md:py-10 bg-transparent" data-reveal>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left: Ready to own your Dubai home? */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to own your
              <br />
              <span className="text-primary">Dubai home?</span>
            </h2>
            <p className="text-muted-foreground mb-6 lg:mb-8 max-w-lg lg:mx-0 mx-auto">
              Get your exact rate from 15 UAE banks. No obligation, no commitment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg">
                <a href="#calculator">Get Started</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#contact">Get My Exact Rate Quote</a>
              </Button>
            </div>
          </div>

          {/* Right: Get Your Exact Rate Quote form */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center lg:text-left">
              Get Your Exact Rate Quote
            </h2>
            <p className="text-muted-foreground mb-6 text-center lg:text-left">
              Fill in your details and we&apos;ll compare 15+ banks for you. No obligation.
            </p>
            <form
              onSubmit={handleSubmit}
              className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-4"
            >
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full h-12 px-4 rounded-lg bg-background border border-border"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-12 px-4 rounded-lg bg-background border border-border"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-12 px-4 rounded-lg bg-background border border-border"
                  placeholder="+971 50 123 4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  I&apos;m interested in
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: "purchase" as const, label: "Purchase Mortgage" },
                    { value: "refinance" as const, label: "Refinance" },
                    { value: "renovation" as const, label: "Renovation Loan" },
                  ].map(({ value, label }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setInterest(value)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        interest === value
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                {submitting ? "Submitting..." : "Get My Quote"}
              </Button>
              {submitError && <p className="text-sm text-red-600">{submitError}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
