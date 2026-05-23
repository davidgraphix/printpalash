"use client";
import { useState } from "react";
import { Printer, Search, Filter, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getProductsByCategory } from "@/lib/products-data";

// Product categories data
const categories = [
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
  "Flyers & Posters",
  "Invitations",
  "Office Stationery",
];

export default function ProductsSection() {
  const [selectedCategory, setSelectedCategory] = useState("Bags");
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Get products for selected category
  const currentProducts = getProductsByCategory(selectedCategory);

  // Filter products based on search term
  const filteredProducts = currentProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsMobileFilterOpen(false); // Close mobile filter after selection
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Mobile Header with Search */}
        <div className="bg-pink-50 px-4 py-6">
          {/* Search Bar */}
          <div className="mb-6">
            <p className="text-gray-700 font-medium mb-3">
              What are you printing today?
            </p>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for flyers, paper bag, business card, e.t.c."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 px-4 pr-12 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-700 placeholder-gray-400 text-sm"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          {/* All Products Header with Filter */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
              <nav className="text-sm text-gray-600 mt-1">
                <Link href="/" className="hover:text-red-600">
                  Home
                </Link>
                <span className="mx-2">/</span>
                <span>Shop</span>
              </nav>
            </div>
            {/* Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="flex items-center space-x-2 text-gray-700 hover:text-red-600"
            >
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filter</span>
            </button>
          </div>
        </div>

        {/* Mobile Filter Modal */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-xl">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-bold text-gray-900">Categories</h2>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-4 overflow-y-auto h-full pb-20">
                <nav className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      className={`block w-full text-left py-3 px-4 rounded transition-colors ${
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
          </div>
        )}

        {/* Mobile Products Section */}
        <div className="px-4 py-6">
          {/* Category Title */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 italic">
              {selectedCategory}
            </h2>
          </div>

          {/* Products Grid - Single Column on Mobile */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {filteredProducts.map((product, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col"
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
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                      STARTING AT
                    </p>
                    <div className="flex items-baseline space-x-1 mb-3">
                      <span className="text-lg font-bold text-red-600">
                        {product.price}
                      </span>
                      <span className="text-xs text-gray-500">
                        {product.unit}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    {/* Action Button */}
                    <Link
                      href={`/products/${product.slug}`}
                      className="block mt-auto"
                    >
                      <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-3 rounded text-xs transition-colors">
                        Order Now
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No products found in this category.
              </p>
              <p className="text-gray-400 mt-2">
                Try selecting a different category or adjusting your search.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        {/* Page Header */}
        <div className="bg-pink-50 border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  All Products
                </h1>
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
          {/* Features Section - Desktop Only */}
          <div className="py-8">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Quality Printing */}
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
                      <Printer className="w-8 h-8 text-red-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">
                      Quality Printing
                    </h3>
                    <p className="text-sm text-gray-600">
                      Experience the transformative power of quality print -
                      where every detail elevates your vision from ordinary to
                      extraordinary.
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
                    <h3 className="font-bold text-gray-900">
                      Rapid Turnaround
                    </h3>
                    <p className="text-sm text-gray-600">
                      Your order will be delivered within 3 to 7 business days,
                      with quality always guaranteed.
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
                    <h3 className="font-bold text-gray-900">
                      Money Back Guarantee
                    </h3>
                    <p className="text-sm text-gray-600">
                      While most clients strive to resolve issues with buyers,
                      we offer a refund if a satisfactory solution cannot be
                      achieved.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Desktop */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Sidebar */}
            <div className="w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 italic">
                  Shop
                </h2>
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
                <h2 className="text-2xl font-bold text-gray-900 italic">
                  {selectedCategory}
                </h2>
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
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {product.name}
                        </h3>
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                          STARTING AT
                        </p>
                        <div className="flex items-baseline space-x-1 mb-3">
                          <span className="text-xl font-bold text-red-600">
                            {product.price}
                          </span>
                          <span className="text-sm text-gray-500">
                            {product.unit}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          {product.description}
                        </p>
                        {/* Action Buttons */}
                        <div className="flex space-x-2">
                          <Link
                            href={`/products/${product.slug}`}
                            className="flex-1"
                          >
                            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors">
                              Order Now
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    No products found in this category.
                  </p>
                  <p className="text-gray-400 mt-2">
                    Try selecting a different category or adjusting your search.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
