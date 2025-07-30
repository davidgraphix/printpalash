import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import mobileHeroImg from "@/public/assests/mobile-hero-img.png";
import desktopHeroImg from "@/public/assests/heroBg.png";
import productOneImg from "@/public/assests/image-items/product1.png";
import productTwoImg from "@/public/assests/image-items/product2.png";

export default function Hero() {
  return (
    <section className="relative bg-pink-100 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Mobile Layout (visible on screens smaller than lg) */}
        <div className="lg:hidden pt-8 pb-16">
          {/* Top row: Text content on left, Mobile Hero Image on right */}
          <div className="flex items-start justify-between gap-0 mb-6">
            {" "}
            {/* Reduced mb to mb-6 */}
            {/* Left Content: Heading, Description, Button */}
            <div className="flex-1 space-y-3 text-left min-w-0 pr-2">
              {" "}
              {/* Adjusted space-y to space-y-3 */}
              <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                Transforming Your <br />
                <span className="text-red-600">Vision</span> into Vibrant <br />
                <span className="text-red-600">Reality</span>
              </h1>
              <p className="text-base text-gray-600 font-medium">
                Where Every Print Tells Your Story
              </p>
              {/* Get Started Button */}
              <Link href="/products">
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg text-sm transition-colors duration-200 shadow-lg hover:shadow-xl">
                  Get Started
                </button>
              </Link>
            </div>
            {/* Right Content: Mobile Hero Image */}
            <div className="flex-shrink-0 relative w-[220px] h-[240px] sm:w-[280px] sm:h-[300px]">
              <Image
                src={
                  mobileHeroImg ||
                  "/placeholder.svg?height=300&width=280&query=mobile hero image with products"
                }
                alt="Mobile Hero Image"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Bottom row: Search Bar (below text and image) */}
          <div className="space-y-2">
            {" "}
            {/* Adjusted space-y to space-y-2 */}
            <p className="text-gray-700 font-medium text-left">
              What are you printing today?
            </p>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for flyers, paper bag, business card, e.t.c."
                className="w-full py-3 px-4 pr-12 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-700 placeholder-gray-400 text-sm" // Changed py to py-3
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Desktop Layout (hidden on screens smaller than lg) */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center pt-16">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-lg md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Transforming Your <br />
                <span className="text-red-600">Vision</span> into Vibrant <br />
                <span className="text-red-600">Reality</span>
              </h1>
              <p className="text-lg text-gray-600 font-medium">
                Where Every Print Tells Your Story
              </p>

              {/* Get Started Button */}
              <Link href="/products">
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg text-md transition-colors duration-200 shadow-lg hover:shadow-xl">
                  Get Started
                </button>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="space-y-1">
              <p className="text-gray-700 font-medium">
                What are you printing today?
              </p>
              <div className="relative">
                <input
                  type="text"
                  placeholder="search for flyers, paper bag, business card, e.t.c."
                  className="w-full py-3 px-5 pr-12 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Right Content - Desktop Hero Image */}
          <div className="relative">
            <div className="relative mt-16">
              <div className="relative">
                <Image
                  src={
                    desktopHeroImg ||
                    "/placeholder.svg?height=1000&width=950&query=desktop hero image"
                  }
                  alt="Person with VR headset"
                  width={950}
                  height={1000}
                  className="mx-auto"
                  priority
                />
              </div>
            </div>

            {/* Floating Product Items for Desktop */}
            <div className="absolute top-8 left-8 animate-bounce">
              <Image
                src={productOneImg || "/placeholder.svg"}
                alt="Custom Bag"
                width={120}
                height={120}
                className="rounded"
              />
            </div>

            <div className="absolute bottom-20 left-4 animate-bounce delay-300">
              <Image
                src={productTwoImg || "/placeholder.svg"}
                alt="Custom T-Shirt"
                width={60}
                height={70}
                className="rounded"
              />
            </div>

            <div className="absolute top-32 right-16 w-4 h-4 bg-red-400 rounded-full animate-ping"></div>
            <div className="absolute bottom-32 right-8 w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
