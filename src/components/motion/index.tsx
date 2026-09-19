'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { Children, type ReactNode } from 'react';
export function Reveal({ children, delay = 0, distance = 16, className = '' }: { children: ReactNode; delay?: number; distance?: number; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reduced ? 0 : 0.4, delay, ease: [0.22,1,0.36,1] }} data-reveal-distance={distance}>{children}</motion.div>;
}
export function RevealGroup({ children, stagger = 0.06, className = '' }: { children: ReactNode; stagger?: number; className?: string }) { return <div className={className}>{Children.map(children, (child, i) => <Reveal delay={i * stagger}>{child}</Reveal>)}</div>; }
export function Rule({ variant = 'full' }: { variant?: 'full' | 'inset' | 'vertical' }) { return <div aria-hidden="true" className={`rule rule-${variant}`} />; }
