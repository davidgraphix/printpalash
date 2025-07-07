import Image from "next/image";
import Link from "next/link";

const products = [
  {
    name: "Business Cards",
    price: "₦15,000",
    unit: "per 100",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "A5 Flyer (Single Sided)",
    price: "₦13,500",
    unit: "per 100",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "T-shirt",
    price: "₦6,000",
    unit: "per 1",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Roll Up Banner (Big Base)",
    price: "₦55,000",
    unit: "per 1",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "A4 Paper Bag (Branded)",
    price: "₦90,000",
    unit: "per 100",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "ID Card (Front & Back)",
    price: "₦4,500",
    unit: "per 1",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Mugs (Simple & Magic)",
    price: "₦4,500",
    unit: "per 1",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "A2 Posters",
    price: "₦63,000",
    unit: "per 100",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Courier Bags",
    price: "₦25,500",
    unit: "per 100",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Medium Brown Bags",
    price: "₦70,000",
    unit: "per 100",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Nylon Bags (Branded)",
    price: "₦22,000",
    unit: "per 100",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Jotters (Soft Cover)",
    price: "₦80,000",
    unit: "per 100",
    image: "/placeholder.svg?height=200&width=200",
  },
];

export default function PopularProducts() {
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
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
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
                  <span className="text-sm text-gray-500">{product.unit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
