import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Inter, BioRhyme } from "next/font/google";

import TopBar from "@/components/Home/Topbar";
import Header from "@/components/Home/Header";
import Navbar from "@/components/Navbar/Navbar";
import WhatsAppButton from "@/components/Chat-with-us/WhatsappButton";

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
    template: "%s | Print Palash Studios",
  },
  description:
    "Premium printing and brand execution in Lagos, Nigeria. Business cards, flyers, banners, stickers, packaging, T-shirts, and more — fast delivery, high quality.",
  keywords: [
    "printing services in Lagos",
    "printing company Lagos",
    "business card printing Lagos",
    "flyer printing Lagos",
    "banner printing Lagos",
    "sticker printing Lagos",
    "t shirt printing Lagos",
    "paper bag printing Lagos",
    "roll up banner printing Lagos",
    "packaging printing Lagos",
    "printpalash",
    "Print Palash Studios",
  ],
  alternates: {
    canonical: "https://printpalash.com",
  },
  openGraph: {
    type: "website",
    url: "https://printpalash.com",
    siteName: "Print Palash Studios",
    title: "Print Palash Studios | Printing Services in Lagos, Nigeria",
    description:
      "Premium printing and brand execution in Lagos. Fast, reliable, high-quality prints for businesses and individuals.",
    images: [
      {
        url: "/og.jpg", //og.jpg inside /public
        width: 1200,
        height: 630,
        alt: "Print Palash Studios - Printing Services in Lagos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Print Palash Studios | Printing Services in Lagos",
    description:
      "Business cards, flyers, banners, stickers, packaging, T-shirts & more — premium prints, fast delivery.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
      <body className="font-sans antialiased">
        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <TopBar />
        <Header />
        <Navbar />
        <WhatsAppButton />
        <main>{children}</main>
      </body>
    </html>
  );
}
