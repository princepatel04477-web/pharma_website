"use client";
import { Children, useEffect, useRef, type ReactNode } from "react";
export function Reveal({
  children,
  delay = 0,
  distance = 16,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion:reduce)").matches)
      return;
    let animation: Animation | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          animation = el.animate(
            [
              { opacity: 0, transform: `translateY(${distance}px)` },
              { opacity: 1, transform: "translateY(0)" },
            ],
            {
              duration: window.innerWidth < 1024 ? 320 : 400,
              delay: delay * 1000,
              easing: "cubic-bezier(0.22,1,0.36,1)",
              fill: "backwards",
            },
          );
          observer.disconnect();
        }
      },
      { threshold: window.innerWidth < 1024 ? 0.15 : 0.2 },
    );
    // Keep the initial viewport visible for fast LCP and useful server-rendered content.
    if (el.getBoundingClientRect().top >= window.innerHeight)
      observer.observe(el);
    return () => {
      observer.disconnect();
      animation?.cancel();
    };
  }, [delay, distance]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
export function RevealGroup({
  children,
  stagger = 0.06,
  className = "",
}: {
  children: ReactNode;
  stagger?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      {Children.map(children, (child, i) => (
        <Reveal delay={i * stagger}>{child}</Reveal>
      ))}
    </div>
  );
}
export function Rule({
  variant = "full",
}: {
  variant?: "full" | "inset" | "vertical";
}) {
  return <div aria-hidden="true" className={`rule rule-${variant}`} />;
}
