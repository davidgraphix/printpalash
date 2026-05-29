export interface Product {
  name: string;
  slug: string;
  image: string;
  description: string;
  category: string;
  keyFeatures: string;
  delivery: {
    lagos: string;
    others: string;
  };
  priceNumeric: number;
  tax: number;
  images: string[];
  popular?: boolean;
  rating?: number;
  reviewCount?: number;
}

// Shared product data that can be used across components
export const generateSlug = (name: string): string =>
  name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

export const productsData = {
  Bags: [
    {
      name: "A2 Paper Bag",
      slug: generateSlug("A2 Paper Bag"),
      image: "/product-images/bags/a2-paper-bag-2.png",
      description:
        "Premium A2 paper bags designed for luxury packaging, shopping, and corporate branding with durable finishing.",
      category: "Bags",
      keyFeatures:
        "Strong and spacious A2 paper bags suitable for retail packaging, gifting, and business promotions.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 120000,
      tax: 9600,
      images: [
        "/product-images/bags/a2-paper-bag-2.png",
        "/product-images/bags/a2-paper-bagee.png",
        "/product-images/bags/a2-paper-bag-3.png",
        "/product-images/bags/a2-paper-bag-4.png",
      ],
    },

    {
      name: "A3 Paper Bag",
      slug: generateSlug("A3 Paper Bag"),
      image: "/product-images/bags/a3-paper-bag.jpg",
      description:
        "High-quality A3 paper bags for premium packaging, shopping brands, and retail businesses.",
      category: "Bags",
      keyFeatures:
        "Durable A3 paper bags perfect for luxury packaging and corporate branding.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 100000,
      tax: 8000,
      images: [
        "/product-images/bags/a3-paper-bag.jpg",
        "/product-images/bags/a3-paper-bag-2.png",
        "/product-images/bags/a3-paper-bag-3.png",
      ],
    },

    {
      name: "A4 Paper Bag",
      slug: generateSlug("A4 Paper Bag"),
      image: "/product-images/bags/a4-paper-bag.jpg",
      description:
        "Custom A4 paper bags ideal for retail packaging, shopping, and brand visibility.",
      category: "Bags",
      keyFeatures:
        "Durable A4 paper bags with premium finishing for packaging and promotions.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 90000,
      tax: 7200,
      images: [
        "/product-images/bags/a4-paper-bag.jpg",
        "/product-images/bags/a4-paper-bag-2.jpg",
        "/product-images/bags/a4-paper-bag-3.jpg",
      ],
    },

    {
      name: "A5 Paper Bag",
      slug: generateSlug("A5 Paper Bag"),
      image: "/product-images/bags/a5-paper-bag.jpg",
      description:
        "Compact and stylish A5 paper bags suitable for lightweight packaging and gifting.",
      category: "Bags",
      keyFeatures:
        "Portable A5 paper bags perfect for events, boutiques, and promotional packaging.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 75000,
      tax: 6000,
      images: [
        "/product-images/bags/a5-paper-bag.jpg",
        "/product-images/bags/a5-paper-bag-2.jpg",
        "/product-images/bags/a5-paper-bag-3.jpg",
      ],
    },

    {
      name: "Courier Bag",
      slug: generateSlug("Courier Bag"),
      image: "/product-images/bags/courier-bag.png",
      description:
        "Strong and branded courier bags for delivery services, logistics, and ecommerce packaging.",
      category: "Bags",
      popular: true,
      keyFeatures:
        "Secure courier bags suitable for shipping, packaging, and product delivery.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 25500,
      tax: 2040,
      images: [
        "/product-images/bags/courier-bag.png",
        "/product-images/bags/courier-bag-2.png",
        "/product-images/bags/courier-bag-3.png",
      ],
    },

    {
      name: "Drawstring Bag",
      slug: generateSlug("Drawstring Bag"),
      image: "/product-images/bags/drawstring-bags.png",
      description:
        "Lightweight and branded drawstring bags perfect for events, schools, and giveaways.",
      category: "Bags",
      keyFeatures:
        "Comfortable drawstring bags ideal for promotions, branding, and everyday use.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 40000,
      tax: 3200,
      images: [
        "/product-images/bags/drawstring-bags.png",
        "/product-images/bags/drawstring-bags-2.png",
        "/product-images/bags/drawstring-bags-3.png",
        "/product-images/bags/drawstring-bags-4.png",
      ],
    },

    {
      name: "Fanny Waist Pack",
      slug: generateSlug("Fanny Waist Pack"),
      image: "/product-images/bags/fanny-waist-pack.png",
      description:
        "Modern and stylish waist packs designed for travel, fashion, and promotional branding.",
      category: "Bags",
      keyFeatures:
        "Comfortable waist packs with secure storage for casual and outdoor use.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 35000,
      tax: 2800,
      images: [
        "/product-images/bags/fanny-waist-pack.png",
        "/product-images/bags/fanny-waist-pack-2.jpg",
        "/product-images/bags/fanny-waist-pack-3.png",
      ],
    },

    {
      name: "Jute Bag",
      slug: generateSlug("Jute Bag"),
      image: "/product-images/bags/jute-bag.png",
      description:
        "Eco-friendly and reusable jute bags ideal for sustainable packaging and branding.",
      category: "Bags",
      keyFeatures:
        "Durable jute bags suitable for shopping, promotions, and corporate gifting.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 50000,
      tax: 4000,
      images: [
        "/product-images/bags/jute-bag.png",
        "/product-images/bags/jute-bag-2.png",
        "/product-images/bags/jute-bag-3.png",
      ],
    },

    {
      name: "Kraft Bag",
      slug: generateSlug("Kraft Bag"),
      image: "/product-images/bags/kraft-bag.png",
      description:
        "Strong kraft paper bags designed for eco-friendly packaging and premium branding.",
      category: "Bags",
      keyFeatures:
        "Stylish kraft bags suitable for retail packaging, gifting, and shopping.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 45000,
      tax: 3600,
      images: [
        "/product-images/bags/kraft-bag.png",
        "/product-images/bags/kraft-bag-2.png",
        "/product-images/bags/kraft-bag-3.jpeg",
        "/product-images/bags/kraft-bag-4.png",
      ],
    },

    {
      name: "Pillow Bags (A4)",
      slug: generateSlug("Pillow Bags (A4)"),
      image: "/product-images/bags/pillow-bags-a4.png",
      description:
        "Elegant pillow bags suitable for gift packaging, souvenirs, and premium product presentation.",
      category: "Bags",
      keyFeatures:
        "Luxury pillow bags with attractive finishing for stylish packaging solutions.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 60000,
      tax: 4800,
      images: [
        "/product-images/bags/pillow-bags-a4.png",
        "/product-images/bags/pillow-bags-a4-2.png",
      ],
    },

    {
      name: "Poly Bag",
      slug: generateSlug("Poly Bag"),
      image: "/product-images/bags/poly-bag.png",
      description:
        "Durable poly bags designed for packaging, storage, and everyday retail use.",
      category: "Bags",
      keyFeatures:
        "Strong transparent poly bags suitable for product packaging and protection.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 30000,
      tax: 2400,
      images: [
        "/product-images/bags/poly-bag.png",
        "/product-images/bags/poly-bag-2.png",
      ],
    },

    {
      name: "Singlet Nylon",
      slug: generateSlug("Singlet Nylon"),
      image: "/product-images/bags/singlet-nylon.png",
      description:
        "Affordable and durable shopping nylon bags for retail packaging and daily use.",
      category: "Bags",
      keyFeatures:
        "Strong nylon bags suitable for supermarkets, stores, and product packaging.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 20000,
      tax: 1600,
      images: [
        "/product-images/bags/singlet-nylon.png",
        "/product-images/bags/singlet-nylon-2.png",
        "/product-images/bags/singlet-nylon-3.png",
      ],
    },

    {
      name: "Sublimation Tote Bag",
      slug: generateSlug("Sublimation Tote Bag"),
      image: "/product-images/bags/sublimation-tote-bag.png",
      description:
        "Custom sublimation tote bags with vibrant full-color printing for branding and fashion.",
      category: "Bags",
      keyFeatures:
        "Perfect tote bags for custom artwork, promotions, and personalized branding.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 55000,
      tax: 4400,
      images: [
        "/product-images/bags/sublimation-tote-bag.png",
        "/product-images/bags/sublimation-tote-bag-2.png",
        "/product-images/bags/sublimation-tote-bag-3.png",
      ],
    },

    {
      name: "Tote Bag",
      slug: generateSlug("Tote Bag"),
      image: "/product-images/bags/tote-bag.png",
      description:
        "Stylish and reusable tote bags suitable for branding, shopping, and promotional campaigns.",
      category: "Bags",
      keyFeatures:
        "Durable tote bags perfect for everyday use, events, and corporate branding.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 45000,
      tax: 3600,
      images: [
        "/product-images/bags/tote-bag.png",
        "/product-images/bags/tote-bag-2.png",
        "/product-images/bags/tote-bag-3.png",
      ],
    },

    {
      name: "Wine Paper Bag",
      slug: generateSlug("Wine Paper Bag"),
      image: "/product-images/bags/wine-paper-bag.png",
      description:
        "Premium wine paper bags designed for gifting, packaging, and luxury presentation.",
      category: "Bags",
      keyFeatures:
        "Elegant wine bags with durable handles and premium finishing for special occasions.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 50000,
      tax: 4000,
      images: [
        "/product-images/bags/wine-paper-bag.png",
        "/product-images/bags/wine-paper-bag-2.png",
        "/product-images/bags/wine-paper-bag-3.png",
      ],
    },
  ],

  "Banners & Large Format": [
    {
      name: "Big Base Rollup",
      slug: generateSlug("Big Base Rollup"),
      image: "/product-images/banners&largeformat/big-base-rollup.jpeg",
      description:
        "Premium big base rollup banners designed for exhibitions, events, and business promotions.",
      category: "Banners & Large Format",
      keyFeatures:
        "Strong and portable rollup banners suitable for indoor displays and branding.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 35000,
      tax: 2800,
      images: [
        "/product-images/banners&largeformat/big-base-rollup.jpeg",
        "/product-images/banners&largeformat/big-base-rollup-2.jpeg",
        "/product-images/banners&largeformat/big-base-rollup-3.jpeg",
      ],
    },

    {
      name: "Dispatch Box",
      slug: generateSlug("Dispatch Box"),
      image: "/product-images/banners&largeformat/dispatch-boxes.png",
      description:
        "Durable dispatch boxes designed for secure packaging, shipping, and delivery services.",
      category: "Banners & Large Format",
      keyFeatures:
        "Strong dispatch boxes suitable for ecommerce, logistics, and product packaging.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 15000,
      tax: 1200,
      images: ["/product-images/banners&largeformat/dispatch-boxes.png"],
    },

    {
      name: "Dummy Cheque",
      slug: generateSlug("Dummy Cheque"),
      image: "/product-images/banners&largeformat/dummy-cheques.png",
      description:
        "Professional dummy cheques ideal for presentations, award ceremonies, and events.",
      category: "Banners & Large Format",
      keyFeatures:
        "Large presentation cheques with high-quality print and durable finishing.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 18000,
      tax: 1440,
      images: ["/product-images/banners&largeformat/dummy-cheques.png"],
    },

    {
      name: "Event Backdrop",
      slug: generateSlug("Event Backdrop"),
      image: "/product-images/banners&largeformat/event-backdrops.png",
      description:
        "Large-format event backdrops suitable for weddings, conferences, branding, and photo sessions.",
      category: "Banners & Large Format",
      keyFeatures:
        "Professional backdrop banners with vibrant print quality for events and ceremonies.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 45000,
      tax: 3600,
      images: [
        "/product-images/banners&largeformat/event-backdrops.png",
        "/product-images/banners&largeformat/event-backdrop-2.png",
        "/product-images/banners&largeformat/event-backdrop-3.png",
        "/product-images/banners&largeformat/event-backdrop-4.png",
      ],
    },

    {
      name: "Flag Banner",
      slug: generateSlug("Flag Banner"),
      image: "/product-images/banners&largeformat/flag-banner.png",
      description:
        "Custom flag banners for outdoor branding, advertising, and promotional events.",
      category: "Banners & Large Format",
      keyFeatures:
        "Eye-catching flag banners designed for maximum visibility and outdoor use.",
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
      image: "/product-images/banners&largeformat/gazebo-tent.png",
      description:
        "Custom branded gazebo tents ideal for outdoor events, exhibitions, and promotions.",
      category: "Banners & Large Format",
      keyFeatures:
        "Durable and spacious tents suitable for corporate branding and marketing campaigns.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 120000,
      tax: 9600,
      images: [
        "/product-images/banners&largeformat/gazebo-tent.png",
        "/product-images/banners&largeformat/gazebo-tent-2.png",
        "/product-images/banners&largeformat/gazebo-tent-3.png",
      ],
    },

    {
      name: "Instagram Frame Board",
      slug: generateSlug("Instagram Frame Board"),
      image: "/product-images/banners&largeformat/instagram-frame-board.png",
      description:
        "Custom Instagram frame boards perfect for social events, activations, and photo branding.",
      category: "Banners & Large Format",
      keyFeatures:
        "Fun and engaging frame boards designed for events and social media photos.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 22000,
      tax: 1760,
      images: [
        "/product-images/banners&largeformat/instagram-frame-board.png",
        "/product-images/banners&largeformat/instagram-frame-board-2.png",
      ],
    },
    {
      name: "Lampost Banner",
      slug: generateSlug("Lampost Banner"),
      image: "/product-images/banners&largeformat/lampost-banner.png",
      description:
        "High-visibility lamp post banners suitable for street advertising and outdoor promotions.",
      category: "Banners & Large Format",
      keyFeatures:
        "Durable vertical banners designed for outdoor campaigns and branding.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 30000,
      tax: 2400,
      images: [
        "/product-images/banners&largeformat/lampost-banner.png",
        "/product-images/banners&largeformat/lampost-banner-2.png",
      ],
    },

    {
      name: "Pop Stand Banner",
      slug: generateSlug("Pop Stand Banner"),
      image: "/product-images/banners&largeformat/pop-stand-banner.png",
      description:
        "Portable pop stand banners designed for exhibitions, trade shows, and promotions.",
      category: "Banners & Large Format",
      keyFeatures:
        "Lightweight display stands suitable for indoor branding and marketing.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 25000,
      tax: 2000,
      images: [
        "/product-images/banners&largeformat/pop-stand-banner.png",
        "/product-images/banners&largeformat/pop-stand-banner-2.png",
        "/product-images/banners&largeformat/pop-stand-banner-3.jpg",
        "/product-images/banners&largeformat/pop-stand-banner-4.jpg",
      ],
    },

    {
      name: "Small Base Rollup",
      slug: generateSlug("Small Base Rollup"),
      image: "/product-images/banners&largeformat/small-base-rollup.png",
      description:
        "Compact rollup banners suitable for indoor promotions, displays, and branding.",
      category: "Banners & Large Format",
      keyFeatures:
        "Portable rollup banner stands with premium print quality and durability.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 28000,
      tax: 2240,
      images: [
        "/product-images/banners&largeformat/small-base-rollup.png",
        "/product-images/banners&largeformat/small-base-rollup-2.png",
        "/product-images/banners&largeformat/small-base-rollup-3.png",
      ],
    },

    {
      name: "Snapper Frame",
      slug: generateSlug("Snapper Frame"),
      image: "/product-images/banners&largeformat/snapper-frame.png",
      description:
        "Professional snapper frames for displaying posters, adverts, and promotional materials.",
      category: "Banners & Large Format",
      keyFeatures:
        "Easy-to-use aluminium frames with durable and stylish finishing.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 35000,
      tax: 2800,
      images: [
        "/product-images/banners&largeformat/snapper-frame.png",
        "/product-images/banners&largeformat/snapper-frame-2.png",
        "/product-images/banners&largeformat/snapper-frame-3.png",
      ],
    },

    {
      name: "Sticker Print",
      slug: generateSlug("Sticker Print"),
      image: "/product-images/banners&largeformat/sticker-print.jpeg",
      description:
        "High-quality sticker printing for branding, packaging, labels, and promotions.",
      category: "Banners & Large Format",
      keyFeatures:
        "Durable custom stickers with vibrant colors and premium finishing.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 12000,
      tax: 960,
      images: [
        "/product-images/banners&largeformat/sticker-print.jpeg",
        "/product-images/banners&largeformat/sticker-print-2.jpeg",
      ],
    },

    {
      name: "Teardrop Banner",
      slug: generateSlug("Teardrop Banner"),
      image: "/product-images/banners&largeformat/teardrop-banner.png",
      description:
        "Eye-catching teardrop banners designed for outdoor promotions and events.",
      category: "Banners & Large Format",
      keyFeatures:
        "Durable outdoor banners suitable for branding, campaigns, and exhibitions.",
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
      image: "/product-images/banners&largeformat/vehicle-branding.png",
      description:
        "Professional vehicle branding services for business advertising and brand visibility.",
      category: "Banners & Large Format",
      keyFeatures:
        "High-quality vehicle wraps and graphics suitable for mobile advertising.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 85000,
      tax: 6800,
      images: [
        "/product-images/banners&largeformat/vehicle-branding.png",
        "/product-images/banners&largeformat/vehicle-branding-2.png",
        "/product-images/banners&largeformat/vehicle-branding-3.png",
      ],
    },

    {
      name: "X-Banner",
      slug: generateSlug("X-Banner"),
      image: "/product-images/banners&largeformat/x-banner.png",
      description:
        "Portable X-banners suitable for indoor advertising, exhibitions, and events.",
      category: "Banners & Large Format",
      keyFeatures:
        "Lightweight banner stands with vibrant print quality for business promotions.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 20000,
      tax: 1600,
      images: [
        "/product-images/banners&largeformat/x-banner.png",
        "/product-images/banners&largeformat/x-banner-2.png",
      ],
    },
  ],

  "Box & Packaging": [
    {
      name: "Drawer Box",
      slug: generateSlug("Drawer Box"),
      image: "/product-images/box&packaging/drawer-box.png",
      description:
        "Luxury drawer boxes designed for premium packaging, gifting, and product presentation.",
      category: "Box & Packaging",
      keyFeatures:
        "Elegant drawer boxes suitable for jewelry, accessories, and luxury packaging.",
      delivery: {
        lagos: "2-4 Working Days for order within Lagos",
        others: "4-7 Working Days for Order from other state",
      },
      priceNumeric: 3500,
      tax: 280,
      images: [
        "/product-images/box&packaging/drawer-box.png",
        "/product-images/box&packaging/drawer-box-2.png",
      ],
    },

    {
      name: "Food Pack",
      slug: generateSlug("Food Pack"),
      image: "/product-images/box&packaging/food-pack.png",
      description:
        "Food-grade packaging boxes suitable for takeaway meals, restaurants, and food delivery.",
      category: "Box & Packaging",
      keyFeatures:
        "Durable and hygienic food packs designed for safe food packaging and branding.",
      delivery: {
        lagos: "2-4 Working Days for order within Lagos",
        others: "4-7 Working Days for Order from other state",
      },
      priceNumeric: 250,
      tax: 20,
      images: [
        "/product-images/box&packaging/food-pack.png",
        "/product-images/box&packaging/food-pack-2.png",
        "/product-images/box&packaging/food-pack-3.png",
      ],
    },

    {
      name: "Magnetic Flip Pack",
      slug: generateSlug("Magnetic Flip Pack"),
      image: "/product-images/box&packaging/magnetic-flip-pack.png",
      description:
        "Premium magnetic flip boxes designed for luxury packaging and special gift presentation.",
      category: "Box & Packaging",
      keyFeatures:
        "Elegant magnetic closure boxes suitable for premium products and corporate gifts.",
      delivery: {
        lagos: "2-4 Working Days for order within Lagos",
        others: "4-7 Working Days for Order from other state",
      },
      priceNumeric: 5000,
      tax: 400,
      images: [
        "/product-images/box&packaging/magnetic-flip-pack.png",
        "/product-images/box&packaging/magnetic-flip-pack-2.png",
        "/product-images/box&packaging/magnetic-flip-pack-3.jpeg",
      ],
    },
    {
      name: "Mailer Box",
      slug: generateSlug("Mailer Box"),
      image: "/product-images/box&packaging/mailer-box-2.jpeg",
      description:
        "Strong corrugated mailer boxes suitable for ecommerce packaging and shipping.",
      category: "Box & Packaging",
      keyFeatures:
        "Durable mailer boxes designed for product protection, delivery, and branding.",
      delivery: {
        lagos: "2-4 Working Days for order within Lagos",
        others: "4-7 Working Days for Order from other state",
      },
      priceNumeric: 2500,
      tax: 200,
      images: [
        "/product-images/box&packaging/mailer-box-2.jpeg",
        "/product-images/box&packaging/mailer-box.jpeg",
        "/product-images/box&packaging/mailer-box-3.jpeg",
        "/product-images/box&packaging/mailer-box-4.jpeg",
      ],
    },

    {
      name: "Pizza Box",
      slug: generateSlug("Pizza Box"),
      image: "/product-images/box&packaging/pizza-box.jpeg",
      description:
        "Custom pizza boxes designed for restaurants, food delivery, and takeaway packaging.",
      category: "Box & Packaging",
      keyFeatures:
        "Food-safe pizza boxes with durable material for heat retention and branding.",
      delivery: {
        lagos: "2-4 Working Days for order within Lagos",
        others: "4-7 Working Days for Order from other state",
      },
      priceNumeric: 800,
      tax: 64,
      images: [
        "/product-images/box&packaging/pizza-box.jpeg",
        "/product-images/box&packaging/pizza-box-2.png",
        "/product-images/box&packaging/pizza-box-3.png",
      ],
    },
  ],

  Brochures: [
    {
      name: "A4 Landscape Brochure",
      slug: generateSlug("A4 Landscape Brochure"),
      image: "/product-images/brochures/a4-landscape-brochure.png",
      description:
        "Professional landscape brochures designed for marketing, branding, and business promotions.",
      category: "Brochures",
      popular: true,
      keyFeatures:
        "High-quality landscape brochures with vibrant colors and premium finishing.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 15000,
      tax: 1200,
      images: [
        "/product-images/brochures/a4-landscape-brochure.png",
        "/product-images/brochures/a4-landscape-brochure-2.png",
      ],
    },

    {
      name: "A4 Portrait Brochure",
      slug: generateSlug("A4 Portrait Brochure"),
      image: "/product-images/brochures/a4-portrait-brochure.png",
      description:
        "Clean and professional portrait brochures suitable for advertising and company profiles.",
      category: "Brochures",
      keyFeatures:
        "Premium portrait brochures with sharp print quality and elegant layout.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 12000,
      tax: 960,
      images: [
        "/product-images/brochures/a4-portrait-brochure.png",
        "/product-images/brochures/a4-portrait-brochure-2.png",
        "/product-images/brochures/a4-portrait-brochure-3.jpeg",
      ],
    },

    {
      name: "Funeral Brochure",
      slug: generateSlug("Funeral Brochure"),
      image: "/product-images/brochures/funeral-brochure-2.jpeg",
      description:
        "Elegant funeral brochures designed for memorial services and remembrance events.",
      category: "Brochures",
      keyFeatures:
        "Beautifully printed funeral brochures with respectful and premium finishing.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 16000,
      tax: 1280,
      images: [
        "/product-images/brochures/funeral-brochure-2.jpeg",
        "/product-images/brochures/funeral-brochure.jpeg",
        "/product-images/brochures/funeral-brochure-3.jpeg",
        "/product-images/brochures/funeral-brochure-4.png",
      ],
    },

    {
      name: "Tri-Fold Brochure",
      slug: generateSlug("Tri-Fold Brochure"),
      image: "/product-images/brochures/trifold.png",
      description:
        "Professional tri-fold brochures perfect for detailed marketing and business promotions.",
      category: "Brochures",
      keyFeatures:
        "Structured tri-fold brochures ideal for presenting products and services clearly.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 18000,
      tax: 1440,
      images: [
        "/product-images/brochures/trifold.png",
        "/product-images/brochures/trifold-2.png",
      ],
    },
  ],
  "Business Cards": [
    {
      name: "Thank You Business Card",
      slug: generateSlug("Thank You Business Card"),
      image: "/product-images/business-cards/thank-you-business-card.jpeg",
      description:
        "Elegant thank you business cards designed for customer appreciation and brand loyalty.",
      category: "Business Cards",
      popular: true,
      keyFeatures:
        "Premium thank you cards with professional finishing for businesses and events.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 15000,
      tax: 1200,
      images: ["/product-images/business-cards/thank-you-business-card.jpeg"],
    },

    {
      name: "Premium Business Card",
      slug: generateSlug("Premium Business Card"),
      image: "/product-images/business-cards/premium-business-card.png",
      description:
        "Luxury business cards designed for professionals, brands, and corporate identity.",
      category: "Business Cards",
      keyFeatures:
        "High-quality cardstock with premium finishing and sharp print details.",
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
      image: "/product-images/business-cards/top-quality-business-card.png",
      description:
        "Top-grade professional business cards created for lasting impressions and executive branding.",
      category: "Business Cards",
      keyFeatures:
        "Premium finishing with durable material and luxury print quality.",
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
      image: "/product-images/calendars/a2-multiple-page-wall-calendar.png",
      description:
        "Large A2 multiple-page wall calendars suitable for advertising, branding, and office use.",
      category: "Calendars",
      keyFeatures:
        "Premium wall calendars with durable finishing and vibrant print quality.",
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
      image: "/product-images/calendars/a2-single-page-wall-calendar.png",
      description:
        "Oversized A2 single-page wall calendars designed for visibility and brand promotion.",
      category: "Calendars",
      keyFeatures:
        "Large-format calendars ideal for offices, businesses, and marketing campaigns.",
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
      image: "/product-images/calendars/a3-multiple-page-wall-calendar.png",
      description:
        "Professional A3 wall calendars with multiple pages for branding and daily planning.",
      category: "Calendars",
      keyFeatures:
        "Durable calendars with premium print quality suitable for offices and promotions.",
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
      image: "/product-images/calendars/a3-single-page-wall-calendar.png",
      description:
        "Large A3 single-page wall calendars suitable for business visibility and promotions.",
      category: "Calendars",
      keyFeatures:
        "Premium wall calendars with clear layout and vibrant printing.",
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
      image: "/product-images/calendars/table-calendar.jpeg",
      description:
        "Compact desk calendars designed for offices, workspaces, and corporate branding.",
      category: "Calendars",
      popular: true,
      keyFeatures:
        "Professional table calendars suitable for planning, promotions, and daily use.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 8000,
      tax: 640,
      images: ["/product-images/calendars/table-calendar.jpeg"],
    },
  ],

  "Campaign Materials": [
    {
      name: "A2-A3 Political Campaign Poster",
      slug: generateSlug("A2-A3 Political Campaign Poster"),
      image:
        "/product-images/campaign-materials/a2-a3-political-campaign-poster.png",
      description:
        "Large-format political campaign posters designed for rallies, awareness campaigns, and outdoor promotions.",
      category: "Campaign Materials",
      popular: true,
      keyFeatures:
        "High-quality campaign posters with vibrant printing for maximum visibility and engagement.",
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
      image: "/product-images/campaign-materials/a5-flyer.png",
      description:
        "Professional A5 flyers suitable for campaign promotions, handouts, and event advertising.",
      category: "Campaign Materials",
      keyFeatures:
        "Premium printed flyers with sharp colors and durable paper quality for effective marketing.",
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
      image:
        "/product-images/campaign-materials/political-campaign-banners.png",
      description:
        "Durable campaign banners designed for rallies, outdoor advertising, and political promotions.",
      category: "Campaign Materials",
      keyFeatures:
        "Weather-resistant banners with high-resolution printing for maximum outdoor visibility.",
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
      image: "/product-images/campaign-materials/political-campaign-caps.png",
      description:
        "Custom branded campaign caps suitable for rallies, supporters, and political awareness campaigns.",
      category: "Campaign Materials",
      keyFeatures:
        "Comfortable and stylish campaign caps designed for branding and outdoor use.",
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
      image:
        "/product-images/campaign-materials/political-campaign-t-shirt.png",
      description:
        "Custom campaign t-shirts designed for political branding, rallies, and supporter engagement.",
      category: "Campaign Materials",
      keyFeatures:
        "High-quality branded t-shirts with comfortable fabric and durable print finishing.",
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
      image: "/product-images/caps&hats/baseball-cap.png",
      description:
        "Classic baseball caps designed for branding, casual wear, and promotional events.",
      category: "Caps & Hats",
      popular: true,
      keyFeatures:
        "Premium baseball caps with adjustable fitting and durable embroidery options.",
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
      image: "/product-images/caps&hats/beanie.png",
      description:
        "Warm and stylish beanies suitable for fashion brands, outdoor use, and casual wear.",
      category: "Caps & Hats",
      keyFeatures:
        "Comfortable knitted beanies with premium finishing and branding options.",
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
      image: "/product-images/caps&hats/snapback-cap.png",
      description:
        "Modern snapback caps designed for streetwear fashion, branding, and promotional campaigns.",
      category: "Caps & Hats",
      keyFeatures:
        "Flat-brim snapback caps with adjustable closure and premium embroidery finish.",
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
      image: "/product-images/caps&hats/trucker-cap.png",
      description:
        "Breathable trucker caps suitable for outdoor activities, branding, and casual fashion.",
      category: "Caps & Hats",
      keyFeatures:
        "Mesh-back trucker caps designed for comfort, airflow, and durable everyday use.",
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
      image: "/product-images/caps&hats/custom-bucket-hat.png",
      description:
        "Stylish custom bucket hats designed for branding, fashion, and outdoor events.",
      category: "Caps & Hats",
      keyFeatures:
        "Premium bucket hats with comfortable fit and durable custom printing options.",
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
      image: "/product-images/clothing-apparel/printivo-merch.png",
      description:
        "Premium branded merch apparel suitable for businesses, events, and promotional campaigns.",
      category: "Clothing & Apparel",
      popular: true,
      keyFeatures:
        "High-quality custom merch with durable fabric and professional branding finish.",
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
      image: "/product-images/clothing-apparel/apron.png",
      description:
        "Custom branded aprons designed for restaurants, salons, catering, and professional services.",
      category: "Clothing & Apparel",
      keyFeatures:
        "Durable aprons with quality fabric suitable for workwear and promotional branding.",
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
      image: "/product-images/clothing-apparel/face-towel.png",
      description:
        "Soft branded face towels suitable for hotels, gyms, spas, and promotional branding.",
      category: "Clothing & Apparel",
      keyFeatures:
        "Absorbent face towels with premium material and long-lasting print quality.",
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
      image: "/product-images/clothing-apparel/folded-round-neck.png",
      description:
        "Comfortable round neck shirts suitable for casual wear, branding, and promotional use.",
      category: "Clothing & Apparel",
      keyFeatures:
        "Premium cotton round neck shirts with quality stitching and custom branding options.",
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
      image: "/product-images/clothing-apparel/hoodie.png",
      description:
        "Custom hoodies designed for fashion brands, casual wear, and corporate merchandising.",
      category: "Clothing & Apparel",
      keyFeatures:
        "Warm and stylish hoodies with premium fabric and durable print finishing.",
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
      image: "/product-images/clothing-apparel/round-neck-polo.png",
      description:
        "Professional polo shirts suitable for corporate branding, uniforms, and events.",
      category: "Clothing & Apparel",
      keyFeatures:
        "Premium polo shirts with comfortable fabric and high-quality embroidery options.",
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
      image: "/product-images/clothing-apparel/safety-jacket.png",
      description:
        "Reflective safety jackets designed for construction, industrial, and outdoor work environments.",
      category: "Clothing & Apparel",
      keyFeatures:
        "High-visibility safety jackets with reflective material for improved workplace safety.",
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
      image: "/product-images/clothing-apparel/sweatshirt.png",
      description:
        "Comfortable sweatshirts suitable for casual fashion, branding, and corporate merchandise.",
      category: "Clothing & Apparel",
      keyFeatures:
        "Premium sweatshirts with soft fabric and long-lasting custom print quality.",
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
      image: "/product-images/clothing-apparel/versity-jacket.png",
      description:
        "Stylish varsity jackets designed for fashion brands, schools, and corporate wear.",
      category: "Clothing & Apparel",
      keyFeatures:
        "Premium varsity jackets with durable fabric and modern custom branding finish.",
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
      image: "/product-images/clothestag/cloth-paper-tag.png",
      description:
        "Premium paper clothing tags designed for fashion branding and product presentation.",
      category: "ClothesTag",
      keyFeatures:
        "Durable paper tags suitable for fashion brands, retail stores, and clothing labels.",
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
      image: "/product-images/clothestag/woven-label.jpeg",
      description:
        "Custom woven labels suitable for fashion brands, garments, and premium clothing lines.",
      category: "ClothesTag",
      keyFeatures:
        "Durable woven labels with professional stitching and long-lasting finishing.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 10000,
      tax: 800,
      images: ["/product-images/clothestag/woven-label.jpeg"],
    },

    {
      name: "Custom Clothing Labels",
      slug: generateSlug("Custom Clothing Labels"),
      image: "/product-images/clothestag/custom-clothing-labels.jpeg",
      description:
        "Personalized clothing labels designed for fashion branding and garment identification.",
      category: "ClothesTag",
      keyFeatures:
        "High-quality custom labels suitable for all clothing categories and fashion brands.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 12000,
      tax: 960,
      images: ["/product-images/clothestag/custom-clothing-labels.jpeg"],
    },

    {
      name: "Convincing Sweatshirt Labels",
      slug: generateSlug("Convincing Sweatshirt Labels"),
      image: "/product-images/clothestag/convincing-sweatshirt-labels.jpeg",
      description:
        "Premium sweatshirt labels designed for fashion brands and custom apparel collections.",
      category: "ClothesTag",
      keyFeatures:
        "Durable sweatshirt labels with premium finishing and stylish branding appearance.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 9500,
      tax: 760,
      images: ["/product-images/clothestag/convincing-sweatshirt-labels.jpeg"],
    },
  ],

  Envelopes: [
    {
      name: "C4 Envelope",
      slug: generateSlug("C4 Envelope"),
      image: "/product-images/envelopes/c4-envelope.jpeg",
      description:
        "Professional C4 envelopes suitable for official documents, office use, and corporate branding.",
      category: "Envelopes",
      keyFeatures:
        "High-quality envelopes with durable paper finish for secure document packaging.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 5000,
      tax: 400,
      images: ["/product-images/envelopes/c4-envelope.jpeg"],
    },

    {
      name: "DL Small Envelope",
      slug: generateSlug("DL Small Envelope"),
      image: "/product-images/envelopes/dl-small-envelope.jpeg",
      description:
        "Compact DL envelopes suitable for invoices, letters, receipts, and business correspondence.",
      category: "Envelopes",
      keyFeatures:
        "Professional DL envelopes with clean finishing and secure document protection.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 4500,
      tax: 360,
      images: ["/product-images/envelopes/dl-small-envelope.jpeg"],
    },

    {
      name: "Window Envelope",
      slug: generateSlug("Window Envelope"),
      image: "/product-images/envelopes/window-envelope.jpeg",
      description:
        "Professional window envelopes designed for invoices, billing statements, and office mailing.",
      category: "Envelopes",
      keyFeatures:
        "Premium envelopes with transparent display window for organized document presentation.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 6000,
      tax: 480,
      images: ["/product-images/envelopes/window-envelope.jpeg"],
    },
  ],

  "Events & Souvenirs": [
    {
      name: "Big Magic Mug",
      slug: generateSlug("Big Magic Mug"),
      image: "/product-images/events&souvenirs/big-magic-mug.png",
      description:
        "Large heat-sensitive magic mugs that reveal custom designs when hot liquid is added. Perfect for gifts, souvenirs, branding, and promotional campaigns.",
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
      image: "/product-images/events&souvenirs/big-white-mug.jpeg",
      description:
        "Large premium white mugs suitable for custom printing, branding, corporate gifts, and everyday use.",
      category: "Events & Souvenirs",
      keyFeatures: "Premium white mugs suitable for branding and gifting.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 5000,
      tax: 400,
      images: ["/product-images/events&souvenirs/big-white-mug.jpeg"],
    },

    {
      name: "Dummy Cheque",
      slug: generateSlug("Dummy Cheque"),
      image: "/product-images/events&souvenirs/dummy-cheque.jpeg",
      description:
        "Large customized presentation cheques ideal for award ceremonies, donations, contests, corporate events, and media presentations.",
      category: "Events & Souvenirs",
      keyFeatures:
        "Large presentation cheques perfect for events and award ceremonies.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 15000,
      tax: 1200,
      images: ["/product-images/events&souvenirs/dummy-cheque.jpeg"],
    },

    {
      name: "Dummy Currency Note",
      slug: generateSlug("Dummy Currency Note"),
      image: "/product-images/events&souvenirs/dummy-currency-note.png",
      description:
        "Custom oversized currency notes designed for presentations, surprise gifts, promotional events, and social celebrations.",
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
      image: "/product-images/events&souvenirs/a5-notebook.jpeg",
      description:
        "Premium A5 notebooks suitable for office use, conferences, training programs, branding, and promotional events.",
      category: "Events & Souvenirs",
      keyFeatures: "Durable A5 notepads suitable for offices and branding.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 4500,
      tax: 360,
      images: ["/product-images/events&souvenirs/a5-notebook.jpeg"],
    },

    {
      name: "Engraved Notebook",
      slug: generateSlug("Engraved Notebook"),
      image: "/product-images/events&souvenirs/engraved-notebook.jpeg",
      description:
        "Stylish engraved notebooks with premium finishing, ideal for executive branding, gifting, conferences, and corporate events.",
      category: "Events & Souvenirs",
      keyFeatures:
        "Durable engraved notepads suitable for offices and branding.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 4500,
      tax: 360,
      images: ["/product-images/events&souvenirs/engraved-notebook.jpeg"],
    },

    {
      name: "Corporate Notebook",
      slug: generateSlug("Corporate Notebook"),
      image: "/product-images/events&souvenirs/corporate-notebook.jpeg",
      description:
        "Professional corporate notebooks designed for meetings, seminars, office branding, and executive use.",
      category: "Events & Souvenirs",
      keyFeatures:
        "Durable corporate notepads suitable for offices and branding.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 4500,
      tax: 360,
      images: ["/product-images/events&souvenirs/corporate-notebook.jpeg"],
    },

    {
      name: "Metallic Keyring",
      slug: generateSlug("Metallic Keyring"),
      image: "/product-images/events&souvenirs/metallic-keyring.jpeg",
      description:
        "Premium metallic keyrings with custom branding options suitable for souvenirs, corporate gifts, and promotional campaigns.",
      category: "Events & Souvenirs",
      keyFeatures:
        "Durable metallic keyrings suitable for branding and souvenirs.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 2500,
      tax: 200,
      images: ["/product-images/events&souvenirs/metallic-keyring.jpeg"],
    },

    {
      name: "Party Event Handband",
      slug: generateSlug("Party Event Handband"),
      image: "/product-images/events&souvenirs/party-event-handband.jpeg",
      description:
        "Custom event handbands ideal for parties, concerts, access control, festivals, and special events.",
      category: "Events & Souvenirs",
      keyFeatures:
        "Comfortable event handbands suitable for parties and access control.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 1500,
      tax: 120,
      images: ["/product-images/events&souvenirs/party-event-handband.jpeg"],
    },

    {
      name: "Party Paper Cup",
      slug: generateSlug("Party Paper Cup"),
      image: "/product-images/events&souvenirs/party-paper-cup.jpeg",
      description:
        "Custom printed disposable paper cups suitable for parties, birthdays, weddings, and branded events.",
      category: "Events & Souvenirs",
      keyFeatures:
        "Disposable paper cups suitable for events and celebrations.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 3000,
      tax: 240,
      images: ["/product-images/events&souvenirs/party-paper-cup.jpeg"],
    },

    {
      name: "Pop Socket",
      slug: generateSlug("Pop Socket"),
      image: "/product-images/events&souvenirs/pop-socket.jpeg",
      description:
        "Custom phone pop sockets that provide better grip and support while adding stylish branding to mobile devices.",
      category: "Events & Souvenirs",
      keyFeatures: "Stylish phone grips suitable for branding and daily use.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 2000,
      tax: 160,
      images: ["/product-images/events&souvenirs/pop-socket.jpeg"],
    },

    {
      name: "Small Magic Mug",
      slug: generateSlug("Small Magic Mug"),
      image: "/product-images/events&souvenirs/small-magic-mug.jpeg",
      description:
        "Compact heat-sensitive mugs that reveal custom prints when filled with hot drinks, suitable for gifts and promotions.",
      category: "Events & Souvenirs",
      keyFeatures: "Custom heat-changing mugs suitable for gifts and branding.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 5500,
      tax: 440,
      images: ["/product-images/events&souvenirs/small-magic-mug.jpeg"],
    },

    {
      name: "Small White Mug",
      slug: generateSlug("Small White Mug"),
      image: "/product-images/events&souvenirs/small-white-mug.jpeg",
      description:
        "Compact white mugs perfect for custom branding, promotional giveaways, gifts, and everyday beverage use.",
      category: "Events & Souvenirs",
      keyFeatures: "Compact white mugs suitable for gifts and branding.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 4000,
      tax: 320,
      images: ["/product-images/events&souvenirs/small-white-mug.jpeg"],
    },

    {
      name: "Throwpillow",
      slug: generateSlug("Throwpillow"),
      image: "/product-images/events&souvenirs/throwpillow.jpg",
      description:
        "Soft decorative throw pillows with custom printing suitable for interior décor, gifts, and personalized branding.",
      category: "Events & Souvenirs",
      keyFeatures:
        "Soft decorative throw pillows suitable for gifts and interior décor.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 7500,
      tax: 600,
      images: ["/product-images/events&souvenirs/throwpillow.jpg"],
    },

    {
      name: "Compact Umbrella",
      slug: generateSlug("Compact Umbrella"),
      image: "/product-images/events&souvenirs/compact-umbrella.jpg",
      description:
        "Portable branded umbrellas designed for convenience, outdoor protection, promotional campaigns, and corporate branding.",
      category: "Events & Souvenirs",
      keyFeatures:
        "Durable umbrellas suitable for promotional branding and outdoor use.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 8500,
      tax: 680,
      images: ["/product-images/events&souvenirs/compact-umbrella.jpg"],
    },

    {
      name: "Universal Umbrella",
      slug: generateSlug("Universal Umbrella"),
      image: "/product-images/events&souvenirs/universal-umbrella.png",
      description:
        "Durable custom umbrellas suitable for promotional branding, outdoor activities, corporate events, and giveaways.",
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
      image: "/product-images/events&souvenirs/wooden-keyring.jpeg",
      description:
        "Eco-friendly wooden keyrings with customizable designs suitable for souvenirs, branding, and promotional gifts.",
      category: "Events & Souvenirs",
      keyFeatures:
        "Eco-friendly wooden keyrings suitable for souvenirs and branding.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 2000,
      tax: 160,
      images: ["/product-images/events&souvenirs/wooden-keyring.jpeg"],
    },
  ],
  "Event Tag": [
    {
      name: "Event Tag",
      slug: generateSlug("Event Tag"),
      image: "/product-images/event-tag/event-tag.jpeg",
      description:
        "Custom event identification tags suitable for conferences, parties, seminars, concerts, and access control management.",
      category: "Event Tag",
      keyFeatures:
        "High-quality custom event tags suitable for conferences, parties, and access control.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 3500,
      tax: 280,
      images: ["/product-images/event-tag/event-tag.jpeg"],
    },
  ],

  "Flyers & Posters": [
    {
      name: "A1 Posters",
      slug: generateSlug("A1 Posters"),
      image: "/product-images/flyers-posters/a1-posters.jpg",
      description:
        "Large format A1 posters with vibrant full-color printing suitable for advertising, promotions, campaigns, and events.",
      category: "Flyers & Posters",
      keyFeatures:
        "High-quality A1 posters perfect for advertising, events, and promotions.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 25000,
      tax: 2000,
      images: ["/product-images/flyers-posters/a1-posters.jpg"],
    },

    {
      name: "A2 Posters",
      slug: generateSlug("A2 Posters"),
      image: "/product-images/flyers-posters/a2-posters.jpg",
      description:
        "Professional A2 posters designed for campaigns, indoor promotions, events, and business advertisements.",
      category: "Flyers & Posters",
      keyFeatures:
        "Premium A2 posters with vibrant printing for campaigns and promotions.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 20000,
      tax: 1600,
      images: ["/product-images/flyers-posters/a2-posters.jpg"],
    },

    {
      name: "A3 Posters",
      slug: generateSlug("A3 Posters"),
      image: "/product-images/flyers-posters/a3-posters.webp",
      description:
        "Compact A3 posters with sharp and colorful printing suitable for indoor advertising, events, and product promotions.",
      category: "Flyers & Posters",
      keyFeatures:
        "Sharp and colorful A3 posters suitable for indoor promotions.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 15000,
      tax: 1200,
      images: ["/product-images/flyers-posters/a3-posters.webp"],
    },

    {
      name: "A5 Flyer",
      slug: generateSlug("A5 Flyer"),
      image: "/product-images/flyers-posters/a5-flyers.png",
      description:
        "Premium A5 flyers suitable for promotions, business advertising, campaigns, church programs, and event handouts.",
      category: "Flyers & Posters",
      keyFeatures:
        "High-quality A5 flyers perfect for promotions, campaigns, and events.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 12000,
      tax: 960,
      images: ["/product-images/flyers-posters/a5-flyers.png"],
    },

    {
      name: "A6 Flyer",
      slug: generateSlug("A6 Flyer"),
      image: "/product-images/flyers-posters/a6-flyer.jpeg",
      description:
        "Compact A6 flyers ideal for promotional handouts, invitations, mini adverts, and quick marketing campaigns.",
      category: "Flyers & Posters",
      keyFeatures:
        "Portable A6 flyers ideal for handouts and quick promotions.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 10000,
      tax: 800,
      images: ["/product-images/flyers-posters/a6-flyer.jpeg"],
    },

    {
      name: "DL Bifold Flyer",
      slug: generateSlug("DL Bifold Flyer"),
      image: "/product-images/flyers-posters/dl-bifold-flyer.jpeg",
      description:
        "Professional DL bifold flyers with extra space for menus, business information, promotions, and marketing campaigns.",
      category: "Flyers & Posters",
      keyFeatures:
        "Professional DL bifold flyers with extra space for detailed information.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 16000,
      tax: 1280,
      images: ["/product-images/flyers-posters/dl-bifold-flyer.jpeg"],
    },

    {
      name: "DL Flyer",
      slug: generateSlug("DL Flyer"),
      image: "/product-images/flyers-posters/dl-flyer.jpeg",
      description:
        "Compact DL flyers suitable for direct marketing, promotional campaigns, invitations, and event advertising.",
      category: "Flyers & Posters",
      keyFeatures:
        "DL flyers perfect for direct marketing and event promotions.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 8000,
      tax: 640,
      images: ["/product-images/flyers-posters/dl-flyer.jpeg"],
    },

    {
      name: "DL Trifold Flyer",
      slug: generateSlug("DL Trifold Flyer"),
      image: "/product-images/flyers-posters/dl-trifold-flyer.jpeg",
      description:
        "Elegant DL trifold flyers with multiple panels suitable for brochures, menus, corporate promotions, and marketing materials.",
      category: "Flyers & Posters",
      keyFeatures:
        "Elegant DL trifold flyers with multiple panels for marketing content.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 18000,
      tax: 1440,
      images: ["/product-images/flyers-posters/dl-trifold-flyer.jpeg"],
    },
  ],
  Invitations: [
    {
      name: "Acrylic Invitation",
      slug: generateSlug("Acrylic Invitation"),
      image: "/product-images/invitations/acrylic-invitation.jpeg",
      description:
        "Premium acrylic invitation cards with elegant transparent finishing suitable for weddings, birthdays, luxury events, and corporate ceremonies.",
      category: "Invitations",
      keyFeatures:
        "Luxury acrylic invitation cards with premium transparent finish and elegant print quality.",
      delivery: {
        lagos: "5-7 Working Days for order within Lagos",
        others: "7-10 Working Days for Order from other state",
      },
      priceNumeric: 35000,
      tax: 2800,
      images: ["/product-images/invitations/acrylic-invitation.jpeg"],
    },

    {
      name: "Card Invitation",
      slug: generateSlug("Card Invitation"),
      image: "/product-images/invitations/card-invitation.jpeg",
      description:
        "Classic printed invitation cards suitable for weddings, birthdays, naming ceremonies, parties, and special events.",
      category: "Invitations",
      keyFeatures:
        "Elegant printed invitation cards suitable for weddings, birthdays, and events.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 20000,
      tax: 1600,
      images: ["/product-images/invitations/card-invitation.jpeg"],
    },

    {
      name: "Wedding Program",
      slug: generateSlug("Wedding Program"),
      image: "/product-images/invitations/wedding-program.jpeg",
      description:
        "Beautifully designed wedding program booklets suitable for church weddings, receptions, engagement ceremonies, and special occasions.",
      category: "Invitations",
      keyFeatures:
        "Beautifully designed wedding programs with premium print finish for ceremonies and receptions.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 18000,
      tax: 1440,
      images: ["/product-images/invitations/wedding-program.jpeg"],
    },
  ],

  "Office Stationery": [
    {
      name: "Block Pad",
      slug: generateSlug("Block Pad"),
      image: "/product-images/office-stationery/block-pad.png",
      description:
        "Custom branded block pads suitable for office notes, meetings, schools, conferences, and business branding.",
      category: "Office Stationery",
      keyFeatures:
        "High-quality block pads perfect for office notes, meetings, and branding.",
      delivery: {
        lagos: "2-4 Working Days for order within Lagos",
        others: "4-7 Working Days for Order from other state",
      },
      priceNumeric: 5000,
      tax: 400,
      images: ["/product-images/office-stationery/block-pad.png"],
    },

    {
      name: "Computer Mouse",
      slug: generateSlug("Computer Mouse"),
      image: "/product-images/office-stationery/computer-mouse.png",
      description:
        "Smooth and responsive computer mouse suitable for office work, gaming, personal use, and corporate branding.",
      category: "Office Stationery",
      keyFeatures:
        "Smooth and responsive computer mouse suitable for office and personal use.",
      delivery: {
        lagos: "2-4 Working Days for order within Lagos",
        others: "4-7 Working Days for Order from other state",
      },
      priceNumeric: 8000,
      tax: 640,
      images: ["/product-images/office-stationery/computer-mouse.png"],
    },

    {
      name: "Custom Lanyard",
      slug: generateSlug("Custom Lanyard"),
      image: "/product-images/office-stationery/custom-lanyard.jpg",
      description:
        "Durable custom lanyards suitable for ID cards, conferences, schools, offices, and corporate events.",
      category: "Office Stationery",
      keyFeatures:
        "Durable custom lanyards ideal for ID cards, events, and office branding.",
      delivery: {
        lagos: "2-4 Working Days for order within Lagos",
        others: "4-7 Working Days for Order from other state",
      },
      priceNumeric: 3500,
      tax: 280,
      images: ["/product-images/office-stationery/custom-lanyard.jpg"],
    },

    {
      name: "File Presentation Folder",
      slug: generateSlug("File Presentation Folder"),
      image: "/product-images/office-stationery/file-presentation-folder.jpeg",
      description:
        "Professional presentation folders suitable for proposals, office documents, reports, and corporate branding.",
      category: "Office Stationery",
      keyFeatures:
        "Custom printed presentation folders for documents, proposals, and branding.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 12000,
      tax: 960,
      images: [
        "/product-images/office-stationery/file-presentation-folder.jpeg",
      ],
    },

    {
      name: "ID Card",
      slug: generateSlug("ID Card"),
      image: "/product-images/office-stationery/id-card.jpg",
      description:
        "Durable PVC ID cards suitable for staff identification, schools, offices, events, and organizations.",
      category: "Office Stationery",
      keyFeatures:
        "Durable PVC ID cards with sharp print quality for staff and events.",
      delivery: {
        lagos: "2-4 Working Days for order within Lagos",
        others: "4-7 Working Days for Order from other state",
      },
      priceNumeric: 2500,
      tax: 200,
      images: ["/product-images/office-stationery/id-card.jpg"],
    },

    {
      name: "Invoice Receipt",
      slug: generateSlug("Invoice Receipt"),
      image: "/product-images/office-stationery/invoice-receipt.jpeg",
      description:
        "Professionally printed invoice and receipt booklets suitable for businesses, stores, offices, and financial record keeping.",
      category: "Office Stationery",
      keyFeatures:
        "Professionally printed invoice and receipt booklets for businesses.",
      delivery: {
        lagos: "2-4 Working Days for order within Lagos",
        others: "4-7 Working Days for Order from other state",
      },
      priceNumeric: 6500,
      tax: 520,
      images: ["/product-images/office-stationery/invoice-receipt.jpeg"],
    },

    {
      name: "Letterheads",
      slug: generateSlug("Letterheads"),
      image: "/product-images/office-stationery/letterheads.png",
      description:
        "Premium branded letterheads suitable for official correspondence, corporate communication, and business documentation.",
      category: "Office Stationery",
      keyFeatures:
        "Premium branded letterheads for official business correspondence.",
      delivery: {
        lagos: "2-4 Working Days for order within Lagos",
        others: "4-7 Working Days for Order from other state",
      },
      priceNumeric: 6000,
      tax: 480,
      images: ["/product-images/office-stationery/letterheads.png"],
    },

    {
      name: "Metallic Pen",
      slug: generateSlug("Metallic Pen"),
      image: "/product-images/office-stationery/metallic-pen.jpeg",
      description:
        "Elegant metallic pens suitable for corporate branding, office use, conferences, and promotional giveaways.",
      category: "Office Stationery",
      keyFeatures:
        "Elegant metallic pens suitable for corporate branding and gifts.",
      delivery: {
        lagos: "2-4 Working Days for order within Lagos",
        others: "4-7 Working Days for Order from other state",
      },
      priceNumeric: 4000,
      tax: 320,
      images: ["/product-images/office-stationery/metallic-pen.jpeg"],
    },

    {
      name: "Mousepad",
      slug: generateSlug("Mousepad"),
      image: "/product-images/office-stationery/mousepad.png",
      description:
        "Custom printed mousepads with smooth surface suitable for offices, gaming setups, and promotional branding.",
      category: "Office Stationery",
      keyFeatures:
        "Smooth surface mousepads with custom branding and vibrant print quality.",
      delivery: {
        lagos: "2-4 Working Days for order within Lagos",
        others: "4-7 Working Days for Order from other state",
      },
      priceNumeric: 3000,
      tax: 240,
      images: ["/product-images/office-stationery/mousepad.png"],
    },

    {
      name: "Plastic Pen",
      slug: generateSlug("Plastic Pen"),
      image: "/product-images/office-stationery/plastic-pen.jpeg",
      description:
        "Affordable plastic pens suitable for office use, school activities, promotions, branding, and giveaways.",
      category: "Office Stationery",
      keyFeatures:
        "Affordable plastic pens ideal for promotions, branding, and giveaways.",
      delivery: {
        lagos: "2-4 Working Days for order within Lagos",
        others: "4-7 Working Days for Order from other state",
      },
      priceNumeric: 2500,
      tax: 200,
      images: ["/product-images/office-stationery/plastic-pen.jpeg"],
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
