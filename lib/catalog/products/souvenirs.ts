import { defineProduct } from "./define";
import { from } from "../pricing";

const DIR = "/product-images/events&souvenirs";
const TAG_DIR = "/product-images/event-tag";

const MUG_DELIVERY = { lagos: "1-5 working days" };
const MUG_FINISHING = "Full colour digital print with your design.";

/** Events & Souvenirs — price list pages 13-15. */
export const souvenirs = [
  defineProduct({
    slug: "big-magic-mug",
    name: "Big Magic Mug",
    category: "events-souvenirs",
    short:
      "Black ceramic mug that turns white and reveals your design when hot.",
    description:
      "A heat-reactive ceramic mug: it sits black on the shelf, then turns white and reveals your printed design the moment hot liquid goes in. The reveal is the reason people keep it, which makes it one of the strongest low-cost souvenirs.",
    price: from(5600, 1, "mug"),
    specs: {
      material:
        "Black ceramic mug that changes to white when you pour hot liquid",
      finishing: MUG_FINISHING,
    },
    delivery: MUG_DELIVERY,
    images: [`${DIR}/big-magic-mug.png`, `${DIR}/big-magic-mug-2.jpeg`],
    imageAlt: "Black magic mug revealing a printed design when filled",
    featured: true,
    terms: ["magic cup", "colour changing mug", "heat mug", "souvenir mug"],
    related: ["small-magic-mug", "big-white-mug", "small-white-mug"],
    source: "Price list p.13",
  }),

  defineProduct({
    slug: "small-magic-mug",
    name: "Small Magic Mug",
    category: "events-souvenirs",
    short:
      "Compact heat-reactive black ceramic mug with full-colour print.",
    description:
      "The smaller heat-reactive mug — same black-to-white reveal, in a size that suits espresso service and tighter gift budgets.",
    price: from(5000, 1, "mug"),
    specs: {
      material:
        "Black ceramic mug that changes to white when you pour hot liquid",
      finishing: MUG_FINISHING,
    },
    delivery: MUG_DELIVERY,
    images: [`${DIR}/small-magic-mug.jpeg`],
    imageAlt: "Small black magic mug with printed design",
    terms: ["magic cup", "colour changing mug", "souvenir mug"],
    related: ["big-magic-mug", "small-white-mug", "big-white-mug"],
    source: "Price list p.13",
  }),

  defineProduct({
    slug: "big-white-mug",
    name: "Big White Mug",
    category: "events-souvenirs",
    short: "Full-size white ceramic mug with full-colour digital print.",
    description:
      "A standard white ceramic mug printed in full colour with your design — the most cost-effective branded item in the souvenir range and the one most corporate gift lists start with.",
    price: from(3800, 1, "mug"),
    specs: {
      material: "White ceramic mug",
      finishing: MUG_FINISHING,
    },
    delivery: MUG_DELIVERY,
    images: [
      `${DIR}/big-white-mug.jpeg`,
      `${DIR}/big-white-mug-2.jpeg`,
      `${DIR}/big-white-mug-3.jpeg`,
    ],
    imageAlt: "White ceramic mug printed with a full-colour design",
    featured: true,
    terms: ["coffee mug", "ceramic cup", "branded mug", "corporate mug"],
    related: ["small-white-mug", "big-magic-mug", "metallic-pen"],
    source: "Price list p.13",
  }),

  defineProduct({
    slug: "small-white-mug",
    name: "Small White Mug",
    category: "events-souvenirs",
    short: "Compact white ceramic mug with full-colour digital print.",
    description:
      "A smaller white ceramic mug printed in full colour — suited to espresso service, children's gifts and higher-volume giveaways.",
    price: from(3000, 1, "mug"),
    specs: {
      material: "White ceramic mug",
      finishing: MUG_FINISHING,
    },
    delivery: MUG_DELIVERY,
    images: [`${DIR}/small-white-mug.jpeg`, `${DIR}/small-white-mug-2.png`],
    imageAlt: "Small white ceramic mug with printed design",
    terms: ["coffee mug", "ceramic cup", "branded mug", "espresso cup"],
    related: ["big-white-mug", "small-magic-mug"],
    source: "Price list p.13",
  }),

  defineProduct({
    slug: "a5-notebook",
    name: "A5 Leather Notebook",
    category: "events-souvenirs",
    short:
      "A5 diary notebook with leather or fabric cover, UV printed or engraved.",
    description:
      "An A5 diary notebook bound in leather or fabric, available in a range of colours and personalised with full-colour direct UV printing or engraving. The default corporate gift for conferences and year-end client packs.",
    price: from(10000, 10, "notebook"),
    specs: {
      size: "A5",
      material:
        "Diary notebook with leather or fabric cover, available in colours",
      finishing: "Full colour direct UV printing or engraving",
    },
    images: [`${DIR}/a5-notebook.jpeg`, `${DIR}/engraved-notebook.jpeg`],
    imageAlt: "A5 leather-bound notebook with engraved cover",
    featured: true,
    terms: [
      "jotter",
      "diary",
      "corporate notebook",
      "journal",
      "notepad",
      "conference notebook",
    ],
    related: ["magnetic-journal-notebook", "metallic-pen", "big-white-mug"],
    source: "Price list p.13",
  }),

  defineProduct({
    slug: "magnetic-journal-notebook",
    name: "Magnetic Pen-Hold Journal Notebook",
    category: "events-souvenirs",
    short:
      "A5 journal with magnetic flap, 160 pages and a matching pen.",
    description:
      "An A5 journal that closes with a magnetic flap and holds its own pen in the spine — 80 sheets, 160 pages. Personalised with full-colour direct UV printing or engraving.",
    price: from(7000, 10, "notebook"),
    specs: {
      size: "A5",
      material:
        "80 sheets (160 pages) magnetic notebook journal with pen, available in colours",
      finishing: "Full colour direct UV printing or engraving (optional)",
    },
    images: [`${DIR}/corporate-notebook.jpeg`],
    imageAlt: "A5 journal notebook with magnetic flap and pen holder",
    terms: ["jotter", "journal", "corporate notebook", "diary", "notepad"],
    related: ["a5-notebook", "metallic-pen", "block-pad"],
    source: "Price list p.14",
  }),

  defineProduct({
    slug: "metallic-keyring",
    name: "Metallic Keyring",
    category: "events-souvenirs",
    short:
      "Metal keyring branded with a full-colour dome sticker.",
    description:
      "A metallic keyring finished with a full-colour dome sticker — a resin lens over the print that magnifies the artwork and protects it from scratching. Ordered in batches of 50 for events and giveaways.",
    price: from(2300, 50, "keyring"),
    specs: {
      material: "Metallic key ring",
      finishing: "Full colour dome sticker printing branded on the surface",
    },
    images: [`${DIR}/metallic-keyring.jpeg`, `${DIR}/metallic-keyring-2.jpeg`],
    imageAlt: "Metal keyring with a domed full-colour logo sticker",
    terms: ["key holder", "keychain", "key ring", "souvenir keyring"],
    related: ["wooden-keyring", "pop-socket", "metallic-pen"],
    source: "Price list p.14",
    review: [
      "Price list quotes ₦2,300 per 50 pieces (₦46 each), which is below plausible cost for a metal keyring with a dome sticker. The figure is most likely per piece. Preserved as printed — confirm the basis before quoting.",
    ],
  }),

  defineProduct({
    slug: "wooden-keyring",
    name: "Wooden Keyring",
    category: "events-souvenirs",
    short:
      "Wooden keyring, screen printed, engraved or dome-sticker branded.",
    description:
      "A wooden keyring branded by one-colour screen print, engraving, or a full-colour dome sticker. Engraving gives the most durable finish; the dome sticker gives the most colour.",
    price: from(2000, 50, "keyring"),
    specs: {
      finishing:
        "One colour screen printing, engraving, or full colour dome sticker printing branded on the surface.",
    },
    images: [
      `${DIR}/wooden-keyring.jpeg`,
      `${DIR}/wooden-keyring-2.jpeg`,
      `${DIR}/wooden-keyring-3.jpeg`,
    ],
    imageAlt: "Wooden keyring with engraved branding",
    terms: ["key holder", "keychain", "key ring", "wooden souvenir"],
    related: ["metallic-keyring", "pop-socket"],
    source: "Price list p.14",
    review: [
      'The wooden keyring entry lists its material as "Metallic key ring", copied from the entry above it. The material line has been left out rather than published incorrectly.',
      "₦2,000 per 50 pieces (₦40 each) is below plausible cost and is most likely a per-piece figure. Preserved as printed — confirm the basis.",
    ],
  }),

  defineProduct({
    slug: "party-event-wristband",
    name: "Event Paper Wristband",
    category: "events-souvenirs",
    short:
      "Laminated paper wristband with full-colour direct image printing.",
    description:
      "A tear-resistant laminated paper wristband printed in full colour, including photographs and background artwork if you want them. Used for festival entry, session access and child safety tagging at events.",
    price: from(150, 50, "wristband"),
    specs: {
      material: "Laminated printable paper",
      finishing: "Full colour direct image printing",
      design: "Custom design — pictures and background can be included",
    },
    images: [
      `${DIR}/party-event-handband.jpeg`,
      `${DIR}/party-event-handband-2.jpeg`,
      `${DIR}/party-event-handband-3.jpeg`,
      `${DIR}/party-event-handband-4.jpeg`,
    ],
    imageAlt: "Printed paper event wristbands",
    terms: [
      "hand band",
      "wristband",
      "handtag",
      "festival band",
      "event access band",
    ],
    related: ["event-tag", "custom-lanyard", "id-card"],
    source: "Price list p.14",
    review: [
      "Price list quotes ₦150 per 50 pieces (₦3 each). ₦150 is far more likely to be the per-piece price. Preserved as printed — confirm the basis before quoting.",
    ],
  }),

  defineProduct({
    slug: "event-tag",
    name: "Event & Conference Tag",
    category: "events-souvenirs",
    short:
      "350gsm art card conference tag with a branded lanyard.",
    description:
      "A laminated conference badge on 350gsm art card supplied with a lanyard branded in full colour. Handles delegate identification and access while keeping your event branding around every neck in the room.",
    price: from(2000, 10, "tag"),
    specs: {
      material: "350gsm art card with branded lanyard",
      branding:
        "Gloss or matt lamination on printed art card, with full colour DTF borderless branding on the lanyard",
      design: "Your company logo or picture with wordings",
    },
    delivery: { lagos: "2-5 working days", nationwide: "5-7 working days" },
    images: [`${TAG_DIR}/event-tag.jpeg`, `${TAG_DIR}/event-tag-2.jpeg`],
    imageAlt: "Conference tag on a branded lanyard",
    featured: true,
    terms: [
      "conference tag",
      "delegate badge",
      "name tag",
      "event badge",
      "access card",
    ],
    related: ["custom-lanyard", "id-card", "party-event-wristband"],
    source: "Price list p.15",
  }),

  defineProduct({
    slug: "party-paper-cup",
    name: "Party Paper Cup",
    category: "events-souvenirs",
    short:
      "Waterproof branded paper cup with lid, in 12oz and 16oz.",
    description:
      "A thick waterproof paper cup with a lid, branded around the full body in full colour and laminated. Available in 12oz and 16oz for coffee counters, events and food service.",
    price: from(650, 100, "cup", "12oz"),
    specs: {
      material: "Thick waterproof paper cup with lid, available in 12oz and 16oz",
      finishing:
        "Full-colour printing, laminated, with full body branding",
    },
    delivery: { lagos: "5-7 working days", nationwide: "6-8 working days" },
    options: [
      {
        id: "size",
        label: "Cup size",
        affectsPrice: true,
        options: [
          { id: "12oz", label: "12oz", price: from(650, 100, "cup") },
          { id: "16oz", label: "16oz", price: from(850, 100, "cup") },
        ],
      },
    ],
    images: [
      `${DIR}/party-paper-cup.jpeg`,
      `${DIR}/party-paper-cup-2.jpeg`,
      `${DIR}/party-paper-cup-3.jpeg`,
      `${DIR}/party-paper-cup-4.jpg`,
    ],
    imageAlt: "Branded paper coffee cups with lids",
    terms: [
      "coffee cup",
      "disposable cup",
      "branded cup",
      "takeaway cup",
      "paper cup",
    ],
    related: ["food-pack", "pizza-box", "big-white-mug"],
    source: "Price list p.14",
    review: [
      "Price list quotes ₦650 per 100 (₦6.50 per cup) for 12oz and ₦850 per 100 for 16oz. Both are below plausible cost for a laminated printed cup with lid and are most likely per-piece figures. Preserved as printed — confirm the basis.",
    ],
  }),

  defineProduct({
    slug: "pop-socket",
    name: "Pop Socket",
    category: "events-souvenirs",
    short:
      "ABS plastic phone grip with UV print or 3D resin dome branding.",
    description:
      "An ABS plastic phone grip branded with full-colour direct UV printing or a raised 3D resin dome. Small, cheap to ship and genuinely used, which makes it one of the better-value giveaway items.",
    price: from(2500, 50, "pop socket"),
    specs: {
      material: "ABS plastic",
      finishing: "Full colour direct UV printing or 3D resin dome print",
      design: "Your custom design or company logo",
    },
    delivery: { lagos: "3-5 working days", nationwide: "5-7 working days" },
    images: [
      `${DIR}/pop-socket.jpeg`,
      `${DIR}/pop-socket-2.jpeg`,
      `${DIR}/pop-socket-3.jpeg`,
    ],
    imageAlt: "Branded ABS plastic phone grip pop socket",
    terms: ["phone grip", "phone holder", "popsocket", "phone stand"],
    related: ["metallic-keyring", "wooden-keyring", "mousepad"],
    source: "Price list p.14",
    review: [
      "₦2,500 per 50 pieces (₦50 each) is below plausible cost and is most likely a per-piece figure. Preserved as printed — confirm the basis.",
    ],
  }),

  defineProduct({
    slug: "throwpillow",
    name: "Throw Pillow",
    category: "events-souvenirs",
    short:
      "18 x 18 inch satin throw pillow, sublimation printed with fringed border.",
    description:
      "An 18 x 18 inch throw pillow in bridal satin filled with cluster fibre, printed edge to edge by sublimation and finished with a fringed border. Ordered for wedding gifts, home brands and premium souvenirs.",
    price: from(30000, 1, "pillow"),
    specs: {
      size: "18 x 18 inches",
      material: "100% polyester bridal satin fabric filled with cluster fibre",
      finishing:
        "Full colour direct sublimation printing with fringes border",
      design: "Your custom design",
    },
    delivery: { lagos: "2-5 working days", nationwide: "5-7 working days" },
    images: [
      `${DIR}/throwpillow.jpg`,
      `${DIR}/throwpillow-2.jpg`,
      `${DIR}/throwpillow-3.jpg`,
    ],
    imageAlt: "Satin throw pillow with sublimated design and fringed border",
    terms: [
      "cushion",
      "pillow",
      "throw pillow",
      "custom cushion",
      "wedding gift",
    ],
    related: ["branded-towel", "big-white-mug", "compact-umbrella"],
    source: "Price list p.14",
    review: [
      "₦30,000 for a single throw pillow is high relative to the rest of the souvenir range. Preserved as printed; confirm.",
    ],
  }),

  defineProduct({
    slug: "compact-umbrella",
    name: "Compact Umbrella",
    category: "events-souvenirs",
    short:
      "Foldable umbrella with full-colour DTF branding across two panels.",
    description:
      "A foldable compact umbrella available in a range of colours, branded borderless across two panels in full colour DTF. Practical enough through the rainy season that it stays in use long after the event.",
    price: from(10000, 10, "umbrella"),
    specs: {
      material: "Foldable shape umbrella, available in colours",
      branding: "Full-colour DTF borderless two panel branding",
      design: "Your company logo or picture with wordings",
    },
    delivery: { lagos: "2-5 working days", nationwide: "5-7 working days" },
    images: [`${DIR}/compact-umbrella.jpg`],
    imageAlt: "Folding compact umbrella with printed branding",
    terms: ["umbrella", "folding umbrella", "rain umbrella", "branded umbrella"],
    related: ["bottle-shape-umbrella", "throwpillow", "branded-towel"],
    source: "Price list p.15",
  }),

  defineProduct({
    slug: "bottle-shape-umbrella",
    name: "Bottle Shape Umbrella",
    category: "events-souvenirs",
    short:
      "Umbrella that folds into a bottle-shaped case, DTF branded.",
    description:
      "An umbrella that packs down into a bottle-shaped case — it sits in a car door or bag pocket without the usual sleeve. Branded borderless across two panels in full colour DTF and available in a range of colours.",
    price: from(8000, 10, "umbrella"),
    specs: {
      material: "Bottle shape umbrella, available in colours",
      branding: "Full-colour DTF borderless two panel branding",
      design: "Your company logo or picture with wordings",
    },
    delivery: { lagos: "2-5 working days", nationwide: "5-7 working days" },
    images: [`${DIR}/universal-umbrella.png`],
    imageAlt: "Umbrella folded into a bottle-shaped carrying case",
    terms: ["umbrella", "folding umbrella", "bottle umbrella", "rain umbrella"],
    related: ["compact-umbrella", "throwpillow"],
    source: "Price list p.15",
  }),

  defineProduct({
    slug: "dummy-currency-note",
    name: "Dummy Currency Note",
    category: "events-souvenirs",
    short:
      "Novelty spray note on 80gsm bond paper, printed both sides, per bundle.",
    description:
      "Novelty spray notes printed in full colour on both sides of 80gsm non-laminated bond paper and supplied by the bundle — used for weddings, parties and stage productions.",
    price: from(7000, 1, "bundle"),
    specs: {
      material: "80gsm non-laminated bond paper",
      finishing: "Full colour digital print with your design on both sides.",
    },
    delivery: { lagos: "3-5 working days" },
    images: [
      `${DIR}/dummy-currency-note.png`,
      `${DIR}/dummy-currency-note-2.png`,
    ],
    imageAlt: "Bundle of novelty printed dummy currency notes",
    terms: ["spray money", "party money", "fake money", "money spray", "prop money"],
    related: ["dummy-cheque", "party-event-wristband", "party-paper-cup"],
    source: "Price list p.13",
  }),

  defineProduct({
    slug: "exercise-book",
    name: "Notebook & Exercise Book",
    category: "events-souvenirs",
    short:
      "Legal-size exercise book with 250gsm FBB cover, in 40 and 60 leaves.",
    description:
      "A saddle-stitched exercise book with a full-colour 250gsm FBB cover and 60gsm bond inner pages ruled in blue. Ordered by schools, churches and organisations that hand out branded books at scale.",
    published: false,
    specs: {
      size: "Legal size",
      pages: "40 leaves or 60 leaves",
      material: "250gsm FBB cover with 60gsm bond paper stock inside",
      finishing:
        "Full-colour print on the cover, blue ruling inside, saddle-stitched.",
    },
    delivery: { lagos: "3-4 working days" },
    options: [
      {
        id: "leaves",
        label: "Page count",
        affectsPrice: true,
        options: [
          { id: "40", label: "40 leaves", price: from(60000, 100, "book") },
          { id: "60", label: "60 leaves", price: from(80000, 100, "book") },
        ],
      },
    ],
    images: [`${DIR}/corporate-notebook.jpeg`],
    imageAlt: "Notebook with a printed cover",
    terms: ["exercise book", "school book", "note book", "jotter", "school branding"],
    related: ["a5-notebook", "magnetic-journal-notebook"],
    source: "Price list p.13",
    review: [
      "UNPUBLISHED — there is no photograph of this product. Prices are transcribed correctly (₦60,000 per 100 for 40 leaves, ₦80,000 per 100 for 60 leaves); publish once product photography exists.",
    ],
  }),

  defineProduct({
    slug: "pvc-handfan",
    name: "Customised PVC Handfan",
    category: "events-souvenirs",
    short:
      "PVC plastic handfan, UV printed and die-cut to any shape.",
    description:
      "A PVC plastic handfan printed with full-colour direct ultraviolet ink and die-cut to your preferred shape. A staple giveaway at Nigerian weddings, church programmes and outdoor events.",
    published: false,
    specs: {
      material: "PVC plastic handfan, available in all shapes",
      finishing:
        "Full colour direct ultraviolet (UV) print, die-cut to your preferred shape.",
      design: "Your brand logo or picture with design",
    },
    delivery: { lagos: "5-7 working days", nationwide: "7-10 working days" },
    images: [`${DIR}/party-event-handband.jpeg`],
    imageAlt: "Printed event giveaway item",
    terms: ["hand fan", "handfan", "party fan", "wedding fan", "event fan"],
    related: ["party-event-wristband", "event-tag"],
    source: "Price list p.15",
    review: [
      "UNPUBLISHED — there is no photograph of this product. Price is transcribed correctly (₦90,000 per 100); publish once product photography exists.",
    ],
  }),
];
