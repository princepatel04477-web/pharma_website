# P11 — mobile implementation and verification

## Changes by route / shared area

- **Every route:** retained 56px mobile header and native scrolling; added 200ms touch feedback and opacity-only route entry; increased small mobile metadata labels to 11px; made long labels wrap; applied font metric fallbacks to reduce font-swap shifts. The brand home-link hit area is at least 44px.
- **Shared navigation:** mobile portal locks body position, makes the background inert, traps focus, closes on Escape and restores the original scroll offset. Focus restoration uses `preventScroll` to avoid the discovered jump-to-top bug. Desktop mega-panel supports arrow keys and returns focus on Escape.
- **Homepage:** native horizontal product snap rail with a 16px gap/next-card peek and position indicator. Region chips are a labelled keyboard-focusable native scroller. Cards stay flat; pinned services become normal-flow cards; no DotGrid, Magnet movement or Lenis on mobile. Removed invalid ARIA on the headline.
- **Products index and all six categories:** subgroup chips wrap rather than expanding grid tracks. Tables retain horizontal scrolling, sticky first column and an end-aware overflow cue. Rx notices and pre-filled enquiries remain visible/usable.
- **Markets:** regional sub-navigation scrolls horizontally on mobile; desktop scrollspy host is sticky. Country names remain readable without a decorative map.
- **Quality:** evidence cards stack; licence content remains static and readable without drag on mobile/reduced motion. No WebGL is loaded.
- **About and Services:** editorial columns and bordered grids stack in source order; no pinning, parallax or tilt.
- **Catalogue, Contact and Trade account:** native selects, 16px inputs, visible errors and touchable labels. Validation failures mark fields touched so clearing an error does not move the Continue button during the user's click. Enter advances the current trade step instead of prematurely submitting the whole application. Text persists through refresh/failure; files explicitly require re-selection. Browser-storage cleanup errors do not turn an accepted submission into a false delivery failure.
- **All four legal notices:** long section labels wrap at 320px instead of widening the document; readable preview notices remain explicit.
- **Performance architecture:** basic motion/interaction components no longer pull Framer Motion into every route. Framer is isolated to Lanyard; Lenis is imported only when eligible. Zod uses explicit imports and jitless mode under CSP; server page-copy validation is kept out of reading routes. Country options are generated data, not a browser import of the country-name library.

## Browser verification

133 public-route/viewport cases passed at 320 / 375 / 390 / 430 / 768 / 1280 / 1920px. axe ran on all 19 public routes at mobile 390px and desktop 1280px with no detected WCAG A/AA violations. There were zero page runtime errors in that traversal. Seven interaction scenarios and 38 reduced-motion/native-mobile checks passed. Screenshots cover desktop/mobile homepage, category, quality and contact views.

These are packaged Chromium tests, **not physical iPhone Safari tests**. Mobile URL-bar and safe-area behaviour still require real-device review.

## Lighthouse mobile measurements

Measurement timing: Lighthouse was recorded before the final CSS-only enlargement of the brand home-link hit area to 44px. Build, lint, unit/API tests, all 133 route/viewport checks, seven interaction scenarios and 38 motion checks were rerun after that change; Lighthouse was not rerun for that touch-target-only adjustment.

Baseline values were recorded before the mobile/performance pass. The original serverless Chromium flags intermittently failed to record screenshots; those unavailable performance scores are shown as **N/A**, not zero or pass. The diagnostic baseline should not be treated as a perfectly controlled comparison. Final measurements use separate browser runs with the problematic single-process/GPU flags removed, identical simulated mobile Lighthouse settings, and a production Next.js server. Raw instrumentation failures are retained separately.

| Route                            | Baseline performance* | Final performance | Accessibility | Best practices | SEO | Final CLS |
| -------------------------------- | --------------------: | ----------------: | ------------: | -------------: | --: | --------: |
| `/`                              |                   N/A |                97 |           100 |            100 |  66 |    0.0009 |
| `/about`                         |                    89 |                98 |           100 |            100 |  66 |    0.0019 |
| `/products`                      |                    91 |                98 |           100 |            100 |  66 |    0.0009 |
| `/services`                      |                    92 |                98 |           100 |            100 |  66 |    0.0000 |
| `/quality`                       |                    96 |                97 |           100 |            100 |  66 |    0.0009 |
| `/markets`                       |                    98 |                98 |           100 |            100 |  66 |    0.0010 |
| `/catalogue`                     |                    98 |                96 |           100 |            100 |  66 |    0.0016 |
| `/contact`                       |                   100 |                97 |           100 |            100 |  66 |    0.0009 |
| `/trade-account`                 |                    99 |                96 |           100 |            100 |  66 |    0.0009 |
| `/products/generic-formulations` |                   N/A |                98 |           100 |            100 |  66 |    0.0006 |
| `/products/branded-generics`     |                    96 |                98 |           100 |            100 |  66 |    0.0006 |
| `/products/otc-products`         |                   N/A |                97 |           100 |            100 |  66 |    0.0006 |
| `/products/nutraceuticals`       |                   100 |                98 |           100 |            100 |  66 |    0.0006 |
| `/products/surgical-diagnostics` |                   N/A |                98 |           100 |            100 |  66 |    0.0006 |
| `/products/personal-care-fmcg`   |                    96 |                98 |           100 |            100 |  66 |    0.0006 |
| `/privacy`                       |                   N/A |                98 |           100 |            100 |  66 |    0.0012 |
| `/terms`                         |                   N/A |                98 |           100 |            100 |  66 |    0.0012 |
| `/quality-policy`                |                    93 |                97 |           100 |            100 |  66 |    0.0012 |
| `/modern-slavery-statement`      |                    99 |                98 |           100 |            100 |  66 |    0.0000 |

*Baseline instrumentation limitations are described above. Scores vary between runs and hardware; these measurements are not a guarantee.

All final mobile performance scores meet the 90 target. All final accessibility/best-practices scores are 100. **The SEO 100 target is deliberately not met:** `noindex, nofollow` is retained for the non-launch preview. Indexing protection must not be removed simply to improve a test score. CLS is recorded honestly rather than claimed universally zero.

First-load JavaScript fell from approximately 190KB to 112KB on the homepage, and from 202KB to 147KB on the trade-account page, based on the saved Next.js build reports.

No P12 audit was performed. No live Resend delivery, real licence upload, regulatory approval, or Google Rich Results eligibility is implied by these tests.
