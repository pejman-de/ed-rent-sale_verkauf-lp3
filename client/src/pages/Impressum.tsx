import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Landmark, FileText, Scale } from "lucide-react";
import { Link } from "wouter";
import { useLeadFormModal } from "@/contexts/LeadFormModalContext";

export default function Impressum() {
  const { openLeadForm } = useLeadFormModal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-brand-light">
      <Header onCtaClick={() => openLeadForm()} />

      <main className="flex-grow py-16 md:py-24">
        <div className="container max-w-4xl">
          {/* Back Button */}
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-sm font-bold text-brand-navy hover:text-brand-cyan transition-colors gap-2 group">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span>Zurück zur Startseite</span>
            </Link>
          </div>

          {/* Page Header */}
          <div className="bg-white rounded-2xl border border-brand-grey/15 p-8 md:p-12 shadow-xl mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/5 rounded-full -mr-16 -mt-16" />
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy/5 text-brand-navy">
                <Scale className="h-6 w-6 text-brand-cyan" />
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-navy">
                Impressum
              </h1>
            </div>
            <p className="text-brand-grey text-lg leading-relaxed max-w-2xl">
              Gesetzliche Anbieterkennzeichnung nach § 5 TMG für die Webpräsenz von ED Rent & Sale.
            </p>
          </div>

          {/* Content Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Left/Main Column (2 cols) */}
            <div className="md:col-span-2 space-y-8">
              {/* Angaben gemäß § 5 TMG */}
              <div className="bg-white rounded-2xl border border-brand-grey/15 p-8 shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-brand-navy border-b border-brand-grey/10 pb-3 flex items-center gap-2">
                  <Landmark className="h-5 w-5 text-brand-cyan shrink-0" />
                  Angaben gemäß § 5 TMG
                </h2>
                <div className="space-y-4 text-brand-grey leading-relaxed">
                  <div>
                    <p className="font-bold text-brand-navy">ED Rent & Sale</p>
                    <p>Bremsen 13 A</p>
                    <p>42799 Leichlingen (Rheinland)</p>
                    <p>Deutschland</p>
                  </div>
                  <div>
                    <p className="text-sm text-brand-grey font-semibold">Vertreten durch den Geschäftsführer:</p>
                    <p className="text-brand-navy font-medium">Enes Dilekci</p>
                  </div>
                </div>
              </div>

              {/* Streitschlichtung */}
              <div className="bg-white rounded-2xl border border-brand-grey/15 p-8 shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-brand-navy border-b border-brand-grey/10 pb-3">
                  Verbraucherstreitbeilegung
                </h2>
                <div className="space-y-4 text-brand-grey leading-relaxed text-sm">
                  <p>
                    Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                    <a
                      href="https://ec.europa.eu/odr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-cyan hover:underline break-all"
                    >
                      https://ec.europa.eu/odr
                    </a>.
                  </p>
                  <p>
                    Wir sind zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle weder verpflichtet noch bereit.
                  </p>
                </div>
              </div>
            </div>

            {/* Right/Sidebar Column (1 col) */}
            <div className="space-y-8">
              {/* Kontakt-Box */}
              <div className="bg-brand-navy text-white rounded-2xl p-8 shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:2rem_2rem]" />
                <div className="relative z-10 space-y-6">
                  <h3 className="text-lg font-bold border-b border-white/10 pb-3">
                    Direkter Kontakt
                  </h3>
                  <div className="space-y-4 text-sm text-brand-grey-light">
                    <div>
                      <p className="text-white font-semibold">Telefon:</p>
                      <a href="tel:+4921758845535" className="hover:text-brand-cyan transition-colors">
                        +49 2175 8845535
                      </a>
                    </div>
                    <div>
                      <p className="text-white font-semibold">E-Mail:</p>
                      <a href="mailto:info@ed-rent.com" className="hover:text-brand-cyan transition-colors break-all">
                        info@ed-rent.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Registerdaten */}
              <div className="bg-white rounded-2xl border border-brand-grey/15 p-8 shadow-sm space-y-6">
                <h3 className="text-lg font-bold text-brand-navy border-b border-brand-grey/10 pb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-brand-cyan shrink-0" />
                  Steuernummer
                </h3>
                <div className="space-y-2 text-sm text-brand-grey">
                  <p className="font-semibold text-brand-navy">Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:</p>
                  <p className="font-mono bg-brand-light p-2 rounded border border-brand-grey/10 text-brand-navy text-xs">
                    DE335989106
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer onScrollToTop={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
    </div>
  );
}
