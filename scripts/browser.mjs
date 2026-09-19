import { chromium as playwright } from "@playwright/test";
import chromium from "@sparticuz/chromium";
import { inflate } from "../node_modules/@sparticuz/chromium/build/lambdafs.js";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { tmpdir } from "node:os";
const require = createRequire(import.meta.url);
export async function launchBrowser(extraArgs = []) {
  const root = join(dirname(require.resolve("@sparticuz/chromium")), "..");
  await inflate(join(root, "bin/al2023.tar.br"));
  process.env.LD_LIBRARY_PATH = [
    join(tmpdir(), "al2023/lib"),
    process.env.LD_LIBRARY_PATH,
  ]
    .filter(Boolean)
    .join(":");
  return playwright.launch({
    executablePath: await chromium.executablePath(),
    args: [
      ...chromium.args.filter(
        (arg) => !["--single-process", "--in-process-gpu"].includes(arg),
      ),
      ...extraArgs,
    ],
    headless: true,
  });
}
