import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLeadFormModal } from "@/contexts/LeadFormModalContext";
import { trackClick } from "@/lib/analytics";
import { useSectionView } from "@/hooks/useSectionView";

export default function SalesCTA() {
  const { openLeadForm } = useLeadFormModal();
  const sectionRef = useSectionView<HTMLElement>("sales_cta_section");

  return (
    <section ref={sectionRef} className="py-20 bg-brand-light/50 border-t border-brand-grey/10">
      <div className="container max-w-xl text-center bg-white rounded-2xl border border-brand-grey/15 shadow-xl p-8 md:p-12">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-cyan">
          Nutzfahrzeug-Verkauf für Geschäftskunden
        </span>
        <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-navy">
          Bereit für Ihr Verkaufsangebot?
        </h3>
        <p className="mt-3 text-brand-grey">
          Fahrzeugtyp wählen, Formular ausfüllen, in 24h ein individuelles Angebot erhalten. Unverbindlich und kostenlos.
        </p>
        <Button
          onClick={() => {
            trackClick("cta_click", {
              element_id: "sales_cta",
              element_text: "Jetzt Angebot anfordern",
              element_location: "sales_cta_section",
            });
            openLeadForm();
          }}
          className="mt-6 bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 font-bold px-6 py-3 shadow-md hover:shadow-brand-cyan/20 hover:shadow-lg transition-all active:scale-95 inline-flex items-center gap-2"
        >
          <span>Jetzt Angebot anfordern</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}
