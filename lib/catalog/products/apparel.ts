import { defineProduct } from "./define";
import { from } from "../pricing";

const CAP_DIR = "/product-images/caps&hats";
const WEAR_DIR = "/product-images/clothing-apparel";
const TAG_DIR = "/product-images/clothestag";

const PRINT_OR_EMBROIDERY =
  "Full colour print or monogram/embroidery option.";
const BORDERLESS_OR_EMBROIDERY =
  "Full colour borderless print or monogram/embroidery option.";
const APPAREL_SIZES = "S, M, L, XL, XXL";

/** Caps & Hats — price list page 10. */
export const capsHats = [
  defineProduct({
    slug: "baseball-cap",
    name: "Baseball Cap",
    category: "caps-hats",
    short:
      "Branded baseball cap in regular and VIP quality, printed or embroidered.",
    description:
      "The everyday branded cap, available in a range of colours and finished with a full-colour print or monogram embroidery. The VIP option uses a heavier, better-structured cap that holds its crown shape — worth it for management and client gifting.",
    price: from(4500, 1, "cap"),
    specs: {
      material: "Top quality baseball cap available in various colours",
      finishing: PRINT_OR_EMBROIDERY,
    },
    delivery: { lagos: "2-4 days" },
    options: [
      {
        id: "grade",
        label: "Quality",
        affectsPrice: true,
        options: [
          { id: "regular", label: "Regular", price: from(4500, 1, "cap") },
          { id: "vip", label: "VIP", price: from(8000, 1, "cap") },
        ],
      },
    ],
    images: [`${CAP_DIR}/baseball-cap.png`],
    imageAlt: "Branded baseball cap with embroidered logo",
    featured: true,
    terms: ["face cap", "branded cap", "corporate cap", "embroidered cap"],
    related: ["trucker-cap", "snapback-cap", "custom-bucket-hat"],
    source: "Price list p.10",
  }),

  defineProduct({
    slug: "trucker-cap",
    name: "Trucker Cap",
    category: "caps-hats",
    short: "Mesh-back trucker cap with print or embroidered branding.",
    description:
      "A trucker cap with a mesh back panel that breathes far better than a solid cap — the practical choice for outdoor teams, site staff and events under the Lagos sun.",
    price: from(4500, 1, "cap"),
    specs: {
      material: "Top quality cap available in various colours",
      finishing: PRINT_OR_EMBROIDERY,
    },
    delivery: { lagos: "2-4 days" },
    images: [`${CAP_DIR}/trucker-cap.png`, `${CAP_DIR}/trucker-cap-2.png`],
    imageAlt: "Mesh-back trucker cap with branded front panel",
    terms: ["mesh cap", "face cap", "branded cap"],
    related: ["baseball-cap", "snapback-cap", "custom-bucket-hat"],
    source: "Price list p.10",
  }),

  defineProduct({
    slug: "snapback-cap",
    name: "Snapback Cap",
    category: "caps-hats",
    short:
      "Flat-peak snapback with adjustable rear closure, printed or embroidered.",
    description:
      "A flat-peak cap with a structured crown and adjustable snap closure, available in a range of colours. The most fashion-forward cap in the range, which is why brands and streetwear labels reach for it over a curved-peak baseball cap.",
    price: from(10000, 1, "cap"),
    specs: {
      material: "Top quality snapback cap available in various colours",
      finishing: PRINT_OR_EMBROIDERY,
    },
    delivery: { lagos: "2-4 days" },
    images: [
      `${CAP_DIR}/snapback-cap.png`,
      `${CAP_DIR}/snapback-cap-2.png`,
      `${CAP_DIR}/snapback-cap-3.png`,
    ],
    imageAlt: "Flat-peak snapback cap with branded front panel",
    terms: ["flat cap", "branded cap", "streetwear cap"],
    related: ["baseball-cap", "trucker-cap", "custom-bucket-hat"],
    source: "Price list p.10",
  }),

  defineProduct({
    slug: "custom-bucket-hat",
    name: "Custom Bucket Hat",
    category: "caps-hats",
    short: "Cotton bucket hat with full-colour print or embroidery.",
    description:
      "A soft cotton bucket hat with an all-round brim, available in a range of colours. Popular for festivals, brand activations and merchandise drops where a cap would look too corporate.",
    price: from(9000, 1, "hat"),
    specs: {
      material: "Top quality cotton bucket hat available in various colours",
      finishing: PRINT_OR_EMBROIDERY,
    },
    delivery: { lagos: "2-4 days" },
    images: [`${CAP_DIR}/custom-bucket-hat.png`],
    imageAlt: "Cotton bucket hat with printed branding",
    terms: ["bucket hat", "sun hat", "festival hat", "branded hat"],
    related: ["baseball-cap", "snapback-cap", "beanie"],
    source: "Price list p.10",
  }),

  defineProduct({
    slug: "beanie",
    name: "Beanie",
    category: "caps-hats",
    short:
      "Thick 100% cotton beanie in black and white, embroidered.",
    description:
      "A thick cotton knit beanie in black or white, finished with monogram embroidery. Available in S through XXL, and the usual pick for harmattan-season staff kit and winter-market merchandise.",
    price: from(6000, 1, "beanie"),
    specs: {
      size: `${APPAREL_SIZES} sizes`,
      material:
        "100% durable thick cotton fabric, available in black and white",
      finishing: "Monogram/embroidery",
    },
    delivery: { lagos: "2-4 days" },
    images: [
      `${CAP_DIR}/beanie.png`,
      `${CAP_DIR}/beanie-2.png`,
      `${CAP_DIR}/beanie-3.png`,
    ],
    imageAlt: "Knitted cotton beanie with embroidered logo",
    terms: ["knit hat", "winter hat", "skull cap", "branded beanie"],
    related: ["custom-bucket-hat", "baseball-cap", "hoodie"],
    source: "Price list p.10",
  }),
];

/** Clothing & Apparel — price list pages 10-12. */
export const clothing = [
  defineProduct({
    slug: "branded-polo-shirt",
    name: "Branded Polo Shirt",
    category: "clothing-apparel",
    short:
      "100% cotton polo in S-XXL with full-colour print or embroidery.",
    description:
      "The standard corporate polo: 100% cotton, available in a range of colours and sizes S through XXL, branded with a full-colour borderless print or monogram embroidery. Embroidery holds up better through repeated industrial washing, which matters for uniforms worn daily.",
    price: from(9500, 1, "shirt"),
    specs: {
      size: APPAREL_SIZES,
      material: "100% cotton, available in various colours",
      finishing: BORDERLESS_OR_EMBROIDERY,
    },
    delivery: { lagos: "3-5 days" },
    options: [
      {
        id: "order-type",
        label: "Order type",
        affectsPrice: true,
        options: [
          {
            id: "standard",
            label: "Standard branded polo",
            price: from(9500, 1, "shirt"),
          },
          {
            id: "customised",
            label: "Fully customised polo",
            detail: "Priced per shirt on a batch of 10",
            price: from(12500, 1, "shirt", "minimum order of 10 pieces"),
          },
        ],
      },
    ],
    images: [
      `${WEAR_DIR}/round-neck-polo.png`,
      `${WEAR_DIR}/branded-collar-t-shirt-lagos-nigeria.jpg`,
      `${WEAR_DIR}/branded-collar-t-shirt-lagos-nigeria2.jpg`,
      `${WEAR_DIR}/custom-branded-collar-t-shirt-lagos-nigeria.jpg`,
    ],
    imageAlt: "Branded cotton polo shirt with embroidered chest logo",
    featured: true,
    terms: [
      "polo",
      "collar t shirt",
      "corporate shirt",
      "uniform shirt",
      "staff shirt",
      "company polo",
    ],
    related: ["round-neck-t-shirt", "sweatshirt", "apron"],
    source: "Price list p.11",
  }),

  defineProduct({
    slug: "round-neck-t-shirt",
    name: "Round Neck T-Shirt",
    category: "clothing-apparel",
    short:
      "100% cotton crew-neck T-shirt in S-XXL, printed or embroidered.",
    description:
      "A plain crew-neck cotton T-shirt branded with a full-colour borderless print or embroidery. The most cost-effective way to kit out an event crew, church programme, campaign team or merchandise run.",
    price: from(6000, 1, "shirt"),
    specs: {
      size: APPAREL_SIZES,
      material: "100% cotton, available in various colours",
      finishing: BORDERLESS_OR_EMBROIDERY,
    },
    delivery: { lagos: "2-5 days" },
    images: [
      `${WEAR_DIR}/folded-round-neck.png`,
      `${WEAR_DIR}/folded-round-neck-2.png`,
      `${WEAR_DIR}/folded-round-neck-4.png`,
    ],
    imageAlt: "Folded cotton round neck T-shirt with printed design",
    featured: true,
    terms: [
      "t shirt",
      "tshirt",
      "tee shirt",
      "crew neck",
      "event shirt",
      "custom t shirt",
    ],
    related: ["branded-polo-shirt", "sweatshirt", "hoodie"],
    source: "Price list p.11",
  }),

  defineProduct({
    slug: "hoodie",
    name: "Hoodie",
    category: "clothing-apparel",
    short:
      "100% cotton hooded sweatshirt in S-XXL with print or embroidery.",
    description:
      "A cotton pullover hoodie branded with a full-colour borderless print or embroidery, available in a range of colours and sizes S through XXL. The anchor piece for most merchandise drops and team kit.",
    price: from(21000, 1, "hoodie"),
    specs: {
      size: APPAREL_SIZES,
      material: "100% cotton, available in various colours",
      finishing: BORDERLESS_OR_EMBROIDERY,
    },
    delivery: { lagos: "3-5 days" },
    images: [`${WEAR_DIR}/hoodie.png`],
    imageAlt: "Cotton pullover hoodie with printed branding",
    terms: ["hooded sweatshirt", "pullover", "merch hoodie", "custom hoodie"],
    related: ["sweatshirt", "varsity-jacket", "round-neck-t-shirt"],
    source: "Price list p.11",
  }),

  defineProduct({
    slug: "sweatshirt",
    name: "Sweatshirt",
    category: "clothing-apparel",
    short:
      "100% cotton crew sweatshirt in S-XXL, printed or embroidered.",
    description:
      "A crew-neck cotton sweatshirt branded with a full-colour borderless print or monogram embroidery, in a range of colours and sizes S through XXL.",
    price: from(21000, 1, "sweatshirt"),
    specs: {
      size: APPAREL_SIZES,
      material: "100% cotton, available in various colours",
      finishing: BORDERLESS_OR_EMBROIDERY,
    },
    delivery: { lagos: "2-5 days" },
    images: [
      `${WEAR_DIR}/sweatshirt.png`,
      `${WEAR_DIR}/sweatshirt-2.png`,
      `${WEAR_DIR}/sweatshirt-3.png`,
    ],
    imageAlt: "Cotton crew neck sweatshirt with printed branding",
    terms: ["jumper", "crew neck sweater", "merch sweatshirt"],
    related: ["hoodie", "varsity-jacket", "round-neck-t-shirt"],
    source: "Price list p.11",
  }),

  defineProduct({
    slug: "varsity-jacket",
    name: "Varsity Jacket",
    category: "clothing-apparel",
    short:
      "100% cotton varsity jacket in S-XXL with print or embroidery.",
    description:
      "A varsity jacket in 100% cotton, branded with a full-colour borderless print or embroidered chest and back panels. Used for graduating sets, alumni groups, sports teams and premium merchandise.",
    price: from(21000, 1, "jacket"),
    specs: {
      size: APPAREL_SIZES,
      material: "100% cotton, available in various colours",
      finishing: BORDERLESS_OR_EMBROIDERY,
    },
    delivery: { lagos: "2-5 days" },
    images: [
      `${WEAR_DIR}/versity-jacket.png`,
      `${WEAR_DIR}/versity-jacket-2.png`,
      `${WEAR_DIR}/versity-jacket-3.png`,
    ],
    imageAlt: "Varsity jacket with embroidered chest branding",
    terms: [
      "letterman jacket",
      "baseball jacket",
      "graduation jacket",
      "set jacket",
    ],
    related: ["hoodie", "sweatshirt", "branded-polo-shirt"],
    source: "Price list p.12",
  }),

  defineProduct({
    slug: "safety-jacket",
    name: "Safety Reflective Jacket",
    category: "clothing-apparel",
    short:
      "Waterproof mesh hi-vis jacket in S-XXXL with full-colour branding.",
    description:
      "A high-visibility reflective jacket in waterproof mesh, sized S through XXXL and branded with a full-colour borderless print. Standard issue for site crews, marshals, dispatch riders and road teams.",
    price: from(5000, 1, "jacket"),
    specs: {
      size: "S, M, L, XL, XXL, XXXL",
      material: "Mesh waterproof",
      finishing: "Full colour borderless print",
    },
    delivery: { lagos: "2-5 days" },
    images: [`${WEAR_DIR}/safety-jacket.png`],
    imageAlt: "High-visibility reflective safety jacket with branding",
    terms: [
      "reflective vest",
      "hi vis jacket",
      "safety vest",
      "workwear",
      "construction vest",
    ],
    related: ["branded-polo-shirt", "round-neck-t-shirt", "apron"],
    source: "Price list p.11",
  }),

  defineProduct({
    slug: "apron",
    name: "Apron",
    category: "clothing-apparel",
    short:
      "100% cotton apron with full-colour borderless print or embroidery.",
    description:
      "A cotton apron branded with a full-colour borderless print or embroidery, in a range of colours. Used by restaurants, bakeries, salons and cooking-demo activations.",
    price: from(13000, 1, "apron"),
    specs: {
      material: "100% cotton apron available in various colours",
      finishing: BORDERLESS_OR_EMBROIDERY,
    },
    delivery: { lagos: "2-4 days" },
    images: [
      `${WEAR_DIR}/apron.png`,
      `${WEAR_DIR}/apron-2.png`,
      `${WEAR_DIR}/apron-3.png`,
      `${WEAR_DIR}/apron-4.png`,
    ],
    imageAlt: "Cotton apron with printed branding",
    terms: ["chef apron", "kitchen apron", "restaurant apron", "salon apron"],
    related: ["branded-polo-shirt", "face-towel", "safety-jacket"],
    source: "Price list p.10",
  }),

  defineProduct({
    slug: "branded-towel",
    name: "Bath Towel",
    category: "clothing-apparel",
    short:
      "Looped-weave cotton bath towel with monogram embroidery.",
    description:
      "A full-size bath towel woven with dense thread loops for absorbency, finished with monogram embroidery. Ordered by hotels, spas and gyms, and as a premium corporate gift.",
    price: from(16500, 1, "towel"),
    specs: {
      material:
        "100% fabric woven with many loops of thread, available in various colours",
      finishing: "Monogram/embroidery",
    },
    delivery: { lagos: "3-5 days" },
    images: [
      `${WEAR_DIR}/branded-towel-lagos-nigeria.jpg`,
      `${WEAR_DIR}/branded-towel2-lagos-nigeria.png`,
      `${WEAR_DIR}/branded-towel3-lagos-nigeria.png`,
      `${WEAR_DIR}/branded-towel4-lagos-nigeria.png`,
    ],
    imageAlt: "Cotton bath towel with embroidered monogram",
    featured: true,
    terms: ["towel", "hotel towel", "gym towel", "embroidered towel", "spa towel"],
    related: ["face-towel", "apron", "branded-polo-shirt"],
    source: "Price list p.11",
  }),

  defineProduct({
    slug: "face-towel",
    name: "Face Towel",
    category: "clothing-apparel",
    short: "Small cotton face towel with monogram embroidery.",
    description:
      "A compact cotton face towel finished with monogram embroidery, available in a range of colours. Ordered in batches of 10 for gym kit, hotel amenities and event giveaways.",
    price: from(40000, 10, "towel"),
    specs: {
      material: "Top quality cotton towel available in various colours",
      finishing: "Monogram/embroidery",
    },
    delivery: { lagos: "3-5 days" },
    images: [`${WEAR_DIR}/face-towel.png`],
    imageAlt: "Small cotton face towel with embroidered logo",
    terms: ["hand towel", "gym towel", "sports towel", "embroidered towel"],
    related: ["branded-towel", "apron"],
    source: "Price list p.10",
  }),
];

/** Clothing Tags & Labels — price list page 12. */
export const clothingTags = [
  defineProduct({
    slug: "cloth-paper-tag",
    name: "Cloth Paper Tag",
    category: "clothing-tags-labels",
    short:
      "Printed paper swing tag for garments, carrying branding, size and price.",
    description:
      "A printed swing tag that hangs from the garment carrying your logo, sizing, care notes and price. The finishing touch that makes a piece read as a labelled product rather than an unbranded item.",
    price: from(21000, 10, "tag"),
    specs: {
      finishing: "Full colour printing",
    },
    delivery: { lagos: "2-5 days" },
    images: [
      `${TAG_DIR}/cloth-paper-tag.png`,
      `${TAG_DIR}/cloth-paper-tag-2.png`,
      `${TAG_DIR}/cloth-paper-tag-3.png`,
    ],
    imageAlt: "Printed paper swing tag attached to a garment",
    terms: [
      "swing tag",
      "hang tag",
      "price tag",
      "garment tag",
      "clothing label",
    ],
    related: ["woven-label", "sticker-print", "premium-business-card"],
    source: "Price list p.12",
    review: [
      'The Cloth Paper Tag entry in the price list repeats the material, sizes and finishing text from the Versity Jacket entry directly above it ("100% COTTON... Sizes: S, M, L, XL, XXL"), and repeats its ₦21,000 price. Those copied specs have been left out rather than published as fact. The real material, size and batch size for this tag need confirming, and the price should be re-checked.',
    ],
  }),

  defineProduct({
    slug: "woven-label",
    name: "Woven Label",
    category: "clothing-tags-labels",
    short:
      "Cotton label with the design woven in, produced per 1,000.",
    description:
      "A garment label where the design is woven into the cotton rather than printed onto it, so it survives washing and wear for the life of the piece. Produced in runs of 1,000 with a roughly three-week lead time.",
    price: from(100000, 1000, "label"),
    specs: {
      material: "100% cotton, available in various colours",
      finishing: "A well detailed design woven on cotton material",
    },
    delivery: { lagos: "3 weeks" },
    images: [
      `${TAG_DIR}/woven-label.jpeg`,
      `${TAG_DIR}/woven-label-2.jpeg`,
      `${TAG_DIR}/woven-label-3.jpeg`,
      `${TAG_DIR}/custom-clothing-labels.jpeg`,
      `${TAG_DIR}/convincing-sweatshirt-labels.jpeg`,
    ],
    imageAlt: "Woven cotton clothing label with brand name",
    terms: [
      "garment label",
      "care label",
      "brand label",
      "neck label",
      "fabric label",
    ],
    related: ["cloth-paper-tag", "sticker-print", "branded-polo-shirt"],
    source: "Price list p.12",
  }),
];
