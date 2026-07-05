import { ShieldCheck, Truck, Percent, Wrench } from "lucide-react";

export default function USPSection() {
  const usps = [
    {
      num: "01",
      icon: <ShieldCheck className="h-6 w-6 text-brand-cyan" />,
      title: "Garantierte Qualität",
      desc: "Jedes Fahrzeug durchläuft vor der Übergabe unseren 120-Punkte-Check. Inklusive D2D-Garantie für maximale Sorgenfreiheit."
    },
    {
      num: "02",
      icon: <Truck className="h-6 w-6 text-brand-cyan" />,
      title: "Flexible Logistik",
      desc: "Wahlweise bequeme Selbstabholung an unseren Standorten oder bundesweite Direktlieferung bis zu Ihrem Betriebshof."
    },
    {
      num: "03",
      icon: <Percent className="h-6 w-6 text-brand-cyan" />,
      title: "GEFA Finanzierung",
      desc: "Maßgeschneidertes Leasing oder Finanzierung direkt über unseren starken Partner, die GEFA Bank."
    },
    {
      num: "04",
      icon: <Wrench className="h-6 w-6 text-brand-cyan" />,
      title: "Sonderaufbauten",
      desc: "Koffer, Pritsche, Kühlkoffer oder Plane. Wir realisieren Ihren individuellen Branchenaufbau exakt nach Vorgabe."
    }
  ];

  return (
    <section className="bg-white py-16 lg:py-24 border-b border-brand-grey/10">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 border border-brand-grey/30 bg-brand-light px-3 py-1 rounded-xl">
            <span className="font-sans text-xs font-bold tracking-wider text-brand-navy uppercase">
              Unser Versprechen
            </span>
          </div>
          <h2 className="font-extrabold text-3xl sm:text-4xl text-brand-navy tracking-tight">
            Ein Ansprechpartner. Vier Leistungen.
          </h2>
          <p className="font-sans text-base text-brand-grey leading-relaxed">
            Wir reduzieren die Komplexität Ihres Fuhrparkmanagements. Sie verlassen sich auf einheitliche Standards und exzellenten Rundumservice für Geschäftskunden.
          </p>
        </div>

        {/* USP Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {usps.map((usp, idx) => (
            <div
              key={idx}
              className="relative flex flex-col p-6 border border-brand-grey/20 bg-white hover:border-brand-grey/40 rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.02)] transition-all duration-200 group hover:shadow-md"
            >
              {/* Top Row with Number and Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex h-12 w-12 items-center justify-center bg-brand-light text-brand-navy rounded-xl transition-colors group-hover:bg-brand-navy group-hover:text-white">
                  {usp.icon}
                </div>
                <span className="font-bold text-4xl text-brand-grey/20 group-hover:text-brand-cyan/40 transition-colors">
                  {usp.num}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-bold text-lg text-brand-navy mb-2">
                {usp.title}
              </h3>
              <p className="font-sans text-sm text-brand-grey leading-relaxed">
                {usp.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
