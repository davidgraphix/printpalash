"use client";

import { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Search,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  getAllProducts,
  getProductsByCategory,
  type Product,
} from "@/lib/products-data";
import Footer from "../Footer/Footer";

interface ProductDetailProps {
  product: Product;
}

function ProductStars({ rating = 4.8 }: { rating?: number }) {
  return (
    <div
      className="flex items-center gap-1"
      aria-label={`${rating} star rating`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${index < Math.round(rating)
            ? "fill-red-600 text-red-600"
            : "text-red-300"
            }`}
        />
      ))}
      <span className="ml-2 text-sm font-medium text-gray-600">{rating}</span>
    </div>
  );
}

function RelatedProductCard({ product }: { product: Product }) {
  const productImage =
    product.images?.[0] || product.image || "/placeholder.svg";

  const imageCount = product.images?.length || 1;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <Image
            src={productImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {imageCount > 1 && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-white">
              <ImageIcon className="h-3.5 w-3.5" />
              {imageCount}
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <ProductStars rating={product.rating || 4.8} />

        <Link href={`/products/${product.slug}`}>
          <h3 className="mt-3 line-clamp-2 text-sm font-black leading-snug text-gray-900 transition group-hover:text-red-600 lg:text-base">
            {product.name}
          </h3>
        </Link>

        <p className="mt-3 font-black text-red-600">
          Starting at ₦{product.priceNumeric.toLocaleString()}
        </p>

        <Link href={`/products/${product.slug}`} className="mt-4">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-black text-red-600 transition hover:bg-red-600 hover:text-white"
          >
            <ShoppingCart className="h-4 w-4" />
            Place Order
          </button>
        </Link>
      </div>
    </article>
  );
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedQuantity, setSelectedQuantity] = useState("100");
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const [selectedSpecs] = useState({
    paperThickness: "thick-300gsm",
    lamination: "matte-lamination",
    edges: "square-edges",
    shipping: "standard",
  });

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const productImages = useMemo(() => {
    if (product.images && product.images.length > 0) return product.images;
    if (product.image) return [product.image];
    return ["/placeholder.svg"];
  }, [product.image, product.images]);

  const activeImage = productImages[activeImageIndex] || productImages[0];

  const quantityNumber = Number(selectedQuantity);
  const unitPrice = product.priceNumeric || 0;
  const totalPrice = unitPrice * quantityNumber;

  const relatedProducts = useMemo(() => {
    const sameCategoryProducts = getProductsByCategory(product.category).filter(
      (item) => item.slug !== product.slug
    );

    if (sameCategoryProducts.length >= 4) {
      return sameCategoryProducts.slice(0, 4);
    }

    const fallbackProducts = getAllProducts().filter(
      (item) =>
        item.slug !== product.slug &&
        !sameCategoryProducts.some((related) => related.slug === item.slug)
    );

    return [...sameCategoryProducts, ...fallbackProducts].slice(0, 4);
  }, [product.category, product.slug]);

  const goToPreviousImage = () => {
    setActiveImageIndex((prev) =>
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  const goToNextImage = () => {
    setActiveImageIndex((prev) =>
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleOrder = async () => {
    setError(null);

    if (!customerName.trim() || !customerPhone.trim()) {
      setError("Please fill in your name and phone number.");
      return;
    }

    setIsLoading(true);

    const orderPayload = {
      productName: product.name,
      productId: product.slug,
      quantity: quantityNumber,
      unitPrice,
      totalPrice,
      tax: product.tax,
      specs: selectedSpecs,
      customer: {
        name: customerName,
        phone: customerPhone,
      },
    };

    try {
      const resp = await fetch("/api/send-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      const data = await resp.json();

      if (!resp.ok) {
        throw new Error(data?.message || "Failed to place order");
      }

      const whatsAppNumber =
        process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2347035017359";

      const specsText = Object.entries(selectedSpecs)
        .map(([key, value]) => `${key}: ${value}`)
        .join(", ");

      const message = `Hello, my name is ${orderPayload.customer.name
        }, phone: ${orderPayload.customer.phone}. I want to order ${orderPayload.quantity
        } x ${orderPayload.productName
        }. Specs: ${specsText}. Total: ₦${orderPayload.totalPrice.toLocaleString()}.`;

      const waUrl = `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(
        message
      )}`;

      window.location.href = waUrl;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-white">
      <section className="border-b bg-gray-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-wrap items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-red-600">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Link href="/products" className="text-gray-500 hover:text-red-600">
              All Products
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="font-medium text-red-600">{product.name}</span>
          </nav>
        </div>
      </section>

      <section className="border-b bg-white py-4">
        <div className="container mx-auto px-4">
          <div className="ml-auto flex max-w-md">
            <input
              type="text"
              placeholder="Search for any product"
              className="flex-1 rounded-l-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
            />
            <button
              type="button"
              className="rounded-r-xl bg-red-600 px-5 text-white transition hover:bg-red-700"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-sm">
              <Image
                src={activeImage}
                alt={`${product.name} preview ${activeImageIndex + 1}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />

              {productImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goToPreviousImage}
                    className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md transition hover:bg-white"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-900" />
                  </button>

                  <button
                    type="button"
                    onClick={goToNextImage}
                    className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md transition hover:bg-white"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-900" />
                  </button>

                  <div className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-white">
                    {activeImageIndex + 1} / {productImages.length}
                  </div>
                </>
              )}
            </div>

            {productImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {productImages.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 bg-gray-100 transition ${activeImageIndex === index
                      ? "border-red-600"
                      : "border-transparent hover:border-gray-300"
                      }`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <ProductStars rating={product.rating || 4.8} />

              <h1 className="mt-3 text-2xl font-bold text-gray-900 lg:text-3xl">
                {product.name}
              </h1>

              <p className="mt-4 leading-relaxed text-gray-600">
                {product.description}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <div className="mb-2 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-red-600" />
                  <h3 className="font-bold text-gray-900">Key Features</h3>
                </div>
                <p className="text-sm leading-relaxed text-gray-600">
                  {product.keyFeatures}
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Truck className="h-5 w-5 text-red-600" />
                  <h3 className="font-bold text-gray-900">Delivery</h3>
                </div>
                <div className="space-y-1 text-sm leading-relaxed text-gray-600">
                  <p>{product.delivery.lagos}</p>
                  <p>{product.delivery.others}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
              <h3 className="font-black text-gray-900">Need custom design?</h3>
              <p className="mt-1 text-sm text-gray-600">
                You can upload your design or request help from our team after
                placing your order.
              </p>
            </div>

            <div>
              <label className="mb-2 block font-bold text-gray-900">
                Quantity
              </label>
              <div className="relative">
                <select
                  value={selectedQuantity}
                  onChange={(e) => setSelectedQuantity(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                >
                  <option value="50">50 pieces</option>
                  <option value="100">100 pieces</option>
                  <option value="250">250 pieces</option>
                  <option value="500">500 pieces</option>
                  <option value="1000">1000 pieces</option>
                </select>

                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 lg:p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Unit Price</span>
                  <span className="font-bold text-gray-900">
                    ₦{unitPrice.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Quantity</span>
                  <span className="font-bold text-gray-900">
                    {quantityNumber}
                  </span>
                </div>

                <div className="flex items-center justify-between border-t pt-3">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-black text-red-600">
                    ₦{totalPrice.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Tax</span>
                  <span className="text-gray-500">
                    ₦{product.tax.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white p-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white p-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              </div>

              <button
                type="button"
                onClick={handleOrder}
                disabled={isLoading}
                className="mt-5 w-full rounded-xl bg-red-600 px-6 py-4 font-black text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? "PLACING ORDER..." : "ORDER NOW"}
              </button>

              {error && (
                <p className="mt-3 text-sm font-medium text-red-600">
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="border-t bg-gray-50 py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-black text-gray-900 lg:text-3xl">
                  Related Products
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  More products customers usually check in this category.
                </p>
              </div>

              <Link
                href="/products"
                className="font-bold text-red-600 hover:text-red-700"
              >
                View all products
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <RelatedProductCard
                  key={relatedProduct.slug}
                  product={relatedProduct}
                />
              ))}
            </div>
          </div>
        </section>
      )}
      <Footer />

    </main>
  );
}