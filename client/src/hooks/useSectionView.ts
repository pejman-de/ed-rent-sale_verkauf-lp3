/**
 * useSectionView.ts
 * -----------------------------------------------------------------------
 * Nach client/src/hooks/useSectionView.ts kopieren (identisch für alle 3 LPs).
 * Trackt, wann eine bestimmte Sektion erstmals zu >=50% im Viewport sichtbar
 * wird - aussagekräftiger als reine Scroll-Prozentwerte, weil es sich direkt
 * auf konversionsrelevante Blöcke bezieht (Kategorien, Preise, Testimonials...).
 *
 * Verwendung, z.B. in VehicleCategories.tsx / Home.tsx:
 *
 *   const ref = useSectionView("vehicle_categories");
 *   return <section id="vehicles" ref={ref}>...</section>
 * -----------------------------------------------------------------------
 */
import { useEffect, useRef } from "react";
import { trackSectionView } from "@/lib/analytics";

export function useSectionView<T extends HTMLElement = HTMLDivElement>(sectionName: string) {
  const ref = useRef<T>(null);
  const hasFiredRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasFiredRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasFiredRef.current) {
          hasFiredRef.current = true;
          trackSectionView(sectionName);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionName]);

  return ref;
}
