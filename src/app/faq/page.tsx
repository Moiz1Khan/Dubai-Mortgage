import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { FAQHero } from "@/components/FAQHero";
import { GeneralFAQSection } from "@/components/GeneralFAQSection";
import { CommercialFAQSection } from "@/components/CommercialFAQSection";
import { NonResidentFAQSection } from "@/components/NonResidentFAQSection";

const ScrollAnimations = dynamic(() => import("@/components/ScrollAnimations").then((m) => ({ default: m.ScrollAnimations })));

export default function FAQPage() {
  return (
    <>
      <ScrollAnimations />
      <ScrollProgress />
      <Header />
      <main>
        <FAQHero />
        <div className="theme-gradient">
          <GeneralFAQSection />
          <CommercialFAQSection />
          <NonResidentFAQSection />
          <Footer />
        </div>
      </main>
    </>
  );
}
