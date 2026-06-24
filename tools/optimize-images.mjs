import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const assetsDir = path.join(root, "assets");

function kb(bytes) {
  return Math.round(bytes / 1024) + "KB";
}

const tasks = [
  // Hero / full-width images — keep wide enough for large screens
  { src: "ai-solar-home.png",       width: 1400, quality: 82 },
  { src: "ai-plumbing-detail.png",  width: 1400, quality: 82 },
  // Content / card images — displayed at ≤900 px
  { src: "ai-inverter-battery.png", width: 900,  quality: 80 },
  { src: "ai-water-storage.png",    width: 900,  quality: 80 },
  // Background / marketing image
  { src: "hero-solar-plumbing.png", width: 1200, quality: 82 },
  // Logo images — keep PNG (transparency + favicon usage), just resize
  { src: "logo-mark-transparent.png", width: 400, keepPng: true },
  { src: "logo-transparent.png",      width: 600, keepPng: true },
];

let totalBefore = 0;
let totalAfter  = 0;

for (const task of tasks) {
  const srcPath = path.join(assetsDir, task.src);
  if (!fs.existsSync(srcPath)) {
    console.warn(`SKIP  ${task.src} (not found)`);
    continue;
  }

  const sizeBefore = fs.statSync(srcPath).size;
  totalBefore += sizeBefore;

  if (task.keepPng) {
    // Resize PNG in-place (overwrite original with smaller version)
    const tmp = srcPath + ".tmp";
    await sharp(srcPath)
      .resize({ width: task.width, withoutEnlargement: true })
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(tmp);
    fs.renameSync(tmp, srcPath);
    const sizeAfter = fs.statSync(srcPath).size;
    totalAfter += sizeAfter;
    console.log(`PNG   ${task.src}  ${kb(sizeBefore)} → ${kb(sizeAfter)}`);
  } else {
    // Convert to WebP
    const destName = task.src.replace(/\.[^.]+$/, ".webp");
    const destPath = path.join(assetsDir, destName);
    await sharp(srcPath)
      .resize({ width: task.width, withoutEnlargement: true })
      .webp({ quality: task.quality })
      .toFile(destPath);
    const sizeAfter = fs.statSync(destPath).size;
    totalAfter += sizeAfter;
    console.log(`WebP  ${task.src}  ${kb(sizeBefore)} → ${kb(sizeAfter)}  (${destName})`);
  }
}

console.log("");
console.log(`Total: ${kb(totalBefore)} → ${kb(totalAfter)}  (saved ${kb(totalBefore - totalAfter)})`);
