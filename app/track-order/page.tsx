import type { Metadata } from "next";

import TrackOrderHero from "@/components/Track-order/TrackorderHero";
import Features from "@/components/Features/Features";
import Footer from "@/components/Footer/Footer";
import JsonLd from "@/components/SEO/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Track Your Order",
  description:
    "Check the status of a print job with PrintPalash in Lagos. Have your order details ready and our team will confirm production stage and delivery timing.",
  path: "/track-order",
});

export default function TrackOrderPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Track Order", path: "/track-order" },
        ])}
      />

      <TrackOrderHero />
      <Features />
      <Footer />
    </>
  );
}
