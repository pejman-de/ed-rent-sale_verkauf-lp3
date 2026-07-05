/**
 * LeadFormModalContext.tsx
 * -----------------------------------------------------------------------
 * Ersetzt die bestehende Datei 1:1 in allen drei LPs
 * (client/src/contexts/LeadFormModalContext.tsx).
 *
 * Neu ggü. dem Original:
 * - trackModalOpen() beim Öffnen
 * - reportStep()  -> wird von LeadForm.tsx bei jedem Schrittwechsel
 *                    aufgerufen, damit der Context immer weiß, wo der
 *                    Nutzer gerade steht
 * - reportCompleted() -> wird von LeadForm.tsx nach erfolgreichem
 *                    form_submit aufgerufen, damit form_abandon beim
 *                    Schließen NICHT feuert
 * - form_abandon feuert automatisch beim Schließen, außer der Flow wurde
 *   zuvor als completed markiert
 * -----------------------------------------------------------------------
 */
import React, { createContext, useCallback, useContext, useRef, useState } from "react";
import { trackModalOpen, trackModalClose, trackFormAbandon } from "@/lib/analytics";

interface LeadFormModalContextType {
  isOpen: boolean;
  selectedCategory?: string;
  openLeadForm: (category?: string, triggerElement?: string) => void;
  closeLeadForm: (closeMethod?: "close_button" | "overlay_click" | "esc_key") => void;
  reportStep: (stepNumber: number) => void;
  reportCompleted: () => void;
}

const LeadFormModalContext = createContext<LeadFormModalContextType | undefined>(undefined);

export function LeadFormModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

  // Refs statt State, weil sie nur beim Schließen gelesen werden und
  // keinen Re-Render auslösen sollen.
  const lastStepRef = useRef<number>(1);
  const completedRef = useRef<boolean>(false);
  // hasClosedRef verhindert doppeltes Tracking: Radix ruft bei Klick auf einen
  // <DialogClose>-Button sowohl dessen eigenes onClick als auch onOpenChange(false)
  // auf. Ohne diese Sperre würde modal_close/form_abandon zweimal feuern.
  const hasClosedRef = useRef<boolean>(false);

  const openLeadForm = useCallback((category?: string, triggerElement: string = "unknown_cta") => {
    setSelectedCategory(category);
    setIsOpen(true);
    lastStepRef.current = 1;
    completedRef.current = false;
    hasClosedRef.current = false;

    // DEALER_INQUIRY_SENTINEL (LP3) lesbar machen statt Rohwert zu loggen
    const readableCategory =
      category === "__dealer_paket_anfrage__" ? "dealer_inquiry" : category;

    trackModalOpen(triggerElement, readableCategory ? { prefilled_category: readableCategory } : undefined);
  }, []);

  const closeLeadForm = useCallback((closeMethod: "close_button" | "overlay_click" | "esc_key" = "close_button") => {
    setIsOpen(false);
    if (hasClosedRef.current) return;
    hasClosedRef.current = true;

    trackModalClose(closeMethod, lastStepRef.current);
    if (!completedRef.current) {
      trackFormAbandon(lastStepRef.current);
    }
  }, []);

  const reportStep = useCallback((stepNumber: number) => {
    lastStepRef.current = stepNumber;
  }, []);

  const reportCompleted = useCallback(() => {
    completedRef.current = true;
  }, []);

  return (
    <LeadFormModalContext.Provider
      value={{ isOpen, selectedCategory, openLeadForm, closeLeadForm, reportStep, reportCompleted }}
    >
      {children}
    </LeadFormModalContext.Provider>
  );
}

export function useLeadFormModal() {
  const context = useContext(LeadFormModalContext);
  if (!context) {
    throw new Error("useLeadFormModal must be used within LeadFormModalProvider");
  }
  return context;
}
