"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { images } from "@/lib/media";

export function ResidentialHero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={images.caseStudies[0]}
          alt="Dubai Home"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-24 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center justify-items-center lg:justify-items-stretch">
          {/* Left side - over sky area */}
          <div className="max-w-lg lg:mr-auto">
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
            >
              Stop Paying Rent.{" "}
              <span className="block mt-2">Own Your Dubai Home</span>
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-foreground block mt-2"
              >
                with Just 20% Down
              </motion.span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <a href="#calculator">Get Started</a>
              </Button>
            </motion.div>
          </div>

          {/* Right side - over sky area */}
          <div className="max-w-md lg:ml-auto lg:-mt-16">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-3"
            >
              <p className="text-xl md:text-2xl font-semibold text-foreground">
                12,847 Home Loans Approved Since 2015
              </p>
              <p className="text-lg md:text-xl text-foreground">
                2,400 Were Self-Employed.
              </p>
              <p className="text-base md:text-lg text-muted-foreground">
                Self-employment isn't "difficult", it's 40% of our business. We know exactly how to present variable income for bank approval.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
