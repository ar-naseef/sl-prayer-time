/**
 * Server-only loader for prayer times data.
 * Used by the API route and by Server Components for SSR.
 */
import path from "path";
import { promises as fs } from "fs";
import type {
  PrayerTimesData,
  DistrictPrayerTimes,
  PrayerTime,
  MonthKey,
} from "@/data/prayerTimes";

const MONTH_KEYS: MonthKey[] = [
  "jan", "feb", "mar", "apr", "may", "jun",
  "jul", "aug", "sep", "oct", "nov", "dec",
];

const GROUP_TO_SLUG_AND_LABEL: Record<
  string,
  { slug: string; label: string }
> = {
  "01-COLOMBO-DISTRICT-GAMPAHA-DISTRICT-KALUTARA-DISTRICT": {
    slug: "colombo-gampaha-kalutara",
    label: "Colombo, Gampaha & Kalutara",
  },
  "02-JAFFNA-DISTRICT-NALLUR": { slug: "jaffna", label: "Jaffna / Nallur" },
  "03-MULLAITIVU-DISTRICT-EXCEPT-NALLUR-KILINOCHCHI-DISTRICT-VAVUNIYA-DISTRICT": {
    slug: "mullaittivu-kilinochchi-vavuniya",
    label: "Mullaittivu, Kilinochchi & Vavuniya",
  },
  "04-MANNAR-DISTRICT-PUTTALAM-DISTRICT": {
    slug: "mannar-puttalam",
    label: "Mannar & Puttalam",
  },
  "05-ANURADHAPURA-DISTRICT-POLONNARWA-DISTRICT": {
    slug: "anuradhapura-polonnaruwa",
    label: "Anuradhapura & Polonnaruwa",
  },
  "06-KURUNEGALA-DISTRICT": { slug: "kurunegala", label: "Kurunegala" },
  "07-KANDY-DISTRICT-MATALE-DISTRICT-NUWARA-ELIYA-DISTRICT": {
    slug: "kandy-matale-nuwara-eliya",
    label: "Kandy, Matale & Nuwara Eliya",
  },
  "08-BATTICALOA-DISTRICT-AMPARA-DISTRICT": {
    slug: "batticaloa-ampara",
    label: "Batticaloa & Ampara",
  },
  "09-TRINCOMALEE-DISTRICT": { slug: "trincomalee", label: "Trincomalee" },
  "10-BADULLA-DISTRICT-MONARAGALA-DISTRICT-PADIYATALAWA-DEHIATHTHAKANDIYA.": {
    slug: "badulla-monaragala",
    label: "Badulla & Monaragala",
  },
  "11-RATNAPURA-DISTRICT-KEGALLE-DISTRICT": {
    slug: "ratnapura-kegalle",
    label: "Ratnapura & Kegalle",
  },
  "12-GALLE-DISTRICT-MATARA-DISTRICT": {
    slug: "galle-matara",
    label: "Galle & Matara",
  },
  "13-HAMBANTOTA-DISTRICT": { slug: "hambantota", label: "Hambantota" },
};

function to24Hour(time: string): string {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return time;

  let hour = parseInt(match[1], 10);
  const minutes = match[2];
  const period = match[3].toUpperCase();

  if (period === "PM" && hour !== 12) {
    hour += 12;
  } else if (period === "AM" && hour === 12) {
    hour = 0;
  }

  return `${hour}:${minutes}`;
}

function transformGroup(groupData: Record<string, unknown>): DistrictPrayerTimes {
  const result: Partial<DistrictPrayerTimes> = {};

  for (const monthKey of MONTH_KEYS) {
    const days = groupData[monthKey];
    if (!Array.isArray(days)) continue;

    const transformed: PrayerTime[] = days.map((day: Record<string, unknown>) => {
      const dateStr = String(day.DATE ?? day.date ?? "").trim();
      let dayNumber = 0;
      if (dateStr) {
        const parts = dateStr.split("-");
        const firstPartNum = parseInt(parts[0], 10);
        const lastPartNum = parseInt(parts[parts.length - 1], 10);
        if (!isNaN(firstPartNum)) {
          dayNumber = firstPartNum;
        } else if (!isNaN(lastPartNum)) {
          dayNumber = lastPartNum;
        }
      }

      return {
        date: dayNumber,
        fajr: to24Hour(String(day.FAJR ?? day.fajr ?? "")),
        sunrise: to24Hour(String(day.SUNRISE ?? day.sunrise ?? "")),
        luhr: to24Hour(String(day.LUHR ?? day.luhr ?? "")),
        asr: to24Hour(String(day.ASR ?? day.asr ?? "")),
        magrib: to24Hour(String(day.MAGRIB ?? day.magrib ?? "")),
        isha: to24Hour(String(day.ISHA ?? day.isha ?? "")),
      };
    });

    result[monthKey as MonthKey] = transformed;
  }

  return result as DistrictPrayerTimes;
}

export interface PrayerTimesPayload {
  data: PrayerTimesData;
  districts: { value: string; label: string }[];
}

/**
 * Load and transform prayer times from the JSON file.
 * Safe to call from Server Components and API routes.
 */
export async function getPrayerTimesData(): Promise<PrayerTimesPayload> {
  const jsonPath = path.join(
    process.cwd(),
    "..",
    "one-of-scripts",
    "prayer-times.json"
  );
  const fileContents = await fs.readFile(jsonPath, "utf-8");
  const rawData = JSON.parse(fileContents) as Record<string, Record<string, unknown>>;

  const result: PrayerTimesData = {};
  const districts: { value: string; label: string }[] = [];

  for (const [groupKey, groupData] of Object.entries(rawData)) {
    const entry = GROUP_TO_SLUG_AND_LABEL[groupKey];
    if (!entry) continue;

    const transformed = transformGroup(groupData);
    result[entry.slug] = transformed;
    districts.push({ value: entry.slug, label: entry.label });
  }

  return { data: result, districts };
}
