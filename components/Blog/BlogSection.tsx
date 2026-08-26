import Link from "next/link";
import TrustedBrands from "@/components/Trusted-Brands/TrustedBrands";
import Footer from "@/components/Footer/Footer";

const articleSections = [
  {
    id: "why-professional-printing-matters",
    title: "Why Professional Printing Matters",
  },
  {
    id: "factors-to-consider",
    title: "Important Factors to Consider",
  },
  {
    id: "business-card-printing",
    title: "Business Card Printing in Lagos",
  },
  {
    id: "flyer-printing",
    title: "Flyer Printing in Lagos",
  },
  {
    id: "packaging-printing",
    title: "Packaging Printing and Why It Matters",
  },
  {
    id: "paper-bag-production",
    title: "Paper Bag Production in Lagos",
  },
  {
    id: "corporate-branding",
    title: "Corporate Branding Services",
  },
  {
    id: "souvenir-printing",
    title: "Souvenir Printing and Promotional Products",
  },
  {
    id: "tshirt-printing",
    title: "T-Shirt Printing and Apparel Branding",
  },
  {
    id: "large-format-printing",
    title: "Signage and Large Format Printing",
  },
  {
    id: "seo-online-visibility",
    title: "SEO and Online Visibility",
  },
  {
    id: "why-reviews-matter",
    title: "Why Reviews Matter",
  },
  {
    id: "best-packaging-company",
    title: "How to Choose the Best Packaging Company",
  },
  {
    id: "future-of-printing",
    title: "Future of Printing and Branding in Nigeria",
  },
  {
    id: "why-choose-printpalash",
    title: "Why Businesses Choose PrintPalash",
  },
];

const quickServices = [
  "Flyer Printing",
  "Business Card Printing",
  "Packaging Printing",
  "Paper Bag Production",
  "T-Shirt Printing",
  "Souvenir Branding",
  "Corporate Branding",
  "Banner Printing",
  "Sticker Printing",
];

function SectionHeading({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      className="scroll-mt-28 text-2xl font-black tracking-tight text-gray-950 lg:text-3xl"
    >
      {children}
    </h2>
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-base leading-8 text-gray-700 lg:text-lg">{children}</p>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 text-gray-700 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm leading-6 lg:text-base"
        >
          <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-red-600" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CTABox() {
  return (
    <div className="rounded-3xl border border-red-100 bg-red-50 p-6 lg:p-8">
      <p className="text-sm font-bold uppercase tracking-wide text-red-600">
        Ready to print?
      </p>

      <h3 className="mt-2 text-2xl font-black text-gray-950">
        Bring your brand materials to life with PrintPalash.
      </h3>

      <p className="mt-3 leading-7 text-gray-700">
        Order flyers, business cards, packaging, paper bags, T-shirts, banners,
        souvenirs, and other branded print materials with professional finishing
        and fast delivery in Lagos.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/products"
          className="inline-flex items-center justify-center rounded-xl bg-red-600 px-6 py-3 text-sm font-black text-white transition hover:bg-red-700"
        >
          View Products
        </Link>

        <Link
          href="/get-a-quote"
          className="inline-flex items-center justify-center rounded-xl border border-red-200 bg-white px-6 py-3 text-sm font-black text-red-600 transition hover:bg-red-600 hover:text-white"
        >
          Get a Quote
        </Link>
      </div>
    </div>
  );
}

export default function BlogSection() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "How to Choose the Best Printing Company in Lagos for Packaging, Branding, and Business Printing",
    description:
      "A complete guide for businesses choosing a professional printing company in Lagos for packaging, branding, flyers, business cards, paper bags, T-shirts, souvenirs, and corporate printing.",
    author: {
      "@type": "Organization",
      name: "PrintPalash",
    },
    publisher: {
      "@type": "Organization",
      name: "PrintPalash",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://printpalash.com/blog",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd),
        }}
      />

      <div className="min-h-screen bg-white">
        <section className="border-b bg-gradient-to-b from-red-50 via-white to-white">
          <div className="container mx-auto px-4 py-12 lg:py-20">
            <div className="mx-auto max-w-5xl text-center">
              <p className="mb-4 inline-flex rounded-full border border-red-100 bg-white px-4 py-2 text-sm font-bold text-red-600 shadow-sm">
                PrintPalash Blog
              </p>

              <h1 className="text-4xl font-black leading-tight tracking-tight text-gray-950 lg:text-6xl">
                How to Choose the Best Printing Company in Lagos for Packaging,
                Branding, and Business Printing
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-gray-700 lg:text-xl">
                A complete guide for businesses, brands, churches, schools,
                event planners, fashion brands, and corporate organizations
                looking for professional printing services in Lagos.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-gray-600">
                <span className="rounded-full bg-white px-4 py-2 shadow-sm">
                  By PrintPalash
                </span>
                <span className="rounded-full bg-white px-4 py-2 shadow-sm">
                  Printing & Branding
                </span>
                <span className="rounded-full bg-white px-4 py-2 shadow-sm">
                  Lagos, Nigeria
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b bg-white">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-wrap justify-center gap-3">
              {quickServices.map((service) => (
                <span
                  key={service}
                  className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-bold text-gray-700"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
            <aside className="hidden lg:block">
              <div className="sticky top-24 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="mb-4 text-sm font-black uppercase tracking-wide text-red-600">
                  In this article
                </p>

                <nav className="space-y-3">
                  {articleSections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block text-sm font-semibold leading-5 text-gray-600 transition hover:text-red-600"
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            <article className="mx-auto max-w-4xl">
              <div className="space-y-8">
                <Paragraph>
                  In today’s highly competitive business environment, branding
                  and printing are no longer optional. Every business, whether
                  small or large, depends on professional printing to build
                  visibility, attract customers, and establish credibility.
                </Paragraph>

                <Paragraph>
                  From business cards and flyers to packaging boxes and branded
                  paper bags, professionally printed materials influence how
                  customers perceive a brand. Businesses in Lagos compete daily
                  for customer attention, and quality printing can make the
                  difference between a business that looks professional and one
                  that gets ignored.
                </Paragraph>

                <Paragraph>
                  Customers naturally trust businesses with premium packaging,
                  sharp designs, quality finishing, and consistent branding.
                  Choosing the right printing company in Lagos is therefore an
                  important business decision.
                </Paragraph>

                <Paragraph>
                  PrintPalash is a premium printing and branding company in
                  Shomolu, Lagos, Nigeria, offering professional printing
                  services for businesses, organizations, fashion brands,
                  churches, schools, events, and corporate clients.
                </Paragraph>

                <Paragraph>
                  The company specializes in flyer printing, business card
                  printing, packaging printing, souvenir branding, T-shirt
                  printing, paper bag production, custom gift boxes, corporate
                  branding, and promotional materials.
                </Paragraph>

                <CTABox />

                <section className="space-y-5">
                  <SectionHeading id="why-professional-printing-matters">
                    Why Professional Printing Matters
                  </SectionHeading>

                  <Paragraph>
                    Professional printing improves customer trust and brand
                    recognition. When customers receive a professionally designed
                    flyer, brochure, or package, they immediately associate the
                    business with quality and professionalism.
                  </Paragraph>

                  <Paragraph>
                    Printing is often the first physical interaction customers
                    have with a brand. A premium business card creates stronger
                    networking opportunities, a professionally printed flyer can
                    improve marketing response, custom packaging improves
                    customer experience, branded souvenirs increase visibility,
                    and quality banners attract attention at events and business
                    locations.
                  </Paragraph>

                  <BulletList
                    items={[
                      "A premium business card creates stronger networking opportunities.",
                      "A professionally printed flyer increases marketing response.",
                      "Custom packaging improves customer experience.",
                      "Branded souvenirs increase brand visibility.",
                      "Quality banners attract more attention at events and business locations.",
                    ]}
                  />
                </section>

                <section className="space-y-5">
                  <SectionHeading id="factors-to-consider">
                    Important Factors to Consider When Choosing a Printing
                    Company in Lagos
                  </SectionHeading>

                  <Paragraph>
                    When selecting a printing company, businesses should
                    evaluate quality, turnaround time, communication, product
                    variety, pricing, value, reviews, and reputation.
                  </Paragraph>

                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      {
                        title: "1. Print Quality",
                        text: "High-quality printing should have sharp images, vibrant colors, accurate alignment, and clean finishing.",
                      },
                      {
                        title: "2. Turnaround Time",
                        text: "Fast production and reliable delivery are essential for events, launches, and corporate campaigns.",
                      },
                      {
                        title: "3. Customer Service",
                        text: "A good printing company should respond quickly, guide customers properly, and handle corrections professionally.",
                      },
                      {
                        title: "4. Product Variety",
                        text: "A strong printing company should offer business cards, flyers, packaging, T-shirts, stickers, souvenirs, banners, and paper bags.",
                      },
                      {
                        title: "5. Pricing and Value",
                        text: "Businesses should compare value, not just price. Premium materials and finishing often produce better long-term results.",
                      },
                      {
                        title: "6. Reviews and Reputation",
                        text: "Customer reviews reveal reliability and help businesses understand the quality of service to expect.",
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                      >
                        <h3 className="font-black text-gray-950">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-gray-700">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="space-y-5">
                  <SectionHeading id="business-card-printing">
                    Business Card Printing in Lagos
                  </SectionHeading>

                  <Paragraph>
                    Business cards remain one of the most effective networking
                    tools for professionals and businesses. A well-designed
                    business card communicates professionalism and strengthens
                    first impressions.
                  </Paragraph>

                  <BulletList
                    items={[
                      "Premium paper quality",
                      "Matte or glossy finishes",
                      "Readable typography",
                      "Clean design",
                      "Brand consistency",
                    ]}
                  />

                  <Paragraph>
                    PrintPalash offers premium business card printing in Lagos
                    with sharp designs, high-quality paper options, and
                    professional finishing suitable for entrepreneurs,
                    executives, startups, and corporate organizations.
                  </Paragraph>
                </section>

                <section className="space-y-5">
                  <SectionHeading id="flyer-printing">
                    Flyer Printing in Lagos
                  </SectionHeading>

                  <Paragraph>
                    Flyers are still one of the most cost-effective marketing
                    tools in Nigeria. Businesses use flyers for promotions,
                    product launches, church events, real estate marketing,
                    event awareness, and sales campaigns.
                  </Paragraph>

                  <BulletList
                    items={[
                      "Promotions",
                      "Product launches",
                      "Church events",
                      "Real estate marketing",
                      "Event awareness",
                      "Sales campaigns",
                    ]}
                  />

                  <Paragraph>
                    Effective flyer printing combines strong design,
                    high-resolution printing, quality paper, and clear
                    messaging. PrintPalash provides flyer printing in Lagos with
                    vibrant colors, excellent finishing, and fast turnaround.
                  </Paragraph>
                </section>

                <section className="space-y-5">
                  <SectionHeading id="packaging-printing">
                    Packaging Printing and Why It Matters
                  </SectionHeading>

                  <Paragraph>
                    Packaging is no longer just about protecting products.
                    Packaging has become one of the strongest branding tools in
                    modern business.
                  </Paragraph>

                  <BulletList
                    items={[
                      "Gift boxes",
                      "Rigid boxes",
                      "Paper bags",
                      "Product labels",
                      "Packaging sleeves",
                      "Custom packaging materials",
                    ]}
                  />

                  <Paragraph>
                    Premium packaging improves customer experience, brand value,
                    product perception, social media appeal, and customer
                    loyalty. Fashion brands, skincare businesses, restaurants,
                    event vendors, and ecommerce businesses increasingly depend
                    on branded packaging.
                  </Paragraph>

                  <Paragraph>
                    PrintPalash specializes in packaging printing in Lagos,
                    including luxury gift boxes, paper bags, suit boxes, custom
                    labels, and branded packaging solutions.
                  </Paragraph>
                </section>

                <section className="space-y-5">
                  <SectionHeading id="paper-bag-production">
                    Paper Bag Production in Lagos
                  </SectionHeading>

                  <Paragraph>
                    Custom paper bags are becoming increasingly popular because
                    they improve brand presentation and create a premium shopping
                    experience.
                  </Paragraph>

                  <BulletList
                    items={[
                      "Fashion retail",
                      "Product packaging",
                      "Event gifting",
                      "Corporate branding",
                      "Luxury packaging",
                    ]}
                  />

                  <Paragraph>
                    Professionally branded paper bags help businesses look more
                    established and premium. PrintPalash provides paper bag
                    production in Lagos using durable materials, professional
                    finishing, and custom branding tailored to business needs.
                  </Paragraph>
                </section>

                <section className="space-y-5">
                  <SectionHeading id="corporate-branding">
                    Corporate Branding Services
                  </SectionHeading>

                  <Paragraph>
                    Corporate branding involves creating consistency across all
                    customer-facing materials. Strong branding improves
                    recognition and helps businesses appear professional.
                  </Paragraph>

                  <BulletList
                    items={[
                      "ID cards",
                      "Branded stationery",
                      "Presentation folders",
                      "Corporate souvenirs",
                      "Branded apparel",
                      "Signage",
                      "Promotional materials",
                    ]}
                  />

                  <Paragraph>
                    PrintPalash helps businesses build professional brand
                    identity through premium corporate branding services in
                    Lagos.
                  </Paragraph>
                </section>

                <section className="space-y-5">
                  <SectionHeading id="souvenir-printing">
                    Souvenir Printing and Promotional Products
                  </SectionHeading>

                  <Paragraph>
                    Promotional products help businesses increase visibility and
                    customer engagement. Corporate organizations, churches,
                    schools, and event planners use souvenirs for branding and
                    promotional campaigns.
                  </Paragraph>

                  <BulletList
                    items={[
                      "Branded mugs",
                      "Pens",
                      "Jotters",
                      "Bags",
                      "Water bottles",
                      "T-shirts",
                    ]}
                  />

                  <Paragraph>
                    PrintPalash offers souvenir printing in Lagos with
                    high-quality branding and professional finishing.
                  </Paragraph>
                </section>

                <section className="space-y-5">
                  <SectionHeading id="tshirt-printing">
                    T-Shirt Printing and Apparel Branding
                  </SectionHeading>

                  <Paragraph>
                    T-shirt branding is widely used for corporate events, church
                    programs, fashion brands, campaigns, and event souvenirs.
                  </Paragraph>

                  <BulletList
                    items={[
                      "Durable print quality",
                      "Quality fabric compatibility",
                      "Proper color application",
                      "Long-lasting finishing",
                    ]}
                  />

                  <Paragraph>
                    PrintPalash provides T-shirt printing in Lagos using DTF
                    printing and heat transfer technology for premium results.
                  </Paragraph>
                </section>

                <section className="space-y-5">
                  <SectionHeading id="large-format-printing">
                    Signage and Large Format Printing
                  </SectionHeading>

                  <Paragraph>
                    Signage improves visibility for businesses and helps attract
                    customers. Businesses with strong signage often gain more
                    attention and stronger customer awareness.
                  </Paragraph>

                  <BulletList
                    items={[
                      "Flex banners",
                      "Roll-up banners",
                      "Shop signs",
                      "Window graphics",
                      "Wall branding",
                    ]}
                  />

                  <Paragraph>
                    PrintPalash provides signage and large-format printing
                    services in Lagos for businesses, events, and corporate
                    branding.
                  </Paragraph>
                </section>

                <section className="space-y-5">
                  <SectionHeading id="seo-online-visibility">
                    How SEO and Online Visibility Affect Printing Companies
                  </SectionHeading>

                  <Paragraph>
                    Many businesses now discover printing companies online. This
                    means SEO has become extremely important for printing
                    businesses.
                  </Paragraph>

                  <BulletList
                    items={[
                      "Flyer printing Lagos",
                      "Business card printing Lagos",
                      "Packaging printing Lagos",
                      "Paper bag production Lagos",
                    ]}
                  />

                  <Paragraph>
                    A strong online presence requires Google Business Profile
                    optimization, customer reviews, SEO-focused website pages,
                    Google posts, product-focused content, and professional
                    branding.
                  </Paragraph>
                </section>

                <section className="space-y-5">
                  <SectionHeading id="why-reviews-matter">
                    Why Reviews Matter for Printing Businesses
                  </SectionHeading>

                  <Paragraph>
                    Customer reviews strongly influence buying decisions.
                    Businesses with strong reviews appear more trustworthy and
                    often rank higher on Google Maps.
                  </Paragraph>

                  <BulletList
                    items={[
                      "Increase trust",
                      "Improve visibility",
                      "Expand keyword relevance",
                      "Improve conversion rates",
                    ]}
                  />

                  <Paragraph>
                    Reviews mentioning flyer printing Lagos, paper bag
                    production, souvenir printing, and packaging printing help
                    Google associate a business with those services.
                  </Paragraph>
                </section>

                <section className="space-y-5">
                  <SectionHeading id="best-packaging-company">
                    How to Choose the Best Packaging Company in Lagos
                  </SectionHeading>

                  <Paragraph>
                    Businesses searching for packaging companies should evaluate
                    material quality, design capabilities, durability, finishing,
                    brand presentation, delivery speed, and product variety.
                  </Paragraph>

                  <Paragraph>
                    Packaging affects customer perception significantly. A
                    product with premium packaging often appears more valuable
                    and trustworthy. PrintPalash focuses on creating premium
                    packaging solutions that improve customer experience and
                    strengthen brand identity.
                  </Paragraph>
                </section>

                <section className="space-y-5">
                  <SectionHeading id="future-of-printing">
                    Future of Printing and Branding in Nigeria
                  </SectionHeading>

                  <Paragraph>
                    The printing industry continues to evolve as businesses
                    demand premium packaging, ecommerce branding, faster
                    turnaround, online ordering, and personalized products.
                  </Paragraph>

                  <Paragraph>
                    Businesses that combine quality printing with strong branding
                    and digital visibility are likely to dominate the future
                    market. Online printing platforms, SEO visibility, AI
                    recommendations, and customer reviews are becoming
                    increasingly important for business growth.
                  </Paragraph>
                </section>

                <section className="space-y-5">
                  <SectionHeading id="why-choose-printpalash">
                    Why Businesses Choose PrintPalash
                  </SectionHeading>

                  <Paragraph>
                    PrintPalash continues to position itself as a premium
                    printing and branding company in Lagos because of
                    professional print quality, modern branding solutions,
                    customer-focused service, fast delivery, product diversity,
                    premium packaging expertise, and strong local relevance.
                  </Paragraph>

                  <BulletList
                    items={[
                      "Professional print quality",
                      "Modern branding solutions",
                      "Customer-focused service",
                      "Fast delivery",
                      "Product diversity",
                      "Premium packaging expertise",
                      "Strong local relevance",
                    ]}
                  />

                  <Paragraph>
                    The company serves startups, fashion brands, churches,
                    schools, corporate organizations, and businesses looking for
                    reliable printing and branding solutions.
                  </Paragraph>
                </section>

                <section className="space-y-5 rounded-3xl border border-gray-200 bg-gray-50 p-6 lg:p-8">
                  <h2 className="text-2xl font-black text-gray-950">
                    Conclusion
                  </h2>

                  <Paragraph>
                    Choosing the right printing company in Lagos is important
                    for businesses that want to improve visibility, strengthen
                    branding, and create professional customer experiences.
                    Quality printing affects how customers perceive a business
                    and influences marketing success.
                  </Paragraph>

                  <Paragraph>
                    From flyer printing and business cards to packaging printing
                    and paper bag production, businesses need a printing partner
                    that delivers professionalism, quality, and consistency.
                  </Paragraph>

                  <Paragraph>
                    PrintPalash continues to grow as a premium printing and
                    branding company in Shomolu, Lagos, offering professional
                    printing services, packaging solutions, souvenir branding,
                    and corporate branding for businesses and organizations
                    across Lagos.
                  </Paragraph>

                  <div className="pt-4">
                    <Link
                      href="/get-a-quote"
                      className="inline-flex rounded-xl bg-red-600 px-6 py-3 text-sm font-black text-white transition hover:bg-red-700"
                    >
                      Start Your Print Order
                    </Link>
                  </div>
                </section>
              </div>
            </article>
          </div>
        </section>

        <TrustedBrands />
      </div>

      <Footer />
    </>
  );
}