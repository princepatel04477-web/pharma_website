import { launchBrowser } from "./browser.mjs";
import { writeFile } from "node:fs/promises";
const browser = await launchBrowser();
const results = [];
const routes = [
  "/",
  "/about",
  "/products",
  "/services",
  "/quality",
  "/markets",
  "/catalogue",
  "/contact",
  "/trade-account",
  "/products/generic-formulations",
  "/products/branded-generics",
  "/products/otc-products",
  "/products/nutraceuticals",
  "/products/surgical-diagnostics",
  "/products/personal-care-fmcg",
  "/privacy",
  "/terms",
  "/quality-policy",
  "/modern-slavery-statement",
];
try {
  for (const reducedMotion of ["reduce", "no-preference"]) {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      reducedMotion,
    });
    const page = await context.newPage();
    for (const route of routes) {
      await page.goto("http://localhost:3000" + route, { waitUntil: "load" });
      const result = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        pinned: [...document.querySelectorAll(".stack-item")].some(
          (el) => getComputedStyle(el).position === "sticky",
        ),
        ambient: document.querySelectorAll(".dot-grid svg,canvas").length,
        headerHeight: document
          .querySelector(".header-inner")
          ?.getBoundingClientRect().height,
        lenis: document.documentElement.classList.contains("lenis"),
        h1: !!document.querySelector("main h1"),
      }));
      const passed =
        !result.overflow &&
        !result.pinned &&
        !result.ambient &&
        !result.lenis &&
        result.headerHeight === 56 &&
        result.h1;
      results.push({ route, reducedMotion, passed, ...result });
      process.stdout.write(
        `${passed ? "PASS" : "FAIL"} ${reducedMotion} ${route}\n`,
      );
    }
    await context.close();
  }
} finally {
  await browser.close();
  await writeFile(
    "docs/validation/P11-motion.json",
    JSON.stringify(results, null, 2),
  );
  if (results.some((result) => !result.passed)) process.exitCode = 1;
}
