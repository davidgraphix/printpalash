import type { Metadata } from "next";

import ServicesPage from "@/components/Services/ServicesPage";
import Footer from "@/components/Footer/Footer";
import JsonLd from "@/components/SEO/JsonLd";
import { SERVICES } from "@/lib/services";
import { breadcrumbJsonLd, itemListJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Printing Services in Lagos — Cards, Flyers, Banners & Packaging",
  description:
    "Every printing service PrintPalash offers in Lagos: business cards, flyers, brochures, banners and roll-ups, stickers and labels, T-shirt printing, paper bags, packaging and document binding.",
  path: "/services",
  keywords: [
    "printing services in Lagos",
    "printing company Lagos Nigeria",
    "commercial printing Lagos",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(
          SERVICES.map((service) => ({
            name: service.h1,
            path: `/services/${service.slug}`,
          })),
          "PrintPalash printing services in Lagos"
        )}
      />

      <ServicesPage />
      <Footer />
    </>
  );
}
