"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

const team = [
  {
    name: "Chandan Murthy",
    role: "Senior Mortgage Consultant",
    image: "https://res.cloudinary.com/dxfejax3u/image/upload/v1773154800/Chandan_Murthy_ohcusf.png",
    bio: "8 years in banking. Former senior underwriter at Emirates NBD. Left because he was tired of rejecting good people for bad reasons.",
    win: "Secured AED 8.5M commercial loan for a client rejected by 3 banks",
  },
  {
    name: "Maryam Hany",
    role: "Non-Resident Specialist",
    image: "https://res.cloudinary.com/dxfejax3u/image/upload/v1773154838/Maryam_Hany_db3ft4.png",
    bio: "UK expat who bought a Dubai property in 2019 while living in London. Knows exactly how confusing international buying is. Helped 327+ overseas buyers.",
    win: "London investor bought 3 Dubai properties worth AED 5.5M remotely",
  },
  {
    name: "Jazib Saeed",
    role: "Senior Mortgage Consultant",
    image: "https://res.cloudinary.com/dxfejax3u/image/upload/v1773155352/Screenshot_2026-03-10_200846_p1l7zu.png",
    bio: "10 years in real estate finance. Former bank underwriter. Knows what makes banks say yes before you even apply.",
    win: "Approved client on probation for AED 1.2M in 11 days",
  },
];

export function MeetYourTeam() {
  return (
    <section className="py-10 md:py-14 bg-transparent" data-reveal>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          MEET YOUR TEAM
        </h2>
        <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
          No offshore call centers. No AI chatbots. These humans answer your
          calls.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member) => (
            <div
              key={member.name}
              className="rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 transition-colors"
            >
              <div className="relative aspect-[4/5] bg-secondary/30">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-sm text-primary font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  {member.bio}
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  <span className="font-semibold text-foreground">
                    Recent win:
                  </span>{" "}
                  {member.win}
                </p>
                <Button asChild className="w-full" size="sm">
                  <a href="#contact">Book Call with {member.name.split(" ")[0]}</a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
