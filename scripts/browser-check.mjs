import { launchBrowser } from "./browser.mjs";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
const base = process.env.TEST_BASE_URL ?? "http://localhost:3000";
const stage = process.argv.includes("--before") ? "before" : "after";
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
const browser = await launchBrowser();
const context = await browser.newContext({ reducedMotion: "reduce" });
const page = await context.newPage();
const report = [];
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
try {
  for (const width of [320, 375, 390, 430, 768, 1280, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      const response = await page.goto(base + route, { waitUntil: "load" });
      await page.locator("main h1").waitFor();
      const data = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        h1: document.querySelectorAll("main h1").length,
        title: document.title,
        titleLength: document.title.length,
        description: document.querySelector("meta[name=description]")?.content,
        canonical: document.querySelector("link[rel=canonical]")?.href,
        stickyStacks: [...document.querySelectorAll(".stack-item")].filter(
          (el) => getComputedStyle(el).position === "sticky",
        ).length,
      }));
      let violations = [];
      if (width === 390 || width === 1280) {
        const axe = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze();
        violations = axe.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          nodes: v.nodes.map((n) => ({
            target: n.target,
            summary: n.failureSummary,
          })),
        }));
      }
      report.push({
        width,
        route,
        status: response?.status(),
        ...data,
        violations,
      });
      process.stdout.write(
        `${width} ${route} ${data.overflow ? "OVERFLOW" : "fits"} ${violations.length} accessibility violations\n`,
      );
    }
  }
  await mkdir("docs/screenshots", { recursive: true });
  for (const width of [390, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/",
      "/products/generic-formulations",
      "/quality",
      "/contact",
    ]) {
      await page.goto(base + route, { waitUntil: "load" });
      await page.screenshot({
        path: `docs/screenshots/P11-${stage}-${width}-${route === "/" ? "home" : route.split("/").pop()}.png`,
      });
    }
  }
  await writeFile(
    `docs/validation/P11-browser-${stage}.json`,
    JSON.stringify({ report, errors }, null, 2),
  );
  const failures = report.filter(
    (r) =>
      r.overflow ||
      r.h1 !== 1 ||
      r.status !== 200 ||
      r.violations.length ||
      (r.width < 1024 && r.stickyStacks),
  );
  process.stdout.write(
    `\n${report.length} route/viewport checks; ${failures.length} findings; ${errors.length} page errors\n`,
  );
  if (failures.length || errors.length) process.exitCode = 1;
} finally {
  await browser.close();
}
