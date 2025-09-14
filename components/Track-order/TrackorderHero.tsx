"use client";

import type React from "react";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import trackOrderImage from "@/public/assests/red-delivery-car-deliver-express-shipping-fast-delivery-with-arrow-graph-background-3d-rendering 1.png";

export default function TrackOrderHero() {
  const [orderNumber, setOrderNumber] = useState("");

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderNumber.trim()) {
      // Handle order tracking logic here
      console.log("Tracking order:", orderNumber);
      // You can add API call or redirect to tracking results
    }
  };

  return (
    <section className="bg-gradient-to-br from-pink-50 to-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Illustration */}
          <div className="relative">
            {/* Background Arrow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-96 h-32 bg-pink-200 rounded-full transform rotate-12 opacity-50"></div>
            </div>

            {/* Mobile Phone with Tracking Steps */}
            <div className="relative z-10 flex items-center justify-center">
              <div className="relative">
                <Image src={trackOrderImage} alt="" />
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Track your print order
              </h1>
              <p className="text-lg text-gray-600">
                Easily track the status of your order using your order number
                and see step by step progress on your order.
              </p>
            </div>

            {/* Order Tracking Form */}
            <form onSubmit={handleTrackOrder} className="space-y-4">
              <div className="flex">
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="Enter your Order Number"
                  className="flex-1 py-4 px-6 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                  required
                />
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-r-lg transition-colors duration-200 flex items-center justify-center"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </form>

            {/* Contact Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 leading-relaxed">
                If you would prefer to speak to someone personally about the
                status of your order, please reach out via WhatsApp{" "}
                <a
                  href={`https://wa.me/2347035017359?text=${encodeURIComponent(
                    "Hello, I would like to inquire about the status of my print order. Could you please assist me?"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-red-600 underline hover:text-red-700"
                >
                  +234 703 501 7359
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
