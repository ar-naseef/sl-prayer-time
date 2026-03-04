/** Format 24h time string (e.g. "17:30" or "5:0") for display as 12h with AM/PM */
export function formatTimeForDisplay(time24: string): string {
  const parts = time24.trim().split(':');
  const h = parseInt(parts[0], 10);
  const m = parts[1] ? parseInt(parts[1], 10) : 0;
  if (isNaN(h)) return time24;
  const date = new Date(2000, 0, 1, h, isNaN(m) ? 0 : m);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

export interface PrayerTime {
  date: number;
  fajr: string;
  sunrise: string;
  luhr: string;
  asr: string;
  magrib: string;
  isha: string;
}

export type MonthKey =
  | 'jan'
  | 'feb'
  | 'mar'
  | 'apr'
  | 'may'
  | 'jun'
  | 'jul'
  | 'aug'
  | 'sep'
  | 'oct'
  | 'nov'
  | 'dec';

export type DistrictPrayerTimes = Record<MonthKey, PrayerTime[]>;

export type PrayerTimesData = Record<string, DistrictPrayerTimes>;
