import type React from "react";
import type { Metadata } from "next";
import "./globals.css";

import TopBar from "@/components/Home/Topbar";
import Header from "@/components/Home/Header";
import Navbar from "@/components/Navbar/Navbar";
import WhatsAppButton from "@/components/Chat-with-us/WhatsappButton";

export const metadata: Metadata = {
  metadataBase: new URL("https://printpalash.com"),
  title: {
    default: "Print Palash Studios | Printing Services in Lagos, Nigeria",
    template: "%s | Print Palash Studios",
  },
  description:
    "Premium printing and brand execution in Lagos, Nigeria. Business cards, flyers, banners, stickers, packaging, T-shirts, and more — fast delivery, high quality.",
  alternates: {
    canonical: "https://printpalash.com",
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
  };

  return (
    <html lang="en">
      <body className="font-sans antialiased">
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
