import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";
import { siteRoutes } from "@/content/routes";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return siteRoutes.map((route) => ({
    url: new URL(route.path, brand.siteUrl).toString(),
  }));
}
