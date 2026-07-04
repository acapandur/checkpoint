const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const contentDir = path.join(root, "content");
const failures = [];

function readJson(rel) {
  const full = path.join(root, rel);
  try {
    return JSON.parse(fs.readFileSync(full, "utf8"));
  } catch (error) {
    failures.push(`${rel}: ${error.message}`);
    return null;
  }
}

function required(obj, fields, label) {
  for (const field of fields) {
    if (!(field in obj) || obj[field] === "" || obj[field] == null) {
      failures.push(`${label}: missing ${field}`);
    }
  }
}

function uniqueIds(items, label) {
  const seen = new Set();
  for (const item of items) {
    if (seen.has(item.id)) failures.push(`${label}: duplicate id ${item.id}`);
    seen.add(item.id);
  }
}

function date(value, label) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) failures.push(`${label}: invalid date ${value}`);
}

function nullableDate(value, label) {
  if (value == null) return;
  date(value, label);
}

function enumValue(value, allowed, label) {
  if (!allowed.includes(value)) failures.push(`${label}: invalid value ${value}`);
}

function sourceValue(value, label) {
  if (!value || typeof value !== "string") {
    failures.push(`${label}: missing source`);
    return;
  }
  if (/^https?:\/\//i.test(value) && !/^https:\/\//i.test(value)) failures.push(`${label}: source must use https`);
}

function verificationFields(item, label) {
  required(item, ["verificationStatus", "source"], label);
  for (const field of ["verifiedAt", "expiresAt"]) {
    if (!(field in item)) failures.push(`${label}: missing ${field}`);
  }
  enumValue(item.verificationStatus, ["verified", "needs-verification", "unverified"], `${label}.verificationStatus`);
  sourceValue(item.source, `${label}.source`);
  nullableDate(item.verifiedAt, `${label}.verifiedAt`);
  nullableDate(item.expiresAt, `${label}.expiresAt`);
  if (item.verificationStatus === "verified") {
    date(item.verifiedAt, `${label}.verifiedAt`);
    date(item.expiresAt, `${label}.expiresAt`);
  }
}

const claims = readJson("content/health-claims.json");
if (claims) {
  required(claims, ["schemaVersion", "lastInventoryUpdate", "claims"], "health-claims");
  date(claims.lastInventoryUpdate, "health-claims.lastInventoryUpdate");
  uniqueIds(claims.claims || [], "health-claims");
  for (const claim of claims.claims || []) {
    const label = `health-claims ${claim.id}`;
    required(claim, [
      "id",
      "pageOrComponent",
      "claimHr",
      "category",
      "sourceUrl",
      "sourceName",
      "dateLastVerified",
      "nextReviewDate",
      "owner",
      "medicalReviewStatus",
      "notes",
      "verificationStatus",
      "source"
    ], label);
    enumValue(claim.category, ["PEP", "PrEP", "HIV testing", "emergency", "privacy", "service route", "stigma", "other"], `${label}.category`);
    enumValue(claim.medicalReviewStatus, ["unreviewed", "needs-review", "reviewed"], `${label}.medicalReviewStatus`);
    date(claim.dateLastVerified, `${label}.dateLastVerified`);
    date(claim.nextReviewDate, `${label}.nextReviewDate`);
    verificationFields(claim, label);
    if (claim.medicalReviewStatus === "reviewed" && claim.owner === "not-appointed") failures.push(`${label}: reviewed claim needs an appointed owner`);
  }
}

const services = readJson("content/croatia-services.json");
if (services) {
  required(services, ["schemaVersion", "lastInventoryUpdate", "services"], "croatia-services");
  date(services.lastInventoryUpdate, "croatia-services.lastInventoryUpdate");
  uniqueIds(services.services || [], "croatia-services");
  const allowedTypes = ["HIV testing", "counseling", "PEP", "PrEP", "emergency", "psychosocial support", "STI testing", "hepatitis testing", "other"];
  for (const service of services.services || []) {
    const label = `croatia-services ${service.id}`;
    required(service, [
      "id",
      "serviceName",
      "city",
      "address",
      "serviceTypes",
      "phone",
      "email",
      "website",
      "workingHours",
      "appointmentRequired",
      "anonymous",
      "free",
      "sourceUrl",
      "sourceName",
      "dateLastVerified",
      "status",
      "notes",
      "verificationStatus",
      "source"
    ], label);
    if (!Array.isArray(service.serviceTypes) || !service.serviceTypes.length) failures.push(`${label}: serviceTypes must be a non-empty array`);
    for (const type of service.serviceTypes || []) enumValue(type, allowedTypes, `${label}.serviceTypes`);
    enumValue(service.appointmentRequired, ["yes", "no", "unknown"], `${label}.appointmentRequired`);
    enumValue(service.anonymous, ["yes", "no", "unknown"], `${label}.anonymous`);
    enumValue(service.free, ["yes", "no", "unknown"], `${label}.free`);
    enumValue(service.status, ["verified", "needs-verification", "temporarily-unavailable", "unknown"], `${label}.status`);
    date(service.dateLastVerified, `${label}.dateLastVerified`);
    verificationFields(service, label);
    if (service.status !== "verified" && service.verificationStatus === "verified") failures.push(`${label}: verificationStatus cannot be verified while service status is ${service.status}`);
    if (!/^https:\/\//.test(service.sourceUrl || "")) failures.push(`${label}: sourceUrl must be absolute https`);
    if (service.website !== "unknown" && !/^https:\/\//.test(service.website || "")) failures.push(`${label}: website must be https or unknown`);
  }
}

const readiness = readJson("content/launch-readiness.json");
if (readiness) {
  required(readiness, ["schemaVersion", "lastProjectReview", "status", "items"], "launch-readiness");
  date(readiness.lastProjectReview, "launch-readiness.lastProjectReview");
  enumValue(readiness.status, ["prototype", "internal-review", "public-ready"], "launch-readiness.status");
  uniqueIds(readiness.items || [], "launch-readiness");
  for (const item of readiness.items || []) {
    const label = `launch-readiness ${item.id}`;
    required(item, ["id", "labelHr", "labelEn", "status", "owner", "notesHr", "notesEn"], label);
    enumValue(item.status, ["not started", "in progress", "blocked", "complete"], `${label}.status`);
    if (item.status === "complete" && item.owner === "not-appointed") failures.push(`${label}: complete item needs an appointed owner`);
  }
}

const htmlFiles = fs.readdirSync(root).filter((file) => file.endsWith(".html")).sort();
const trackingPattern = new RegExp([
  ["google", "analytics"].join("-"),
  ["google", "tag", "manager"].join(""),
  ["g", "tag"].join("") + "\\(",
  ["plaus", "ible"].join(""),
  ["seg", "ment"].join(""),
  ["mix", "panel"].join(""),
  ["hot", "jar"].join(""),
  ["facebook", "net"].join("\\.") + "/.*" + ["fb", "events"].join("")
].join("|"), "i");
function stripExecutableBlocks(html) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "");
}

for (const file of htmlFiles) {
  const html = fs.readFileSync(path.join(root, file), "utf8");
  const visible = stripExecutableBlocks(html);
  const h1s = html.match(/<h1\b/gi) || [];
  if (h1s.length !== 1) failures.push(`${file}: expected exactly one h1, found ${h1s.length}`);
  if (!/class=["'][^"']*skip-link/i.test(html)) failures.push(`${file}: missing skip link`);
  if (!/<main\b[^>]*id=["']main["']/i.test(html)) failures.push(`${file}: missing main#main`);
  if (!/<header\b/i.test(html) || !/<nav\b/i.test(html) || !/<footer\b/i.test(html)) failures.push(`${file}: missing expected landmarks`);
  if (/role=["']table["']/i.test(html)) failures.push(`${file}: use native table markup instead of role table`);
  if (trackingPattern.test(html)) failures.push(`${file}: possible analytics or tracking script`);
  if (!/Independent educational prototype\. Not medical advice\./.test(visible)) failures.push(`${file}: missing independence disclaimer`);
}

const bannedPhrases = [
  /HIV game/i,
  /HIV campaign/i,
  /PEP prevents/i,
  /will prevent HIV/i,
  /can hand it over/i,
  /self-start/i,
  /self service/i,
  /CheckPoint-style/i
];
const campaignText = htmlFiles.map((file) => fs.readFileSync(path.join(root, file), "utf8")).join("\n")
  + "\n" + fs.readFileSync(path.join(root, "assets/js/story.js"), "utf8")
  + "\n" + fs.readFileSync(path.join(root, "assets/js/game.js"), "utf8");
for (const pattern of bannedPhrases) {
  if (pattern.test(campaignText)) failures.push(`banned overclaim phrase found: ${pattern}`);
}

for (const rel of [
  "content/schemas/health-claims.schema.json",
  "content/schemas/croatia-services.schema.json",
  "content/schemas/launch-readiness.schema.json",
  "content/schemas/localized-strings.schema.json"
]) {
  readJson(rel);
}

if (!fs.existsSync(contentDir)) failures.push("content directory missing");

if (failures.length) {
  console.error("Content checks failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Content checks OK: health claims, Croatian services, launch readiness and schemas.");
