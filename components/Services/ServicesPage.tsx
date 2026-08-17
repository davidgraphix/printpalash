"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SERVICES, type ServiceCategory } from "@/lib/services";
import { CATEGORIES } from "@/lib/catalog/categories";
import { whatsappLink } from "@/lib/site";
import { Search, ArrowRight, BadgeCheck, Zap, Truck } from "lucide-react";

const CATEGORY_ORDER: ServiceCategory[] = [
    "Cards & Paper",
    "Marketing & Promo",
    "Large Format",
    "Stickers & Labels",
    "Merch & Apparel",
    "Packaging",
    "Books & Documents",
];

const TRUST_ITEMS = [
    { icon: BadgeCheck, title: "Premium Quality", desc: "Sharp output and clean finishing." },
    { icon: Zap, title: "Fast Turnaround", desc: "Quick production with dependable delivery." },
    { icon: Truck, title: "Delivery in Lagos", desc: "We deliver to your doorstep." },
];

export default function ServicesPage() {
    const [query, setQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState<ServiceCategory | "All">("All");

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        return SERVICES
            .filter((s) => (activeCategory === "All" ? true : s.category === activeCategory))
            .filter((s) => {
                if (!q) return true;
                return (
                    s.title.toLowerCase().includes(q) ||
                    s.h1.toLowerCase().includes(q) ||
                    s.description.toLowerCase().includes(q) ||
                    s.highlights.join(" ").toLowerCase().includes(q)
                );
            });
    }, [query, activeCategory]);

    return (
        <div className="bg-white">
            {/* Hero */}
            <section className="border-b bg-gradient-to-b from-pink-50 to-white">
                <div className="container mx-auto px-4 py-8 md:py-10">
                    <div className="max-w-3xl">
                        <p className="text-sm font-semibold text-red-600">Print Palash Studios</p>
                        <h1 className="mt-2 font-heading text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                            Printing Services in Lagos — built for brands that want to look serious.
                        </h1>
                        <p className="mt-2.5 text-gray-700 md:text-lg">
                            Business cards, flyers, brochures, banners, stickers, labels, T-shirts, packaging and more — premium quality,
                            fast turnaround, reliable delivery.
                        </p>

                        {/* Search */}
                        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                            <div className="relative w-full sm:max-w-xl">
                                <input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search services (e.g. business cards, stickers, packaging...)"
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 pr-12 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                                <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            </div>

                            <Link
                                href="/get-a-quote"
                                className="inline-flex items-center justify-center rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700"
                            >
                                Get a Quote <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Trust strip */}
                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                        {TRUST_ITEMS.map((t) => (
                            <div key={t.title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                                <div className="flex items-start gap-3">
                                    <div className="rounded-lg bg-red-50 p-2">
                                        <t.icon className="h-5 w-5 text-red-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{t.title}</p>
                                        <p className="text-sm text-gray-600">{t.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Body */}
            <section className="container mx-auto px-4 py-8 md:py-10">
                {/* Categories */}
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setActiveCategory("All")}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition ${activeCategory === "All"
                                ? "border-red-600 bg-red-600 text-white"
                                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                            }`}
                    >
                        All Services
                    </button>

                    {CATEGORY_ORDER.map((c) => (
                        <button
                            key={c}
                            onClick={() => setActiveCategory(c)}
                            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${activeCategory === c
                                    ? "border-red-600 bg-red-600 text-white"
                                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                                }`}
                        >
                            {c}
                        </button>
                    ))}
                </div>

                {/* Results header */}
                <div className="mt-6 flex items-end justify-between gap-4">
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Choose a service</h2>
                        <p className="text-sm text-gray-600">
                            {results.length} service{results.length === 1 ? "" : "s"} found
                            {activeCategory !== "All" ? ` in ${activeCategory}` : ""}.
                        </p>
                    </div>

                    <Link href="/contact" className="text-sm font-semibold text-red-600 hover:text-red-700">
                        Need help choosing? Contact us →
                    </Link>
                </div>

                {/* Cards */}
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {results.map((s) => (
                        <Link
                            key={s.slug}
                            href={`/services/${s.slug}`}
                            className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-xs font-semibold text-red-600">{s.category}</p>
                                    <h3 className="mt-2 text-lg font-bold text-gray-900">{s.title}</h3>
                                </div>
                                <span className="rounded-full bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700">
                                    Lagos
                                </span>
                            </div>

                            <p className="mt-2 text-sm text-gray-600 leading-relaxed">{s.description}</p>

                            <ul className="mt-3 grid gap-2">
                                {s.highlights.slice(0, 4).map((h) => (
                                    <li key={h} className="text-sm text-gray-700 flex items-center gap-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                                        {h}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-4 inline-flex items-center text-sm font-semibold text-gray-900">
                                View service
                                <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Route readers (and crawlers) from services into the catalogue. */}
                <nav aria-label="Product categories" className="mt-8 border-t pt-6">
                    <h2 className="text-sm font-extrabold uppercase tracking-wide text-gray-900">
                        Shop products by category
                    </h2>
                    <ul className="mt-2.5 flex flex-wrap gap-2">
                        {CATEGORIES.map((category) => (
                            <li key={category.slug}>
                                <Link
                                    href={`/products/category/${category.slug}`}
                                    className="inline-flex rounded-full border border-gray-300 px-3 py-1.5 text-sm text-gray-700 transition hover:border-red-300 hover:text-red-600"
                                >
                                    {category.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* CTA block */}
                <div className="mt-8 rounded-2xl bg-gray-900 px-6 py-8 text-white md:px-10">
                    <div className="grid gap-6 md:grid-cols-2 md:items-center">
                        <div>
                            <h3 className="font-heading text-2xl md:text-3xl font-extrabold">
                                Ready to print? Let’s get your quote.
                            </h3>
                            <p className="mt-2 text-white/80">
                                Tell us what you need and we’ll respond with pricing, timeline, and delivery options.
                            </p>
                        </div>
                        <div className="flex gap-3 md:justify-end">
                            <Link
                                href="/get-a-quote"
                                className="inline-flex items-center justify-center rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700"
                            >
                                Get a Quote
                            </Link>
                            <a
                                href={whatsappLink(
                                    "Hello PrintPalash, I would like to talk about a printing job."
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/15"
                            >
                                WhatsApp Us
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
