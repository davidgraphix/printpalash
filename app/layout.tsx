import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";

import "./globals.css";

import { SITE, SITE_URL } from "@/lib/site";

/**
 * The root layout, reduced to what is genuinely global.
 *
 * It used to render the public site's chrome — top bar, header, navigation,
 * the WhatsApp button, site-wide JSON-LD and Google Analytics. Layouts nest, so
 * anything added under `app/` inherited all of it, and an admin dashboard would
 * have arrived wrapped in the marketing site's navigation.
 *
 * That chrome now lives in `app/(site)/layout.tsx`, which covers exactly the
 * routes it belongs to. Route groups are invisible in the URL, so every public
 * address is unchanged. What stays here is the html element, the body, the two
 * font variables and the metadata that is true of every page on the domain.
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

/**
 * Defaults for the domain. The public site narrows these in
 * `app/(site)/layout.tsx`; the admin replaces them outright and adds noindex.
 */
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
  return (
    <html lang="en-NG" className={`${inter.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
