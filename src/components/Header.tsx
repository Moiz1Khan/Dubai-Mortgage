"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { throttle } from "@/lib/utils";

const financeItems = [
  { href: "/residential-finance", label: "Residential Finance" },
  { href: "/commercial-finance", label: "Commercial Finance" },
  { href: "/non-resident-finance", label: "Non-Resident Finance" },
];

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/#calculator", label: "Calculator" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact Us" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileFinance, setMobileFinance] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    const throttled = throttle(onScroll, 100);
    onScroll();
    window.addEventListener("scroll", throttled, { passive: true });
    return () => window.removeEventListener("scroll", throttled);
  }, []);

  const overVideo = !scrolled;
  const navBg = overVideo ? "bg-white/10 backdrop-blur-md border-white/20" : "bg-[#e7edf5]/95 backdrop-blur-md border-gray-200/60 shadow-lg";
  const textClass = overVideo ? "text-white" : "text-foreground";
  const linkHover = overVideo ? "hover:bg-white/10" : "hover:bg-black/5";
  const btnClass = overVideo
    ? "bg-[#28303a] text-white border-transparent shadow-[0_4px_14px_rgba(0,0,0,0.3)] hover:bg-[#323d48] hover:shadow-[0_6px_18px_rgba(0,0,0,0.35)]"
    : "bg-[#28303a] text-white border-transparent shadow-[0_4px_14px_rgba(0,0,0,0.2)] hover:bg-[#323d48] hover:shadow-[0_6px_18px_rgba(0,0,0,0.25)]";

  const dropdownBg = overVideo
    ? "bg-white/10 backdrop-blur-xl border-white/20"
    : "bg-white/95 backdrop-blur-xl border-gray-200/60 shadow-xl";
  const dropdownText = overVideo ? "text-white hover:bg-white/15" : "text-foreground hover:bg-black/5";

  // Hover with small delay so accidental mouse-out doesn't instantly close
  const onMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  };
  const onMouseLeave = () => {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 120);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full px-4 md:px-6 pt-4">
      <nav className={`max-w-6xl mx-auto flex items-center justify-between gap-4 px-4 md:px-6 py-3 rounded-2xl border transition-all duration-300 ${navBg}`}>

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="https://res.cloudinary.com/dxfejax3u/image/upload/v1773153203/Full_Logo_kzokcw.png"
            alt="Credit Link Logo"
            width={120}
            height={40}
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>

        {/* Center Nav */}
        <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">

          {/* Finance dropdown */}
          <div
            className="relative"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <button
              className={`flex items-center gap-1 px-4 py-2 font-medium text-sm rounded-lg transition-colors ${textClass} ${linkHover}`}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              Finance
              <ChevronDown
                className={`size-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown panel */}
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 rounded-xl border overflow-hidden transition-all duration-200 origin-top ${dropdownBg} ${dropdownOpen
                  ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
                }`}
            >
              <div className="py-1.5">
                {financeItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-2.5 text-sm font-medium transition-colors ${dropdownText}`}
                    onClick={() => setDropdownOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Regular links */}
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`flex items-center px-4 py-2 font-medium text-sm rounded-lg transition-colors ${textClass} ${linkHover}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/#calculator" className={`hidden sm:inline-flex px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm hover:bg-white hover:shadow transition-all ${btnClass}`}>
            Get started
          </Link>
          <button className="lg:hidden p-2 -mr-1" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X className={`size-5 ${textClass}`} /> : <Menu className={`size-5 ${textClass}`} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className={`lg:hidden mt-2 mx-0 rounded-2xl px-4 py-4 backdrop-blur-md border transition-all ${overVideo ? "bg-white/10 border-white/20" : "bg-[#e7edf5]/95 border-gray-200/60"}`}>
          <nav className="flex flex-col gap-0.5">

            {/* Finance accordion for mobile */}
            <button
              onClick={() => setMobileFinance(!mobileFinance)}
              className={`flex items-center justify-between px-4 py-3 font-medium rounded-xl w-full text-left ${textClass} ${linkHover}`}
            >
              Finance
              <ChevronDown className={`size-4 transition-transform duration-200 ${mobileFinance ? "rotate-180" : ""}`} />
            </button>
            {mobileFinance && (
              <div className="ml-4 flex flex-col gap-0.5 mb-1">
                {financeItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => { setMobileOpen(false); setMobileFinance(false); }}
                    className={`px-4 py-2.5 text-sm font-medium rounded-xl ${textClass} ${linkHover}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-4 py-3 font-medium rounded-xl ${textClass} ${linkHover}`}
              >
                {link.label}
              </Link>
            ))}

            <div className={`border-t my-2 ${overVideo ? "border-white/20" : "border-gray-300/50"}`} />
            <Link href="/#calculator" onClick={() => setMobileOpen(false)} className="mt-2 px-5 py-3 rounded-full bg-[#28303a] text-white font-semibold text-center shadow-[0_4px_14px_rgba(0,0,0,0.2)] hover:bg-[#323d48]">
              Get started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
