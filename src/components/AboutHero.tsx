"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { images } from "@/lib/media";

export function AboutHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src={images.aboutHeroBg}
          alt="About Credit Link"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-background/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-24 relative z-10 w-full">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
          >
            We're the Mortgage Brokers Who{" "}
            <span className="text-primary">Answer Your Phones</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-3 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 backdrop-blur-md p-6 md:p-8 rounded-2xl border-2 border-primary/30"
          >
            <p className="text-lg md:text-xl text-foreground leading-relaxed font-semibold">
              No offshore call centers. No AI chatbots. No "someone will get back to you."
            </p>
            <p className="text-lg md:text-xl text-foreground leading-relaxed font-semibold">
              Just real people in Dubai who actually know your name and return your calls in 2 hours.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
