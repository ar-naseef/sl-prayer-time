/**
 * Canonical base URL for the site (used in metadata, sitemap, Open Graph).
 * Set NEXT_PUBLIC_APP_URL in production (e.g. https://sriprayertimes.com).
 * On Vercel, VERCEL_URL is used as fallback.
 */
function getBaseUrl(): string {
  if (typeof process.env.NEXT_PUBLIC_APP_URL === "string" && process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  }
  if (typeof process.env.VERCEL_URL === "string" && process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "https://srilanka-prayer-times.vercel.app";
}

export const siteConfig = {
  name: "Sri Lanka Prayer Times",
  description: "Accurate daily Islamic prayer times (Fajr, Dhuhr, Asr, Maghrib, Isha) for all districts in Sri Lanka. Select your region for today and monthly times.",
  baseUrl: getBaseUrl(),
} as const;
