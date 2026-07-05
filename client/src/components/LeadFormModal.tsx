import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useLeadFormModal } from "@/contexts/LeadFormModalContext";
import LeadForm from "@/components/LeadForm";

export function LeadFormModal() {
  const { isOpen, selectedCategory, closeLeadForm } = useLeadFormModal();
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    if (isOpen) {
      // Bei jedem Oeffnen hochzaehlen, um sauberes Remounting zu erzwingen
      // (verhindert alte Validierungsfehler-Reste im Formular).
      setRenderKey((k) => k + 1);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeLeadForm()}>
      <DialogContent
        className="p-0 border-none bg-transparent shadow-none max-w-full sm:max-w-3xl h-[100dvh] max-h-[100dvh] sm:h-auto sm:max-h-[90vh] overflow-y-auto"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">Fahrzeug-Anfrage</DialogTitle>
        <LeadForm key={renderKey} prefilledVehicle={selectedCategory} />
      </DialogContent>
    </Dialog>
  );
}
