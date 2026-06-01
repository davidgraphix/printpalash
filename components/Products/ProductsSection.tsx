"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Filter,
  ImageIcon,
  Printer,
  Search,
  ShoppingCart,
  Star,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  getAllProducts,
  getProductsByCategory,
  type Product,
} from "@/lib/products-data";

const categories = [
  "All",
  "Bags",
  "Banners & Large Format",
  "Box & Packaging",
  "Brochures",
  "Business Cards",
  "Calendars",
  "Campaign Materials",
  "Caps & Hats",
  "Clothing & Apparel",
  "ClothesTag",
  "Envelopes",
  "Events & Souvenirs",
  "Event Tag",
  "Flyers & Posters",
  "Invitations",
  "Office Stationery",
];

const productCategories = categories.filter((category) => category !== "All");

function ProductStars({ rating = 4.8 }: { rating?: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
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
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const productImage =
    product.images?.[0] || product.image || "/placeholder.svg";

  const imageCount = product.images?.length || 1;
  const rating = product.rating || 4.8;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <Image
            src={productImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute right-3 top-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/75 text-xs font-black text-gray-700 backdrop-blur">
            img
          </div>

          {/* {imageCount > 1 && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-white">
              <ImageIcon className="h-3.5 w-3.5" />
              {imageCount}
            </div>
          )} */}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <ProductStars rating={rating} />

        <Link href={`/products/${product.slug}`}>
          <h3 className="mt-3 line-clamp-2 text-base font-black leading-snug text-gray-900 transition group-hover:text-red-600 lg:text-lg">
            {product.name}
          </h3>
        </Link>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600">
          {product.description}
        </p>

        <p className="mt-4 font-black text-red-600">
          Starting at ₦{product.priceNumeric.toLocaleString()}
        </p>

        <Link href={`/products/${product.slug}`} className="mt-4">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-black text-red-600 transition hover:bg-red-600 hover:text-white"
          >
            <ShoppingCart className="h-4 w-4" />
            Place Order
          </button>
        </Link>
      </div>
    </article>
  );
}

export default function ProductsSection() {
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    const urlSearch = searchParams.get("search");

    if (urlSearch) {
      setSearchTerm(urlSearch);
      setSelectedCategory("All");
    }
  }, [searchParams]);

  const groupedProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return productCategories
      .map((category) => {
        const categoryProducts = getProductsByCategory(category)
          .filter((product) => product.category === category)
          .filter((product) => {
            if (!term) return true;

            return (
              product.name.toLowerCase().includes(term) ||
              product.description.toLowerCase().includes(term) ||
              product.category.toLowerCase().includes(term) ||
              product.keyFeatures.toLowerCase().includes(term)
            );
          });

        const uniqueProducts = Array.from(
          new Map(
            categoryProducts.map((product) => [product.slug, product])
          ).values()
        );

        return {
          category,
          products: uniqueProducts,
        };
      })
      .filter((group) => group.products.length > 0);
  }, [searchTerm]);

  const visibleProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    const sourceProducts =
      selectedCategory === "All"
        ? getAllProducts()
        : getProductsByCategory(selectedCategory).filter(
          (product) => product.category === selectedCategory
        );

    const uniqueProducts = Array.from(
      new Map(sourceProducts.map((product) => [product.slug, product])).values()
    );

    if (!term) return uniqueProducts;

    return uniqueProducts.filter((product) => {
      return (
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.keyFeatures.toLowerCase().includes(term)
      );
    });
  }, [searchTerm, selectedCategory]);

  const totalGroupedProducts = groupedProducts.reduce(
    (total, group) => total + group.products.length,
    0
  );

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsMobileFilterOpen(false);

    if (searchTerm.trim()) {
      setSearchTerm("");
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSelectedCategory("All");

    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", "/products");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="border-b bg-pink-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-black text-gray-900 lg:text-3xl">
                Shop Our Products
              </h1>

              <nav className="mt-1 text-sm text-gray-600">
                <Link href="/" className="hover:text-red-600">
                  Home
                </Link>
                <span className="mx-2">/</span>
                <span>Shop</span>
              </nav>
            </div>

            <div className="w-full lg:w-96">
              <p className="mb-2 font-medium text-gray-700 lg:hidden">
                What are you printing today?
              </p>


            </div>

            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
              className="inline-flex items-center gap-2 font-bold text-gray-700 hover:text-red-600 lg:hidden"
            >
              <Filter className="h-5 w-5" />
              Filter
            </button>
          </div>
        </div>

        <div className="hidden py-8 lg:block">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                  <Printer className="h-7 w-7 text-red-600" />
                </div>
                <div>
                  <h3 className="font-black text-gray-900">
                    Quality Printing
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    Premium print quality with sharp details and durable
                    finishing.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                    ⚡
                  </span>
                </div>
                <div>
                  <h3 className="font-black text-gray-900">
                    Rapid Turnaround
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    Orders are delivered within 3 to 7 business days.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                    ₦
                  </span>
                </div>
                <div>
                  <h3 className="font-black text-gray-900">
                    Money Back Guarantee
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    We support customers when a satisfactory solution is needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 lg:hidden">
          <div className="fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-white shadow-xl">
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="text-lg font-black text-gray-900">Categories</h2>

              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="text-gray-500 hover:text-gray-900"
                aria-label="Close filter"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="h-full overflow-y-auto p-4 pb-24">
              <nav className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategorySelect(category)}
                    className={`block w-full rounded-lg px-4 py-3 text-left transition ${selectedCategory === category
                      ? "bg-red-50 font-bold text-red-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-red-600"
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      <section className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <aside className="hidden w-64 flex-shrink-0 lg:block">
            <div className="sticky top-4 rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-black italic text-gray-900">
                Shop
              </h2>

              <nav className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategorySelect(category)}
                    className={`block w-full rounded-lg px-3 py-2 text-left transition ${selectedCategory === category
                      ? "bg-red-50 font-bold text-red-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-red-600"
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          <div className="flex-1">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-black italic text-gray-900 lg:text-2xl">
                  {searchTerm.trim()
                    ? `Search Results for "${searchTerm}"`
                    : selectedCategory === "All"
                      ? "All Products"
                      : selectedCategory}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {selectedCategory === "All"
                    ? totalGroupedProducts
                    : visibleProducts.length}{" "}
                  product
                  {(selectedCategory === "All"
                    ? totalGroupedProducts
                    : visibleProducts.length) === 1
                    ? ""
                    : "s"}{" "}
                  found
                </p>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for flyers, paper bag, business card..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setSelectedCategory("All");
                  }}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-12 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />

                {searchTerm.trim() ? (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-red-600"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                ) : (
                  <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                )}
              </div>


            </div>

            {selectedCategory === "All" ? (
              groupedProducts.length > 0 ? (
                <div className="space-y-12">
                  {groupedProducts.map((group) => (
                    <section key={group.category} className="scroll-mt-24">
                      <div className="sticky top-0 z-20 mb-5 rounded-2xl border border-gray-200 bg-white/90 px-4 py-4 shadow-sm backdrop-blur">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wide text-red-600">
                              Category
                            </p>
                            <h3 className="text-xl font-black italic text-gray-900 lg:text-2xl">
                              {group.category}
                            </h3>
                          </div>

                          <p className="text-sm font-medium text-gray-500">
                            {group.products.length} product
                            {group.products.length === 1 ? "" : "s"}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                        {group.products.map((product) => (
                          <ProductCard key={product.slug} product={product} />
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
                  <p className="text-lg font-bold text-gray-700">
                    No products found.
                  </p>
                  <p className="mt-2 text-gray-500">
                    Try another category or search keyword.
                  </p>
                </div>
              )
            ) : visibleProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
                <p className="text-lg font-bold text-gray-700">
                  No products found.
                </p>
                <p className="mt-2 text-gray-500">
                  Try another category or search keyword.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}