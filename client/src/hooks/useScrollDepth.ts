/**
 * useScrollDepth.ts
 * -----------------------------------------------------------------------
 * Nach client/src/hooks/useScrollDepth.ts kopieren (für jede der 3 LPs
 * identisch). Wird einmalig in Home.tsx eingebunden:
 *
 *   import { useScrollDepth } from "@/hooks/useScrollDepth";
 *   ...
 *   export default function Home() {
 *     useScrollDepth();
 *     ...
 *   }
 * -----------------------------------------------------------------------
 */
import { useEffect, useRef } from "react";
import { trackScrollDepth } from "@/lib/analytics";

const THRESHOLDS = [25, 50, 75, 100] as const;

export function useScrollDepth() {
  const firedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const scrolledPercent = (scrollTop / docHeight) * 100;

      THRESHOLDS.forEach((threshold) => {
        if (scrolledPercent >= threshold && !firedRef.current.has(threshold)) {
          firedRef.current.add(threshold);
          trackScrollDepth(threshold);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Einmal initial prüfen (z.B. bei sehr kurzen Seiten / Reload mit Scroll-Position)
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}
