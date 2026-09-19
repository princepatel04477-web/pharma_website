import type { Metadata } from "next";
import { siteRoutes } from "@/content/routes";
import { brand } from "@/config/brand";
export function pageMetadata(
  name: string,
  description: string,
  path: string,
): Metadata {
  const title = `${name} — ${brand.tradingName}`;
  const slug = siteRoutes.find((route) => route.path === path)?.slug ?? "home";
  const image = {
    url: new URL(`/og/${slug}`, brand.siteUrl).toString(),
    width: 1200,
    height: 630,
    alt: title,
  };
  const url = new URL(path, brand.siteUrl).toString();
  return {
    title,
    description: description.slice(0, 155),
    alternates: { canonical: url },
    openGraph: {
      title,
      description: description.slice(0, 155),
      url,
      type: "website",
      siteName: brand.tradingName,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description.slice(0, 155),
      images: [image.url],
    },
    robots: { index: false, follow: false },
  };
}
