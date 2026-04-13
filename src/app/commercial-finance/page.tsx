"use client";

import Image from "next/image";
import { Building2, Briefcase, Hammer, TrendingUp, CheckCircle2, XCircle, FileText, Calculator } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { CommercialProcess } from "@/components/CommercialProcess";
import { CommercialCaseStudies } from "@/components/CommercialCaseStudies";
import { CommercialRatesTable } from "@/components/CommercialRatesTable";
import { CommercialFAQ } from "@/components/CommercialFAQ";
import { ContactForm } from "@/components/ContactForm";
import { ChecklistGetStartedCard } from "@/components/ChecklistGetStartedCard";

export default function CommercialFinancePage() {
    return (
        <PageLayout>

            {/* ── Hero — background image ─────────────────────────── */}
            <section className="relative min-h-[85vh] flex items-center overflow-hidden -mt-24 isolate">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://res.cloudinary.com/dxfejax3u/image/upload/v1773169264/WhatsApp_Image_2026-03-09_at_4.25.05_PM_zfr4vo.jpg"
                        alt="Commercial Property"
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                    />
                </div>

                <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-24 relative z-20 w-full">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                            AED 2.1 Billion in UAE Commercial Property Financed
                            <span className="text-primary block mt-2">Your Deal Could Be Next!</span>
                        </h1>

                        <div className="mb-8 space-y-3">
                            <p className="text-xl md:text-2xl font-semibold text-foreground">
                                Been Quoted 50% LTV? We've Secured 65% for Commercial Deals
                            </p>
                            <p className="text-base md:text-lg text-muted-foreground">
                                Commercial lending isn't one-size-fits-all. Strong DSCR and the right property story get you 15% more leverage.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button asChild size="lg" className="text-lg px-8 py-6">
                                <a href="#contact">Get Commercial Quote</a>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                                <a href="#process">See Process</a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Types of Financing ──────────────────────────────────────────── */}
            <section className="py-20 md:py-28 bg-transparent" data-reveal>
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                        What Type of Commercial Financing Do You Need?
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                        {[
                            {
                                icon: Building2,
                                title: "COMMERCIAL PROPERTY PURCHASE",
                                subtitle: "Acquire Your Business Premises with Competitive Financing.",
                                desc: "Own your office, retail space, warehouse, or mixed-use property instead of paying rent indefinitely.",
                            },
                            {
                                icon: Briefcase,
                                title: "BUSINESS ACQUISITION FINANCING",
                                subtitle: "Buy Existing Businesses with Real Estate Assets.",
                                desc: "Acquiring a business that owns property? We finance the entire transaction, not just the real estate.",
                            },
                            {
                                icon: Hammer,
                                title: "DEVELOPMENT FINANCE",
                                subtitle: "Construction Financing for Ground-Up Development.",
                                desc: "Building new or major renovations? We arrange phased financing tied to construction milestones.",
                            },
                            {
                                icon: TrendingUp,
                                title: "INVESTMENT PROPERTY LOANS",
                                subtitle: "Build Your Commercial Real Estate Portfolio.",
                                desc: "Purchase income-generating properties for long-term wealth building and rental income.",
                            },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="group p-8 rounded-2xl bg-card border border-border border-gradient-wrap hover:shadow-lg transition-all duration-300"
                            >
                                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <item.icon className="size-7" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="font-semibold text-primary mb-3">{item.subtitle}</p>
                                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <CommercialProcess />

            {/* ── DSCR Explained ──────────────────────────────────────────────── */}
            <section className="py-20 md:py-28 bg-secondary/30 relative overflow-hidden" data-reveal>
                <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <span className="inline-block font-mono text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-lg mb-4">
                            WHAT BANKS ACTUALLY CHECK
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            DSCR EXPLAINED
                        </h2>
                        <p className="text-xl font-semibold text-foreground mb-2">
                            Debt Service Coverage Ratio: Your Deal Breaker or Maker
                        </p>
                        <p className="text-lg text-muted-foreground">
                            Formula: <span className="font-mono text-primary font-bold">Net Operating Income ÷ Annual Debt Payment</span>
                        </p>
                        <p className="text-lg font-bold mt-2">Banks require: Minimum 1.25x</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Works Example */}
                        <div className="p-8 rounded-2xl bg-card border-2 border-green-500/20 shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 bg-green-500/10 rounded-bl-2xl">
                                <CheckCircle2 className="size-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-green-700 mb-6">Example that WORKS:</h3>
                            <ul className="space-y-3 text-sm md:text-base">
                                <li className="flex justify-between border-b border-border/50 pb-2">
                                    <span className="text-muted-foreground">Property rental income:</span>
                                    <span className="font-mono font-bold">AED 1.2M/year</span>
                                </li>
                                <li className="flex justify-between border-b border-border/50 pb-2">
                                    <span className="text-muted-foreground">Operating expenses:</span>
                                    <span className="font-mono font-bold text-red-400">AED 300K/year</span>
                                </li>
                                <li className="flex justify-between bg-secondary/50 p-2 rounded-lg">
                                    <span className="font-semibold">Net Operating Income:</span>
                                    <span className="font-mono font-bold">AED 900K</span>
                                </li>
                                <li className="pt-2 text-muted-foreground text-sm">
                                    Loan: AED 6M at 5.5% for 15 years<br />
                                    Annual payment: <span className="font-mono font-bold text-foreground">AED 587K</span>
                                </li>
                            </ul>
                            <div className="mt-6 p-4 bg-green-500/10 rounded-xl border border-green-500/20 text-center">
                                <p className="text-sm font-semibold text-green-800 mb-1">DSCR Calculation</p>
                                <p className="text-2xl font-bold text-green-700">
                                    900K ÷ 587K = 1.53x
                                </p>
                                <p className="text-sm font-bold text-green-800 uppercase tracking-widest mt-1">✓ APPROVED</p>
                            </div>
                        </div>

                        {/* Fails Example */}
                        <div className="p-8 rounded-2xl bg-card border-2 border-red-500/20 shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 bg-red-500/10 rounded-bl-2xl">
                                <XCircle className="size-8 text-red-600" />
                            </div>
                            <h3 className="text-xl font-bold text-red-700 mb-6">Example that FAILS:</h3>
                            <ul className="space-y-3 text-sm md:text-base">
                                <li className="flex justify-between border-b border-border/50 pb-2">
                                    <span className="text-muted-foreground">Property rental income:</span>
                                    <span className="font-mono font-bold">AED 800K/year</span>
                                </li>
                                <li className="flex justify-between border-b border-border/50 pb-2">
                                    <span className="text-muted-foreground">Operating expenses:</span>
                                    <span className="font-mono font-bold text-red-400">AED 250K/year</span>
                                </li>
                                <li className="flex justify-between bg-secondary/50 p-2 rounded-lg">
                                    <span className="font-semibold">Net Operating Income:</span>
                                    <span className="font-mono font-bold">AED 550K</span>
                                </li>
                                <li className="pt-2 text-muted-foreground text-sm">
                                    Loan: AED 6M at 5.5% for 15 years<br />
                                    Annual payment: <span className="font-mono font-bold text-foreground">AED 587K</span>
                                </li>
                            </ul>
                            <div className="mt-6 p-4 bg-red-500/10 rounded-xl border border-red-500/20 text-center">
                                <p className="text-sm font-semibold text-red-800 mb-1">DSCR Calculation</p>
                                <p className="text-2xl font-bold text-red-700">
                                    550K ÷ 587K = 0.94x
                                </p>
                                <p className="text-sm font-bold text-red-800 uppercase tracking-widest mt-1">✗ REJECTED</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-lg font-medium mb-6">
                            <span className="font-bold text-primary">Solution:</span> Larger down payment (smaller loan) or higher rent
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="gap-2">
                                <Calculator className="size-4" />
                                Does Your Property Cash Flow Work?
                            </Button>
                            <Button size="lg" variant="outline" className="gap-2">
                                Get Professional DSCR Analysis
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <CommercialCaseStudies />
            
            {/* ── Calculator Section ──────────────────────────────────────────── */}
            <section className="relative py-20 md:py-28 overflow-hidden" data-reveal>
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://res.cloudinary.com/dxfejax3u/image/upload/v1773171130/Gemini_Generated_Image_ihvuw5ihvuw5ihvu_uofvyg.png"
                        alt=""
                        fill
                        className="object-cover"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-background/20" />
                </div>
                <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Does Your Property Cash Flow Work?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Calculate your DSCR and see if your commercial property qualifies for financing
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="gap-2">
                            <Calculator className="size-4" />
                            Calculate DSCR Now
                        </Button>
                        <Button size="lg" variant="outline" className="gap-2">
                            Get Professional DSCR Analysis
                        </Button>
                    </div>
                </div>
            </section>

            <CommercialRatesTable />

            {/* ── Checklist ───────────────────────────────────────────────────── */}
            <section className="py-20 md:py-28 bg-primary text-primary-foreground relative overflow-hidden" data-reveal>
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />
                <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                    <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
                        <div className="max-w-2xl">
                            <h2 className="text-3xl md:text-4xl font-bold mb-8">Commercial Loan Application Checklist</h2>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        <Briefcase className="size-6 text-white/80" />
                                        Company Documents
                                    </h3>
                                    <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-white/80">
                                        <li>• Trade license (2+ years)</li>
                                        <li>• Memorandum of Association</li>
                                        <li>• Shareholder agreements</li>
                                        <li>• Last 2 years audited financials</li>
                                        <li>• Last 6 months bank statements</li>
                                        <li>• Current debt schedule</li>
                                    </ul>
                                </div>

                                <div className="w-full h-px bg-white/20" />

                                <div>
                                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        <Building2 className="size-6 text-white/80" />
                                        Property Documents
                                    </h3>
                                    <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-white/80">
                                        <li>• Title deed or sale agreement</li>
                                        <li>• Property valuation</li>
                                        <li>• Rental contracts (if investment)</li>
                                        <li>• Tenant information</li>
                                        <li>• NOC from developer (if needed)</li>
                                    </ul>
                                </div>

                                <div className="w-full h-px bg-white/20" />

                                <div>
                                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        <FileText className="size-6 text-white/80" />
                                        Personal (Guarantors)
                                    </h3>
                                    <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-white/80">
                                        <li>• Passport + Emirates ID</li>
                                        <li>• Last 6 months personal statements</li>
                                        <li>• Personal assets & liabilities</li>
                                        <li>• Credit bureau consent</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <ChecklistGetStartedCard variant="commercial" />
                    </div>
                </div>
            </section>

            <section id="contact" className="scroll-mt-24">
                <ContactForm />
            </section>

            <CommercialFAQ />

        </PageLayout>
    );
}
