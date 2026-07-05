import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Percent, ShieldAlert, BadgePercent } from "lucide-react";

interface DealerPathProps {
  onCtaClick: () => void;
}

export default function DealerPath({ onCtaClick }: DealerPathProps) {
  const features = [
    {
      icon: <BadgePercent className="h-5 w-5 text-brand-cyan" />,
      title: "Attraktive Mengenrabatte",
      desc: "Gestaffelte Sonderkonditionen und exklusive Einkaufspreise ab einer Abnahme von 10 Fahrzeugen."
    },
    {
      icon: <Sparkles className="h-5 w-5 text-brand-cyan" />,
      title: "Bevorzugter Zugriff",
      desc: "Erhalten Sie frühen Zugriff auf Neuzugänge, noch bevor diese öffentlich verfügbar sind."
    },
    {
      icon: <ShieldAlert className="h-5 w-5 text-brand-cyan" />,
      title: "Persönlicher Key-Account",
      desc: "Ein fester Ansprechpartner für alle Anfragen, Rahmenverträge und Spezial-Themen."
    }
  ];

  return (
    <section className="bg-white py-16 lg:py-24 border-b border-brand-grey/10">
      <div className="container">
        <div className="relative overflow-hidden border-2 border-brand-navy bg-brand-navy text-white p-8 md:p-12 lg:p-16 rounded-xl shadow-xl">
          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 border border-brand-cyan/30 bg-brand-cyan/10 px-3 py-1 rounded-xl">
                <span className="h-2 w-2 rounded-full bg-brand-cyan animate-pulse" />
                <span className="font-sans text-xs font-bold tracking-wider text-brand-cyan uppercase">
                  Händler- & Großkunden-Programm
                </span>
              </div>
              
              <h2 className="font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                Ab 10 Fahrzeugen: <br />
                Sonderkonditionen & Rahmenverträge.
              </h2>
              
              <p className="font-sans text-base text-white/80 max-w-xl leading-relaxed">
                Optimieren Sie Ihre Einkaufs- und Fuhrparkkosten. Unser exklusives Handelspartner-Programm bietet Ihnen maximale Flexibilität, schnelle Verfügbarkeit und unschlagbare Paketpreise.
              </p>

              {/* Action Button */}
              <div className="pt-2">
                <Button
                  onClick={onCtaClick}
                  className="bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 font-extrabold px-8 py-6 text-base rounded-xl shadow-md transition-all duration-150 active:scale-95 flex items-center gap-2"
                >
                  <span>Händler-Anfrage starten</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Right Features Grid */}
            <div className="lg:col-span-5 space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 p-5 border border-white/10 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-brand-cyan">
                      {feature.icon}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-sm text-white">
                        {feature.title}
                      </h3>
                      <p className="font-sans text-xs text-white/70 leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
