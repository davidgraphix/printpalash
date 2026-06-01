import { ImageIcon, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getPopularProducts, getAllProducts } from "@/lib/products-data";

function ProductStars({ rating = 4.8 }: { rating?: number }) {
  return (
    <div className="flex items-center gap-0.5">
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

export default function PopularProducts() {
  const popularProducts = getPopularProducts();

  const displayProducts =
    popularProducts.length > 0 ? popularProducts : getAllProducts().slice(0, 12);

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-start justify-between gap-4 lg:mb-12">
          <div className="min-w-0">
            <h2 className="text-xl font-black text-gray-900 sm:text-2xl lg:text-3xl">
              Popular Products
            </h2>

            <p className="mt-2 hidden text-sm text-gray-500 sm:block">
              Top printing products customers order often.
            </p>
          </div>

          <Link
            href="/products"
            className="shrink-0 whitespace-nowrap text-sm font-bold text-red-600 hover:text-red-700 sm:text-base lg:text-xl"
          >
            See All Product
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {displayProducts.map((product) => {
            const productImage =
              product.images?.[0] || product.image || "/placeholder.svg";

            return (
              <article
                key={product.slug}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <Link href={`/products/${product.slug}`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <Image
                      src={productImage}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* {product.images?.length > 1 && (
                      <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-white">
                        <ImageIcon className="h-3.5 w-3.5" />
                        {product.images.length}
                      </div>
                    )} */}
                  </div>
                </Link>

                <div className="flex flex-1 flex-col p-4">
                  <ProductStars rating={product.rating || 4.8} />

                  <Link href={`/products/${product.slug}`}>
                    <h3 className="mt-3 line-clamp-2 text-sm font-black text-gray-900 transition group-hover:text-red-600 lg:text-base">
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
          })}
        </div>
      </div>
    </section>
  );
}