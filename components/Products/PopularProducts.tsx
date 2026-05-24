import Image from "next/image";
import Link from "next/link";
import { getPopularProducts, getAllProducts } from "@/lib/products-data";

export default function PopularProducts() {
  const popularProducts = getPopularProducts();
  const displayProducts =
    popularProducts.length > 0
      ? popularProducts
      : getAllProducts().slice(0, 12);

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 lg:mb-12 space-y-4 sm:space-y-0">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Popular Products
          </h2>
          <Link
            href="/products"
            className="text-red-600 hover:text-red-700 font-medium text-sm lg:text-base"
          >
            See all products
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {displayProducts.map((product, index) => (
            <Link key={index} href={`/products/${product.slug}`}>
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer">
                {/* Product Image */}
                <div className="aspect-square bg-gray-200 relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="p-3 lg:p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base line-clamp-2">
                    {product.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
