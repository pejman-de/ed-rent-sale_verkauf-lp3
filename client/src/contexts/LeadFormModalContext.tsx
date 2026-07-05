import { createContext, useContext, useState, ReactNode } from "react";

interface LeadFormModalContextValue {
  isOpen: boolean;
  selectedCategory: string | undefined;
  openLeadForm: (category?: string) => void;
  closeLeadForm: () => void;
}

const LeadFormModalContext = createContext<LeadFormModalContextValue | undefined>(undefined);

export function LeadFormModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

  const openLeadForm = (category?: string) => {
    // Bewusst: ohne Argument wird selectedCategory explizit zurueckgesetzt,
    // damit generische CTAs keine alte Kategorie-Auswahl mitschleppen.
    setSelectedCategory(category);
    setIsOpen(true);
  };

  const closeLeadForm = () => {
    setIsOpen(false);
  };

  return (
    <LeadFormModalContext.Provider value={{ isOpen, selectedCategory, openLeadForm, closeLeadForm }}>
      {children}
    </LeadFormModalContext.Provider>
  );
}

export function useLeadFormModal() {
  const ctx = useContext(LeadFormModalContext);
  if (!ctx) {
    throw new Error("useLeadFormModal muss innerhalb eines LeadFormModalProvider verwendet werden.");
  }
  return ctx;
}
