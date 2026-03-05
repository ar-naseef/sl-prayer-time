import { redirect } from "next/navigation";
import {
  resolveSlugFromUrl,
  slugToDistrictDisplayName,
} from "@/lib/regions";
import Home from "../page";

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
  return (
    <Home
      initialRegionSlug={regionSlug}
      initialDistrictName={initialDistrictName}
    />
  );
}
