import { defineProduct } from "./define";
import { from } from "../pricing";

const DIR = "/product-images/banners&largeformat";

const LARGE_FORMAT_DELIVERY = {
  lagos: "3-5 working days",
  nationwide: "5-7 working days",
};

/** Banners & Large Format — price list pages 4-6. */
export const banners = [
  defineProduct({
    slug: "big-base-rollup",
    name: "Big Base Roll-Up Banner",
    category: "banners-large-format",
    short:
      "Wide-base retractable roll-up banner printed on solite or flex material.",
    description:
      "A retractable roll-up banner on a heavy wide base, printed full colour on solite or flex banner material. The wide base gives more stability in busy halls and outdoor-adjacent spaces than a standard stand, and the hardware is reusable — only the printed panel needs replacing for the next campaign.",
    price: from(60000, 1, "banner"),
    specs: {
      material: "Solite or flex banner material",
      finishing: "Full colour, mounted on a roll-up stand",
    },
    delivery: LARGE_FORMAT_DELIVERY,
    images: [
      `${DIR}/big-base-rollup.jpeg`,
      `${DIR}/big-base-rollup-2.jpeg`,
      `${DIR}/big-base-rollup-3.jpeg`,
    ],
    imageAlt: "Retractable roll-up banner on a wide base stand",
    featured: true,
    terms: ["pull up banner", "retractable banner", "standee", "roll up stand"],
    related: ["small-base-rollup", "x-banner", "pop-stand-banner"],
    source: "Price list p.4",
  }),

  defineProduct({
    slug: "small-base-rollup",
    name: "Small Base Roll-Up Banner",
    category: "banners-large-format",
    short:
      "Compact retractable roll-up banner for reception areas and small stands.",
    description:
      "The standard retractable roll-up, printed full colour on solite or flex banner material and mounted on a slim base. Light enough to move between offices, receptions and events, and the stand is reusable across campaigns.",
    price: from(50000, 1, "banner"),
    specs: {
      material: "Solite or flex banner material",
      finishing: "Full colour, mounted on a roll-up stand",
    },
    delivery: LARGE_FORMAT_DELIVERY,
    images: [
      `${DIR}/small-base-rollup.png`,
      `${DIR}/small-base-rollup-2.png`,
      `${DIR}/small-base-rollup-3.png`,
    ],
    imageAlt: "Compact retractable roll-up banner on a slim base stand",
    terms: ["pull up banner", "retractable banner", "standee", "roll up stand"],
    related: ["big-base-rollup", "x-banner", "teardrop-banner"],
    source: "Price list p.4",
  }),

  defineProduct({
    slug: "x-banner",
    name: "X-Banner",
    category: "banners-large-format",
    short:
      "60cm x 160cm solite banner mounted on a lightweight X-frame stand.",
    description:
      "A printed solite panel tensioned onto a folding X-frame — the lightest and most portable of the banner stands. Trims down to a slim carry bag, which makes it the practical choice for roadshows and pop-up stands.",
    price: from(37000, 1, "banner"),
    specs: {
      size: "60cm x 160cm",
      material: "Solite material with X-stand",
      finishing: "Fully trimmed and mounted to the X-stand",
    },
    delivery: LARGE_FORMAT_DELIVERY,
    images: [`${DIR}/x-banner.png`, `${DIR}/x-banner-2.png`],
    imageAlt: "Printed X-banner mounted on a folding X-frame stand",
    terms: ["x stand banner", "portable banner", "standee"],
    related: ["small-base-rollup", "big-base-rollup", "teardrop-banner"],
    source: "Price list p.6",
  }),

  defineProduct({
    slug: "pop-stand-banner",
    name: "Pop-Up Stand Backdrop",
    category: "banners-large-format",
    short:
      "Reusable aluminium pop-up backdrop in 3m x 3m and 4m x 3m.",
    description:
      "A seamless branded wall built from a reusable aluminium pop-up frame with a printed flex banner tensioned across it. This is the backdrop most exhibition stands and press walls use, because the frame collapses into a case and only the graphic changes between events.",
    price: from(300000, 1, "backdrop"),
    specs: {
      size: "3m x 3m and 4m x 3m options",
      material: "Flex banner with reusable aluminium pop stand",
      finishing:
        "Full colour printing on flex banner, trimmed and applied to the frame",
    },
    delivery: LARGE_FORMAT_DELIVERY,
    options: [
      {
        id: "size",
        label: "Size",
        affectsPrice: true,
        options: [
          {
            id: "3x3",
            label: "3 metres x 3 metres",
            price: from(300000, 1, "backdrop"),
          },
          {
            id: "4x3",
            label: "4 metres x 3 metres",
            price: from(410000, 1, "backdrop"),
          },
        ],
      },
    ],
    images: [
      `${DIR}/pop-stand-banner.png`,
      `${DIR}/pop-stand-banner-2.png`,
      `${DIR}/pop-stand-banner-3.jpg`,
      `${DIR}/pop-stand-banner-4.jpg`,
    ],
    imageAlt: "Aluminium pop-up exhibition backdrop with printed graphic",
    featured: true,
    terms: [
      "press wall",
      "step and repeat",
      "exhibition backdrop",
      "trade show stand",
      "media wall",
    ],
    related: ["event-backdrop", "instagram-frame-board", "gazebo-tent"],
    source: "Price list p.5",
  }),

  defineProduct({
    slug: "event-backdrop",
    name: "Event Backdrop",
    category: "banners-large-format",
    short:
      "10ft x 10ft flex banner backdrop mounted on a 3D wooden frame stand.",
    description:
      "A full-size stage or photo backdrop: a printed flex banner stretched and firmly mounted onto a wooden 3D frame. Used for weddings, conferences, church programmes and product launches where a free-standing wall is needed.",
    price: from(285000, 1, "backdrop"),
    specs: {
      size: "10ft x 10ft",
      material: "Flex banner with wooden frame stand",
      finishing: "Firm mounting of the flex banner on the wooden 3D frame",
    },
    delivery: LARGE_FORMAT_DELIVERY,
    images: [
      `${DIR}/event-backdrops.png`,
      `${DIR}/event-backdrop-2.png`,
      `${DIR}/event-backdrop-3.png`,
      `${DIR}/event-backdrop-4.png`,
    ],
    imageAlt: "Printed event backdrop mounted on a wooden frame stand",
    terms: [
      "stage backdrop",
      "wedding backdrop",
      "photo backdrop",
      "banner wall",
    ],
    related: ["pop-stand-banner", "instagram-frame-board", "gazebo-tent"],
    source: "Price list p.4",
  }),

  defineProduct({
    slug: "teardrop-banner",
    name: "Teardrop Banner",
    category: "banners-large-format",
    short:
      "Curved fabric flag in 2.5m and 3.5m, hemmed with an aluminium stand.",
    description:
      "A teardrop-shaped fabric flag printed in full colour, hemmed all round with a pole pocket and supplied with an aluminium stand. The curved profile holds its shape in wind, which makes it the usual choice for outdoor forecourts, sports events and street activations.",
    price: from(140000, 1, "flag"),
    specs: {
      size: "2.5 metre and 3.5 metre options",
      material: "Full colour flag fabric",
      finishing:
        "Hemmed all round with a pole pocket on the stand side, supplied with aluminium stand accessory",
    },
    delivery: LARGE_FORMAT_DELIVERY,
    options: [
      {
        id: "height",
        label: "Height",
        affectsPrice: true,
        options: [
          { id: "2-5m", label: "2.5 metres", price: from(140000, 1, "flag") },
          { id: "3-5m", label: "3.5 metres", price: from(160000, 1, "flag") },
        ],
      },
    ],
    images: [`${DIR}/teardrop-banner.png`, `${DIR}/teardrop-banner-2.png`],
    imageAlt: "Curved teardrop fabric flag on an aluminium stand",
    terms: ["flag banner", "outdoor flag", "beach flag", "bow flag"],
    related: ["feather-banner", "x-banner", "lamp-post-banner"],
    source: "Price list p.5",
  }),

  defineProduct({
    slug: "feather-banner",
    name: "Feather Banner",
    category: "banners-large-format",
    short:
      "Tall feather-shaped fabric flag in 2.5m and 3.5m with aluminium stand.",
    description:
      "A tall, narrow feather flag printed on full colour flag fabric, hemmed all round with a pole pocket and supplied with an aluminium stand. Taller and more visible from a distance than a teardrop, and just as quick to set up.",
    price: from(165000, 1, "flag"),
    specs: {
      size: "2.5 metre and 3.5 metre options",
      material: "Full colour flag fabric",
      finishing:
        "Hemmed all round with a pole pocket on the stand side, supplied with aluminium stand accessory",
    },
    delivery: LARGE_FORMAT_DELIVERY,
    options: [
      {
        id: "height",
        label: "Height",
        affectsPrice: true,
        options: [
          { id: "2-5m", label: "2.5 metres", price: from(165000, 1, "flag") },
          { id: "3-5m", label: "3.5 metres", price: from(205000, 1, "flag") },
        ],
      },
    ],
    images: [`${DIR}/flag-banner.png`],
    imageAlt: "Tall feather-shaped fabric flag banner on a stand",
    terms: ["flag banner", "outdoor flag", "beach flag", "swooper flag"],
    related: ["teardrop-banner", "x-banner", "lamp-post-banner"],
    source: "Price list p.5",
  }),

  defineProduct({
    slug: "gazebo-tent",
    name: "Gazebo Tent",
    category: "banners-large-format",
    short:
      "Branded pop-up gazebo canopy in 2 metre and 3 metre sizes.",
    description:
      "A pop-up gazebo with your artwork printed full colour across the canopy — used for outdoor activations, market stands, sampling and site offices. Both sizes fold down onto a wheeled frame for transport.",
    price: from(460000, 1, "tent"),
    specs: {
      size: "2 metre and 3 metre options",
      material: "Pop-up gazebo canopy",
      finishing: "Full colour print on canopy material",
    },
    delivery: LARGE_FORMAT_DELIVERY,
    options: [
      {
        id: "size",
        label: "Size",
        affectsPrice: true,
        options: [
          { id: "2m", label: "2 metres", price: from(460000, 1, "tent") },
          { id: "3m", label: "3 metres", price: from(550000, 1, "tent") },
        ],
      },
    ],
    images: [
      `${DIR}/gazebo-tent.png`,
      `${DIR}/gazebo-tent-2.png`,
      `${DIR}/gazebo-tent-3.png`,
    ],
    imageAlt: "Branded pop-up gazebo tent with printed canopy",
    terms: ["canopy tent", "marquee", "event tent", "branded gazebo"],
    related: ["event-backdrop", "pop-stand-banner", "teardrop-banner"],
    source: "Price list p.5",
  }),

  defineProduct({
    slug: "snapper-frame",
    name: "Snapper Frame",
    category: "banners-large-format",
    short:
      "Aluminium snap frame with PVC print, in A4, A3, A2 and A1.",
    description:
      "An aluminium poster frame with hinged snap edges: the front opens so the printed PVC panel can be swapped in seconds without dismantling anything. Standard fitting for menus, price lists, cinema and lobby displays where the content changes often.",
    price: from(23000, 1, "frame"),
    specs: {
      size: "A4, A3, A2 and A1 options",
      material: "Aluminium frame",
      finishing: "Full colour printing on PVC",
    },
    delivery: LARGE_FORMAT_DELIVERY,
    options: [
      {
        id: "size",
        label: "Size",
        affectsPrice: true,
        options: [
          { id: "a4", label: "A4", price: from(23000, 1, "frame") },
          { id: "a3", label: "A3", price: from(26500, 1, "frame") },
          { id: "a2", label: "A2", price: from(31000, 1, "frame") },
          { id: "a1", label: "A1", price: from(35000, 1, "frame") },
        ],
      },
    ],
    images: [
      `${DIR}/snapper-frame.png`,
      `${DIR}/snapper-frame-2.png`,
      `${DIR}/snapper-frame-3.png`,
    ],
    imageAlt: "Aluminium snap frame holding a printed poster",
    terms: ["snap frame", "poster frame", "menu frame", "display frame"],
    related: ["a2-posters", "a3-posters", "instagram-frame-board"],
    source: "Price list p.6",
  }),

  defineProduct({
    slug: "instagram-frame-board",
    name: "Instagram Frame Board",
    category: "banners-large-format",
    short:
      "5mm foam board photo frame prop finished in adhesive vinyl.",
    description:
      "A hand-held photo frame prop cut from 5mm foam board and wrapped in full-colour adhesive vinyl. A low-cost way to get your hashtag and branding into every guest photo at an event.",
    price: from(28000, 1, "board"),
    specs: {
      material: "5mm foam board",
      finishing: "Full colour print on top quality adhesive sticker (SAV)",
    },
    delivery: LARGE_FORMAT_DELIVERY,
    images: [
      `${DIR}/instagram-frame-board.png`,
      `${DIR}/instagram-frame-board-2.png`,
    ],
    imageAlt: "Hand-held Instagram photo frame prop on foam board",
    terms: ["photo frame prop", "selfie frame", "hashtag frame", "event prop"],
    related: ["event-backdrop", "dummy-cheque", "pop-stand-banner"],
    source: "Price list p.6",
  }),

  defineProduct({
    slug: "dummy-cheque",
    name: "Dummy Cheque",
    category: "banners-large-format",
    short:
      "3ft x 1.5ft presentation cheque on 5mm foam board.",
    description:
      "An oversized presentation cheque printed on adhesive vinyl and mounted on 5mm foam board — used for donations, prize hand-overs, sponsorship announcements and CSR photo calls.",
    price: from(28000, 1, "cheque"),
    specs: {
      size: "3ft x 1.5ft",
      material: "5mm foam board",
      finishing: "Full colour print on top quality adhesive sticker (SAV)",
    },
    delivery: LARGE_FORMAT_DELIVERY,
    images: [`${DIR}/dummy-cheques.png`],
    imageAlt: "Oversized presentation cheque printed on foam board",
    terms: [
      "giant cheque",
      "presentation cheque",
      "prize cheque",
      "big cheque",
      "donation cheque",
    ],
    related: ["instagram-frame-board", "dummy-currency-note", "event-backdrop"],
    source: "Price list p.4",
  }),

  defineProduct({
    slug: "dispatch-box",
    name: "Dispatch Box Branding",
    category: "banners-large-format",
    short:
      "21 x 21 inch dispatch box wrapped in full-colour adhesive vinyl.",
    description:
      "Branding for a rider's dispatch box, printed on top-quality adhesive vinyl and applied cleanly with no bubbles or squeeze. Turns every delivery run into moving advertising for logistics companies and food brands.",
    price: from(32000, 1, "box"),
    specs: {
      size: "21 x 21 inches",
      material: "Top quality adhesive sticker (SAV) or vinyl",
      finishing:
        "Full colour print on top quality adhesive sticker (SAV), applied cleanly without bubbles or squeeze",
    },
    delivery: LARGE_FORMAT_DELIVERY,
    images: [`${DIR}/dispatch-boxes.png`, `${DIR}/dispatch-box-2.png`],
    imageAlt: "Delivery rider dispatch box wrapped in branded vinyl",
    terms: [
      "delivery box branding",
      "rider box",
      "bike box branding",
      "dispatch branding",
    ],
    related: ["vehicle-branding", "sticker-print", "courier-bag"],
    source: "Price list p.4",
  }),

  defineProduct({
    slug: "lamp-post-banner",
    name: "Lamp Post Banner",
    category: "banners-large-format",
    short:
      "2ft x 5ft street pole banner supplied and installed with screw kits.",
    description:
      "Flex banners mounted onto streetlight poles with screw kits, priced per set of 10 with installation included. Used for estate and campus wayfinding, street-level campaigns and event routes.",
    price: from(80000, 10, "banner", "includes installation"),
    specs: {
      size: "2ft x 5ft",
      material: "Flex banner with screw kits",
      finishing: "Firm mounting on streetlight pole with screw kits",
    },
    delivery: LARGE_FORMAT_DELIVERY,
    images: [`${DIR}/lampost-banner.png`, `${DIR}/lampost-banner-2.png`],
    imageAlt: "Street pole banners mounted on lamp posts",
    terms: ["street pole banner", "pole banner", "lamppost flag", "street sign"],
    related: ["teardrop-banner", "feather-banner", "event-backdrop"],
    source: "Price list p.6",
  }),

  defineProduct({
    slug: "sticker-print",
    name: "Vinyl Stickers",
    category: "banners-large-format",
    short:
      "Adhesive vinyl stickers in bumper, square and round shapes.",
    description:
      "Full-colour stickers printed on adhesive vinyl (SAV) and trimmed to size. Bumper stickers suit vehicles and laptops, while square and round stickers are the standard for product labelling, seals and packaging.",
    price: from(10000, 75, "sticker", "bumper stickers"),
    specs: {
      size: "Bumper 3 x 7 inches, square and round 3.5 x 3.5 inches",
      material: "Adhesive vinyl (SAV)",
      finishing: "Neat printing and trimmed to size",
    },
    delivery: LARGE_FORMAT_DELIVERY,
    options: [
      {
        id: "shape",
        label: "Shape",
        affectsPrice: true,
        options: [
          {
            id: "bumper",
            label: "Bumper",
            detail: "3 x 7 inches",
            price: from(10000, 75, "sticker"),
          },
          {
            id: "square",
            label: "Square",
            detail: "3.5 x 3.5 inches",
            price: from(11000, 100, "sticker"),
          },
          {
            id: "round",
            label: "Round",
            detail: "3.5 x 3.5 inches",
            price: from(16000, 100, "sticker"),
          },
        ],
      },
    ],
    images: [`${DIR}/sticker-print.jpeg`, `${DIR}/sticker-print-2.jpeg`],
    imageAlt: "Printed adhesive vinyl stickers in round and square shapes",
    featured: true,
    terms: [
      "sticker printing",
      "label sticker",
      "vinyl decal",
      "product sticker",
      "bumper sticker",
    ],
    related: ["dispatch-box", "woven-label", "cloth-paper-tag"],
    source: "Price list p.6",
    review: [
      'The square sticker entry carries a stray heading "From: ₦0,000" alongside the real price of ₦11,000 per 100. The ₦0,000 placeholder has been ignored; the printed ₦11,000 is used.',
    ],
  }),

  defineProduct({
    slug: "vehicle-branding",
    name: "Vehicle Branding",
    category: "banners-large-format",
    short:
      "Full and partial vehicle wraps in printed adhesive vinyl.",
    description:
      "Cars, buses and delivery vans wrapped in printed adhesive vinyl and applied to a clean finish. Because coverage depends on the vehicle body, panels and how much of it you want covered, vehicle branding is quoted per job rather than from a fixed price.",
    specs: {
      material: "Printed adhesive vinyl (SAV)",
      finishing:
        "Full colour print applied to vehicle panels for a clean finish without bubbles",
    },
    delivery: LARGE_FORMAT_DELIVERY,
    images: [
      `${DIR}/vehicle-branding.png`,
      `${DIR}/vehicle-branding-2.png`,
      `${DIR}/vehicle-branding-3.png`,
    ],
    imageAlt: "Delivery van wrapped in printed branding vinyl",
    terms: [
      "car branding",
      "van wrap",
      "bus branding",
      "vehicle wrap",
      "fleet branding",
    ],
    related: ["dispatch-box", "sticker-print"],
    source: "Not listed in the supplied price list",
    review: [
      "Vehicle branding exists in the live catalogue but has no entry in the supplied price list. No price is published for it here rather than inventing one — the page asks the customer for a quote. Add a price to the price list if one exists.",
    ],
  }),
];
