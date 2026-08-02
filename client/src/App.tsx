import { useEffect, useRef } from "react";
import { Toaster } from "@/components/ui/sonner";
import { trackPageView } from "@/lib/analytics";
import { captureLeadContext } from "@/lib/leadContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LeadFormModalProvider } from "./contexts/LeadFormModalContext";
import { LeadFormModal } from "./components/LeadFormModal";
import Home from "./pages/Home";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";

function Router() {
  const [location] = useLocation();
  const istErsterAufruf = useRef(true);

  // Kampagnenherkunft einmal pro Sitzung sichern, bevor ein Routenwechsel
  // die Parameter aus der Adresszeile entfernt.
  useEffect(() => {
    captureLeadContext();
  }, []);

  // Erster Aufruf kommt bereits vom GA4-Konfigurationstag. Nur Folge-
  // Routenwechsel melden, sonst zaehlt der Einstieg doppelt.
  useEffect(() => {
    if (istErsterAufruf.current) {
      istErsterAufruf.current = false;
      return;
    }
    trackPageView(location);
  }, [location]);

  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/impressum"} component={Impressum} />
      <Route path={"/datenschutz"} component={Datenschutz} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <LeadFormModalProvider>
            <Router />
            <LeadFormModal />
          </LeadFormModalProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
