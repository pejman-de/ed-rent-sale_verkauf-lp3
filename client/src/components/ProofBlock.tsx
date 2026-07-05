import { MapPin, Network, Zap, ShieldCheck } from "lucide-react";

export default function ProofBlock() {
  const items = [
    {
      icon: <MapPin className="h-6 w-6 text-brand-navy" />,
      title: "Zentraler Standort",
      desc: "Eigene Ausstellungsfläche und Werkstatt zur persönlichen Besichtigung und schnellen Übergabe."
    },
    {
      icon: <Network className="h-6 w-6 text-brand-navy" />,
      title: "Starkes Netzwerk",
      desc: "Direkter Zugriff auf Großbestände führender Hersteller. Das sichert beste Preise und kurze Lieferzeiten."
    },
    {
      icon: <Zap className="h-6 w-6 text-brand-navy" />,
      title: "Schnelle Abwicklung",
      desc: "Digitale Prozesse und ein fester Firmenkunden-Ansprechpartner sorgen für reibungslose Standzeiten für Ihren Betrieb."
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-brand-navy" />,
      title: "Geprüfte Sicherheit",
      desc: "Jedes geprüfte Nutzfahrzeug wird mit neuem TÜV, HU/AU und lückenlosem Prüfbericht ausgeliefert."
    }
  ];

  return (
    <section className="bg-white py-16 lg:py-24 border-b border-brand-grey/10">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-sans text-xs font-bold tracking-wider text-brand-grey uppercase">
            Sicherheit & Vertrauen
          </span>
          <h2 className="font-extrabold text-3xl text-brand-navy tracking-tight">
            Warum ED Rent & Sale?
          </h2>
          <p className="font-sans text-base text-brand-grey leading-relaxed">
            Als spezialisierter Fachhändler für Geschäftskunden wissen wir, dass Nutzfahrzeuge arbeiten müssen. Deshalb richten wir all unsere Prozesse auf maximale Zuverlässigkeit aus.
          </p>
        </div>

        {/* 4-Column Proof Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col p-6 border border-brand-grey/20 bg-brand-light/20 hover:bg-brand-light/40 rounded-xl transition-colors duration-150"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-cyan text-brand-navy mb-6">
                {item.icon}
              </div>
              <h3 className="font-bold text-lg text-brand-navy mb-2">
                {item.title}
              </h3>
              <p className="font-sans text-sm text-brand-grey leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
