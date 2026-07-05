export default function SocialProof() {
  const brands = [
    { name: "Mercedes-Benz", desc: "Sprinter & Atego Spezialist" },
    { name: "Iveco", desc: "Daily Box & Fahrgestelle" },
    { name: "MAN", desc: "TGE Kastenwagen" },
    { name: "Fiat Professional", desc: "Ducato Transporter" },
    { name: "Opel", desc: "Movano Cargo Baureihen" }
  ];

  return (
    <section className="bg-brand-light/50 py-10 border-b border-brand-grey/10">
      <div className="container">
        <div className="flex flex-col space-y-6 lg:flex-row lg:space-y-0 lg:items-center lg:justify-between">
          {/* Header */}
          <div className="max-w-md shrink-0">
            <h2 className="font-bold text-lg text-brand-navy leading-tight">
              Erfahrung mit Fahrzeugen führender Hersteller.
            </h2>
            <p className="font-sans text-xs font-semibold text-brand-grey tracking-wider uppercase mt-1">
              Beste Konditionen & voller Service.
            </p>
          </div>

          {/* Brand List */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 items-center w-full lg:max-w-4xl lg:ml-8">
            {brands.map((brand, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-4 border border-brand-grey/20 bg-white rounded-xl text-center shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:border-brand-grey/40 transition-colors"
              >
                <span className="font-extrabold text-sm tracking-tight text-brand-navy leading-none">
                  {brand.name}
                </span>
                <span className="font-sans text-[10px] font-semibold text-brand-grey mt-1 uppercase tracking-wider">
                  {brand.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
