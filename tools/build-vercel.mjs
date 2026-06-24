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
  "privacy.html",
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

function injectContactEmail() {
  const email = (process.env.CONTACT_FORM_TO_EMAIL || "info@ajplumbing.co.za").trim();
  const pagesWithForm = ["index.html", "contact.html"];

  for (const page of pagesWithForm) {
    const target = path.join(publicDir, page);
    if (!fs.existsSync(target)) continue;
    const html = fs.readFileSync(target, "utf8").split("__CONTACT_FORM_EMAIL__").join(email);
    fs.writeFileSync(target, html);
  }

  return email;
}

function injectSiteUrl() {
  const siteUrl = (process.env.SITE_URL || "https://ajplumbing.co.za").replace(/\/$/, "").trim();
  const files = ["sitemap.xml", "robots.txt", "index.html", "solar.html", "plumbing.html", "contact.html", "privacy.html"];

  for (const file of files) {
    const target = path.join(publicDir, file);
    if (!fs.existsSync(target)) continue;
    const content = fs.readFileSync(target, "utf8").split("__SITE_URL__").join(siteUrl);
    fs.writeFileSync(target, content);
  }

  return siteUrl;
}

await validate();
resetPublicDir();

for (const entry of staticEntries) {
  copyEntry(entry);
}

const contactEmail = injectContactEmail();
const siteUrl = injectSiteUrl();

console.log(JSON.stringify({
  ok: true,
  data: {
    output_directory: "public",
    copied_entries: staticEntries,
    contact_email_injected: Boolean(contactEmail),
    site_url_injected: siteUrl
  },
  errors: [],
  meta: {
    tool: "build-vercel",
    timestamp: new Date().toISOString()
  }
}, null, 2));
