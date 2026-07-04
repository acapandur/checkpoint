const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const htmlFiles = fs.readdirSync(root).filter((file) => file.endsWith(".html")).sort();
const failures = [];
const warnings = [];

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function stripTags(html) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "");
}

for (const file of htmlFiles) {
  const html = read(file);
  const visible = stripTags(html);

  if (/<form\b/i.test(html)) failures.push(`${file}: contains <form>`);
  if (/<input\b/i.test(html)) failures.push(`${file}: contains <input>`);
  if (/(google-analytics|googletagmanager|gtag\(|plausible|segment|mixpanel|hotjar|facebook\.net\/.*fbevents)/i.test(html)) {
    failures.push(`${file}: possible analytics/tracking script`);
  }
  if (/role=["']table["']/i.test(html)) failures.push(`${file}: use native <table> instead of role=\"table\"`);

  const h1s = html.match(/<h1\b/gi) || [];
  if (h1s.length !== 1) failures.push(`${file}: expected exactly one h1, found ${h1s.length}`);

  if (!/class=["'][^"']*skip-link/i.test(html)) failures.push(`${file}: missing skip link`);
  if (!/<main\b[^>]*id=["']main["']/i.test(html)) failures.push(`${file}: missing main#main`);
  if (!/<header\b/i.test(html) || !/<nav\b/i.test(html) || !/<footer\b/i.test(html)) {
    failures.push(`${file}: missing expected landmarks`);
  }
  if (!/Independent educational prototype\. Not medical advice\./.test(html)) {
    failures.push(`${file}: missing independence disclaimer`);
  }
  if (/TODO/i.test(visible) && !["status.html"].includes(file)) {
    warnings.push(`${file}: visible TODO text remains; prefer central status/governance wording`);
  }

  for (const match of html.matchAll(/<a\b([^>]*)>/gi)) {
    const attrs = match[1];
    const hrefMatch = attrs.match(/href=["']([^"']+)["']/i);
    if (!hrefMatch) continue;
    const href = hrefMatch[1];
    if (/^(mailto:|tel:|#|javascript:)/i.test(href)) continue;
    if (/^https?:\/\//i.test(href)) {
      const relMatch = attrs.match(/rel=["']([^"']+)["']/i);
      const rel = relMatch ? relMatch[1] : "";
      if (!/\bnoopener\b/i.test(rel) || !/\bnoreferrer\b/i.test(rel)) {
        failures.push(`${file}: external link missing rel=\"noopener noreferrer\" -> ${href}`);
      }
      continue;
    }
    const localTarget = href.split("#")[0].split("?")[0];
    if (localTarget && !fs.existsSync(path.join(root, localTarget))) {
      failures.push(`${file}: missing local link target -> ${href}`);
    }
  }
}

for (const rel of [
  "content/health-claims.json",
  "content/croatia-services.json",
  "content/launch-readiness.json",
  "assets/js/services.js",
  "assets/js/status.js"
]) {
  if (!fs.existsSync(path.join(root, rel))) failures.push(`missing required file ${rel}`);
}

const banned = [
  /HIV game/i,
  /HIV campaign/i,
  /PEP prevents/i,
  /will prevent HIV/i,
  /can hand it over/i,
  /self-start/i,
  /self service/i,
  /CheckPoint-style/i
];
const allText = htmlFiles.map(read).join("\n")
  + "\n" + read("assets/js/story.js")
  + "\n" + read("assets/js/game.js");
for (const pattern of banned) {
  if (pattern.test(allText)) failures.push(`banned overclaim phrase found: ${pattern}`);
}

if (warnings.length) {
  console.warn("Site check warnings:");
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (failures.length) {
  console.error("Site checks failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Site checks OK: ${htmlFiles.length} HTML files, links, landmarks, disclaimers and safety wording.`);
