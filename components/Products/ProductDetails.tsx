"use client";
import { useState } from "react";
import { ChevronRight, ChevronDown, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products-data";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedQuantity, setSelectedQuantity] = useState("100");
  const [selectedSpecs, setSelectedSpecs] = useState({
    paperThickness: "thick-300gsm",
    lamination: "matte-lamination",
    edges: "square-edges",
    shipping: "standard",
  });

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate total price
  const quantityNumber = Number(selectedQuantity);
  const unitPrice = product.priceNumeric || 0;
  const totalPrice = unitPrice * quantityNumber;

  const handleSpecChange = (category: string, value: string) => {
    setSelectedSpecs((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  // Handle Order function to send order details to API and redirect to WhatsApp
  const handleOrder = async () => {
    setError(null);
    setIsLoading(true);

    const orderPayload = {
      productName: product.name,
      productId: product.slug ?? undefined,
      quantity: quantityNumber,
      unitPrice,
      totalPrice,
      tax: product.tax,
      specs: selectedSpecs,
      customer: { name: customerName, phone: customerPhone },
    };

    try {
      const resp = await fetch("/api/send-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await resp.json();
      if (!resp.ok) throw new Error(data?.message || "Failed to place order");

      const whatsAppNumber =
        process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2347035017359";

      const specsText = Object.entries(selectedSpecs)
        .map(([k, v]) => `${k}: ${v}`)
        .join(", ");

      const message = `Hello, my name is ${
        orderPayload.customer.name
      }, phone: ${orderPayload.customer.phone}. I just ordered ${
        orderPayload.quantity
      } x ${
        orderPayload.productName
      } (${specsText}). Total: ₦${orderPayload.totalPrice.toLocaleString()}.`;

      const waUrl = `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(
        message,
      )}`;
      window.location.href = waUrl;
    } catch (err: any) {
      console.error("Order error", err);
      setError(err?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-3 px-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <Link
              href="/products"
              className="text-gray-500 hover:text-gray-700"
            >
              All Products
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <span className="text-red-600 font-medium">{product.name}</span>
          </nav>
        </div>

        {/* Search Bar */}
        <div className="bg-white border-b py-3 px-4">
          <div className="flex">
            <input
              type="text"
              placeholder="Search for any products"
              className="flex-1 py-2 px-4 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
            />
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-r-lg">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product Content */}
        <div className="px-4 py-6">
          {/* Product Images */}
          <div className="mb-6">
            {/* Main Image */}
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden mb-4">
              <Image
                src={product.images[0] || product.image || "/placeholder.svg"}
                alt={product.name}
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Thumbnail Images */}
            <div className="grid grid-cols-3 gap-3">
              {product.images.slice(1, 4).map((image, index) => (
                <div
                  key={index}
                  className="aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-80"
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 2}`}
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
              <h1 className="text-2xl font-bold text-gray-900 mb-3">
                {product.name}
              </h1>
              <p className="text-gray-600 leading-relaxed text-sm">
                {product.description}
              </p>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Key Features
              </h3>
              <p className="text-gray-600 text-sm">{product.keyFeatures}</p>
            </div>

            {/* Delivery */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Delivery
              </h3>
              <div className="space-y-1 text-gray-600 text-sm">
                <p>{product.delivery.lagos}</p>
                <p>{product.delivery.others}</p>
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-3">
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
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Unit Price</span>
                  <span className="text-lg font-bold text-gray-900">
                    ₦{unitPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Quantity</span>
                  <span className="text-lg font-bold text-gray-900">
                    {quantityNumber}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total</span>
                  <span className="text-2xl font-bold text-red-600">
                    ₦{totalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tax</span>
                  <span className="text-gray-500">
                    ₦{product.tax.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full border rounded-lg p-3 text-base focus:ring-2 focus:ring-red-500"
                  required
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full border rounded-lg p-3 text-base focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <button
                onClick={() => {
                  if (!customerName.trim() || !customerPhone.trim()) {
                    setError("Please fill in your name and phone number.");
                    return;
                  }
                  handleOrder();
                }}
                disabled={isLoading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg mt-4 text-lg transition-colors duration-200"
              >
                {isLoading ? "Placing Order..." : "ORDER NOW"}
              </button>
              {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
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
              <span className="text-red-600 font-medium">{product.name}</span>
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
                  src={product.images[0] || product.image}
                  alt={product.name}
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
                      alt={`${product.name} ${index + 2}`}
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
                  {product.name}
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
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Unit Price</span>
                    <span className="text-lg font-bold text-gray-900">
                      ₦{unitPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Quantity</span>
                    <span className="text-lg font-bold text-gray-900">
                      {quantityNumber}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total</span>
                    <span className="text-2xl font-bold text-red-600">
                      ₦{totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tax</span>
                    <span className="text-gray-500">
                      ₦{product.tax.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full border rounded-lg p-3 text-base focus:ring-2 focus:ring-red-500"
                    required
                  />

                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full border rounded-lg p-3 text-base focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>

                <button
                  onClick={() => {
                    if (!customerName.trim() || !customerPhone.trim()) {
                      setError("Please fill in your name and phone number.");
                      return;
                    }
                    handleOrder();
                  }}
                  disabled={isLoading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg mt-6 text-lg transition-colors duration-200"
                >
                  {isLoading ? "Placing Order..." : "ORDER NOW"}
                </button>
                {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
