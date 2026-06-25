export default function StructuredData() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://printpalash.com/#business",
        name: "PrintPalash",
        alternateName: "Print Palash Studios",
        url: "https://printpalash.com",
        logo: "https://printpalash.com/logo.png",
        image: "https://printpalash.com/opengraph-image.png",
        description:
            "PrintPalash is a premium printing and branding company in Lagos, Nigeria offering flyer printing, business card printing, packaging printing, T-shirt printing, paper bag production, banners, souvenirs, and corporate branding.",
        telephone: "+2347035017359",
        priceRange: "₦₦",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Shomolu",
            addressRegion: "Lagos",
            addressCountry: "NG",
        },
        areaServed: [
            {
                "@type": "City",
                name: "Lagos",
            },
            {
                "@type": "Country",
                name: "Nigeria",
            },
        ],
        openingHoursSpecification: [
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                ],
                opens: "08:00",
                closes: "20:00",
            },
        ],
        sameAs: [
            "https://www.instagram.com/print_palash",
            "https://www.facebook.com/share/1Ets8ZdRcu/?mibextid=wwXIfr",
            "https://www.linkedin.com/company/printpalash",
            "https://x.com/printpalash",
        ],
        makesOffer: [
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "Flyer Printing in Lagos",
                },
            },
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "Business Card Printing in Lagos",
                },
            },
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "Packaging Printing in Lagos",
                },
            },
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "T-Shirt Printing in Lagos",
                },
            },
        ],
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://printpalash.com/#website",
        url: "https://printpalash.com",
        name: "PrintPalash",
        description:
            "Online printing services in Lagos, Nigeria for flyers, business cards, packaging, banners, T-shirts, souvenirs, and corporate branding.",
        potentialAction: {
            "@type": "SearchAction",
            target: "https://printpalash.com/products?search={search_term_string}",
            "query-input": "required name=search_term_string",
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationSchema),
                }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(websiteSchema),
                }}
            />
        </>
    );
}