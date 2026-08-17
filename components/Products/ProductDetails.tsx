"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  MessageCircle,
  Package,
  Ruler,
  Sparkles,
  Truck,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import type { Product } from "@/lib/catalog/types";
import { formatPrice, resolvePrice } from "@/lib/catalog/pricing";
import { buildOrderLink, buildQuoteLink } from "@/lib/catalog/order";
import { PHONE_DISPLAY, PHONE_E164 } from "@/lib/site";
import ProductCard from "./ProductCard";

interface ProductDetailProps {
  product: Product;
  categoryName: string;
  categorySlug: string;
  relatedProducts: Product[];
}

/** Quantity presets scale with how the product is actually sold. */
function quantityChoices(product: Product): number[] {
  const batch = product.startingPrice?.quantity ?? 1;
  if (batch >= 1000) return [1000, 2000, 5000, 10000];
  if (batch >= 100) return [100, 200, 500, 1000];
  if (batch >= 50) return [50, 100, 200, 500];
  if (batch >= 10) return [10, 20, 50, 100];
  return [1, 5, 10, 25, 50];
}

export default function ProductDetail({
  product,
  categoryName,
  categorySlug,
  relatedProducts,
}: ProductDetailProps) {
  const images = product.gallery.length > 0 ? product.gallery : [product.image];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    () =>
      Object.fromEntries(
        product.optionGroups.map((group) => [group.id, group.options[0]?.id])
      ) as Record<string, string>
  );
  const [quantity, setQuantity] = useState(
    () => quantityChoices(product)[0] ?? 1
  );
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [notes, setNotes] = useState("");

  const activeImage = images[activeImageIndex] ?? images[0];
  const activePrice = useMemo(
    () => resolvePrice(product, selectedOptions),
    [product, selectedOptions]
  );

  const orderLink = useMemo(
    () =>
      buildOrderLink({
        product,
        customerName,
        customerPhone,
        quantity,
        selectedOptions,
        notes,
      }),
    [product, customerName, customerPhone, quantity, selectedOptions, notes]
  );

  const quoteLink = useMemo(() => buildQuoteLink(product), [product]);

  /**
   * Best-effort copy of the enquiry to the shop's inbox. The WhatsApp link is
   * a plain anchor and opens regardless — this fires alongside it and is never
   * allowed to block or fail the customer's click.
   */
  const notifyShop = () => {
    const optionLabels = Object.fromEntries(
      product.optionGroups.map((group) => [
        group.label,
        group.options.find((o) => o.id === selectedOptions[group.id])?.label ??
          "",
      ])
    );

    void fetch("/api/send-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        productName: product.name,
        productSlug: `/products/${product.slug}`,
        quantity,
        priceLabel: activePrice ? formatPrice(activePrice) : "Quote on request",
        options: optionLabels,
        customer: { name: customerName, phone: customerPhone },
        notes,
      }),
    }).catch(() => {
      /* The order still reaches the team over WhatsApp. */
    });
  };

  const specRows = [
    { icon: Package, label: "Material", value: product.specs.material },
    { icon: Ruler, label: "Size", value: product.specs.size },
    { icon: Sparkles, label: "Finishing", value: product.specs.finishing },
    { icon: FileText, label: "Pages", value: product.specs.pages },
    { icon: Sparkles, label: "Branding", value: product.specs.branding },
    { icon: FileText, label: "Design", value: product.specs.design },
  ].filter((row) => Boolean(row.value));

  const hasDelivery = Boolean(product.delivery.lagos || product.delivery.nationwide);

  return (
    <div className="bg-white">
      {/* Breadcrumb — mirrors the BreadcrumbList JSON-LD on this page. */}
      <nav aria-label="Breadcrumb" className="border-b bg-gray-50">
        <ol className="container mx-auto flex flex-wrap items-center gap-x-2 gap-y-1 px-4 py-3 text-sm">
          <li>
            <Link href="/" className="text-gray-500 hover:text-red-600">
              Home
            </Link>
          </li>
          <ChevronRight aria-hidden className="h-4 w-4 text-gray-400" />
          <li>
            <Link href="/products" className="text-gray-500 hover:text-red-600">
              Products
            </Link>
          </li>
          <ChevronRight aria-hidden className="h-4 w-4 text-gray-400" />
          <li>
            <Link
              href={`/products/category/${categorySlug}`}
              className="text-gray-500 hover:text-red-600"
            >
              {categoryName}
            </Link>
          </li>
          <ChevronRight aria-hidden className="h-4 w-4 text-gray-400" />
          <li aria-current="page" className="font-semibold text-red-600">
            {product.name}
          </li>
        </ol>
      </nav>

      <section className="container mx-auto px-4 py-6 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-square overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImageIndex((i) =>
                        i === 0 ? images.length - 1 : i - 1
                      )
                    }
                    className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md transition hover:bg-white focus-visible:ring-2 focus-visible:ring-red-500"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-900" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImageIndex((i) =>
                        i === images.length - 1 ? 0 : i + 1
                      )
                    }
                    className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md transition hover:bg-white focus-visible:ring-2 focus-visible:ring-red-500"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-900" />
                  </button>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    aria-label={`Show image ${index + 1} of ${images.length}`}
                    aria-current={activeImageIndex === index}
                    className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 bg-gray-100 transition ${
                      activeImageIndex === index
                        ? "border-red-600"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Summary + order panel */}
          <div className="space-y-5">
            <div>
              <Link
                href={`/products/category/${categorySlug}`}
                className="text-xs font-bold uppercase tracking-wide text-red-600 hover:text-red-700"
              >
                {categoryName}
              </Link>

              <h1 className="mt-1.5 text-2xl font-extrabold leading-tight text-gray-900 lg:text-3xl">
                {product.name}
              </h1>

              <p className="mt-2 leading-relaxed text-gray-600">
                {product.description}
              </p>
            </div>

            <div className="rounded-xl border border-red-100 bg-red-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-red-700">
                Price
              </p>
              <p className="mt-1 text-2xl font-extrabold text-red-600">
                {activePrice ? formatPrice(activePrice) : "Quote on request"}
              </p>
              <p className="mt-1.5 text-sm text-gray-600">
                {activePrice
                  ? "Starting price for the batch shown. Your final price depends on artwork, finishing and total quantity — we confirm it before production."
                  : "We quote this product per job. Send your quantity, size and deadline and we will come back with pricing."}
              </p>
            </div>

            {specRows.length > 0 && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
                  Specifications
                </h2>
                <dl className="mt-2 divide-y divide-gray-100 rounded-xl border border-gray-200">
                  {specRows.map((row) => (
                    <div
                      key={row.label}
                      className="flex flex-col gap-0.5 px-4 py-2.5 sm:flex-row sm:gap-4"
                    >
                      <dt className="flex items-center gap-2 text-sm font-semibold text-gray-900 sm:w-32 sm:flex-shrink-0">
                        <row.icon aria-hidden className="h-4 w-4 text-red-600" />
                        {row.label}
                      </dt>
                      <dd className="text-sm leading-relaxed text-gray-600">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {hasDelivery && (
              <div className="rounded-xl border border-gray-200 p-4">
                <h2 className="flex items-center gap-2 text-sm font-bold text-gray-900">
                  <Truck aria-hidden className="h-4 w-4 text-red-600" />
                  Delivery time
                </h2>
                <ul className="mt-1.5 space-y-0.5 text-sm text-gray-600">
                  {product.delivery.lagos && (
                    <li>Within Lagos: {product.delivery.lagos}</li>
                  )}
                  {product.delivery.nationwide && (
                    <li>Other states in Nigeria: {product.delivery.nationwide}</li>
                  )}
                </ul>
              </div>
            )}

            {/* Order form — feeds the WhatsApp message directly. */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 lg:p-5">
              <h2 className="text-base font-extrabold text-gray-900">
                Order this product
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Choose your options and we will open WhatsApp with the details
                already filled in.
              </p>

              <div className="mt-4 space-y-3.5">
                {product.optionGroups.map((group) => (
                  <div key={group.id}>
                    <label
                      htmlFor={`option-${group.id}`}
                      className="mb-1 block text-sm font-semibold text-gray-900"
                    >
                      {group.label}
                    </label>
                    <select
                      id={`option-${group.id}`}
                      value={selectedOptions[group.id] ?? ""}
                      onChange={(e) =>
                        setSelectedOptions((prev) => ({
                          ...prev,
                          [group.id]: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    >
                      {group.options.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.label}
                          {option.detail ? ` — ${option.detail}` : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

                <div>
                  <label
                    htmlFor="order-quantity"
                    className="mb-1 block text-sm font-semibold text-gray-900"
                  >
                    Quantity
                  </label>
                  <select
                    id="order-quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  >
                    {quantityChoices(product).map((value) => (
                      <option key={value} value={value}>
                        {value.toLocaleString("en-NG")}{" "}
                        {product.startingPrice?.unit ?? "piece"}
                        {value === 1 ? "" : "s"}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="order-name"
                      className="mb-1 block text-sm font-semibold text-gray-900"
                    >
                      Your name
                    </label>
                    <input
                      id="order-name"
                      type="text"
                      autoComplete="name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="order-phone"
                      className="mb-1 block text-sm font-semibold text-gray-900"
                    >
                      Phone number{" "}
                      <span className="font-normal text-gray-500">
                        (optional)
                      </span>
                    </label>
                    <input
                      id="order-phone"
                      type="tel"
                      autoComplete="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="order-notes"
                    className="mb-1 block text-sm font-semibold text-gray-900"
                  >
                    Anything else we should know?{" "}
                    <span className="font-normal text-gray-500">(optional)</span>
                  </label>
                  <textarea
                    id="order-notes"
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Deadline, artwork status, colour preferences…"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />
                </div>
              </div>

              <div className="mt-4 space-y-2.5">
                <a
                  href={orderLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={notifyShop}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3.5 font-extrabold text-white transition hover:bg-red-700 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                >
                  <FaWhatsapp aria-hidden className="text-xl" />
                  Order now on WhatsApp
                </a>

                <div className="grid gap-2.5 sm:grid-cols-2">
                  <a
                    href={quoteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-bold text-gray-900 transition hover:border-red-300 hover:text-red-600"
                  >
                    <MessageCircle aria-hidden className="h-4 w-4" />
                    Get a quote
                  </a>
                  <a
                    href={`tel:${PHONE_E164}`}
                    className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-bold text-gray-900 transition hover:border-red-300 hover:text-red-600"
                  >
                    Call {PHONE_DISPLAY}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {product.faqs.length > 0 && (
        <section className="border-t bg-gray-50 py-10 lg:py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-xl font-extrabold text-gray-900 lg:text-2xl">
                {product.name} — frequently asked questions
              </h2>
              <dl className="mt-5 space-y-3">
                {product.faqs.map((faq) => (
                  <div
                    key={faq.question}
                    className="rounded-xl border border-gray-200 bg-white p-4"
                  >
                    <dt className="font-bold text-gray-900">{faq.question}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-gray-600">
                      {faq.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      )}

      {relatedProducts.length > 0 && (
        <section className="border-t py-10 lg:py-12">
          <div className="container mx-auto px-4">
            <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-gray-900 lg:text-2xl">
                  Related products
                </h2>
                <p className="mt-0.5 text-sm text-gray-600">
                  Other items customers order alongside {product.name.toLowerCase()}.
                </p>
              </div>

              <Link
                href={`/products/category/${categorySlug}`}
                className="text-sm font-bold text-red-600 hover:text-red-700"
              >
                All {categoryName.toLowerCase()} &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {relatedProducts.map((related) => (
                <ProductCard key={related.slug} product={related} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
