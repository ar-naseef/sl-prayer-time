"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CopyPrayerTimesModal from "@/components/CopyPrayerTimesModal";
import FilterBar from "@/components/FilterBar";
import TodayHighlight from "@/components/TodayHighlight";
import MonthlyView from "@/components/MonthlyView";
import type {
  PrayerTimesData,
  DistrictPrayerTimes,
  PrayerTime,
} from "@/data/prayerTimes";
import { formatTimeForDisplay } from "@/data/prayerTimes";
import { districtNameToPath } from "@/lib/regions";

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

// Region slug → district names for the location dropdown
const REGION_DISTRICTS: { regionSlug: string; district: string }[] = [
  { regionSlug: "colombo-gampaha-kalutara", district: "Colombo" },
  { regionSlug: "colombo-gampaha-kalutara", district: "Gampaha" },
  { regionSlug: "colombo-gampaha-kalutara", district: "Kalutara" },
  { regionSlug: "ratnapura-kegalle", district: "Ratnapura" },
  { regionSlug: "ratnapura-kegalle", district: "Kegalle" },
  { regionSlug: "kandy-matale-nuwara-eliya", district: "Kandy" },
  { regionSlug: "kandy-matale-nuwara-eliya", district: "Matale" },
  { regionSlug: "kandy-matale-nuwara-eliya", district: "Nuwara Eliya" },
  { regionSlug: "galle-matara", district: "Galle" },
  { regionSlug: "galle-matara", district: "Matara" },
  { regionSlug: "hambantota", district: "Hambantota" },
  { regionSlug: "jaffna", district: "Jaffna" },
  { regionSlug: "mullaittivu-kilinochchi-vavuniya", district: "Kilinochchi" },
  { regionSlug: "mannar-puttalam", district: "Mannar" },
  { regionSlug: "mullaittivu-kilinochchi-vavuniya", district: "Mullaitivu" },
  { regionSlug: "mullaittivu-kilinochchi-vavuniya", district: "Vavuniya" },
  { regionSlug: "anuradhapura-polonnaruwa", district: "Anuradhapura" },
  { regionSlug: "anuradhapura-polonnaruwa", district: "Polonnaruwa" },
  { regionSlug: "kurunegala", district: "Kurunegala" },
  { regionSlug: "mannar-puttalam", district: "Puttalam" },
  { regionSlug: "trincomalee", district: "Trincomalee" },
  { regionSlug: "batticaloa-ampara", district: "Batticaloa" },
  { regionSlug: "batticaloa-ampara", district: "Ampara" },
  { regionSlug: "badulla-monaragala", district: "Badulla" },
  { regionSlug: "badulla-monaragala", district: "Monaragala" },
];

interface PrayerTimesPageProps {
  /** Region slug from URL (internal mapping). */
  initialRegionSlug?: string | null;
  /** District name for display and URL (e.g. "Kegalle"). */
  initialDistrictName?: string | null;
}

export default function Home({
  initialRegionSlug,
  initialDistrictName,
}: PrayerTimesPageProps) {
  const router = useRouter();
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedDistrictName, setSelectedDistrictName] = useState<string>("");
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(
    new Date().getMonth(),
  );
  const [isLoading, setIsLoading] = useState(true);
  const [prayerTimesData, setPrayerTimesData] =
    useState<PrayerTimesData | null>(null);
  const [districts, setDistricts] = useState<
    { value: string; label: string }[]
  >([]);
  const [copyModalOpen, setCopyModalOpen] = useState(false);

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

  useEffect(() => {
    if (!districts.length) return;
    if (selectedDistrict) return;
    if (initialRegionSlug && initialDistrictName) {
      const exists = districts.some((d) => d.value === initialRegionSlug);
      if (exists) {
        setSelectedDistrict(initialRegionSlug);
        setSelectedDistrictName(initialDistrictName);
      }
    }
  }, [districts, initialRegionSlug, initialDistrictName, selectedDistrict]);

  const handleDistrictChange = useCallback(
    (regionValue: string, districtName: string) => {
      setSelectedDistrict(regionValue);
      setSelectedDistrictName(districtName);
      router.push(districtNameToPath(districtName));
    },
    [router],
  );

  // Group regions by district names for the dropdown (region label = group header, district names = options)
  const groupedDistricts = useMemo(() => {
    return districts.map((d) => {
      const names = REGION_DISTRICTS.filter((c) => c.regionSlug === d.value).map(
        (c) => c.district,
      );
      return {
        value: d.value,
        label: d.label,
        districtNames: names.length > 0 ? names : [d.label],
      };
    });
  }, [districts]);

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

  const buildPrayerTimesCopyTextForRegions = useCallback(
    (selectedSlugs: string[]) => {
      if (!prayerTimesData || !districts.length) return "";
      const slugSet = new Set(selectedSlugs);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const monthIdx = tomorrow.getMonth();
      const day = tomorrow.getDate();
      const year = tomorrow.getFullYear();
      const monthName = monthNames[monthIdx];
      const monthKey = months[monthIdx] as keyof DistrictPrayerTimes;
      const lines: string[] = [
        "Prayer Time SL",
        "",
        `${monthName} ${year} (${getOrdinal(day)})`,
        "",
      ];
      for (const { value, label } of districts) {
        if (!slugSet.has(value)) continue;
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
    },
    [prayerTimesData, districts]
  );

  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors duration-300">
      <main className="relative flex-1">
        <Header />

        <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
          <FilterBar
            districts={districts}
            groupedDistricts={groupedDistricts}
            selectedDistrict={selectedDistrict}
            selectedDistrictName={selectedDistrictName}
            onDistrictChange={handleDistrictChange}
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
      <CopyPrayerTimesModal
        open={copyModalOpen}
        onOpenChange={setCopyModalOpen}
        districts={districts}
        getCopyTextForRegions={buildPrayerTimesCopyTextForRegions}
      />
      <Footer
        onCopyClick={() => setCopyModalOpen(true)}
        copyEnabled={!!prayerTimesData && districts.length > 0}
      />
    </div>
  );
}
