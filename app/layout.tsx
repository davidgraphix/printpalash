import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { BioRhyme } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import TopBar from "@/components/Home/Topbar";
import Header from "@/components/Home/Header";
import Navbar from "@/components/Navbar/Navbar";
import WhatsAppButton from "@/components/Chat-with-us/WhatsappButton";
import StructuredData from "@/components/SEO/StructuredData";

const biorhyme = BioRhyme({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-biorhyme",
  display: "swap",
});


export const metadata: Metadata = {
  metadataBase: new URL("https://printpalash.com"),
  title: {
    default: "Print Palash Studios | Printing Services in Lagos, Nigeria",
    template: "%s | PrintPalash",
  },
  description:
    "Premium printing and brand execution in Lagos, Nigeria. Order flyers, business cards, banners, stickers, packaging, T-shirts, paper bags, souvenirs, and corporate branding materials.",
  keywords: [
    "printing services in Lagos",
    "printing services in Nigeria",
    "online printing Nigeria",
    "flyer printing Lagos",
    "business card printing Lagos",
    "packaging printing Lagos",
    "paper bag production Lagos",
    "T-shirt printing Lagos",
    "banner printing Lagos",
    "souvenir printing Lagos",
    "corporate branding Lagos",
    "PrintPalash",
  ],
  alternates: {
    canonical: "https://printpalash.com",
  },
  openGraph: {
    title: "Print Palash Studios | Printing Services in Lagos, Nigeria",
    description:
      "Premium online printing services for flyers, business cards, banners, packaging, T-shirts, paper bags, souvenirs, and corporate branding in Lagos, Nigeria.",
    url: "https://printpalash.com",
    siteName: "PrintPalash",
    type: "website",
    locale: "en_NG",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "PrintPalash Printing Services in Lagos Nigeria",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Print Palash Studios | Printing Services in Lagos, Nigeria",
    description:
      "Order flyers, business cards, banners, packaging, T-shirts, paper bags, souvenirs, and corporate branding materials from PrintPalash.",
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PrintingService",
    name: "Print Palash Studios",
    url: "https://printpalash.com",
    telephone: "+2347035017359",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lagos",
      addressCountry: "NG",
    },
    areaServed: "Lagos",
    sameAs: [
      "https://wa.me/2347035017359",
      // add Instagram / Facebook when ready
    ],
  };

  return (
    <html lang="en" >
      {/* className={biorhyme.variable} */}
      <body
        className={biorhyme.variable}>
        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <StructuredData />
        <TopBar />
        <Header />
        <Navbar />
        <WhatsAppButton />
        <main>{children}
          <GoogleAnalytics gaId="G-XXXXXXXXXX" />
        </main>

      </body>
    </html>
  );
}
