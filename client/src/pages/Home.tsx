import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import InteractiveGallery from "@/components/InteractiveGallery";
import USPSection from "@/components/USPSection";
import ProcessAndMetrics from "@/components/ProcessAndMetrics";
import SalesCTA from "@/components/SalesCTA";
import ProofBlock from "@/components/ProofBlock";
import DealerPath from "@/components/DealerPath";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { useLeadFormModal } from "@/contexts/LeadFormModalContext";
import { DEALER_INQUIRY_SENTINEL } from "@/components/LeadForm";

export default function Home() {
  const { openLeadForm } = useLeadFormModal();

  const scrollToGallery = () => {
    const element = document.getElementById("gallery");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-brand-navy">
      <Header onCtaClick={() => openLeadForm()} />

      <main className="flex-grow">
        <Hero
          onPrimaryClick={() => openLeadForm()}
          onSecondaryClick={scrollToGallery}
        />

        <SocialProof />

        <InteractiveGallery onInquireClick={(vehicleName) => openLeadForm(vehicleName)} />

        <USPSection />

        <ProcessAndMetrics />

        <SalesCTA />

        <ProofBlock />

        <DealerPath onCtaClick={() => openLeadForm(DEALER_INQUIRY_SENTINEL)} />

        <FAQ />
      </main>

      <Footer onScrollToTop={scrollToTop} />
    </div>
  );
}
