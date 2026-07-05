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
  }
}

// ---- Diese Konstante ist die EINZIGE Zeile, die sich pro LP unterscheidet ----
export const PAGE_ID = "lp3_verkauf"; // LP2: "lp2_aufbauten" | LP3: "lp3_verkauf"

function ensureDataLayer() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
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
  pushEvent("modal_step_view", { step_number, step_name, total_steps, ...extra });
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

export function trackFormSubmit(form_name: string, total_steps: number, extra?: Record<string, unknown>) {
  // form_submit wird in GA4 als Conversion-Event markiert (siehe Tracking-Konzept.md)
  pushEvent("form_submit", { form_name, total_steps, ...extra });
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
