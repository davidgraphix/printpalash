import Link from "next/link";

/**
 * Topical section for the homepage.
 *
 * Each card links into the matching category or service so the homepage
 * actually routes readers and crawlers into the site's structure, instead of
 * describing services that go nowhere.
 */
const TOPICS = [
  {
    title: "Flyer & poster printing",
    text: "Sharp, colourful flyers and posters for promotions, product launches, church programmes and real estate marketing. Same-day options within Lagos.",
    href: "/products/category/flyers-posters",
    linkLabel: "See flyers and posters",
  },
  {
    title: "Business card printing",
    text: "Premium cards on 300gsm and 600gsm art stock with matte or gloss lamination and round or square corners, turned around in 1-3 days.",
    href: "/products/category/business-cards",
    linkLabel: "See business cards",
  },
  {
    title: "Packaging & box printing",
    text: "Rigid drawer and magnetic gift boxes, corrugated mailer and pizza boxes, and FBB food packs, printed and finished to your brand.",
    href: "/products/category/box-packaging",
    linkLabel: "See packaging and boxes",
  },
  {
    title: "Custom paper bags",
    text: "Laminated 300gsm art card bags with rope or ribbon handles from A5 to A2, plus kraft, jute, tote, courier and poly bags.",
    href: "/products/category/bags",
    linkLabel: "See bags",
  },
  {
    title: "T-shirt & apparel branding",
    text: "Polos, round-neck tees, hoodies, sweatshirts and workwear in sizes S to XXL, branded by full-colour print or embroidery.",
    href: "/products/category/clothing-apparel",
    linkLabel: "See branded apparel",
  },
  {
    title: "Banners & large format",
    text: "Roll-up and X-banners, pop-up and wooden-frame backdrops, teardrop and feather flags, gazebo tents and vinyl stickers.",
    href: "/products/category/banners-large-format",
    linkLabel: "See banners and signage",
  },
];

export default function HomeSEOSection() {
  return (
    <section className="bg-white py-10 lg:py-14">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 text-center">
            <p className="mb-1.5 text-sm font-bold uppercase tracking-wide text-red-600">
              Printing services in Lagos, Nigeria
            </p>

            <h2 className="text-2xl font-extrabold tracking-tight text-gray-950 lg:text-4xl">
              Printing, packaging and branding for Lagos businesses
            </h2>

            <p className="mx-auto mt-2.5 max-w-3xl leading-relaxed text-gray-700">
              PrintPalash produces print and branded materials for businesses,
              schools, churches, event planners, fashion labels, restaurants and
              corporate organisations across Lagos and the rest of Nigeria.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {TOPICS.map((item) => (
              <article
                key={item.title}
                className="rounded-xl border border-gray-200 bg-gray-50 p-5 transition hover:border-red-200 hover:bg-red-50"
              >
                <h3 className="text-base font-extrabold text-gray-950">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-700">
                  {item.text}
                </p>
                <Link
                  href={item.href}
                  className="mt-2.5 inline-flex text-sm font-bold text-red-600 hover:text-red-700"
                >
                  {item.linkLabel} &rarr;
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-xl bg-gray-950 p-6 text-white lg:p-8">
            <h2 className="text-xl font-extrabold lg:text-2xl">
              Why businesses choose PrintPalash
            </h2>

            <p className="mt-2.5 leading-relaxed text-gray-200">
              Every price on this site is published with the batch it covers, so
              you know what you are paying for before you ask. Every product
              page lists its material, size, finishing and delivery time. And
              because production runs in-house in Shomolu, we can turn flyers
              and letterheads around the same day when a deadline moves.
            </p>

            <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
              <Link
                href="/products"
                className="inline-flex justify-center rounded-lg bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
              >
                View products and prices
              </Link>

              <Link
                href="/services"
                className="inline-flex justify-center rounded-lg border border-white/25 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white hover:text-gray-950"
              >
                Browse printing services
              </Link>

              <Link
                href="/get-a-quote"
                className="inline-flex justify-center rounded-lg border border-white/25 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white hover:text-gray-950"
              >
                Get a quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
