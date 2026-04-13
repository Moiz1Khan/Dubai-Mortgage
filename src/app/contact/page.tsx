import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ContactHero } from "@/components/ContactHero";
import { ContactForm } from "@/components/ContactForm";
import { ContactMap } from "@/components/ContactMap";
import { ContactInfo } from "@/components/ContactInfo";

const ScrollAnimations = dynamic(() => import("@/components/ScrollAnimations").then((m) => ({ default: m.ScrollAnimations })));

export default function ContactPage() {
  return (
    <>
      <ScrollAnimations />
      <ScrollProgress />
      <Header />
      <main>
        <ContactHero />
        <div className="theme-gradient">
          <ContactForm />
          <ContactInfo />
          <ContactMap />
          <Footer />
        </div>
      </main>
    </>
  );
}
