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
import { useScrollDepth } from "@/hooks/useScrollDepth";
import { useSectionView } from "@/hooks/useSectionView";

export default function Home() {
  const { openLeadForm } = useLeadFormModal();
  useScrollDepth();

  const socialProofRef = useSectionView<HTMLDivElement>("social_proof");
  const uspRef = useSectionView<HTMLDivElement>("usp_section");
  const processRef = useSectionView<HTMLDivElement>("process_metrics");
  const proofRef = useSectionView<HTMLDivElement>("proof_block");
  const faqRef = useSectionView<HTMLDivElement>("faq_section");

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
      <Header onCtaClick={() => openLeadForm(undefined, "header_cta")} />

      <main className="flex-grow">
        <Hero
          onPrimaryClick={() => openLeadForm(undefined, "hero_primary_cta")}
          onSecondaryClick={scrollToGallery}
        />

        <div ref={socialProofRef}>
          <SocialProof />
        </div>

        <InteractiveGallery onInquireClick={(vehicleName) => openLeadForm(vehicleName, "vehicle_tile")} />

        <div ref={uspRef}>
          <USPSection />
        </div>

        <div ref={processRef}>
          <ProcessAndMetrics />
        </div>

        <SalesCTA />

        <div ref={proofRef}>
          <ProofBlock />
        </div>

        <DealerPath onCtaClick={() => openLeadForm(DEALER_INQUIRY_SENTINEL, "dealer_path_cta")} />

        <div ref={faqRef}>
          <FAQ />
        </div>
      </main>

      <Footer onScrollToTop={scrollToTop} />
    </div>
  );
}
