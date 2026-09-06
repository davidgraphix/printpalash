import type { Metadata } from "next";

import Footer from "@/components/Footer/Footer";
import MoneyBackGuaranteePolicy from "@/components/Money-Back-Guarantee/MoneyBackGuaranteePolicy";
import JsonLd from "@/components/SEO/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Money Back Guarantee",
  description:
    "When PrintPalash reprints or refunds a print job, and what to do if an order arrives damaged, incorrect or below the quality we promised.",
  path: "/money-back",
});

export default function MoneyBackPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Money Back Guarantee", path: "/money-back" },
        ])}
      />
      <MoneyBackGuaranteePolicy />
      <Footer />
    </>
  );
}
