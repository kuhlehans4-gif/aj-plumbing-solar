import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const requiredFiles = [
  "index.html",
  "solar.html",
  "plumbing.html",
  "contact.html",
  "404.html",
  "css/styles.css",
  "js/main.js",
  "api/contact.js",
  "robots.txt",
  "sitemap.xml",
  "vercel.json",
  "assets/logo-transparent.png",
  "assets/logo-mark-transparent.png",
  "assets/hero-solar-plumbing.png",
  "assets/service-solar.png",
  "assets/service-plumbing.png",
  "assets/ai-solar-home.png",
  "assets/ai-plumbing-detail.png",
  "assets/ai-inverter-battery.png",
  "assets/ai-water-storage.png",
  "assets/visual-solar-home.svg",
  "assets/visual-plumbing-detail.svg",
  "assets/visual-inverter-battery.svg",
  "assets/visual-water-storage.svg",
  "assets/graphic-service-system.svg"
];

const htmlFiles = ["index.html", "solar.html", "plumbing.html", "contact.html"];
const errors = [];

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) {
    errors.push(`Missing required file: ${file}`);
  }
}

for (const file of htmlFiles) {
  if (!fs.existsSync(path.join(root, file))) continue;
  const html = read(file);
  if (!/<title>[^<]{20,}<\/title>/.test(html)) errors.push(`${file}: missing useful title`);
  if (!/<meta name="description" content="[^"]{60,}"/.test(html)) errors.push(`${file}: missing useful meta description`);
  if (!/<link rel="canonical" href="https:\/\/ajplumbing\.co\.za/.test(html)) errors.push(`${file}: missing canonical URL`);
  if (!html.includes("A&amp;J Plumbing &amp; Solar")) errors.push(`${file}: brand name missing`);
  if (!html.includes("082 828 5896")) errors.push(`${file}: phone number missing`);
  if (!html.includes("info@ajplumbing.co.za")) errors.push(`${file}: email missing`);

  const imageRefs = [...html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)].map((match) => match[1]);
  for (const src of imageRefs) {
    if (!src.startsWith("/")) continue;
    const imagePath = path.join(root, src);
    if (!fs.existsSync(imagePath)) errors.push(`${file}: missing referenced image ${src}`);
  }
}

if (fs.existsSync(path.join(root, "index.html"))) {
  const html = read("index.html");
  const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!jsonLdMatch) {
    errors.push("index.html: missing JSON-LD");
  } else {
    try {
      JSON.parse(jsonLdMatch[1]);
    } catch (error) {
      errors.push(`index.html: invalid JSON-LD: ${error.message}`);
    }
  }
}

if (fs.existsSync(path.join(root, "api/contact.js"))) {
  const contactApi = read("api/contact.js");
  if (!contactApi.includes("CONTACT_FORM_TO_EMAIL")) errors.push("api/contact.js: missing CONTACT_FORM_TO_EMAIL env var check");
  if (!contactApi.includes("formsubmit.co")) errors.push("api/contact.js: missing FormSubmit endpoint");
}

const textFiles = [
  ...htmlFiles,
  "js/main.js",
  "api/contact.js",
  "README.md",
  ".env.example"
].filter((file) => fs.existsSync(path.join(root, file)));

for (const file of textFiles) {
  const content = read(file);
  if (/sk-[A-Za-z0-9_-]{12,}/.test(content)) errors.push(`${file}: possible API key found`);
  if (/WEB3FORMS_ACCESS_KEY=.+/.test(content) && !content.includes("WEB3FORMS_ACCESS_KEY=\n")) {
    errors.push(`${file}: Web3Forms key must not be committed`);
  }
}

if (errors.length > 0) {
  console.error(JSON.stringify({ ok: false, errors }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  data: {
    checked_files: requiredFiles.length,
    html_pages: htmlFiles.length
  },
  errors: [],
  meta: {
    tool: "validate-site",
    timestamp: new Date().toISOString()
  }
}, null, 2));
