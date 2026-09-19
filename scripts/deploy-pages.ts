import { execSync } from "node:child_process";
import { copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";

process.env.NEXT_EXPORT = "true";

process.stdout.write(
  "Building Next.js static export for Cloudflare Pages...\n",
);
execSync("npm run build", { stdio: "inherit", env: process.env });

const headersSrc = join(process.cwd(), "public", "_headers");
const headersDest = join(process.cwd(), "out", "_headers");
if (existsSync(headersSrc)) {
  copyFileSync(headersSrc, headersDest);
  process.stdout.write("Synced public/_headers to out/_headers\n");
}

process.stdout.write("Deploying out/ directory to Cloudflare Pages...\n");
execSync(
  "npx wrangler pages deploy out --project-name arvex-pharma --branch main --commit-dirty=true",
  { stdio: "inherit", env: process.env },
);

process.stdout.write("Deployment complete: https://arvex-pharma.pages.dev\n");
