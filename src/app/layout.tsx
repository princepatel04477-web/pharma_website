import { SiteSchema } from "@/components/site-schema";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/shell";
import { Footer } from "@/components/footer";
import { ScrollProvider } from "@/components/scroll-provider";
import { navigation } from "@/content/navigation";
import { brand } from "@/config/brand";
const sans = localFont({
  src: "./fonts/instrument-sans-latin-wght-normal.woff2",
  variable: "--font-instrument-sans",
  fallback: ["Clinical Sans Fallback", "sans-serif"],
  display: "swap",
  preload: true,
});
const serif = localFont({
  src: "./fonts/instrument-serif-latin-400-normal.woff2",
  variable: "--font-instrument-serif",
  adjustFontFallback: "Times New Roman",
  fallback: ["Clinical Serif Fallback", "serif"],
  display: "swap",
  preload: false,
});
const mono = localFont({
  src: [
    { path: "./fonts/jetbrains-mono-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/jetbrains-mono-latin-500-normal.woff2", weight: "500" },
  ],
  variable: "--font-jetbrains",
  adjustFontFallback: false,
  fallback: ["Clinical Mono Fallback", "monospace"],
  display: "swap",
  preload: false,
});
export const metadata: Metadata = {
  title: brand.tradingName,
  description: brand.tagline,
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
        <a href="#site-content" className="skip-link">
          {navigation.labels.skip}
        </a>
        <SiteSchema />
        <Header />
        <div id="site-content">{children}</div>
        <Footer />
        <ScrollProvider />
      </body>
    </html>
  );
}
