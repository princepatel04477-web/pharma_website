import assert from "node:assert/strict";
import { launchBrowser } from "./browser.mjs";
import { writeFile } from "node:fs/promises";
import AxeBuilder from "@axe-core/playwright";
const browser = await launchBrowser();
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
const base = process.env.TEST_BASE_URL ?? "http://localhost:3000";
const results = [];
async function check(name, run) {
  try {
    await run();
    results.push({ name, passed: true });
    process.stdout.write(`PASS ${name}\n`);
  } catch (error) {
    results.push({ name, passed: false, error: String(error) });
    process.stdout.write(`FAIL ${name}: ${error}\n`);
  }
}
try {
  await check(
    "Mobile overlay scroll restoration, focus trap and Escape",
    async () => {
      await page.goto(base, { waitUntil: "load" });
      await page.evaluate(() => window.scrollTo(0, 800));
      const before = await page.evaluate(() => scrollY);
      const menuBox = await page
        .getByRole("button", { name: "Open navigation" })
        .boundingBox();
      assert.ok(menuBox);
      await page.mouse.click(
        menuBox.x + menuBox.width / 2,
        menuBox.y + menuBox.height / 2,
      );
      await page.getByRole("dialog").waitFor();
      assert.equal(
        await page.evaluate(() => document.body.style.position),
        "fixed",
      );
      const axe = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      assert.deepEqual(
        axe.violations.map((v) => v.id),
        [],
      );
      await page.keyboard.press("Shift+Tab");
      assert.equal(
        await page.evaluate(
          () => !!document.activeElement?.closest("[role=dialog]"),
        ),
        true,
      );
      await page.keyboard.press("Escape");
      await page.getByRole("dialog").waitFor({ state: "detached" });
      assert.ok(Math.abs((await page.evaluate(() => scrollY)) - before) < 3);
      assert.equal(
        await page
          .getByRole("button", { name: "Open navigation" })
          .evaluate((el) => el === document.activeElement),
        true,
      );
    },
  );
  await check(
    "Desktop mega navigation arrow keys and focus return",
    async () => {
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.goto(base, { waitUntil: "load" });
      const trigger = page.getByRole("button", {
        name: "Products",
        exact: true,
      });
      await trigger.focus();
      await page.keyboard.press("ArrowDown");
      await page.locator("#product-mega").waitFor();
      await page.locator("#product-mega a").first().waitFor();
      await page.keyboard.press("ArrowRight");
      assert.equal(
        await page.evaluate(
          () => !!document.activeElement?.closest("#product-mega"),
        ),
        true,
      );
      await page.keyboard.press("Escape");
      assert.equal(
        await trigger.evaluate((el) => el === document.activeElement),
        true,
      );
    },
  );
  await check(
    "Contact prefill, blur validation, offline preservation and retry",
    async () => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(base + "/contact?category=branded-generics", {
        waitUntil: "load",
      });
      await page.waitForFunction(
        () =>
          document.querySelector("#contact-category")?.value ===
          "branded-generics",
      );
      await page.getByLabel("Full name", { exact: true }).fill("Test user");
      await page
        .getByLabel("Company / legal name", { exact: true })
        .fill("Synthetic test company");
      await page.getByLabel("Email address", { exact: true }).fill("invalid");
      await page
        .getByLabel("Phone with country code", { exact: true })
        .fill("+919000000000");
      assert.ok(
        await page
          .getByText("Enter a valid email address.", { exact: true })
          .isVisible(),
      );
      await page
        .getByLabel("Email address", { exact: true })
        .fill("fixture@example.org");
      await page.getByLabel("Country", { exact: true }).selectOption("IN");
      await page
        .getByLabel("Your requirements", { exact: true })
        .fill("Synthetic enquiry to exercise failure handling.");
      await page.locator("input[name=consent]").check();
      await page.route("**/api/enquiry", (route) =>
        route.abort("internetdisconnected"),
      );
      await page.waitForTimeout(3100);
      await page
        .getByRole("button", { name: "Send enquiry", exact: true })
        .click();
      await page
        .getByText(
          "The request could not be completed. Your entries are still here; please try again.",
          { exact: true },
        )
        .waitFor();
      assert.equal(
        await page.getByLabel("Full name", { exact: true }).inputValue(),
        "Test user",
      );
      await page.unroute("**/api/enquiry");
      await page.route("**/api/enquiry", (route) =>
        route.fulfill({
          status: 503,
          contentType: "application/json",
          body: JSON.stringify({
            ok: false,
            message: "Synthetic unavailable response",
          }),
        }),
      );
      await page
        .getByRole("button", { name: "Send enquiry", exact: true })
        .click();
      await page.getByText("Synthetic unavailable response").waitFor();
      assert.equal(
        await page.getByLabel("Email address", { exact: true }).inputValue(),
        "fixture@example.org",
      );
      await page.unroute("**/api/enquiry");
    },
  );
  await check(
    "Catalogue business-email check and successful confirmation UI",
    async () => {
      await page.goto(base + "/catalogue", { waitUntil: "load" });
      await page.getByLabel("Full name", { exact: true }).fill("Test user");
      await page
        .getByLabel("Company / legal name", { exact: true })
        .fill("Synthetic test company");
      await page
        .getByLabel("Business email", { exact: true })
        .fill("fixture@gmail.com");
      await page
        .getByLabel("Phone with country code", { exact: true })
        .fill("+919000000000");
      await page
        .getByText(
          "Please use your company email so we can verify your business.",
          { exact: true },
        )
        .waitFor();
      await page
        .getByLabel("Business email", { exact: true })
        .fill("fixture@example.org");
      await page.getByLabel("Country", { exact: true }).selectOption("IN");
      await page
        .getByLabel("Business type", { exact: true })
        .selectOption("Importer");
      await page
        .getByLabel("Import licence held", { exact: true })
        .selectOption("Yes");
      await page.getByLabel("Generic formulations", { exact: true }).check();
      await page.locator("input[name=consent]").check();
      await page.route("**/api/enquiry", (route) =>
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            ok: true,
            message: "Synthetic accepted submission",
            reference: "test-reference",
          }),
        }),
      );
      await page.waitForTimeout(3100);
      await page
        .getByRole("button", { name: "Request catalogue", exact: true })
        .click();
      await page
        .getByRole("heading", { name: "Enquiry received", exact: true })
        .waitFor();
      assert.equal(await page.locator("form").count(), 0);
      await page.unroute("**/api/enquiry");
    },
  );
  await check(
    "Trade step validation, refresh persistence, oversized upload and complete review",
    async () => {
      await page.goto(base + "/trade-account", { waitUntil: "load" });
      await page.getByRole("button", { name: "Continue", exact: true }).click();
      assert.ok(
        await page
          .getByText("Please complete this field.", { exact: true })
          .first()
          .isVisible(),
      );
      await page
        .getByLabel("Company legal name", { exact: true })
        .fill("Synthetic test company");
      await page
        .getByLabel("Trading name", { exact: true })
        .fill("Synthetic trading name");
      await page.getByLabel("Country", { exact: true }).selectOption("IN");
      await page.getByLabel("City", { exact: true }).fill("Test city");
      await page.getByLabel("Year established", { exact: true }).fill("2020");
      await page.getByRole("button", { name: "Continue", exact: true }).click();
      await page
        .getByLabel("Import / wholesale licence number", { exact: true })
        .waitFor();
      await page.reload({ waitUntil: "load" });
      await page
        .getByLabel("Import / wholesale licence number", { exact: true })
        .waitFor();
      await page
        .getByLabel("Import / wholesale licence number", { exact: true })
        .fill("TEST-DOCUMENT-NOT-A-LICENCE");
      await page
        .getByLabel("Issuing authority", { exact: true })
        .fill("Synthetic test authority");
      await page
        .getByLabel("Licence expiry", { exact: true })
        .fill("2030-12-31");
      await page.locator("input[type=file]").setInputFiles({
        name: "oversized.pdf",
        mimeType: "application/pdf",
        buffer: Buffer.alloc(3 * 1024 * 1024 + 1),
      });
      await page
        .getByText("Choose a PDF, JPG or PNG no larger than 3MB.", {
          exact: true,
        })
        .waitFor();
      await page.locator("input[type=file]").setInputFiles({
        name: "test-only.pdf",
        mimeType: "application/pdf",
        buffer: Buffer.from("%PDF-1.7\nSynthetic fixture, not a licence."),
      });
      await page.getByRole("button", { name: "Continue", exact: true }).click();
      await page.getByLabel("Generic formulations", { exact: true }).check();
      await page
        .getByLabel("Annual procurement volume", { exact: true })
        .selectOption("Exploratory enquiry");
      await page
        .getByLabel("Order frequency", { exact: true })
        .selectOption("One-off");
      await page
        .getByLabel("Target markets", { exact: true })
        .fill("Test market");
      await page
        .getByLabel("Incoterms preference", { exact: true })
        .selectOption("To be discussed");
      await page
        .getByLabel("Payment terms preference", { exact: true })
        .selectOption("LC");
      await page.getByRole("button", { name: "Continue", exact: true }).click();
      await page.getByLabel("Contact name", { exact: true }).fill("Test user");
      await page.getByLabel("Role", { exact: true }).fill("Test role");
      await page
        .getByLabel("Contact email", { exact: true })
        .fill("fixture@example.org");
      await page
        .getByLabel("Phone with country code", { exact: true })
        .fill("+919000000000");
      await page
        .getByLabel("Preferred contact method", { exact: true })
        .selectOption("Email");
      await page.getByLabel("Time zone", { exact: true }).selectOption("UTC");
      assert.ok(
        await page
          .getByRole("heading", { name: "Review your application" })
          .isVisible(),
      );
      await page.locator("input[name=consent]").check();
      let calls = 0;
      await page.route("**/api/enquiry", async (route) => {
        calls++;
        await new Promise((resolve) => setTimeout(resolve, 300));
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            ok: true,
            message: "Synthetic accepted submission",
            reference: "trade-test-reference",
          }),
        });
      });
      await page.waitForTimeout(3100);
      await page
        .getByRole("button", { name: "Submit for review", exact: true })
        .click();
      await page
        .getByRole("heading", { name: "Enquiry received", exact: true })
        .waitFor();
      assert.equal(calls, 1);
      assert.equal(
        await page.evaluate(() =>
          sessionStorage.getItem("clinical-trade-draft"),
        ),
        null,
      );
      await page.unroute("**/api/enquiry");
    },
  );
  await check("Mobile molecule table scroll and overflow cue", async () => {
    await page.goto(base + "/products/generic-formulations", {
      waitUntil: "load",
    });
    const table = page.locator(".table-scroll");
    assert.ok(await table.evaluate((el) => el.scrollWidth > el.clientWidth));
    await table.evaluate((el) => {
      el.scrollLeft = el.scrollWidth;
    });
    await page.waitForFunction(
      () =>
        !document
          .querySelector(".overflow-frame")
          ?.classList.contains("has-overflow"),
    );
  });
  await check("Unknown route gives a real 404", async () => {
    const response = await page.goto(base + "/does-not-exist", {
      waitUntil: "load",
    });
    assert.equal(response?.status(), 404);
    assert.equal(await page.locator("main h1").count(), 1);
  });
} finally {
  await writeFile(
    "docs/validation/P11-interactions.json",
    JSON.stringify(results, null, 2),
  );
  await browser.close();
  if (results.some((result) => !result.passed)) process.exitCode = 1;
}
