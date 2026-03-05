import { getPrayerTimesData } from "@/lib/prayerTimesServer";
import PrayerTimesClient from "@/components/PrayerTimesClient";

export default async function Home() {
  const { data, districts } = await getPrayerTimesData();
  return (
    <PrayerTimesClient
      initialData={data}
      initialDistricts={districts}
    />
  );
}
