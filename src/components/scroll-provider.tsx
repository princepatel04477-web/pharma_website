"use client";
import { useEffect } from "react";
import type Lenis from "lenis";
export function ScrollProvider() {
  useEffect(() => {
    const query = window.matchMedia(
      "(min-width:1024px) and (prefers-reduced-motion:no-preference)",
    );
    let instance: Lenis | undefined;
    let disposed = false;
    let generation = 0;
    const update = async () => {
      const current = ++generation;
      instance?.destroy();
      instance = undefined;
      if (!query.matches) return;
      const { default: LenisModule } = await import("lenis");
      if (!disposed && generation === current && query.matches)
        instance = new LenisModule({
          lerp: 0.09,
          autoRaf: true,
          anchors: true,
        });
    };
    void update();
    query.addEventListener("change", update);
    return () => {
      disposed = true;
      generation++;
      instance?.destroy();
      query.removeEventListener("change", update);
    };
  }, []);
  return <span hidden aria-hidden="true" />;
}
