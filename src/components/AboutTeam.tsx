"use client";

import Image from "next/image";
import { images } from "@/lib/media";

const teamMembers = [
  { name: "", designation: "", image: images.team[0] },
  { name: "", designation: "", image: images.team[1] },
  { name: "", designation: "", image: images.team[2] },
  { name: "", designation: "", image: images.team[0] },
  { name: "", designation: "", image: images.team[1] },
  { name: "", designation: "", image: images.team[2] },
  { name: "", designation: "", image: images.team[0] },
  { name: "", designation: "", image: images.team[1] },
  { name: "", designation: "", image: images.team[2] },
  { name: "", designation: "", image: images.team[0] },
  { name: "", designation: "", image: images.team[1] },
  { name: "", designation: "", image: images.team[2] },
];

export function AboutTeam() {
  return (
    <section className="py-10 md:py-14 bg-transparent" data-reveal>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
          These People Will Handle Your Mortgage
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-12">
          (Not a Bot)
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative bg-card border-2 border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
                <Image
                  src={member.image}
                  alt={member.name || `Team Member ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                />
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Info Section */}
              <div className="p-5 md:p-6 bg-card">
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-1 text-center">
                  {member.name || "Name"}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground text-center">
                  {member.designation || "Designation"}
                </p>
              </div>

              {/* Decorative accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
