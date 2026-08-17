import type { Metadata } from "next";

import Hero from "@/components/Home/Hero";
import Features from "@/components/Features/Features";
import PopularProducts from "@/components/Products/PopularProducts";
import TrustedBrands from "@/components/Trusted-Brands/TrustedBrands";
import Testimonials from "@/components/Testimonials/Testimonials";
import Footer from "@/components/Footer/Footer";
import HomeSEOSection from "@/components/Home/HomeSEOSection";
import HomeFAQ, { HOME_FAQS } from "@/components/Home/HomeFAQ";
import JsonLd from "@/components/SEO/JsonLd";
import { buildSearchIndex } from "@/lib/catalog/search-index";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title:
    "Printing Company in Lagos — Packaging, Branding & Print | PrintPalash",
  description:
    "PrintPalash prints and brands in Lagos, Nigeria: custom paper bags, packaging boxes, flyers, business cards, banners, T-shirts, wedding invitations and corporate stationery, with same-day options and nationwide delivery.",
  path: "/",
  keywords: [
    "printing company in Lagos",
    "printing services in Lagos",
    "packaging printing Lagos",
    "branding company Lagos Nigeria",
    "custom paper bags Lagos",
  ],
});

export default function HomePage() {
  const searchEntries = buildSearchIndex();

  return (
    <>
      {/* Matches the FAQ section rendered further down this page. */}
      <JsonLd data={faqJsonLd(HOME_FAQS)} />

      <Hero searchEntries={searchEntries} />
      <PopularProducts />
      <HomeSEOSection />
      <Features />
      <TrustedBrands />
      <Testimonials />
      <HomeFAQ />
      <Footer />
    </>
  );
}
