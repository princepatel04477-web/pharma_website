"use client";
/** Clinical Paper adaptations. Registry provenance and behavioural changes: docs/REACT_BITS.md. */
import {
  Children,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type KeyboardEvent,
} from "react";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { Reveal } from "@/components/motion";
export function AnimatedContent({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return <Reveal delay={delay}>{children}</Reveal>;
}
function useReducedMotion() {
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion:reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}
export function SplitText({ text }: { text: string }) {
  return (
    <span>
      <span className="sr-only">{text}</span>
      {text.split("\n").map((line) => (
        <span aria-hidden="true" className="block" key={line}>
          {line}
        </span>
      ))}
    </span>
  );
}
export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) {
      setValue(to);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / 600);
          setValue(Math.round(to * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, reduced]);
  return (
    <span ref={ref}>
      <span className="sr-only">
        {to.toLocaleString("en-IN")}
        {suffix}
      </span>
      <span aria-hidden="true">
        {value.toLocaleString("en-IN")}
        {suffix}
      </span>
    </span>
  );
}
export function ScrollReveal({ children }: { children: ReactNode }) {
  return <Reveal>{children}</Reveal>;
}
export function LogoLoop({ items }: { items: string[] }) {
  return (
    <div className="logo-loop">
      <div className="logo-track">
        <div>
          {items.map((item) => (
            <span className="trust-chip" key={item}>
              {item}
            </span>
          ))}
        </div>
        <div aria-hidden="true">
          {items.map((item) => (
            <span className="trust-chip" key={item}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
export function Magnet({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <div
      className="inline-block magnet"
      style={{
        transform: reduced ? undefined : `translate(${pos.x}px, ${pos.y}px)`,
      }}
      onPointerMove={(e) => {
        if (reduced || e.pointerType !== "mouse" || window.innerWidth < 1024)
          return;
        const r = e.currentTarget.getBoundingClientRect();
        setPos({
          x: Math.max(
            -12,
            Math.min(12, (e.clientX - r.left - r.width / 2) * 0.08),
          ),
          y: Math.max(
            -12,
            Math.min(12, (e.clientY - r.top - r.height / 2) * 0.08),
          ),
        });
      }}
      onPointerLeave={() => setPos({ x: 0, y: 0 })}
    >
      {children}
    </div>
  );
}
export function GradualBlur({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(false);
  const update = () => {
    const el = ref.current;
    if (el) setOverflow(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  };
  useEffect(() => {
    update();
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div className={`overflow-frame ${overflow ? "has-overflow" : ""}`}>
      <div
        ref={ref}
        onScroll={update}
        className="table-scroll"
        tabIndex={0}
        role="region"
        aria-label="Scrollable specification table"
      >
        {children}
      </div>
    </div>
  );
}
export function CardNav({
  items,
}: {
  items: { label: string; href: string; detail: string }[];
}) {
  return (
    <nav className="card-nav" aria-label="Category navigation">
      {items.map((item) => (
        <a href={item.href} key={item.href}>
          <strong>{item.label}</strong>
          <p>{item.detail}</p>
          <ArrowRight size={20} />
        </a>
      ))}
    </nav>
  );
}
export function StaggeredMenu({ children }: { children: ReactNode }) {
  return <div className="staggered-menu">{children}</div>;
}
export function ScrollStack({ children }: { children: ReactNode }) {
  return (
    <div className="scroll-stack">
      {Children.map(children, (child, i) => (
        <div className="stack-item" style={{ top: `${120 + i * 16}px` }}>
          {child}
        </div>
      ))}
    </div>
  );
}
export function Stepper({
  steps,
  active,
  onChange,
}: {
  steps: { name: string; detail?: string }[];
  active?: number;
  onChange?: (step: number) => void;
}) {
  const [internal, setInternal] = useState(0);
  const current = active ?? internal;
  const change = (i: number) => {
    setInternal(i);
    onChange?.(i);
  };
  return (
    <div className="steps">
      {steps.map((step, i) => (
        <div
          className={`step ${current === i ? "is-active" : ""}`}
          key={step.name}
        >
          <button
            type="button"
            aria-current={current === i ? "step" : undefined}
            onClick={() => change(i)}
          >
            <span className="step-index">{String(i + 1).padStart(2, "0")}</span>
            <span>{step.name}</span>
            <ChevronDown size={20} />
          </button>
          {current === i && step.detail && <p>{step.detail}</p>}
        </div>
      ))}
    </div>
  );
}
export function Masonry({ children }: { children: ReactNode }) {
  return (
    <div className="masonry">
      {Children.map(children, (child) => (
        <div>{child}</div>
      ))}
    </div>
  );
}
export function FlowingMenu({
  items,
}: {
  items: { label: string; href: string }[];
}) {
  return (
    <nav className="flowing-menu" aria-label="Explore">
      {items.map((item) => (
        <a href={item.href} key={item.href}>
          {item.label}
          <ArrowRight size={24} />
        </a>
      ))}
    </nav>
  );
}
export function TiltedCard({ children }: { children: ReactNode }) {
  return <div className="flat-card">{children}</div>;
}
export function Carousel({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const count = Children.count(children);
  const move = (d: number) => {
    const el = ref.current;
    if (el)
      el.scrollBy({
        left: el.clientWidth * d,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  };
  return (
    <section aria-label={label} className="carousel">
      <div
        className="carousel-track"
        ref={ref}
        onScroll={() => {
          const el = ref.current;
          if (el) setIndex(Math.round(el.scrollLeft / el.clientWidth));
        }}
      >
        {Children.map(children, (child) => (
          <div className="carousel-slide">{child}</div>
        ))}
      </div>
      <div className="carousel-controls">
        <button
          aria-label="Previous item"
          disabled={index === 0}
          onClick={() => move(-1)}
        >
          <ArrowLeft size={20} />
        </button>
        <span className="meta">
          {index + 1} / {count}
        </span>
        <button
          aria-label="Next item"
          disabled={index >= count - 1}
          onClick={() => move(1)}
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
}
export function DotGrid() {
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
    <div aria-hidden="true" className="dot-grid" hidden={!desktop || !!reduced}>
      {desktop && !reduced && (
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="clinical-dots"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="0.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#clinical-dots)" />
        </svg>
      )}
    </div>
  );
}
export function handleArrowNavigation(event: KeyboardEvent<HTMLElement>) {
  if (
    ![
      "ArrowRight",
      "ArrowLeft",
      "ArrowDown",
      "ArrowUp",
      "Home",
      "End",
    ].includes(event.key)
  )
    return;
  const links = Array.from(
    event.currentTarget.querySelectorAll<HTMLAnchorElement>("a"),
  );
  const index = links.indexOf(document.activeElement as HTMLAnchorElement);
  const direction = ["ArrowRight", "ArrowDown"].includes(event.key) ? 1 : -1;
  const target =
    event.key === "Home"
      ? 0
      : event.key === "End"
        ? links.length - 1
        : (index + direction + links.length) % links.length;
  links[target]?.focus();
  event.preventDefault();
}
