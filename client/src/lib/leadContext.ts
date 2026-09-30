/**
 * leadContext.ts
 * -----------------------------------------------------------------------
 * Haelt die Kampagnenherkunft und die GA4-Client-ID fuer die gesamte
 * Sitzung fest. Ohne diese Persistenz gehen die UTM-Parameter verloren,
 * sobald der Besucher vor dem Absenden auf /impressum oder /datenschutz
 * wechselt, denn dabei verschwinden sie aus der Adresszeile.
 * -----------------------------------------------------------------------
 */

import { EINWILLIGUNG_EVENT, leseEinwilligung } from "./consent";

const STORAGE_KEY = "ed_lead_context";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

type LeadContext = Partial<Record<(typeof UTM_KEYS)[number] | "landing_page" | "referrer", string>>;

// Ohne Einwilligung liegen die Werte nur im Arbeitsspeicher der geoeffneten
// Seite. Das deckt Routenwechsel innerhalb der Seite ab, ohne etwas auf dem
// Endgeraet abzulegen (Paragraf 25 TDDDG). Erst mit Einwilligung in Statistik
// oder Marketing ("funktional") wandern sie zusaetzlich in den Session Storage
// und ueberstehen damit auch ein Neuladen.
let imSpeicher: LeadContext = {};

function darfSpeichern(): boolean {
  return leseEinwilligung()?.funktional === true;
}

function sessionLesen(): LeadContext {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LeadContext) : {};
  } catch {
    return {};
  }
}

function sessionSchreiben(value: LeadContext) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Privater Modus ohne Speicher. Die Werte gelten dann nur fuer diesen Aufruf.
  }
}

function sessionLoeschen() {
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // unkritisch
  }
}

function read(): LeadContext {
  if (typeof window === "undefined") return {};
  if (!darfSpeichern()) {
    // Einwilligung fehlt oder wurde widerrufen: nichts Gespeichertes verwenden.
    sessionLoeschen();
    return imSpeicher;
  }
  return { ...sessionLesen(), ...imSpeicher };
}

function write(value: LeadContext) {
  if (typeof window === "undefined") return;
  imSpeicher = value;
  if (darfSpeichern()) sessionSchreiben(value);
}

/** Uebernimmt die Werte in den Session Storage, sobald eingewilligt wird. */
function beiEinwilligung() {
  if (darfSpeichern()) {
    if (Object.keys(imSpeicher).length) sessionSchreiben({ ...sessionLesen(), ...imSpeicher });
  } else {
    sessionLoeschen();
  }
}

/**
 * Einmal beim Seitenaufruf ausfuehren. Schreibt nur, wenn tatsaechlich
 * Kampagnenparameter in der URL stehen. Ein spaeterer Direktaufruf
 * ueberschreibt damit keine bestehende Zuordnung.
 */
export function captureLeadContext() {
  if (typeof window === "undefined") return;
  window.addEventListener(EINWILLIGUNG_EVENT, beiEinwilligung);
  const params = new URLSearchParams(window.location.search);
  const gefunden: LeadContext = {};
  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) gefunden[key] = value;
  });
  if (Object.keys(gefunden).length === 0) return;
  gefunden.landing_page = window.location.pathname;
  gefunden.referrer = document.referrer || "direct";
  write({ ...read(), ...gefunden });
}

/** Liest die GA4-Client-ID aus dem _ga-Cookie. Leer, solange kein Consent vorliegt. */
export function getGaClientId(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const treffer = document.cookie.match(/(?:^|;\s*)_ga=GA\d\.\d\.(\d+\.\d+)/);
  return treffer ? treffer[1] : undefined;
}

/**
 * _fbc und _fbp werden ausschliesslich vom Meta Pixel selbst gesetzt, und
 * der Pixel laedt bei uns erst nach erteilter Marketing-Einwilligung (siehe
 * consent.ts). Ohne Einwilligung existieren die Cookies schlicht nicht,
 * eine zusaetzliche Abfrage ist hier nicht noetig.
 */
export function getFbc(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const treffer = document.cookie.match(/(?:^|;\s*)_fbc=([^;]+)/);
  return treffer ? decodeURIComponent(treffer[1]) : undefined;
}

export function getFbp(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const treffer = document.cookie.match(/(?:^|;\s*)_fbp=([^;]+)/);
  return treffer ? decodeURIComponent(treffer[1]) : undefined;
}

/**
 * Werte fuer den Lead-Payload. UTM-Parameter zuerst aus der URL, sonst aus
 * der Sitzung, sonst die bisherigen Vorgabewerte direct und none.
 */
export function getLeadContext() {
  const gespeichert = read();
  const params =
    typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();

  const wert = (key: (typeof UTM_KEYS)[number], vorgabe: string) =>
    params.get(key) || gespeichert[key] || vorgabe;

  return {
    utm_source: wert("utm_source", "direct"),
    utm_medium: wert("utm_medium", "none"),
    utm_campaign: wert("utm_campaign", "none"),
    utm_term: wert("utm_term", "none"),
    utm_content: wert("utm_content", "none"),
    ga_client_id: getGaClientId(),
    fbc: getFbc(),
    fbp: getFbp(),
    marketing_consent: leseEinwilligung()?.marketing === true,
    // Vollstaendige LP-URL fuer event_source_url im Meta-CAPI-Payload. Der
    // Worker kannte bisher nur den Origin aus dem Request-Header.
    page_url: typeof window !== "undefined" ? window.location.href : undefined,
  };
}
