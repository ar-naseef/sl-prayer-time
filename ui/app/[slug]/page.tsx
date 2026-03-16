import type { Metadata } from "next";
import Script from "next/script";
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
    ? "Check today's prayer times in Sri Lanka by location. View Fajr, Sunrise, Dhuhr, Asr, Maghrib, and Isha times based on ACJU prayer times, with easy access to daily and monthly schedules."
    : `Check today's prayer times in ${districtName}, Sri Lanka. View Fajr, Sunrise, Dhuhr, Asr, Maghrib, and Isha times based on ACJU prayer times, plus the monthly prayer timetable for ${districtName}.`;
  const url = `${siteConfig.baseUrl}/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title: isSriLankaSlug
        ? "Sri Lanka Prayer Times Today"
        : `${districtName} Prayer Times Today`,
      description: isSriLankaSlug
        ? "Check today's prayer times in Sri Lanka by location, including Fajr, Dhuhr, Asr, Maghrib, and Isha times."
        : `View today's Fajr, Dhuhr, Asr, Maghrib, and Isha times for ${districtName}, Sri Lanka.`,
      url,
      type: "website",
      siteName: "Sri Lanka Salah Times",
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
  const isSriLankaSlug = urlPart.toLowerCase() === "sri-lanka";
  const initialDistrictName = isSriLankaSlug
    ? "Colombo"
    : slugToDistrictDisplayName(urlPart);

  const { data, districts } = await getPrayerTimesData();

  const page = (
    <PrayerTimesClient
      initialData={data}
      initialDistricts={districts}
      initialRegionSlug={regionSlug}
      initialDistrictName={initialDistrictName}
    />
  );

  if (!isSriLankaSlug) return page;

  return (
    <>
      <Script
        id="structured-data-website-home"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteConfig.name,
            url: siteConfig.baseUrl,
          }),
        }}
      />
      <Script
        id="structured-data-organization-home"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.baseUrl,
            logo: `${siteConfig.baseUrl}/icon.png`,
          }),
        }}
      />
      {page}
    </>
  );
}
