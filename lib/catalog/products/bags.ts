import { defineProduct } from "./define";
import { from } from "../pricing";

const PAPER_BAG_FINISHING =
  "Full-colour printing or gold foiled logo, laminated and folded into shape with rope or ribbon handles.";

const PAPER_BAG_DELIVERY = {
  lagos: "3-5 working days",
  nationwide: "5-7 working days",
};

/** Bags — transcribed from the PrintPalash price list, pages 1-4. */
export const bags = [
  defineProduct({
    slug: "a2-paper-bag",
    name: "A2 Paper Bag",
    category: "bags",
    short:
      "Large 24 x 18 inch laminated paper bag on 300gsm card with rope handles.",
    description:
      "The largest paper bag in the range, built for boutique retail, hampers and corporate gift sets that need presence. Printed in full colour or finished with a gold foiled logo on 300gsm art or FBB card, laminated for durability and folded into shape with rope or ribbon handles.",
    price: from(285450, 100),
    specs: {
      size: "Width 24 inches, height 18 inches",
      material: "300gsm art or FBB card",
      finishing: PAPER_BAG_FINISHING,
    },
    delivery: PAPER_BAG_DELIVERY,
    images: [
      "/product-images/bags/a2-paper-bag-2.png",
      "/product-images/bags/a2-paper-bagee.png",
      "/product-images/bags/a2-paper-bag-3.png",
      "/product-images/bags/a2-paper-bag-4.png",
    ],
    imageAlt: "Large branded A2 paper bag with rope handles",
    terms: ["shopping bag", "gift bag", "carrier bag", "large paper bag"],
    related: ["a3-paper-bag", "a4-paper-bag", "wine-paper-bag"],
    source: "Price list p.1",
    review: [
      "Price list prints ₦285,450:00 per 100 for the A2 bag — an unusually precise figure next to the round numbers used for every other bag size. Preserved as printed; confirm with the business.",
    ],
  }),

  defineProduct({
    slug: "a3-paper-bag",
    name: "A3 Paper Bag",
    category: "bags",
    short:
      "17 x 12 inch laminated paper bag on 300gsm art or FBB card with rope handles.",
    description:
      "A generous carrier size that suits fashion retail, packaged food and event giveaways. Printed in full colour or with a gold foiled logo on 300gsm art or FBB card, laminated and folded into shape with rope or ribbon handles.",
    price: from(170000, 100),
    specs: {
      size: "Width 17 inches, height 12 inches",
      material: "300gsm art or FBB card",
      finishing: PAPER_BAG_FINISHING,
    },
    delivery: PAPER_BAG_DELIVERY,
    images: [
      "/product-images/bags/a3-paper-bag.jpg",
      "/product-images/bags/a3-paper-bag-2.png",
      "/product-images/bags/a3-paper-bag-3.png",
    ],
    imageAlt: "Branded A3 paper bag with rope handles",
    terms: ["shopping bag", "carrier bag", "retail bag"],
    related: ["a2-paper-bag", "a4-paper-bag", "kraft-bag"],
    source: "Price list p.1",
  }),

  defineProduct({
    slug: "a4-paper-bag",
    name: "A4 Paper Bag",
    category: "bags",
    short:
      "9 x 12 inch laminated paper bag on 300gsm art card — the everyday retail size.",
    description:
      "The most widely ordered paper bag size, sized for boutiques, pharmacies, bakeries and corporate packs. Full-colour printing or a gold foiled logo on 300gsm art card, laminated and folded into shape with rope or ribbon handles.",
    price: from(104000, 100),
    specs: {
      size: "Width 9 inches, height 12 inches",
      material: "300gsm art card",
      finishing: PAPER_BAG_FINISHING,
    },
    delivery: PAPER_BAG_DELIVERY,
    images: [
      "/product-images/bags/a4-paper-bag.jpg",
      "/product-images/bags/a4-paper-bag-2.png",
      "/product-images/bags/a4-paper-bag-3.jpg",
    ],
    imageAlt: "Branded A4 paper bag with rope handles",
    featured: true,
    terms: ["shopping bag", "retail bag", "boutique bag", "carrier bag"],
    related: ["a5-paper-bag", "a3-paper-bag", "kraft-bag"],
    source: "Price list p.1",
  }),

  defineProduct({
    slug: "a5-paper-bag",
    name: "A5 Paper Bag",
    category: "bags",
    short:
      "Compact 5.8 x 8 inch laminated paper bag on 300gsm art card with rope handles.",
    description:
      "A small carrier for jewellery, cosmetics, samples and event favours. Printed in full colour or finished with a gold foiled logo on 300gsm art card, laminated and folded into shape with rope or ribbon handles.",
    price: from(55000, 100),
    specs: {
      size: "Width 5.8 inches, height 8 inches",
      material: "300gsm art card",
      finishing: PAPER_BAG_FINISHING,
    },
    delivery: PAPER_BAG_DELIVERY,
    images: [
      "/product-images/bags/a5-paper-bag.jpg",
      "/product-images/bags/a5-paper-bag-2.png",
      "/product-images/bags/a5-paper-bag-3.png",
    ],
    imageAlt: "Small branded A5 paper bag with rope handles",
    terms: ["small paper bag", "gift bag", "favour bag", "cosmetic bag"],
    related: ["a4-paper-bag", "wine-paper-bag", "kraft-bag"],
    source: "Price list p.1",
  }),

  defineProduct({
    slug: "wine-paper-bag",
    name: "Wine Paper Bag",
    category: "bags",
    short:
      "Tall 4.5 x 12 inch bottle bag on 300gsm art card with rope or ribbon handles.",
    description:
      "A narrow, tall bag cut to hold a single bottle upright — used for wine gifting, spirits retail and end-of-year corporate hampers. Full-colour printing or a gold foiled logo on 300gsm art card, laminated and folded into shape.",
    price: from(126000, 100),
    specs: {
      size: "Width 4.5 inches, height 12 inches",
      material: "300gsm art card",
      finishing: PAPER_BAG_FINISHING,
    },
    delivery: PAPER_BAG_DELIVERY,
    images: [
      "/product-images/bags/wine-paper-bag.png",
      "/product-images/bags/wine-paper-bag-2.png",
      "/product-images/bags/wine-paper-bag-3.png",
    ],
    imageAlt: "Tall branded wine bottle paper bag with rope handles",
    terms: ["wine bag", "bottle bag", "gift bag", "champagne bag"],
    related: ["a5-paper-bag", "a4-paper-bag"],
    source: "Price list p.1",
    review: [
      "Price list quotes ₦126,000 per 100 for the wine bag, higher than the physically larger A4 bag at ₦104,000 per 100. Preserved as printed; confirm whether this is intentional.",
    ],
  }),

  defineProduct({
    slug: "courier-bag",
    name: "Courier Bag",
    category: "bags",
    short:
      "Sealable branded courier bags in four sizes for dispatch and e-commerce.",
    description:
      "Self-sealing courier bags branded with your logo, used by logistics companies and online stores for last-mile dispatch. Available in four sizes from A5 up to A2 so you can match the bag to the parcel instead of over-packing.",
    price: from(22000, 100),
    specs: {
      size: "A5, A4, A3 and A2 options",
      material: "Sealable courier bag",
      finishing: "Branded courier bag with self-seal strip",
    },
    delivery: PAPER_BAG_DELIVERY,
    options: [
      {
        id: "size",
        label: "Size",
        affectsPrice: true,
        options: [
          {
            id: "small",
            label: "Small — A5",
            detail: '5.83" x 8.27"',
            price: from(22000, 100),
          },
          {
            id: "medium",
            label: "Medium — A4",
            detail: '12.5" x 9"',
            price: from(27000, 100),
          },
          {
            id: "large",
            label: "Large — A3",
            detail: '16" x 11"',
            price: from(34000, 100),
          },
          {
            id: "x-large",
            label: "X-Large — A2",
            detail: '22" x 16"',
            price: from(60000, 100),
          },
        ],
      },
    ],
    images: [
      "/product-images/bags/courier-bag.png",
      "/product-images/bags/courier-bag-2.png",
      "/product-images/bags/courier-bag-3.png",
      "/product-images/bags/courier-bag-4.png",
    ],
    imageAlt: "Branded sealable courier bag for parcel dispatch",
    featured: true,
    terms: [
      "dispatch bag",
      "shipping bag",
      "mailing bag",
      "delivery bag",
      "ecommerce packaging",
      "waybill bag",
    ],
    related: ["poly-bag", "singlet-nylon", "mailer-box"],
    source: "Price list pp.1-2",
  }),

  defineProduct({
    slug: "drawstring-bag",
    name: "Drawstring Bag",
    category: "bags",
    short: "Standard-size branded drawstring bag for events and giveaways.",
    description:
      "A lightweight cinch bag for conferences, sports teams, schools and campaign giveaways. Branded and produced in batches of 10, so it works for small team runs as well as event volumes.",
    price: from(60000, 10),
    specs: {
      size: "Standard size",
      material: "Tampoline",
      finishing: "Branded drawstring bag",
    },
    delivery: PAPER_BAG_DELIVERY,
    images: [
      "/product-images/bags/drawstring-bags.png",
      "/product-images/bags/drawstring-bags-2.png",
      "/product-images/bags/drawstring-bags-3.png",
      "/product-images/bags/drawstring-bags-4.png",
    ],
    imageAlt: "Branded drawstring bag with cinch cords",
    terms: ["cinch bag", "gym bag", "sports bag", "string bag", "event bag"],
    related: ["tote-bag", "jute-bag", "sublimation-tote-bag"],
    source: "Price list p.2",
    review: [
      'Price list states the material as "TAMPOLINE". Most likely tarpaulin or trampoline fabric — preserved verbatim pending confirmation.',
    ],
  }),

  defineProduct({
    slug: "fanny-waist-pack",
    name: "Fanny Waist Pack",
    category: "bags",
    short:
      "Branded polyester waist pack available in white and black.",
    description:
      "A polyester waist pack branded for events, brand activations and staff kit. Available in white and black and produced in batches of 10.",
    price: from(110000, 10),
    specs: {
      material: "Polyester, available in white and black",
      finishing: "Branded waist pack",
    },
    delivery: PAPER_BAG_DELIVERY,
    images: [
      "/product-images/bags/fanny-waist-pack.png",
      "/product-images/bags/fanny-waist-pack-2.jpg",
      "/product-images/bags/fanny-waist-pack-3.png",
    ],
    imageAlt: "Branded polyester fanny waist pack",
    terms: ["waist bag", "bum bag", "belt bag", "fanny pack"],
    related: ["drawstring-bag", "tote-bag"],
    source: "Price list p.2",
  }),

  defineProduct({
    slug: "jute-bag",
    name: "Jute Bag",
    category: "bags",
    short:
      'Eco-friendly 15" x 12" sack-textured jute bag for retail and gifting.',
    description:
      "A thick, eco-friendly jute bag with the texture of traditional sacking — a durable, reusable alternative to plastic for grocery retail, hampers and sustainability-minded brands.",
    price: from(65000, 10),
    specs: {
      size: 'A3 (15" x 12")',
      material: "Thick eco-friendly sack-like jute",
      finishing: "Branded jute bag",
    },
    delivery: PAPER_BAG_DELIVERY,
    images: [
      "/product-images/bags/jute-bag.png",
      "/product-images/bags/jute-bag-2.png",
      "/product-images/bags/jute-bag-3.png",
    ],
    imageAlt: "Eco-friendly branded jute bag with woven texture",
    terms: ["eco bag", "hessian bag", "sack bag", "reusable bag", "green bag"],
    related: ["tote-bag", "kraft-bag", "drawstring-bag"],
    source: "Price list p.2",
  }),

  defineProduct({
    slug: "kraft-bag",
    name: "Kraft Bag",
    category: "bags",
    short:
      "130gsm brown or white unlaminated kraft paper bag in medium and large.",
    description:
      "An unlaminated kraft paper bag with a natural, recyclable finish — the standard choice for takeaway food, bakeries and brands with a pared-back identity. Available in brown or white in two sizes.",
    price: from(70000, 100),
    specs: {
      size: "Medium and large options",
      material: "130gsm brown or white non-laminated paper",
      finishing: "Branded kraft paper bag with handles",
    },
    delivery: PAPER_BAG_DELIVERY,
    options: [
      {
        id: "size",
        label: "Size",
        affectsPrice: true,
        options: [
          {
            id: "medium",
            label: "Medium",
            detail: "Width 8.8 inches, height 12 inches",
            price: from(70000, 100),
          },
          {
            id: "large",
            label: "Large — A3",
            detail: '16" x 11.6"',
            price: from(120000, 100),
          },
        ],
      },
    ],
    images: [
      "/product-images/bags/kraft-bag.png",
      "/product-images/bags/kraft-bag-2.png",
      "/product-images/bags/kraft-bag-3.jpeg",
      "/product-images/bags/kraft-bag-4.png",
    ],
    imageAlt: "Brown kraft paper bag with printed branding and handles",
    terms: ["brown paper bag", "takeaway bag", "food bag", "eco paper bag"],
    related: ["a4-paper-bag", "jute-bag", "food-pack"],
    source: "Price list p.2",
    review: [
      'The "Kraft Bag Large" entry carries two Material lines: a stray "Sealable courier bag" line copied from the courier bag entry above it, followed by the correct "130GSM BROWN OR WHITE NON LAMINATED PAPER". The kraft material has been used here.',
    ],
  }),

  defineProduct({
    slug: "pillow-bags-a4",
    name: "Pillow Bags",
    category: "bags",
    short:
      "Die-cut pillow-shaped card bag with a twisted rope handle, matte or gloss.",
    description:
      "A curved pillow-shaped bag die-cut from 300gsm art or FBB card and folded with a twisted rope handle. Popular for gift retail, wedding favours and premium product packaging where a standard square bag looks ordinary.",
    price: from(115000, 100),
    specs: {
      size: '8.8" x 11.8"',
      material: "300gsm art or FBB card with matte and gloss options",
      finishing: "Die-cut and folded with twisted rope handle",
    },
    delivery: PAPER_BAG_DELIVERY,
    images: [
      "/product-images/bags/pillow-bags-a4.png",
      "/product-images/bags/pillows-bags-a4-2.png",
    ],
    imageAlt: "Pillow-shaped gift bag with twisted rope handle",
    terms: ["pillow box bag", "gift bag", "favour bag", "curved bag"],
    related: ["a5-paper-bag", "drawer-box", "magnetic-flip-box"],
    source: "Price list p.3",
    review: [
      'Price list labels the size "A3 (8.8 x 11.8 inches)", but those dimensions are A4 rather than A3. The measurements have been kept and the A3 label dropped; confirm which is intended.',
    ],
  }),

  defineProduct({
    slug: "poly-bag",
    name: "Poly Bag",
    category: "bags",
    short:
      "Screen-printed polythene carrier bag in four sizes including fashion weight.",
    description:
      "A thick polythene carrier bag screen printed in one or two colours — the workhorse bag for markets, supermarkets and fashion retail. Four sizes are available, including a lighter-weight fashion bag for garment retail.",
    price: from(23000, 100),
    specs: {
      size: "Fashion, medium, large and X-large options",
      material: "Thick poly bag nylon",
      finishing: "One colour or two colour screen printing",
    },
    delivery: PAPER_BAG_DELIVERY,
    options: [
      {
        id: "size",
        label: "Size",
        affectsPrice: true,
        options: [
          {
            id: "fashion",
            label: "Fashion",
            detail: '9" x 12" — lightweight poly bag nylon',
            price: from(23000, 100),
          },
          {
            id: "medium",
            label: "Medium",
            detail: '15" x 19"',
            price: from(35000, 100),
          },
          {
            id: "large",
            label: "Large",
            detail: '17" x 22"',
            price: from(45000, 100),
          },
          {
            id: "x-large",
            label: "X-Large",
            detail: '24" x 27"',
            price: from(55000, 100),
          },
        ],
      },
    ],
    images: [
      "/product-images/bags/poly-bag.png",
      "/product-images/bags/poly-bag-2.png",
    ],
    imageAlt: "Screen printed polythene carrier bag",
    terms: ["nylon bag", "plastic bag", "carrier bag", "shopping nylon"],
    related: ["singlet-nylon", "courier-bag"],
    source: "Price list p.3",
  }),

  defineProduct({
    slug: "singlet-nylon",
    name: "Singlet Nylon",
    category: "bags",
    short:
      "Vest-handle polythene bag in small, medium and large, screen printed.",
    description:
      "The familiar vest-handle carrier used across Nigerian retail, printed with your branding in one or two colours on thick singlet polythene. Available in three sizes.",
    price: from(18000, 100),
    specs: {
      size: "Small, medium and large options",
      material: "Thick singlet polythene nylon",
      finishing: "One colour or two colour screen printing",
    },
    delivery: PAPER_BAG_DELIVERY,
    options: [
      {
        id: "size",
        label: "Size",
        affectsPrice: true,
        options: [
          {
            id: "small",
            label: "Small",
            detail: '11" x 17"',
            price: from(18000, 100),
          },
          {
            id: "medium",
            label: "Medium",
            detail: '13" x 21"',
            price: from(25000, 100),
          },
          {
            id: "large",
            label: "Large",
            detail: '17" x 23"',
            price: from(32000, 100),
          },
        ],
      },
    ],
    images: [
      "/product-images/bags/singlet-nylon.png",
      "/product-images/bags/singlet-nylon-2.png",
      "/product-images/bags/singlet-nylon-3.png",
    ],
    imageAlt: "Vest-handle singlet nylon carrier bag with printed branding",
    terms: ["vest bag", "nylon bag", "shopping nylon", "market bag"],
    related: ["poly-bag", "courier-bag"],
    source: "Price list p.3",
  }),

  defineProduct({
    slug: "sublimation-tote-bag",
    name: "Sublimation Tote Bag",
    category: "bags",
    short:
      "Canvas-coated tote bag carrying an edge-to-edge full-colour design.",
    description:
      "A coated canvas tote that takes a full-colour sublimation print across the whole panel, so photographs and gradients reproduce cleanly rather than being limited to flat screen-printed colours.",
    price: from(100000, 10),
    specs: {
      material: "Canvas coated material",
      finishing: "Full colour design print",
    },
    delivery: PAPER_BAG_DELIVERY,
    images: [
      "/product-images/bags/sublimation-tote-bag.png",
      "/product-images/bags/sublimation-tote-bag-2.png",
      "/product-images/bags/sublimation-tote-bag-3.png",
    ],
    imageAlt: "Canvas tote bag with full-colour sublimated design",
    terms: ["canvas bag", "shopper bag", "printed tote", "full colour tote"],
    related: ["tote-bag", "jute-bag", "drawstring-bag"],
    source: "Price list p.4",
  }),

  defineProduct({
    slug: "tote-bag",
    name: "Tote Bag",
    category: "bags",
    short: "Chinos cotton tote bag with full-colour branding.",
    description:
      "A cotton chinos tote printed in full colour — a reusable everyday bag for conferences, bookshops, brand merchandise and corporate gifting.",
    price: from(50000, 10),
    specs: {
      material: "Chinos cotton material",
      finishing: "Full colour print",
    },
    delivery: PAPER_BAG_DELIVERY,
    images: [
      "/product-images/bags/tote-bag.png",
      "/product-images/bags/tote-bag-2.png",
      "/product-images/bags/tote-bag-3.png",
    ],
    imageAlt: "Cotton tote bag with printed branding",
    featured: true,
    terms: ["cotton bag", "shopper bag", "canvas bag", "merch bag"],
    related: ["sublimation-tote-bag", "jute-bag", "drawstring-bag"],
    source: "Price list p.4",
  }),
];
