# Implementation handover — non-launch preview

This is an implementation report, **not the independent P12 audit**.

## Delivered

- Clinical Paper design system: exact palette, self-hosted Instrument Sans / Instrument Serif / JetBrains Mono, editorial layouts and responsive navigation.
- 19 public routes: homepage, About, Products, six categories, Services, Quality, Markets, Catalogue, Contact, Trade account, and four preview-specific legal notices.
- Keyboard-operated product navigation; mobile portal, focus trapping, background inertness, scroll lock and restoration; skip link; focus indicators.
- Typed category, service, certification-review, market, FAQ and page content. Unknown business facts are explicit rather than fabricated.
- Homepage portfolio, service stack, region expansion, stepper, FAQ and closing CTA. Desktop complexity becomes normal flow on mobile; product cards stay flat.
- Product tables with native horizontal scrolling, sticky first column and an overflow cue. Rx notices and category-specific enquiry links are present.
- Credential register with no invented numbers, certificate documents, authority, validity or approval claims. Unknown credentials are omitted from `hasCredential` structured data.
- Catalogue enquiry, four-step trade application and contact enquiry. Shared client/server validation, accessible errors, preserved drafts/failure state, 3MB attachment checks, Resend integration and typed JSON responses.
- Unique page metadata and canonicals, static OG images, Organization/WebSite/Breadcrumb/FAQ/ItemList data as applicable, sitemap, robots and security headers.
- Enforced source and rendered-output production guard, no bypass flag. The preview remains noindex.

## Phase/file map

| Phase | Main files created or modified                                                                                                                                                                        |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P00   | `AGENTS.md`, `package.json`, lockfile, strict `tsconfig.json`, ESLint/PostCSS/Next configs, `src/config/brand.ts`, root layout, fonts and `globals.css`                                               |
| P01   | `src/components/reactbits/*`, `src/components/motion/index.tsx`, `/dev/kitchen-sink`, `src/content/dev.ts`, `components.json`, `docs/REACT_BITS.md`                                                   |
| P02   | `shell.tsx`, `footer.tsx`, `scroll-provider.tsx`, `src/content/navigation.ts`, root layout and shell styles                                                                                           |
| P03   | `src/content/types.ts`, categories/services/certifications/markets/FAQs, accessors, `site.ts`, `/dev/content`                                                                                         |
| P04   | `hero.tsx`, homepage route, hero/trust-band styles, P04 screenshots                                                                                                                                   |
| P05   | `home-body.tsx`, `ui.tsx`, `interactive.tsx`, homepage sections and P05 screenshots                                                                                                                   |
| P06   | `/products`, `/products/[category]`, `lib/metadata.ts`, `structured-data.tsx`, reference-page styles                                                                                                  |
| P07   | `/quality`, credential/documentation/facility-review layouts                                                                                                                                          |
| P08   | `/markets`, `/about`, `/services`, `/[legal]`, not-found page, `region-nav.tsx`, preview legal content                                                                                                |
| P09   | Three form routes, `forms/enquiry-form.tsx`, form content, shared schemas, country options, `/api/enquiry`, rate limiter, attachment checks, `.env.example`, enquiry tests                            |
| P10   | `content/routes.ts`, `site-schema.tsx`, `/og/[slug]`, sitemap/robots, CSP/headers, `scripts/compliance.ts`, `scripts/check-tokens.ts`, compliance tests, PostCSS security override                    |
| P11   | Mobile product rail, native motion/leaf splitting, metric-matched font fallbacks, form/menu fixes, country-data extraction, CSP-safe Zod setup, route transition, test runners and validation reports |

`docs/FILE_MANIFEST.md` lists changed files. Build/lint logs are preserved per phase under `docs/validation/`; final checks use the P11 logs.

## React Bits and approved reconciliations

All 17 named whitelist entries are represented in the review route. No blacklisted component was added. Registry/CLI TLS failures prevented a successful literal upstream CLI installation: the GitHub registry entries were retrieved and used as behavioural references for token-based adaptations, with hashes recorded in `docs/REACT_BITS.md`.

Notable differences from the literal pack:

- Next.js is explicitly pinned to 15.5.25 rather than using `@latest`.
- Google-font fetch failed; the exact fonts are bundled through `next/font/local` with their licences. Only sans is preloaded.
- Readable existing ink tokens replace low-contrast tertiary text. Serif wordmarks are at least 32px; brand lettering is an explicit uppercase exception. Mobile metadata remains readable and wraps.
- Multiple primary conversion links/focus states may coexist; decorative accent repetition is limited. The homepage CTA is the only dark section.
- Lanyard is restrained DOM drag, not WebGL/3D physics. TiltedCard is flat; GradualBlur is a non-blurred overflow cue; ScrollReveal is once-only, not word-level scrub. The initial viewport remains visible without an entrance/hydration delay.
- Static page rendering plus one Node API is used, not `output: export`. OG images are statically generated using a Node build-time handler, not runtime edge rendering.
- Two-stage guard replaces an impossible prebuild-only scan of not-yet-rendered files. The required negated disclaimer is narrowly exempted from one forbidden phrase.
- Unknown credentials, claims, company history, contact details, dates, counts and commitments are not published as facts. The design fixtures remain in config but are not displayed as proof.
- The country groups describe enquiry scope, not trading history; the listed 33 countries and South/Southeast Asia label are explicit.
- Legal pages contain actual preview notices, not fabricated approved policies. The catalogue page explicitly explains that a verified PDF is not available; no fake download route was created.
- Upload cap is 3MB as approved. Mobile refresh preserves text, not browser file selections.

No further regulatory fact or launch exception was invented to get a green build.

## Validation evidence

- `npm run build`: pass for the non-launch preview; page routes prerender, with `/api/enquiry` the only dynamic route.
- `npm run lint`: pass, zero warnings.
- `npm test`: 9 passing validation/API/compliance tests; provider responses are mocked.
- 133 public-route/viewport checks: 19 routes at 320, 375, 390, 430, 768, 1280 and 1920px. No horizontal document overflow, missing H1, non-200 route, or browser runtime error detected.
- axe WCAG A/AA checks on all 19 public routes at 390 and 1280px: no violations detected. This does not establish universal accessibility conformance.
- Seven browser interaction scenarios pass: menu focus/scroll, mega navigation, offline/retry preservation, catalogue validation/confirmation, trade stepper/draft/upload/review, table scrolling and 404 handling.
- 38 mobile motion checks: all 19 routes with reduced motion on/off. No mobile pinned stack, ambient canvas/grid, Lenis, overflow or incorrect header height detected.
- Final Lighthouse mobile: performance 96–98, accessibility 100 and best practices 100 across the 19 routes. SEO is 66 because indexing is intentionally blocked. Full per-route results and baseline limitations are in `docs/P11_MOBILE_REPORT.md`.
- Production source gate: intentionally fails with 25 findings; rendered-output gate separately rejects 16 token/file occurrences. Expected non-zero exits are saved.

## Not completed / required before launch

1. **Verified business inputs:** legal entity, address, contact channels, credentials and their original evidence, licence authority/validity, actual statistics, founding/milestone dates, leadership, permitted product inventory and approved operating claims.
2. **Commercial/quality/legal approval:** actual service scope, MOQ/lead-time terms, response commitments, privacy/retention/processor policies, quality/recall procedures and other entity-specific legal notices. Placeholder numeric claims must not be merely relabelled as verified.
3. **Email delivery:** no real Resend key/sender configuration was supplied. No end-to-end external email delivery is claimed. The unconfigured preview returns 503 and preserves entries. Test actual notifications, acknowledgements and attachments with approved test recipients before launch.
4. **Assets:** no real catalogue PDF or authorised facility/certificate/leadership imagery was supplied. Typographic review blocks replace photography, as permitted.
5. **Production configuration:** supply the real origin, replace verified config/content facts and remove resolved VERIFY comments; re-run both guards. A verified production build and the pack's real-value `.env` override success case cannot be demonstrated without real data. The implementation uses the typed config as the business source of truth rather than an opaque JSON environment override.
6. **External/browser review:** physical iPhone Safari with expanded/collapsed URL bar, external Google Rich Results validation, and the next-morning human design review have not been completed. Browser emulation and local JSON validation are not substitutes.
7. **Dependency audit refresh:** P10's audit reported zero vulnerabilities after the PostCSS override. The final registry audit attempt returned HTTP 400 from the deprecated quick endpoint despite a lockfile refresh; current advisory status must be rechecked when the registry service is available. The error output is retained rather than presented as a clean result.
8. **Independent P12:** start a genuinely fresh session and execute the audit prompt. No independent audit score or launch approval is claimed by this report.

The site is ready for preview review, **not for publication as a verified pharmaceutical supplier**.
