import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  resolveSlugFromUrl,
  slugToDistrictDisplayName,
} from "@/lib/regions";
import { siteConfig } from "@/lib/site";
import { getPrayerTimesData } from "@/lib/prayerTimesServer";
import PrayerTimesClient from "@/components/PrayerTimesClient";

const PRAYER_TIMES_SUFFIX = "-prayer-times";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!slug || !slug.toLowerCase().endsWith(PRAYER_TIMES_SUFFIX)) {
    return {};
  }
  const regionSlug = resolveSlugFromUrl(slug);
  if (!regionSlug) return {};

  const urlPart = slug.slice(0, -PRAYER_TIMES_SUFFIX.length);
  const isSriLankaSlug = urlPart.toLowerCase() === "sri-lanka";
  const districtName = isSriLankaSlug
    ? "Colombo"
    : slugToDistrictDisplayName(urlPart);
  const title = isSriLankaSlug
    ? "Sri Lanka Prayer Times Today (Fajr, Dhuhr, Asr, Maghrib, Isha) – Sri Lanka Salah Times"
    : `${districtName} Prayer Times Today (Fajr, Dhuhr, Asr, Maghrib, Isha) – Sri Lanka Salah Times`;
  const description = isSriLankaSlug
    ? "Today's Islamic prayer times for Sri Lanka (Fajr, Dhuhr, Asr, Maghrib, Isha), with a full monthly timetable by district."
    : `Today's Islamic prayer times (Fajr, Dhuhr, Asr, Maghrib, Isha) for ${districtName}, Sri Lanka, plus a full monthly timetable.`;
  const url = `${siteConfig.baseUrl}/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: { canonical: url },
  };
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
  const initialDistrictName =
    urlPart.toLowerCase() === "sri-lanka"
      ? "Colombo"
      : slugToDistrictDisplayName(urlPart);

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
