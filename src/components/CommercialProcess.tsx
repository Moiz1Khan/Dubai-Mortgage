"use client";

import Image from "next/image";

// Commercial process images (Cloudinary) - aligned with phase titles
const processImages = [
    "https://res.cloudinary.com/dxfejax3u/image/upload/v1773163792/1920X1200--Strategy-_-Structure_snu7b2.png",
    "https://res.cloudinary.com/dxfejax3u/image/upload/v1773163791/1920X1200--Documentation_foruhp.png",
    "https://res.cloudinary.com/dxfejax3u/image/upload/v1773163793/1920X1200--Bank-Review_pwkzog.png",
    "https://res.cloudinary.com/dxfejax3u/image/upload/v1773163787/1920X1200--Approval-_-Closing_qok373.png",
];

const phases = [
    {
        week: "Week 1-2",
        title: "Strategy & Structure",
        image: processImages[0],
        items: [
            "30-min business discussion",
            "Financial analysis",
            "Property evaluation",
            "DSCR calculation",
            "Lender recommendations",
        ],
    },
    {
        week: "Week 3-4",
        title: "Documentation",
        image: processImages[1],
        items: [
            "Company documents",
            "Financial statements",
            "Business case preparation",
            "Property research",
            "Executive summary",
        ],
    },
    {
        week: "Week 5-6",
        title: "Bank Review",
        image: processImages[2],
        items: [
            "Submit to select lenders",
            "Property valuation",
            "Underwriting",
            "Additional info requests",
            "Weekly updates",
        ],
    },
    {
        week: "Week 8-12",
        title: "Approval & Closing",
        image: processImages[3],
        items: [
            "Credit committee approval",
            "Legal documentation",
            "Final terms negotiation",
            "Funds disbursement",
            "Property transfer",
        ],
    },
];

export function CommercialProcess() {
    return (
        <section id="process" className="py-10 md:py-14 bg-transparent" data-reveal>
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
                    THE PROCESS (B2B REALITY)
                </h2>
                <p className="text-lg text-muted-foreground text-center mb-10">
                    Application to Funding: 6-8 Weeks
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                    {phases.map((phase) => (
                        <div
                            key={phase.week}
                            className="rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all"
                        >
                            <div className="relative aspect-[16/9] bg-secondary/30">
                                <Image
                                    src={phase.image}
                                    alt={phase.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="font-mono text-sm font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-lg">
                                        {phase.week}
                                    </span>
                                    <h3 className="font-bold text-xl text-foreground">
                                        {phase.title}
                                    </h3>
                                </div>
                                <ul className="space-y-2">
                                    {phase.items.map((item) => (
                                        <li
                                            key={item}
                                            className="flex items-start gap-2 text-sm text-foreground"
                                        >
                                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold mt-0.5">
                                                ✓
                                            </span>
                                            <span className="leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <a
                        href="#contact"
                        className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                        Start Your Application
                    </a>
                </div>
            </div>
        </section>
    );
}
