import type { Metadata } from "next";

import AboutSection from "@/components/About/AboutSection";
import Features from "@/components/Features/Features";
import Footer from "@/components/Footer/Footer";
import JsonLd from "@/components/SEO/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Us — Printing, Packaging & Branding in Lagos",
  description:
    "PrintPalash is a printing, packaging and branding company based in Shomolu, Lagos, producing paper bags, packaging boxes, flyers, banners, apparel and corporate stationery for Nigerian businesses.",
  path: "/about",
  keywords: [
    "about PrintPalash",
    "printing company in Lagos Nigeria",
    "branding company Shomolu Lagos",
  ],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <AboutSection />
      <Features />
      <Footer />
    </>
  );
}
