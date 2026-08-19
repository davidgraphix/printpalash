import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";

import TopBar from "@/components/Home/Topbar";
import Header from "@/components/Home/Header";
import Navbar from "@/components/Navbar/Navbar";
import WhatsAppButton from "@/components/Chat-with-us/WhatsappButton";
import JsonLd from "@/components/SEO/JsonLd";
import { buildSearchIndex } from "@/lib/catalog/search-index";
import { GA_MEASUREMENT_ID, SITE, SITE_URL } from "@/lib/site";
import { localBusinessJsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

/**
 * Headings use Montserrat — the closest production-safe web font to the
 * heavy, wide geometric sans in the typography reference the client supplied
 * (double-storey `a`, tall x-height, straight-tailed `y`). Body copy uses
 * Inter for legibility at small sizes.
 *
 * Both are self-hosted by next/font, so there is no render-blocking request to
 * Google Fonts and no layout shift beyond the `swap` fallback.
 */
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Printing Company in Lagos — Packaging, Branding & Print | PrintPalash",
    template: "%s | PrintPalash",
  },
  description:
    "PrintPalash is a printing and branding company in Lagos, Nigeria. Custom paper bags, packaging boxes, flyers, business cards, banners, branded apparel, wedding invitations and corporate stationery, delivered nationwide.",
  applicationName: SITE.name,
  authors: [{ name: SITE.legalName, url: SITE_URL }],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title:
      "Printing Company in Lagos — Packaging, Branding & Print | PrintPalash",
    description:
      "Custom paper bags, packaging boxes, flyers, business cards, banners, branded apparel and corporate stationery printed in Lagos, Nigeria.",
    url: SITE_URL,
    siteName: SITE.name,
    type: "website",
    locale: SITE.locale,
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  themeColor: "#dc2626",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Built once on the server and handed to the header search box, which is
  // rendered on every route (including product detail pages).
  const searchEntries = buildSearchIndex();

  return (
    <html lang="en-NG" className={`${inter.variable} ${montserrat.variable}`}>
      <body>
        {/*
          Site-wide entities. Page-level Product, Breadcrumb and FAQ blocks are
          emitted by the individual routes.
        */}
        <JsonLd
          data={[organizationJsonLd(), localBusinessJsonLd(), websiteJsonLd()]}
        />

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-red-600 focus:px-4 focus:py-2 focus:font-bold focus:text-white"
        >
          Skip to main content
        </a>

        <TopBar />
        <Header searchEntries={searchEntries} />
        <Navbar />

        <main id="main-content">{children}</main>

        <WhatsAppButton />
        <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
      </body>
    </html>
  );
}
