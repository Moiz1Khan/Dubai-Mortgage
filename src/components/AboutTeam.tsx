"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { images } from "@/lib/media";

// Create 16 team members
const teamMembers = Array.from({ length: 16 }, (_, i) => ({
  name: "",
  designation: "",
  image: images.team[i],
}));

export function AboutTeam() {
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!carouselRef.current) return;

    const carousel = carouselRef.current;
    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.8; // pixels per frame

    const animate = () => {
      if (!isPaused && carousel) {
        scrollPosition += scrollSpeed;
        // Get the width of one set of cards (half the total width)
        const maxScroll = carousel.scrollWidth / 2;
        if (scrollPosition >= maxScroll) {
          scrollPosition = 0;
        }
        carousel.scrollLeft = scrollPosition;
      }
      animationId = requestAnimationFrame(animate);
    };

    // Start animation
    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPaused]);

  return (
    <section className="py-10 md:py-14 bg-transparent overflow-hidden" data-reveal>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
          These People Will Handle Your Mortgage
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-12">
          (Not a Bot)
        </p>

        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className="relative overflow-x-hidden"
          style={{ scrollBehavior: "auto" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex gap-6 md:gap-8" style={{ width: "max-content" }}>
            {/* First set of cards */}
            {teamMembers.map((member, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 w-[280px] md:w-[320px] group"
              >
                <div className="relative bg-card border border-border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-primary/5 to-transparent">
                    <Image
                      src={member.image}
                      alt={member.name || `Team Member ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="320px"
                    />
                  </div>

                  {/* Info Section */}
                  <div className="p-5 md:p-6 bg-card">
                    <h3 className="text-lg font-semibold text-foreground mb-1 text-center">
                      {member.name || "Name"}
                    </h3>
                    <p className="text-sm text-muted-foreground text-center">
                      {member.designation || "Designation"}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Duplicate set for seamless loop */}
            {teamMembers.map((member, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 w-[280px] md:w-[320px] group"
              >
                <div className="relative bg-card border border-border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-primary/5 to-transparent">
                    <Image
                      src={member.image}
                      alt={member.name || `Team Member ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="320px"
                    />
                  </div>

                  {/* Info Section */}
                  <div className="p-5 md:p-6 bg-card">
                    <h3 className="text-lg font-semibold text-foreground mb-1 text-center">
                      {member.name || "Name"}
                    </h3>
                    <p className="text-sm text-muted-foreground text-center">
                      {member.designation || "Designation"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
