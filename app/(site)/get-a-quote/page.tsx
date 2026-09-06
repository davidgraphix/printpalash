import type { Metadata } from "next";

import Features from "@/components/Features/Features";
import Footer from "@/components/Footer/Footer";
import GetQuoteSection from "@/components/Quote/GetQuoteSection";
import JsonLd from "@/components/SEO/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Get a Printing Quote in Lagos",
  description:
    "Request a printing quote from PrintPalash in Lagos. Send your product, quantity, size, finishing and deadline and we will come back with pricing, timeline and delivery options.",
  path: "/get-a-quote",
  keywords: [
    "printing quote Lagos",
    "printing price Lagos Nigeria",
    "request print quote",
  ],
});

export default function QuotePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Get a Quote", path: "/get-a-quote" },
        ])}
      />

      <GetQuoteSection />
      <Features />
      <Footer />
    </>
  );
}
