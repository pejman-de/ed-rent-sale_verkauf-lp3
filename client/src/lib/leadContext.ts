/**
 * leadContext.ts
 * -----------------------------------------------------------------------
 * Haelt die Kampagnenherkunft und die GA4-Client-ID fuer die gesamte
 * Sitzung fest. Ohne diese Persistenz gehen die UTM-Parameter verloren,
 * sobald der Besucher vor dem Absenden auf /impressum oder /datenschutz
 * wechselt, denn dabei verschwinden sie aus der Adresszeile.
 * -----------------------------------------------------------------------
 */

const STORAGE_KEY = "ed_lead_context";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

type LeadContext = Partial<Record<(typeof UTM_KEYS)[number] | "landing_page" | "referrer", string>>;

function read(): LeadContext {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LeadContext) : {};
  } catch {
    return {};
  }
}

function write(value: LeadContext) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Privater Modus ohne Speicher. Die Werte gelten dann nur fuer diesen Aufruf.
  }
}

/**
 * Einmal beim Seitenaufruf ausfuehren. Schreibt nur, wenn tatsaechlich
 * Kampagnenparameter in der URL stehen. Ein spaeterer Direktaufruf
 * ueberschreibt damit keine bestehende Zuordnung.
 */
export function captureLeadContext() {
  if (typeof window === "undefined") return;
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
  };
}
