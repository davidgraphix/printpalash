import type { Category } from "./types";

/**
 * Product categories. Names follow the terminology used in the PrintPalash
 * price list so that the site, the price list and the sales team all describe
 * the same thing the same way.
 */
export const CATEGORIES: Category[] = [
  {
    slug: "bags",
    name: "Bags",
    tagline: "Paper bags, courier bags, tote bags and poly bags",
    description:
      "Branded bags for retail, e-commerce and events — laminated art card paper bags with rope handles, sealable courier bags for dispatch, screen-printed poly and singlet nylons, and cotton or canvas tote bags.",
    seo: {
      title: "Custom Paper Bag & Branded Bag Printing in Lagos",
      description:
        "Custom paper bags, courier bags, kraft bags, tote bags and poly bags printed and branded in Lagos. Laminated art card, rope handles, full-colour printing and nationwide delivery.",
      keywords: [
        "custom paper bags Lagos",
        "paper bag printing Lagos",
        "courier bag printing Nigeria",
        "branded tote bags Lagos",
        "kraft bag printing Lagos",
      ],
    },
    faqs: [
      {
        question: "What is the minimum order for custom paper bags?",
        answer:
          "Paper bags are produced in batches of 100. Tote bags, jute bags, drawstring bags and fanny packs are produced in batches of 10 because they are sewn rather than die-cut.",
      },
      {
        question: "What material are PrintPalash paper bags made from?",
        answer:
          "A2 to A5 paper bags and wine bags use 300gsm art or FBB card, laminated and folded into shape with rope or ribbon handles. Kraft bags use 130gsm brown or white non-laminated paper.",
      },
      {
        question: "Can I have a gold foiled logo on my paper bags?",
        answer:
          "Yes. Paper bags can be produced with full-colour printing or with a gold foiled logo, then laminated and finished with rope or ribbon handles.",
      },
    ],
    relatedServiceSlugs: ["paper-bag-printing-lagos", "packaging-printing-lagos"],
  },
  {
    slug: "banners-large-format",
    name: "Banners & Large Format",
    tagline: "Roll-ups, backdrops, gazebos, stickers and signage",
    description:
      "Large format printing for exhibitions, storefronts and outdoor advertising — roll-up and X-banners, pop-up and wooden-frame backdrops, teardrop and feather flags, branded gazebo tents, snapper frames and adhesive vinyl stickers.",
    seo: {
      title: "Banner Printing & Large Format Printing in Lagos",
      description:
        "Roll-up banners, X-banners, event backdrops, teardrop flags, gazebo tents, snapper frames and vinyl stickers printed in Lagos for exhibitions, retail and outdoor advertising.",
      keywords: [
        "banner printing Lagos",
        "roll up banner Lagos",
        "event backdrop printing Lagos",
        "large format printing Nigeria",
        "gazebo tent branding Lagos",
      ],
    },
    faqs: [
      {
        question: "Which banner is best for a trade show stand?",
        answer:
          "Roll-up banners work for narrow spaces and are the quickest to set up. For a full stand wall, a pop-up aluminium backdrop at 3m x 3m or 4m x 3m gives a seamless branded background and is reusable.",
      },
      {
        question: "Are roll-up banner stands reusable?",
        answer:
          "Yes. Big base and small base roll-ups, pop-up backdrops, teardrop and feather flag stands and snapper frames all use reusable hardware — only the printed material needs replacing for a new campaign.",
      },
      {
        question: "What material do you print outdoor banners on?",
        answer:
          "Outdoor banners are printed on solite or flex banner material. Flags use full-colour flag fabric hemmed all round with a pole pocket, and stickers use adhesive vinyl (SAV).",
      },
    ],
    relatedServiceSlugs: [
      "banner-printing-lagos",
      "roll-up-banner-printing-lagos",
      "sticker-printing-lagos",
    ],
  },
  {
    slug: "box-packaging",
    name: "Box & Packaging",
    tagline: "Mailer boxes, drawer boxes, food packs and pizza boxes",
    description:
      "Custom packaging boxes for product brands, food businesses and e-commerce — rigid drawer and magnetic flip boxes wrapped in laminated paper, corrugated mailer and pizza boxes, and FBB card food packs.",
    seo: {
      title: "Custom Packaging & Box Printing in Lagos",
      description:
        "Custom packaging boxes printed in Lagos — magnetic flip boxes, drawer boxes, corrugated mailer boxes, pizza boxes and food packs with matte or gloss lamination, foiling and UV spot finishing.",
      keywords: [
        "packaging printing Lagos",
        "custom boxes Lagos",
        "mailer box printing Nigeria",
        "food packaging printing Lagos",
        "magnetic gift box Lagos",
      ],
    },
    faqs: [
      {
        question: "How long does custom box production take?",
        answer:
          "Rigid boxes take 10-12 working days for delivery within Lagos and 12-14 working days outside Lagos. Corrugated mailer and pizza boxes take 10-14 working days within Lagos and 12-16 working days for other states.",
      },
      {
        question: "What finishing options are available on packaging boxes?",
        answer:
          "Full-colour branding with matte or gloss lamination, foiled letters or pictures, and UV spot effect. Corrugated boxes can be printed in one colour or full colour, then die-cut and folded.",
      },
      {
        question: "What are rigid drawer and magnetic flip boxes made of?",
        answer:
          "Both are crafted from strawboard wrapped with laminated 135gsm or special paper. Magnetic flip boxes additionally carry a magnet in the lid closure.",
      },
    ],
    relatedServiceSlugs: ["packaging-printing-lagos", "label-printing-lagos"],
  },
  {
    slug: "brochures",
    name: "Brochures",
    tagline: "Company profiles, funeral brochures and tri-folds",
    description:
      "Multi-page brochures printed on 300gsm art card covers with matte paper inner pages — company profiles, product catalogues, funeral programmes and folded tri-fold leaflets, saddle-stitched or perfect bound.",
    seo: {
      title: "Brochure Printing in Lagos — Company Profiles & Funeral Brochures",
      description:
        "Brochure printing in Lagos for company profiles, product catalogues, funeral programmes and tri-fold leaflets. 300gsm art card covers, matte inner pages, saddle stitching or perfect binding.",
      keywords: [
        "brochure printing Lagos",
        "company profile printing Lagos",
        "funeral brochure printing Nigeria",
        "tri fold brochure Lagos",
      ],
    },
    faqs: [
      {
        question: "How are PrintPalash brochures bound?",
        answer:
          "Brochures are finished with saddle stitching or perfect binding depending on page count. Covers are 300gsm art card and inner pages are 135gsm or 150gsm matte paper.",
      },
      {
        question: "How quickly can a funeral brochure be printed?",
        answer:
          "Funeral brochures are delivered in 5-7 working days within Lagos and 7-9 working days for other states in Nigeria. The design includes biography, tributes, church programme and photo gallery sections.",
      },
      {
        question: "What is the difference between a tri-fold and a brochure?",
        answer:
          "A tri-fold is a single A4 sheet creased into three panels, printed front and back. A brochure is a multi-page booklet with a separate cover stock and bound inner pages.",
      },
    ],
    relatedServiceSlugs: [
      "brochure-printing-lagos",
      "document-printing-binding-lagos",
    ],
  },
  {
    slug: "business-cards",
    name: "Business Cards",
    tagline: "Premium and thank-you cards on thick card stock",
    description:
      "Business cards printed on art card stock with 300gsm and 600gsm thickness options, matte or gloss lamination, and round or square corner finishing.",
    seo: {
      // Distinct from the /services/business-card-printing-lagos page, which
      // targets the same phrase from a service angle. Two pages sharing one
      // title makes them compete with each other.
      title: "Business Cards in Lagos — Premium & Thank You Cards",
      description:
        "Premium business card printing in Lagos on 300gsm and 600gsm art card with matte or gloss lamination and round or square corners. Delivered in 1-3 days within Lagos.",
      keywords: [
        "business card printing Lagos",
        "premium business cards Nigeria",
        "complimentary card printing Lagos",
        "thank you card printing Lagos",
      ],
    },
    faqs: [
      {
        question: "How fast can I get business cards printed in Lagos?",
        answer:
          "Premium business cards are delivered in 1-3 days. Thank-you cards take 3-5 working days within Lagos and 5-7 working days for other states in Nigeria.",
      },
      {
        question: "What card thickness do you print business cards on?",
        answer:
          "Art card paper stock is available in 300gsm and 600gsm. Thank-you cards are printed on 600gsm matte card stock at A6 size.",
      },
      {
        question: "Can I get rounded corners on my business cards?",
        answer:
          "Yes. Premium business cards are finished with full-colour printing, matte or gloss lamination, and either round or square corner options.",
      },
    ],
    relatedServiceSlugs: ["business-card-printing-lagos"],
  },
  {
    slug: "calendars",
    name: "Calendars",
    tagline: "Wall and desk calendars with Wire-O binding",
    description:
      "Corporate wall and table calendars printed on matte or art stock and finished with spiral Wire-O binding, in one-month or two-months-per-page layouts.",
    seo: {
      title: "Calendar Printing in Lagos — Wall & Table Calendars",
      description:
        "Corporate calendar printing in Lagos. A2 and A3 wall calendars and desk table calendars on 150gsm and 250gsm stock with spiral Wire-O binding, delivered in 3-4 days.",
      keywords: [
        "calendar printing Lagos",
        "corporate calendar Nigeria",
        "wall calendar printing Lagos",
        "table calendar printing Lagos",
      ],
    },
    faqs: [
      {
        question: "How long does calendar printing take?",
        answer:
          "Wall and table calendars are delivered in 3-4 days.",
      },
      {
        question: "How many pages does a wall calendar have?",
        answer:
          "The standard A2 and A3 wall calendars run two months per page across 7 pages. Table calendars are available in both two-months-per-page and one-month-per-page layouts.",
      },
      {
        question: "How are calendars bound?",
        answer:
          "All calendars are finished with spiral Wire-O binding. Table calendars additionally receive matte or gloss lamination.",
      },
    ],
    relatedServiceSlugs: ["document-printing-binding-lagos"],
  },
  {
    slug: "campaign-materials",
    name: "Campaign Materials",
    tagline: "Posters, banners, caps and shirts for campaigns",
    description:
      "Print and branding materials for political and awareness campaigns — posters, banners, branded caps and campaign T-shirts produced for rallies, canvassing and field teams.",
    seo: {
      title: "Political Campaign Printing in Lagos — Posters, Banners & Shirts",
      description:
        "Campaign printing in Lagos for political and awareness campaigns: posters, banners, branded caps and campaign T-shirts produced at volume for rallies and field teams.",
      keywords: [
        "campaign poster printing Lagos",
        "political campaign printing Nigeria",
        "campaign t-shirt printing Lagos",
        "campaign banner Lagos",
      ],
    },
    faqs: [
      {
        question: "Can PrintPalash handle large campaign print volumes?",
        answer:
          "Yes. Campaign posters, banners, caps and T-shirts are produced at volume. Because quantities and deadlines vary widely on campaigns, pricing is quoted per project rather than from a fixed list.",
      },
      {
        question: "How do I get a price for campaign materials?",
        answer:
          "Send your quantity, sizes, artwork status and deadline through the quote form or on WhatsApp and the team will respond with pricing, timeline and delivery options.",
      },
    ],
    relatedServiceSlugs: [
      "flyer-printing-lagos",
      "banner-printing-lagos",
      "tshirt-printing-lagos",
    ],
  },
  {
    slug: "caps-hats",
    name: "Caps & Hats",
    tagline: "Baseball, snapback, trucker caps, bucket hats and beanies",
    description:
      "Branded headwear finished with full-colour print or monogram embroidery — baseball and VIP caps, snapbacks, trucker caps, cotton bucket hats and thick cotton beanies.",
    seo: {
      title: "Custom Cap & Hat Branding in Lagos",
      description:
        "Custom branded caps and hats in Lagos — baseball, snapback, trucker and bucket styles plus beanies, finished with full-colour print or embroidery and delivered in 2-4 days.",
      keywords: [
        "custom cap printing Lagos",
        "branded caps Nigeria",
        "snapback cap branding Lagos",
        "embroidered cap Lagos",
      ],
    },
    faqs: [
      {
        question: "Do you print or embroider caps?",
        answer:
          "Both. Caps and hats can be finished with full-colour print or with monogram embroidery, depending on the look you want.",
      },
      {
        question: "How long does cap branding take?",
        answer: "Branded caps and hats are delivered in 2-4 days.",
      },
      {
        question: "Can I order a single branded cap?",
        answer:
          "Yes. Caps, hats and beanies are priced per piece, so you can order one or a full team set.",
      },
    ],
    relatedServiceSlugs: ["tshirt-printing-lagos"],
  },
  {
    slug: "clothing-apparel",
    name: "Clothing & Apparel",
    tagline: "Polos, T-shirts, hoodies, aprons and jackets",
    description:
      "Branded apparel on 100% cotton and technical fabrics — polo shirts, round-neck T-shirts, hoodies, sweatshirts, varsity jackets, aprons, towels and reflective safety jackets, in sizes S to XXL.",
    seo: {
      title: "T-Shirt & Branded Clothing Printing in Lagos",
      description:
        "Custom T-shirt, polo, hoodie and workwear printing in Lagos on 100% cotton in sizes S to XXL, with full-colour borderless print or embroidery. Delivered in 2-5 days.",
      keywords: [
        "t-shirt printing Lagos",
        "polo shirt branding Lagos",
        "custom hoodie printing Nigeria",
        "corporate uniform printing Lagos",
        "branded apron Lagos",
      ],
    },
    faqs: [
      {
        question: "What sizes are available for branded apparel?",
        answer:
          "Polo shirts, T-shirts, hoodies, sweatshirts and varsity jackets come in S, M, L, XL and XXL. Reflective safety jackets also go up to XXXL.",
      },
      {
        question: "Is printing or embroidery better for corporate shirts?",
        answer:
          "Full-colour borderless print suits large multi-colour artwork and photographs. Monogram embroidery suits logos on polos and jackets and is more durable through repeated washing. Both options are available.",
      },
      {
        question: "How long does apparel branding take?",
        answer:
          "Most apparel is delivered in 2-5 days. Towels take 3-5 days, and larger customised polo runs are quoted per batch of 10.",
      },
    ],
    relatedServiceSlugs: ["tshirt-printing-lagos"],
  },
  {
    slug: "clothing-tags-labels",
    name: "Clothing Tags & Labels",
    tagline: "Swing tags and woven labels for fashion brands",
    description:
      "Brand identity pieces for fashion labels — printed paper swing tags and woven cotton labels stitched into garments.",
    seo: {
      title: "Clothing Tag & Woven Label Printing in Lagos",
      description:
        "Custom clothing swing tags and woven labels for fashion brands in Lagos. Full-colour printed paper tags and detailed designs woven on cotton label material.",
      keywords: [
        "clothing tag printing Lagos",
        "woven label Nigeria",
        "custom garment labels Lagos",
        "swing tag printing Lagos",
      ],
    },
    faqs: [
      {
        question: "How long do woven labels take to produce?",
        answer:
          "Woven labels take about 3 weeks because the design is woven into the cotton material rather than printed onto it. They are produced in batches of 1,000.",
      },
      {
        question: "What is the difference between a printed tag and a woven label?",
        answer:
          "A printed paper swing tag hangs off the garment and carries branding, sizing and price. A woven label is stitched into the garment permanently and carries the brand mark and care information.",
      },
    ],
    relatedServiceSlugs: ["label-printing-lagos", "sticker-printing-lagos"],
  },
  {
    slug: "envelopes",
    name: "Envelopes",
    tagline: "C4, DL and window envelopes on bond paper",
    description:
      "Branded business envelopes printed in full colour on 100gsm bond paper and folded to C4, DL or window DL specification.",
    seo: {
      title: "Custom Envelope Printing in Lagos",
      description:
        "Branded envelope printing in Lagos — C4, DL and window DL envelopes on 100gsm bond paper with vibrant full-colour printing, delivered in 4-7 working days.",
      keywords: [
        "envelope printing Lagos",
        "custom envelopes Nigeria",
        "branded business envelopes Lagos",
        "window envelope printing Lagos",
      ],
    },
    faqs: [
      {
        question: "What paper are your envelopes printed on?",
        answer:
          "All envelopes are printed on 100gsm bond paper with full-colour printing, then folded to specification.",
      },
      {
        question: "How long does envelope printing take?",
        answer:
          "C4 and DL envelopes take 4-7 working days. Window DL envelopes take 4-5 working days.",
      },
    ],
    relatedServiceSlugs: ["document-printing-binding-lagos"],
  },
  {
    slug: "events-souvenirs",
    name: "Events & Souvenirs",
    tagline: "Mugs, notebooks, wristbands, umbrellas and keyrings",
    description:
      "Branded giveaways and event items — ceramic and magic mugs, notebooks and journals, event wristbands and conference tags, paper cups, umbrellas, throw pillows, pop sockets and keyrings.",
    seo: {
      title: "Souvenir & Corporate Gift Branding in Lagos",
      description:
        "Branded souvenirs and corporate gifts in Lagos — magic mugs, notebooks, event wristbands, conference tags, paper cups, umbrellas, keyrings and pop sockets with full-colour printing.",
      keywords: [
        "souvenir printing Lagos",
        "branded mugs Lagos",
        "corporate gifts Nigeria",
        "event wristband printing Lagos",
        "custom notebook printing Lagos",
      ],
    },
    faqs: [
      {
        question: "What souvenirs work best for a corporate event?",
        answer:
          "Branded notebooks, metallic pens, mugs and keyrings are the most requested corporate items. For conferences, event wristbands and lanyard conference tags handle access control while carrying your branding.",
      },
      {
        question: "How does a magic mug work?",
        answer:
          "A magic mug is a black ceramic mug that turns white and reveals your printed design when hot liquid is poured in. It is available in small and big sizes.",
      },
      {
        question: "How long does souvenir branding take?",
        answer:
          "Mugs are delivered in 1-5 working days. Pop sockets take 3-5 working days, throw pillows and umbrellas 2-5 working days within Lagos, and paper cups 5-7 working days.",
      },
    ],
    relatedServiceSlugs: ["tshirt-printing-lagos", "sticker-printing-lagos"],
  },
  {
    slug: "flyers-posters",
    name: "Flyers & Posters",
    tagline: "A1 to A6 flyers, posters and folded leaflets",
    description:
      "Full-colour direct-image flyers and posters on 150gsm matte or art paper, trimmed to size and wrapped for delivery — from A1 posters down to A6 handbills and folded DL leaflets.",
    seo: {
      title: "Flyer & Poster Printing in Lagos",
      description:
        "Flyer and poster printing in Lagos on 150gsm matte or art paper. A1, A2 and A3 posters, A5 and A6 flyers and folded DL leaflets with same-day delivery within Lagos.",
      keywords: [
        "flyer printing Lagos",
        "poster printing Lagos",
        "A5 flyer printing Nigeria",
        "handbill printing Lagos",
        "same day flyer printing Lagos",
      ],
    },
    faqs: [
      {
        question: "Can I get flyers printed the same day in Lagos?",
        answer:
          "Yes. A5, A6, DL, DL bifold and DL trifold flyers are available for same-day delivery within Lagos, and 3-4 working days for other states in Nigeria.",
      },
      {
        question: "What paper are flyers and posters printed on?",
        answer:
          "150gsm matte or art paper, printed full colour using direct-image printing, then trimmed to size and wrapped for delivery.",
      },
      {
        question: "Which flyer size should I choose?",
        answer:
          "A5 is the standard handout size and the most cost-effective for street and event distribution. A6 suits inserts and smaller giveaways, while DL folded leaflets carry more copy in a slim format.",
      },
    ],
    relatedServiceSlugs: ["flyer-printing-lagos", "brochure-printing-lagos"],
  },
  {
    slug: "invitations",
    name: "Invitations",
    tagline: "Wedding cards, acrylic invites and programmes",
    description:
      "Wedding and event invitations — transparent acrylic invites with foil lettering, 500gsm pearlescent card invitations with envelopes, passport-style wedding invites and A5 wedding programme brochures.",
    seo: {
      title: "Wedding Invitation Printing in Lagos",
      description:
        "Wedding invitation printing in Lagos — acrylic invitations with gold or silver foil, 500gsm pearlescent card invites with envelopes, passport invites and A5 wedding programmes.",
      keywords: [
        "wedding invitation printing Lagos",
        "acrylic wedding invitation Nigeria",
        "wedding card printing Lagos",
        "wedding programme printing Lagos",
      ],
    },
    faqs: [
      {
        question: "How far in advance should I order wedding invitations?",
        answer:
          "Card invitations take 3-5 working days within Lagos and 5-7 working days for other states. Acrylic invitations take 7-10 working days within Lagos and 10-15 working days for other states, so order those well ahead.",
      },
      {
        question: "Do invitations come with envelopes?",
        answer:
          "Yes. Card invitations are printed on 500gsm pearlescent card and supplied with envelopes. Acrylic invitations come with a pearlescent envelope card, each sealed in an envelope.",
      },
      {
        question: "Can I have gold foil lettering on my invitation?",
        answer:
          "Yes. Acrylic invitations are finished with gold or silver foil letters, and passport-style wedding invites can carry a gold or silver foil logo.",
      },
    ],
    relatedServiceSlugs: ["business-card-printing-lagos", "brochure-printing-lagos"],
  },
  {
    slug: "office-stationery",
    name: "Office Stationery",
    tagline: "Letterheads, ID cards, receipts, lanyards and pens",
    description:
      "Corporate stationery and office branding — letterheads, invoice receipt books, presentation folders, PVC ID cards and kits, custom lanyards, block pads, branded pens and mousepads.",
    seo: {
      title: "Corporate Stationery & Letterhead Printing in Lagos",
      description:
        "Office stationery printing in Lagos — letterheads, invoice receipt books, presentation folders, PVC ID cards, lanyards, block pads, branded pens and mousepads.",
      keywords: [
        "letterhead printing Lagos",
        "office stationery printing Nigeria",
        "ID card printing Lagos",
        "custom lanyard printing Lagos",
        "invoice receipt printing Lagos",
      ],
    },
    faqs: [
      {
        question: "How quickly can letterheads be printed?",
        answer:
          "Letterheads are available for same-day delivery within Lagos and 2-3 working days for other states in Nigeria.",
      },
      {
        question: "What is included in an ID card kit?",
        answer:
          "The PVC plastic card is printed full colour on the front and greyscale on the back, and supplied with an ID card case and rope.",
      },
      {
        question: "Are invoice receipt books carbonised?",
        answer:
          "Yes. Invoice receipts use carbonised paper with 50 original and 50 duplicate inner pages, printed in one or two colours and perforated for easy tear-off.",
      },
    ],
    relatedServiceSlugs: [
      "document-printing-binding-lagos",
      "business-card-printing-lagos",
    ],
  },
];

export const CATEGORY_BY_SLUG = new Map(CATEGORIES.map((c) => [c.slug, c]));

export function getCategory(slug: string): Category | undefined {
  return CATEGORY_BY_SLUG.get(slug);
}
