import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, Mail } from "lucide-react";

import type { Service } from "@/lib/services";
import type { Category, Product } from "@/lib/catalog/types";
import { whatsappLink } from "@/lib/site";
import { buildServiceQuoteEmailLink } from "@/lib/catalog/order";
import { toCardView } from "@/lib/catalog/card";
import ProductCard from "@/components/Products/ProductCard";

export default function ServiceDetail({
  service,
  relatedProducts = [],
  relatedCategories = [],
}: {
  service: Service;
  relatedProducts?: Product[];
  relatedCategories?: Category[];
}) {
  // Email quote request for this service; the address lives in lib/site.ts.
  const quoteEmailLink = buildServiceQuoteEmailLink(
    service.h1,
    `/services/${service.slug}`
  );

  const whatsapp = whatsappLink(
    `Hello PrintPalash,\nI would like a quote for ${service.title.toLowerCase()} in Lagos.\n\nPlease let me know pricing, options and turnaround time.`
  );

  return (
    <div className="bg-white">
      <section className="border-b bg-gradient-to-b from-pink-50 to-white">
        <div className="container mx-auto px-4 py-6 lg:py-10">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
              <li>
                <Link href="/" className="text-gray-500 hover:text-red-600">
                  Home
                </Link>
              </li>
              <ChevronRight aria-hidden className="h-4 w-4 text-gray-400" />
              <li>
                <Link
                  href="/services"
                  className="text-gray-500 hover:text-red-600"
                >
                  Services
                </Link>
              </li>
              <ChevronRight aria-hidden className="h-4 w-4 text-gray-400" />
              <li aria-current="page" className="font-semibold text-red-600">
                {service.title}
              </li>
            </ol>
          </nav>

          <p className="mt-3 text-sm font-semibold text-red-600">
            {service.category}
          </p>
          <h1 className="mt-1 max-w-3xl text-3xl font-extrabold leading-tight text-gray-900 md:text-5xl">
            {service.h1}
          </h1>
          <p className="mt-2.5 max-w-3xl leading-relaxed text-gray-700 md:text-lg">
            {service.intro}
          </p>

          <div className="mt-4 flex flex-wrap gap-2.5">
            <a
              href={quoteEmailLink}
              className="inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
            >
              Get a quote <ArrowRight aria-hidden className="ml-2 h-4 w-4" />
            </a>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-bold text-gray-900 transition hover:border-red-300 hover:text-red-600"
            >
              WhatsApp us
            </a>
          </div>

          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {service.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-2 rounded-xl border border-gray-100 bg-white p-3 shadow-sm"
              >
                <CheckCircle2
                  aria-hidden
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600"
                />
                <span className="text-sm font-semibold text-gray-900">
                  {highlight}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-5">
            {service.sections.map((section) => (
              <div
                key={section.heading}
                className="rounded-xl border border-gray-200 p-5"
              >
                <h2 className="text-lg font-extrabold text-gray-900 md:text-xl">
                  {section.heading}
                </h2>
                <ul className="mt-2.5 space-y-1.5">
                  {section.body.map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-2 text-gray-700"
                    >
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-600"
                      />
                      <span className="leading-relaxed">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {service.faqs.length > 0 && (
              <div className="rounded-xl border border-gray-200 p-5">
                <h2 className="text-lg font-extrabold text-gray-900 md:text-xl">
                  Frequently asked questions
                </h2>
                <dl className="mt-3 space-y-3">
                  {service.faqs.map((faq) => (
                    <div key={faq.q} className="rounded-lg bg-gray-50 p-3.5">
                      <dt className="font-semibold text-gray-900">{faq.q}</dt>
                      <dd className="mt-1 text-sm leading-relaxed text-gray-700">
                        {faq.a}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>

          <aside className="h-fit space-y-4 lg:sticky lg:top-6">
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-extrabold text-gray-900">
                Need pricing?
              </h2>
              <p className="mt-1.5 text-sm text-gray-600">
                Tell us your quantity, size, finishing and deadline and we will
                send a quote.
              </p>

              <div className="mt-3.5 space-y-2.5">
                <a
                  href={quoteEmailLink}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
                >
                  <Mail aria-hidden className="h-4 w-4" />
                  Get a quote
                </a>
                <Link
                  href="/get-a-quote"
                  className="inline-flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-bold text-gray-900 transition hover:border-red-300 hover:text-red-600"
                >
                  Other ways to reach us
                </Link>
              </div>
            </div>

            {relatedCategories.length > 0 && (
              <div className="rounded-xl border border-gray-200 p-5">
                <h2 className="text-sm font-extrabold text-gray-900">
                  Shop related products
                </h2>
                <ul className="mt-2.5 space-y-1.5">
                  {relatedCategories.map((category) => (
                    <li key={category.slug}>
                      <Link
                        href={`/products/category/${category.slug}`}
                        className="text-sm font-semibold text-red-600 hover:text-red-700"
                      >
                        {category.name}
                      </Link>
                      <p className="text-xs text-gray-600">
                        {category.tagline}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="border-t bg-gray-50 py-8 lg:py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-extrabold text-gray-900 lg:text-2xl">
              Products for {service.title.toLowerCase()}
            </h2>
            <p className="mt-0.5 text-sm text-gray-600">
              Prices, specifications and delivery times for each item.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-3">
              {relatedProducts.map((product) => (
                <ProductCard key={product.slug} view={toCardView(product)} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
