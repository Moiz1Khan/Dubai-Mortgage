"use client";

import { useEffect, useRef, useState } from "react";

interface LanyardProps {
  note?: string;
}

export function Lanyard({ note }: LanyardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const lanyardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Find the parent section element
    const parentSection = lanyardRef.current?.closest("section");
    if (!parentSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.1,
        rootMargin: "-5% 0px -5% 0px",
      }
    );

    observer.observe(parentSection);

    return () => {
      observer.unobserve(parentSection);
    };
  }, []);

  return (
    <div
      ref={lanyardRef}
      className={`hidden lg:block absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
      }`}
    >
      <div className="relative">
        {/* Lanyard cord */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-1 h-16 bg-gradient-to-b from-[#28303a] via-[#28303a] to-[#4a5568] rounded-full" />
        
        {/* Lanyard card */}
        <div className="relative w-48 bg-white rounded-lg shadow-xl border-2 border-[#28303a] p-4 transform hover:scale-105 transition-transform duration-300">
          {/* Card hole at top */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-2 bg-[#28303a] rounded-full" />
          
          {/* Note content */}
          <div className="mt-2">
            {note ? (
              <p className="text-sm text-[#28303a] font-medium text-center leading-tight">
                {note}
              </p>
            ) : (
              <div className="space-y-1.5">
                <div className="h-2 bg-gray-200 rounded w-3/4 mx-auto" />
                <div className="h-2 bg-gray-200 rounded w-full" />
                <div className="h-2 bg-gray-200 rounded w-5/6 mx-auto" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
