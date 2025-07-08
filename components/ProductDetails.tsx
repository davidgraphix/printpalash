"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductDetailProps {
  slug: string;
}

// Mock product data - in real app, this would come from API/database
const getProductData = (slug: string) => {
  const products = {
    "business-cards": {
      title: "Business Cards",
      description:
        "Elevate your professional presence with our custom business cards. Each card is meticulously designed to reflect your unique brand identity, ensuring you make a lasting impression.",
      keyFeatures:
        "Printed on high-quality cardstock, our cards feature vibrant colors and sharp details, available in various finishes to suit your style.",
      delivery: {
        lagos: "3-5 Working Days for order within Lagos",
        others: "5-7 Working Days for Order from other state",
      },
      price: 11000,
      tax: 850,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
  };

  return products[slug as keyof typeof products] || products["business-cards"];
};

export default function ProductDetail({ slug }: ProductDetailProps) {
  const [selectedQuantity, setSelectedQuantity] = useState("100");
  const [selectedSpecs, setSelectedSpecs] = useState({
    paperThickness: "thick-300gsm",
    lamination: "matte-lamination",
    edges: "square-edges",
    shipping: "standard",
  });

  const product = getProductData(slug);

  const handleSpecChange = (category: string, value: string) => {
    setSelectedSpecs((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link
              href="/products"
              className="text-gray-500 hover:text-gray-700"
            >
              All Products
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-red-600 font-medium">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border-b py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-end">
            <div className="flex w-80">
              <input
                type="text"
                placeholder="Search for any Products"
                className="flex-1 py-2 px-4 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-r-lg">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.title}
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-3 gap-4">
              {product.images.slice(1).map((image, index) => (
                <div
                  key={index}
                  className="aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-80"
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.title} ${index + 2}`}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Key Features
              </h3>
              <p className="text-gray-600">{product.keyFeatures}</p>
            </div>

            {/* Delivery */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Delivery
              </h3>
              <div className="space-y-1 text-gray-600">
                <p>{product.delivery.lagos}</p>
                <p>{product.delivery.others}</p>
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                Quantity
              </label>
              <div className="relative">
                <select
                  value={selectedQuantity}
                  onChange={(e) => setSelectedQuantity(e.target.value)}
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none bg-white"
                >
                  <option value="50">50 pieces</option>
                  <option value="100">100 pieces</option>
                  <option value="250">250 pieces</option>
                  <option value="500">500 pieces</option>
                  <option value="1000">1000 pieces</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-2xl font-bold text-gray-900">
                    ₦{product.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tax</span>
                  <span className="text-gray-500">{product.tax}</span>
                </div>
              </div>

              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg mt-6 text-lg transition-colors duration-200">
                ORDER NOW
              </button>
            </div>
          </div>
        </div>
        {/* Specifications Section */}
        <div className="mt-16 grid lg:grid-cols-[2fr_1fr] gap-12">
          {/* Specifications */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-2 border-b-2 border-red-1000">
              SPECIFICATIONS
            </h2>

            <div className="grid grid-cols-2 gap-6">
              {/* Paper Thickness */}
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  PAPER THICKNESS
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      id: "thick-300gsm",
                      label: "Thick 300gsm",
                      image: "/placeholder.svg?height=100&width=100",
                    },
                    {
                      id: "super-thick-600gsm",
                      label: "Super Thick 600gsm",
                      image: "/placeholder.svg?height=100&width=100",
                    },
                  ].map((option) => (
                    <div key={option.id} className="flex flex-col items-center">
                      <div
                        onClick={() =>
                          handleSpecChange("paperThickness", option.id)
                        }
                        className={`aspect-square bg-gray-200 rounded-lg cursor-pointer border-2 transition-colors w-full ${
                          selectedSpecs.paperThickness === option.id
                            ? "border-red-600"
                            : "border-transparent"
                        }`}
                      >
                        <Image
                          src={option.image}
                          alt={option.label}
                          width={100}
                          height={100}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <span className="mt-2 text-xs font-medium text-gray-700 text-center">
                        {option.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lamination */}
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  LAMINATION
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      id: "matte-lamination",
                      label: "Matte Lamination",
                      image: "/placeholder.svg?height=100&width=100",
                    },
                    {
                      id: "gloss-lamination",
                      label: "Gloss Lamination",
                      image: "/placeholder.svg?height=100&width=100",
                    },
                  ].map((option) => (
                    <div key={option.id} className="flex flex-col items-center">
                      <div
                        onClick={() =>
                          handleSpecChange("lamination", option.id)
                        }
                        className={`aspect-square bg-gray-200 rounded-lg cursor-pointer border-2 transition-colors w-full ${
                          selectedSpecs.lamination === option.id
                            ? "border-red-600"
                            : "border-transparent"
                        }`}
                      >
                        <Image
                          src={option.image}
                          alt={option.label}
                          width={100}
                          height={100}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <span className="mt-2 text-xs font-medium text-gray-700 text-center">
                        {option.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Edges */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  EDGES
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      id: "square-edges",
                      label: "Square Edges",
                      image: "/placeholder.svg?height=100&width=100",
                    },
                    {
                      id: "rounded-edges",
                      label: "Rounded Edges",
                      image: "/placeholder.svg?height=100&width=100",
                    },
                  ].map((option) => (
                    <div key={option.id} className="flex flex-col items-center">
                      <div
                        onClick={() => handleSpecChange("edges", option.id)}
                        className={`aspect-square bg-gray-200 rounded-lg cursor-pointer border-2 transition-colors w-full ${
                          selectedSpecs.edges === option.id
                            ? "border-red-600"
                            : "border-transparent"
                        }`}
                      >
                        <Image
                          src={option.image}
                          alt={option.label}
                          width={100}
                          height={100}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <span className="mt-2 text-xs font-medium text-gray-700 text-center">
                        {option.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Shipping */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-2 border-b-2 border-red6900">
              SHIPPING
            </h2>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                SHIPPING
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    id: "standard",
                    label: "Standard",
                    image: "/placeholder.svg?height=100&width=100",
                  },
                  {
                    id: "express",
                    label: "Express",
                    image: "/placeholder.svg?height=100&width=100",
                  },
                ].map((option) => (
                  <div key={option.id} className="flex flex-col items-center">
                    <div
                      onClick={() => handleSpecChange("shipping", option.id)}
                      className={`aspect-square bg-gray-200 rounded-lg cursor-pointer border-2 transition-colors w-20 h-20 flex items-center justify-center ${
                        selectedSpecs.shipping === option.id
                          ? "border-red-600"
                          : "border-transparent"
                      }`}
                    >
                      <Image
                        src={option.image}
                        alt={option.label}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover rounded-"
                      />
                    </div>
                    <span className="mt-2 text-xs font-medium text-gray-700 text-center">
                      {option.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
