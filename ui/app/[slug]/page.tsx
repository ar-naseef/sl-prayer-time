import { redirect } from "next/navigation";
import {
  resolveSlugFromUrl,
  slugToDistrictDisplayName,
} from "@/lib/regions";
import { getPrayerTimesData } from "@/lib/prayerTimesServer";
import PrayerTimesClient from "@/components/PrayerTimesClient";

const PRAYER_TIMES_SUFFIX = "-prayer-times";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function DistrictPage({ params }: PageProps) {
  const { slug } = await params;
  if (!slug || !slug.toLowerCase().endsWith(PRAYER_TIMES_SUFFIX)) {
    redirect("/");
  }
  const regionSlug = resolveSlugFromUrl(slug);
  if (!regionSlug) {
    redirect("/");
  }
  const urlPart = slug.slice(0, -PRAYER_TIMES_SUFFIX.length);
  const initialDistrictName = slugToDistrictDisplayName(urlPart);

  const { data, districts } = await getPrayerTimesData();

  return (
    <PrayerTimesClient
      initialData={data}
      initialDistricts={districts}
      initialRegionSlug={regionSlug}
      initialDistrictName={initialDistrictName}
    />
  );
}
