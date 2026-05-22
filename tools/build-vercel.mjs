import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");

const staticEntries = [
  "index.html",
  "solar.html",
  "plumbing.html",
  "contact.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "site.webmanifest",
  "assets",
  "css",
  "js"
];

async function validate() {
  await import("./validate-site.mjs");
}

function resetPublicDir() {
  const resolved = path.resolve(publicDir);
  if (resolved !== path.join(root, "public")) {
    throw new Error("Refusing to reset an unexpected output directory.");
  }

  fs.rmSync(resolved, { recursive: true, force: true });
  fs.mkdirSync(resolved, { recursive: true });
}

function copyEntry(entry) {
  const source = path.join(root, entry);
  const target = path.join(publicDir, entry);

  if (!fs.existsSync(source)) {
    throw new Error(`Cannot copy missing static entry: ${entry}`);
  }

  fs.cpSync(source, target, {
    recursive: true,
    force: true,
    errorOnExist: false
  });
}

await validate();
resetPublicDir();

for (const entry of staticEntries) {
  copyEntry(entry);
}

console.log(JSON.stringify({
  ok: true,
  data: {
    output_directory: "public",
    copied_entries: staticEntries
  },
  errors: [],
  meta: {
    tool: "build-vercel",
    timestamp: new Date().toISOString()
  }
}, null, 2));
