/**
 * analytics.ts
 * -----------------------------------------------------------------------
 * Zentraler dataLayer-Wrapper für GA4/GTM-Tracking.
 * Datei pro LP nach client/src/lib/analytics.ts kopieren.
 * Der einzige Unterschied zwischen den drei LPs ist die Konstante PAGE_ID
 * ganz unten in diesem File.
 *
 * Funktionsprinzip:
 * - Jeder Aufruf pusht ein strukturiertes Event in window.dataLayer.
 * - GTM fängt die Events über "Custom Event"-Trigger (Ereignisname exakt
 *   gleich event-Feld) ab und leitet sie an GA4 weiter.
 * - Dadurch entfällt jede Abhängigkeit von CSS-Klassen/DOM-Selektoren im
 *   GTM-Container -> robust gegenüber Redesigns.
 * -----------------------------------------------------------------------
 */

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    fbq?: (
      command: string,
      eventName: string,
      params?: Record<string, unknown>,
      options?: { eventID?: string }
    ) => void;
  }
}

// ---- Diese Konstante ist die EINZIGE Zeile, die sich pro LP unterscheidet ----
export const PAGE_ID = "lp3_verkauf"; // LP2: "lp2_aufbauten" | LP3: "lp3_verkauf"

function ensureDataLayer() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
}

/**
 * Erzeugt die event_id fuer die Meta-Deduplizierung. Browser-Pixel und
 * Conversions API muessen dieselbe ID senden, sonst zaehlt Meta denselben
 * Lead zweimal. Einmal pro Absendeversuch aufrufen: bei einem Retry ist eine
 * neue ID gewollt, weil Meta sonst den zweiten Versuch als Dublette verwirft.
 */
export function createEventId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // Fallback fuer Altbrowser ohne randomUUID (u.a. Safari vor 15.4).
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    bytes[6] = (bytes[6] & 0x0f) | 0x40; // Version 4
    bytes[8] = (bytes[8] & 0x3f) | 0x80; // Variante 10xx
    const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  }
  // Letzte Rueckfallebene ohne Web Crypto. Kein UUID-Format, aber fuer die
  // Deduplizierung reicht ein pro Versuch eindeutiger Wert.
  return `${Date.now().toString(16)}-${Math.random().toString(16).slice(2, 10)}-${Math.random()
    .toString(16)
    .slice(2, 10)}`;
}

/** Basis-Push-Funktion. Reichert jedes Event automatisch mit page_id an. */
function pushEvent(eventName: string, params: Record<string, unknown> = {}) {
  ensureDataLayer();
  window.dataLayer.push({
    event: eventName,
    page_id: PAGE_ID,
    ...params,
  });
}

// -------------------------------------------------------------------------
// 1. Klick-Tracking (Buttons, CTAs, Textlinks, Kacheln)
// -------------------------------------------------------------------------

type ClickType = "cta_click" | "link_click" | "tile_click" | "phone_click" | "email_click";

interface ClickParams {
  element_id: string;          // eindeutiger, sprechender Bezeichner, z.B. "hero_primary_cta"
  element_text: string;        // sichtbarer Button-/Link-Text
  element_location: string;    // Sektion, z.B. "header" | "hero" | "categories" | "footer"
  destination_url?: string;    // bei Links (tel:, mailto:, extern, Anchor)
  extra?: Record<string, unknown>; // LP-spezifische Zusatzparameter (z.B. category, lead_path)
}

export function trackClick(type: ClickType, params: ClickParams) {
  const { extra, ...rest } = params;
  pushEvent(type, { ...rest, ...extra });
}

// -------------------------------------------------------------------------
// 2. Modal-Tracking
// -------------------------------------------------------------------------

export function trackModalOpen(trigger_element: string, extra?: Record<string, unknown>) {
  pushEvent("modal_open", { trigger_element, ...extra });
}

export function trackModalClose(close_method: "close_button" | "overlay_click" | "esc_key", last_step_reached: number, extra?: Record<string, unknown>) {
  pushEvent("modal_close", { close_method, last_step_reached, ...extra });
}

export function trackModalStepView(step_number: number, step_name: string, total_steps: number, extra?: Record<string, unknown>) {
  // step_index und step_total sind Aliasse auf step_number und total_steps.
  // Bestehende GTM-Variablen bleiben dadurch unveraendert gueltig, waehrend
  // die Meta-Tags (AddToCart/InitiateCheckout) die sprechenden Namen nutzen.
  pushEvent("modal_step_view", {
    step_number,
    step_name,
    total_steps,
    step_index: step_number,
    step_total: total_steps,
    ...extra,
  });
}

export function trackModalStepCompleted(step_number: number, step_name: string, extra?: Record<string, unknown>) {
  pushEvent("modal_step_completed", { step_number, step_name, ...extra });
}

export function trackFormStart(extra?: Record<string, unknown>) {
  pushEvent("form_start", extra);
}

export function trackFormError(step_number: number, error_fields: string[], extra?: Record<string, unknown>) {
  pushEvent("form_error", { step_number, error_fields: error_fields.join(","), ...extra });
}

export function trackFormAbandon(last_step_reached: number, extra?: Record<string, unknown>) {
  pushEvent("form_abandon", { last_step_reached, ...extra });
}

export function trackFormSubmit(
  form_name: string,
  total_steps: number,
  event_id: string,
  extra?: Record<string, unknown>
) {
  // form_submit wird in GA4 als Conversion-Event markiert (siehe Tracking-Konzept.md).
  // event_id ist Pflichtparameter, damit die Meta-Deduplizierung nicht
  // versehentlich ohne ID feuert: GTM reicht den Wert an den eventID-Parameter
  // des Meta-Pixel-Tags durch, der Worker sendet dieselbe ID an die CAPI.
  pushEvent("form_submit", { form_name, total_steps, event_id, ...extra });
}

// -------------------------------------------------------------------------
// 3. Scroll-Tiefe & Section-Views
// -------------------------------------------------------------------------

export function trackScrollDepth(percent_scrolled: 25 | 50 | 75 | 100) {
  pushEvent("scroll_depth", { percent_scrolled });
}

export function trackSectionView(section_name: string) {
  pushEvent("section_view", { section_name });
}

// -------------------------------------------------------------------------
// 4. Sonstiges conversion-relevantes Tracking
// -------------------------------------------------------------------------

export function trackOutboundClick(destination_url: string, element_location: string) {
  pushEvent("outbound_click", { destination_url, element_location });
}

export function trackFaqToggle(question: string, opened: boolean) {
  pushEvent("faq_toggle", { question, opened });
}

export function trackGalleryFilter(filter_name: string, filter_value: string) {
  // LP3-spezifisch (InteractiveGallery), aber generisch nutzbar
  pushEvent("gallery_filter", { filter_name, filter_value });
}

// -------------------------------------------------------------------------
// 5. SPA-Seitenaufrufe (Routenwechsel ohne Neuladen)
// -------------------------------------------------------------------------

/**
 * Meldet einen Routenwechsel als virtuellen Seitenaufruf.
 * Das GA4-Konfigurationstag feuert page_view nur beim ersten Laden.
 * Der Aufruf wird in App.tsx an den wouter-Router gehaengt.
 */
export function trackPageView(page_path: string, page_title?: string) {
  pushEvent("virtual_page_view", {
    page_path,
    page_location: typeof window !== "undefined" ? window.location.href : undefined,
    page_title: page_title ?? (typeof document !== "undefined" ? document.title : undefined),
  });
}

/**
 * Fehlgeschlagene Uebermittlung. Wird zusaetzlich zu form_error gemeldet,
 * damit sich in GA4 Serverfehler von Eingabefehlern trennen lassen.
 */
export function trackFormSubmitFailed(form_name: string, status_code: number, reference?: string) {
  pushEvent("form_submit_failed", { form_name, status_code, reference: reference ?? "none" });
}
