import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { ComparisonSection } from "@/components/ComparisonSection";
import { ClientMortgageCalculator, ClientProcess, ClientFAQ, ClientCTAAndLeadSection } from "@/components/ClientOnlySections";
import { WhoWeHelp } from "@/components/WhoWeHelp";
import { StatsBar } from "@/components/StatsBar";
import { RatesTable } from "@/components/RatesTable";
import { OurPromises } from "@/components/OurPromises";
import { EligibilityChecklist } from "@/components/EligibilityChecklist";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { LazySection } from "@/components/LazySection";

const CaseStudies = dynamic(() => import("@/components/CaseStudies").then((m) => ({ default: m.CaseStudies })), { ssr: true });
const Testimonials = dynamic(() => import("@/components/Testimonials").then((m) => ({ default: m.Testimonials })), { ssr: true });

const BlogSection = dynamic(() => import("@/components/BlogSection").then((m) => ({ default: m.BlogSection })), {
  ssr: true,
  loading: () => <section className="py-10 md:py-14 bg-transparent min-h-[400px]" />,
});

const ScrollAnimations = dynamic(() => import("@/components/ScrollAnimations").then((m) => ({ default: m.ScrollAnimations })));

export default function Home() {
  return (
    <>
      <ScrollAnimations />
      <ScrollProgress />
      <Header />
        <main>
          <Hero />
          <div className="theme-gradient">
          <LazySection minHeightClassName="min-h-[200px]"><TrustBar /></LazySection>
          <LazySection minHeightClassName="min-h-[360px]"><ComparisonSection /></LazySection>
          <LazySection minHeightClassName="min-h-[360px]" anchorId="process"><ClientProcess /></LazySection>
          <LazySection minHeightClassName="min-h-[460px]" anchorId="calculator"><ClientMortgageCalculator /></LazySection>
          <LazySection minHeightClassName="min-h-[320px]"><WhoWeHelp /></LazySection>
          <LazySection minHeightClassName="min-h-[360px]"><CaseStudies /></LazySection>
          <LazySection minHeightClassName="min-h-[260px]"><StatsBar /></LazySection>
          <LazySection minHeightClassName="min-h-[360px]" anchorId="rates"><RatesTable /></LazySection>
          <LazySection minHeightClassName="min-h-[320px]"><OurPromises /></LazySection>
          <LazySection minHeightClassName="min-h-[320px]"><EligibilityChecklist /></LazySection>
          <LazySection minHeightClassName="min-h-[320px]"><Testimonials /></LazySection>
          <LazySection minHeightClassName="min-h-[420px]" anchorId="faq"><ClientFAQ /></LazySection>
          <LazySection minHeightClassName="min-h-[420px]"><BlogSection /></LazySection>
          <LazySection minHeightClassName="min-h-[500px]" anchorId="contact"><ClientCTAAndLeadSection /></LazySection>
          <LazySection minHeightClassName="min-h-[240px]"><Footer /></LazySection>
          </div>
        </main>
    </>
  );
}
