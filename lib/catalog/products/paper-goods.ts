import { defineProduct } from "./define";
import { from } from "../pricing";

const ENV_DIR = "/product-images/envelopes";
const FLYER_DIR = "/product-images/flyers-posters";
const INV_DIR = "/product-images/invitations";

const FLYER_MATERIAL = "150gsm matte paper";
const FLYER_FINISHING =
  "High quality full-colour direct-image printing, trimmed to size and wrapped for delivery.";
const FLYER_DELIVERY = {
  lagos: "Same day delivery",
  nationwide: "3-4 working days",
};
const POSTER_DELIVERY = {
  lagos: "3-5 working days",
  nationwide: "5-7 working days",
};

/** Envelopes — price list page 12. */
export const envelopes = [
  defineProduct({
    slug: "c4-envelope",
    name: "C4 Envelope",
    category: "envelopes",
    short:
      "Large branded C4 envelope on 100gsm bond paper, full colour printed.",
    description:
      "The large business envelope, sized to take an unfolded A4 document. Printed in vibrant full colour on 100gsm bond paper so contracts, proposals and certificates arrive in something that looks like it came from your brand.",
    price: from(130000, 100, "envelope"),
    specs: {
      material: "100gsm bond paper",
      finishing: "Vibrant high quality full colour printing",
    },
    delivery: { lagos: "4-7 working days", nationwide: "4-7 working days" },
    images: [`${ENV_DIR}/c4-envelope.jpeg`, `${ENV_DIR}/c4-envelope-2.jpeg`],
    imageAlt: "Large C4 business envelope with printed branding",
    terms: ["A4 envelope", "large envelope", "document envelope", "big envelope"],
    related: ["dl-small-envelope", "window-envelope", "letterheads"],
    source: "Price list p.12",
    review: [
      'The C4 entry carries two conflicting size lines: "A3 (17″ x 12″ inches)" and "A3 (10 x 12″ inches)". Neither has been published as fact — confirm the correct dimensions.',
    ],
  }),

  defineProduct({
    slug: "dl-small-envelope",
    name: "DL Envelope",
    category: "envelopes",
    short:
      "Standard DL business envelope on 100gsm bond with full-colour print.",
    description:
      "The everyday business envelope, sized for an A4 sheet folded into three. Printed in full colour on 100gsm bond paper and folded to DL specification.",
    price: from(50000, 100, "envelope"),
    specs: {
      material: "100gsm bond paper with full coloured prints",
      finishing: "Printed and folded to DL specification",
    },
    delivery: { lagos: "4-7 working days", nationwide: "4-7 working days" },
    images: [
      `${ENV_DIR}/dl-small-envelope.jpeg`,
      `${ENV_DIR}/dl-small-envelope-2.jpeg`,
    ],
    imageAlt: "Standard DL business envelope with printed branding",
    terms: ["small envelope", "business envelope", "letter envelope"],
    related: ["window-envelope", "c4-envelope", "letterheads"],
    source: "Price list p.12",
  }),

  defineProduct({
    slug: "window-envelope",
    name: "Window DL Envelope",
    category: "envelopes",
    short:
      "DL envelope with a clear address window on 100gsm bond paper.",
    description:
      "A DL envelope with a transparent window so the address printed on the enclosed letter shows through — no separate addressing step. Standard for invoices, statements and bulk mailings.",
    price: from(70000, 100, "envelope"),
    specs: {
      material: "100gsm bond paper with full coloured prints",
      finishing: "Printed and folded to DL specification",
    },
    delivery: { lagos: "4-5 working days", nationwide: "4-5 working days" },
    images: [
      `${ENV_DIR}/window-envelope.jpeg`,
      `${ENV_DIR}/window-envelope-2.png`,
      `${ENV_DIR}/window-envelope-3.jpeg`,
    ],
    imageAlt: "DL envelope with a clear address window",
    terms: ["window envelope", "invoice envelope", "statement envelope"],
    related: ["dl-small-envelope", "c4-envelope", "invoice-receipt"],
    source: "Price list p.12",
  }),
];

/** Flyers & Posters — price list pages 15-17. */
export const flyersPosters = [
  defineProduct({
    slug: "a5-flyer",
    name: "A5 Flyer",
    category: "flyers-posters",
    short:
      '5.8" x 8.3" full-colour flyer on 150gsm matte, same-day in Lagos.',
    description:
      "The standard handbill size and the workhorse of street, event and church distribution. Printed full colour using direct-image printing on 150gsm matte paper, trimmed to size and wrapped for delivery — available same day within Lagos.",
    price: from(24000, 100, "flyer"),
    specs: {
      size: '5.8" x 8.3"',
      material: FLYER_MATERIAL,
      finishing: FLYER_FINISHING,
    },
    delivery: FLYER_DELIVERY,
    images: [
      `${FLYER_DIR}/a5-flyers.png`,
      `${FLYER_DIR}/a5-flyers-2.jpeg`,
      `${FLYER_DIR}/a5-flyers-3.png`,
    ],
    imageAlt: "Stack of full-colour A5 flyers",
    featured: true,
    terms: [
      "handbill",
      "leaflet",
      "flyers",
      "handout",
      "promotional flyer",
      "same day flyer",
    ],
    related: ["a6-flyer", "dl-flyer", "a3-posters"],
    source: "Price list p.16",
  }),

  defineProduct({
    slug: "a6-flyer",
    name: "A6 Flyer",
    category: "flyers-posters",
    short: '4.13" x 5.83" compact flyer on 150gsm matte paper.',
    description:
      "A pocket-size handbill, half the area of an A5 and the cheapest per piece. Used for inserts, invitations, loyalty cards and high-volume street distribution.",
    price: from(16000, 100, "flyer"),
    specs: {
      size: '4.13" x 5.83"',
      material: "150gsm matte paper",
      finishing: FLYER_FINISHING,
    },
    delivery: FLYER_DELIVERY,
    images: [`${FLYER_DIR}/a6-flyer.jpeg`, `${FLYER_DIR}/a6-flyer-2.jpeg`],
    imageAlt: "Compact A6 flyers printed in full colour",
    terms: ["handbill", "leaflet", "small flyer", "insert card"],
    related: ["a5-flyer", "dl-flyer", "thank-you-business-card"],
    source: "Price list p.16",
  }),

  defineProduct({
    slug: "dl-flyer",
    name: "DL Flyer",
    category: "flyers-posters",
    short: "Slim DL-size flyer on 150gsm matte paper.",
    description:
      "A tall, narrow flyer sized to slip into a DL envelope or a leaflet rack without folding. The most economical size in the range and a natural fit for price lists and menus.",
    price: from(15000, 100, "flyer"),
    specs: {
      size: "DL size",
      material: FLYER_MATERIAL,
      finishing: FLYER_FINISHING,
    },
    delivery: FLYER_DELIVERY,
    images: [
      `${FLYER_DIR}/dl-flyer.jpeg`,
      `${FLYER_DIR}/dl-flyer-2.jpeg`,
      `${FLYER_DIR}/dl-flyer-3.jpeg`,
    ],
    imageAlt: "Slim DL-size flyers printed in full colour",
    terms: ["leaflet", "rack card", "menu flyer", "handbill"],
    related: ["dl-bifold-flyer", "dl-trifold-flyer", "a5-flyer"],
    source: "Price list p.16",
  }),

  defineProduct({
    slug: "dl-bifold-flyer",
    name: "DL Bifold Flyer",
    category: "flyers-posters",
    short: "DL flyer creased into two panels on 150gsm matte paper.",
    description:
      "A DL flyer creased down the middle into two panels, giving four printable faces. More room for detail than a flat flyer while still fitting a standard envelope.",
    price: from(30000, 100, "flyer"),
    specs: {
      size: "DL size, folded to two panels",
      material: FLYER_MATERIAL,
      finishing: FLYER_FINISHING,
    },
    delivery: FLYER_DELIVERY,
    images: [
      `${FLYER_DIR}/dl-bifold-flyer.jpeg`,
      `${FLYER_DIR}/dl-bifold-flyer-2.jpeg`,
    ],
    imageAlt: "DL flyer folded into two printed panels",
    terms: ["folded flyer", "bifold leaflet", "2 fold flyer", "menu"],
    related: ["dl-trifold-flyer", "dl-flyer", "tri-fold-brochure"],
    source: "Price list p.16",
  }),

  defineProduct({
    slug: "dl-trifold-flyer",
    name: "DL Trifold Flyer",
    category: "flyers-posters",
    short: "DL flyer creased into three panels on 150gsm matte paper.",
    description:
      "A DL flyer creased into three panels for six printable faces — enough for a full service list or programme while still folding down to envelope size.",
    price: from(36000, 100, "flyer"),
    specs: {
      size: "DL size, folded to three panels",
      material: FLYER_MATERIAL,
      finishing: FLYER_FINISHING,
    },
    delivery: FLYER_DELIVERY,
    images: [`${FLYER_DIR}/dl-trifold-flyer.jpeg`],
    imageAlt: "DL flyer folded into three printed panels",
    terms: ["folded flyer", "trifold leaflet", "3 fold flyer", "programme"],
    related: ["dl-bifold-flyer", "tri-fold-brochure", "dl-flyer"],
    source: "Price list p.17",
  }),

  defineProduct({
    slug: "a1-posters",
    name: "A1 Poster",
    category: "flyers-posters",
    short:
      '23.4" x 33.1" large-format poster on 150gsm art paper.',
    description:
      "The largest sheet-fed poster in the range, printed in high quality full colour on 150gsm art paper, trimmed to size and wrapped for delivery. Sized to hold attention across a hall, corridor or shopfront.",
    price: from(150000, 200, "poster"),
    specs: {
      size: "Width 23.4 inches, height 33.1 inches",
      material: "150gsm art paper",
      finishing:
        "High quality full-colour poster printing, trimmed to size and wrapped for delivery.",
    },
    delivery: POSTER_DELIVERY,
    images: [`${FLYER_DIR}/a1-posters.jpg`, `${FLYER_DIR}/a1-posters-2.png`],
    imageAlt: "Large format A1 poster printed in full colour",
    terms: ["large poster", "wall poster", "advert poster", "campaign poster"],
    related: ["a2-posters", "a3-posters", "snapper-frame"],
    source: "Price list p.15",
  }),

  defineProduct({
    slug: "a2-posters",
    name: "A2 Poster",
    category: "flyers-posters",
    short: "16.5 x 23.4 inch poster on 150gsm matte or art paper.",
    description:
      "A mid-size poster printed in high quality full colour on 150gsm matte or art paper, trimmed and packaged for delivery. The usual choice for in-store promotions and notice boards.",
    price: from(65000, 100, "poster"),
    specs: {
      size: "Width 16.5 inches, height 23.4 inches",
      material: "150gsm matte paper or art paper",
      finishing:
        "High quality full colour poster printing, trimmed and packaged for delivery.",
    },
    delivery: POSTER_DELIVERY,
    images: [`${FLYER_DIR}/a2-posters.jpg`],
    imageAlt: "A2 promotional poster printed in full colour",
    terms: ["wall poster", "advert poster", "shop poster", "campaign poster"],
    related: ["a1-posters", "a3-posters", "snapper-frame"],
    source: "Price list p.15",
  }),

  defineProduct({
    slug: "a3-posters",
    name: "A3 Poster",
    category: "flyers-posters",
    short: "11.7 x 16.5 inch poster on 150gsm matte or art paper.",
    description:
      "The most ordered poster size — large enough to read across a room, small enough to print and distribute in volume. Full-colour direct-image printing on 150gsm matte paper, trimmed to size and wrapped for delivery.",
    price: from(45000, 100, "poster"),
    specs: {
      size: "Width 11.7 inches, height 16.5 inches",
      material: "150gsm matte paper or art paper (optional)",
      finishing:
        "High quality full-colour direct-image printing on 150gsm matte paper, trimmed to size and wrapped for delivery.",
      design: "Creative design",
    },
    delivery: { lagos: "2-5 working days", nationwide: "5-7 working days" },
    images: [
      `${FLYER_DIR}/a3-posters.webp`,
      `${FLYER_DIR}/a3-posters-2.jpeg`,
      `${FLYER_DIR}/a3-posters-3.jpg`,
      `${FLYER_DIR}/a3-posters-4.jpg`,
    ],
    imageAlt: "A3 poster printed in full colour",
    featured: true,
    terms: ["wall poster", "advert poster", "shop poster", "campaign poster"],
    related: ["a2-posters", "a5-flyer", "snapper-frame"],
    source: "Price list p.16",
  }),
];

/** Invitations — price list pages 9 and 17. */
export const invitations = [
  defineProduct({
    slug: "card-invitation",
    name: "Card Invitation",
    category: "invitations",
    short:
      "5 x 7 inch invitation on 500gsm pearlescent card, supplied with envelopes.",
    description:
      "A wedding or event invitation printed front and back on heavy 500gsm pearlescent card and supplied with matching envelopes. The pearlescent stock carries a soft sheen that plain card cannot, which is why it remains the default for weddings.",
    price: from(120000, 100, "invitation"),
    specs: {
      size: "Width 5 inches, height 7 inches",
      material: "500gsm pearlescent card with envelope",
      finishing: "Full colour front and back direct image printing.",
      design: "New creative design",
    },
    delivery: { lagos: "3-5 working days", nationwide: "5-7 working days" },
    images: [
      `${INV_DIR}/card-invitation.jpeg`,
      `${INV_DIR}/card-invitation-2.jpeg`,
      `${INV_DIR}/card-invitation-3.jpeg`,
      `${INV_DIR}/card-invitation-4.jpeg`,
    ],
    imageAlt: "Pearlescent card wedding invitation with envelope",
    featured: true,
    terms: [
      "wedding invitation",
      "wedding card",
      "invitation card",
      "event invite",
      "iv card",
    ],
    related: ["acrylic-invitation", "wedding-program", "c4-envelope"],
    source: "Price list p.17",
  }),

  defineProduct({
    slug: "acrylic-invitation",
    name: "Acrylic Invitation",
    category: "invitations",
    short:
      "Transparent acrylic invitation with gold or silver foil lettering.",
    description:
      "An invitation printed onto transparent acrylic with gold or silver foil letters, paired with a pearlescent envelope card and sealed in its own envelope. The most premium option in the range, and the one guests keep.",
    price: from(850000, 100, "invitation"),
    specs: {
      size: "Width 5 inches, height 7 inches",
      material: "Transparent acrylic material with pearlescent envelope card",
      finishing: "Gold or silver foil letters, each in a sealed envelope.",
      design: "New creative design",
    },
    delivery: { lagos: "7-10 working days", nationwide: "10-15 working days" },
    images: [
      `${INV_DIR}/acrylic-invitation.jpeg`,
      `${INV_DIR}/acrylic-invitation-2.jpeg`,
      `${INV_DIR}/acrylic-invitation-3.jpeg`,
      `${INV_DIR}/acrylic-invitation-4.jpeg`,
    ],
    imageAlt: "Transparent acrylic wedding invitation with gold foil lettering",
    featured: true,
    terms: [
      "wedding invitation",
      "acrylic wedding card",
      "luxury invitation",
      "glass invitation",
      "clear invitation",
    ],
    related: ["card-invitation", "wedding-program"],
    source: "Price list p.17",
  }),

  defineProduct({
    slug: "wedding-program",
    name: "A5 Wedding Programme",
    category: "invitations",
    short:
      "10-page A5 wedding programme, foiled and matte laminated, stitched.",
    description:
      "A 10-page A5 order-of-service booklet on a 300gsm art card cover with 135gsm matte inner pages. Printed full colour with matte lamination, foil lettering or spot effect on photographs, and finished with stitching.",
    price: from(135000, 100, "programme"),
    specs: {
      size: "Width 5.827 inches, height 8.268 inches",
      pages: "10 pages",
      material: "300gsm art card cover with 135gsm matte paper inner pages",
      finishing:
        "Full colour direct image printing with matte lamination, foil letter or picture spot effect, finished with stitching.",
      design: "New creative design",
    },
    delivery: { lagos: "3-7 working days", nationwide: "7-9 working days" },
    images: [
      `${INV_DIR}/wedding-program.jpeg`,
      `${INV_DIR}/wedding-program-2.jpeg`,
      `${INV_DIR}/wedding-program-3.jpg`,
      `${INV_DIR}/wedding-program-4.jpeg`,
    ],
    imageAlt: "A5 wedding programme booklet with foiled cover",
    terms: [
      "order of service",
      "wedding booklet",
      "wedding programme",
      "church programme",
      "event programme",
    ],
    related: ["card-invitation", "acrylic-invitation", "funeral-brochure"],
    source: "Price list p.9",
  }),

  defineProduct({
    slug: "wedding-passport-invite",
    name: "Wedding Passport Invite",
    category: "invitations",
    short:
      "A6 passport-style invitation with boarding pass and acrylic aeroplane.",
    description:
      "A novelty invitation set built as a passport and boarding pass: 500gsm art card for the passport, 500gsm matte card for the boarding pass, and an acrylic aeroplane, printed front and back with a gold or silver foil logo and sealed in an envelope.",
    published: false,
    specs: {
      size: "A6",
      material:
        "500gsm art card passport, 500gsm matte card boarding pass, with acrylic aeroplane",
      finishing:
        "Full colour front and back vibrant digital printing with gold or silver foil logo, each in a sealed envelope.",
      design: "New creative design",
    },
    delivery: { lagos: "5-7 working days", nationwide: "7-10 working days" },
    images: [`${INV_DIR}/card-invitation.jpeg`],
    imageAlt: "Wedding invitation card set",
    terms: ["passport invitation", "boarding pass invite", "travel wedding invite"],
    related: ["card-invitation", "acrylic-invitation"],
    source: "Price list p.17",
    review: [
      "UNPUBLISHED — needs two things before going live. (1) Price is contradictory: the entry says \"STARTING FROM ₦2,000 PER 100PCS\" while a line above it says \"price starting at ₦2850.00\". ₦2,000 for 100 multi-part invitation sets is not credible; neither figure has been published. (2) There is no photograph of this product; the card invitation image is standing in.",
    ],
  }),
];
