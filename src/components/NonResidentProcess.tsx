"use client";

import Image from "next/image";
import { images } from "@/lib/media";

const phases = [
    {
        id: 1,
        title: "Pre-Approval (100% Remote)",
        image: images.nonResidentProcess[0],
        items: [
            "Video consultation (your timezone)",
            "International income verification",
            "Calculate your Dubai borrowing capacity",
            "Get pre-approval letter",
            "Start property hunting with confidence",
        ],
    },
    {
        id: 2,
        title: "Property Selection (Mostly Remote)",
        image: images.nonResidentProcess[1],
        items: [
            "Agent sends property videos",
            "Virtual tours",
            "We vet properties for financing",
            "You make offer remotely",
            "Initial deposit + agreement",
        ],
    },
    {
        id: 3,
        title: "Mortgage Processing (100% Remote)",
        image: images.nonResidentProcess[2],
        items: [
            "Final application submission",
            "Bank review and approval",
            "Property valuation coordinated",
            "Updates via WhatsApp/email",
            "Everything handled while you're home",
        ],
    },
    {
        id: 4,
        title: "Your UAE Visit (2-3 Days Only)",
        image: images.nonResidentProcess[3],
        items: [
            "Fly to Dubai",
            "Day 1: Sign mortgage documents",
            "Day 2: Property handover + keys",
            "Day 3: Setup utilities (optional)",
            "Fly home",
        ],
    },
];

export function NonResidentProcess() {
    return (
        <section id="process" className="py-10 md:py-14 bg-transparent" data-reveal>
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
                    HOW IT WORKS
                </h2>
                <p className="text-lg text-muted-foreground text-center mb-10">
                    From Anywhere to Dubai Property Owner
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                    {phases.map((phase) => (
                        <div
                            key={phase.id}
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
                                <h3 className="font-bold text-xl text-foreground mb-4">
                                    {phase.title}
                                </h3>
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
