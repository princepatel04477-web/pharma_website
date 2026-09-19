import test from "node:test";
import assert from "node:assert/strict";
import {
  inspectSource,
  inspectRendered,
  disclaimer,
} from "../scripts/compliance";
test("production guard rejects tokens and verification comments", () => {
  const results = inspectSource(
    'const licence="TODO_TEST_LICENCE"; // VERIFY',
    "src/config/test.ts",
    true,
  );
  assert.equal(results.length, 2);
  assert.equal(
    inspectSource(
      'const licence="TODO_TEST_LICENCE"; // VERIFY',
      "fixture",
      false,
    ).length,
    0,
  );
});
test("only exact negated disclaimer is exempt from registration claim pattern", () => {
  assert.equal(inspectSource(disclaimer, "fixture", true).length, 0);
  assert.equal(
    inspectSource(
      "This product is registered in every market.",
      "fixture",
      false,
    ).length,
    1,
  );
  assert.equal(
    inspectSource(disclaimer + " FDA approved", "fixture", false).length,
    1,
  );
});
test("rendered guard detects all token values and reports file", () => {
  const results = inspectRendered(
    "<main>TODO_TEST_LICENCE TODO_TEST_PERSON TODO_TEST_LICENCE</main>",
    "out.html",
  );
  assert.equal(results.length, 2);
  assert.equal(results[0]?.file, "out.html");
  assert.equal(
    inspectRendered("<main>Verified fixture</main>", "out.html").length,
    0,
  );
});
