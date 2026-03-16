import type { Metadata } from "next";
import { getPrayerTimesData } from "@/lib/prayerTimesServer";
import PrayerTimesClient from "@/components/PrayerTimesClient";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title:
    "Sri Lanka Prayer Times Today (Fajr, Dhuhr, Asr, Maghrib, Isha) – Sri Lanka Salah Times",
  description:
    "Today's Islamic prayer times for Sri Lanka (Fajr, Dhuhr, Asr, Maghrib, Isha), with a full monthly timetable by district.",
  alternates: { canonical: siteConfig.baseUrl },
};

export default async function Home() {
  const { data, districts } = await getPrayerTimesData();
  return (
    <PrayerTimesClient
      initialData={data}
      initialDistricts={districts}
    />
  );
}
