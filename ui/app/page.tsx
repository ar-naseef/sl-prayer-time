import type { Metadata } from "next";
import { getPrayerTimesData } from "@/lib/prayerTimesServer";
import PrayerTimesClient from "@/components/PrayerTimesClient";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
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
