export type Service = {
    slug: string;
    title: string;
    metaTitle: string;
    description: string;
    h1: string;
    intro: string;
    sections: { heading: string; body: string[] }[];
    faqs: { q: string; a: string }[];
};

export const SERVICES: Service[] = [
    {
        slug: "business-card-printing-lagos",
        title: "Business Card Printing",
        metaTitle: "Business Card Printing in Lagos | Print Palash Studios",
        description:
            "Premium custom business cards in Lagos — matte, glossy, embossed and luxury finishes with fast turnaround.",
        h1: "Business Card Printing in Lagos",
        intro:
            "Make strong first impressions with premium business cards. Choose the right paper, finish and thickness — we print crisp, professional cards for individuals and teams in Lagos.",
        sections: [
            { heading: "Options", body: ["Matte & glossy", "Textured & premium paper", "Embossed / foil finishing (on request)", "Bulk corporate printing"] },
            { heading: "Why Print Palash", body: ["Sharp print quality", "Fast turnaround", "Delivery within Lagos", "Design + print support available"] },
        ],
        faqs: [
            { q: "Do you deliver within Lagos?", a: "Yes — we deliver within Lagos. You can also request pickup depending on your order." },
            { q: "Can I print urgently?", a: "Yes. We offer express options depending on quantity and finishing." },
        ],
    },

    {
        slug: "flyer-printing-lagos",
        title: "Flyer Printing",
        metaTitle: "Flyer Printing in Lagos | A5 & A4 Flyers | Print Palash Studios",
        description:
            "Flyer printing in Lagos for events, promotions and campaigns — A5/A4 sizes, clean colors, fast delivery.",
        h1: "Flyer Printing in Lagos",
        intro:
            "Promote your event or business with high-quality flyers. We print vibrant flyers with the right paper and finishing for your budget and deadline.",
        sections: [
            { heading: "Popular flyer types", body: ["A5 & A4 flyers", "Event and promo flyers", "Church flyers", "Campaign flyers"] },
            { heading: "What you get", body: ["Vibrant color accuracy", "Neat trimming", "Fast turnaround & delivery"] },
        ],
        faqs: [
            { q: "What size is best for promotions?", a: "A5 is common for mass distribution. A4 works well when you need more details." },
            { q: "Do you help with design?", a: "Yes — we can help with design setup, corrections, and print-ready export." },
        ],
    },

    {
        slug: "brochure-printing-lagos",
        title: "Brochure Printing",
        metaTitle: "Brochure Printing in Lagos | Bi-fold & Tri-fold | Print Palash Studios",
        description:
            "Professional brochure printing in Lagos — bi-fold, tri-fold, company profiles and marketing brochures.",
        h1: "Brochure Printing in Lagos",
        intro:
            "Brochures are perfect for explaining your services and building trust. We print clean, premium brochures for brands, real estate, events, and corporate profiles.",
        sections: [
            { heading: "Brochure formats", body: ["Bi-fold brochures", "Tri-fold brochures", "Company profile brochures", "Product brochures"] },
            { heading: "Recommended finishing", body: ["Glossy for vibrant visuals", "Matte for premium feel", "Thicker paper for durability"] },
        ],
        faqs: [
            { q: "Which fold should I choose?", a: "Tri-fold works well for step-by-step info. Bi-fold suits premium brand presentation and fewer sections." },
            { q: "Can you print small quantities?", a: "Yes — we support both small and bulk brochure orders." },
        ],
    },

    {
        slug: "banner-printing-lagos",
        title: "Banner Printing",
        metaTitle: "Banner Printing in Lagos | Outdoor & Event Banners | Print Palash Studios",
        description:
            "Banner printing in Lagos — outdoor banners, event banners, church banners, PVC and vinyl with strong finishing.",
        h1: "Banner Printing in Lagos",
        intro:
            "Get bold, visible banners that attract attention. We print durable banners for outdoor ads, church programs, events and promotions across Lagos.",
        sections: [
            { heading: "Banner types", body: ["Outdoor PVC banners", "Event banners", "Church banners", "Vinyl banners"] },
            { heading: "Why ours last", body: ["Strong material options", "Neat finishing & eyelets", "Clear, bold printing"] },
        ],
        faqs: [
            { q: "Do you print outdoor banners?", a: "Yes — we print outdoor-friendly materials and finishing for durability." },
            { q: "Can you help resize my design?", a: "Yes — we can format your design for the correct banner dimensions." },
        ],
    },

    {
        slug: "roll-up-banner-printing-lagos",
        title: "Roll-up Banner Printing",
        metaTitle: "Roll-up Banner Printing in Lagos | Print Palash Studios",
        description:
            "Roll-up banner printing in Lagos — crisp, professional pull-up banners for events, offices and exhibitions.",
        h1: "Roll-up Banner Printing in Lagos",
        intro:
            "Perfect for events, exhibitions and office branding. We print high-quality roll-up banners with clean finishing and professional layout.",
        sections: [
            { heading: "Best for", body: ["Trade shows", "Exhibitions", "Church events", "Office reception branding"] },
            { heading: "What you get", body: ["Sharp print quality", "Sturdy roll-up stand options", "Fast production"] },
        ],
        faqs: [
            { q: "Do you supply the stand too?", a: "Yes — depending on your package, we can supply the roll-up stand." },
            { q: "Can I print urgently?", a: "Yes — express production is available based on workload and specs." },
        ],
    },

    {
        slug: "sticker-printing-lagos",
        title: "Sticker Printing",
        metaTitle: "Sticker Printing in Lagos | Custom Stickers & Labels | Print Palash Studios",
        description:
            "Sticker printing in Lagos — die-cut, vinyl, waterproof, logo and packaging stickers for businesses.",
        h1: "Sticker Printing in Lagos",
        intro:
            "Brand your products and packaging with premium stickers. We print custom stickers for logos, labels, sealing and product branding in Lagos.",
        sections: [
            { heading: "Sticker types", body: ["Vinyl stickers", "Die-cut stickers", "Waterproof stickers", "Logo / branding stickers"] },
            { heading: "Common uses", body: ["Packaging & sealing", "Product labels", "Branding and promos"] },
        ],
        faqs: [
            { q: "Are the stickers waterproof?", a: "We offer waterproof and vinyl options depending on your use-case." },
            { q: "Can you do custom shapes?", a: "Yes — die-cut options are available for custom shapes." },
        ],
    },

    {
        slug: "label-printing-lagos",
        title: "Label Printing",
        metaTitle: "Product Label Printing in Lagos | Print Palash Studios",
        description:
            "Product label printing in Lagos — bottle labels, food labels, barcode labels and custom packaging labels.",
        h1: "Product Label Printing in Lagos",
        intro:
            "From bottles to cartons, labels must look clean and professional. We print durable labels that match your brand and product category.",
        sections: [
            { heading: "Label categories", body: ["Bottle labels", "Food labels", "Cosmetic labels", "Barcode labels"] },
            { heading: "Quality details", body: ["Readable text & barcodes", "Strong adhesive options", "Clean finishing"] },
        ],
        faqs: [
            { q: "Do you print barcode labels?", a: "Yes — we can print barcode-friendly labels with good scan clarity." },
            { q: "Can you help with label sizing?", a: "Yes — send the container size and we’ll recommend the right dimensions." },
        ],
    },

    {
        slug: "tshirt-printing-lagos",
        title: "T-shirt Printing",
        metaTitle: "T-shirt Printing in Lagos | Custom Tees | Print Palash Studios",
        description:
            "Custom T-shirt printing in Lagos for brands, churches, events and teams — durable prints with rich colors.",
        h1: "T-shirt Printing in Lagos",
        intro:
            "Turn your ideas into wearable branding. We print custom T-shirts for events, churches, brands and corporate teams with durable finishing.",
        sections: [
            { heading: "Perfect for", body: ["Events and souvenirs", "Church and ministry tees", "Brand merch", "Team uniforms"] },
            { heading: "Why choose us", body: ["Neat prints", "Good fabric compatibility", "Fast turnaround"] },
        ],
        faqs: [
            { q: "Do you print for bulk orders?", a: "Yes — bulk printing is available for teams and events." },
            { q: "Can I print different sizes in one order?", a: "Yes — you can mix sizes and quantities per size." },
        ],
    },

    {
        slug: "paper-bag-printing-lagos",
        title: "Paper Bag Printing",
        metaTitle: "Paper Bag Printing in Lagos | Branded Bags | Print Palash Studios",
        description:
            "Paper bag printing in Lagos — premium branded paper bags for stores, boutiques, food brands and events.",
        h1: "Paper Bag Printing in Lagos",
        intro:
            "Branded paper bags increase perceived value and make your business look premium. We print durable paper bags that represent your brand well.",
        sections: [
            { heading: "Popular use cases", body: ["Boutiques & fashion stores", "Food packaging", "Gifts & events", "Retail packaging"] },
            { heading: "What we focus on", body: ["Strong handles & finishing", "Clean logo placement", "Premium look"] },
        ],
        faqs: [
            { q: "Can I print my logo on both sides?", a: "Yes — one-sided or double-sided printing depending on your design and budget." },
            { q: "Do you have different sizes?", a: "Yes — we can print multiple bag sizes depending on what you sell." },
        ],
    },

    {
        slug: "packaging-printing-lagos",
        title: "Packaging Printing",
        metaTitle: "Custom Packaging Printing in Lagos | Boxes & Branding | Print Palash Studios",
        description:
            "Custom packaging printing in Lagos — boxes, cartons, branded packaging for food, cosmetics and retail products.",
        h1: "Custom Packaging Printing in Lagos",
        intro:
            "Packaging is brand perception. We print premium boxes and packaging that helps your product stand out and sell better in competitive markets.",
        sections: [
            { heading: "Packaging options", body: ["Product boxes", "Cartons", "Retail packaging", "Food & cosmetic packaging"] },
            { heading: "How we help", body: ["Print + finishing support", "Brand-consistent packaging", "Advice on packaging materials"] },
        ],
        faqs: [
            { q: "Can you help with packaging design?", a: "Yes — we can guide layout and print setup for packaging dielines." },
            { q: "Do you print small batches?", a: "Yes — depending on the packaging type, small batches may be possible." },
        ],
    },
];
