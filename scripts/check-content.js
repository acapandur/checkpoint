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

function enumValue(value, allowed, label) {
  if (!allowed.includes(value)) failures.push(`${label}: invalid value ${value}`);
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
      "notes"
    ], label);
    enumValue(claim.category, ["PEP", "PrEP", "HIV testing", "emergency", "privacy", "service route", "stigma", "other"], `${label}.category`);
    enumValue(claim.medicalReviewStatus, ["unreviewed", "needs-review", "reviewed"], `${label}.medicalReviewStatus`);
    date(claim.dateLastVerified, `${label}.dateLastVerified`);
    date(claim.nextReviewDate, `${label}.nextReviewDate`);
    if (claim.medicalReviewStatus === "reviewed" && /unassigned/i.test(claim.owner)) {
      failures.push(`${label}: reviewed claim cannot have unassigned owner`);
    }
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
      "notes"
    ], label);
    if (!Array.isArray(service.serviceTypes) || !service.serviceTypes.length) failures.push(`${label}: serviceTypes must be a non-empty array`);
    for (const type of service.serviceTypes || []) enumValue(type, allowedTypes, `${label}.serviceTypes`);
    enumValue(service.appointmentRequired, ["yes", "no", "unknown"], `${label}.appointmentRequired`);
    enumValue(service.anonymous, ["yes", "no", "unknown"], `${label}.anonymous`);
    enumValue(service.free, ["yes", "no", "unknown"], `${label}.free`);
    enumValue(service.status, ["verified", "needs-verification", "temporarily-unavailable", "unknown"], `${label}.status`);
    date(service.dateLastVerified, `${label}.dateLastVerified`);
    if (!/^https?:\/\//.test(service.sourceUrl || "")) failures.push(`${label}: sourceUrl must be absolute`);
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
  }
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
