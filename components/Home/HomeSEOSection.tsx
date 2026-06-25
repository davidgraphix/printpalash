import Link from "next/link";

export default function HomeSEOSection() {
    return (
        <section className="bg-white py-14 lg:py-20">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-10 text-center">
                        <p className="mb-3 text-sm font-black uppercase tracking-wide text-red-600">
                            Printing Services in Lagos, Nigeria
                        </p>

                        <h2 className="text-3xl font-black tracking-tight text-gray-950 lg:text-5xl">
                            Premium Online Printing, Packaging, and Branding Services in Lagos
                        </h2>

                        <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-gray-700 lg:text-lg">
                            PrintPalash provides professional printing services in Lagos for
                            businesses, brands, schools, churches, events, fashion companies,
                            restaurants, startups, and corporate organizations.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                title: "Flyer Printing in Lagos",
                                text: "Order sharp, colorful flyers for promotions, product launches, church events, real estate marketing, sales campaigns, and business advertising.",
                            },
                            {
                                title: "Business Card Printing",
                                text: "Create premium business cards with clean finishing, sharp typography, strong paper quality, and professional brand presentation.",
                            },
                            {
                                title: "Packaging Printing",
                                text: "Print custom packaging boxes, product labels, branded paper bags, gift boxes, packaging sleeves, and luxury packaging materials.",
                            },
                            {
                                title: "T-Shirt Printing",
                                text: "Get custom T-shirt printing for brands, events, churches, campaigns, corporate teams, fashion businesses, and souvenirs.",
                            },
                            {
                                title: "Banner and Large Format Printing",
                                text: "Print roll-up banners, flex banners, event backdrops, signage, wall branding, window graphics, and outdoor advertising materials.",
                            },
                            {
                                title: "Souvenir and Corporate Branding",
                                text: "Brand mugs, jotters, pens, bags, ID cards, stationery, apparel, folders, and promotional materials for your organization.",
                            },
                        ].map((item) => (
                            <article
                                key={item.title}
                                className="rounded-3xl border border-gray-200 bg-gray-50 p-6 transition hover:border-red-100 hover:bg-red-50"
                            >
                                <h3 className="text-lg font-black text-gray-950">
                                    {item.title}
                                </h3>
                                <p className="mt-3 text-sm leading-7 text-gray-700">
                                    {item.text}
                                </p>
                            </article>
                        ))}
                    </div>

                    <div className="mt-10 rounded-3xl bg-gray-950 p-6 text-white lg:p-8">
                        <h2 className="text-2xl font-black">
                            Why Businesses Choose PrintPalash
                        </h2>

                        <p className="mt-4 leading-8 text-gray-200">
                            Businesses choose PrintPalash because we combine quality printing,
                            fast delivery, professional finishing, online ordering, customer
                            support, and reliable branding solutions. Whether you need flyers,
                            business cards, banners, packaging, paper bags, stickers,
                            T-shirts, brochures, or souvenirs, PrintPalash helps you bring
                            your ideas to life with clean and premium print execution.
                        </p>

                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/products"
                                className="inline-flex justify-center rounded-xl bg-red-600 px-6 py-3 text-sm font-black text-white transition hover:bg-red-700"
                            >
                                View Printing Products
                            </Link>

                            <Link
                                href="/get-a-quote"
                                className="inline-flex justify-center rounded-xl border border-white/20 px-6 py-3 text-sm font-black text-white transition hover:bg-white hover:text-gray-950"
                            >
                                Get a Quote
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}