import { launchBrowser } from "./browser.mjs";
import lighthouse from "lighthouse";
import { writeFile } from "node:fs/promises";
const stage = process.argv.includes("--before") ? "before" : "after";
const base = process.env.TEST_BASE_URL ?? "http://localhost:3000";
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
let browser;
const reports = [];
try {
  for (const route of routes) {
    browser = await launchBrowser(["--remote-debugging-port=9222"]);
    const result = await lighthouse(base + route, {
      port: 9222,
      output: "json",
      logLevel: "error",
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    });
    if (!result) throw new Error("Lighthouse returned no report");
    const lhr = result.lhr;
    const scores = Object.fromEntries(
      Object.entries(lhr.categories).map(([name, category]) => [
        name,
        category.score === null ? null : Math.round(category.score * 100),
      ]),
    );
    const record = {
      route,
      ...scores,
      runtimeError: lhr.runtimeError,
      auditErrors: Object.values(lhr.audits)
        .filter((a) => a.errorMessage)
        .map((a) => ({ id: a.id, error: a.errorMessage })),
      lcp: lhr.audits["largest-contentful-paint"]?.numericValue,
      cls: lhr.audits["cumulative-layout-shift"]?.numericValue,
      failedAudits: Object.values(lhr.audits)
        .filter((a) => a.score !== null && a.score < 1)
        .map((a) => ({
          id: a.id,
          title: a.title,
          score: a.score,
          display: a.displayValue,
          details: a.details,
        })),
    };
    reports.push(record);
    await browser.close();
    process.stdout.write(`${route} ${JSON.stringify(scores)}\n`);
    await writeFile(
      `docs/validation/P11-lighthouse-${stage}.json`,
      JSON.stringify(reports, null, 2),
    );
  }
} finally {
  await browser?.close();
}
