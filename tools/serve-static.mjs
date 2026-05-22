import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = Number(process.env.PORT || 4173);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webmanifest": "application/manifest+json; charset=utf-8"
};

function resolveRequest(url) {
  const requestPath = decodeURIComponent(new URL(url, `http://localhost:${port}`).pathname);
  const cleanPath = requestPath === "/" ? "/index.html" : requestPath;
  const candidates = [
    path.join(root, cleanPath),
    path.join(root, `${cleanPath}.html`),
    path.join(root, cleanPath, "index.html")
  ];

  for (const candidate of candidates) {
    if (candidate.startsWith(root) && fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }

  return path.join(root, "404.html");
}

const server = http.createServer((req, res) => {
  if (req.url?.startsWith("/api/contact")) {
    res.writeHead(503, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({
      ok: false,
      errors: [{ type: "LocalServer", message: "Run on Vercel to test live contact delivery.", details: {} }]
    }));
    return;
  }

  const file = resolveRequest(req.url || "/");
  const ext = path.extname(file);
  const status = path.basename(file) === "404.html" ? 404 : 200;
  res.writeHead(status, { "Content-Type": types[ext] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});

server.listen(port, () => {
  console.log(`A&J Plumbing & Solar preview: http://localhost:${port}`);
});
