export type ServiceFAQ = { q: string; a: string };

export type ServiceSection = {
    heading: string;
    body: string[];
};

export type ServiceCategory =
    | "Cards & Paper"
    | "Marketing & Promo"
    | "Large Format"
    | "Stickers & Labels"
    | "Merch & Apparel"
    | "Packaging"
    | "Books & Documents";

export type Service = {
    slug: string;
    title: string; // card title
    h1: string; // page H1
    metaTitle: string;
    description: string; // meta description
    intro: string; // page intro
    category: ServiceCategory;
    highlights: string[]; // short bullet list for UI card
    sections: ServiceSection[];
    faqs: ServiceFAQ[];
};

export const SERVICES: Service[] = [
    // =========================
    // CARDS & PAPER
    // =========================
    {
        slug: "business-card-printing-lagos",
        title: "Business Card Printing",
        h1: "Business Card Printing in Lagos",
        metaTitle: "Business Card Printing in Lagos | Print Palash Studios",
        description:
            "Premium business card printing in Lagos — matte, glossy, textured and luxury options with fast turnaround and delivery.",
        intro:
            "Make a strong first impression with premium business cards printed in Lagos. Clean details, rich colors, and professional finishing — fast.",
        category: "Cards & Paper",
        highlights: ["Matte/Glossy options", "Thick card stock", "Single/Double-sided", "Fast delivery"],
        sections: [
            {
                heading: "Options & finishes",
                body: [
                    "Matte and glossy finishing",
                    "Thick card stock for premium feel",
                    "Single or double-sided printing",
                    "Rounded corners (optional)",
                ],
            },
            {
                heading: "Best for",
                body: ["Businesses", "Sales teams", "Events and networking", "Personal branding"],
            },
            {
                heading: "How to order",
                body: [
                    "Choose size, quantity, and finish",
                    "Upload your design (or request design support)",
                    "Approve proof and print",
                    "Delivery within Lagos",
                ],
            },
        ],
        faqs: [
            { q: "Do you help with design?", a: "Yes — we can help you create a clean, professional business card layout." },
            { q: "How fast is turnaround?", a: "Depends on quantity and finish, but we prioritize fast production and delivery." },
            { q: "Do you print both sides?", a: "Yes — single and double-sided options are available." },
        ],
    },

    {
        slug: "flyer-printing-lagos",
        title: "Flyer Printing",
        h1: "Flyer Printing in Lagos",
        metaTitle: "Flyer Printing in Lagos | Print Palash Studios",
        description:
            "Flyer printing in Lagos for events, promotions and campaigns — A5/A4 sizes, sharp colors and fast delivery.",
        intro:
            "Promote smarter with crisp flyers that get attention. Ideal for events, marketing, church programs and product launches.",
        category: "Marketing & Promo",
        highlights: ["A5/A4 sizes", "Sharp color output", "Bulk orders", "Fast turnaround"],
        sections: [
            { heading: "Popular sizes", body: ["A5 flyers", "A4 flyers", "Custom sizes on request"] },
            { heading: "Best for", body: ["Events", "Promotions", "Church programs", "Campaigns"] },
            { heading: "Quality notes", body: ["Clean text edges", "Solid color consistency", "Neat trimming and finishing"] },
        ],
        faqs: [
            { q: "Can you print urgent flyers?", a: "Yes — contact us with quantity and deadline for the fastest option." },
            { q: "Do you deliver in Lagos?", a: "Yes, delivery is available within Lagos." },
        ],
    },

    {
        slug: "brochure-printing-lagos",
        title: "Brochure Printing",
        h1: "Brochure Printing in Lagos",
        metaTitle: "Brochure Printing in Lagos | Print Palash Studios",
        description:
            "Professional brochure printing in Lagos — bi-fold, tri-fold, company profiles and marketing brochures.",
        intro:
            "Communicate clearly with premium brochures that feel professional and sell better. Ideal for company profiles and marketing materials.",
        category: "Marketing & Promo",
        highlights: ["Bi-fold / Tri-fold", "Company profiles", "Premium finishing", "Crisp prints"],
        sections: [
            { heading: "Fold types", body: ["Bi-fold brochures", "Tri-fold brochures", "Multi-page booklets (on request)"] },
            { heading: "Best for", body: ["Company profiles", "Product catalogs", "Real estate listings", "Service menus"] },
            { heading: "Finishing", body: ["Clean folds", "Accurate trimming", "Optional matte/gloss finish"] },
        ],
        faqs: [
            { q: "Do you print company profiles?", a: "Yes — brochures and profiles are supported depending on pages and spec." },
            { q: "Can you help with layout?", a: "Yes — we can support layout/design if needed." },
        ],
    },

    // =========================
    // LARGE FORMAT
    // =========================
    {
        slug: "banner-printing-lagos",
        title: "Banner Printing",
        h1: "Banner Printing in Lagos",
        metaTitle: "Banner Printing in Lagos | Print Palash Studios",
        description:
            "Banner printing in Lagos — outdoor banners, event banners, church banners, PVC and vinyl with strong finishing.",
        intro:
            "Big visibility, clean finishing. We print banners that stand out outdoors and indoors — perfect for events and promotions.",
        category: "Large Format",
        highlights: ["PVC/Vinyl options", "Outdoor ready", "Clean finishing", "Event banners"],
        sections: [
            { heading: "Types", body: ["PVC banners", "Vinyl banners", "Event banners", "Church banners"] },
            { heading: "Best for", body: ["Outdoor advertising", "Events", "Storefront promos", "Campaigns"] },
            { heading: "Quality", body: ["Strong materials", "Neat eyelets (as applicable)", "Color consistency"] },
        ],
        faqs: [
            { q: "Can banners be used outdoors?", a: "Yes — we offer durable materials suitable for outdoor use." },
            { q: "Do you add eyelets?", a: "Where applicable, yes — depends on banner type and finishing." },
        ],
    },

    {
        slug: "roll-up-banner-printing-lagos",
        title: "Roll-up Banner Printing",
        h1: "Roll-up Banner Printing in Lagos",
        metaTitle: "Roll-up Banner Printing in Lagos | Print Palash Studios",
        description:
            "Roll-up banner printing in Lagos — crisp, professional pull-up banners for events, offices and exhibitions.",
        intro:
            "Look professional at events with sharp roll-up banners. Clean print, strong structure, and a polished finish.",
        category: "Large Format",
        highlights: ["Event-ready", "Crisp output", "Professional finish", "Exhibition use"],
        sections: [
            { heading: "Best for", body: ["Exhibitions", "Events", "Office reception", "Brand activations"] },
            { heading: "Quality", body: ["High-resolution print", "Clean trimming", "Professional presentation"] },
        ],
        faqs: [
            { q: "Can you print same-day roll-ups?", a: "Sometimes — depends on availability. Share your deadline." },
        ],
    },

    // =========================
    // STICKERS & LABELS
    // =========================
    {
        slug: "sticker-printing-lagos",
        title: "Sticker Printing",
        h1: "Sticker Printing in Lagos",
        metaTitle: "Sticker Printing in Lagos | Print Palash Studios",
        description:
            "Sticker printing in Lagos — die-cut, vinyl, waterproof, logo and packaging stickers for businesses.",
        intro:
            "Boost your brand with premium stickers — for packaging, logos, sealing, and product labeling.",
        category: "Stickers & Labels",
        highlights: ["Logo stickers", "Packaging stickers", "Die-cut options", "Waterproof (on request)"],
        sections: [
            { heading: "Popular sticker types", body: ["Logo stickers", "Packaging stickers", "Sealing stickers", "Die-cut stickers"] },
            { heading: "Best for", body: ["Small businesses", "Retail packaging", "Branding", "Promotions"] },
        ],
        faqs: [
            { q: "Do you do custom shapes?", a: "Yes — die-cut/custom shapes can be done depending on spec." },
            { q: "Are stickers waterproof?", a: "Waterproof options are available depending on material." },
        ],
    },

    {
        slug: "label-printing-lagos",
        title: "Label Printing",
        h1: "Label Printing in Lagos",
        metaTitle: "Label Printing in Lagos | Print Palash Studios",
        description:
            "Product label printing in Lagos — bottle labels, food labels, barcode labels and custom packaging labels.",
        intro:
            "Sell with confidence using clean, professional product labels — perfect for food, cosmetics, bottles, and packaging.",
        category: "Stickers & Labels",
        highlights: ["Bottle labels", "Food/cosmetics", "Barcode labels", "Packaging labels"],
        sections: [
            { heading: "Use cases", body: ["Bottle labels", "Food labels", "Cosmetic labels", "Barcode/QR labels"] },
            { heading: "Quality", body: ["Sharp text readability", "Consistent color", "Clean finishing"] },
        ],
        faqs: [
            { q: "Can you print barcode labels?", a: "Yes — barcode/QR label printing is supported." },
        ],
    },

    // =========================
    // MERCH & APPAREL
    // =========================
    {
        slug: "tshirt-printing-lagos",
        title: "T-shirt Printing",
        h1: "T-shirt Printing in Lagos",
        metaTitle: "T-shirt Printing in Lagos | Print Palash Studios",
        description:
            "Custom T-shirt printing in Lagos for brands, churches, events and teams — durable prints with rich colors.",
        intro:
            "Turn ideas into wearable statements. We print shirts that look clean, feel premium, and last longer.",
        category: "Merch & Apparel",
        highlights: ["Events/Churches", "Team shirts", "Durable print", "Rich colors"],
        sections: [
            { heading: "Best for", body: ["Brands", "Church groups", "Events", "Teams"] },
            { heading: "Quality", body: ["Durable finishing", "Clean color output", "Comfort-focused options (by supply)"] },
        ],
        faqs: [
            { q: "Do you print bulk orders?", a: "Yes — bulk and group orders are supported." },
        ],
    },

    // =========================
    // PACKAGING
    // =========================
    {
        slug: "paper-bag-printing-lagos",
        title: "Paper Bag Printing",
        h1: "Paper Bag Printing in Lagos",
        metaTitle: "Paper Bag Printing in Lagos | Print Palash Studios",
        description:
            "Paper bag printing in Lagos — premium branded paper bags for stores, boutiques, food brands and events.",
        intro:
            "Upgrade packaging with branded paper bags that feel premium and increase brand perception immediately.",
        category: "Packaging",
        highlights: ["Boutiques/Stores", "Food brands", "Premium look", "Brand visibility"],
        sections: [
            { heading: "Best for", body: ["Boutiques", "Food brands", "Retail stores", "Events"] },
            { heading: "Quality", body: ["Neat finishing", "Clean brand placement", "Consistent color output"] },
        ],
        faqs: [
            { q: "Do you offer different bag sizes?", a: "Yes — bag size depends on stock/spec. Share your preferred size." },
        ],
    },

    {
        slug: "packaging-printing-lagos",
        title: "Packaging Printing",
        h1: "Packaging Printing in Lagos",
        metaTitle: "Packaging Printing in Lagos | Print Palash Studios",
        description:
            "Custom packaging printing in Lagos — boxes, cartons, branded packaging for food, cosmetics and retail products.",
        intro:
            "Packaging that sells. We print boxes and packaging that make your brand look bigger, cleaner, and more trusted.",
        category: "Packaging",
        highlights: ["Boxes/Cartons", "Food/Cosmetics", "Premium branding", "Retail packaging"],
        sections: [
            { heading: "What we print", body: ["Product boxes", "Cartons", "Retail packaging", "Food & cosmetic packaging"] },
            { heading: "Brand impact", body: ["Improves shelf appeal", "Builds trust", "Strengthens brand identity"] },
        ],
        faqs: [
            { q: "Can you help with packaging design?", a: "Yes — we can support design/layout based on your requirements." },
        ],
    },

    // =========================
    // BOOKS & DOCUMENTS
    // =========================
    {
        slug: "document-printing-binding-lagos",
        title: "Document Printing & Binding",
        h1: "Document Printing & Binding in Lagos",
        metaTitle: "Document Printing & Binding in Lagos | Print Palash Studios",
        description:
            "Document printing and binding in Lagos — reports, manuals, projects, spiral binding and clean finishing.",
        intro:
            "Professional document printing and binding for students and businesses — clean pages, neat binding, and sharp output.",
        category: "Books & Documents",
        highlights: ["Spiral binding", "Reports/Manuals", "Clean finishing", "Sharp text"],
        sections: [
            { heading: "Best for", body: ["Project/thesis printing", "Reports", "Manuals", "Training materials"] },
            { heading: "Binding options", body: ["Spiral binding", "Other options based on availability/spec"] },
        ],
        faqs: [
            { q: "Do you print thesis/projects?", a: "Yes — project/thesis printing and binding is supported." },
        ],
    },
];
