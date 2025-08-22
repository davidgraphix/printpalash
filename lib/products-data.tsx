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
  "Business Cards": [
    {
      name: "Standard Business Cards",
      slug: generateSlug("Standard Business Cards"),
      price: "₦15,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Premium quality standard business cards",
      category: "Business Cards",
      popular: true,
      // Additional details for product page
      keyFeatures:
        "Printed on high-quality cardstock with vibrant colors and sharp details, available in various finishes to suit your style.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 15000,
      tax: 1200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Premium Business Cards",
      slug: generateSlug("Premium Business Cards"),
      price: "₦25,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Luxury finish business cards with special coating",
      category: "Business Cards",
      keyFeatures:
        "Premium cardstock with special coating, embossed finish, and luxury feel that makes a lasting impression.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 25000,
      tax: 2000,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Embossed Business Cards",
      slug: generateSlug("Embossed Business Cards"),
      price: "₦35,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Raised text business cards for premium feel",
      category: "Business Cards",
      popular: true,
      keyFeatures:
        "Raised text and designs create a tactile experience that sets your cards apart from the competition.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 35000,
      tax: 2800,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Foil Stamped Business Cards",
      slug: generateSlug("Foil Stamped Business Cards"),
      price: "₦40,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Gold/Silver foil stamped business cards",
      category: "Business Cards",
      keyFeatures:
        "Elegant gold or silver foil stamping adds a luxurious touch to your professional image.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 40000,
      tax: 3200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
  ],

  "Brochures": [
    {
      name: "Standard Business Cards",
      slug: generateSlug("Standard Business Cards"),
      price: "₦15,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Premium quality standard business cards",
      category: "Business Cards",
      popular: true,
      // Additional details for product page
      keyFeatures:
        "Printed on high-quality cardstock with vibrant colors and sharp details, available in various finishes to suit your style.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 15000,
      tax: 1200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Premium Business Cards",
      slug: generateSlug("Premium Business Cards"),
      price: "₦25,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Luxury finish business cards with special coating",
      category: "Business Cards",
      keyFeatures:
        "Premium cardstock with special coating, embossed finish, and luxury feel that makes a lasting impression.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 25000,
      tax: 2000,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Embossed Business Cards",
      slug: generateSlug("Embossed Business Cards"),
      price: "₦35,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Raised text business cards for premium feel",
      category: "Business Cards",
      popular: true,
      keyFeatures:
        "Raised text and designs create a tactile experience that sets your cards apart from the competition.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 35000,
      tax: 2800,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Foil Stamped Business Cards",
      slug: generateSlug("Foil Stamped Business Cards"),
      price: "₦40,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Gold/Silver foil stamped business cards",
      category: "Business Cards",
      keyFeatures:
        "Elegant gold or silver foil stamping adds a luxurious touch to your professional image.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 40000,
      tax: 3200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
  ],
  "Banners & Large Format": [
    {
      name: "Standard Business Cards",
      slug: generateSlug("Standard Business Cards"),
      price: "₦15,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Premium quality standard business cards",
      category: "Business Cards",
      popular: true,
      // Additional details for product page
      keyFeatures:
        "Printed on high-quality cardstock with vibrant colors and sharp details, available in various finishes to suit your style.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 15000,
      tax: 1200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Premium Business Cards",
      slug: generateSlug("Premium Business Cards"),
      price: "₦25,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Luxury finish business cards with special coating",
      category: "Business Cards",
      keyFeatures:
        "Premium cardstock with special coating, embossed finish, and luxury feel that makes a lasting impression.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 25000,
      tax: 2000,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Embossed Business Cards",
      slug: generateSlug("Embossed Business Cards"),
      price: "₦35,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Raised text business cards for premium feel",
      category: "Business Cards",
      popular: true,
      keyFeatures:
        "Raised text and designs create a tactile experience that sets your cards apart from the competition.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 35000,
      tax: 2800,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Foil Stamped Business Cards",
      slug: generateSlug("Foil Stamped Business Cards"),
      price: "₦40,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Gold/Silver foil stamped business cards",
      category: "Business Cards",
      keyFeatures:
        "Elegant gold or silver foil stamping adds a luxurious touch to your professional image.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 40000,
      tax: 3200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
  ],

  "Calendars": [
    {
      name: "Standard Business Cards",
      slug: generateSlug("Standard Business Cards"),
      price: "₦15,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Premium quality standard business cards",
      category: "Business Cards",
      popular: true,
      // Additional details for product page
      keyFeatures:
        "Printed on high-quality cardstock with vibrant colors and sharp details, available in various finishes to suit your style.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 15000,
      tax: 1200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Premium Business Cards",
      slug: generateSlug("Premium Business Cards"),
      price: "₦25,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Luxury finish business cards with special coating",
      category: "Business Cards",
      keyFeatures:
        "Premium cardstock with special coating, embossed finish, and luxury feel that makes a lasting impression.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 25000,
      tax: 2000,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Embossed Business Cards",
      slug: generateSlug("Embossed Business Cards"),
      price: "₦35,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Raised text business cards for premium feel",
      category: "Business Cards",
      popular: true,
      keyFeatures:
        "Raised text and designs create a tactile experience that sets your cards apart from the competition.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 35000,
      tax: 2800,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Foil Stamped Business Cards",
      slug: generateSlug("Foil Stamped Business Cards"),
      price: "₦40,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Gold/Silver foil stamped business cards",
      category: "Business Cards",
      keyFeatures:
        "Elegant gold or silver foil stamping adds a luxurious touch to your professional image.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 40000,
      tax: 3200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
  ],
  "Caps & Hats": [
    {
      name: "Standard Business Cards",
      slug: generateSlug("Standard Business Cards"),
      price: "₦15,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Premium quality standard business cards",
      category: "Business Cards",
      popular: true,
      // Additional details for product page
      keyFeatures:
        "Printed on high-quality cardstock with vibrant colors and sharp details, available in various finishes to suit your style.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 15000,
      tax: 1200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Premium Business Cards",
      slug: generateSlug("Premium Business Cards"),
      price: "₦25,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Luxury finish business cards with special coating",
      category: "Business Cards",
      keyFeatures:
        "Premium cardstock with special coating, embossed finish, and luxury feel that makes a lasting impression.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 25000,
      tax: 2000,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Embossed Business Cards",
      slug: generateSlug("Embossed Business Cards"),
      price: "₦35,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Raised text business cards for premium feel",
      category: "Business Cards",
      popular: true,
      keyFeatures:
        "Raised text and designs create a tactile experience that sets your cards apart from the competition.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 35000,
      tax: 2800,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Foil Stamped Business Cards",
      slug: generateSlug("Foil Stamped Business Cards"),
      price: "₦40,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Gold/Silver foil stamped business cards",
      category: "Business Cards",
      keyFeatures:
        "Elegant gold or silver foil stamping adds a luxurious touch to your professional image.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 40000,
      tax: 3200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
  ],
   "ClothesTag": [
    {
      name: "Standard Business Cards",
      slug: generateSlug("Standard Business Cards"),
      price: "₦15,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Premium quality standard business cards",
      category: "Business Cards",
      popular: true,
      // Additional details for product page
      keyFeatures:
        "Printed on high-quality cardstock with vibrant colors and sharp details, available in various finishes to suit your style.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 15000,
      tax: 1200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Premium Business Cards",
      slug: generateSlug("Premium Business Cards"),
      price: "₦25,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Luxury finish business cards with special coating",
      category: "Business Cards",
      keyFeatures:
        "Premium cardstock with special coating, embossed finish, and luxury feel that makes a lasting impression.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 25000,
      tax: 2000,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Embossed Business Cards",
      slug: generateSlug("Embossed Business Cards"),
      price: "₦35,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Raised text business cards for premium feel",
      category: "Business Cards",
      popular: true,
      keyFeatures:
        "Raised text and designs create a tactile experience that sets your cards apart from the competition.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 35000,
      tax: 2800,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Foil Stamped Business Cards",
      slug: generateSlug("Foil Stamped Business Cards"),
      price: "₦40,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Gold/Silver foil stamped business cards",
      category: "Business Cards",
      keyFeatures:
        "Elegant gold or silver foil stamping adds a luxurious touch to your professional image.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 40000,
      tax: 3200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
  ],
  "Comic Republic": [
    {
      name: "Standard Business Cards",
      slug: generateSlug("Standard Business Cards"),
      price: "₦15,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Premium quality standard business cards",
      category: "Business Cards",
      popular: true,
      // Additional details for product page
      keyFeatures:
        "Printed on high-quality cardstock with vibrant colors and sharp details, available in various finishes to suit your style.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 15000,
      tax: 1200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Premium Business Cards",
      slug: generateSlug("Premium Business Cards"),
      price: "₦25,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Luxury finish business cards with special coating",
      category: "Business Cards",
      keyFeatures:
        "Premium cardstock with special coating, embossed finish, and luxury feel that makes a lasting impression.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 25000,
      tax: 2000,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Embossed Business Cards",
      slug: generateSlug("Embossed Business Cards"),
      price: "₦35,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Raised text business cards for premium feel",
      category: "Business Cards",
      popular: true,
      keyFeatures:
        "Raised text and designs create a tactile experience that sets your cards apart from the competition.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 35000,
      tax: 2800,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Foil Stamped Business Cards",
      slug: generateSlug("Foil Stamped Business Cards"),
      price: "₦40,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Gold/Silver foil stamped business cards",
      category: "Business Cards",
      keyFeatures:
        "Elegant gold or silver foil stamping adds a luxurious touch to your professional image.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 40000,
      tax: 3200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
  ],

  "Corporate Gifts": [
    {
      name: "Standard Business Cards",
      slug: generateSlug("Standard Business Cards"),
      price: "₦15,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Premium quality standard business cards",
      category: "Business Cards",
      popular: true,
      // Additional details for product page
      keyFeatures:
        "Printed on high-quality cardstock with vibrant colors and sharp details, available in various finishes to suit your style.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 15000,
      tax: 1200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Premium Business Cards",
      slug: generateSlug("Premium Business Cards"),
      price: "₦25,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Luxury finish business cards with special coating",
      category: "Business Cards",
      keyFeatures:
        "Premium cardstock with special coating, embossed finish, and luxury feel that makes a lasting impression.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 25000,
      tax: 2000,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Embossed Business Cards",
      slug: generateSlug("Embossed Business Cards"),
      price: "₦35,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Raised text business cards for premium feel",
      category: "Business Cards",
      popular: true,
      keyFeatures:
        "Raised text and designs create a tactile experience that sets your cards apart from the competition.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 35000,
      tax: 2800,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Foil Stamped Business Cards",
      slug: generateSlug("Foil Stamped Business Cards"),
      price: "₦40,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Gold/Silver foil stamped business cards",
      category: "Business Cards",
      keyFeatures:
        "Elegant gold or silver foil stamping adds a luxurious touch to your professional image.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 40000,
      tax: 3200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
  ],

  "Envelopes": [
    {
      name: "Standard Business Cards",
      slug: generateSlug("Standard Business Cards"),
      price: "₦15,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Premium quality standard business cards",
      category: "Business Cards",
      popular: true,
      // Additional details for product page
      keyFeatures:
        "Printed on high-quality cardstock with vibrant colors and sharp details, available in various finishes to suit your style.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 15000,
      tax: 1200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Premium Business Cards",
      slug: generateSlug("Premium Business Cards"),
      price: "₦25,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Luxury finish business cards with special coating",
      category: "Business Cards",
      keyFeatures:
        "Premium cardstock with special coating, embossed finish, and luxury feel that makes a lasting impression.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 25000,
      tax: 2000,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Embossed Business Cards",
      slug: generateSlug("Embossed Business Cards"),
      price: "₦35,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Raised text business cards for premium feel",
      category: "Business Cards",
      popular: true,
      keyFeatures:
        "Raised text and designs create a tactile experience that sets your cards apart from the competition.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 35000,
      tax: 2800,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Foil Stamped Business Cards",
      slug: generateSlug("Foil Stamped Business Cards"),
      price: "₦40,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Gold/Silver foil stamped business cards",
      category: "Business Cards",
      keyFeatures:
        "Elegant gold or silver foil stamping adds a luxurious touch to your professional image.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 40000,
      tax: 3200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
  ],
  "Frames & Wall Arts": [
    {
      name: "Standard Business Cards",
      slug: generateSlug("Standard Business Cards"),
      price: "₦15,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Premium quality standard business cards",
      category: "Business Cards",
      popular: true,
      // Additional details for product page
      keyFeatures:
        "Printed on high-quality cardstock with vibrant colors and sharp details, available in various finishes to suit your style.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 15000,
      tax: 1200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Premium Business Cards",
      slug: generateSlug("Premium Business Cards"),
      price: "₦25,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Luxury finish business cards with special coating",
      category: "Business Cards",
      keyFeatures:
        "Premium cardstock with special coating, embossed finish, and luxury feel that makes a lasting impression.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 25000,
      tax: 2000,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Embossed Business Cards",
      slug: generateSlug("Embossed Business Cards"),
      price: "₦35,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Raised text business cards for premium feel",
      category: "Business Cards",
      popular: true,
      keyFeatures:
        "Raised text and designs create a tactile experience that sets your cards apart from the competition.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 35000,
      tax: 2800,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Foil Stamped Business Cards",
      slug: generateSlug("Foil Stamped Business Cards"),
      price: "₦40,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Gold/Silver foil stamped business cards",
      category: "Business Cards",
      keyFeatures:
        "Elegant gold or silver foil stamping adds a luxurious touch to your professional image.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 40000,
      tax: 3200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
  ],

  "Greeting Cards": [
    {
      name: "Standard Business Cards",
      slug: generateSlug("Standard Business Cards"),
      price: "₦15,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Premium quality standard business cards",
      category: "Business Cards",
      popular: true,
      // Additional details for product page
      keyFeatures:
        "Printed on high-quality cardstock with vibrant colors and sharp details, available in various finishes to suit your style.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 15000,
      tax: 1200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Premium Business Cards",
      slug: generateSlug("Premium Business Cards"),
      price: "₦25,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Luxury finish business cards with special coating",
      category: "Business Cards",
      keyFeatures:
        "Premium cardstock with special coating, embossed finish, and luxury feel that makes a lasting impression.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 25000,
      tax: 2000,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Embossed Business Cards",
      slug: generateSlug("Embossed Business Cards"),
      price: "₦35,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Raised text business cards for premium feel",
      category: "Business Cards",
      popular: true,
      keyFeatures:
        "Raised text and designs create a tactile experience that sets your cards apart from the competition.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 35000,
      tax: 2800,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Foil Stamped Business Cards",
      slug: generateSlug("Foil Stamped Business Cards"),
      price: "₦40,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Gold/Silver foil stamped business cards",
      category: "Business Cards",
      keyFeatures:
        "Elegant gold or silver foil stamping adds a luxurious touch to your professional image.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 40000,
      tax: 3200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
  ],

  "ID Cards": [
    {
      name: "Standard Business Cards",
      slug: generateSlug("Standard Business Cards"),
      price: "₦15,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Premium quality standard business cards",
      category: "Business Cards",
      popular: true,
      // Additional details for product page
      keyFeatures:
        "Printed on high-quality cardstock with vibrant colors and sharp details, available in various finishes to suit your style.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 15000,
      tax: 1200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Premium Business Cards",
      slug: generateSlug("Premium Business Cards"),
      price: "₦25,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Luxury finish business cards with special coating",
      category: "Business Cards",
      keyFeatures:
        "Premium cardstock with special coating, embossed finish, and luxury feel that makes a lasting impression.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 25000,
      tax: 2000,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Embossed Business Cards",
      slug: generateSlug("Embossed Business Cards"),
      price: "₦35,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Raised text business cards for premium feel",
      category: "Business Cards",
      popular: true,
      keyFeatures:
        "Raised text and designs create a tactile experience that sets your cards apart from the competition.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 35000,
      tax: 2800,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Foil Stamped Business Cards",
      slug: generateSlug("Foil Stamped Business Cards"),
      price: "₦40,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Gold/Silver foil stamped business cards",
      category: "Business Cards",
      keyFeatures:
        "Elegant gold or silver foil stamping adds a luxurious touch to your professional image.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 40000,
      tax: 3200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
  ],

  "Labels": [
    {
      name: "Standard Business Cards",
      slug: generateSlug("Standard Business Cards"),
      price: "₦15,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Premium quality standard business cards",
      category: "Business Cards",
      popular: true,
      // Additional details for product page
      keyFeatures:
        "Printed on high-quality cardstock with vibrant colors and sharp details, available in various finishes to suit your style.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 15000,
      tax: 1200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Premium Business Cards",
      slug: generateSlug("Premium Business Cards"),
      price: "₦25,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Luxury finish business cards with special coating",
      category: "Business Cards",
      keyFeatures:
        "Premium cardstock with special coating, embossed finish, and luxury feel that makes a lasting impression.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 25000,
      tax: 2000,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Embossed Business Cards",
      slug: generateSlug("Embossed Business Cards"),
      price: "₦35,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Raised text business cards for premium feel",
      category: "Business Cards",
      popular: true,
      keyFeatures:
        "Raised text and designs create a tactile experience that sets your cards apart from the competition.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 35000,
      tax: 2800,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Foil Stamped Business Cards",
      slug: generateSlug("Foil Stamped Business Cards"),
      price: "₦40,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Gold/Silver foil stamped business cards",
      category: "Business Cards",
      keyFeatures:
        "Elegant gold or silver foil stamping adds a luxurious touch to your professional image.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 40000,
      tax: 3200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
  ],

  "Letterhead": [
    {
      name: "Standard Business Cards",
      slug: generateSlug("Standard Business Cards"),
      price: "₦15,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Premium quality standard business cards",
      category: "Business Cards",
      popular: true,
      // Additional details for product page
      keyFeatures:
        "Printed on high-quality cardstock with vibrant colors and sharp details, available in various finishes to suit your style.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 15000,
      tax: 1200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Premium Business Cards",
      slug: generateSlug("Premium Business Cards"),
      price: "₦25,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Luxury finish business cards with special coating",
      category: "Business Cards",
      keyFeatures:
        "Premium cardstock with special coating, embossed finish, and luxury feel that makes a lasting impression.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 25000,
      tax: 2000,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Embossed Business Cards",
      slug: generateSlug("Embossed Business Cards"),
      price: "₦35,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Raised text business cards for premium feel",
      category: "Business Cards",
      popular: true,
      keyFeatures:
        "Raised text and designs create a tactile experience that sets your cards apart from the competition.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 35000,
      tax: 2800,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Foil Stamped Business Cards",
      slug: generateSlug("Foil Stamped Business Cards"),
      price: "₦40,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Gold/Silver foil stamped business cards",
      category: "Business Cards",
      keyFeatures:
        "Elegant gold or silver foil stamping adds a luxurious touch to your professional image.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 40000,
      tax: 3200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
  ],


  "Notepads and Jotters": [
    {
      name: "Standard Business Cards",
      slug: generateSlug("Standard Business Cards"),
      price: "₦15,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Premium quality standard business cards",
      category: "Business Cards",
      popular: true,
      // Additional details for product page
      keyFeatures:
        "Printed on high-quality cardstock with vibrant colors and sharp details, available in various finishes to suit your style.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 15000,
      tax: 1200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Premium Business Cards",
      slug: generateSlug("Premium Business Cards"),
      price: "₦25,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Luxury finish business cards with special coating",
      category: "Business Cards",
      keyFeatures:
        "Premium cardstock with special coating, embossed finish, and luxury feel that makes a lasting impression.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 25000,
      tax: 2000,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Embossed Business Cards",
      slug: generateSlug("Embossed Business Cards"),
      price: "₦35,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Raised text business cards for premium feel",
      category: "Business Cards",
      popular: true,
      keyFeatures:
        "Raised text and designs create a tactile experience that sets your cards apart from the competition.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 35000,
      tax: 2800,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Foil Stamped Business Cards",
      slug: generateSlug("Foil Stamped Business Cards"),
      price: "₦40,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Gold/Silver foil stamped business cards",
      category: "Business Cards",
      keyFeatures:
        "Elegant gold or silver foil stamping adds a luxurious touch to your professional image.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 40000,
      tax: 3200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
  ],


  "Posters": [
    {
      name: "Standard Business Cards",
      slug: generateSlug("Standard Business Cards"),
      price: "₦15,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Premium quality standard business cards",
      category: "Business Cards",
      popular: true,
      // Additional details for product page
      keyFeatures:
        "Printed on high-quality cardstock with vibrant colors and sharp details, available in various finishes to suit your style.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 15000,
      tax: 1200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Premium Business Cards",
      slug: generateSlug("Premium Business Cards"),
      price: "₦25,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Luxury finish business cards with special coating",
      category: "Business Cards",
      keyFeatures:
        "Premium cardstock with special coating, embossed finish, and luxury feel that makes a lasting impression.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 25000,
      tax: 2000,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Embossed Business Cards",
      slug: generateSlug("Embossed Business Cards"),
      price: "₦35,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Raised text business cards for premium feel",
      category: "Business Cards",
      popular: true,
      keyFeatures:
        "Raised text and designs create a tactile experience that sets your cards apart from the competition.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 35000,
      tax: 2800,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Foil Stamped Business Cards",
      slug: generateSlug("Foil Stamped Business Cards"),
      price: "₦40,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Gold/Silver foil stamped business cards",
      category: "Business Cards",
      keyFeatures:
        "Elegant gold or silver foil stamping adds a luxurious touch to your professional image.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 40000,
      tax: 3200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
  ],


  "Presentation Folders": [
    {
      name: "Standard Business Cards",
      slug: generateSlug("Standard Business Cards"),
      price: "₦15,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Premium quality standard business cards",
      category: "Business Cards",
      popular: true,
      // Additional details for product page
      keyFeatures:
        "Printed on high-quality cardstock with vibrant colors and sharp details, available in various finishes to suit your style.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 15000,
      tax: 1200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Premium Business Cards",
      slug: generateSlug("Premium Business Cards"),
      price: "₦25,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Luxury finish business cards with special coating",
      category: "Business Cards",
      keyFeatures:
        "Premium cardstock with special coating, embossed finish, and luxury feel that makes a lasting impression.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 25000,
      tax: 2000,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Embossed Business Cards",
      slug: generateSlug("Embossed Business Cards"),
      price: "₦35,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Raised text business cards for premium feel",
      category: "Business Cards",
      popular: true,
      keyFeatures:
        "Raised text and designs create a tactile experience that sets your cards apart from the competition.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 35000,
      tax: 2800,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Foil Stamped Business Cards",
      slug: generateSlug("Foil Stamped Business Cards"),
      price: "₦40,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Gold/Silver foil stamped business cards",
      category: "Business Cards",
      keyFeatures:
        "Elegant gold or silver foil stamping adds a luxurious touch to your professional image.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 40000,
      tax: 3200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
  ],

  "Promotional Items": [
    {
      name: "Standard Business Cards",
      slug: generateSlug("Standard Business Cards"),
      price: "₦15,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Premium quality standard business cards",
      category: "Business Cards",
      popular: true,
      // Additional details for product page
      keyFeatures:
        "Printed on high-quality cardstock with vibrant colors and sharp details, available in various finishes to suit your style.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 15000,
      tax: 1200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Premium Business Cards",
      slug: generateSlug("Premium Business Cards"),
      price: "₦25,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Luxury finish business cards with special coating",
      category: "Business Cards",
      keyFeatures:
        "Premium cardstock with special coating, embossed finish, and luxury feel that makes a lasting impression.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 25000,
      tax: 2000,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Embossed Business Cards",
      slug: generateSlug("Embossed Business Cards"),
      price: "₦35,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Raised text business cards for premium feel",
      category: "Business Cards",
      popular: true,
      keyFeatures:
        "Raised text and designs create a tactile experience that sets your cards apart from the competition.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 35000,
      tax: 2800,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Foil Stamped Business Cards",
      slug: generateSlug("Foil Stamped Business Cards"),
      price: "₦40,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Gold/Silver foil stamped business cards",
      category: "Business Cards",
      keyFeatures:
        "Elegant gold or silver foil stamping adds a luxurious touch to your professional image.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 40000,
      tax: 3200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
  ],
"Stickers": [
    {
      name: "Standard Business Cards",
      slug: generateSlug("Standard Business Cards"),
      price: "₦15,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Premium quality standard business cards",
      category: "Business Cards",
      popular: true,
      // Additional details for product page
      keyFeatures:
        "Printed on high-quality cardstock with vibrant colors and sharp details, available in various finishes to suit your style.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 15000,
      tax: 1200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Premium Business Cards",
      slug: generateSlug("Premium Business Cards"),
      price: "₦25,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Luxury finish business cards with special coating",
      category: "Business Cards",
      keyFeatures:
        "Premium cardstock with special coating, embossed finish, and luxury feel that makes a lasting impression.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 25000,
      tax: 2000,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Embossed Business Cards",
      slug: generateSlug("Embossed Business Cards"),
      price: "₦35,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Raised text business cards for premium feel",
      category: "Business Cards",
      popular: true,
      keyFeatures:
        "Raised text and designs create a tactile experience that sets your cards apart from the competition.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 35000,
      tax: 2800,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Foil Stamped Business Cards",
      slug: generateSlug("Foil Stamped Business Cards"),
      price: "₦40,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Gold/Silver foil stamped business cards",
      category: "Business Cards",
      keyFeatures:
        "Elegant gold or silver foil stamping adds a luxurious touch to your professional image.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 40000,
      tax: 3200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
  ],
"Umbrella": [
    {
      name: "Standard Business Cards",
      slug: generateSlug("Standard Business Cards"),
      price: "₦15,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Premium quality standard business cards",
      category: "Business Cards",
      popular: true,
      // Additional details for product page
      keyFeatures:
        "Printed on high-quality cardstock with vibrant colors and sharp details, available in various finishes to suit your style.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 15000,
      tax: 1200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Premium Business Cards",
      slug: generateSlug("Premium Business Cards"),
      price: "₦25,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Luxury finish business cards with special coating",
      category: "Business Cards",
      keyFeatures:
        "Premium cardstock with special coating, embossed finish, and luxury feel that makes a lasting impression.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 25000,
      tax: 2000,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Embossed Business Cards",
      slug: generateSlug("Embossed Business Cards"),
      price: "₦35,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Raised text business cards for premium feel",
      category: "Business Cards",
      popular: true,
      keyFeatures:
        "Raised text and designs create a tactile experience that sets your cards apart from the competition.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 35000,
      tax: 2800,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Foil Stamped Business Cards",
      slug: generateSlug("Foil Stamped Business Cards"),
      price: "₦40,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Gold/Silver foil stamped business cards",
      category: "Business Cards",
      keyFeatures:
        "Elegant gold or silver foil stamping adds a luxurious touch to your professional image.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 40000,
      tax: 3200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
  ],
"Wedding Stationery": [
    {
      name: "Standard Business Cards",
      slug: generateSlug("Standard Business Cards"),
      price: "₦15,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Premium quality standard business cards",
      category: "Business Cards",
      popular: true,
      // Additional details for product page
      keyFeatures:
        "Printed on high-quality cardstock with vibrant colors and sharp details, available in various finishes to suit your style.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 15000,
      tax: 1200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Premium Business Cards",
      slug: generateSlug("Premium Business Cards"),
      price: "₦25,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Luxury finish business cards with special coating",
      category: "Business Cards",
      keyFeatures:
        "Premium cardstock with special coating, embossed finish, and luxury feel that makes a lasting impression.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 25000,
      tax: 2000,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Embossed Business Cards",
      slug: generateSlug("Embossed Business Cards"),
      price: "₦35,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Raised text business cards for premium feel",
      category: "Business Cards",
      popular: true,
      keyFeatures:
        "Raised text and designs create a tactile experience that sets your cards apart from the competition.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 35000,
      tax: 2800,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Foil Stamped Business Cards",
      slug: generateSlug("Foil Stamped Business Cards"),
      price: "₦40,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Gold/Silver foil stamped business cards",
      category: "Business Cards",
      keyFeatures:
        "Elegant gold or silver foil stamping adds a luxurious touch to your professional image.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 40000,
      tax: 3200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
  ],





  "Campaign Materials": [
    {
      name: "Standard Business Cards",
      slug: generateSlug("Standard Business Cards"),
      price: "₦15,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Premium quality standard business cards",
      category: "Business Cards",
      popular: true,
      // Additional details for product page
      keyFeatures:
        "Printed on high-quality cardstock with vibrant colors and sharp details, available in various finishes to suit your style.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 15000,
      tax: 1200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Premium Business Cards",
      slug: generateSlug("Premium Business Cards"),
      price: "₦25,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Luxury finish business cards with special coating",
      category: "Business Cards",
      keyFeatures:
        "Premium cardstock with special coating, embossed finish, and luxury feel that makes a lasting impression.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 25000,
      tax: 2000,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Embossed Business Cards",
      slug: generateSlug("Embossed Business Cards"),
      price: "₦35,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Raised text business cards for premium feel",
      category: "Business Cards",
      popular: true,
      keyFeatures:
        "Raised text and designs create a tactile experience that sets your cards apart from the competition.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 35000,
      tax: 2800,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Foil Stamped Business Cards",
      slug: generateSlug("Foil Stamped Business Cards"),
      price: "₦40,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Gold/Silver foil stamped business cards",
      category: "Business Cards",
      keyFeatures:
        "Elegant gold or silver foil stamping adds a luxurious touch to your professional image.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 40000,
      tax: 3200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
  ],
   
  Bags: [
    {
      name: "A4 Paper Bag (Branded)",
      slug: generateSlug("A4 Paper Bag (Branded)"),
      price: "₦90,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Custom branded A4 paper bags",
      category: "Bags",
      keyFeatures:
        "Durable A4-sized paper bags with custom branding, perfect for retail and promotional use.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 90000,
      tax: 7200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Courier Bags",
      slug: generateSlug("Courier Bags"),
      price: "₦25,500",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Durable courier bags for shipping",
      category: "Bags",
      popular: true,
      keyFeatures:
        "Heavy-duty courier bags designed for secure shipping and delivery of documents and small items.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 25500,
      tax: 2040,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Medium Brown Bags",
      slug: generateSlug("Medium Brown Bags"),
      price: "₦70,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Medium sized brown paper bags",
      category: "Bags",
      keyFeatures:
        "Eco-friendly medium brown paper bags, perfect for retail stores and gift packaging.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 70000,
      tax: 5600,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Nylon Bags (Branded)",
      slug: generateSlug("Nylon Bags (Branded)"),
      price: "₦22,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Custom branded nylon bags",
      category: "Bags",
      keyFeatures:
        "Durable nylon bags with custom branding, reusable and perfect for promotional campaigns.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 22000,
      tax: 1760,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
  ],
  
  "Flyers & Handbills": [
    {
      name: "A5 Flyer (Single Sided)",
      slug: generateSlug("A5 Flyer (Single Sided)"),
      price: "₦13,500",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Single sided A5 flyers",
      category: "Flyers & Handbills",
      keyFeatures:
        "High-quality single-sided A5 flyers printed on premium paper stock with vibrant colors.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 13500,
      tax: 1080,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "A5 Flyer (Double Sided)",
      slug: generateSlug("A5 Flyer (Double Sided)"),
      price: "₦18,500",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Double sided A5 flyers",
      category: "Flyers & Handbills",
      keyFeatures:
        "Double-sided A5 flyers maximizing your marketing message with print on both sides.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 18500,
      tax: 1480,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "A4 Flyer (Single Sided)",
      slug: generateSlug("A4 Flyer (Single Sided)"),
      price: "₦20,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Single sided A4 flyers",
      category: "Flyers & Handbills",
      keyFeatures:
        "Large format A4 flyers perfect for detailed promotional content and event announcements.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 20000,
      tax: 1600,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "A4 Flyer (Double Sided)",
      slug: generateSlug("A4 Flyer (Double Sided)"),
      price: "₦28,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Double sided A4 flyers",
      category: "Flyers & Handbills",
      keyFeatures:
        "Double-sided A4 flyers providing maximum space for your marketing content and messaging.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 28000,
      tax: 2240,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
  ],
  "Clothing & Apparel": [
    {
      name: "T-shirt (Cotton)",
      slug: generateSlug("T-shirt (Cotton)"),
      price: "₦6,000",
      unit: "per 1",
      image: "/placeholder.svg?height=200&width=200",
      description: "100% cotton custom printed t-shirts",
      category: "Clothing & Apparel",
      keyFeatures:
        "100% cotton t-shirts with custom printing, comfortable fit and durable fabric that lasts.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 6000,
      tax: 480,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "T-shirt (Polo)",
      slug: generateSlug("T-shirt (Polo)"),
      price: "₦8,500",
      unit: "per 1",
      image: "/placeholder.svg?height=200&width=200",
      description: "Premium polo t-shirts with custom printing",
      category: "Clothing & Apparel",
      keyFeatures:
        "Premium polo t-shirts with collar, perfect for corporate events and professional settings.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 8500,
      tax: 680,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Hoodies",
      slug: generateSlug("Hoodies"),
      price: "₦15,000",
      unit: "per 1",
      image: "/placeholder.svg?height=200&width=200",
      description: "Custom printed hoodies",
      category: "Clothing & Apparel",
      popular: true,
      keyFeatures:
        "Comfortable hoodies with custom printing, perfect for casual wear and promotional merchandise.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 15000,
      tax: 1200,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Corporate Shirts",
      slug: generateSlug("Corporate Shirts"),
      price: "₦12,000",
      unit: "per 1",
      image: "/placeholder.svg?height=200&width=200",
      description: "Professional corporate shirts with logo",
      category: "Clothing & Apparel",
      keyFeatures:
        "Professional corporate shirts with custom logo embroidery, perfect for office uniforms.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 12000,
      tax: 960,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
  ],
  Mugs: [
    {
      name: "Mugs (Simple & Magic)",
      slug: generateSlug("Mugs (Simple & Magic)"),
      price: "₦4,500",
      unit: "per 1",
      image: "/placeholder.svg?height=200&width=200",
      description: "Custom printed mugs - simple and magic mugs",
      category: "Mugs",
      keyFeatures:
        "Custom printed mugs available in simple and magic varieties, perfect for promotional gifts.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 4500,
      tax: 360,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Ceramic Mugs",
      slug: generateSlug("Ceramic Mugs"),
      price: "₦3,500",
      unit: "per 1",
      image: "/placeholder.svg?height=200&width=200",
      description: "High quality ceramic mugs",
      category: "Mugs",
      keyFeatures:
        "High quality ceramic mugs with smooth finish, perfect for daily use and corporate gifts.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 3500,
      tax: 280,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Travel Mugs",
      slug: generateSlug("Travel Mugs"),
      price: "₦8,000",
      unit: "per 1",
      image: "/placeholder.svg?height=200&width=200",
      description: "Insulated travel mugs with custom design",
      category: "Mugs",
      popular: true,
      keyFeatures:
        "Insulated travel mugs with custom design, perfect for on-the-go professionals.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      priceNumeric: 8000,
      tax: 640,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
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
