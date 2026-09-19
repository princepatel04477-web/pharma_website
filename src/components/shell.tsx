"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { brand } from "@/config/brand";
import { navigation as nav } from "@/content/navigation";
import { StaggeredMenu, handleArrowNavigation } from "@/components/reactbits/basic";
export function Wordmark() {
  return (
    <span className="wordmark">
      <span className="brand-symbol" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span>{brand.tradingName}</span>
    </span>
  );
}
export function Header() {
  const path = usePathname();
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const mobilePanel = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const menuTrigger = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 8);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  useEffect(() => {
    if (!mega) return;
    const outside = (e: PointerEvent) => {
      if (
        e.target instanceof Node &&
        !panel.current?.contains(e.target) &&
        !trigger.current?.contains(e.target)
      )
        setMega(false);
    };
    const key = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setMega(false);
        trigger.current?.focus({ preventScroll: true });
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", key);
    };
  }, [mega]);
  useEffect(() => {
    if (!mobile) return;
    const returnFocus = menuTrigger.current;
    const y = window.scrollY;
    const previous = document.body.style.cssText;
    document.body.style.position = "fixed";
    document.body.style.top = `-${y}px`;
    document.body.style.width = "100%";
    const main = document.getElementById("site-content");
    const footer = document.getElementById("site-footer");
    const header = document.querySelector("header.site-header");
    header?.setAttribute("inert", "");
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");
    mobilePanel.current?.querySelector<HTMLButtonElement>("button")?.focus();
    const key = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setMobile(false);
      if (e.key === "Tab") {
        const targets = Array.from(
          mobilePanel.current?.querySelectorAll<HTMLElement>(
            "a,button,summary",
          ) ?? [],
        ).filter((el) => el.getClientRects().length);
        const first = targets[0],
          last = targets[targets.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    const resize = () => {
      if (window.innerWidth >= 1024) setMobile(false);
    };
    document.addEventListener("keydown", key);
    window.addEventListener("resize", resize);
    return () => {
      document.body.style.cssText = previous;
      header?.removeAttribute("inert");
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      window.scrollTo(0, y);
      document.removeEventListener("keydown", key);
      window.removeEventListener("resize", resize);
      returnFocus?.focus({ preventScroll: true });
    };
  }, [mobile]);
  const close = () => {
    setMobile(false);
    setMega(false);
  };
  return (
    <>
      <div className="utility">
        <div className="container">
          <span>{nav.labels.location}</span>
          <span>
            {nav.labels.verification}
            <span className="status-square" />
          </span>
        </div>
      </div>
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <div className="container header-inner">
          <Link
            href="/"
            aria-label={`${brand.tradingName} — ${nav.labels.home}`}
            onClick={close}
          >
            <Wordmark />
          </Link>
          <nav className="desktop-nav" aria-label={nav.labels.company}>
            <div
              onMouseEnter={() => {
                clearTimeout(timer.current);
                timer.current = setTimeout(() => setMega(true), 120);
              }}
              onMouseLeave={() => clearTimeout(timer.current)}
            >
              <button
                ref={trigger}
                className={path.startsWith("/products") ? "current" : ""}
                aria-expanded={mega}
                aria-controls="product-mega"
                onClick={() => setMega(!mega)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setMega(true);
                    setTimeout(
                      () => panel.current?.querySelector("a")?.focus(),
                      0,
                    );
                  }
                }}
              >
                {nav.labels.products}
                <ChevronDown size={20} />
              </button>
            </div>
            {nav.links.map((link) => (
              <Link
                className={path === link.href ? "current" : ""}
                aria-current={path === link.href ? "page" : undefined}
                href={link.href}
                key={link.href}
                onClick={close}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/trade-account"
            className="button primary header-cta"
            onClick={close}
          >
            {nav.labels.trade}
            <ArrowUpRight size={20} />
          </Link>
          <button
            className="mobile-toggle"
            aria-label={nav.labels.menu}
            aria-expanded={mobile}
            ref={menuTrigger}
            onClick={() => setMobile(true)}
          >
            <Menu size={24} />
          </button>
        </div>
        {mega && (
          <div
            className="mega-panel"
            id="product-mega"
            ref={panel}
            onMouseLeave={() => setMega(false)}
            onBlur={(e) => {
              if (
                !e.currentTarget.contains(e.relatedTarget) &&
                e.relatedTarget !== trigger.current
              )
                setMega(false);
            }}
            onKeyDown={handleArrowNavigation}
          >
            <div className="container mega-inner">
              <div className="mega-categories">
                {nav.products.map((p) => (
                  <Link
                    href={`/products/${p.slug}`}
                    key={p.slug}
                    onClick={close}
                  >
                    <span>
                      {p.name}
                      <ArrowUpRight size={20} />
                    </span>
                    <small>{p.scope}</small>
                  </Link>
                ))}
              </div>
              <aside>
                <span className="meta">{nav.labels.documentation}</span>
                <h2 className="display text-3xl">{nav.labels.fullCatalogue}</h2>
                <p>{nav.labels.catalogueNote}</p>
                <Link className="text-link" href="/catalogue" onClick={close}>
                  {nav.labels.catalogue}
                  <ArrowUpRight size={20} />
                </Link>
              </aside>
            </div>
          </div>
        )}
      </header>
      {mobile &&
        createPortal(
          <div
            className="mobile-overlay"
            role="dialog"
            aria-modal="true"
            aria-label={nav.labels.menu}
            ref={mobilePanel}
          >
            <StaggeredMenu>
              <div className="mobile-top">
                <Wordmark />
                <button
                  aria-label={nav.labels.close}
                  onClick={() => setMobile(false)}
                >
                  <X size={24} />
                </button>
              </div>
              <nav>
                <Link href="/" onClick={close}>
                  {nav.labels.home}
                </Link>
                <details>
                  <summary>
                    {nav.labels.products}
                    <ChevronDown size={20} />
                  </summary>
                  <div className="mobile-subnav">
                    <Link href="/products" onClick={close}>
                      {nav.labels.all}
                    </Link>
                    {nav.products.map((p) => (
                      <Link
                        href={`/products/${p.slug}`}
                        key={p.slug}
                        onClick={close}
                      >
                        {p.name}
                      </Link>
                    ))}
                  </div>
                </details>
                {nav.links.map((link) => (
                  <Link href={link.href} onClick={close} key={link.href}>
                    {link.label}
                  </Link>
                ))}
              </nav>
              <Link
                href="/trade-account"
                className="button primary"
                onClick={close}
              >
                {nav.labels.trade}
                <ArrowUpRight size={20} />
              </Link>
              <p className="meta">{nav.labels.preview}</p>
            </StaggeredMenu>
          </div>,
          document.body,
        )}
    </>
  );
}
