"use client";
import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
export function Lanyard({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(min-width:1024px)");
    const update = () => setDesktop(q.matches);
    update();
    q.addEventListener("change", update);
    return () => q.removeEventListener("change", update);
  }, []);
  return (
    <div className="lanyard">
      <div className="lanyard-cord" />
      <motion.div
        drag={desktop && !reduced}
        dragConstraints={{ left: -24, right: 24, top: 0, bottom: 24 }}
        dragElastic={0.05}
        dragSnapToOrigin
        dragTransition={{ bounceStiffness: 600, bounceDamping: 50 }}
        className="licence-card"
      >
        {children}
      </motion.div>
    </div>
  );
}
