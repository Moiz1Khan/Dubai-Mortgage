"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useSiteContentSection } from "@/lib/useSiteContent";

/** Same asset as the main header logo */
const CREDIT_LINK_LOGO_URL =
  "https://res.cloudinary.com/dxfejax3u/image/upload/v1773153203/Full_Logo_kzokcw.png";

function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

const DEFAULT_WHATSAPP_DIGITS = "971585378607";

function formatAeMobileDisplay(digits: string): string {
  const d = digitsOnly(digits);
  if (d.length === 12 && d.startsWith("971")) {
    return `+971 ${d.slice(3, 5)} ${d.slice(5, 8)} ${d.slice(8)}`;
  }
  if (d.length >= 8) return `+${d}`;
  return "+971 58 537 8607";
}

const WHATSAPP_FOOTER_TEXT = encodeURIComponent(
  "Hi, I'm messaging from the Credit Link website footer."
);

const financeLinks = [
  { href: "/residential-finance", label: "Residential" },
  { href: "/commercial-finance", label: "Commercial" },
  { href: "/non-resident-finance", label: "Non-Resident" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const toolsLinks = [{ href: "/#calculator", label: "Calculator" }];

const footerNavHeading =
  "m-0 text-xs font-semibold uppercase leading-none tracking-[0.2em] text-[#64748b]";
const footerNavList = "m-0 flex list-none flex-col gap-3 p-0";
const footerNavLink =
  "text-sm leading-normal text-white transition-colors hover:text-emerald-400";

function FooterNavColumn({
  gridClassName,
  title,
  links,
}: {
  gridClassName: string;
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div className={`flex min-w-0 flex-col gap-4 ${gridClassName}`}>
      <h4 className={footerNavHeading}>{title}</h4>
      <ul className={footerNavList}>
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={footerNavLink}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterNewsletterSignup({ embedded = false }: { embedded?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setStatus("err");
        setMessage(data.error || "Something went wrong.");
        return;
      }
      setStatus("ok");
      setMessage("Thanks — you're subscribed.");
      setEmail("");
    } catch {
      setStatus("err");
      setMessage("Network error. Try again.");
    }
  }

  return (
    <div
      className={`w-full rounded-xl border border-white/12 bg-gradient-to-b from-white/[0.07] to-white/[0.02] shadow-[0_12px_40px_-20px_rgba(0,0,0,0.5)] ring-1 ring-white/5 ${embedded ? "p-4 sm:p-5" : "max-w-2xl p-5 sm:p-6"}`}
    >
      <div
        className={`flex flex-col gap-4 ${embedded ? "lg:flex-row lg:items-center lg:justify-between lg:gap-5" : "md:flex-row md:items-center md:justify-between md:gap-8"}`}
      >
        <div className={`min-w-0 shrink ${embedded ? "lg:max-w-[11rem] xl:max-w-xs" : "md:max-w-sm"}`}>
          <p className="text-sm font-bold tracking-tight text-white">Newsletter</p>
          <p className="mt-1 text-sm leading-relaxed text-[#94a3b8]">
            Mortgage tips and rate news in your inbox.
          </p>
        </div>
        <form
          onSubmit={onSubmit}
          className={`flex w-full flex-col gap-2 sm:flex-row sm:items-center ${embedded ? "lg:min-w-0 lg:flex-1 lg:max-w-none" : "md:w-auto md:min-w-[280px] md:flex-1 md:max-w-md"}`}
        >
          <label htmlFor="footer-newsletter-email" className="sr-only">
            Email for newsletter
          </label>
          <input
            id="footer-newsletter-email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            className="min-h-11 w-full flex-1 rounded-lg border border-white/15 bg-[#0f2135] px-3 py-2.5 text-sm text-white placeholder:text-[#64748b] focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/40"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="min-h-11 shrink-0 rounded-lg bg-emerald-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-emerald-500 disabled:opacity-60 sm:px-6"
          >
            {status === "loading" ? "…" : "Subscribe"}
          </button>
        </form>
      </div>
      {message && (
        <p
          className={`mt-3 text-center text-sm ${embedded ? "lg:text-left" : "md:text-left"} ${status === "ok" ? "text-emerald-400" : "text-red-400"}`}
          role="status"
        >
          {message}
        </p>
      )}
    </div>
  );
}

function GetInTouchWidget({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof MapPin;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-[5.5rem] flex-col rounded-lg border border-white/12 bg-white/[0.04] p-3 ring-1 ring-white/5">
      <div className="mb-2 flex min-w-0 items-start gap-2">
        <span
          className="flex size-8 shrink-0 items-center justify-center rounded-md border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
          aria-hidden
        >
          <Icon className="size-4" strokeWidth={2} />
        </span>
        <span className="min-w-0 text-[11px] font-semibold uppercase leading-tight tracking-wider text-[#94a3b8]">
          {title}
        </span>
      </div>
      <div className="min-w-0 flex-1 text-xs leading-relaxed text-[#cbd5e1]">{children}</div>
    </div>
  );
}

export function Footer() {
  const content = useSiteContentSection("footer");
  const contact = useSiteContentSection("contact");
  const year = new Date().getFullYear();

  const envWa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
  const waDigits = digitsOnly(envWa || content.whatsappNumber || DEFAULT_WHATSAPP_DIGITS);
  const displayPhone = formatAeMobileDisplay(waDigits);
  const waHref = `https://wa.me/${waDigits}?text=${WHATSAPP_FOOTER_TEXT}`;
  const supportEmail = contact.supportEmail?.trim() || "info@creditlink.ae";
  const addressLine1 = contact.officeAddressLine1?.trim() || "Office 1713, Grosvenor Business Tower, Barsha Heights,";
  const addressLine2 = contact.officeAddressLine2?.trim() || "Dubai, UAE";

  return (
    <footer className="border-t border-white/10 bg-[#0b192e] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6 lg:grid-rows-[auto_auto] lg:items-start lg:gap-x-6 lg:gap-y-6 xl:gap-x-8 xl:gap-y-6">
          {/* Brand — same vertical rhythm as nav columns (gap-4 between logo block and copy) */}
          <div className="flex min-w-0 flex-col gap-4 sm:col-span-2 lg:col-span-1 lg:col-start-1 lg:row-start-1 lg:max-w-xs">
            <Link
              href="/"
              className="inline-flex -translate-x-3 -translate-y-1.5 shrink-0 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b192e]"
            >
              <Image
                src={CREDIT_LINK_LOGO_URL}
                alt={`${content.brandName} — home`}
                width={200}
                height={64}
                className="h-9 w-auto max-w-[200px] object-contain object-left brightness-0 invert md:h-10"
              />
            </Link>
            <p className="m-0 text-sm leading-relaxed text-[#94a3b8]">{content.brandDescription}</p>
          </div>

          <FooterNavColumn
            gridClassName="lg:col-start-2 lg:row-start-1"
            title="Finance"
            links={financeLinks}
          />
          <FooterNavColumn
            gridClassName="lg:col-start-3 lg:row-start-1"
            title="Company"
            links={companyLinks}
          />
          <FooterNavColumn
            gridClassName="lg:col-start-4 lg:row-start-1"
            title="Tools"
            links={toolsLinks}
          />

          {/* Get in Touch — spans rows 1–2 on the right */}
          <div className="min-w-0 sm:col-span-1 lg:col-span-2 lg:col-start-5 lg:row-start-1 lg:row-span-2 lg:self-stretch">
            <div className="flex h-full w-full flex-col rounded-xl border border-white/12 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-4 shadow-[0_8px_28px_-16px_rgba(0,0,0,0.5)] ring-1 ring-white/5">
              <h4 className="mb-3 border-b border-white/10 pb-2 text-sm font-bold tracking-tight text-white">
                Get in Touch
              </h4>
              <div className="grid min-h-0 flex-1 grid-cols-2 gap-3">
                <GetInTouchWidget icon={MapPin} title="Address">
                  <p>
                    {addressLine1}
                    <br />
                    {addressLine2}
                  </p>
                </GetInTouchWidget>
                <GetInTouchWidget icon={Mail} title="Email">
                  <a
                    href={`mailto:${supportEmail}`}
                    className="break-words text-[#e2e8f0] transition-colors hover:text-emerald-400"
                  >
                    {supportEmail}
                  </a>
                </GetInTouchWidget>
                <GetInTouchWidget icon={Phone} title="Phone">
                  <a
                    href={`tel:+${waDigits}`}
                    className="text-[#e2e8f0] transition-colors hover:text-emerald-400"
                  >
                    {displayPhone}
                  </a>
                </GetInTouchWidget>
                <GetInTouchWidget icon={MessageCircle} title="WhatsApp">
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-col gap-0.5"
                  >
                    <span className="font-semibold text-emerald-400 transition-colors hover:text-emerald-300">
                      WhatsApp
                    </span>
                    <span className="text-[#94a3b8]">{displayPhone}</span>
                  </a>
                </GetInTouchWidget>
              </div>
            </div>
          </div>

          {/* Newsletter — row 2 under link columns, left of Get in Touch (lg only); sm: full width under Tools+GIT */}
          <div className="min-w-0 sm:col-span-2 lg:col-span-4 lg:col-start-1 lg:row-start-2">
            <FooterNewsletterSignup embedded />
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-8 lg:mt-12">
          <p className="max-w-2xl text-xs leading-relaxed text-[#94a3b8] md:text-sm">
            © {year} {content.brandName}. All rights reserved. Regulated by the UAE Central Bank.
          </p>
        </div>
      </div>
    </footer>
  );
}
