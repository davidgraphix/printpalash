"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Product categories data
const categories = [
  "Bags",
  "Banners & Large Format",
  "Brochures",
  "Business Cards",
  "Calendars",
  "Campaign Materials",
  "Caps & Hats",
  "ClothesTag",
  "Clothing & Apparel",
  "Comic Republic",
  "Corporate Gifts",
  "Envelopes",
  "Flyers & Handbills",
  "Frames & Wall Arts",
  "Greeting Cards",
  "ID Cards",
  "Labels",
  "Letterhead",
  "Mugs",
  "Notepads and Jotters",
  "Posters",
  "Presentation Folders",
  "Promotional Items",
  "Stickers",
  "Umbrella",
  "Wedding Stationery",
]

// Sample products data organized by category
const productsData = {
  "Business Cards": [
    {
      name: "Standard Business Cards",
      price: "₦15,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Premium quality standard business cards",
    },
    {
      name: "Premium Business Cards",
      price: "₦25,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Luxury finish business cards with special coating",
    },
    {
      name: "Embossed Business Cards",
      price: "₦35,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Raised text business cards for premium feel",
    },
    {
      name: "Foil Stamped Business Cards",
      price: "₦40,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Gold/Silver foil stamped business cards",
    },
  ],
  Bags: [
    {
      name: "A4 Paper Bag (Branded)",
      price: "₦90,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Custom branded A4 paper bags",
    },
    {
      name: "Courier Bags",
      price: "₦25,500",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Durable courier bags for shipping",
    },
    {
      name: "Medium Brown Bags",
      price: "₦70,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Medium sized brown paper bags",
    },
    {
      name: "Nylon Bags (Branded)",
      price: "₦22,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Custom branded nylon bags",
    },
  ],
  "Flyers & Handbills": [
    {
      name: "A5 Flyer (Single Sided)",
      price: "₦13,500",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Single sided A5 flyers",
    },
    {
      name: "A5 Flyer (Double Sided)",
      price: "₦18,500",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Double sided A5 flyers",
    },
    {
      name: "A4 Flyer (Single Sided)",
      price: "₦20,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Single sided A4 flyers",
    },
    {
      name: "A4 Flyer (Double Sided)",
      price: "₦28,000",
      unit: "per 100",
      image: "/placeholder.svg?height=200&width=200",
      description: "Double sided A4 flyers",
    },
  ],
  "Clothing & Apparel": [
    {
      name: "T-shirt (Cotton)",
      price: "₦6,000",
      unit: "per 1",
      image: "/placeholder.svg?height=200&width=200",
      description: "100% cotton custom printed t-shirts",
    },
    {
      name: "T-shirt (Polo)",
      price: "₦8,500",
      unit: "per 1",
      image: "/placeholder.svg?height=200&width=200",
      description: "Premium polo t-shirts with custom printing",
    },
    {
      name: "Hoodies",
      price: "₦15,000",
      unit: "per 1",
      image: "/placeholder.svg?height=200&width=200",
      description: "Custom printed hoodies",
    },
    {
      name: "Corporate Shirts",
      price: "₦12,000",
      unit: "per 1",
      image: "/placeholder.svg?height=200&width=200",
      description: "Professional corporate shirts with logo",
    },
  ],
  Mugs: [
    {
      name: "Mugs (Simple & Magic)",
      price: "₦4,500",
      unit: "per 1",
      image: "/placeholder.svg?height=200&width=200",
      description: "Custom printed mugs - simple and magic mugs",
    },
    {
      name: "Ceramic Mugs",
      price: "₦3,500",
      unit: "per 1",
      image: "/placeholder.svg?height=200&width=200",
      description: "High quality ceramic mugs",
    },
    {
      name: "Travel Mugs",
      price: "₦8,000",
      unit: "per 1",
      image: "/placeholder.svg?height=200&width=200",
      description: "Insulated travel mugs with custom design",
    },
  ],
}

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Bags")
  const [searchTerm, setSearchTerm] = useState("")

  // Get products for selected category
  const currentProducts = productsData[selectedCategory as keyof typeof productsData] || []

  // Filter products based on search term
  const filteredProducts = currentProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
              <nav className="text-sm text-gray-600 mt-1">
                <Link href="/" className="hover:text-red-600">
                  Home
                </Link>
                <span className="mx-2">/</span>
                <span>Shop</span>
              </nav>
            </div>

            {/* Search Bar */}
            <div className="relative w-96">
              <input
                type="text"
                placeholder="Search for any product"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 px-4 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Quality Printing */}
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Quality Printing</h3>
                <p className="text-sm text-gray-600">
                  Experience the transformative power of quality print - where every detail elevates your vision from
                  ordinary to extraordinary.
                </p>
              </div>
            </div>

            {/* Rapid Turnaround */}
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">⚡</span>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Rapid Turnaround</h3>
                <p className="text-sm text-gray-600">
                  Your order will be delivered within 3 to 7 business days, with quality always guaranteed.
                </p>
              </div>
            </div>

            {/* Money Back Guarantee */}
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">₦</span>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Money Back Guarantee</h3>
                <p className="text-sm text-gray-600">
                  While most clients strive to resolve issues with buyers, we offer a refund if a satisfactory solution
                  cannot be achieved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 italic">Shop</h2>
              <nav className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`block w-full text-left py-2 px-3 rounded transition-colors ${
                      selectedCategory === category
                        ? "bg-red-50 text-red-600 font-medium"
                        : "text-gray-700 hover:bg-gray-50 hover:text-red-600"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 italic">{selectedCategory}</h2>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
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
                      <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">STARTING AT</p>
                      <div className="flex items-baseline space-x-1 mb-3">
                        <span className="text-xl font-bold text-red-600">{product.price}</span>
                        <span className="text-sm text-gray-500">{product.unit}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{product.description}</p>

                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors">
                          Add to Cart
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                          <span className="text-gray-600">♡</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found in this category.</p>
                <p className="text-gray-400 mt-2">Try selecting a different category or adjusting your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
