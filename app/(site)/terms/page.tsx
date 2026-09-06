import type { Metadata } from "next";

import Footer from "@/components/Footer/Footer";
import TermsAndConditions from "@/components/Terms-and-Conditions/TermsAndConditionSection";
import TrustedBrands from "@/components/Trusted-Brands/TrustedBrands";
import JsonLd from "@/components/SEO/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms & Conditions",
  description:
    "The terms that apply to print orders placed with PrintPalash in Lagos, covering artwork approval, production, payment and delivery.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Terms & Conditions", path: "/terms" },
        ])}
      />
      <TermsAndConditions />
      <TrustedBrands />
      <Footer />
    </>
  );
}
