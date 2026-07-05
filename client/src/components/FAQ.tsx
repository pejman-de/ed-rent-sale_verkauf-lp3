import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { trackFaqToggle } from "@/lib/analytics";

const faqs = [
  {
    question: "Welche Finanzierungs- und Leasingmöglichkeiten bieten Sie an?",
    answer: "Wir finanzieren passgenau über unseren Partner GEFA Bank. Ob Leasing, Mietkauf oder klassische Finanzierung, wir finden die für Ihren Betrieb wirtschaftlichste Lösung.",
  },
  {
    question: "Sind individuelle Sonderaufbauten (z.B. Koffer, Pritsche, Plane) möglich?",
    answer: "Ja. Wir realisieren Ihren Wunschaufbau exakt nach Vorgabe, vom Standard-Koffer bis zur Branchenlösung.",
  },
  {
    question: "Wie läuft die Lieferung oder Abholung ab?",
    answer: "Sie haben die Wahl. Holen Sie Ihr Fahrzeug an unserem Standort ab oder lassen Sie es termingerecht direkt zu Ihrem Betriebshof liefern.",
  },
  {
    question: "Welche Garantien erhalte ich beim Kauf eines Gebrauchtfahrzeugs?",
    answer: "Jeder Gebrauchte durchläuft unseren 120-Punkte-Check und kommt mit frischem TÜV sowie Gewährleistung. So fahren Sie ohne böse Überraschungen los.",
  },
];

export default function FAQ() {
  return (
    <section className="py-20 bg-white border-t border-brand-grey/10">
      <div className="container max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            Häufig gestellte Fragen.
          </h2>
          <p className="mt-4 text-lg text-brand-grey">
            Schnelle Antworten, bevor Sie fragen. Falls etwas fehlt, melden Sie sich einfach.
          </p>
        </div>

        {/* Accordion Component */}
        <Accordion
          type="single"
          collapsible
          className="w-full space-y-4"
          onValueChange={(value) => {
            if (value) {
              const idx = parseInt(value.replace("item-", ""), 10);
              trackFaqToggle(faqs[idx]?.question ?? value, true);
            }
          }}
        >
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className="border border-b! border-brand-grey/15 rounded-xl px-6 py-2 bg-brand-light/50 hover:bg-brand-light transition-colors data-[state=open]:bg-brand-light data-[state=open]:border-brand-cyan/30"
            >
              <AccordionTrigger className="text-base font-bold text-brand-navy hover:text-brand-cyan hover:no-underline transition-colors py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-brand-grey leading-relaxed pt-2 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
