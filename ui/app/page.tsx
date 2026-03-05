"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { toast } from "sonner";
import Header from "@/components/Header";
import FilterBar from "@/components/FilterBar";
import TodayHighlight from "@/components/TodayHighlight";
import MonthlyView from "@/components/MonthlyView";
import type {
  PrayerTimesData,
  DistrictPrayerTimes,
  PrayerTime,
} from "@/data/prayerTimes";
import { formatTimeForDisplay } from "@/data/prayerTimes";

const months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type DistrictCoord = {
  regionSlug: string;
  district: string;
  lat: number;
  lng: number;
};

// Approximate centers for each district, mapped to the prayer-time regions
const DISTRICT_COORDS: DistrictCoord[] = [
  // Colombo, Gampaha, Kalutara (Western)
  { regionSlug: "colombo-gampaha-kalutara", district: "Colombo", lat: 6.927, lng: 79.861 },
  { regionSlug: "colombo-gampaha-kalutara", district: "Gampaha", lat: 7.094, lng: 79.991 },
  { regionSlug: "colombo-gampaha-kalutara", district: "Kalutara", lat: 6.585, lng: 79.96 },

  // Kandy, Matale, Nuwara Eliya (Central)
  { regionSlug: "kandy-matale-nuwara-eliya", district: "Kandy", lat: 7.29, lng: 80.633 },
  { regionSlug: "kandy-matale-nuwara-eliya", district: "Matale", lat: 7.466, lng: 80.623 },
  { regionSlug: "kandy-matale-nuwara-eliya", district: "Nuwara Eliya", lat: 6.949, lng: 80.787 },

  // Galle, Matara (Southern)
  { regionSlug: "galle-matara", district: "Galle", lat: 6.053, lng: 80.22 },
  { regionSlug: "galle-matara", district: "Matara", lat: 5.948, lng: 80.537 },

  // Hambantota (Southern)
  { regionSlug: "hambantota", district: "Hambantota", lat: 6.139, lng: 81.119 },

  // Jaffna (Northern)
  { regionSlug: "jaffna", district: "Jaffna", lat: 9.664, lng: 80.016 },

  // Kilinochchi, Mannar, Mullaitivu, Vavuniya (Northern)
  { regionSlug: "mullaittivu-kilinochchi-vavuniya", district: "Kilinochchi", lat: 9.368, lng: 80.3213 },
  { regionSlug: "mannar-puttalam", district: "Mannar", lat: 8.98, lng: 79.904 },
  { regionSlug: "mullaittivu-kilinochchi-vavuniya", district: "Mullaitivu", lat: 9.2236, lng: 80.7909 },
  { regionSlug: "mullaittivu-kilinochchi-vavuniya", district: "Vavuniya", lat: 8.752, lng: 80.495 },

  // Anuradhapura, Polonnaruwa (North Central)
  { regionSlug: "anuradhapura-polonnaruwa", district: "Anuradhapura", lat: 8.311, lng: 80.387 },
  { regionSlug: "anuradhapura-polonnaruwa", district: "Polonnaruwa", lat: 7.94, lng: 81.0 },

  // Kurunegala, Puttalam (North Western)
  { regionSlug: "kurunegala", district: "Kurunegala", lat: 7.74, lng: 80.19 },
  { regionSlug: "mannar-puttalam", district: "Puttalam", lat: 8.033, lng: 79.829 },

  // Ratnapura, Kegalle (Sabaragamuwa)
  { regionSlug: "ratnapura-kegalle", district: "Ratnapura", lat: 6.682, lng: 80.399 },
  { regionSlug: "ratnapura-kegalle", district: "Kegalle", lat: 7.25, lng: 80.342 },

  // Trincomalee, Batticaloa, Ampara (Eastern)
  { regionSlug: "trincomalee", district: "Trincomalee", lat: 8.587, lng: 81.215 },
  { regionSlug: "batticaloa-ampara", district: "Batticaloa", lat: 7.716, lng: 81.694 },
  { regionSlug: "batticaloa-ampara", district: "Ampara", lat: 7.296, lng: 81.674 },

  // Badulla, Monaragala (Uva)
  { regionSlug: "badulla-monaragala", district: "Badulla", lat: 6.993, lng: 81.055 },
  { regionSlug: "badulla-monaragala", district: "Monaragala", lat: 6.87, lng: 81.348 },
];

const toRad = (value: number) => (value * Math.PI) / 180;

const distanceKm = (lat1: number, lng1: number, lat2: number, lng2: number) => {
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

function getNearestRegionSlug(lat: number, lng: number): string | null {
  let bestSlug: string | null = null;
  let bestDistance = Number.POSITIVE_INFINITY;

  for (const coord of DISTRICT_COORDS) {
    const d = distanceKm(lat, lng, coord.lat, coord.lng);
    if (d < bestDistance) {
      bestDistance = d;
      bestSlug = coord.regionSlug;
    }
  }

  // If the user is clearly far from Sri Lanka, don't auto-select
  if (bestDistance > 500) return null;
  return bestSlug;
}

export default function Home() {
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(
    new Date().getMonth(),
  );
  const [isLoading, setIsLoading] = useState(true);
  const [prayerTimesData, setPrayerTimesData] =
    useState<PrayerTimesData | null>(null);
  const [districts, setDistricts] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/prayer-times");
        if (!res.ok) {
          throw new Error("Failed to load prayer times");
        }
        const json = await res.json();
        setPrayerTimesData(json.data ?? json);
        setDistricts(json.districts ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const districtData: DistrictPrayerTimes | null = useMemo(() => {
    if (!selectedDistrict || !prayerTimesData) return null;
    return prayerTimesData[selectedDistrict] || null;
  }, [selectedDistrict, prayerTimesData]);

  const monthData: PrayerTime[] = useMemo(() => {
    if (!districtData) return [];
    const monthKey = months[selectedMonthIndex] as keyof DistrictPrayerTimes;
    return districtData[monthKey] || [];
  }, [districtData, selectedMonthIndex]);

  const todayData: PrayerTime | null = useMemo(() => {
    if (!monthData.length) return null;
    const todayDate = new Date().getDate();
    return monthData.find((day) => day.date === todayDate) || null;
  }, [monthData]);

  const getOrdinal = (n: number) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  const buildPrayerTimesCopyText = useCallback(() => {
    if (!prayerTimesData || !districts.length) return "";
    const now = new Date();
    const monthIdx = now.getMonth();
    const day = now.getDate();
    const year = now.getFullYear();
    const monthName = monthNames[monthIdx];
    const monthKey = months[monthIdx] as keyof DistrictPrayerTimes;
    const lines: string[] = [
      "Prayer Time SL",
      "",
      `${monthName} ${year} (${getOrdinal(day)})`,
      "",
    ];
    for (const { value, label } of districts) {
      const districtData = prayerTimesData[value];
      if (!districtData) continue;
      const monthRows = districtData[monthKey];
      if (!monthRows?.length) continue;
      const dayRow = monthRows.find((r) => r.date === day);
      if (!dayRow) continue;
      lines.push(`*${label}*`);
      lines.push("");
      lines.push(`Subah – ${formatTimeForDisplay(dayRow.fajr)}`);
      lines.push(`Sunrise – ${formatTimeForDisplay(dayRow.sunrise)}`);
      lines.push(`Luhar – ${formatTimeForDisplay(dayRow.luhr)}`);
      lines.push(`Asr – ${formatTimeForDisplay(dayRow.asr)}`);
      lines.push(`Magrib – ${formatTimeForDisplay(dayRow.magrib)}`);
      lines.push(`Isha – ${formatTimeForDisplay(dayRow.isha)}`);
      lines.push("");
    }
    return lines.join("\n").trimEnd();
  }, [prayerTimesData, districts]);

  const handleCopyPrayerTimes = useCallback(async () => {
    const text = buildPrayerTimesCopyText();
    if (!text) {
      toast.error("Prayer times not loaded yet");
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard for WhatsApp");
    } catch {
      toast.error("Failed to copy");
    }
  }, [buildPrayerTimesCopyText]);

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <main className="relative">
        <Header onCopyPrayerTimes={handleCopyPrayerTimes} copyEnabled={!!prayerTimesData && districts.length > 0} />

        <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
          <FilterBar
            districts={districts}
            selectedDistrict={selectedDistrict}
            onDistrictChange={setSelectedDistrict}
            selectedMonthIndex={selectedMonthIndex}
            onMonthChange={setSelectedMonthIndex}
            months={monthNames}
            isLoading={isLoading}
          />

          {!selectedDistrict && !isLoading && districts.length > 0 && (
            <div className="mt-8 border border-dashed border-border bg-card/30 p-12 text-center">
              <p className="text-muted-foreground text-lg font-medium">
                Select your location above to see prayer times for your area.
              </p>
              <p className="text-muted-foreground/80 text-sm mt-2">
                Choose from 13 regions across Sri Lanka.
              </p>
            </div>
          )}

          {isLoading && (
            <div className="mt-8 space-y-8 animate-pulse">
              <div className="h-32 bg-muted/50" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-24 bg-muted/40" />
                ))}
              </div>
            </div>
          )}

          {districtData && !isLoading && (
            <div className="mt-8 flex flex-col gap-8">
              {todayData && (
                <TodayHighlight prayerTimes={todayData} />
              )}

              <MonthlyView
                data={monthData}
                district={selectedDistrict}
                month={monthNames[selectedMonthIndex]}
                isCurrentMonth={selectedMonthIndex === new Date().getMonth()}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
