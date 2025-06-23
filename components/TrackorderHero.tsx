"use client"

import type React from "react"

import { useState } from "react"
import { ChevronRight } from "lucide-react"

export default function TrackOrderHero() {
  const [orderNumber, setOrderNumber] = useState("")

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault()
    if (orderNumber.trim()) {
      // Handle order tracking logic here
      console.log("Tracking order:", orderNumber)
      // You can add API call or redirect to tracking results
    }
  }

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
                {/* Phone Frame */}
                <div className="w-48 h-80 bg-gray-800 rounded-3xl p-2 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-2xl p-4 flex flex-col">
                    {/* Tracking Steps */}
                    <div className="space-y-4 mt-8">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                        <div className="flex-1 h-1 bg-red-600 rounded"></div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                        <div className="flex-1 h-1 bg-red-600 rounded"></div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                        <div className="flex-1 h-1 bg-gray-300 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Truck */}
                <div className="absolute -right-20 top-1/2 transform -translate-y-1/2">
                  <div className="relative">
                    {/* Truck Body */}
                    <div className="w-32 h-20 bg-red-600 rounded-lg relative">
                      {/* Truck Cab */}
                      <div className="absolute -left-8 top-2 w-12 h-16 bg-red-600 rounded-l-lg"></div>
                      {/* Truck Door Lines */}
                      <div className="absolute right-2 top-2 bottom-2 w-0.5 bg-white"></div>
                      <div className="absolute right-6 top-2 bottom-2 w-0.5 bg-white"></div>
                      {/* Wheels */}
                      <div className="absolute -bottom-2 left-2 w-6 h-6 bg-gray-800 rounded-full"></div>
                      <div className="absolute -bottom-2 right-8 w-6 h-6 bg-gray-800 rounded-full"></div>
                    </div>

                    {/* Packages */}
                    <div className="absolute -bottom-8 -left-4 w-6 h-6 bg-yellow-600 rounded"></div>
                    <div className="absolute -bottom-6 left-8 w-4 h-4 bg-yellow-600 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Track your print order</h1>
              <p className="text-lg text-gray-600">
                Easily track the status of your order using your order number and see step by step progress on your
                order.
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
                If you would prefer to speak to someone personally about the status of your order, please reach out via
                whatsApp <span className="font-semibold text-red-600">+234 703 501 7359</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
