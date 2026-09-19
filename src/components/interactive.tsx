"use client";
import { useId, useState } from "react";
import { Plus, Minus, ArrowUpRight } from "lucide-react";
import type { FAQ, Market } from "@/content/types";
import { copy } from "@/content/site";
export function FAQList({ items }: { items: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const id = useId();
  return (
    <div className="faq-list">
      {items.map((faq, i) => (
        <div className="faq-item" key={faq.question}>
          <h3>
            <button
              aria-expanded={open === i}
              aria-controls={`${id}-${i}`}
              onClick={() => setOpen(open === i ? null : i)}
            >
              {faq.question}
              {open === i ? <Minus size={20} /> : <Plus size={20} />}
            </button>
          </h3>
          <div id={`${id}-${i}`} hidden={open !== i}>
            <p>{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
export function MarketTable({ markets }: { markets: Market[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  return (
    <div className="market-table">
      <div className="market-table-head meta">
        <span>{copy.region}</span>
        <span>{copy.countries}</span>
      </div>
      {markets.map((market, i) => (
        <div className="market-row" key={market.slug}>
          <button
            aria-expanded={open === i}
            aria-controls={`${id}-${i}`}
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span>{market.region}</span>
            <span className="market-count">
              {String(market.countries.length).padStart(2, "0")}
            </span>
            {open === i ? <Minus size={20} /> : <Plus size={20} />}
          </button>
          <div id={`${id}-${i}`} hidden={open !== i}>
            <div
              className="country-chips"
              tabIndex={0}
              role="region"
              aria-label={`${market.region} — ${copy.countries}`}
            >
              {market.countries.map((country) => (
                <span key={country.iso2}>{country.name}</span>
              ))}
            </div>
            <a className="text-link" href={`/markets#${market.slug}`}>
              {copy.support}
              <ArrowUpRight size={20} />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
