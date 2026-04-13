"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MessageSquare } from "lucide-react";
import { useSiteContentSection } from "@/lib/useSiteContent";

function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

/** Shown when env + CMS digits are missing or stale (CMS often overrides footer.phone). */
const DEFAULT_WHATSAPP_DIGITS = "971585378607";
const DEFAULT_QUICK_CONTACT_HOURS =
  "Monday to Friday: 9:00 AM – 6:00 PM · Saturday and Sunday: Closed";

function formatAeMobileDisplay(digits: string): string {
  const d = digitsOnly(digits);
  if (d.length === 12 && d.startsWith("971")) {
    return `+971 ${d.slice(3, 5)} ${d.slice(5, 8)} ${d.slice(8)}`;
  }
  if (d.length >= 8) return `+${d}`;
  return "+971 58 537 8607";
}

const WHATSAPP_PREFILL = encodeURIComponent(
  "Hi, I'm reaching out from the Credit Link contact page."
);

export function ContactForm() {
  const footer = useSiteContentSection("footer");
  const contact = useSiteContentSection("contact");
  const envWa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
  const waDigits = digitsOnly(envWa || footer.whatsappNumber || DEFAULT_WHATSAPP_DIGITS);
  const displayPhone = formatAeMobileDisplay(waDigits);
  const phoneTel = `+${waDigits}`;
  const supportEmail = contact.supportEmail?.trim() || "info@creditlink.ae";
  const waHref = `https://wa.me/${waDigits}?text=${WHATSAPP_PREFILL}`;
  const callHoursSubtext =
    [contact.officeHoursLine1, contact.officeHoursLine2].filter((line) => line?.trim()).join(" · ") ||
    footer.hours?.trim() ||
    DEFAULT_QUICK_CONTACT_HOURS;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "contact-page-form",
          name: formData.name,
          email: formData.email,
          mobile: formData.phone,
          metadata: {
            subject: formData.subject,
            message: formData.message,
          },
        }),
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to submit contact form.");
      }
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      }, 3000);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Failed to submit contact form."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="py-10 md:py-14 bg-transparent" data-reveal>
        <div className="max-w-2xl mx-auto px-4 md:px-8">
          <div className="bg-card border-2 border-primary/30 rounded-2xl p-8 md:p-12 text-center">
            <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
              <Mail className="size-8 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Thank You!</h2>
            <p className="text-muted-foreground">
              We&apos;ve received your message and will get back to you within 2 hours.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 md:py-14 bg-transparent" data-reveal>
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Left: Form */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full h-12 px-4 rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full h-12 px-4 rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full h-12 px-4 rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="+971 50 123 4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="w-full h-12 px-4 rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                {submitting ? "Sending..." : "Send Message"}
              </Button>
              {error && <p className="text-sm text-red-600">{error}</p>}
            </form>
          </div>

          {/* Right: Quick Contact */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Quick Contact</h2>
              <p className="text-muted-foreground mb-8">
                Prefer to reach out directly? Use one of these methods:
              </p>
            </div>

            <div className="space-y-4">
              <a
                href={`tel:${phoneTel}`}
                className="group flex items-start gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div className="rounded-lg bg-primary/10 p-3 transition-colors group-hover:bg-primary/20">
                  <Phone className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-foreground">Call Us</h3>
                  <p className="text-sm text-muted-foreground">{displayPhone}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{callHoursSubtext}</p>
                </div>
              </a>

              <a
                href={`mailto:${supportEmail}`}
                className="group flex items-start gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div className="rounded-lg bg-primary/10 p-3 transition-colors group-hover:bg-primary/20">
                  <Mail className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-foreground">Email Us</h3>
                  <p className="text-sm text-muted-foreground">{supportEmail}</p>
                  <p className="mt-1 text-xs text-muted-foreground">We reply within 2 hours</p>
                </div>
              </a>

              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div className="rounded-lg bg-primary/10 p-3 transition-colors group-hover:bg-primary/20">
                  <MessageSquare className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-foreground">WhatsApp</h3>
                  <p className="text-sm text-muted-foreground">{displayPhone}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Tap to chat on WhatsApp</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
