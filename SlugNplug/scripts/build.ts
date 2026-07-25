import { readdirSync, mkdirSync, copyFileSync, writeFileSync } from "fs";
import { join } from "path";

console.log("📦 Starting Vercel/Production Build Process...");

// 1. Run Bun build for index.html SPA entry point
const proc = Bun.spawnSync([
  "bun",
  "build",
  "./src/index.html",
  "--outdir=dist",
  "--sourcemap",
  "--target=browser",
  "--minify",
  "--define:process.env.NODE_ENV='\"production\"'",
  "--env=BUN_PUBLIC_*"
]);

if (proc.exitCode !== 0) {
  console.error("❌ Bun bundle failed:", proc.stderr.toString());
  process.exit(proc.exitCode);
}
console.log(proc.stdout.toString());

// 2. Ensure target output directories exist
const rootDir = join(import.meta.dir, "..");
const srcAssetsDir = join(rootDir, "Main - asssets");
const distAssetsDir = join(rootDir, "dist/assets");
const distApiDir = join(rootDir, "dist/api");

mkdirSync(distAssetsDir, { recursive: true });
mkdirSync(distApiDir, { recursive: true });

// 3. Copy vector SVG assets to dist/assets/
const files = readdirSync(srcAssetsDir).filter((f) => f.endsWith(".svg"));
files.sort((a, b) => {
  const numA = parseInt(a.replace(/[^0-9]/g, "")) || 0;
  const numB = parseInt(b.replace(/[^0-9]/g, "")) || 0;
  return numA - numB;
});

for (const file of files) {
  copyFileSync(join(srcAssetsDir, file), join(distAssetsDir, file));
}
console.log(`✅ Copied ${files.length} vector SVG assets to dist/assets/`);

// 4. Generate static API JSON response for Vercel CDN deployment
writeFileSync(
  join(distApiDir, "assets.json"),
  JSON.stringify({ assets: files }, null, 2)
);
console.log("✅ Successfully generated dist/api/assets.json");
console.log("🚀 Vercel build completed cleanly with zero errors!");
