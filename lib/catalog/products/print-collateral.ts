import { defineProduct } from "./define";
import { from } from "../pricing";

const BROCHURE_DIR = "/product-images/brochures";
const CARD_DIR = "/product-images/business-cards";
const CAL_DIR = "/product-images/calendars";

/** Brochures — price list page 8. */
export const brochures = [
  defineProduct({
    slug: "a4-landscape-brochure",
    name: "A4 Landscape Brochure",
    category: "brochures",
    short:
      "10-page landscape brochure, 300gsm art card cover with 150gsm matte inner pages.",
    description:
      "A landscape-format brochure that gives photography and product shots room to breathe across a double-page spread. Printed full colour with matte lamination, spot effect on images and foiled lettering, then stitched or perfect bound.",
    price: from(350000, 100, "brochure"),
    specs: {
      size: "Width 8.268 inches, height 11.7 inches",
      pages: "10 pages",
      material: "300gsm art card cover with 150gsm matte paper inner pages",
      finishing:
        "Full colour printing with matte lamination, picture spot effect and foiled letters, stitched or perfect bound.",
      design: "New creative design",
    },
    delivery: { lagos: "5-7 working days", nationwide: "7-10 working days" },
    images: [
      `${BROCHURE_DIR}/a4-landscape-brochure.png`,
      `${BROCHURE_DIR}/a4-landscape-brochure-2.png`,
    ],
    imageAlt: "Landscape A4 brochure opened to a printed spread",
    featured: true,
    terms: [
      "company profile",
      "catalogue",
      "booklet printing",
      "product brochure",
      "annual report",
    ],
    related: ["a4-portrait-brochure", "tri-fold-brochure", "funeral-brochure"],
    source: "Price list p.8",
    review: [
      'The entry carries a secondary line, "14 pages A4 landscape funeral brochure price starting at ₦3,300.00", which describes a different page count and product from the 10-page brochure it sits under. Only the headline ₦350,000 per 100 has been used; confirm whether the ₦3,300 line belongs elsewhere.',
    ],
  }),

  defineProduct({
    slug: "a4-portrait-brochure",
    name: "A4 Portrait Brochure",
    category: "brochures",
    short:
      "6-page portrait brochure with a laminated 300gsm art card cover.",
    description:
      "The standard company-profile format: portrait A4, printed full colour using direct-image printing on a 300gsm art card cover with 150gsm matte inner sheets, finished with saddle stitching or optional perfect binding.",
    price: from(250000, 100, "brochure"),
    specs: {
      size: "Width 8.3 inches, height 11.7 inches",
      pages: "6 pages",
      material: "300gsm art card cover, 150gsm matte paper inner sheets",
      finishing:
        "Full colour direct-image printing, matte or gloss laminated cover, finished with saddle stitching or optional perfect binding.",
      design: "New custom creative design",
    },
    delivery: { lagos: "5-7 working days", nationwide: "7-10 working days" },
    images: [
      `${BROCHURE_DIR}/a4-portrait-brochure.png`,
      `${BROCHURE_DIR}/a4-portrait-brochure-2.png`,
      `${BROCHURE_DIR}/a4-portrait-brochure-3.jpeg`,
    ],
    imageAlt: "Portrait A4 company profile brochure with printed cover",
    terms: [
      "company profile",
      "catalogue",
      "booklet printing",
      "corporate profile",
      "prospectus",
    ],
    related: ["a4-landscape-brochure", "tri-fold-brochure", "letterheads"],
    source: "Price list p.8",
  }),

  defineProduct({
    slug: "funeral-brochure",
    name: "Funeral Brochure",
    category: "brochures",
    short:
      "32-page memorial programme with biography, tributes and photo gallery.",
    description:
      "A full memorial programme covering biography, tributes, the order of service and a photo gallery across 32 pages. Printed full colour on a 300gsm art card cover with 135gsm matte inner pages, matte laminated with foiled lettering and spot effect on photographs, then stitched or perfect bound.",
    price: from(750000, 100, "brochure"),
    specs: {
      size: "Width 8.268 inches, height 11.7 inches",
      pages: "32 pages",
      material: "300gsm art card cover with 135gsm matte paper inner pages",
      finishing:
        "Full colour printing with matte lamination, picture spot effect and foiled letters, stitched or perfect bound.",
      design:
        "New creative design including biography, tributes, church programme, photo gallery and memories",
    },
    delivery: { lagos: "5-7 working days", nationwide: "7-9 working days" },
    images: [
      `${BROCHURE_DIR}/funeral-brochure.jpeg`,
      `${BROCHURE_DIR}/funeral-brochure-2.jpeg`,
      `${BROCHURE_DIR}/funeral-brochure-3.jpeg`,
      `${BROCHURE_DIR}/funeral-brochure-4.png`,
    ],
    imageAlt: "Memorial funeral programme brochure with photo cover",
    terms: [
      "burial programme",
      "memorial programme",
      "order of service",
      "obituary booklet",
      "tribute booklet",
    ],
    related: ["a4-portrait-brochure", "wedding-program", "a4-landscape-brochure"],
    source: "Price list p.8",
  }),

  defineProduct({
    slug: "tri-fold-brochure",
    name: "Tri-Fold Brochure",
    category: "brochures",
    short:
      "A4 sheet creased into three panels, on matte paper or 300gsm art card.",
    description:
      "One A4 sheet printed front and back, creased and trimmed into three panels. It carries far more copy than a flyer while still fitting a pocket or a leaflet rack, which makes it the default for service menus, price lists and event programmes.",
    price: from(60000, 100, "brochure", "on paper"),
    specs: {
      size: "Width 3.83 inches, height 8.3 inches after folding",
      material: "135gsm matte paper with a 300gsm art card option",
      finishing:
        "Full colour front and back direct image printing, creased and trimmed to size. One A4 sheet folded to three panels.",
      design: "New creative design",
    },
    delivery: { lagos: "3-5 working days", nationwide: "5-7 working days" },
    options: [
      {
        id: "stock",
        label: "Paper stock",
        affectsPrice: true,
        options: [
          {
            id: "paper",
            label: "135gsm matte paper",
            price: from(60000, 100, "brochure"),
          },
          {
            id: "card",
            label: "300gsm art card",
            price: from(100000, 100, "brochure"),
          },
        ],
      },
    ],
    images: [`${BROCHURE_DIR}/trifold.png`, `${BROCHURE_DIR}/trifold-2.png`],
    imageAlt: "Tri-fold brochure folded into three printed panels",
    terms: [
      "leaflet",
      "folded flyer",
      "service menu",
      "pamphlet",
      "3 fold brochure",
    ],
    related: ["dl-trifold-flyer", "a4-portrait-brochure", "a5-flyer"],
    source: "Price list p.8",
  }),
];

/** Business Cards — price list page 9. */
export const businessCards = [
  defineProduct({
    slug: "premium-business-card",
    name: "Premium Business Card",
    category: "business-cards",
    short:
      "3.5 x 2.1 inch card on 300gsm or 600gsm art stock, laminated, 1-3 day turnaround.",
    description:
      "A standard-size business card printed full colour on art card stock, with a choice of 300gsm or the noticeably heavier 600gsm, matte or gloss lamination, and round or square corners. Turnaround is 1-3 days, so it works when you need cards before an event rather than after it.",
    price: from(20000, 100, "card"),
    specs: {
      size: "3.5 x 2.1 inches",
      material: "Art card paper stock in 300gsm and 600gsm thickness options",
      finishing:
        "Full colour printing, matte or gloss lamination, with round or square corner options.",
    },
    delivery: { lagos: "1-3 days" },
    options: [
      {
        id: "thickness",
        label: "Card thickness",
        affectsPrice: false,
        options: [
          { id: "300gsm", label: "300gsm art card" },
          { id: "600gsm", label: "600gsm art card" },
        ],
      },
      {
        id: "lamination",
        label: "Lamination",
        affectsPrice: false,
        options: [
          { id: "matte", label: "Matte lamination" },
          { id: "gloss", label: "Gloss lamination" },
        ],
      },
      {
        id: "corners",
        label: "Corners",
        affectsPrice: false,
        options: [
          { id: "square", label: "Square corners" },
          { id: "round", label: "Round corners" },
        ],
      },
    ],
    images: [`${CARD_DIR}/premium-business-card.png`, `${CARD_DIR}/top-quality-business-card.png`],
    imageAlt: "Stack of premium matte laminated business cards",
    featured: true,
    terms: [
      "complimentary card",
      "visiting card",
      "name card",
      "calling card",
      "business cards",
    ],
    related: ["thank-you-business-card", "letterheads", "file-presentation-folder"],
    source: "Price list p.9",
  }),

  defineProduct({
    slug: "thank-you-business-card",
    name: "Thank You Card",
    category: "business-cards",
    short:
      "A6 card on 600gsm matte stock carrying your logo, contact details and message.",
    description:
      "An A6 card printed on heavy 600gsm matte stock, designed to go into the parcel with an order: your logo, contact details and a thank-you message. Online stores use these to turn a delivery into a repeat customer.",
    price: from(50000, 100, "card"),
    specs: {
      size: "A6 — width 4.134 inches, height 5.827 inches",
      material: "600gsm matte card paper stock",
      finishing:
        "Full colour printing with optional matte or gloss lamination.",
      design: "Your company logo, contact information and thank-you message",
    },
    delivery: { lagos: "3-5 working days", nationwide: "5-7 working days" },
    images: [
      `${CARD_DIR}/thank-you-business-card.jpeg`,
      `${CARD_DIR}/thank-you-business-card-2.jpeg`,
    ],
    imageAlt: "A6 thank you card printed on heavy matte stock",
    terms: [
      "thank you note",
      "insert card",
      "packaging insert",
      "appreciation card",
    ],
    related: ["premium-business-card", "mailer-box", "courier-bag"],
    source: "Price list p.9",
  }),
];

/** Calendars — price list page 9. */
export const calendars = [
  defineProduct({
    slug: "a2-wall-calendar",
    name: "A2 Wall Calendar",
    category: "calendars",
    short:
      "Large 16.54 x 23.39 inch wall calendar, 7 pages, Wire-O bound.",
    description:
      "The largest wall calendar in the range, running two months per page across 7 pages on 150gsm matte or art paper with spiral Wire-O binding. Sized to stay readable across an office or reception wall.",
    price: from(600000, 100, "calendar"),
    specs: {
      size: "16.54 x 23.39 inches",
      pages: "7 pages, two months per page",
      material: "150gsm matte or art paper",
      finishing: "Full colour print with spiral Wire-O binding",
    },
    delivery: { lagos: "3-4 days" },
    images: [
      `${CAL_DIR}/a2-single-page-wall-calendar.png`,
      `${CAL_DIR}/a2-multiple-page-wall-calendar.png`,
      `${CAL_DIR}/a2-wall-calendar-3.png`,
    ],
    imageAlt: "Large A2 wall calendar with spiral binding",
    terms: [
      "corporate calendar",
      "office calendar",
      "year planner",
      "almanac",
      "wall calendar",
    ],
    related: ["a3-wall-calendar", "table-calendar", "letterheads"],
    source: "Price list p.9",
  }),

  defineProduct({
    slug: "a3-wall-calendar",
    name: "A3 Wall Calendar",
    category: "calendars",
    short:
      "11.69 x 16.54 inch wall calendar, 7 pages, Wire-O bound.",
    description:
      "The most ordered corporate calendar size: two months per page across 7 pages on 150gsm matte or art paper, spiral Wire-O bound. Big enough to write on, small enough to send out as a year-end gift in volume.",
    price: from(24000, 10, "calendar"),
    specs: {
      size: "11.69 x 16.54 inches",
      pages: "7 pages, two months per page",
      material: "150gsm matte or art paper",
      finishing: "Full colour print with spiral Wire-O binding",
    },
    delivery: { lagos: "3-4 days" },
    images: [
      `${CAL_DIR}/a3-single-page-wall-calendar.png`,
      `${CAL_DIR}/a3-multiple-page-wall-calendar.png`,
      `${CAL_DIR}/a3-wall-calendar-3.jpeg`,
    ],
    imageAlt: "A3 wall calendar with spiral Wire-O binding",
    featured: true,
    terms: [
      "corporate calendar",
      "office calendar",
      "year planner",
      "almanac",
      "wall calendar",
    ],
    related: ["a2-wall-calendar", "table-calendar", "a5-notebook"],
    source: "Price list p.9",
  }),

  defineProduct({
    slug: "table-calendar",
    name: "Table Calendar",
    category: "calendars",
    short:
      "Desk calendar on 250gsm card, in one-month or two-month page layouts.",
    description:
      "A standing desk calendar on 250gsm matte or art card, laminated and Wire-O bound. Choose two months per page for a compact 7-page set, or one month per page when you want a full spread for each month.",
    price: from(36000, 10, "calendar", "two months per page"),
    specs: {
      pages: "7 pages, two months per page (one month per page also available)",
      material: "250gsm matte or art card",
      finishing:
        "Full colour print, matte or gloss lamination, with spiral Wire-O binding",
    },
    delivery: { lagos: "3-4 days" },
    options: [
      {
        id: "layout",
        label: "Page layout",
        affectsPrice: true,
        options: [
          {
            id: "two-month",
            label: "Two months per page",
            price: from(36000, 10, "calendar"),
          },
          {
            id: "one-month",
            label: "One month per page",
            price: from(54000, 10, "calendar"),
          },
        ],
      },
    ],
    images: [
      `${CAL_DIR}/table-calendar.jpeg`,
      `${CAL_DIR}/table-calendar-2.png`,
      `${CAL_DIR}/table-calendar-3.png`,
    ],
    imageAlt: "Standing desk table calendar with spiral binding",
    featured: true,
    terms: [
      "desk calendar",
      "corporate calendar",
      "office calendar",
      "standing calendar",
    ],
    related: ["a3-wall-calendar", "a2-wall-calendar", "block-pad"],
    source: "Price list p.9",
    review: [
      'The table calendar entry lists its size as "3.5 x 2.1 INCHES", which is the business card size copied from the entry above it on the same page. The size has been left off rather than guessed at — confirm the real desk calendar dimensions.',
    ],
  }),
];
