# React Bits provenance and adaptations

Retrieved the 17 P01 TS/Tailwind registry entries from DavidHDev/react-bits through GitHub API. Direct registry and shadcn CLI attempts failed TLS. No upstream component is represented as installed unchanged. Implementations are deliberately rewritten Clinical Paper equivalents based on the retrieved API/behaviour references, in src/components/reactbits/basic.tsx and src/components/reactbits/lanyard.tsx (re-exported by index.ts).

No blacklisted component installed. No WebGL assets imported. Lanyard uses bounded DOM drag rather than a Three.js licence mesh; TiltedCard is intentionally flat per the approved motion budget; ScrollReveal uses once-only reveal rather than scroll scrub; GradualBlur uses an overflow rule instead of backdrop blur. All visual styling is token-based; reduced-motion uses CSS/media and motion hooks. These are explicit deviations from literal P01.

## Retrieved source hashes

- AnimatedContent: `a43017c87e23c00ecf514ed05fbb78f5ffe6bf10211a8c9c8bbbb249d4d966ad`
- CardNav: `d005d5b27136254b13832c641d4d0f60d018846b4f76193eeafbdd6163afa7b2`
- Carousel: `6336dbea1dbad90e3b9071925a8a2c72ac00e29f9a9c7994f5a94d6287992e67`
- CountUp: `d4815853d587df9dd5b32d0658f301af5367db6f1f9abef5cfe90af8fc6561f1`
- DotGrid: `120906cceae2b9f4683d046ee3df1f5a8b7298d933e0cd25a2d501fb81806f09`
- FlowingMenu: `6981634aa9132f7df948473f4512579fdb435c9c61979f8fcd897ea525a8a852`
- GradualBlur: `83e69cc6c82d41b62cd48ca747df257f5528ec1b4c09325c9c76897e7120d0a5`
- Lanyard: `87842fd320dfd777804deda18e2d84104b203c463bba976a608275114e967491`
- LogoLoop: `7f0a913f8729a2ba0283574ae7e531f4cfbcc545467b6bd640345e12057576b0`
- Magnet: `973d90d9af987b8fb82d63a50ba1fd15059640f74b77e3c944708628f3b16461`
- Masonry: `dde7dd88f7d73310e658bd4593f41a9339e10d0d8e2ce27a757d2202aff7b597`
- ScrollReveal: `0c0286f5c98383f12a44b1d44baa127eab698c8a1200639f1368a40feddcd103`
- ScrollStack: `70bad605f903f8f62bf90ab65cc06abfa530e3b921414932b706f9093247965f`
- SplitText: `18f6dfd1583ffb863ccd48d12c0b85c7f82fe5bff50735f9eca870bbfac65df9`
- StaggeredMenu: `0c07ba2bca13904288eaf3bfb4db5c2a6732817962185047954c8372492c6269`
- Stepper: `753e07c13b3231cf56e4b46a2f57f16b97a3c6dad84826f41b80cffb3ae991a7`
- TiltedCard: `3d18c9492fdfc13a2eeede56a61c437906941108ad00ecec9b52c4f79bb57e96`

## P11 bundle separation

Basic interactions now use native React, IntersectionObserver, CSS and requestAnimationFrame. Framer Motion is isolated to the desktop licence-card drag, rather than bundled into every navigation/form route. Lenis is dynamically imported only for desktop, non-reduced-motion sessions. The header, hero, forms and category pages import the basic leaf directly.

SplitText preserves line structure and an accessible complete text alternative; initial-viewport text is not hidden awaiting JavaScript. Reveal animates once for below-fold content (320ms mobile / 400ms desktop), retaining visible server-rendered content and a static reduced-motion state. The component review route is not a claim that unchanged upstream components were installed successfully.
