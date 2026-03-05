/**
 * Region slugs used in the API (district/region identifiers).
 * Must match the slugs returned by /api/prayer-times.
 */
export const REGION_SLUGS = new Set([
  "colombo-gampaha-kalutara",
  "jaffna",
  "mullaittivu-kilinochchi-vavuniya",
  "mannar-puttalam",
  "anuradhapura-polonnaruwa",
  "kurunegala",
  "kandy-matale-nuwara-eliya",
  "batticaloa-ampara",
  "trincomalee",
  "badulla-monaragala",
  "ratnapura-kegalle",
  "galle-matara",
  "hambantota",
]);

const PRAYER_TIMES_SUFFIX = "-prayer-times";

/**
 * Short / district-style URL segments map to region slug.
 * Enables /kegalle-prayer-times and /ratnapura-prayer-times etc.
 */
const SLUG_ALIASES: Record<string, string> = {
  kegalle: "ratnapura-kegalle",
  ratnapura: "ratnapura-kegalle",
  colombo: "colombo-gampaha-kalutara",
  gampaha: "colombo-gampaha-kalutara",
  kalutara: "colombo-gampaha-kalutara",
  jaffna: "jaffna",
  kandy: "kandy-matale-nuwara-eliya",
  matale: "kandy-matale-nuwara-eliya",
  "nuwara-eliya": "kandy-matale-nuwara-eliya",
  galle: "galle-matara",
  matara: "galle-matara",
  hambantota: "hambantota",
  kurunegala: "kurunegala",
  trincomalee: "trincomalee",
  batticaloa: "batticaloa-ampara",
  ampara: "batticaloa-ampara",
  badulla: "badulla-monaragala",
  monaragala: "badulla-monaragala",
  anuradhapura: "anuradhapura-polonnaruwa",
  polonnaruwa: "anuradhapura-polonnaruwa",
  mullaittivu: "mullaittivu-kilinochchi-vavuniya",
  kilinochchi: "mullaittivu-kilinochchi-vavuniya",
  vavuniya: "mullaittivu-kilinochchi-vavuniya",
  mannar: "mannar-puttalam",
  puttalam: "mannar-puttalam",
};

/**
 * Turn a district display name into the URL path (e.g. "Kegalle" → "/kegalle-prayer-times").
 * Use this for all user-facing URLs; region is internal only.
 */
export function districtNameToPath(districtName: string): string {
  const slug = districtName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
  return `/${slug}${PRAYER_TIMES_SUFFIX}`;
}

/**
 * Convert URL segment (e.g. "kegalle" or "nuwara-eliya") to display name (e.g. "Kegalle", "Nuwara Eliya").
 */
export function slugToDistrictDisplayName(urlSegment: string): string {
  const part = urlSegment.trim();
  if (!part) return part;
  return part
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Parse URL path segment (e.g. "kegalle-prayer-times" or "ratnapura-kegalle-prayer-times")
 * and return the corresponding region slug (for internal mapping), or null if invalid.
 */
export function resolveSlugFromUrl(segment: string): string | null {
  if (!segment || typeof segment !== "string") return null;
  const trimmed = segment.trim().toLowerCase();
  if (!trimmed.endsWith(PRAYER_TIMES_SUFFIX)) return null;
  const part = trimmed.slice(0, -PRAYER_TIMES_SUFFIX.length);
  const resolved = SLUG_ALIASES[part] ?? part;
  return REGION_SLUGS.has(resolved) ? resolved : null;
}
