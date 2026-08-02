import { useEffect, useState } from "react";
import {
  EINWILLIGUNG_EVENT,
  initialisiereEinwilligung,
  speichereEinwilligung,
} from "@/lib/consent";

// -------------------------------------------------------------------------
// Einwilligungsbanner
//
// Gestaltung nach der Orientierungshilfe der Datenschutzkonferenz und dem
// Urteil des VG Hannover vom 19.03.2025: Ablehnen muss genauso einfach sein
// wie Zustimmen. Beide Schaltflächen sind deshalb in Größe, Position und
// Kontrast gleichwertig. Keine vorausgewählten Haken außer Notwendig.
// -------------------------------------------------------------------------

interface Auswahl {
  funktional: boolean;
  statistik: boolean;
  marketing: boolean;
}

const ALLES_AUS: Auswahl = {
  funktional: false,
  statistik: false,
  marketing: false,
};

const ALLES_AN: Auswahl = {
  funktional: true,
  statistik: true,
  marketing: true,
};

export function ConsentBanner() {
  const [sichtbar, setSichtbar] = useState(false);
  const [zeigeDetails, setZeigeDetails] = useState(false);
  const [auswahl, setAuswahl] = useState<Auswahl>(ALLES_AUS);

  useEffect(() => {
    const gespeichert = initialisiereEinwilligung();
    if (!gespeichert) {
      setSichtbar(true);
      return;
    }
    setAuswahl({
      funktional: gespeichert.funktional,
      statistik: gespeichert.statistik,
      marketing: gespeichert.marketing,
    });
  }, []);

  // Erlaubt das spätere Ändern der Entscheidung, etwa über einen Link
  // im Footer oder auf der Datenschutzseite.
  useEffect(() => {
    window.edEinwilligungOeffnen = () => {
      setZeigeDetails(true);
      setSichtbar(true);
    };
    return () => {
      delete window.edEinwilligungOeffnen;
    };
  }, []);

  function bestaetige(werte: Auswahl) {
    speichereEinwilligung(werte);
    setSichtbar(false);
    setZeigeDetails(false);
  }

  function umschalten(schluessel: keyof Auswahl) {
    setAuswahl((alt) => {
      const neu = { ...alt, [schluessel]: !alt[schluessel] };
      // Statistik und Marketing setzen Funktional voraus.
      if (schluessel === "funktional" && !neu.funktional) {
        neu.statistik = false;
        neu.marketing = false;
      }
      if (
        (schluessel === "statistik" || schluessel === "marketing") &&
        neu[schluessel]
      ) {
        neu.funktional = true;
      }
      return neu;
    });
  }

  if (!sichtbar) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ed-consent-titel"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white p-4 shadow-lg sm:p-6"
    >
      <div className="mx-auto max-w-3xl">
        <h2
          id="ed-consent-titel"
          className="text-base font-semibold text-slate-900"
        >
          Ihre Auswahl zu Cookies und Tracking
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Wir setzen Cookies und ähnliche Techniken ein. Notwendige Funktionen
          sind immer aktiv. Alles Weitere nur mit Ihrer Einwilligung. Sie
          können Ihre Entscheidung jederzeit ändern. Einzelheiten stehen in
          der{" "}
          <a
            href="/datenschutz"
            className="underline underline-offset-2 hover:text-slate-900"
          >
            Datenschutzerklärung
          </a>
          .
        </p>

        {zeigeDetails && (
          <div className="mt-4 space-y-3 border-t border-slate-200 pt-4">
            <Zeile
              titel="Notwendig"
              text="Für den Betrieb der Seite erforderlich. Nicht abwählbar."
              aktiv
              gesperrt
            />
            <Zeile
              titel="Funktional"
              text="Lädt den Google Tag Manager. Voraussetzung für Statistik und Marketing."
              aktiv={auswahl.funktional}
              beiKlick={() => umschalten("funktional")}
            />
            <Zeile
              titel="Statistik"
              text="Reichweitenmessung mit Google Analytics."
              aktiv={auswahl.statistik}
              beiKlick={() => umschalten("statistik")}
            />
            <Zeile
              titel="Marketing"
              text="Kampagnenmessung und Zielgruppen bei Meta (Facebook/Instagram) und Google."
              aktiv={auswahl.marketing}
              beiKlick={() => umschalten("marketing")}
            />
          </div>
        )}

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => bestaetige(ALLES_AUS)}
            className="w-full rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50 sm:flex-1"
          >
            Alle ablehnen
          </button>
          <button
            type="button"
            onClick={() => bestaetige(ALLES_AN)}
            className="w-full rounded-md border border-slate-900 bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 sm:flex-1"
          >
            Alle akzeptieren
          </button>
        </div>

        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          {!zeigeDetails ? (
            <button
              type="button"
              onClick={() => setZeigeDetails(true)}
              className="text-sm text-slate-600 underline underline-offset-2 hover:text-slate-900"
            >
              Einstellungen
            </button>
          ) : (
            <button
              type="button"
              onClick={() => bestaetige(auswahl)}
              className="text-sm text-slate-600 underline underline-offset-2 hover:text-slate-900"
            >
              Auswahl speichern
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Zeile({
  titel,
  text,
  aktiv,
  gesperrt,
  beiKlick,
}: {
  titel: string;
  text: string;
  aktiv: boolean;
  gesperrt?: boolean;
  beiKlick?: () => void;
}) {
  return (
    <div className="flex items-start gap-3">
      <input
        type="checkbox"
        checked={aktiv}
        disabled={gesperrt}
        onChange={beiKlick}
        aria-label={titel}
        className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300"
      />
      <div>
        <p className="text-sm font-medium text-slate-900">{titel}</p>
        <p className="text-sm text-slate-600">{text}</p>
      </div>
    </div>
  );
}

export default ConsentBanner;

// Verhindert, dass der Import als ungenutzt gilt, wenn das Event später
// an anderer Stelle abgehört wird.
export { EINWILLIGUNG_EVENT };
