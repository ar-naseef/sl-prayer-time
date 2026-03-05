import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getDistrictPathSegments } from "@/lib/regions";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.baseUrl;

  const home: MetadataRoute.Sitemap[number] = {
    url: base,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
  };

  const districtPages: MetadataRoute.Sitemap = getDistrictPathSegments().map(
    (segment) => ({
      url: `${base}/${segment}-prayer-times`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    })
  );

  return [home, ...districtPages];
}
