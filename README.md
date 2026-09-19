# Clinical Paper — pharmaceutical sourcing preview

A Next.js 15 / TypeScript / Tailwind v4 implementation of `PROMPT_PACK.md`, using the approved amendments in `AGENTS.md`.

**Status: working, non-launch preview.** There are 19 public content/form routes, two noindex review routes, static per-route OG images, and one Node enquiry API. Business identity, credentials, commercial commitments and catalogue availability are deliberately not invented. Production builds are blocked until the unresolved facts and environment prerequisites are addressed.

## Run locally

```bash
npm ci
npm run build
npm run start -- --hostname 0.0.0.0 --port 3000
```

For development: `npm run dev`. Development uses `.next-dev`, separate from the production build directory. The preview accepts the Arena proxy host and browser API requests use relative URLs.

## Validate

```bash
npm run lint
npm test
npm run check:release   # expected to fail for this unverified preview
```

With the production preview running on port 3000:

```bash
node scripts/browser-check.mjs
node scripts/interactions.mjs
node scripts/motion-check.mjs
node scripts/lighthouse.mjs
```

The browser scripts use packaged Chromium because the standard browser-download endpoint was unavailable. They are not a substitute for physical iPhone / Safari testing. Lighthouse must run against the production server, not `next dev`. The runner removes serverless single-process/GPU flags that prevented screenshot tracing.

## Content and configuration

- `src/config/brand.ts`: the only application source of the working brand name; unknown facts are explicit tokens/nulls. Supplied statistics are unverified design fixtures and are not rendered as business proof.
- `src/content/`: structured, typed content; category/service/market/FAQ records are schema-validated. Page-content validation runs in the server content layer to avoid shipping unnecessary validation code to readers.
- `src/components/reactbits/`: documented Clinical Paper adaptations of the P01 whitelist; see `docs/REACT_BITS.md` for provenance and deviations.
- `src/app/globals.css`: locked palette and responsive design system.
- `/dev/kitchen-sink` and `/dev/content`: internal review routes, excluded from sitemap and noindex.

## Email configuration

Copy `.env.example` to `.env.local` and configure real values securely outside Git:

- `RESEND_API_KEY`
- `ENQUIRY_FROM`: an authorised Resend sender
- `ENQUIRY_TO_SALES`
- `ENQUIRY_TO_REGULATORY`
- `NEXT_PUBLIC_SITE_URL`: the verified canonical site origin

Without these email settings the endpoint returns **503**, not a fake successful submission. The server validates discriminated Zod schemas, origin, honeypot, minimum submission time, field lengths, country/category values, attachment size and signature. Licence documents are restricted to PDF/JPG/PNG, at most **3MB**, and attached only to the internal email. They are not persisted to the repository or browser storage.

Trade text fields are stored in `sessionStorage`; files must be selected again after refresh. Users can clear the draft. Do not enter real sensitive data into this preview.

Rate limiting and deduplication are bounded **per-instance in-memory** maps. They are not shared across Vercel instances or cold starts. A production deployment should assess a shared durable limiter and accepted-submission store. Resend idempotency keys additionally protect provider retries. Acknowledgement failure after the internal notification has been accepted does not cause the UI to falsely report total submission failure.

## Production gate

`npm run build` runs source checks first and rendered-output checks afterward. Vercel production and `npm run check:release` reject remaining `TODO_` values, `// VERIFY` comments and missing deployment configuration. Forbidden claim patterns are checked even for preview builds. Only the exact required negated registration disclaimer is exempted from the `registered in` phrase check.

The guard does **not** prove that a number or claim is genuine. Documentary verification and company approval are still required. The current preview intentionally carries `noindex, nofollow`, including an HTTP header. Do not remove this protection until launch has been approved. The public origin currently defaults to `example.invalid`.

## Handover

Read `docs/BUILD_REPORT.md`, `docs/P11_MOBILE_REPORT.md` and the evidence in `docs/validation/`. Screenshots are in `docs/screenshots/`.

P12 has **not** been executed. It must be run in a fresh session as an independent audit, with no automatic fixes before approval.
