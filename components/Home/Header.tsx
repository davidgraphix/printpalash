"use client";
import { Phone, MessageCircle, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white py-3 border-b border-gray-200">
      <div className="container mx-auto px-4">
        {/* Mobile Layout */}
        <div className="lg:hidden flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-lg font-bold text-black">
              <Link href="/" aria-label="Go to homepage">
                <Image
                  src="/assests/printpalash-logo.png"
                  alt="PrintPalash Logo"
                  width={280}
                  height={280}
                  className="w-32 sm:w-40 md:w-52 lg:w-72 h-auto object-contain"
                />
              </Link>
            </h1>
          </div>

          {/* Center - Need Help Call */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <Phone className="w-4 h-4 text-gray-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Need help? Call:</span>
              <a
                href="tel:+2347035017359"
                className="text-[10px] text-gray-900 font-medium cursor-pointer hover:underline"
              >
                +234 703 501 7359
              </a>
            </div>
          </div>

          {/* Right Side - Chat Button */}
          {/* <div className="flex-shrink-0">
            <Link
              href="https://wa.me/2347035017359"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="flex items-center space-x-2 bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 transition-colors"
                onClick={() => {
                  window.open(
                    "https://wa.me/2347035017359?text=" +
                    encodeURIComponent(
                      "Hello PrintPalash! I’m interested in your print services. Please tell me more about your products and how you can help bring my ideas to life.",
                    ),
                    "_blank",
                    "noopener,noreferrer",
                  );
                }}
                style={{ cursor: "pointer" }}
              >
                <MessageCircle className="w-3 h-3" />
                <span className="text-[10px] font-medium">Chat</span>
              </div>
            </Link>
          </div> */}
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-black">
              <Link href="/" aria-label="Go to homepage">
                <Image
                  src="/assests/printpalash-logo.png"
                  alt="PrintPalash Logo"
                  width={280}
                  height={280}
                  className="w-50 h-auto object-contain"
                />
              </Link>
            </h1>
          </div>

          {/* Center Content */}
          <div className="flex items-center space-x-8">
            {/* Business Hours */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-900">
                  8:00AM - 8:00PM
                </span>
                <span className="text-xs text-gray-500">
                  Monday to Saturday
                </span>
              </div>
            </div>

            {/* Online 24/7 */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-900">
                  Online 24/7
                </span>
                <span className="text-xs text-gray-500">
                  Top notch customer service
                </span>
              </div>
            </div>

            {/* Need Help Call */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Need help? Call</span>
                <a
                  href="tel:+2347035017359"
                  className="text-sm text-gray-900 font-semibold cursor-pointer hover:underline"
                >
                  +234 703 501 7359
                </a>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Chat Button */}
            {/* <Link
              href="https://wa.me/2347035017359"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                onClick={() => {
                  window.open(
                    "https://wa.me/2347035017359?text=" +
                    encodeURIComponent(
                      "Hello PrintPalash! I’m interested in your print services. Please tell me more about your products and how you can help bring my ideas to life.",
                    ),
                    "_blank",
                    "noopener,noreferrer",
                  );
                }}
                style={{ cursor: "pointer" }}
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Chat with us</span>
              </div>
            </Link> */}

            {/* Nigeria Flag */}
            <div className="flex items-center space-x-2">
              <div className="w-6 h-4 bg-green-600 relative overflow-hidden rounded-sm">
                <div className="absolute left-0 top-0 w-2 h-full bg-green-600"></div>
                <div className="absolute left-2 top-0 w-2 h-full bg-white"></div>
                <div className="absolute right-0 top-0 w-2 h-full bg-green-600"></div>
              </div>
              <span className="text-sm text-gray-700 font-medium">Nigeria</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
