# Pharma Export Site — Build Prompt Pack

**Target:** Indian (Surat) pharmaceutical wholesaler / exporter B2B site
**Stack:** Next.js 15 App Router · TypeScript (strict) · Tailwind v4 · Framer Motion · Lenis · React Bits · static content layer · one API route + Resend · Vercel
**Design system:** "Clinical Paper" — light editorial, regulated-trade credibility
**Agent:** Antigravity / Claude Code / Cursor
**Run order:** P00 → P13, sequentially. Review and commit between every prompt. Do not batch.

---

## 0. Before you start — read this section, don't paste it

### What we take from the reference and what we don't

We take the **information architecture** from `pharmazonglobal.com`: a wholesaler/exporter positioning, six product lines, a supply-chain services block, gated catalogue, trade-account qualification form, and compliance-badge trust signalling. That structure is the proven conversion pattern for this trade.

We do **not** lift their copy. Two reasons, both practical: their copy is written for a UK MHRA wholesaler selling into MEA, and ours is an Indian WHO-GMP exporter — the regulatory claims are different and wrong claims in this sector are a liability, not a typo. Second, duplicate copy tanks you in search against the site you copied. Every prompt below specifies copy intent and constraints; the agent writes it fresh.

### Placeholder brand

Working name: **ARVEX PHARMA**. It lives in exactly one file (`src/config/brand.ts`). Swap it there and it propagates. Every regulatory number (CDSCO licence, WHO-GMP cert no., IEC code, GSTIN, FSSAI) is a `TODO_` token — P11 adds a build check that fails if any survive to production. Never let the agent invent a licence number.

### The anti-slop contract

This is the single highest-leverage thing in the pack. P00 writes it to disk as `AGENTS.md` and every later prompt references it. It is what stops the agent from producing a purple-gradient SaaS landing page with a glassmorphic navbar.

---

## P00 — Foundation, brand config, and the rules file

~~~
Initialise a production Next.js 15 project for a B2B pharmaceutical export company.

SETUP
- npx create-next-app@latest: App Router, TypeScript, Tailwind, ESLint, src/ dir, no import alias changes beyond @/*
- Upgrade Tailwind to v4 (CSS-first config, @theme in globals.css — no tailwind.config.js colour definitions)
- Add: framer-motion, lenis, clsx, tailwind-merge, zod, resend
- tsconfig: strict true, noUncheckedIndexedAccess true, noImplicitOverride true
- ESLint: error on @typescript-eslint/no-explicit-any, no-console (allow console.error/warn only)

FONTS — next/font/google, self-hosted, variable where available:
- Display: Instrument Serif (400) → --font-display
- UI/body: Instrument Sans (variable) → --font-sans
- Data/codes: JetBrains Mono (400,500) → --font-mono
Set font-display: swap. Preload only the sans.

DESIGN TOKENS — define in globals.css under @theme. These are locked; do not add colours.
--color-paper:        #F4F5F3   /* page ground, cool bone */
--color-paper-2:      #FFFFFF   /* raised surfaces, cards */
--color-paper-3:      #EAEDEA   /* inset / wells / table stripes */
--color-ink:          #101314   /* primary text */
--color-ink-2:        #4E565A   /* secondary text */
--color-ink-3:        #8B9399   /* tertiary, labels, meta */
--color-rule:         #DDE2E0   /* hairlines — 1px, never 2px */
--color-accent:       #10564C   /* deep clinical teal — THE one saturated colour */
--color-accent-2:     #0B3E37   /* accent hover/pressed */
--color-accent-wash:  #E6EEEC   /* accent tint backgrounds only */
--color-signal:       #A16207   /* amber — Rx/restricted/licence-required badges ONLY */

SPACING & RHYTHM
- 8px base scale. Section vertical padding: 96px mobile / 160px desktop.
- Max content width 1280px, prose width 68ch, gutters 24px mobile / 48px desktop.
- Radius scale: 0 (rules, tables), 4px (inputs, badges), 8px (cards). Nothing above 8px. No pill buttons.

BRAND CONFIG — create src/config/brand.ts, typed, single source of truth:
export interface BrandConfig { legalName; tradingName; tagline; foundedYear; hq: {line1,line2,city,state,postcode,country}; phone; whatsapp; email: {sales,regulatory,general}; registrations: { cdscoLicence; whoGmpCertNo; isoCerts: string[]; iecCode; gstin }; stats: { skuCount; countriesServed; yearsTrading; manufacturingPartners } }
Populate with ARVEX PHARMA, Surat, Gujarat, India. Every registration value is the literal string "TODO_CDSCO_LICENCE" etc. Stats are real-looking placeholders (2400 SKUs, 38 countries, 14 years, 60 partners) and MUST be marked with a // VERIFY comment.

RULES FILE — create AGENTS.md at repo root with exactly this content, verbatim:

# Build rules — do not violate

## Audience
Import licence holders, pharmaceutical distributors, government tender agents, and hospital procurement buyers in Africa, CIS, Latin America and Southeast Asia. They are risk-averse professionals verifying whether we are a real, compliant, shippable supplier. Every design decision is judged against: does this increase or decrease their confidence that we can clear customs in their country?

## Visual law
- The palette above is complete. Adding a colour is a bug.
- Exactly ONE saturated element may be visible in any viewport at rest. Accent is for a single CTA, a single active state, or a single data highlight — never three at once.
- Hairlines (1px, --color-rule) do the structural work. Not shadows. Permitted shadow: one, `0 1px 2px rgb(16 19 20 / 0.04)`, on raised cards only. No glow, no coloured shadow, no inner shadow.
- No gradients on text. No gradients on buttons. A gradient may only appear as a >=200px-wide atmospheric wash at <=6% opacity.
- No glassmorphism. No backdrop-blur except on the sticky nav at scroll (max 8px).
- No emoji anywhere in the UI. Icons are 1.5px-stroke line icons (lucide-react), 20px or 24px, inherit currentColor.
- Photography is greyscale-to-2%-warm or full colour, never duotone-teal. If a real photo is unavailable, use a typographic or diagrammatic block — never a stock-photo placeholder of a smiling person in a lab coat.

## Typography law
- Display serif (Instrument Serif) appears at 32px and above only. Never for UI, buttons, labels, or body.
- Body copy 16px/1.65 minimum, ink-2. Never below 14px except mono meta.
- Mono (JetBrains) is reserved for: SKUs, ATC codes, pack sizes, molecule strengths, licence numbers, HS codes, order references. Uppercase tracking-widest 11px mono is the label style.
- Sentence case for headings. No Title Case. No ALL CAPS except 11px mono labels.
- No orphan-prone measures: headings max 24ch, body max 68ch.

## Motion law
- Durations 200–600ms. Easing: cubic-bezier(0.22, 1, 0.36, 1) for entrances, cubic-bezier(0.4, 0, 0.2, 1) for state.
- Entrance = opacity 0→1 plus translateY 16px→0. That is the default and it is usually correct.
- Parallax, scroll-scrub pinning and 3D transforms: desktop only, max ONE instance per page.
- Everything respects prefers-reduced-motion: animations become instant opacity changes, WebGL unmounts.
- No looping animation is visible after 4 seconds of a section being idle, except the certification marquee.

## Code law
- No `any`. No `as unknown as`. No non-null `!` assertions on data from the content layer.
- No console.log in committed code.
- No placeholder text, no lorem ipsum, no `// TODO: implement`, no stub components that render null. Every component ships complete.
- Server Components by default. 'use client' only on files that need state, effects, or event handlers — push it to leaves.
- All content comes from the typed content layer (P03). No hardcoded product names, copy, or numbers inside JSX.
- Every image uses next/image with explicit width/height or fill + sizes. Every interactive element has an accessible name. Colour contrast >= 4.5:1 for text.

## Compliance law
- Never generate a licence number, certificate number, registration ID, or regulatory claim. Use the TODO_ tokens from brand.ts.
- Never state that a product is approved in a market. Say what we hold (WHO-GMP, Schedule M) and what we support (dossier preparation, CTD/ACTD filing).
- Never show pricing publicly.
- Rx-classified categories must carry a visible "import licence required" notice.

DELIVERABLE: clean repo, `npm run build` passes, `npm run lint` passes with zero warnings, AGENTS.md committed, brand.ts typed and populated. Do not build any page yet.
~~~

**Review gate:** open `globals.css` and confirm no colour exists outside the token list. Confirm `AGENTS.md` is on disk.

---

## P01 — React Bits: install, whitelist, and wrap

This is where most builds go wrong. React Bits is a copy-in library — the agent will paste components that fight the design system unless you constrain it.

~~~
Read AGENTS.md first and obey it.

Install React Bits components into src/components/reactbits/ via the CLI (npx jsrepo add / shadcn-style copy-in). Install ONLY the components on the whitelist. Do not install anything else. Do not install any WebGL/shader background except DotGrid.

WHITELIST — install these, exact list:
Text:        SplitText, CountUp, ScrollReveal
Animations:  AnimatedContent, LogoLoop, Magnet, GradualBlur
Components:  CardNav, StaggeredMenu, ScrollStack, Stepper, Masonry, FlowingMenu, TiltedCard, Carousel, Lanyard
Backgrounds: DotGrid

BLACKLIST — explicitly forbidden in this project. If any later prompt seems to call for one, stop and flag it instead:
All cursor effects (BlobCursor, SplashCursor, GlowCursor, TargetCursor, ClickSpark, PixelTrail, ImageTrail, Crosshair, SwarmCursor, GhostCursor)
All novelty text (GlitchText, FuzzyText, DecryptedText, ScrambledText, ASCIIText, TextType, FallingText, TextPressure, WarpText, ParticleText)
All shader/particle backgrounds (Aurora, Balatro, Hyperspeed, Galaxy, Plasma, LiquidChrome, Iridescence, Ballpit, MetaBalls, FaultyTerminal, LetterGlitch, Dither, PixelBlast, Silk, Threads, LightRays, Prism, DarkVeil, Lightning, Orb, Waves, Beams)
ElectricBorder, StarBorder, BorderGlow, SpotlightCard, ChromaGrid, MagicBento, FluidGlass, GlassSurface, GlassIcons, Dock, InfiniteMenu, DomeGallery, FlyingPosters, DecayCard, Noise, MetallicPaint

RATIONALE (enforce it): our buyers are pharmaceutical import licence holders performing supplier due diligence. Novelty effects read as an agency demo, not a GDP-compliant exporter. The whitelist is chosen because each item does a job a plain div cannot: LogoLoop = certification marquee, ScrollStack = six services without six screens of scroll, Stepper = trade-account onboarding, Lanyard = physical licence-card metaphor on the compliance page, Masonry = certificate gallery, CountUp = scale proof, DotGrid = the only permitted ambient texture.

RE-SKIN — do not use any React Bits component raw. For each installed component:
1. Strip its bundled dark-theme colours, gradients, glows, and border-radius values.
2. Rewire every visual value to our tokens (paper/ink/rule/accent) and our radius scale (0/4/8).
3. Reduce default animation durations to our 200–600ms band and our easing curves.
4. Add a prefers-reduced-motion branch that renders the static end-state.
5. DotGrid specifically: ink at 4% opacity, dot size 1px, spacing 32px, no mouse-reactive glow, and it must unmount below 1024px and under reduced-motion.

WRAPPERS — create src/components/motion/ with three project primitives that everything else uses:
- <Reveal as? delay? distance?> — opacity + Y entrance, IntersectionObserver, once:true, threshold 0.2, respects reduced motion. This is the default entrance for 90% of the site.
- <RevealGroup stagger?> — staggers Reveal children by 60ms.
- <Rule variant="full"|"inset"|"vertical"> — the 1px hairline used as the structural divider across the site.

DELIVERABLE: a /dev/kitchen-sink route (excluded from sitemap, noindex) rendering every whitelisted component re-skinned on the paper ground, so I can review them in one screen before any page exists. Build and lint pass.
~~~

**Review gate:** load `/dev/kitchen-sink`. Anything that still looks like a dark-mode demo gets fixed here, not later.

---

## P02 — Layout shell, navigation, footer

~~~
Read AGENTS.md. Build the persistent shell.

ROUTES to register in nav (pages come later):
/ · /about · /products · /products/[category] · /services · /quality · /markets · /catalogue · /contact
Legal (footer only): /privacy · /terms · /quality-policy · /modern-slavery-statement

HEADER — desktop >=1024px
- Utility strip (32px, accent-wash ground, mono 11px uppercase): HQ city · regulatory email · phone · a right-aligned "WHO-GMP certified partner facilities" line. Scrolls away, does not stick.
- Main bar sticks. Ground paper-2 with a bottom hairline. At scrollY>8 add backdrop-blur(8px), paper-2 at 88% alpha, and the shadow token. No size change, no logo shrink animation.
- Wordmark left (Instrument Serif, 22px, ink). Nav centre. Right: a ghost "Download catalogue" link and a solid accent "Open trade account" button.
- Products is a mega-panel, not a dropdown list: a 3-column grid of the six product lines, each with name, one-line scope, and mono SKU count; a fourth column holds a bordered "Request full catalogue" block. Opens on hover with 120ms intent delay, closes on Escape and outside click, full keyboard support (arrow keys within, Escape returns focus to trigger).

HEADER — mobile <1024px
- Collapse at exactly 1024px.
- Use React Bits StaggeredMenu, re-skinned: paper ground, ink type, hairline separators, accent only on the single primary CTA. Clip-path entrance from top-right.
- 100dvh not 100vh. Scroll lock via position:fixed + stored scrollY, restored on close.
- Portal the overlay to document.body — transformed ancestors break fixed positioning.
- Product lines are a nested accordion inside the overlay, not a second screen.

FOOTER
- Four columns on desktop, stacked on mobile: (1) wordmark, one-sentence positioning, HQ address block, (2) Products — six lines, (3) Company — About, Services, Quality & Compliance, Markets, Contact, (4) Documentation — Catalogue, Trade account, Quality policy, Privacy, Terms.
- Compliance strip above the legal line: a hairline-bordered row of registration labels rendered in mono uppercase 11px — CDSCO licence, WHO-GMP, ISO 9001:2015, ISO 14001, IEC — each value pulled from brand.ts (so it renders the TODO_ tokens for now). No badge images.
- Legal line: © year, legal name from brand.ts, "Exports subject to destination-country regulatory approval." — this sentence is required.

GLOBAL
- Lenis smooth scroll, lerp 0.09, disabled under prefers-reduced-motion and below 1024px (mobile keeps native momentum).
- Route transitions: 220ms crossfade only. No slide, no curtain, no page-wipe.
- Skip-to-content link, visible on focus.
- Focus ring: 2px accent outline, 2px offset, on every interactive element. Never outline:none without a replacement.

DELIVERABLE: shell renders on every registered route with a placeholder <main>. Mega-panel keyboard-navigable. Mobile overlay tested at 375px and on iOS Safari viewport. Build and lint pass.
~~~

**Review gate:** test the mobile overlay on a real iPhone before moving on. Scroll-lock restoration is the thing that breaks.

---

## P03 — Typed content layer

Static build, so the content layer *is* the CMS. Get this right and P04–P09 become assembly.

~~~
Read AGENTS.md. Build the typed content layer. No page may hardcode copy after this prompt.

Create src/content/ with typed TS modules (not MDX — we need structured fields, not prose blobs). Every export is typed and validated with zod at module load in dev.

TYPES — src/content/types.ts
ProductCategory: { slug; name; shortName; scope (one line); description (2–3 sentences); skuCount; rxClassified: boolean; importLicenceRequired: boolean; subGroups: string[]; representativeMolecules: { name; strengths: string[]; forms: string[] }[]; dosageForms: string[]; packagingOptions: string[]; shelfLifeMonths; documentationProvided: string[]; heroImage; icon }
Service: { slug; name; summary; detail; deliverables: string[]; icon }
Certification: { code; name; issuingBody; scope; valueKey (key into brand.registrations); documentUrl?: string }
Market: { region; countries: { name; iso2 }[]; registrationSupport: string; notes }
FAQ: { question; answer; category }
Stat: { valueKey; label; suffix? }

SEED CONTENT — write it properly, this is real copy:

Six product categories:
1. generic-formulations — generic finished formulations. Tablets, capsules, oral liquids, injectables. Anti-infectives, cardiovascular, anti-diabetics, analgesics, gastro. Rx, licence required.
2. branded-generics — branded generics for markets where brand recall drives pharmacy sell-through. Rx, licence required.
3. otc-products — over-the-counter: analgesics, antacids, cough and cold, topicals, oral care. Not Rx.
4. nutraceuticals — vitamins, minerals, protein supplements, herbal/ayurvedic extracts. FSSAI scope. Not Rx.
5. surgical-diagnostics — consumables, disposables, diagnostic kits, basic medical devices. Licence varies by destination.
6. personal-care-fmcg — hygiene, antiseptics, skin and hair care, sanitisers. Not Rx.

Copy constraints for every category description: state what we supply, the therapeutic or functional scope, the regulatory classification, and what documentation ships with it (CoA, MSDS, stability data, GMP certificate, Free Sale Certificate where applicable). Do not claim efficacy. Do not name real brand-name drugs under trademark — use molecule names only (paracetamol, amoxicillin, metformin, amlodipine, azithromycin, omeprazole). 6–10 representative molecules per Rx category with realistic strengths and forms.

Six services:
regulatory-dossier-support (CTD/ACTD compilation, country-specific registration files, artwork and labelling to destination requirements)
private-label-contract-manufacturing (your brand, our WHO-GMP partner facilities, MOQ and lead-time framing)
bulk-institutional-supply (government tenders, NGO and hospital procurement, tender documentation)
export-logistics-documentation (invoice, packing list, COO, HS classification, shipping-line coordination)
cold-chain-temperature-controlled (validated shippers, data loggers, excursion protocol)
quality-assurance-batch-release (pre-shipment sampling, CoA verification, retention samples)
Each: a one-line summary, a 3–4 sentence detail, and 3–5 concrete deliverables.

Certifications: WHO-GMP (partner facilities), Schedule M compliance, ISO 9001:2015, ISO 14001:2015, CDSCO wholesale/export licence, FSSAI (nutraceutical scope), IEC registration. Each with issuing body, what it actually covers, and the brand.ts key holding its number.

Markets — four regions with real country lists:
Africa (Nigeria, Kenya, Ghana, Tanzania, Uganda, Ethiopia, Zambia, Ivory Coast, Cameroon, Senegal, Mozambique, Rwanda)
CIS & Central Asia (Uzbekistan, Kazakhstan, Kyrgyzstan, Tajikistan, Azerbaijan, Georgia, Armenia, Belarus)
Southeast Asia (Vietnam, Philippines, Cambodia, Myanmar, Sri Lanka, Nepal, Bangladesh)
Latin America (Peru, Bolivia, Ecuador, Guatemala, Dominican Republic, Paraguay)
Each region gets a registrationSupport paragraph describing what filing support we provide there in general terms — no claims that a specific product is registered.

FAQs: 10 covering MOQ, lead time, payment terms (LC / TT — framing only, no rates), documentation supplied, sample policy, private-label MOQ, shipment modes, product registration responsibility, licence requirements, shelf-life guarantee on arrival.

ACCESSORS — src/content/index.ts exporting getCategories(), getCategory(slug), getServices(), getCertifications(), getMarkets(), getFAQs(). Typed returns, no any, no optional chaining into unknown shapes.

DELIVERABLE: content layer complete and zod-validated, a /dev/content route dumping it all as readable JSON for my review. Build and lint pass. No pages yet.
~~~

**Review gate:** read `/dev/content` end to end. Fix copy here once; fixing it across nine pages later costs ten times more.

---

## P04 — Home: hero and trust band

~~~
Read AGENTS.md and src/content. Build the homepage above-the-fold and the trust band. Nothing below it yet.

HERO — full-bleed, min-height 88dvh desktop / auto with 96px padding mobile, paper ground.
Layout is an asymmetric 7/5 editorial split, not a centred stack.

Left column (7):
- Mono 11px uppercase eyebrow, ink-3: "Surat, Gujarat · India" then a hairline then "Pharmaceutical export & wholesale distribution"
- H1, Instrument Serif, clamp(40px, 6vw, 76px), line-height 1.02, ink, max 18ch. Content intent: the company supplies compliant finished formulations to regulated import markets. Write it as a statement of capability, not a slogan. No "Your trusted partner in…", no "Empowering health", no "Excellence in". Two lines maximum.
- Sub-paragraph, 18px/1.6, ink-2, max 52ch: who we serve (importers, distributors, tender agents), across which regions, with what backing (WHO-GMP partner facilities, full export documentation).
- CTA row: primary solid accent "Open trade account" (wrapped in React Bits Magnet, strength low — 12px max travel, desktop only), secondary ghost with hairline border "Download product catalogue". Below them, mono 11px: "Import licence required for Rx categories."

Right column (5):
- A bordered specification panel, paper-2 ground, 1px rule, radius 8. Inside, a hairline-separated definition list in mono/sans pairs pulled from brand.ts and content:
  SKUs in catalogue / countries served / years trading / partner facilities / certifications held
- Values animate once with React Bits CountUp (1.2s, ease-out, triggers on view, static under reduced motion). Labels are mono 11px uppercase ink-3, values are Instrument Sans 32px ink.
- Below the panel, a single line of ink-3 12px: last catalogue revision date (from brand.ts, VERIFY-commented).

Background: React Bits DotGrid at 4% ink, desktop only, positioned behind the left column only, masked to fade out before it reaches the spec panel. Nothing else. No image, no video, no shape.

Entrance: RevealGroup — eyebrow, H1 (React Bits SplitText by line, not by character, 480ms, 40ms line stagger), paragraph, CTAs, then the panel. Total sequence under 1.1s. Static under reduced motion.

TRUST BAND — directly below hero, paper-3 ground, 1px rule top and bottom, 72px tall desktop.
- React Bits LogoLoop, re-skinned: no gradient edge masks in colour — use a paper-3 fade. 40s duration, pauses on hover, pauses under reduced-motion.
- Items are NOT logos (we don't have licensed badge artwork). Each item is a hairline-bordered chip: mono 11px uppercase certification code + a 16px line icon. WHO-GMP · Schedule M · ISO 9001:2015 · ISO 14001:2015 · CDSCO licensed · FSSAI · GDP-aligned cold chain · IEC registered.
- Left of the marquee, fixed and not scrolling: mono 11px ink-3 "Compliance".

ACCESSIBILITY: H1 is the only h1. Marquee has aria-hidden on the duplicated track. CountUp exposes the final value to screen readers immediately.

DELIVERABLE: hero + trust band at 375 / 768 / 1280 / 1920. Lighthouse performance >= 95 on this partial page. CLS 0.
~~~

---

## P05 — Home: body sections

~~~
Read AGENTS.md and src/content. Build the rest of the homepage, in this order.

1. POSITIONING — a short editorial block, not a card grid.
Two-column, 5/7. Left: mono 11px section label "01 — Who we supply" and a Rule. Right: three short paragraphs (max 68ch) on who buys from us and what problem we remove — sourcing compliant product from India without managing twenty manufacturer relationships and twenty document sets. Use React Bits ScrollReveal on the paragraph block only (word-level opacity reveal, subtle, 0.3 → 1, no blur, no rotation). Close with an inline accent text link to /about.

2. PRODUCT LINES — the core section.
Section label "02 — Product lines". A 3×2 grid on desktop, 1 column mobile, of the six categories from content.
Each card: paper-2, 1px rule, radius 8, no shadow at rest. Inside — 24px line icon, category name (Instrument Sans 20px semibold ink), scope line (ink-2 15px), a Rule, then a mono meta row: SKU count · dosage form count · and an amber "Licence required" chip where importLicenceRequired is true. Whole card is a link to /products/[slug].
Hover (desktop only): border goes accent, the icon goes accent, a 1px accent underline draws left-to-right under the name over 240ms. Nothing lifts, nothing scales, nothing glows.
Wrap each in React Bits TiltedCard with maximum restraint: 4 degrees max, scale 1, no glare, no shadow — and disable it entirely below 1024px.
Section CTA below the grid: ghost button to /products.

3. CAPABILITIES — React Bits ScrollStack, the six services from content.
Desktop: pinned stack, cards stack with 16px offset and scale 0.98 per depth, paper-2 with hairline, each card 520px tall. Card content: mono index, service name in Instrument Serif 32px, summary, then deliverables as a hairline-separated list with 16px check icons in accent.
Mobile: DO NOT pin. Render as six normal-flow sections separated by Rules, each with a plain Reveal entrance. This is non-negotiable — pinned scrub sections on mobile are the single worst pattern we ship.
Section label "03 — Supply chain capability".

4. GLOBAL REACH — the four regions from content.
Left 5: label "04 — Markets served", a heading, a paragraph, a CountUp of countriesServed, and a ghost CTA to /markets.
Right 7: a hairline table (not a map image, not a WebGL globe). Columns: Region · Countries · Registration support. Rows expand on click to reveal the country list as mono 12px chips. Zebra with paper-3. Fully keyboard operable, aria-expanded wired.

5. PROCESS — React Bits Stepper, re-skinned, horizontal desktop / vertical mobile. Five steps: enquiry & product list → quotation & pro-forma → trade account verification & licence check → production or allocation & QC release → documentation, shipment & tracking. Each step: mono index, name, one sentence. Accent only on the active step indicator. Section label "05 — How an order runs".

6. FAQ — six of the ten FAQs, hairline accordion, one open at a time, chevron rotates 180deg over 200ms. Link to the rest on /contact. Section label "06 — Common questions".

7. CLOSING CTA — full-bleed, ink ground (this is the ONE dark band on the site — it is the full stop, so it must earn it).
Centred, max 640px. Instrument Serif 44px on paper. One paragraph in a paper/70 tint. Two buttons: solid accent "Open trade account", ghost with paper-border "Request catalogue". Below, mono 11px paper/50: regulatory email and phone from brand.ts, and the "Exports subject to destination-country regulatory approval" line.
No background effect in this band. Flat ink. That's the point.

Every section separated by a Rule, not by whitespace alone. Section labels are mono 11px uppercase ink-3, always paired with a Rule.

DELIVERABLE: full homepage. Scroll it once at 1280 and once at 390 and confirm nothing pins, parallaxes or scrubs on mobile. Build, lint, Lighthouse >= 92 performance / 100 accessibility.
~~~

**Review gate:** this is the page that decides whether the site reads premium or generic. Screenshot it, look at it cold the next morning, then move on.

---

## P06 — Products index and category pages

~~~
Read AGENTS.md and src/content. Build /products and /products/[category].

/products — index
- Page header: mono label, Instrument Serif h1, a 60ch intro paragraph, and a mono stat row (total SKUs · categories · dosage forms).
- Then the six categories as full-width editorial rows, not cards. Each row: 3/9 split — left is the mono index and category name; right is scope, sub-groups as hairline chips, and the meta row. Rule between rows. Whole row links through; hover moves an accent arrow 8px right.
- A persistent bordered aside (sticky on desktop) offering the catalogue download → links to /catalogue.

/products/[category] — generateStaticParams over all six
- Breadcrumb (mono, accent on current).
- Header: category name in Instrument Serif, scope line, and — where rxClassified — an amber-bordered notice block: import licence required, product availability subject to destination registration. This block is mandatory and appears above the fold.
- "What we supply" — the description plus subGroups as a hairline grid.
- "Representative molecules" — a real table. Columns: Molecule (mono) · Strengths (mono) · Dosage forms · Category. Sticky header, zebra paper-3, horizontal scroll on mobile with a GradualBlur edge fade (React Bits) on the overflowing side. Above it, mono 11px ink-3: "Indicative list. Full catalogue available on trade account approval."
- "Packaging & specification" — a two-column definition list: dosage forms, packaging options, shelf life, primary packaging materials, labelling languages supported, batch coding.
- "Documentation supplied with every shipment" — the documentationProvided list, hairline-separated, 16px accent line icons.
- "Related capability" — pull 2–3 relevant services from content, as compact linked cards.
- Enquiry block — category-specific: a bordered panel, paper-2, pre-filling the category into the enquiry form and linking to /contact?category=[slug]. Headline names the category explicitly.
- Prev/next category navigation at the foot, hairline-bordered, showing both neighbour names.

Every page: unique metadata, canonical, and JSON-LD (Product category → use schema.org ItemList of OfferCatalog, plus Organization). No Product schema with price — we publish no prices.

Motion budget on these pages: Reveal entrances only. No ScrollStack, no tilt, no pinning. These are reference pages and buyers scan them; movement is friction here.

DELIVERABLE: all seven routes static-generated, tables usable at 375px, build and lint pass.
~~~

---

## P07 — Quality & compliance

The page that closes the deal. Give it the most attention.

~~~
Read AGENTS.md and src/content. Build /quality.

Positioning: this page exists so a procurement officer can verify us in ninety seconds and forward the URL to their regulatory colleague.

1. HEADER — mono label "Quality & compliance", Instrument Serif h1, a 60ch paragraph stating what we hold and what we do not claim. Include verbatim: we do not represent that any product is registered in a destination market; registration is supported, market-specific, and the importer's responsibility. This honesty is a trust asset — do not soften it.

2. CREDENTIALS — the certifications from content as a hairline grid, 2 columns desktop.
Each: code in mono uppercase accent, full name in Instrument Sans 18px, issuing body in ink-3 12px, a Rule, then a 2-sentence scope statement, then the registration value from brand.ts rendered in mono — which currently prints TODO_ tokens. Where documentUrl exists, a ghost "View certificate (PDF)" link with a 16px document icon.

3. LICENCE CARD — React Bits Lanyard, heavily re-skinned. A physical-card metaphor: a paper-2 card on a hairline-thin cord, hanging from the section's top rule, with light physics drag. On the card: the wordmark, "CDSCO wholesale & export licence", the mono TODO_ licence token, issuing authority, and validity. Desktop >=1024px only; below that render the same card statically, no physics. Unmounts entirely under prefers-reduced-motion. This is the ONE piece of theatre on the site and it must look like a laminated licence card, not a game object — no gloss, no bounce overshoot beyond 1 cycle, no colour beyond the palette.

4. QUALITY SYSTEM — six pillars as an AnimatedContent staggered list with 24px line icons: supplier qualification and audit, incoming material verification, in-process controls at partner facilities, finished-product testing and CoA, stability data and shelf-life assurance, batch traceability and retention samples. Each 2–3 sentences.

5. DOCUMENTATION PACK — what ships with every consignment, as a numbered hairline list in two columns: Certificate of Analysis, GMP certificate, Free Sale Certificate (where applicable), MSDS, packing list, commercial invoice, certificate of origin, shipping documents, stability summary on request. Mono numbering.

6. FACILITY & PARTNER STANDARDS — React Bits Masonry gallery. If real photography is unavailable, do NOT use stock photos: instead render a masonry of bordered typographic cards, each stating one facility standard (controlled areas, HVAC classification, water system, QC laboratory scope, warehouse temperature mapping, documentation practices) with a mono label and a short line. Leave a clearly commented swap point where real images drop in.

7. PHARMACOVIGILANCE & RECALL — a bordered ink-ground block. Short, serious, no decoration: complaint handling route, recall procedure, regulatory contact email from brand.ts. Buyers look for this.

8. CTA — ghost to /contact, solid accent to /trade-account.

SEO: JSON-LD Organization with hasCredential entries per certification. Metadata targeting "WHO-GMP pharmaceutical exporter India", "CDSCO licensed pharma exporter", "pharmaceutical export documentation India".

DELIVERABLE: /quality complete, Lanyard restrained and correct, zero invented regulatory values, build and lint pass.
~~~

---

## P08 — Markets, About, Services

~~~
Read AGENTS.md and src/content. Build three pages in one pass — they share a template.

/markets
- Header: label, h1, paragraph, CountUp of countries served.
- Four region sections, each: region name in Instrument Serif, the registrationSupport paragraph, and the country list as a hairline grid of mono 12px chips with ISO2 codes. Rule between regions. Sticky region sub-nav on desktop (hairline, accent on active, scrollspy).
- "Registration support" block: what we provide (CTD/ACTD dossier compilation, country-specific documentation, artwork and labelling adaptation, sample and stability data supply, agent coordination) and — stated plainly — what remains the importer's responsibility.
- No map graphic, no globe. A hairline data table beats a decorative world map for this audience.

/about
- Header with the founding year and positioning, pulled from brand.ts.
- "How we operate" — three short editorial paragraphs: the sourcing model (qualified WHO-GMP partner facilities rather than a single plant), the documentation discipline, the market focus.
- A horizontal hairline timeline of milestones (React Bits AnimatedContent stagger, desktop horizontal / mobile vertical). Mark milestone content with // VERIFY comments — do not invent history beyond generic, defensible entries.
- "Why source from Surat / Gujarat" — three points on the manufacturing cluster, port access (Hazira / Mundra / JNPT), and cost structure. Factual, no boosterism.
- Leadership: a clean hairline grid with name, role, and a one-line remit. Use TODO_ tokens for names and a commented swap point. No stock headshots, no circular avatars with placeholder initials — render a bordered typographic block until real photos exist.
- Closing CTA band.

/services
- Header, then the six services from content as alternating 6/6 editorial blocks with a Rule between: mono index, name in Instrument Serif 36px, detail paragraph, deliverables as a hairline-separated list with accent line icons, and a text link to the most relevant product category.
- Then "Engagement models": three bordered columns — spot purchase, annual contract, private label / contract manufacturing. Each with a one-line fit statement and a mono meta row (indicative MOQ band, indicative lead-time band, documentation scope). Indicative only, no pricing, mark with // VERIFY.
- Closing CTA.

Motion: Reveal and AnimatedContent only across all three. No pinning, no tilt, no stacking.

DELIVERABLE: three routes complete with unique metadata and JSON-LD, build and lint pass.
~~~

---

## P09 — Catalogue gate, trade account, contact, and the API route

The conversion machinery. Static site, one API route.

~~~
Read AGENTS.md. Build the lead capture system.

SHARED FORM PRIMITIVES — src/components/forms/
Inputs: paper-2 ground, 1px rule, radius 4, 44px min height, 16px text (prevents iOS zoom). Label above, mono 11px uppercase ink-3. Focus: border accent + 2px accent ring. Error: border signal-red-free — use ink with a 1px signal border and a 12px signal message below with a 14px alert icon. Never colour-only error signalling; always icon + text.
Validation: zod schemas shared between client and the route handler. Validate on blur, re-validate on change once touched. Never validate on first keystroke.
Submit states: idle → submitting (button label swaps, spinner, disabled, aria-busy) → success (the form is REPLACED by a bordered confirmation block stating what happens next and the expected response window) → error (inline, retry preserved, form data intact).
Honeypot field + a 3-second minimum time-to-submit check. No CAPTCHA.

/catalogue
- Split layout. Left: what the catalogue contains (category coverage, SKU count, molecule index, packaging specs, documentation list), a mono revision date, and a note that pricing is quoted separately against an enquiry.
- Right: bordered form panel. Fields: full name, company, business email (reject free-mail domains with a clear, non-insulting message — "Please use your company email so we can verify your business"), phone with country code, country select (full ISO list), business type (importer / distributor / pharmacy chain / hospital or institution / tender agent / other), import licence held (yes / in process / no), categories of interest (multi-select, from content).
- On success: confirmation block plus the file served — a real PDF at /public/catalogue/, or if unavailable, a clearly commented placeholder route and a message that the catalogue is sent by email within one business day.

/trade-account
- React Bits Stepper, vertical on mobile, four steps with progress persisted to sessionStorage so a refresh doesn't wipe the form:
  1 Company details — legal name, trading name, country, city, website, year established
  2 Regulatory — import/wholesale licence number, issuing authority, expiry, upload field for licence copy (accept PDF/JPG/PNG, 10MB max, client-side type and size validation)
  3 Trade profile — product categories, indicative annual volume band, order frequency, target markets, incoterms preference, payment terms preference (LC / TT / other)
  4 Contact — name, role, email, phone, WhatsApp, preferred contact method and time zone
- Step validation blocks forward navigation; back is always free. Review summary on the final step with edit links per section.
- Success: confirmation stating the verification process and a 2-business-day response commitment.

/contact
- Three-column top row: sales enquiries, regulatory & documentation, general — each with the email from brand.ts, a WhatsApp link, and a one-line "use this for" statement.
- HQ address block, mono, with an embedded map only as a static image with a link out (no iframe — it costs a third of your performance budget).
- General enquiry form: name, company, country, email, phone, category (pre-fills from ?category= query param), message. 
- The remaining four FAQs below the form.

API — app/api/enquiry/route.ts, a single handler, runtime nodejs
- Zod-parse by form type discriminant. Rate limit by IP: 5 requests / 10 minutes, in-memory LRU (documented as a known limitation of the static deploy).
- Resend: two emails per submission — an internal notification to the relevant brand.ts inbox with every field in a readable table and a clear subject line carrying form type + country + company; and an acknowledgement to the submitter, plain and professional, restating what they sent and the response window.
- Attachments (licence copy) forwarded on the internal email only.
- Return typed JSON. Never leak the Resend error to the client — log server-side with console.error, return a generic failure message with a fallback direct email address.
- Env: RESEND_API_KEY, ENQUIRY_TO_SALES, ENQUIRY_TO_REGULATORY, ENQUIRY_FROM. Add .env.example. Fail the build at startup if any is missing in production.

DELIVERABLE: all three routes, working end to end against a real Resend test key, every failure path exercised (network off, 500 from Resend, oversized upload, duplicate rapid submit). Build and lint pass.
~~~

---

## P10 — SEO, structured data, and the compliance guard

~~~
Read AGENTS.md. Ship the discoverability and safety layer.

METADATA
- generateMetadata on every route: unique title (<=60 chars), description (<=155), canonical, openGraph, twitter card.
- Title pattern: "{Page} — {tradingName} | Pharmaceutical Exporter, India". Category pages lead with the category and a market qualifier.
- Target queries to write toward, naturally, never stuffed: pharmaceutical exporter India, WHO-GMP generic medicine supplier, pharma wholesale exporter Surat Gujarat, generic formulations exporter Africa, third party pharma manufacturing export, CDSCO licensed pharmaceutical exporter, pharmaceutical export documentation India.

OG IMAGES — next/og ImageResponse at the edge. One template: paper ground, hairline border inset 40px, wordmark top-left in Instrument Serif, page title 56px ink, mono 11px footer strip with the registration labels. No photo, no gradient. Per-route title injection.

STRUCTURED DATA — JSON-LD, one component, typed props, no any:
- Organization (sitewide): legal name, url, logo, address (PostalAddress from brand.ts), contactPoint array by department, sameAs, foundingDate, hasCredential per certification.
- WebSite with SearchAction only if search exists — it doesn't, so omit it rather than lying.
- BreadcrumbList on all nested routes.
- ItemList / OfferCatalog on category pages. NO Product schema, NO Offer, NO price, NO aggregateRating. Fabricated review or price markup in a regulated vertical is a manual-action risk.
- FAQPage on the homepage FAQ and /contact.

TECHNICAL
- app/sitemap.ts generating all static routes with lastModified; app/robots.ts allowing all, disallowing /dev/*, pointing to the sitemap.
- Delete or noindex /dev/kitchen-sink and /dev/content before production.
- next.config: images remotePatterns locked to actual hosts, poweredByHeader false, and security headers — HSTS, X-Content-Type-Options, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy denying camera/microphone/geolocation, and a CSP with no unsafe-eval.
- Static export check: every route prerenders. Zero dynamic server routes except /api/enquiry.

COMPLIANCE GUARD — scripts/check-tokens.ts, wired into prebuild:
- Fail the build if any string starting with "TODO_" appears in the rendered output when NODE_ENV is production and VERCEL_ENV is production. Print each offending token and its file.
- Fail if any // VERIFY comment remains in src/content or src/config on a production build.
- Grep the content layer for forbidden claim patterns: "approved in", "registered in", "cures", "guaranteed", "best in", "FDA approved", "#1". Fail with the matching line.
This guard is the reason this project can't accidentally ship a fabricated licence number. Do not make it skippable with a flag.

DELIVERABLE: production build fails loudly with TODO_ tokens present; passes when they're replaced with real values in a local .env-driven override. Rich Results test passes on / , /quality, /products/generic-formulations.
~~~

---

## P11 — Mobile pass

Run this as its own prompt. Mobile is not the desktop build at 390px.

~~~
Read AGENTS.md. Audit and rebuild the mobile experience at 390px, 375px, and 430px. iOS Safari is the reference browser.

REMOVE on <1024px, no exceptions:
- Every pinned or scroll-scrubbed section (homepage ScrollStack → normal-flow sections)
- Every parallax translate
- TiltedCard tilt (render the card flat)
- DotGrid and every ambient background
- Lanyard physics (static card)
- Lenis (native momentum scroll only)
- backdrop-blur anywhere except the sticky header
- Magnet on CTAs

ADD a purpose-built mobile motion system — light, short, one idea per screen:
- Reveal stays: opacity + 16px Y, 320ms, threshold 0.15, once. This is the mobile animation vocabulary and it is enough.
- whileTap scale 0.98 on every button, card and accordion header. 120ms. This is the mobile equivalent of hover and the site currently has no touch feedback.
- clipPath inset reveal on hero and category images only (inset(0 0 100% 0) → inset(0 0 0 0)), 520ms.
- CSS scroll-snap (x mandatory) with 16px peek on the product-line row and the region chips, with a mono position indicator. No JS carousel.
- Route transitions: 180ms opacity only.

FIX
- 100dvh everywhere, never 100vh. Test with the iOS URL bar both expanded and collapsed.
- Scroll lock: position fixed + stored scrollY + restore on close. Verify the page does not jump to top when the nav overlay closes.
- Tap targets >= 44×44 with 8px minimum separation. Audit every mono 11px link — most will fail.
- Molecule tables: horizontal scroll container with -webkit-overflow-scrolling touch, a sticky first column, and a GradualBlur fade on the overflow edge that disappears at scroll end.
- Forms: correct inputMode and autoComplete on every field (tel, email, organization, country-name, given-name). 16px font on all inputs. Country select uses the native picker on mobile, not a custom dropdown.
- Sticky header: 56px tall on mobile, utility strip removed entirely.
- Safe-area insets: env(safe-area-inset-bottom) padding on the nav overlay and any bottom-fixed CTA.
- Type scale: H1 clamp floor at 34px, body stays 16px, section labels stay 11px mono. Do not shrink body copy to fit.

VERIFY
- No horizontal overflow at 320px. Check with document.documentElement.scrollWidth in the console on every route.
- Lighthouse mobile: performance >= 90, accessibility 100, best practices 100, SEO 100.
- Test with prefers-reduced-motion enabled — every route must be fully usable and visually complete.

DELIVERABLE: a written list of every change made, route by route, plus before/after Lighthouse mobile scores.
~~~

---

## P12 — Audit gate

Run this last, in a **fresh session with no prior context**, so the agent reviews rather than defends its own work.

~~~
You are auditing a production B2B pharmaceutical export website. You did not build it. Read AGENTS.md, then audit the codebase and the running site against it. Be adversarial. Do not fix anything yet — produce the report first.

Score each area 1–10 with specific file:line evidence. A score above 7 requires justification.

1 DESIGN SYSTEM INTEGRITY — every colour used vs the token list; every radius vs the 0/4/8 scale; count shadows, gradients, and blurs; count saturated elements visible per viewport at rest on each route. List every violation.
2 TYPOGRAPHY — display serif below 32px anywhere? body below 16px? Title Case headings? mono used outside its reserved job? measures above 68ch?
3 MOTION — list every animation by route with its duration and trigger. Flag anything outside 200–600ms, anything looping past 4 seconds, anything pinned or scrubbed below 1024px, anything not gated on prefers-reduced-motion.
4 REACT BITS — list every installed component, whether it is on the P01 whitelist, and whether it was actually re-skinned to the tokens or is still carrying its shipped dark-theme defaults. Flag any blacklisted component.
5 TYPE SAFETY — grep for any, as unknown, non-null assertions, @ts-ignore, and console.log. Each is a failure.
6 CONTENT LAYER — any copy, product name, number or claim hardcoded in JSX instead of sourced from src/content. Any remaining lorem, placeholder, or stub component returning null.
7 COMPLIANCE — any invented licence, certificate or registration number; any efficacy or market-approval claim; any price shown publicly; any Rx category page missing the import-licence notice; confirm the check-tokens guard actually fails a production build.
8 ACCESSIBILITY — axe-core clean? keyboard traverse every route including the mega-panel, mobile overlay, stepper and accordions. Contrast audit every ink-3 and mono-11px usage against its ground. Focus visible everywhere. Form errors announced.
9 PERFORMANCE — Lighthouse mobile and desktop per route. LCP element identified per route. Unused JS. Any client component that should be a server component. Font loading strategy. Image sizes attribute correctness.
10 CONVERSION — is "Open trade account" reachable in one action from every route? Does every category page have a category-specific enquiry path? Do all three forms handle network failure without data loss? Is there a visible response-time commitment?
11 SEO — duplicate titles or descriptions, missing canonicals, structured data validity, any Product/Offer/Review schema that must not exist.
12 THE COLD READ — open the homepage as a Nigerian pharmaceutical importer doing supplier due diligence. In ninety seconds, can you determine what they sell, whether they are licensed, whether they ship to you, and how to start? Write what you actually concluded, and what was missing.

Output: the scored report, then a single prioritised fix list — P0 blocks launch, P1 fix this week, P2 backlog — each with the file and the specific change. Then stop and wait for approval before touching code.
~~~

---

## Running notes

**Sequencing.** One prompt per session. Review, commit, then the next. P00, P01 and P03 are the load-bearing ones — a compromise in any of them compounds through every later prompt. If P01's kitchen-sink route looks like a component demo rather than your site, re-run P01 before continuing.

**The one dark band.** The homepage closing CTA is the only ink-ground section on the site. If a later prompt produces a second one, cut it. Scarcity is what makes it land.

**React Bits discipline.** The whitelist is 15 components and you will likely ship 9 of them. The value of the list is mostly in what it forbids — the agent will reach for `Aurora` and `SpotlightCard` by reflex on every prompt unless AGENTS.md is in context. Paste "Read AGENTS.md first" at the top of any ad-hoc prompt you write outside this pack.

**What to replace before launch.** `brand.ts` registrations, leadership names, milestone dates, MOQ and lead-time bands, the catalogue PDF, facility photography. The P10 guard blocks the build on the regulatory ones; the rest are on you.

**Copy risk.** The two sentences that matter most legally are "we do not represent that any product is registered in a destination market" on `/quality` and "Exports subject to destination-country regulatory approval" in the footer. Keep both.

Sources: [Pharmazon Global](https://pharmazonglobal.com/) (structure reference only) · [React Bits](https://reactbits.dev/)
