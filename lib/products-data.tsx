export interface Product {
  name: string;
  slug: string;
  price: string;
  unit: string;
  image: string;
  description: string;
  category: string;
  popular?: boolean;
  keyFeatures: string;
  delivery: {
    lagos: string;
    others: string;
  };
  priceNumeric: number;
  tax: number;
  images: string[];
}

// Shared product data that can be used across components
export const generateSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

export const productsData = {
  Bags: [
    {
      name: "A2 Paper Bag",
      slug: generateSlug("A2 Paper Bag"),
      price: "₦120,000",
      unit: "per 100",
      image: "/product-images/bags/a2-paper-bagee.png",
      description: "Large A2 paper bags",
      category: "Bags",
      keyFeatures: "Durable A2 paper bags for packaging and branding.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 120000,
      tax: 9600,
      images: ["/product-images/bags/a2-paper-bag.png"],
    },

    {
      name: "A3 Paper Bag",
      slug: generateSlug("A3 Paper Bag"),
      price: "₦100,000",
      unit: "per 100",
      image: "/product-images/bags/a3-paper-bag.jpg",
      description: "Medium A3 paper bags",
      category: "Bags",
      keyFeatures: "Strong A3 paper bags for shopping and retail.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 100000,
      tax: 8000,
      images: ["/product-images/bags/a3-paper-bag.png"],
    },

    {
      name: "A4 Paper Bag",
      slug: generateSlug("A4 Paper Bag"),
      price: "₦90,000",
      unit: "per 100",
      image: "/product-images/bags/a4-paper-bag.jpg",
      description: "Custom branded A4 paper bags",
      category: "Bags",
      keyFeatures: "Durable A4 paper bags with custom branding.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 90000,
      tax: 7200,
      images: ["/product-images/bags/a4-paper-bag.png"],
    },

    {
      name: "A5 Paper Bag",
      slug: generateSlug("A5 Paper Bag"),
      price: "₦75,000",
      unit: "per 100",
      image: "/product-images/bags/a5-paper-bag.jpg",
      description: "Compact A5 paper bags",
      category: "Bags",
      keyFeatures: "Portable A5 paper bags for lightweight packaging.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 75000,
      tax: 6000,
      images: ["/product-images/bags/a5-paper-bag.png"],
    },

    {
      name: "Courier Bag",
      slug: generateSlug("Courier Bag"),
      price: "₦25,500",
      unit: "per 100",
      image: "/product-images/bags/courier-bag.png",
      description: "Durable courier bags",
      category: "Bags",
      popular: true,
      keyFeatures: "Secure courier bags for shipping and logistics.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 25500,
      tax: 2040,
      images: ["/product-images/bags/courier-bag.png"],
    },

    {
      name: "Drawstring Bag",
      slug: generateSlug("Drawstring Bag"),
      price: "₦40,000",
      unit: "per 50",
      image: "/product-images/bags/drawstring-bags.png",
      description: "Custom drawstring bags",
      category: "Bags",
      keyFeatures: "Lightweight drawstring bags for schools and events.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 40000,
      tax: 3200,
      images: ["/product-images/bags/drawstring-bag.png"],
    },

    {
      name: "Fanny Waist Pack",
      slug: generateSlug("Fanny Waist Pack"),
      price: "₦35,000",
      unit: "per 50",
      image: "/product-images/bags/fanny-waist-pack.png",
      description: "Stylish waist packs",
      category: "Bags",
      keyFeatures: "Comfortable waist packs for travel and casual use.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 35000,
      tax: 2800,
      images: ["/product-images/bags/fanny-waist-pack.png"],
    },

    {
      name: "Jute Bag",
      slug: generateSlug("Jute Bag"),
      price: "₦50,000",
      unit: "per 100",
      image: "/product-images/bags/jute-bag.png",
      description: "Eco-friendly jute bags",
      category: "Bags",
      keyFeatures: "Reusable jute bags perfect for shopping and branding.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 50000,
      tax: 4000,
      images: ["/product-images/bags/jute-bag.png"],
    },

    {
      name: "Kraft Bag",
      slug: generateSlug("Kraft Bag"),
      price: "₦45,000",
      unit: "per 100",
      image: "/product-images/bags/kraft-bag.png",
      description: "Brown kraft paper bags",
      category: "Bags",
      keyFeatures: "Eco-friendly kraft bags for packaging and retail.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 45000,
      tax: 3600,
      images: ["/product-images/bags/kraft-bag.png"],
    },

    {
      name: "Pillow Bags (A4)",
      slug: generateSlug("Pillow Bags (A4)"),
      price: "₦60,000",
      unit: "per 100",
      image: "/product-images/bags/pillow-bags-a4.png",
      description: "Premium pillow bags",
      category: "Bags",
      keyFeatures: "Elegant pillow bags suitable for gifts and packaging.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 60000,
      tax: 4800,
      images: ["/product-images/bags/pillow-bags-a4.png"],
    },

    {
      name: "Poly Bag",
      slug: generateSlug("Poly Bag"),
      price: "₦30,000",
      unit: "per 100",
      image: "/product-images/bags/poly-bag.png",
      description: "Transparent poly bags",
      category: "Bags",
      keyFeatures: "Strong poly bags for storage and packaging.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 30000,
      tax: 2400,
      images: ["/product-images/bags/poly-bag.png"],
    },

    {
      name: "Singlet Nylon",
      slug: generateSlug("Singlet Nylon"),
      price: "₦20,000",
      unit: "per 100",
      image: "/product-images/bags/singlet-nylon.png",
      description: "Durable singlet nylon bags",
      category: "Bags",
      keyFeatures: "Strong nylon bags suitable for shopping and packaging.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 20000,
      tax: 1600,
      images: ["/product-images/bags/singlet-nylon.png"],
    },

    {
      name: "Sublimation Tote Bag",
      slug: generateSlug("Sublimation Tote Bag"),
      price: "₦55,000",
      unit: "per 50",
      image: "/product-images/bags/sublimation-tote-bag.png",
      description: "Custom sublimation tote bags",
      category: "Bags",
      keyFeatures: "Perfect tote bags for custom printing and branding.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 55000,
      tax: 4400,
      images: ["/product-images/bags/sublimation-tote-bag.png"],
    },

    {
      name: "Tote Bag",
      slug: generateSlug("Tote Bag"),
      price: "₦45,000",
      unit: "per 50",
      image: "/product-images/bags/tote-bag.png",
      description: "Reusable tote bags",
      category: "Bags",
      keyFeatures: "Stylish reusable tote bags for shopping and branding.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 45000,
      tax: 3600,
      images: ["/product-images/bags/tote-bag.png"],
    },

    {
      name: "Wine Paper Bag",
      slug: generateSlug("Wine Paper Bag"),
      price: "₦50,000",
      unit: "per 100",
      image: "/product-images/bags/wine-paper-bag.png",
      description: "Elegant wine paper bags",
      category: "Bags",
      keyFeatures: "Premium wine paper bags for gifting and packaging.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 50000,
      tax: 4000,
      images: ["/product-images/bags/wine-paper-bag.png"],
    },
  ],

  "Banners & Large Format": [
    {
      name: "Big Base Rollup",
      slug: generateSlug("Big Base Rollup"),
      price: "₦35,000",
      unit: "each",
      image: "/product-images/banners&largeformat/big-base-rollup.jpeg",
      description: "Premium big base rollup banner",
      category: "Banners & Large Format",
      keyFeatures:
        "Strong and portable rollup banners for events and branding.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 35000,
      tax: 2800,
      images: ["/product-images/banners&largeformat/big-base-rollup.png"],
    },

    {
      name: "Dispatch Box",
      slug: generateSlug("Dispatch Box"),
      price: "₦15,000",
      unit: "each",
      image: "/product-images/banners&largeformat/dispatch-boxes.png",
      description: "Custom dispatch boxes",
      category: "Banners & Large Format",
      keyFeatures: "Durable dispatch boxes for packaging and delivery.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 15000,
      tax: 1200,
      images: ["/product-images/banners&largeformat/dispatch-box.png"],
    },

    {
      name: "Dummy Cheque",
      slug: generateSlug("Dummy Cheque"),
      price: "₦18,000",
      unit: "each",
      image: "/product-images/banners&largeformat/dummy-cheques.png",
      description: "Large presentation dummy cheque",
      category: "Banners & Large Format",
      keyFeatures: "Perfect for award ceremonies and presentations.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 18000,
      tax: 1440,
      images: ["/product-images/banners&largeformat/dummy-cheque.png"],
    },

    {
      name: "Event Backdrop",
      slug: generateSlug("Event Backdrop"),
      price: "₦45,000",
      unit: "per sqm",
      image: "/product-images/banners&largeformat/event-backdrops.png",
      description: "Large event backdrop banners",
      category: "Banners & Large Format",
      keyFeatures: "Professional backdrop banners for events and ceremonies.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 45000,
      tax: 3600,
      images: ["/product-images/banners&largeformat/event-backdrop.png"],
    },

    {
      name: "Flag Banner",
      slug: generateSlug("Flag Banner"),
      price: "₦28,000",
      unit: "each",
      image: "/product-images/banners&largeformat/flag-banner.png",
      description: "Outdoor flag banners",
      category: "Banners & Large Format",
      keyFeatures: "Eye-catching flag banners for outdoor branding.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 28000,
      tax: 2240,
      images: ["/product-images/banners&largeformat/flag-banner.png"],
    },

    {
      name: "Gazebo Tent",
      slug: generateSlug("Gazebo Tent"),
      price: "₦120,000",
      unit: "each",
      image: "/product-images/banners&largeformat/gazebo-tent.png",
      description: "Custom branded gazebo tents",
      category: "Banners & Large Format",
      keyFeatures: "Durable tents for outdoor promotions and events.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 120000,
      tax: 9600,
      images: ["/product-images/banners&largeformat/gazebo-tent.png"],
    },

    {
      name: "Instagram Frame Board",
      slug: generateSlug("Instagram Frame Board"),
      price: "₦22,000",
      unit: "each",
      image: "/product-images/banners&largeformat/instagram-frame-board.png",
      description: "Custom Instagram frame boards",
      category: "Banners & Large Format",
      keyFeatures: "Fun branded Instagram boards for events and activations.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 22000,
      tax: 1760,
      images: ["/product-images/banners&largeformat/instagram-frame-board.png"],
    },

    {
      name: "Lampost Banner",
      slug: generateSlug("Lampost Banner"),
      price: "₦30,000",
      unit: "each",
      image: "/product-images/banners&largeformat/lampost-banner.png",
      description: "Street lampost banners",
      category: "Banners & Large Format",
      keyFeatures: "Vertical banners mounted on street lamp posts.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 30000,
      tax: 2400,
      images: ["/product-images/banners&largeformat/lampost-banner.png"],
    },

    {
      name: "Pop Stand Banner",
      slug: generateSlug("Pop Stand Banner"),
      price: "₦25,000",
      unit: "each",
      image: "/product-images/banners&largeformat/pop-stand-banner.png",
      description: "Portable pop stand banners",
      category: "Banners & Large Format",
      keyFeatures: "Portable promotional stand banners for displays.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 25000,
      tax: 2000,
      images: ["/product-images/banners&largeformat/pop-stand-banner.png"],
    },

    {
      name: "Small Base Rollup",
      slug: generateSlug("Small Base Rollup"),
      price: "₦28,000",
      unit: "each",
      image: "/product-images/banners&largeformat/small-base-rollup.png",
      description: "Compact rollup banner stands",
      category: "Banners & Large Format",
      keyFeatures: "Portable rollup banners for indoor displays.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 28000,
      tax: 2240,
      images: ["/product-images/banners&largeformat/small-base-rollup.png"],
    },

    {
      name: "Snapper Frame",
      slug: generateSlug("Snapper Frame"),
      price: "₦35,000",
      unit: "each",
      image: "/product-images/banners&largeformat/snapper-frame.png",
      description: "Aluminium snapper frames",
      category: "Banners & Large Format",
      keyFeatures: "Professional snapper frames for poster displays.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 35000,
      tax: 2800,
      images: ["/product-images/banners&largeformat/snapper-frame.png"],
    },

    {
      name: "Sticker Print",
      slug: generateSlug("Sticker Print"),
      price: "₦12,000",
      unit: "per sqm",
      image: "/product-images/banners&largeformat/sticker-print.jpeg",
      description: "Custom sticker printing",
      category: "Banners & Large Format",
      keyFeatures: "High-quality sticker prints for branding and packaging.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 12000,
      tax: 960,
      images: ["/product-images/banners&largeformat/sticker-print.jpeg"],
    },

    {
      name: "Teardrop Banner",
      slug: generateSlug("Teardrop Banner"),
      price: "₦28,000",
      unit: "each",
      image: "/product-images/banners&largeformat/teardrop-banner.png",
      description: "Teardrop promotional banners",
      category: "Banners & Large Format",
      keyFeatures: "Outdoor teardrop banners for advertising and events.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 28000,
      tax: 2240,
      images: ["/product-images/banners&largeformat/teardrop-banner.png"],
    },

    {
      name: "Vehicle Branding",
      slug: generateSlug("Vehicle Branding"),
      price: "₦85,000",
      unit: "per vehicle",
      image: "/product-images/banners&largeformat/vehicle-branding.png",
      description: "Custom vehicle branding services",
      category: "Banners & Large Format",
      keyFeatures: "Professional vehicle wraps and branding solutions.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 85000,
      tax: 6800,
      images: ["/product-images/banners&largeformat/vehicle-branding.png"],
    },

    {
      name: "X-Banner",
      slug: generateSlug("X-Banner"),
      price: "₦20,000",
      unit: "each",
      image: "/product-images/banners&largeformat/x-banner.png",
      description: "Portable X-banner stands",
      category: "Banners & Large Format",
      keyFeatures: "Lightweight X-banner stands for indoor promotions.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 20000,
      tax: 1600,
      images: ["/product-images/banners&largeformat/x-banner.png"],
    },
  ],

  "Box & Packaging": [
    {
      name: "Drawer Box",
      slug: generateSlug("Drawer Box"),
      price: "₦3,500",
      unit: "per piece",
      image: "/product-images/box&packaging/drawer-box.png",
      description: "Premium drawer packaging boxes",
      category: "Box & Packaging",
      keyFeatures:
        "Luxury drawer boxes suitable for gifts, accessories, and premium packaging.",
      delivery: {
        lagos: "2-4 Working Days for order within Lagos",
        others: "4-7 Working Days for Order from other state",
      },
      priceNumeric: 3500,
      tax: 280,
      images: ["/product-images/box&packaging/drawer-box.png"],
    },

    {
      name: "Food Pack",
      slug: generateSlug("Food Pack"),
      price: "₦250",
      unit: "per piece",
      image: "/product-images/box&packaging/food-pack.png",
      description: "Food takeaway packaging boxes",
      category: "Box & Packaging",
      keyFeatures:
        "Food-grade packaging suitable for takeaway and food delivery.",
      delivery: {
        lagos: "2-4 Working Days for order within Lagos",
        others: "4-7 Working Days for Order from other state",
      },
      priceNumeric: 250,
      tax: 20,
      images: ["/product-images/box&packaging/food-pack.png"],
    },

    {
      name: "Magnetic Flip Pack",
      slug: generateSlug("Magnetic Flip Pack"),
      price: "₦5,000",
      unit: "per piece",
      image: "/product-images/box&packaging/magnetic-flip-pack.png",
      description: "Luxury magnetic flip packaging boxes",
      category: "Box & Packaging",
      keyFeatures:
        "Elegant magnetic closure boxes for premium products and gift items.",
      delivery: {
        lagos: "2-4 Working Days for order within Lagos",
        others: "4-7 Working Days for Order from other state",
      },
      priceNumeric: 5000,
      tax: 400,
      images: ["/product-images/box&packaging/magnetic-flip-pack.png"],
    },

    {
      name: "Mailer Box",
      slug: generateSlug("Mailer Box"),
      price: "₦2,500",
      unit: "per piece",
      image: "/product-images/box&packaging/mailer-box.jpeg",
      description: "Durable mailer packaging boxes",
      category: "Box & Packaging",
      keyFeatures:
        "Strong corrugated mailer boxes for shipping and ecommerce packaging.",
      delivery: {
        lagos: "2-4 Working Days for order within Lagos",
        others: "4-7 Working Days for Order from other state",
      },
      priceNumeric: 2500,
      tax: 200,
      images: ["/product-images/box&packaging/mailer-box.jpeg"],
    },

    {
      name: "Pizza Box",
      slug: generateSlug("Pizza Box"),
      price: "₦800",
      unit: "per piece",
      image: "/product-images/box&packaging/pizza-box.jpeg",
      description: "Custom pizza packaging boxes",
      category: "Box & Packaging",
      keyFeatures:
        "Food-safe pizza boxes designed for heat retention and delivery.",
      delivery: {
        lagos: "2-4 Working Days for order within Lagos",
        others: "4-7 Working Days for Order from other state",
      },
      priceNumeric: 800,
      tax: 64,
      images: ["/product-images/box&packaging/pizza-box.jpeg"],
    },
  ],

  Brochures: [
    {
      name: "A4 Landscape Brochure",
      slug: generateSlug("A4 Landscape Brochure"),
      price: "₦15,000",
      unit: "per 500",
      image: "/product-images/brochures/a4-landscape-brochure.png",
      description: "Professional landscape brochures",
      category: "Brochures",
      popular: true,
      keyFeatures:
        "High-quality landscape brochures perfect for marketing and promotions.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 15000,
      tax: 1200,
      images: ["/product-images/brochures/a4-landscape-brochure.png"],
    },

    {
      name: "A4 Portrait Brochure",
      slug: generateSlug("A4 Portrait Brochure"),
      price: "₦12,000",
      unit: "per 500",
      image: "/product-images/brochures/a4-portrait-brochure.png",
      description: "Professional portrait brochures",
      category: "Brochures",
      keyFeatures:
        "Clean portrait brochures with premium print quality and layout.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 12000,
      tax: 960,
      images: ["/product-images/brochures/a4-portrait-brochure.png"],
    },

    {
      name: "Funeral Brochure",
      slug: generateSlug("Funeral Brochure"),
      price: "₦16,000",
      unit: "per 500",
      image: "/product-images/brochures/funeral-brochure.jpeg",
      description: "Elegant funeral brochures",
      category: "Brochures",
      keyFeatures:
        "Beautifully designed funeral brochures suitable for memorial services.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 16000,
      tax: 1280,
      images: ["/product-images/brochures/funeral-brochure.png"],
    },

    {
      name: "Tri-Fold Brochure",
      slug: generateSlug("Tri-Fold Brochure"),
      price: "₦18,000",
      unit: "per 500",
      image: "/product-images/brochures/trifold.png",
      description: "Classic tri-fold brochures",
      category: "Brochures",
      keyFeatures:
        "Professional tri-fold brochures ideal for promotions and advertisements.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 18000,
      tax: 1440,
      images: ["/product-images/brochures/trifold.png"],
    },
  ],

  "Business Cards": [
    {
      name: "Thank You Business Card",
      slug: generateSlug("Thank You Business Card"),
      price: "₦15,000",
      unit: "per 100",
      image: "/product-images/business-cards/thank-you-business-card.jpeg",
      description: "Custom thank you business cards",
      category: "Business Cards",
      popular: true,
      keyFeatures:
        "Elegant thank you business cards perfect for customer appreciation and branding.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 15000,
      tax: 1200,
      images: ["/product-images/business-cards/thank-you-business-card.png"],
    },

    {
      name: "Premium Business Card",
      slug: generateSlug("Premium Business Card"),
      price: "₦25,000",
      unit: "per 100",
      image: "/product-images/business-cards/premium-business-card.png",
      description: "Luxury premium business cards",
      category: "Business Cards",
      keyFeatures:
        "Premium quality cardstock with luxury finish and sharp print details.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 25000,
      tax: 2000,
      images: ["/product-images/business-cards/premium-business-card.png"],
    },

    {
      name: "Top Quality Business Card",
      slug: generateSlug("Top Quality Business Card"),
      price: "₦35,000",
      unit: "per 100",
      image: "/product-images/business-cards/top-quality-business-card.png",
      description: "Top quality professional business cards",
      category: "Business Cards",
      keyFeatures:
        "High-end business cards with premium finishing for a lasting impression.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 35000,
      tax: 2800,
      images: ["/product-images/business-cards/top-quality-business-card.png"],
    },
  ],

  Calendars: [
    {
      name: "A2 multiple page Wall Calendar",
      slug: generateSlug("A2 multiple page Wall Calendar"),
      price: "₦15,000",
      unit: "each",
      image: "/product-images/calendars/a2-multiple-page-wall-calendar.png",
      description: "Large A2 wall calendars",
      category: "Calendars",
      keyFeatures:
        "Large A2 wall calendars with premium print quality and durable finishing.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 15000,
      tax: 1200,
      images: ["/product-images/calendars/a2-multiple-page-wall-calendar.png"],
    },
    {
      name: "A2 single page Wall Calendar",
      slug: generateSlug("A2 single page Wall Calendar"),
      price: "₦15,000",
      unit: "each",
      image: "/product-images/calendars/a2-single-page-wall-calendar.png",
      description: "Large A2 wall calendars",
      category: "Calendars",
      keyFeatures:
        "Large A2 wall calendars with premium print quality and durable finishing.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 15000,
      tax: 1200,
      images: ["/product-images/calendars/a2-single-page-wall-calendar.png"],
    },

    {
      name: "A3 multiple page Wall Calendar",
      slug: generateSlug("A3 multiple page Wall Calendar"),
      price: "₦15,000",
      unit: "each",
      image: "/product-images/calendars/a3-multiple-page-wall-calendar.png",
      description: "Large A3 wall calendars",
      category: "Calendars",
      keyFeatures:
        "Large A3 wall calendars with premium print quality and durable finishing.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 15000,
      tax: 1200,
      images: ["/product-images/calendars/a3-multiple-page-wall-calendar.png"],
    },
    {
      name: "A3 single page Wall Calendar",
      slug: generateSlug("A3 single page Wall Calendar"),
      price: "₦15,000",
      unit: "each",
      image: "/product-images/calendars/a3-single-page-wall-calendar.png",
      description: "Large A3 wall calendars",
      category: "Calendars",
      keyFeatures:
        "Large A3 wall calendars with premium print quality and durable finishing.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 15000,
      tax: 1200,
      images: ["/product-images/calendars/a3-single-page-wall-calendar.png"],
    },

    {
      name: "Table Calendar",
      slug: generateSlug("Table Calendar"),
      price: "₦8,000",
      unit: "each",
      image: "/product-images/calendars/table-calendar.jpeg",
      description: "Compact table calendars",
      category: "Calendars",
      popular: true,
      keyFeatures:
        "Compact table calendars perfect for office desks and workspaces.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 8000,
      tax: 640,
      images: ["/product-images/calendars/table-calendar.png"],
    },
  ],

  "Campaign Materials": [
    {
      name: "A2-A3 Political Campaign Poster",
      slug: generateSlug("A2-A3 Political Campaign Poster"),
      price: "₦5,500",
      unit: "per piece",
      image:
        "/product-images/campaign-materials/a2-a3-political-campaign-poster.png",
      description: "Large political campaign posters",
      category: "Campaign Materials",
      popular: true,
      keyFeatures:
        "High-quality A2 and A3 campaign posters for rallies and outdoor promotions.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 5500,
      tax: 440,
      images: [
        "/product-images/campaign-materials/a2-a3-political-campaign-poster.png",
      ],
    },

    {
      name: "A5 Flyer",
      slug: generateSlug("A5 Flyer"),
      price: "₦12,000",
      unit: "per 500",
      image: "/product-images/campaign-materials/a5-flyer.png",
      description: "Political campaign flyers",
      category: "Campaign Materials",
      keyFeatures:
        "Premium A5 flyers suitable for campaign promotions and handouts.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 12000,
      tax: 960,
      images: ["/product-images/campaign-materials/a5-flyer.png"],
    },

    {
      name: "Political Campaign Banners",
      slug: generateSlug("Political Campaign Banners"),
      price: "₦18,000",
      unit: "per sqm",
      image:
        "/product-images/campaign-materials/political-campaign-banners.png",
      description: "Large campaign banners",
      category: "Campaign Materials",
      keyFeatures:
        "Durable campaign banners perfect for rallies, events, and public displays.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 18000,
      tax: 1440,
      images: [
        "/product-images/campaign-materials/political-campaign-banners.png",
      ],
    },

    {
      name: "Political Campaign Caps",
      slug: generateSlug("Political Campaign Caps"),
      price: "₦3,500",
      unit: "per piece",
      image: "/product-images/campaign-materials/political-campaign-caps.png",
      description: "Custom political campaign caps",
      category: "Campaign Materials",
      keyFeatures:
        "Branded campaign caps ideal for supporters, rallies, and promotions.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 3500,
      tax: 280,
      images: [
        "/product-images/campaign-materials/political-campaign-caps.png",
      ],
    },

    {
      name: "Political Campaign T-Shirt",
      slug: generateSlug("Political Campaign T-Shirt"),
      price: "₦4,500",
      unit: "per piece",
      image:
        "/product-images/campaign-materials/political-campaign-t-shirt.png",
      description: "Custom campaign t-shirts",
      category: "Campaign Materials",
      keyFeatures:
        "High-quality branded t-shirts suitable for campaign events and supporters.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 4500,
      tax: 360,
      images: [
        "/product-images/campaign-materials/political-campaign-t-shirt.png",
      ],
    },
  ],

  "Caps & Hats": [
    {
      name: "Baseball Cap",
      slug: generateSlug("Baseball Cap"),
      price: "₦5,000",
      unit: "each",
      image: "/product-images/caps&hats/baseball-cap.png",
      description: "Custom embroidered baseball caps",
      category: "Caps & Hats",
      popular: true,
      keyFeatures:
        "High-quality baseball caps with adjustable strap and premium embroidery.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 5000,
      tax: 400,
      images: ["/product-images/caps&hats/baseball-cap.png"],
    },

    {
      name: "Beanie",
      slug: generateSlug("Beanie"),
      price: "₦4,500",
      unit: "each",
      image: "/product-images/caps&hats/beanie.png",
      description: "Warm custom beanies",
      category: "Caps & Hats",
      keyFeatures:
        "Comfortable and stylish beanies suitable for branding and casual wear.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 4500,
      tax: 360,
      images: ["/product-images/caps&hats/beanie.png"],
    },

    {
      name: "Snapback Cap",
      slug: generateSlug("Snapback Cap"),
      price: "₦6,500",
      unit: "each",
      image: "/product-images/caps&hats/snapback-cap.png",
      description: "Stylish snapback caps",
      category: "Caps & Hats",
      keyFeatures:
        "Premium snapback caps with flat brim and adjustable snap closure.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 6500,
      tax: 520,
      images: ["/product-images/caps&hats/snapback-cap.png"],
    },

    {
      name: "Trucker Cap",
      slug: generateSlug("Trucker Cap"),
      price: "₦5,500",
      unit: "each",
      image: "/product-images/caps&hats/trucker-cap.png",
      description: "Breathable trucker caps",
      category: "Caps & Hats",
      keyFeatures:
        "Mesh-back trucker caps designed for comfort and outdoor use.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 5500,
      tax: 440,
      images: ["/product-images/caps&hats/trucker-cap.png"],
    },

    {
      name: "Custom Bucket Hat",
      slug: generateSlug("Custom Bucket Hat"),
      price: "₦6,000",
      unit: "each",
      image: "/product-images/caps&hats/custom-bucket-hat.png",
      description: "Custom branded bucket hats",
      category: "Caps & Hats",
      keyFeatures:
        "Stylish bucket hats suitable for fashion, branding, and outdoor activities.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 6000,
      tax: 480,
      images: ["/product-images/caps&hats/custom-bucket-hat.png"],
    },
  ],

  "Clothing & Apparel": [
    {
      name: "Printivo Merch",
      slug: generateSlug("Printivo Merch"),
      price: "₦10,000",
      unit: "each",
      image: "/product-images/clothing-apparel/printivo-mech.jpg",
      description: "Custom branded merch apparel",
      category: "Clothing & Apparel",
      popular: true,
      keyFeatures:
        "Premium branded merch apparel suitable for businesses and events.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 10000,
      tax: 800,
      images: ["/product-images/clothing-apparel/printivo-merch.png"],
    },

    {
      name: "Apron",
      slug: generateSlug("Apron"),
      price: "₦6,000",
      unit: "each",
      image: "/product-images/clothing-apparel/apron.png",
      description: "Custom branded aprons",
      category: "Clothing & Apparel",
      keyFeatures:
        "Durable aprons suitable for restaurants, salons, and branding.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 6000,
      tax: 480,
      images: ["/product-images/clothing-apparel/apron.png"],
    },

    {
      name: "Face Towel",
      slug: generateSlug("Face Towel"),
      price: "₦3,500",
      unit: "each",
      image: "/product-images/clothing-apparel/face-towel.png",
      description: "Soft branded face towels",
      category: "Clothing & Apparel",
      keyFeatures:
        "High-quality face towels suitable for branding and promotional use.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 3500,
      tax: 280,
      images: ["/product-images/clothing-apparel/face-towel.png"],
    },

    {
      name: "Folded Round Neck",
      slug: generateSlug("Folded Round Neck"),
      price: "₦8,000",
      unit: "each",
      image: "/product-images/clothing-apparel/folded-round-neck.png",
      description: "Custom folded round neck shirts",
      category: "Clothing & Apparel",
      keyFeatures: "Comfortable round neck shirts with premium cotton fabric.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 8000,
      tax: 640,
      images: ["/product-images/clothing-apparel/folded-round-neck.png"],
    },

    {
      name: "Hoodie",
      slug: generateSlug("Hoodie"),
      price: "₦15,000",
      unit: "each",
      image: "/product-images/clothing-apparel/hoodie.png",
      description: "Custom branded hoodies",
      category: "Clothing & Apparel",
      keyFeatures:
        "Warm and stylish hoodies suitable for casual wear and branding.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 15000,
      tax: 1200,
      images: ["/product-images/clothing-apparel/hoodie.png"],
    },

    {
      name: "Round Neck Polo",
      slug: generateSlug("Round Neck Polo"),
      price: "₦12,000",
      unit: "each",
      image: "/product-images/clothing-apparel/round-neck-polo.png",
      description: "Custom round neck polo shirts",
      category: "Clothing & Apparel",
      keyFeatures:
        "Professional polo shirts suitable for uniforms and branding.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 12000,
      tax: 960,
      images: ["/product-images/clothing-apparel/round-neck-polo.png"],
    },

    {
      name: "Safety Jacket",
      slug: generateSlug("Safety Jacket"),
      price: "₦9,000",
      unit: "each",
      image: "/product-images/clothing-apparel/safety-jacket.png",
      description: "Reflective safety jackets",
      category: "Clothing & Apparel",
      keyFeatures:
        "High-visibility safety jackets suitable for industrial and outdoor work.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 9000,
      tax: 720,
      images: ["/product-images/clothing-apparel/safety-jacket.png"],
    },

    {
      name: "Sweatshirt",
      slug: generateSlug("Sweatshirt"),
      price: "₦13,000",
      unit: "each",
      image: "/product-images/clothing-apparel/sweatshirt.png",
      description: "Custom sweatshirts",
      category: "Clothing & Apparel",
      keyFeatures:
        "Comfortable sweatshirts suitable for casual wear and corporate branding.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 13000,
      tax: 1040,
      images: ["/product-images/clothing-apparel/sweatshirt.png"],
    },

    {
      name: "Versity Jacket",
      slug: generateSlug("Versity Jacket"),
      price: "₦20,000",
      unit: "each",
      image: "/product-images/clothing-apparel/versity-jacket.png",
      description: "Stylish varsity jackets",
      category: "Clothing & Apparel",
      keyFeatures:
        "Premium varsity jackets with modern design and durable fabric.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 20000,
      tax: 1600,
      images: ["/product-images/clothing-apparel/versity-jacket.png"],
    },
  ],
  ClothesTag: [
    {
      name: "Cloth Paper Tag",
      slug: generateSlug("Cloth Paper Tag"),
      price: "₦8,000",
      unit: "per 100",
      image: "/product-images/clothestag/cloth-paper-tag.png",
      description: "Custom paper clothing tags",
      category: "ClothesTag",
      keyFeatures:
        "Premium paper tags suitable for fashion branding and clothing labels.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 8000,
      tax: 640,
      images: ["/product-images/clothestag/cloth-paper-tag.png"],
    },

    {
      name: "Woven Label",
      slug: generateSlug("Woven Label"),
      price: "₦10,000",
      unit: "per 100",
      image: "/product-images/clothestag/woven-label.jpeg",
      description: "Custom woven clothing labels",
      category: "ClothesTag",
      keyFeatures:
        "Durable woven labels with premium stitching for fashion brands.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 10000,
      tax: 800,
      images: ["/product-images/clothestag/woven-label.png"],
    },

    {
      name: "Custom Clothing Labels",
      slug: generateSlug("Custom Clothing Labels"),
      price: "₦12,000",
      unit: "per 100",
      image: "/product-images/clothestag/custom-clothing-labels.jpeg",
      description: "Personalized clothing labels",
      category: "ClothesTag",
      keyFeatures:
        "High-quality custom labels suitable for all clothing types and branding.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 12000,
      tax: 960,
      images: ["/product-images/clothestag/custom-clothing-labels.png"],
    },

    {
      name: "Convincing Sweatshirt Labels",
      slug: generateSlug("Convincing Sweatshirt Labels"),
      price: "₦9,500",
      unit: "per 100",
      image: "/product-images/clothestag/convincing-sweatshirt-labels.jpeg",
      description: "Premium sweatshirt labels",
      category: "ClothesTag",
      keyFeatures:
        "Stylish sweatshirt labels with durable print and premium finish.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 9500,
      tax: 760,
      images: ["/product-images/clothestag/convincing-sweatshirt-labels.png"],
    },
  ],

  Envelopes: [
    {
      name: "C4 Envelope",
      slug: generateSlug("C4 Envelope"),
      price: "₦5,000",
      unit: "per 100",
      image: "/product-images/envelopes/c4-envelope.jpeg",
      description: "Professional C4 envelopes",
      category: "Envelopes",
      keyFeatures:
        "High-quality C4 envelopes suitable for office documents and corporate branding.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 5000,
      tax: 400,
      images: ["/product-images/envelopes/c4-envelope.png"],
    },

    {
      name: "DL Small Envelope",
      slug: generateSlug("DL Small Envelope"),
      price: "₦4,500",
      unit: "per 100",
      image: "/product-images/envelopes/dl-small-envelope.jpeg",
      description: "Compact DL envelopes",
      category: "Envelopes",
      keyFeatures:
        "Professional DL envelopes suitable for letters, invoices, and documents.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 4500,
      tax: 360,
      images: ["/product-images/envelopes/dl-small-envelope.png"],
    },

    {
      name: "Window Envelope",
      slug: generateSlug("Window Envelope"),
      price: "₦6,000",
      unit: "per 100",
      image: "/product-images/envelopes/window-envelope.jpeg",
      description: "Envelopes with transparent window",
      category: "Envelopes",
      keyFeatures:
        "Professional window envelopes suitable for invoices, billing, and statements.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 6000,
      tax: 480,
      images: ["/product-images/envelopes/window-envelope.png"],
    },
  ],

  "Events & Souvenirs": [
    {
      name: "Big Magic Mug",
      slug: generateSlug("Big Magic Mug"),
      price: "₦6,500",
      unit: "each",
      image: "/product-images/events&souvenirs/big-magic-mug.png",
      description: "Large heat-sensitive magic mugs",
      category: "Events & Souvenirs",
      keyFeatures: "Custom heat-changing mugs perfect for gifts and branding.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 6500,
      tax: 520,
      images: ["/product-images/events&souvenirs/big-magic-mug.png"],
    },

    {
      name: "Big White Mug",
      slug: generateSlug("Big White Mug"),
      price: "₦5,000",
      unit: "each",
      image: "/product-images/events&souvenirs/big-white-mug.jpeg",
      description: "Large custom white mugs",
      category: "Events & Souvenirs",
      keyFeatures: "Premium white mugs suitable for branding and gifting.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 5000,
      tax: 400,
      images: ["/product-images/events&souvenirs/big-white-mug.png"],
    },

    {
      name: "Dummy Cheque",
      slug: generateSlug("Dummy Cheque"),
      price: "₦15,000",
      unit: "each",
      image: "/product-images/events&souvenirs/dummy-cheque.jpeg",
      description: "Custom presentation dummy cheques",
      category: "Events & Souvenirs",
      keyFeatures:
        "Large presentation cheques perfect for events and award ceremonies.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 15000,
      tax: 1200,
      images: ["/product-images/events&souvenirs/dummy-cheque.png"],
    },

    {
      name: "Dummy Currency Note",
      slug: generateSlug("Dummy Currency Note"),
      price: "₦10,000",
      unit: "each",
      image: "/product-images/events&souvenirs/dummy-currency-note.png",
      description: "Custom oversized currency notes",
      category: "Events & Souvenirs",
      keyFeatures:
        "High-quality custom currency notes for events and presentations.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 10000,
      tax: 800,
      images: ["/product-images/events&souvenirs/dummy-currency-note.png"],
    },

    {
      name: "A5 Notebook",
      slug: generateSlug("A5 Notebook"),
      price: "₦4,500",
      unit: "each",
      image: "/product-images/events&souvenirs/a5-notebook.jpeg",
      description: "Premium A5 notebooks",
      category: "Events & Souvenirs",
      keyFeatures: "Durable A5 notepads suitable for offices and branding.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 4500,
      tax: 360,
      images: ["/product-images/events&souvenirs/a5-notebook.png"],
    },
    {
      name: "Engraved Notebook",
      slug: generateSlug("Engraved Notebook"),
      price: "₦4,500",
      unit: "each",
      image: "/product-images/events&souvenirs/engraved-notebook.jpeg",
      description: "Premium engraved notebooks",
      category: "Events & Souvenirs",
      keyFeatures:
        "Durable engraved notepads suitable for offices and branding.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 4500,
      tax: 360,
      images: ["/product-images/events&souvenirs/engraved-notebook.png"],
    },
    {
      name: "Corporate Notebook",
      slug: generateSlug("Corporate Notebook"),
      price: "₦4,500",
      unit: "each",
      image: "/product-images/events&souvenirs/corporate-notebook.jpeg",
      description: "Premium corporate notebooks",
      category: "Events & Souvenirs",
      keyFeatures:
        "Durable corporate notepads suitable for offices and branding.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 4500,
      tax: 360,
      images: ["/product-images/events&souvenirs/corporate-notebook.png"],
    },

    {
      name: "Metallic Keyring",
      slug: generateSlug("Metallic Keyring"),
      price: "₦2,500",
      unit: "each",
      image: "/product-images/events&souvenirs/metallic-keyring.jpeg",
      description: "Premium metallic keyrings",
      category: "Events & Souvenirs",
      keyFeatures:
        "Durable metallic keyrings suitable for branding and souvenirs.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 2500,
      tax: 200,
      images: ["/product-images/events&souvenirs/metallic-keyring.png"],
    },

    {
      name: "Party Event Handband",
      slug: generateSlug("Party Event Handband"),
      price: "₦1,500",
      unit: "per 100",
      image: "/product-images/events&souvenirs/party-event-handband.jpeg",
      description: "Custom event handbands",
      category: "Events & Souvenirs",
      keyFeatures:
        "Comfortable event handbands suitable for parties and access control.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 1500,
      tax: 120,
      images: ["/product-images/events&souvenirs/party-event-handband.png"],
    },

    {
      name: "Party Paper Cup",
      slug: generateSlug("Party Paper Cup"),
      price: "₦3,000",
      unit: "per pack",
      image: "/product-images/events&souvenirs/party-paper-cup.jpeg",
      description: "Custom printed party paper cups",
      category: "Events & Souvenirs",
      keyFeatures:
        "Disposable paper cups suitable for events and celebrations.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 3000,
      tax: 240,
      images: ["/product-images/events&souvenirs/party-paper-cup.png"],
    },

    {
      name: "Pop Socket",
      slug: generateSlug("Pop Socket"),
      price: "₦2,000",
      unit: "each",
      image: "/product-images/events&souvenirs/pop-socket.jpeg",
      description: "Custom phone pop sockets",
      category: "Events & Souvenirs",
      keyFeatures: "Stylish phone grips suitable for branding and daily use.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 2000,
      tax: 160,
      images: ["/product-images/events&souvenirs/pop-socket.png"],
    },

    {
      name: "Small Magic Mug",
      slug: generateSlug("Small Magic Mug"),
      price: "₦5,500",
      unit: "each",
      image: "/product-images/events&souvenirs/small-magic-mug.jpeg",
      description: "Small heat-sensitive magic mugs",
      category: "Events & Souvenirs",
      keyFeatures: "Custom heat-changing mugs suitable for gifts and branding.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 5500,
      tax: 440,
      images: ["/product-images/events&souvenirs/small-magic-mug.png"],
    },

    {
      name: "Small White Mug",
      slug: generateSlug("Small White Mug"),
      price: "₦4,000",
      unit: "each",
      image: "/product-images/events&souvenirs/small-white-mug.jpeg",
      description: "Small custom white mugs",
      category: "Events & Souvenirs",
      keyFeatures: "Compact white mugs suitable for gifts and branding.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 4000,
      tax: 320,
      images: ["/product-images/events&souvenirs/small-white-mug.png"],
    },

    {
      name: "Throwpillow",
      slug: generateSlug("Throwpillow"),
      price: "₦7,500",
      unit: "each",
      image: "/product-images/events&souvenirs/throwpillow.jpg",
      description: "Custom printed throw pillows",
      category: "Events & Souvenirs",
      keyFeatures:
        "Soft decorative throw pillows suitable for gifts and interior décor.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 7500,
      tax: 600,
      images: ["/product-images/events&souvenirs/throwpillow.png"],
    },

    {
      name: " Compact Umbrella",
      slug: generateSlug(" Compact Umbrella"),
      price: "₦8,500",
      unit: "each",
      image: "/product-images/events&souvenirs/compact-umbrella.jpg",
      description: "Custom branded umbrellas",
      category: "Events & Souvenirs",
      keyFeatures:
        "Durable umbrellas suitable for promotional branding and outdoor use.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 8500,
      tax: 680,
      images: ["/product-images/events&souvenirs/compact-umbrella.png"],
    },

    {
      name: " Universal Umbrella",
      slug: generateSlug(" Universal Umbrella"),
      price: "₦8,500",
      unit: "each",
      image: "/product-images/events&souvenirs/universal-umbrella.png",
      description: "Custom branded umbrellas",
      category: "Events & Souvenirs",
      keyFeatures:
        "Durable umbrellas suitable for promotional branding and outdoor use.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 8500,
      tax: 680,
      images: ["/product-images/events&souvenirs/universal-umbrella.png"],
    },

    {
      name: "Wooden Keyring",
      slug: generateSlug("Wooden Keyring"),
      price: "₦2,000",
      unit: "each",
      image: "/product-images/events&souvenirs/wooden-keyring.jpeg",
      description: "Custom wooden keyrings",
      category: "Events & Souvenirs",
      keyFeatures:
        "Eco-friendly wooden keyrings suitable for souvenirs and branding.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 2000,
      tax: 160,
      images: ["/product-images/events&souvenirs/wooden-keyring.png"],
    },
  ],

  "Flyers & Posters": [
    {
      name: "A5 Flyers",
      slug: generateSlug("A5 Flyers"),
      price: "₦12,000",
      unit: "per 1000",
      image: "/product-images/flyers-handbills/flyer-1.jpg",
      description: "Standard A5 promotional flyers",
      category: "Flyers & Handbills",
      popular: true,
      keyFeatures:
        "High-quality A5 flyers with vibrant colors, perfect for promotions and events.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 12000,
      tax: 960,
      images: ["/product-images/flyers-handbills/flyer-1.jpg"],
    },
    {
      name: "A4 Flyers",
      slug: generateSlug("A4 Flyers"),
      price: "₦18,000",
      unit: "per 1000",
      image: "/product-images/flyers-handbills/flyer-2.jpg",
      description: "Large A4 promotional flyers",
      category: "Flyers & Handbills",
      keyFeatures:
        "Large format A4 flyers with more space for your message and stunning visuals.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 18000,
      tax: 1440,
      images: ["/product-images/flyers-handbills/flyer-2.jpg"],
    },
    {
      name: "DL Flyers",
      slug: generateSlug("DL Flyers"),
      price: "₦8,000",
      unit: "per 1000",
      image: "/product-images/flyers-handbills/flyer-3.jpg",
      description: "Compact DL size flyers",
      category: "Flyers & Handbills",
      keyFeatures:
        "Compact DL flyers perfect for direct mail and hand distribution.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 8000,
      tax: 640,
      images: ["/product-images/flyers-handbills/flyer-3.jpg"],
    },
    {
      name: "Square Flyers",
      slug: generateSlug("Square Flyers"),
      price: "₦15,000",
      unit: "per 1000",
      image: "/product-images/flyers-handbills/flyer-4.jpeg",
      description: "Unique square format flyers",
      category: "Flyers & Handbills",
      keyFeatures:
        "Eye-catching square flyers that stand out from traditional rectangular formats.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 15000,
      tax: 1200,
      images: ["/product-images/flyers-handbills/flyer-4.jpeg"],
    },
    {
      name: "Double-Sided Flyers",
      slug: generateSlug("Double-Sided Flyers"),
      price: "₦20,000",
      unit: "per 1000",
      image: "/product-images/flyers-handbills/flyer-5.jpg",
      description: "Double-sided printed flyers",
      category: "Flyers & Handbills",
      keyFeatures:
        "Double-sided flyers with printing on both sides, maximizing your message space.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 20000,
      tax: 1600,
      images: [
        "/product-images/flyers-handbills/flyer-5.jpg",
        "/product-images/flyers-handbills/flyer-5-1.jpg",
        "/product-images/flyers-handbills/flyer-5-2.jpg",
      ],
    },
    {
      name: "Glossy Flyers",
      slug: generateSlug("Glossy Flyers"),
      price: "₦16,000",
      unit: "per 1000",
      image: "/product-images/flyers-handbills/flyer-6.jpg",
      description: "Premium glossy finish flyers",
      category: "Flyers & Handbills",
      keyFeatures:
        "Premium flyers with glossy finish that makes colors pop and images shine.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 16000,
      tax: 1280,
      images: [
        "/product-images/flyers-handbills/flyer-6.jpg",
        "/product-images/flyers-handbills/flyer-6-1.jpg",
      ],
    },
    {
      name: "Matte Flyers",
      slug: generateSlug("Matte Flyers"),
      price: "₦14,000",
      unit: "per 1000",
      image: "/product-images/flyers-handbills/flyer-7.jpg",
      description: "Elegant matte finish flyers",
      category: "Flyers & Handbills",
      keyFeatures:
        "Sophisticated matte finish flyers with a premium feel and reduced glare.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 14000,
      tax: 1120,
      images: ["/product-images/flyers-handbills/flyer-7.jpg"],
    },
    {
      name: "Folded Flyers",
      slug: generateSlug("Folded Flyers"),
      price: "₦22,000",
      unit: "per 1000",
      image: "/product-images/flyers-handbills/flyer-8.jpg",
      description: "Tri-fold and bi-fold flyers",
      category: "Flyers & Handbills",
      keyFeatures:
        "Folded flyers with multiple panels, perfect for detailed information and brochures.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 22000,
      tax: 1760,
      images: ["/product-images/flyers-handbills/flyer-8.jpg"],
    },
    {
      name: "Die-Cut Flyers",
      slug: generateSlug("Die-Cut Flyers"),
      price: "₦25,000",
      unit: "per 1000",
      image: "/product-images/flyers-handbills/flyer-9.jpg",
      description: "Custom shaped die-cut flyers",
      category: "Flyers & Handbills",
      keyFeatures:
        "Unique custom shaped flyers that grab attention and make your brand memorable.",
      delivery: {
        lagos: "5-7 Working Days for order within Lagos",
        others: "7-10 Working Days for Order from other state",
      },
      priceNumeric: 25000,
      tax: 2000,
      images: [
        "/product-images/flyers-handbills/flyer-9.jpg",
        "/product-images/flyers-handbills/flyer-9-1.jpg",
        "/product-images/flyers-handbills/flyer-9-2.jpg",
      ],
    },
    {
      name: "Perforated Flyers",
      slug: generateSlug("Perforated Flyers"),
      price: "₦18,000",
      unit: "per 1000",
      image: "/product-images/flyers-handbills/flyer-10.jpg",
      description: "Flyers with tear-off sections",
      category: "Flyers & Handbills",
      keyFeatures:
        "Flyers with perforated tear-off sections, perfect for coupons and contact information.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 18000,
      tax: 1440,
      images: ["/product-images/flyers-handbills/flyer-10.jpg"],
    },
    {
      name: "Waterproof Flyers",
      slug: generateSlug("Waterproof Flyers"),
      price: "₦28,000",
      unit: "per 1000",
      image: "/product-images/flyers-handbills/flyer-11.jpeg",
      description: "Weather-resistant waterproof flyers",
      category: "Flyers & Handbills",
      keyFeatures:
        "Waterproof flyers that withstand weather conditions, perfect for outdoor distribution.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 28000,
      tax: 2240,
      images: ["/product-images/flyers-handbills/flyer-11.jpeg"],
    },
    {
      name: "Handbills",
      slug: generateSlug("Handbills"),
      price: "₦10,000",
      unit: "per 1000",
      image: "/product-images/flyers-handbills/flyer.jpg",
      description: "Small format handbills",
      category: "Flyers & Handbills",
      keyFeatures:
        "Compact handbills perfect for quick distribution and announcements.",
      delivery: {
        lagos: "2-3 Working Days for order within Lagos",
        others: "4-5 Working Days for Order from other state",
      },
      priceNumeric: 10000,
      tax: 800,
      images: ["/product-images/flyers-handbills/flyer.jpg"],
    },
  ],

  "Office Stationery": [
    {
      name: "Letterhead (A4) - Branded",
      slug: generateSlug("Letterhead (A4) - Branded"),
      price: "₦6,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Custom branded A4 letterheads for official correspondence.",
      category: "Office Stationery",
      keyFeatures:
        "High-quality A4 letterheads with full-colour branding and sharp print quality.",
      delivery: {
        lagos: "2-4 Working Days for order within Lagos",
        others: "4-7 Working Days for Order from other state",
      },
      priceNumeric: 6000,
      tax: 480,
      images: ["/placeholder.svg?height=400&width=400"],
    },
  ],

  Invitations: [
    {
      name: "Acrylic Invite Card",
      slug: generateSlug("Acrylic Invite Card"),
      price: "₦35,000",
      unit: "per 50",
      image: "/placeholder.svg?height=200&width=200",
      description: "Premium acrylic invitation cards for weddings and events.",
      category: "Invitations",
      keyFeatures:
        "Durable acrylic invites with laser-cut finish and premium print quality.",
      delivery: {
        lagos: "5-7 Working Days for order within Lagos",
        others: "7-10 Working Days for Order from other state",
      },
      priceNumeric: 35000,
      tax: 2800,
      images: ["/placeholder.svg?height=400&width=400"],
    },
  ],
};

// Helper function to get all products as a flat array
export const getAllProducts = (): Product[] => {
  return Object.values(productsData).flat();
};

// Helper function to find a product by slug
export const getProductBySlug = (slug: string): Product | undefined => {
  const allProducts = getAllProducts();
  return allProducts.find((product) => product.slug === slug);
};

// Helper function to get products by category
export const getProductsByCategory = (category: string): Product[] => {
  return productsData[category as keyof typeof productsData] || [];
};

export const getPopularProducts = (): Product[] => {
  const allProducts = getAllProducts();
  return allProducts.filter((product) => product.popular === true);
};
