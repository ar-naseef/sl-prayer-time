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
  const districtName = slugToDistrictDisplayName(urlPart);
  const title = `Prayer Times – ${districtName}`;
  const description = `Daily Islamic prayer times (Fajr, Dhuhr, Asr, Maghrib, Isha) for ${districtName}, Sri Lanka. View today and monthly times.`;
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
