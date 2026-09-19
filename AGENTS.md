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


## Approved implementation amendments

The user approved these reconciliations before implementation. They supersede contradictory pack instructions.
- Work sequentially through P00–P11, validating and reporting each stage; no approval stop between stages. P12 remains an independent fresh-session audit.
- Build a clearly labelled, noindex, non-launch preview. Unknown facts use TODO_ tokens or nulls. Do not publish unsupported credentials or operating claims. Supplied statistics are development fixtures only, not public proof.
- Pin Next.js 15. Use prerendered pages with a Node enquiry API, not output:export. OG images may be statically generated.
- Readable text uses ink or ink-2, never low-contrast ink-3 on light grounds. Body is 16px/1.65 minimum. Wordmark may be uppercase brand lettering; serif is at least 32px. Mono may also label sections and structured metadata. Icons are 20/24px.
- Reserve solid teal for primary conversion actions; multiple links, focus rings and regulatory notices may coexist. Avoid decorative accent repetition.
- Use the homepage closing CTA as the only dark section. Other closing/recall blocks are light. Only card shadows and sticky-header blur are permitted. Overflow fades use flat paper edge masks instead of backdrop blur.
- Prefer 200–600ms motion; marquee alone may use a 40s loop. Mobile touch feedback and route transitions use 200ms. CountUp uses 600ms. Desktop pinning gets the one complex-motion budget; product cards stay flat. No mobile scrub. Reduced motion keeps a static accessible representation of essential content.
- Content may be introduced incrementally before P03 but must live outside JSX. Foundation has no marketing page. Temporary navigation targets are not represented as finished pages. All legal routes must receive honest preview-specific notices, not invented legal policies.
- Schema may extend to represent missing brand/content fields. FSSAI and certificate authority/validity stay unverified. Region groups use accurate names; listed countries are coverage interests, not proof of shipments.
- Compliance guard checks source before build and fresh rendered output after build. Only the exact required negated registration disclaimer is exempt from the forbidden-claim phrase check. Both checks block Vercel production and explicit release checks; normal preview builds may contain declared tokens. No launch bypass flag.
- Licence uploads are capped at 3MB, validated client/server, and attached internally only. File selections require re-selection after refresh. No fake email success or unverified response-time guarantee.
- Keep preview environment prerequisites visible. Production requires verified content, sender configuration, legal approval and real-device testing. Do not claim external/device tests have run when unavailable.
- Font delivery exception: Google Fonts TLS is unavailable in the sandbox. Bundle the exact requested families through next/font/local using Fontsource WOFF2 files with their licences; preload sans only.
