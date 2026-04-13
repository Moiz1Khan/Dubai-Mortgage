"use client";

import { motion } from "framer-motion";
import { useSiteContentSection } from "@/lib/useSiteContent";

export function ContactHero() {
  const content = useSiteContentSection("contact");
  return (
    <section className="relative min-h-[50vh] flex items-center overflow-hidden pt-32 md:pt-40 pb-16 bg-[#22334d]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {content.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
            {content.heroSubtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
