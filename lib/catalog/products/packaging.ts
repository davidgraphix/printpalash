import { defineProduct } from "./define";
import { from } from "../pricing";

const DIR = "/product-images/box&packaging";

const RIGID_BOX_DELIVERY = {
  lagos: "10-12 working days",
  nationwide: "12-14 working days",
};

const CORRUGATED_DELIVERY = {
  lagos: "10-14 working days",
  nationwide: "12-16 working days",
};

const RIGID_BOX_FINISHING =
  "Full colour branding with matte or gloss lamination, foiled letters or pictures, and UV spot effect.";

const RIGID_BOX_MATERIAL =
  "Strawboard wrapped with laminated 135gsm or special paper";

/** Box & Packaging — price list page 7. */
export const packaging = [
  defineProduct({
    slug: "drawer-box",
    name: "Drawer Box",
    category: "box-packaging",
    short:
      "Rigid 12 x 10 x 4 inch slide-out drawer box in laminated wrapped strawboard.",
    description:
      "A rigid two-part box where the inner tray slides out of an outer sleeve like a drawer. Built from strawboard wrapped in laminated paper, it holds its shape far better than a folding carton, which is why it is the usual choice for gift sets, hair and cosmetics ranges and premium unboxing.",
    price: from(10000, 10, "box"),
    specs: {
      size: "12 x 10 x 4 inches",
      material: RIGID_BOX_MATERIAL,
      finishing: RIGID_BOX_FINISHING,
    },
    delivery: RIGID_BOX_DELIVERY,
    images: [`${DIR}/drawer-box.png`, `${DIR}/drawer-box-2.png`],
    imageAlt: "Rigid slide-out drawer gift box with printed wrap",
    terms: ["gift box", "rigid box", "sleeve box", "hamper box", "luxury box"],
    related: ["magnetic-flip-box", "mailer-box", "pillow-bags-a4"],
    source: "Price list p.7",
    review: [
      "Price list quotes ₦10,000 per 10 (₦1,000 per box) for a rigid strawboard drawer box, well below the corrugated pizza box at ₦450,000 per 100 (₦4,500 each). Preserved as printed; confirm the batch size and amount.",
    ],
  }),

  defineProduct({
    slug: "magnetic-flip-box",
    name: "Magnetic Flip Box",
    category: "box-packaging",
    short:
      "Rigid 12 x 10 x 4 inch box with a magnetic lid closure.",
    description:
      "A rigid box with a hinged lid held shut by concealed magnets, so it opens with a clean snap and closes flat. Built from strawboard wrapped in laminated paper and finished with foiling or UV spot — the standard format for premium gifting, launch kits and press packs.",
    price: from(11000, 10, "box"),
    specs: {
      size: "12 x 10 x 4 inches",
      material: `${RIGID_BOX_MATERIAL} and magnet`,
      finishing: RIGID_BOX_FINISHING,
    },
    delivery: RIGID_BOX_DELIVERY,
    images: [
      `${DIR}/magnetic-flip-pack.png`,
      `${DIR}/magnetic-flip-pack-2.png`,
      `${DIR}/magnetic-flip-pack-3.jpeg`,
    ],
    imageAlt: "Rigid gift box with magnetic flip lid",
    featured: true,
    terms: [
      "gift box",
      "rigid box",
      "magnetic box",
      "luxury packaging",
      "press kit box",
    ],
    related: ["drawer-box", "mailer-box", "pillow-bags-a4"],
    source: "Price list p.7",
    review: [
      "As with the drawer box, ₦11,000 per 10 (₦1,100 per box) is low for a rigid magnetic box relative to the corrugated boxes on the same page. Preserved as printed; confirm.",
    ],
  }),

  defineProduct({
    slug: "food-pack",
    name: "Food Pack",
    category: "box-packaging",
    short:
      "Branded 270gsm FBB card food pack with matte or gloss lamination.",
    description:
      "Printed food packaging cut from 270gsm FBB card and laminated, for restaurants, cloud kitchens and packaged snack brands. Sizes are made to your product rather than fixed, so the pack fits the portion instead of the portion rattling around the pack.",
    price: from(250000, 100, "pack"),
    specs: {
      size: "Sizes vary based on your product",
      material: "270gsm FBB card",
      finishing: "Full colour printing with matte or gloss lamination option",
    },
    delivery: CORRUGATED_DELIVERY,
    images: [
      `${DIR}/food-pack.png`,
      `${DIR}/food-pack-2.png`,
      `${DIR}/food-pack-3.png`,
    ],
    imageAlt: "Printed cardboard food pack for takeaway meals",
    terms: [
      "food packaging",
      "takeaway box",
      "meal box",
      "snack packaging",
      "restaurant packaging",
    ],
    related: ["pizza-box", "kraft-bag", "party-paper-cup"],
    source: "Price list p.7",
  }),

  defineProduct({
    slug: "mailer-box",
    name: "Mailer Box",
    category: "box-packaging",
    short:
      "7 x 5 x 3 inch corrugated shipping box, die-cut and folded.",
    description:
      "A self-locking corrugated mailer that ships flat and folds up without tape — the standard e-commerce box. Printed in one colour or full colour with a matte lamination option, die-cut and creased so it survives the journey and still looks considered when it arrives.",
    price: from(280000, 100, "box"),
    specs: {
      size: "7 x 5 x 3 inches",
      material: "Durable corrugated carton",
      finishing:
        "One or full colour printing with matte lamination option, die-cut and folded",
    },
    delivery: CORRUGATED_DELIVERY,
    images: [
      `${DIR}/mailer-box.jpeg`,
      `${DIR}/mailer-box-2.jpeg`,
      `${DIR}/mailer-box-3.jpeg`,
      `${DIR}/mailer-box-4.jpeg`,
    ],
    imageAlt: "Corrugated e-commerce mailer box with printed branding",
    featured: true,
    terms: [
      "shipping box",
      "ecommerce box",
      "corrugated box",
      "carton box",
      "subscription box",
    ],
    related: ["pizza-box", "courier-bag", "drawer-box"],
    source: "Price list p.7",
  }),

  defineProduct({
    slug: "pizza-box",
    name: "Pizza Box",
    category: "box-packaging",
    short:
      "12 x 10 x 1.5 inch corrugated pizza box, die-cut and folded.",
    description:
      "A branded corrugated pizza box printed in one or full colour, die-cut and creased to fold flat for storage. Built for heat and grease from a hot pizza rather than repurposed from a general shipping carton.",
    price: from(450000, 100, "box"),
    specs: {
      size: "12 x 10 x 1.5 inches",
      material: "Durable corrugated carton",
      finishing:
        "One or full colour printing with matte lamination option, die-cut and folded",
    },
    delivery: CORRUGATED_DELIVERY,
    images: [
      `${DIR}/pizza-box.jpeg`,
      `${DIR}/pizza-box-2.png`,
      `${DIR}/pizza-box-3.png`,
    ],
    imageAlt: "Branded corrugated pizza box",
    terms: [
      "pizza packaging",
      "food box",
      "takeaway box",
      "restaurant packaging",
    ],
    related: ["food-pack", "mailer-box", "party-paper-cup"],
    source: "Price list p.7",
  }),
];
