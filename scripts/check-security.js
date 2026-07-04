const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const mode = process.argv[2];
const blockedProtocols = ["java" + "script:", "da" + "ta:", "vb" + "script:"];
const storageNames = ["local" + "Storage", "session" + "Storage"];
const sourceMapMarker = "source" + "MappingURL";
const textExtensions = new Set([
  ".cjs",
  ".css",
  ".html",
  ".js",
  ".json",
  ".lock",
  ".md",
  ".mjs",
  ".svg",
  ".txt",
  ".webmanifest",
  ".xml",
  ".yaml",
  ".yml"
]);

function toRel(fullPath) {
  return path.relative(root, fullPath).replace(/\\/g, "/");
}

function read(rel) {
  return fs.readFileSync(path.join(root, rel), "utf8");
}

function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}

function walk(dir = root, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
      continue;
    }
    files.push(full);
  }
  return files;
}

function htmlFiles() {
  return walk().map(toRel).filter((rel) => rel.endsWith(".html")).sort();
}

function textFiles() {
  return walk()
    .map(toRel)
    .filter((rel) => textExtensions.has(path.extname(rel).toLowerCase()))
    .sort();
}

function attr(attrs, name) {
  const pattern = new RegExp("\\b" + name + "\\s*=\\s*([\"'])(.*?)\\1", "i");
  const match = attrs.match(pattern);
  return match ? match[2] : "";
}

function isDangerousUrl(value) {
  const lower = String(value || "").trim().toLowerCase();
  return blockedProtocols.some((protocol) => lower.startsWith(protocol));
}

function isExternalHttp(value) {
  return /^https?:\/\//i.test(value || "");
}

function validateHttpsUrl(value, label, failures) {
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "https:") failures.push(`${label}: external URL must use https`);
  } catch (error) {
    failures.push(`${label}: malformed URL`);
  }
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function finish(label, failures) {
  if (failures.length) {
    console.error(`${label} failed:`);
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }
  console.log(`${label} OK`);
}

function checkInline() {
  const failures = [];

  for (const file of htmlFiles()) {
    const html = read(file);

    for (const match of html.matchAll(/<script\b([^>]*)>/gi)) {
      if (!/\bsrc\s*=/i.test(match[1])) failures.push(`${file}: inline <script> is not allowed`);
    }

    if (/<style\b/i.test(html)) failures.push(`${file}: inline <style> is not allowed under CSP`);
    if (/\sstyle\s*=/i.test(html)) failures.push(`${file}: inline style attributes are not allowed under CSP`);
    if (/\son[a-z]+\s*=/i.test(html)) failures.push(`${file}: inline event handlers are not allowed`);
    if (/<form\b/i.test(html)) failures.push(`${file}: forms are not allowed in this static prototype`);

    for (const tag of html.matchAll(/<(a|script|link|img)\b([^>]*)>/gi)) {
      const value = attr(tag[2], tag[1] === "a" || tag[1] === "link" ? "href" : "src");
      if (value && isDangerousUrl(value)) failures.push(`${file}: dangerous URL in <${tag[1]}>`);
    }
  }

  finish("Inline security check", failures);
}

function cspContent(metaTag) {
  return attr(metaTag, "content");
}

function checkSecurityMeta() {
  const failures = [];
  const requiredCspParts = [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'none'"
  ];

  for (const file of htmlFiles()) {
    const html = read(file);
    const cspMeta = html.match(/<meta\b[^>]*http-equiv=["']Content-Security-Policy["'][^>]*>/i);
    const referrerMeta = html.match(/<meta\b[^>]*name=["']referrer["'][^>]*>/i);

    if (!cspMeta) {
      failures.push(`${file}: missing Content-Security-Policy meta`);
    } else {
      const content = cspContent(cspMeta[0]);
      for (const part of requiredCspParts) {
        if (!content.includes(part)) failures.push(`${file}: CSP missing ${part}`);
      }
      if (/unsafe-inline|unsafe-eval/i.test(content)) failures.push(`${file}: CSP allows unsafe inline/eval`);
      if (/script-src[^;]*\*/i.test(content)) failures.push(`${file}: CSP script-src must not allow wildcard sources`);
    }

    if (!referrerMeta || !/content=["']no-referrer["']/i.test(referrerMeta[0])) {
      failures.push(`${file}: missing no-referrer meta`);
    }
  }

  finish("Security meta check", failures);
}

function checkHtmlUrls(file, html, failures) {
  for (const match of html.matchAll(/<a\b([^>]*)>/gi)) {
    const attrs = match[1];
    const href = attr(attrs, "href");
    if (!href) continue;
    if (isDangerousUrl(href)) {
      failures.push(`${file}: dangerous href`);
      continue;
    }
    if (!isExternalHttp(href)) continue;

    validateHttpsUrl(href, `${file}: ${href}`, failures);
    const rel = attr(attrs, "rel");
    if (!/\bnoopener\b/i.test(rel) || !/\bnoreferrer\b/i.test(rel)) {
      failures.push(`${file}: external link missing rel noopener noreferrer -> ${href}`);
    }
    if (attr(attrs, "referrerpolicy").toLowerCase() !== "no-referrer") {
      failures.push(`${file}: external link missing referrerpolicy no-referrer -> ${href}`);
    }
  }

  for (const match of html.matchAll(/<a\b([^>]*)>/gi)) {
    const href = attr(match[1], "href");
    if (!href || href.startsWith("#") || /^mailto:|^tel:/i.test(href) || isExternalHttp(href) || isDangerousUrl(href)) continue;
    const localTarget = href.split("#")[0].split("?")[0];
    if (localTarget && !exists(localTarget)) failures.push(`${file}: missing local link target -> ${href}`);
  }

  for (const match of html.matchAll(/<(script|link|img)\b([^>]*)>/gi)) {
    const tag = match[1].toLowerCase();
    const value = attr(match[2], tag === "link" ? "href" : "src");
    if (!value || value.startsWith("#") || isExternalHttp(value)) continue;
    if (isDangerousUrl(value)) failures.push(`${file}: dangerous ${tag} URL`);
    const localTarget = value.split("#")[0].split("?")[0];
    if (localTarget && !exists(localTarget)) failures.push(`${file}: missing local asset -> ${value}`);
  }
}

function inspectJsonUrls(value, label, failures) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => inspectJsonUrls(item, `${label}[${index}]`, failures));
    return;
  }
  if (!value || typeof value !== "object") {
    if (typeof value === "string") {
      if (isDangerousUrl(value)) failures.push(`${label}: dangerous URL scheme`);
      if (isExternalHttp(value)) validateHttpsUrl(value, label, failures);
    }
    return;
  }

  for (const [key, next] of Object.entries(value)) {
    inspectJsonUrls(next, `${label}.${key}`, failures);
  }
}

function checkUrls() {
  const failures = [];

  for (const file of textFiles()) {
    const text = read(file);
    if (new RegExp(sourceMapMarker + "\\s*=", "i").test(text)) failures.push(`${file}: source maps must not be published`);
    if (file.endsWith(".html")) checkHtmlUrls(file, text, failures);
    if (file.endsWith(".json")) {
      try {
        inspectJsonUrls(JSON.parse(text), file, failures);
      } catch (error) {
        failures.push(`${file}: invalid JSON`);
      }
    }
  }

  finish("URL safety check", failures);
}

function checkStorage() {
  const failures = [];
  const storageFile = "assets/js/storage.js";

  if (!exists(storageFile)) failures.push("missing assets/js/storage.js");
  if (exists(storageFile) && !read(storageFile).includes("clearProjectStorage")) {
    failures.push("assets/js/storage.js: missing clearProjectStorage");
  }
  if (!read("privacy.html").includes("data-action=\"clear-local-data\"")) {
    failures.push("privacy.html: missing clear local data control");
  }

  for (const file of textFiles().filter((rel) => rel.endsWith(".js"))) {
    if (file === storageFile) continue;
    const text = read(file);
    for (const name of storageNames) {
      if (text.includes(name)) failures.push(`${file}: direct ${name} use outside storage helper`);
    }
  }

  finish("Storage isolation check", failures);
}

function checkPlaceholders() {
  const failures = [];
  const projectDomain = ["PROJECT", "DOMAIN"].join("-");
  const exampleDomain = ["example", "org"].join(".");
  const placeholderEmail = (local, domain) => `${local}@${domain}`;
  const patterns = [
    projectDomain,
    placeholderEmail("contact", projectDomain),
    placeholderEmail("privacy", projectDomain),
    placeholderEmail("security", projectDomain),
    exampleDomain,
    placeholderEmail("contact", exampleDomain),
    placeholderEmail("privacy", exampleDomain),
    placeholderEmail("security", exampleDomain),
    ["CONFIG", "REQUIRED"].join("_"),
    ["TO", "DO"].join(""),
    ["TB", "D"].join(""),
    "un" + "assigned"
  ].map((value) => ({ label: value, regex: new RegExp(escapeRegExp(value), "i") }));

  for (const file of textFiles()) {
    const text = read(file);
    for (const pattern of patterns) {
      if (pattern.regex.test(text)) failures.push(`${file}: placeholder found -> ${pattern.label}`);
    }
  }

  finish("Placeholder release check", failures);
}

function checkWorkflows() {
  const failures = [];
  const workflowsDir = path.join(root, ".github", "workflows");
  if (!fs.existsSync(workflowsDir)) {
    failures.push(".github/workflows missing");
  } else {
    for (const full of fs.readdirSync(workflowsDir).filter((file) => /\.ya?ml$/i.test(file))) {
      const rel = `.github/workflows/${full}`;
      const text = read(rel);
      for (const match of text.matchAll(/uses:\s*([^@\s]+)@([^\s#]+)/gi)) {
        const target = match[1];
        const ref = match[2];
        if (target.startsWith("./")) continue;
        if (!/^[0-9a-f]{40}$/i.test(ref)) failures.push(`${rel}: ${target} must be pinned to a full commit SHA`);
      }
    }
  }

  finish("Workflow pinning check", failures);
}

function checkSecurityDocs() {
  const failures = [];
  const requiredFiles = [
    ".well-known/security.txt",
    ".nojekyll",
    "SECURITY.md",
    "docs/vulnerability-disclosure-policy.md",
    "docs/incident-response.md",
    "docs/deployment-security-headers.md",
    "site.config.json"
  ];

  for (const file of requiredFiles) {
    if (!exists(file)) failures.push(`missing ${file}`);
  }
  if (exists(".well-known/security.txt")) {
    const securityTxt = read(".well-known/security.txt");
    for (const field of ["Contact:", "Expires:", "Canonical:", "Policy:"]) {
      if (!securityTxt.includes(field)) failures.push(`.well-known/security.txt: missing ${field}`);
    }
  }

  finish("Security documentation check", failures);
}

const modes = {
  inline: checkInline,
  "security-meta": checkSecurityMeta,
  urls: checkUrls,
  storage: checkStorage,
  placeholders: checkPlaceholders,
  workflows: checkWorkflows,
  "security-docs": checkSecurityDocs
};

if (!modes[mode]) {
  console.error(`Unknown check mode: ${mode || "(missing)"}`);
  console.error(`Expected one of: ${Object.keys(modes).join(", ")}`);
  process.exit(1);
}

modes[mode]();
