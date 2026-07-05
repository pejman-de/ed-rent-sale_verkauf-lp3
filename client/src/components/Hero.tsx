import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

interface HeroProps {
  onPrimaryClick: () => void;
  onSecondaryClick: () => void;
}

export default function Hero({ onPrimaryClick, onSecondaryClick }: HeroProps) {
  const checkmarks = [
    "Sofort verfügbare Neufahrzeuge & geprüfte Gebrauchte",
    "Attraktive Leasing- & Finanzierungskonditionen (z.B. GEFA)",
    "Individuelle Sonderaufbauten nach Maß möglich"
  ];

  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24 border-b border-brand-grey/10">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(110,124,149,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(110,124,149,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <div className="container relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">
        {/* Left Content Column */}
        <div className="flex flex-col space-y-8 lg:col-span-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 border border-brand-grey/30 bg-brand-light px-3 py-1 rounded-xl">
              <span className="h-2 w-2 rounded-full bg-brand-cyan animate-pulse" />
              <span className="font-sans text-xs font-bold tracking-wider text-brand-navy uppercase">
                Nutzfahrzeug-Spezialist für Geschäftskunden
              </span>
            </div>
            
            <h1 className="font-extrabold text-4xl tracking-tight text-brand-navy sm:text-5xl lg:text-6xl leading-[1.1] whitespace-pre-line">
              Vom Sprinter bis LKW.{"\n"}
              Neu und gebraucht.{"\n"}
              Aus einer Hand.
            </h1>
            
            <p className="font-sans text-lg text-brand-grey max-w-xl leading-relaxed">
              ED Rent & Sale ist Ihr verlässlicher Partner für erstklassige Nutzfahrzeuge. Maßgeschneiderte Mobilitätslösungen für Handwerk, Logistik und Handel. Ein Ansprechpartner, kein Behördenlauf.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={onPrimaryClick}
              size="lg"
              className="bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 font-extrabold px-8 py-6 text-base rounded-xl shadow-sm transition-all duration-150 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Fahrzeug anfragen</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
            
            <Button
              onClick={onSecondaryClick}
              size="lg"
              variant="outline"
              className="border-2 border-brand-navy text-brand-navy hover:bg-brand-light font-bold px-8 py-6 text-base rounded-xl transition-all duration-150 active:scale-95 flex items-center justify-center"
            >
              Fahrzeugbestand ansehen
            </Button>
          </div>

          {/* Checkmarks */}
          <div className="space-y-3 pt-2 border-t border-brand-grey/10">
            {checkmarks.map((text, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-xl bg-brand-light text-brand-navy mt-0.5">
                  <Check className="h-3.5 w-3.5 text-brand-cyan stroke-[3]" />
                </div>
                <span className="font-sans text-sm font-semibold text-brand-navy/90">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Visual Column */}
        <div className="lg:col-span-6 relative">
          <div className="relative overflow-hidden border border-brand-grey/30 bg-brand-light rounded-xl shadow-md">
            {/* Aspect Ratio Container */}
            <div className="aspect-[16/10] w-full">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663281979359/iiQHyte9m2j8pb53mDZgmE/hero-vehicles-Q99sW2nsU53yUfKN45454Y.webp"
                alt="ED Rent & Sale Nutzfahrzeug-Lineup"
                className="h-full w-full object-cover object-center"
                loading="eager"
              />
            </div>
            {/* Visual overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
          </div>
          
          {/* Accent badge */}
          <div className="absolute -bottom-6 -left-6 hidden sm:flex flex-col bg-brand-navy p-5 border border-brand-grey/20 rounded-xl shadow-lg max-w-[220px]">
            <span className="font-extrabold text-3xl text-brand-cyan leading-none">
              100%
            </span>
            <span className="font-sans text-xs font-bold text-white tracking-wider uppercase mt-1">
              Fokus auf Geschäftskunden
            </span>
            <span className="font-sans text-xs text-brand-grey mt-2 leading-snug">
              Geprüfte Qualität für Ihren Fuhrpark.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
