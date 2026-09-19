"use client";
import { useRef, useState, type ReactNode } from "react";
export function ProductRail({
  children,
  label,
  count,
}: {
  children: ReactNode;
  label: string;
  count: number;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(1);
  return (
    <div className="product-rail">
      <div
        className="product-grid"
        ref={track}
        aria-label={label}
        role="region"
        tabIndex={0}
        onScroll={() => {
          const el = track.current;
          const first = el?.firstElementChild;
          if (el && first)
            setPosition(
              Math.min(
                count,
                Math.max(
                  1,
                  Math.round(
                    el.scrollLeft / (first.getBoundingClientRect().width + 16),
                  ) + 1,
                ),
              ),
            );
        }}
      >
        {children}
      </div>
      <div className="rail-position meta" aria-live="polite">
        <span>{label}</span>
        <span>
          {String(position).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
