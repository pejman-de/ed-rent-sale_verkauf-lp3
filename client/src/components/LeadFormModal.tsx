import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useLeadFormModal } from "@/contexts/LeadFormModalContext";
import LeadForm from "@/components/LeadForm";

export function LeadFormModal() {
  const { isOpen, selectedCategory, closeLeadForm } = useLeadFormModal();
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setRenderKey((k) => k + 1);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeLeadForm()}>
      <DialogContent
        className="p-0 border-none bg-transparent shadow-none gap-0 rounded-none block
          top-0 left-0 translate-x-0 translate-y-0 h-[100dvh] max-h-[100dvh] w-full max-w-full overflow-visible
          sm:top-[50%] sm:left-[50%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:h-auto sm:max-h-[90vh] sm:w-full sm:max-w-3xl sm:rounded-2xl"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">Fahrzeug-Anfrage</DialogTitle>

        <button
          onClick={closeLeadForm}
          aria-label="Schließen"
          className="fixed top-4 right-4 sm:top-auto sm:right-auto sm:absolute sm:-top-4 sm:-right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-navy shadow-lg border border-brand-grey/15 hover:bg-brand-light transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="max-h-[100dvh] sm:max-h-[90vh] w-full overflow-y-auto overscroll-contain sm:rounded-2xl">
          <LeadForm key={renderKey} prefilledVehicle={selectedCategory} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
