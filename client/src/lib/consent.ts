// -------------------------------------------------------------------------
// Einwilligungsverwaltung, Consent Mode v2
//
// Grundsatz: Der Google Tag Manager wird NICHT statisch in index.html
// eingebunden. Er wird erst nachgeladen, wenn eine gespeicherte Zustimmung
// zur Kategorie "funktional" vorliegt. Ohne Zustimmung existiert der
// Container nicht und es geht kein Aufruf an googletagmanager.com hinaus.
//
// Hintergrund: VG Hannover, Urteil vom 19.03.2025, Az. 10 A 5385/22.
// Bereits das Laden des GTM ist einwilligungspflichtig nach
// Paragraf 25 TDDDG, weil dabei IP-Adresse und Geraetedaten an Google
// uebertragen werden.
// -------------------------------------------------------------------------

export const GTM_ID = "GTM-KCSL5HZR";
export const EINWILLIGUNG_VERSION = 1;

const SPEICHER_SCHLUESSEL = "ed_consent_v1";
export const EINWILLIGUNG_EVENT = "ed:einwilligung-geaendert";

export interface Einwilligung {
  funktional: boolean;
  statistik: boolean;
  marketing: boolean;
  version: number;
  zeitpunkt: string;
}

declare global {
  interface Window {
    dataLayer: unknown[];
    edEinwilligungOeffnen?: () => void;
  }
}

// Google erwartet das arguments-Objekt, nicht ein Array. Deshalb eine
// klassische Funktionsdeklaration und keine Pfeilfunktion.
function gtag(_befehl: string, _typ: string, _werte: Record<string, unknown>) {
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

/**
 * Erzwingt die Abhaengigkeiten zwischen den Kategorien. Statistik und
 * Marketing setzen Funktional voraus, weil ohne Funktional der Container
 * gar nicht geladen wird und die Signale niemanden erreichen wuerden.
 */
export function normalisiere(eingabe: {
  funktional: boolean;
  statistik: boolean;
  marketing: boolean;
}): { funktional: boolean; statistik: boolean; marketing: boolean } {
  if (!eingabe.funktional) {
    return { funktional: false, statistik: false, marketing: false };
  }
  return {
    funktional: true,
    statistik: !!eingabe.statistik,
    marketing: !!eingabe.marketing,
  };
}

export function leseEinwilligung(): Einwilligung | null {
  try {
    const roh = window.localStorage.getItem(SPEICHER_SCHLUESSEL);
    if (!roh) return null;
    const geparst = JSON.parse(roh) as Partial<Einwilligung>;
    if (geparst.version !== EINWILLIGUNG_VERSION) return null;
    const kategorien = normalisiere({
      funktional: !!geparst.funktional,
      statistik: !!geparst.statistik,
      marketing: !!geparst.marketing,
    });
    return {
      ...kategorien,
      version: EINWILLIGUNG_VERSION,
      zeitpunkt: typeof geparst.zeitpunkt === "string" ? geparst.zeitpunkt : "",
    };
  } catch {
    return null;
  }
}

export function speichereEinwilligung(eingabe: {
  funktional: boolean;
  statistik: boolean;
  marketing: boolean;
}): Einwilligung {
  const kategorien = normalisiere(eingabe);
  const datensatz: Einwilligung = {
    ...kategorien,
    version: EINWILLIGUNG_VERSION,
    zeitpunkt: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(SPEICHER_SCHLUESSEL, JSON.stringify(datensatz));
  } catch {
    // Privater Modus oder voller Speicher. Die Entscheidung gilt dann nur
    // fuer diesen Seitenaufruf, das ist besser als ein Absturz.
  }
  wendeEinwilligungAn(datensatz);
  try {
    window.dispatchEvent(
      new CustomEvent(EINWILLIGUNG_EVENT, { detail: datensatz }),
    );
  } catch {
    // CustomEvent nicht verfuegbar, unkritisch.
  }
  return datensatz;
}

export function widerrufeEinwilligung(): void {
  try {
    window.localStorage.removeItem(SPEICHER_SCHLUESSEL);
  } catch {
    // unkritisch
  }
  sendeConsentSignale({ funktional: false, statistik: false, marketing: false });
}

/**
 * Uebersetzt die vier Kategorien in die Consent-Mode-Signale. Der
 * benutzerdefinierte Typ facebook-pixel muss im Container unter
 * Container-Einstellungen, Zusaetzliche Consent-Ueberpruefungen ergaenzt sein.
 */
export function sendeConsentSignale(eingabe: {
  funktional: boolean;
  statistik: boolean;
  marketing: boolean;
}): void {
  const k = normalisiere(eingabe);
  gtag("consent", "update", {
    functionality_storage: k.funktional ? "granted" : "denied",
    personalization_storage: k.funktional ? "granted" : "denied",
    analytics_storage: k.statistik ? "granted" : "denied",
    ad_storage: k.marketing ? "granted" : "denied",
    ad_user_data: k.marketing ? "granted" : "denied",
    ad_personalization: k.marketing ? "granted" : "denied",
    security_storage: "granted",
    "facebook-pixel": k.marketing ? "granted" : "denied",
  });
}

let gtmGeladen = false;

/** Haengt das Container-Skript ein. Mehrfachaufrufe sind wirkungslos. */
export function ladeGtm(): void {
  if (gtmGeladen) return;
  if (typeof document === "undefined") return;
  if (document.getElementById("ed-gtm")) {
    gtmGeladen = true;
    return;
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  const skript = document.createElement("script");
  skript.id = "ed-gtm";
  skript.async = true;
  skript.src = "https://www.googletagmanager.com/gtm.js?id=" + GTM_ID;
  const erstes = document.getElementsByTagName("script")[0];
  if (erstes && erstes.parentNode) {
    erstes.parentNode.insertBefore(skript, erstes);
  } else {
    document.head.appendChild(skript);
  }
  gtmGeladen = true;
}

export function wendeEinwilligungAn(datensatz: {
  funktional: boolean;
  statistik: boolean;
  marketing: boolean;
}): void {
  const k = normalisiere(datensatz);
  sendeConsentSignale(k);
  if (k.funktional) {
    ladeGtm();
  }
}

/**
 * Beim Seitenaufruf einmal aufrufen. Gibt die gespeicherte Entscheidung
 * zurueck oder null, wenn noch keine vorliegt. Nur bei null wird das
 * Banner angezeigt.
 */
export function initialisiereEinwilligung(): Einwilligung | null {
  const gespeichert = leseEinwilligung();
  if (gespeichert) {
    wendeEinwilligungAn(gespeichert);
  }
  return gespeichert;
}
