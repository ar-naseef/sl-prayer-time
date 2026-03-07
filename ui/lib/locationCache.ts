/**
 * Persist user's selected location (district) in localStorage
 * so it can be restored when they return to the app.
 */

const STORAGE_KEY = "sl-prayer-times-location";

export interface CachedLocation {
  regionSlug: string;
  districtName: string;
}

export function saveLocation(regionSlug: string, districtName: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ regionSlug, districtName })
    );
  } catch {
    // ignore quota / private mode
  }
}

export function getCachedLocation(): CachedLocation | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (
      parsed &&
      typeof parsed === "object" &&
      "regionSlug" in parsed &&
      "districtName" in parsed &&
      typeof (parsed as CachedLocation).regionSlug === "string" &&
      typeof (parsed as CachedLocation).districtName === "string"
    ) {
      return parsed as CachedLocation;
    }
  } catch {
    // ignore invalid JSON
  }
  return null;
}
