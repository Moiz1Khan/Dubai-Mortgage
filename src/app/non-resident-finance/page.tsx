"use client";

import Image from "next/image";
import { Globe, TrendingUp, FileText, BadgePercent, Plane } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { NonResidentProcess } from "@/components/NonResidentProcess";
import { NonResidentCaseStudies } from "@/components/NonResidentCaseStudies";
import { NonResidentRatesTable } from "@/components/NonResidentRatesTable";
import { NonResidentFAQ } from "@/components/NonResidentFAQ";
import { ContactForm } from "@/components/ContactForm";
import { ChecklistGetStartedCard } from "@/components/ChecklistGetStartedCard";
import { images } from "@/lib/media";

const countries = [
    { name: "United Kingdom", flag: "🇬🇧" },
    { name: "Australia", flag: "🇦🇺" },
    { name: "United States", flag: "🇺🇸" },
    { name: "China", flag: "🇨🇳" },
    { name: "Pakistan", flag: "🇵🇰" },
    { name: "GCC Countries", flag: "🇦🇪" },
    { name: "Canada", flag: "🇨🇦" },
    { name: "India", flag: "🇮🇳" },
    { name: "EU Countries", flag: "🇪🇺" },
    { name: "Russia", flag: "🇷🇺" },
    { name: "Saudi Arabia", flag: "🇸🇦" },
];

export default function NonResidentFinancePage() {
    return (
        <PageLayout>

            {/* ── Hero ────────────────────────────────────────────────────────── */}
            <section className="relative min-h-[85vh] flex items-center overflow-hidden -mt-24 isolate">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://res.cloudinary.com/dxfejax3u/image/upload/v1773171976/WhatsApp_Image_2026-03-09_at_12.35.15_PM_aosemk.jpg"
                        alt="Dubai Property"
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                    />
                </div>

                <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-24 relative z-20 w-full">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                            3,847 People Bought Dubai Property While Living Abroad.
                            <span className="text-primary block mt-2">You Could Be!</span>
                        </h1>

                        <div className="mb-8 space-y-3">
                            <p className="text-xl md:text-2xl font-semibold text-foreground">
                                Buy UAE Property from Anywhere in the World
                            </p>
                            <p className="text-base md:text-lg text-muted-foreground">
                                We Handle Everything Remotely
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button asChild size="lg" className="text-lg px-8 py-6">
                                <a href="#contact">Get Started</a>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                                <a href="#process">See How It Works</a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <NonResidentProcess />

            {/* ── Eligibility Table ───────────────────────────────────────────── */}
            <section className="py-20 md:py-28 bg-secondary/30" data-reveal>
                <div className="max-w-5xl mx-auto px-4 md:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                        Exactly What You Need to Qualify
                    </h2>

                    <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
                        <table className="w-full text-sm md:text-base">
                            <thead className="bg-secondary">
                                <tr>
                                    <th className="text-left p-4 md:p-5 font-bold">Requirement</th>
                                    <th className="text-left p-4 md:p-5 font-bold">Minimum</th>
                                    <th className="text-left p-4 md:p-5 font-bold text-primary">Ideal</th>
                                </tr>
                            </thead>
                            <tbody className="bg-card">
                                {[
                                    { req: "Monthly Income", min: "USD 5,000 equivalent", ideal: "USD 8,000+" },
                                    { req: "Down Payment", min: "40% of property value", ideal: "50% (better terms)" },
                                    { req: "Age", min: "21 years minimum", ideal: "25-55 (prime)" },
                                    { req: "Max Age at Maturity", min: "65 years", ideal: "Under 60 preferred" },
                                    { req: "Credit History", min: "No major defaults", ideal: "Clean record" },
                                    { req: "Employment", min: "6 months minimum", ideal: "2+ years stable" },
                                ].map((row) => (
                                    <tr key={row.req} className="border-t border-border/50 hover:bg-secondary/20 transition-colors">
                                        <td className="p-4 md:p-5 font-semibold text-foreground">{row.req}</td>
                                        <td className="p-4 md:p-5 text-muted-foreground">{row.min}</td>
                                        <td className="p-4 md:p-5 font-medium text-primary">{row.ideal}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ── Documentation Checklist ─────────────────────────────────────── */}
            <section className="py-20 md:py-28 bg-primary text-primary-foreground relative overflow-hidden" data-reveal>
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />
                <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                    <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-start">
                        <div className="max-w-3xl">
                            <h2 className="text-3xl md:text-4xl font-bold mb-10">Documentation Checklist</h2>

                            <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                                <div>
                                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        Personal Documents
                                    </h3>
                                    <ul className="space-y-2 text-white/80 text-sm">
                                        <li>• Valid passport (6+ months validity)</li>
                                        <li>• Home country ID or driver&apos;s license</li>
                                        <li>• Proof of address (utility bill showing overseas address)</li>
                                        <li>• Recent passport photos</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        Income Documents
                                    </h3>
                                    <ul className="space-y-2 text-white/80 text-sm">
                                        <li>• Last 6 months bank statements (showing salary)</li>
                                        <li>• Last 3 months salary slips OR</li>
                                        <li>• Employment letter (company letterhead)</li>
                                        <li>• For business owners: Registration + 2 years financials</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        Financial Documents
                                    </h3>
                                    <ul className="space-y-2 text-white/80 text-sm">
                                        <li>• Source of down payment proof</li>
                                        <li>• Last 2 years tax returns (some banks)</li>
                                        <li>• Assets and liabilities statement</li>
                                        <li>• Credit report from home country (if available)</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        Property Documents
                                    </h3>
                                    <ul className="space-y-2 text-white/80 text-sm">
                                        <li>• Title deed or sale agreement</li>
                                        <li>• Property valuation (we arrange)</li>
                                        <li>• NOC from developer (if off-plan)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <ChecklistGetStartedCard variant="non-resident" className="lg:mt-10" />
                    </div>
                </div>
            </section>

            {/* ── What Makes It Different ─────────────────────────────────────── */}
            <section className="py-20 md:py-28 bg-transparent" data-reveal>
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                        WHAT MAKES NON-RESIDENT DIFFERENT
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: TrendingUp,
                                title: "LOWER LTV",
                                color: "text-blue-500",
                                content: (
                                    <>
                                        <p className="font-bold text-lg mb-1">Non-Residents: 50-60%</p>
                                        <p className="text-muted-foreground text-sm border-t border-border pt-2 mt-2">
                                            Residents get 75-80%. You need AED 800K-1M down on AED 2M property.
                                        </p>
                                    </>
                                ),
                            },
                            {
                                icon: BadgePercent,
                                title: "HIGHER RATES",
                                color: "text-orange-500",
                                content: (
                                    <>
                                        <p className="font-bold text-lg mb-1">4.75% - 6.25%</p>
                                        <p className="text-muted-foreground text-sm border-t border-border pt-2 mt-2">
                                            Banks see more risk (legal jurisdiction, currency). Residents pay 4.25% - 5.49%.
                                        </p>
                                    </>
                                ),
                            },
                            {
                                icon: FileText,
                                title: "DIFFERENT DOCS",
                                color: "text-purple-500",
                                content: (
                                    <>
                                        <p className="font-bold text-lg mb-1">Overseas Proof</p>
                                        <p className="text-muted-foreground text-sm border-t border-border pt-2 mt-2">
                                            Must provide home country employment/bank docs. Challenge is formatting & translation.
                                        </p>
                                    </>
                                ),
                            },
                            {
                                icon: Plane,
                                title: "MOSTLY REMOTE",
                                color: "text-green-500",
                                content: (
                                    <>
                                        <p className="font-bold text-lg mb-1">90% Remote</p>
                                        <p className="text-muted-foreground text-sm border-t border-border pt-2 mt-2">
                                            Only one 2-3 day visit required for final signing and key collection.
                                        </p>
                                    </>
                                ),
                            },
                        ].map((card) => (
                            <div key={card.title} className="p-6 rounded-2xl bg-card border border-border border-gradient-wrap hover:shadow-lg transition-all duration-300 group">
                                <div className={`w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 ${card.color} group-hover:scale-110 transition-transform`}>
                                    <card.icon className="size-6" />
                                </div>
                                <h3 className="font-bold text-xl mb-4">{card.title}</h3>
                                {card.content}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Countries We Finance ────────────────────────────────────────── */}
            <section className="relative py-20 md:py-28 overflow-hidden text-center" data-reveal>
                <div className="absolute inset-0 z-0">
                    <Image
                        src={images.nonResidentCountriesBg}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-background/0" />
                </div>
                <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">COUNTRIES WE FINANCE</h2>
                    <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10">
                        {countries.map((c) => (
                            <div key={c.name} className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border shadow-sm hover:scale-105 transition-transform cursor-default">
                                <span className="text-xl">{c.flag}</span>
                                <span className="font-medium text-sm md:text-base">{c.name}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                        Also Financed: South Africa, Philippines, Singapore, Hong Kong, Japan, Malaysia, and 11+ more.
                        <br /><br />
                        <span className="font-semibold text-foreground">What matters more than nationality:</span> Income stability, source of funds, credit history, and property type.
                    </p>
                    <Button asChild size="lg" variant="outline" className="gap-2">
                        <a href="#contact">
                            <Globe className="size-4" />
                            Get Personalized Quote for My Country
                        </a>
                    </Button>
                </div>
            </section>

            <NonResidentCaseStudies />
            <NonResidentRatesTable />
            <section id="contact" className="scroll-mt-24">
                <ContactForm />
            </section>

            <NonResidentFAQ />

        </PageLayout>
    );
}
