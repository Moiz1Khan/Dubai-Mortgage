"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const BANK_LOGOS = [
  "https://res.cloudinary.com/dxfejax3u/image/upload/v1773153538/01_jccd0h.png",
  "https://res.cloudinary.com/dxfejax3u/image/upload/v1773153538/03_xlgkvl.png",
  "https://res.cloudinary.com/dxfejax3u/image/upload/v1773153538/02_yol5uq.png",
  "https://res.cloudinary.com/dxfejax3u/image/upload/v1773153539/07_rjgvhp.png",
  "https://res.cloudinary.com/dxfejax3u/image/upload/v1773153539/05_ahldhn.png",
  "https://res.cloudinary.com/dxfejax3u/image/upload/v1773153539/06_hb8kln.png",
  "https://res.cloudinary.com/dxfejax3u/image/upload/v1773153539/04_cjguv5.png",
  "https://res.cloudinary.com/dxfejax3u/image/upload/v1773153539/11_ebpswk.png",
  "https://res.cloudinary.com/dxfejax3u/image/upload/v1773153539/08_kimpjs.png",
  "https://res.cloudinary.com/dxfejax3u/image/upload/v1773153540/10_fjic6h.png",
  "https://res.cloudinary.com/dxfejax3u/image/upload/v1773153539/13_e9ewea.png",
  "https://res.cloudinary.com/dxfejax3u/image/upload/v1773153540/14_vtwgx2.png",
  "https://res.cloudinary.com/dxfejax3u/image/upload/v1773153539/12_jxrdgj.png",
  "https://res.cloudinary.com/dxfejax3u/image/upload/v1773153580/15_fpvjm1.png",
  "https://res.cloudinary.com/dxfejax3u/image/upload/v1773153539/09_gmiaj8.png",
];

export function TrustBar() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const scrollPositionRef = useRef(0);
  const speedRef = useRef(0.5); // Pixels per frame

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollWidth = container.scrollWidth / 2; // Since we duplicate logos, we only need to scroll half the width

    const animate = () => {
      scrollPositionRef.current += speedRef.current;

      // Reset position seamlessly when we've scrolled one set of logos
      if (scrollPositionRef.current >= scrollWidth) {
        scrollPositionRef.current = scrollPositionRef.current - scrollWidth;
      }

      container.style.transform = `translateX(-${scrollPositionRef.current}px)`;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <section className="py-8 md:py-10 border-b border-border/50 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h3 className="text-center text-lg md:text-xl font-semibold text-foreground mb-6">
          We work with the best banks in the United Arab Emirates.
        </h3>
        
        <div className="relative overflow-hidden">
          <div
            ref={scrollContainerRef}
            className="flex will-change-transform"
            style={{ width: "max-content" }}
          >
            {/* First set of logos */}
            {BANK_LOGOS.map((logo, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 mx-4 md:mx-6 h-16 md:h-20 w-32 md:w-40 relative"
              >
                <Image
                  src={logo}
                  alt={`Bank logo ${index + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 128px, 160px"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {BANK_LOGOS.map((logo, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 mx-4 md:mx-6 h-16 md:h-20 w-32 md:w-40 relative"
              >
                <Image
                  src={logo}
                  alt={`Bank logo ${index + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 128px, 160px"
                />
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-muted-foreground text-sm md:text-base max-w-2xl mx-auto mt-6">
          We compare rates from 15+ UAE lenders to get you the best deal.
        </p>
      </div>
    </section>
  );
}
