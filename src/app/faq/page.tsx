import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { FAQHero } from "@/components/FAQHero";
import { GeneralFAQSection } from "@/components/GeneralFAQSection";
import { CommercialFAQSection } from "@/components/CommercialFAQSection";
import { NonResidentFAQSection } from "@/components/NonResidentFAQSection";

export default function FAQPage() {
  return (
    <>
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
