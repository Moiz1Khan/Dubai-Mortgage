import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { AboutHero } from "@/components/AboutHero";
import { AboutStatsBar } from "@/components/AboutStatsBar";
import { AboutOriginStory } from "@/components/AboutOriginStory";
import { AboutDifferentiators } from "@/components/AboutDifferentiators";
import { AboutByNumbers } from "@/components/AboutByNumbers";
import { AboutTeam } from "@/components/AboutTeam";
import { AboutHowWeWork } from "@/components/AboutHowWeWork";
import { AboutFAQ } from "@/components/AboutFAQ";
import { ClientCTAAndLeadSection } from "@/components/ClientOnlySections";

const ScrollAnimations = dynamic(() => import("@/components/ScrollAnimations").then((m) => ({ default: m.ScrollAnimations })));

export default function AboutPage() {
  return (
    <>
      <ScrollAnimations />
      <ScrollProgress />
      <Header />
      <main>
        <AboutHero />
        <div className="theme-gradient">
          <AboutStatsBar />
          <AboutOriginStory />
          <AboutDifferentiators />
          <AboutByNumbers />
          <AboutTeam />
          <AboutHowWeWork />
          <AboutFAQ />
          <ClientCTAAndLeadSection />
          <Footer />
        </div>
      </main>
    </>
  );
}
