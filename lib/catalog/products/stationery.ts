import { defineProduct } from "./define";
import { from } from "../pricing";

const DIR = "/product-images/office-stationery";
const CAMP_DIR = "/product-images/campaign-materials";

/**
 * Several entries on pages 18-19 of the price list carry amounts inflated by
 * three orders of magnitude (₦140,000,000 for 100 presentation folders,
 * ₦4,000,000 for a single ID card, and so on). Those are transcription errors
 * in the source, not real prices.
 *
 * Rather than guess at the intended figure — or publish a number that would
 * mislead a customer — those products carry no `startingPrice`. The page asks
 * for a quote instead, and the exact printed value is recorded in
 * `dataReview` so it can be corrected at source.
 */
export const stationery = [
  defineProduct({
    slug: "letterheads",
    name: "Letterhead",
    category: "office-stationery",
    short:
      "A4 company letterhead on 150gsm matte or conqueror paper, same day in Lagos.",
    description:
      "Company letterheads printed full colour by direct image on 150gsm matte or conqueror paper, trimmed and cut to size. Available for same-day delivery within Lagos, which matters when a proposal has to go out today.",
    specs: {
      material: "150gsm matte or conqueror paper",
      finishing:
        "Full colour direct-image printing, trimmed and cut to perfect size.",
      design: "Your company logo and contact details",
    },
    delivery: { lagos: "Same day delivery", nationwide: "2-3 working days" },
    images: [
      `${DIR}/letterheads.png`,
      `${DIR}/letterheads-2.jpeg`,
      `${DIR}/letterheads-3.jpg`,
      `${DIR}/letterheads-4.png`,
    ],
    imageAlt: "Company letterhead printed on matte paper",
    featured: true,
    terms: [
      "letterhead",
      "letter head",
      "company paper",
      "headed paper",
      "corporate stationery",
    ],
    related: ["premium-business-card", "c4-envelope", "file-presentation-folder"],
    source: "Price list p.18",
    review: [
      'PRICE NOT PUBLISHED — the entry contains two contradictory figures: "STARTING FROM ₦25,000,000 PER 100PCS" (a transcription error, three orders of magnitude too high) and "price starting at ₦25,500.00 for 100 copies". ₦25,500 per 100 is the plausible one, but it has not been published because the source disagrees with itself. Correct the price list, then set `price: from(25500, 100)`.',
    ],
  }),

  defineProduct({
    slug: "file-presentation-folder",
    name: "File Presentation Folder",
    category: "office-stationery",
    short:
      "A4 presentation folder on 300gsm matte card with lamination.",
    description:
      "An A4 folder printed in full colour on 300gsm matte card and finished with matte or gloss lamination. Holds proposals, contracts and onboarding packs together and does the first half of the pitch before anyone opens it.",
    specs: {
      size: "A4",
      material: "300gsm matte card",
      finishing:
        "Full colour vibrant printing finished with matte or gloss lamination",
      design: "New creative design",
    },
    delivery: { lagos: "3-5 working days", nationwide: "5-7 working days" },
    images: [
      `${DIR}/file-presentation-folder.jpeg`,
      `${DIR}/file-presentation-folder-2.jpeg`,
    ],
    imageAlt: "A4 presentation folder with laminated printed cover",
    terms: [
      "document folder",
      "presentation folder",
      "conference folder",
      "proposal folder",
    ],
    related: ["letterheads", "premium-business-card", "a4-portrait-brochure"],
    source: "Price list p.18",
    review: [
      'PRICE NOT PUBLISHED — the price list reads "STARTING FROM ₦140,000,000 PER 100PCS" (₦1.4m per folder), which is a transcription error. ₦140,000 per 100 is the likely intent but has not been assumed. Correct the price list and set the value here.',
    ],
  }),

  defineProduct({
    slug: "id-card",
    name: "ID Card & Kit",
    category: "office-stationery",
    short:
      "PVC plastic ID card printed with case and rope, 1-2 day turnaround.",
    description:
      "A PVC plastic ID card printed full colour on the front and greyscale on the back, supplied complete with a card case and rope. Turned around in 1-2 working days within Lagos for new staff and event access.",
    specs: {
      size: "Width 2.1 inches, height 3.5 inches",
      material: "PVC plastic card",
      finishing:
        "Full colour printing on the front and greyscale print on the back, with ID card case and rope",
    },
    delivery: { lagos: "1-2 working days", nationwide: "2-3 working days" },
    images: [`${DIR}/id-card.jpg`, `${DIR}/id-card-2.jpeg`],
    imageAlt: "PVC staff ID card with case and rope",
    terms: [
      "staff id",
      "identity card",
      "access card",
      "membership card",
      "pvc card",
    ],
    related: ["custom-lanyard", "event-tag", "party-event-wristband"],
    source: "Price list p.18",
    review: [
      'PRICE NOT PUBLISHED — the price list reads "STARTING FROM ₦4,000,000 PER 1PCS" for a single ID card, which is a transcription error. ₦4,000 per card is the likely intent but has not been assumed. Correct the price list and set the value here.',
    ],
  }),

  defineProduct({
    slug: "invoice-receipt",
    name: "Invoice Receipt Book",
    category: "office-stationery",
    short:
      "Carbonised receipt book, 50 original and 50 duplicate pages, perforated.",
    description:
      "A carbonised invoice book with 50 original and 50 duplicate pages, so a copy stays in the book when the customer takes theirs. Printed in one or two colours and perforated for a clean tear.",
    specs: {
      size: "Width 5.75 inches, height 8.2 inches",
      material:
        "Carbonised paper — 50 sheets original and 50 sheets duplicate inner pages",
      finishing:
        "One to two colour inner page printing, perforated for easy cut",
      design: "Your company logo and contact details",
    },
    delivery: { lagos: "3-5 working days", nationwide: "4-7 working days" },
    images: [
      `${DIR}/invoice-receipt.jpeg`,
      `${DIR}/invoice-receipt-2.jpeg`,
      `${DIR}/invoice-receipt-3.jpeg`,
    ],
    imageAlt: "Carbonised invoice receipt book with duplicate pages",
    terms: [
      "receipt book",
      "invoice book",
      "waybill book",
      "carbon receipt",
      "delivery note",
    ],
    related: ["letterheads", "block-pad", "dl-small-envelope"],
    source: "Price list p.18",
    review: [
      'PRICE NOT PUBLISHED — the price list reads "STARTING FROM ₦40,000,000 PER 10PCS", which is a transcription error. ₦40,000 per 10 books is the likely intent but has not been assumed. Correct the price list and set the value here.',
    ],
  }),

  defineProduct({
    slug: "metallic-pen",
    name: "Metallic Pen",
    category: "office-stationery",
    short:
      "Quality metal pen branded by direct UV print or engraving.",
    description:
      "A metal-bodied pen personalised with full-colour direct UV printing or engraving. Engraving cuts into the barrel so the branding cannot rub off — the usual choice for executive gifts.",
    specs: {
      material: "Quality metallic pen",
      finishing: "Full colour direct UV printing or engraving on the pen",
    },
    delivery: { lagos: "5-7 working days", nationwide: "7-10 working days" },
    images: [
      `${DIR}/metallic-pen.jpeg`,
      `${DIR}/metallic-pen-2.jpeg`,
      `${DIR}/metallic-pen-3.jpeg`,
    ],
    imageAlt: "Metal pen with engraved branding",
    terms: ["branded pen", "executive pen", "engraved pen", "corporate pen"],
    related: ["plastic-pen", "a5-notebook", "magnetic-journal-notebook"],
    source: "Price list p.19",
    review: [
      'PRICE NOT PUBLISHED — the price list reads "STARTING FROM ₦1,500,000 PER 100PCS" (₦15,000 per pen), which sits far outside the range of the plastic pen at ₦65,000 per 100 on the same page and looks like a transcription error. Correct the price list and set the value here.',
    ],
  }),

  defineProduct({
    slug: "plastic-pen",
    name: "Plastic Pen",
    category: "office-stationery",
    short:
      "Plastic pen branded with full-colour direct UV printing.",
    description:
      "A plastic-bodied pen branded with full-colour direct UV printing — the highest-volume, lowest-cost giveaway in the stationery range, ordered by the hundred for conferences and sales teams.",
    price: from(65000, 100, "pen"),
    specs: {
      material: "Plastic pen",
      branding: "Full colour direct UV printing.",
    },
    delivery: { lagos: "3-5 working days", nationwide: "5-7 working days" },
    images: [
      `${DIR}/plastic-pen.jpeg`,
      `${DIR}/plastic-pen-2.jpeg`,
      `${DIR}/plastic-pen-3.jpeg`,
    ],
    imageAlt: "Plastic pen with printed branding",
    featured: true,
    terms: ["branded pen", "biro", "promotional pen", "conference pen"],
    related: ["metallic-pen", "a5-notebook", "block-pad"],
    source: "Price list p.19",
  }),

  defineProduct({
    slug: "custom-lanyard",
    name: "Custom Lanyard",
    category: "office-stationery",
    short:
      "36 inch cotton or polyester lanyard with borderless full-colour branding.",
    description:
      "A 36 inch neck lanyard branded end to end in full colour. Cotton takes a DTF transfer, while the polyester version is sublimated so the ink sits inside the fibre and will not crack.",
    price: from(1500, 50, "lanyard"),
    specs: {
      size: "Width 36 inches, height 0.75 inches",
      material: "Cotton lanyard material, with a polyester sublimated option",
      finishing: "Full-colour DTF borderless printing",
      design: "Your brand logo or custom design",
    },
    delivery: { lagos: "2-4 working days", nationwide: "4-5 working days" },
    options: [
      {
        id: "material",
        label: "Material",
        affectsPrice: true,
        options: [
          {
            id: "cotton",
            label: "Cotton — DTF printed",
            price: from(1500, 50, "lanyard"),
          },
          {
            id: "polyester",
            label: "Polyester — sublimated",
            detail: "Delivered in 3-4 working days within Lagos",
            price: from(2000, 50, "lanyard"),
          },
        ],
      },
    ],
    images: [`${DIR}/custom-lanyard.jpg`, `${DIR}/custom-lanyard-2.jpg`],
    imageAlt: "Branded neck lanyard with printed logo",
    featured: true,
    terms: [
      "lanyard",
      "neck strap",
      "id rope",
      "badge holder",
      "conference lanyard",
    ],
    related: ["id-card", "event-tag", "party-event-wristband"],
    source: "Price list p.18",
    review: [
      "₦1,500 per 50 lanyards (₦30 each) and ₦2,000 per 50 for the sublimated version are below plausible cost and are most likely per-piece figures. Preserved as printed — confirm the basis.",
    ],
  }),

  defineProduct({
    slug: "block-pad",
    name: "Block Pad",
    category: "office-stationery",
    short:
      "3.8 inch square memo pad, glue-bound onto a sturdy chipboard back.",
    description:
      "A square desk memo pad printed in full colour, padded with glue along one edge and backed with sturdy chipboard so sheets tear off cleanly. A branded desk fixture that stays in view all year.",
    specs: {
      size: "3.8 x 3.8 inches (square)",
      finishing:
        "Vibrant high quality full colour printing, padded with glue and backed with sturdy chipboard.",
      design: "New custom design",
    },
    delivery: { lagos: "5-7 working days", nationwide: "6-8 working days" },
    images: [`${DIR}/block-pad.png`, `${DIR}/block-pad-2.png`],
    imageAlt: "Square desk memo block pad with printed sheets",
    terms: ["memo pad", "note pad", "sticky pad", "desk pad", "jotter pad"],
    related: ["magnetic-journal-notebook", "mousepad", "letterheads"],
    source: "Price list p.17",
    review: [
      'PRICE NOT PUBLISHED — the entry contains two contradictory figures: "price starting at ₦3,700.00 per one" and "STARTING FROM ₦3,500 PER 50PCS" (₦70 per pad). Neither has been published. Confirm which is correct.',
      'The material is listed only as "Plastic.", which does not match a glue-bound paper pad and looks like a stray line. It has been left out.',
    ],
  }),

  defineProduct({
    slug: "mousepad",
    name: "Mousepad",
    category: "office-stationery",
    short:
      "5mm rubber mousepad with full-colour sublimation printing.",
    description:
      "A 5mm thick rubber mousepad printed edge to edge by sublimation, so photographs and gradients reproduce cleanly. A low-cost branded item that sits on a desk in constant view.",
    price: from(4000, 1, "mousepad"),
    specs: {
      material: "5mm thick rubber pad",
      branding: "Full colour direct sublimation printing.",
      design: "Your company logo or custom design, images included",
    },
    delivery: { lagos: "2-7 working days", nationwide: "7-10 working days" },
    images: [
      `${DIR}/mousepad.png`,
      `${DIR}/mousepad-2.png`,
      `${DIR}/mousepad-3.png`,
      `${DIR}/mousepad-4.png`,
    ],
    imageAlt: "Rubber mousepad with a sublimated full-colour design",
    terms: ["mouse pad", "desk mat", "branded mousepad", "office gift"],
    related: ["computer-mouse", "block-pad", "pop-socket"],
    source: "Price list p.19",
    review: [
      'The entry carries both "price Starting at ₦4,200.00 per copy" and "STARTING FROM ₦4,000 PER 1PCS". The lower headline figure of ₦4,000 has been used; confirm which is current.',
    ],
  }),

  defineProduct({
    slug: "computer-mouse",
    name: "Branded Computer Mouse",
    category: "office-stationery",
    short: "Computer mouse branded with your logo for corporate gifting.",
    description:
      "A computer mouse branded with your logo, ordered as part of corporate desk sets alongside mousepads and stationery.",
    specs: {},
    images: [
      `${DIR}/computer-mouse.png`,
      `${DIR}/computer-mouse-2.png`,
      `${DIR}/computer-mouse-3.png`,
    ],
    imageAlt: "Computer mouse with branded logo",
    terms: ["branded mouse", "corporate gift", "desk set", "office gift"],
    related: ["mousepad", "block-pad", "metallic-pen"],
    source: "Not listed in the supplied price list",
    review: [
      "This product exists in the live catalogue but has no entry in the supplied price list, so no price, material or delivery time is published for it. Add it to the price list, or unpublish the product.",
    ],
  }),
];

/**
 * Campaign Materials — carried over from the existing catalogue. None of these
 * appear in the supplied price list, so none carry a published price; the
 * pages ask for a quote instead of showing an invented figure.
 */
const CAMPAIGN_REVIEW = [
  "Not listed in the supplied price list. No price is published rather than inventing one. Campaign work is quoted per project because quantities and deadlines vary — add price list entries if standard rates exist.",
];

export const campaignMaterials = [
  defineProduct({
    slug: "political-campaign-t-shirt",
    name: "Campaign T-Shirt",
    category: "campaign-materials",
    short: "Cotton campaign T-shirts printed at volume for field teams.",
    description:
      "Cotton T-shirts printed with candidate artwork, ward details and slogans for canvassers, rally crowds and polling agents. Produced at campaign volume against a fixed deadline.",
    specs: { finishing: "Full colour print" },
    images: [`${CAMP_DIR}/political-campaign-t-shirt.png`],
    imageAlt: "Campaign T-shirt printed with candidate artwork",
    terms: ["campaign shirt", "election t shirt", "political shirt", "rally shirt"],
    related: ["round-neck-t-shirt", "political-campaign-caps"],
    review: CAMPAIGN_REVIEW,
  }),

  defineProduct({
    slug: "political-campaign-caps",
    name: "Campaign Caps",
    category: "campaign-materials",
    short: "Branded campaign caps for canvassers and rally crowds.",
    description:
      "Caps carrying candidate branding, produced at campaign volume for field teams, rallies and polling-day agents.",
    specs: { finishing: "Full colour print or embroidery" },
    images: [`${CAMP_DIR}/political-campaign-caps.png`],
    imageAlt: "Campaign cap printed with candidate branding",
    terms: ["campaign cap", "election cap", "political cap", "rally cap"],
    related: ["baseball-cap", "political-campaign-t-shirt"],
    review: CAMPAIGN_REVIEW,
  }),

  defineProduct({
    slug: "political-campaign-banners",
    name: "Campaign Banners",
    category: "campaign-materials",
    short: "Flex campaign banners for rallies, offices and street mounting.",
    description:
      "Large flex banners carrying candidate artwork for campaign offices, rally stages and street mounting across wards.",
    specs: { material: "Flex banner material", finishing: "Full colour print" },
    images: [`${CAMP_DIR}/political-campaign-banners.png`],
    imageAlt: "Political campaign banner mounted at an outdoor rally",
    terms: ["campaign banner", "election banner", "political banner", "rally banner"],
    related: ["event-backdrop", "lamp-post-banner", "a2-a3-political-campaign-poster"],
    review: CAMPAIGN_REVIEW,
  }),

  defineProduct({
    slug: "a2-a3-political-campaign-poster",
    name: "Campaign Posters",
    category: "campaign-materials",
    short: "A2 and A3 campaign posters for ward-level distribution.",
    description:
      "A2 and A3 posters carrying candidate artwork, printed in volume for wall mounting and ward-level distribution during a campaign.",
    specs: { size: "A2 and A3", finishing: "Full colour print" },
    images: [`${CAMP_DIR}/a2-a3-political-campaign-poster.png`],
    imageAlt: "A2 political campaign poster with candidate photograph",
    terms: ["campaign poster", "election poster", "political poster"],
    related: ["a2-posters", "a3-posters", "political-campaign-banners"],
    review: CAMPAIGN_REVIEW,
  }),
];
