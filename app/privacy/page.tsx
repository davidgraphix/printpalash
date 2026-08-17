import type { Metadata } from "next";

import Footer from "@/components/Footer/Footer";
import PrivacyPolicy from "@/components/Privacy-policy/PrivacyPolicyPage";
import TrustedBrands from "@/components/Trusted-Brands/TrustedBrands";
import JsonLd from "@/components/SEO/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How PrintPalash collects, uses and protects the personal information you share when requesting a quote or placing a print order.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ])}
      />
      <PrivacyPolicy />
      <TrustedBrands />
      <Footer />
    </>
  );
}
