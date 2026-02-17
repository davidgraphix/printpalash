import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import backgroundImg from "@/public/assests/img-background.png";
import mobileHeroImg from "@/public/assests/mobile-hero-img.png";


export default function Hero() {
  return (
    <section className="relative bg-pink-100 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Mobile Layout (visible on screens smaller than lg) */}
        <div className="lg:hidden pt-8 pb-4 mr-0 pr-0">
          {/* Top row: Text content on left, Mobile Hero Image on right */}
          <div className="flex flex-col items-center justify-center gap-0 mb-6 text-center w-full">
            {/* Left Content: Heading, Description */}
            <div className="space-y-3 w-full">
              <h1 className="text-[28px] font-bold text-gray-900 leading-tight w-full">
                <span className="text-red-600"> Stand Out</span>
                <br />
                With Premium Prints <br /> That Matters.
              </h1>
              <p className="text-[16px] text-gray-600 font-semibold w-full text-center">
                Flyers, Jotters, Business Cards, Banners, T-Shirts & More <br />
                -<span className="text-red-600">Fast & Reliable.</span> <br />
                <br />
              </p>
            </div>
          </div>


          <div className="relative -mt-6 group flex flex-col items-center w-full">
            <p className="text-[17px] text-gray-700 font-semibold text-center w-full mb-2">
              What are you printing today?
            </p>
            <div className="relative w-full flex justify-center">
              <input
                type="text"
                placeholder="Search for flyers, paper bag, business card, e.t.c."
                className="w-full max-w-md py-3 px-4 pr-12 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-700 placeholder-gray-400 text-base shadow text-center"
              // TODO: Add onChange handler for search functionality
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 group-hover:text-red-600 cursor-pointer transition-colors duration-200" />
            </div>
            {/* TODO: Render search results here */}
          </div>
        </div>

        {/* Desktop Layout (hidden on screens smaller than lg) */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center pt-16">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-lg md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Transforming Your <br />
                <span className="text-red-600">Vision</span> into Vibrant <br />
                Reality
              </h1>
              <p className="text-2xl text-gray-600 font-medium">
                Where Every Print Tells Your Story
              </p>

              {/* Get Started Button */}
              <Link href="/products">
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg text-xl transition-colors duration-200 shadow-lg hover:shadow-xl">
                  Get Started
                </button>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="space-y-1">
              <p className="text-gray-700 font-small">
                What are you printing today?
              </p>
              <div className="relative">
                <input
                  type="text"
                  placeholder="search for flyers, paper bag, business card, e.t.c."
                  className="w-full py-3 px-5 pr-12 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 hover:text-red-600 cursor-pointer transition-colors duration-200" />
              </div>
            </div>
          </div>

          {/* Right Content - Desktop Hero Image */}
          <div className="relative">
            <div className="relative mt-16">
              <div className="relative">
                <Image
                  src={
                    backgroundImg ||
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

            <div className="absolute top-32 right-16 w-4 h-4 bg-red-400 rounded-full animate-ping"></div>
            <div className="absolute bottom-32 right-8 w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
