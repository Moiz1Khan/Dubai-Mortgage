"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useSiteContentSection } from "@/lib/useSiteContent";

const HERO_VIDEO = "https://res.cloudinary.com/dxfejax3u/video/upload/v1770901680/hero-background_asu17w.mp4";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const content = useSiteContentSection("home");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {
      // autoplay blocked — silently fail, video stays paused
    });
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-start justify-center pl-2 md:pl-4 lg:pl-6 pr-4 pt-36 md:pt-40 pb-16 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover scale-110"
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#1a3a4a]/80" />
        <div className="absolute inset-0 grid-overlay opacity-60" aria-hidden />
      </div>

      <div className="relative z-10 max-w-4xl text-left" data-animate="hero">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
          {content.heroTitle}
        </h1>
        <motion.p
          className="mt-5 text-xl md:text-2xl font-semibold text-white"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {content.heroSubtitle}
        </motion.p>
        <motion.p
          className="mt-6 text-base md:text-lg text-gray-200 max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {content.heroDescription}
          <br />
          <span className="text-white font-medium">Free Consultation. No Credit Check.</span>
        </motion.p>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Button asChild size="lg" className="text-base px-10">
            <a href="#calculator">Get Pre-Approved</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
