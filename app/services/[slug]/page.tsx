import type { Metadata } from "next";
import ServicesPage from "@/components/Services/ServicesPage";

export const metadata: Metadata = {
    title: "Printing Services in Lagos | Print Palash Studios",
    description:
        "Explore Print Palash Studios services in Lagos: business cards, flyers, brochures, banners, roll-ups, stickers, labels, T-shirts, packaging and more.",
    alternates: { canonical: "https://printpalash.com/services" },
};

export default function Page() {
    return <ServicesPage />;
}
