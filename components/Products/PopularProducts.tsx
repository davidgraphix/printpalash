import Image from "next/image";
import Link from "next/link";
import { getPopularProducts, getAllProducts } from "@/lib/products-data";

export default function PopularProducts() {
  // Get products marked as popular
  const popularProducts = getPopularProducts();

  // If no products are marked as popular, fall back to first 12 products
  const displayProducts =
    popularProducts.length > 0
      ? popularProducts
      : getAllProducts().slice(0, 12);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Popular Products</h2>
          <Link
            href="/products"
            className="text-red-600 hover:text-red-700 font-medium"
          >
            See all products
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                    STARTING AT
                  </p>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-xl font-bold text-red-600">
                      {product.price}
                    </span>
                    <span className="text-sm text-gray-500">
                      {product.unit}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
