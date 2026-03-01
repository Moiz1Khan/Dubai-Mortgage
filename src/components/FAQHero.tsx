"use client";

import { motion } from "framer-motion";

export function FAQHero() {
  return (
    <section className="relative min-h-[40vh] flex items-center overflow-hidden pt-32 md:pt-40 pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Frequently Asked <span className="text-primary">Questions</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Find answers to common questions about mortgages, financing, and our services.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
