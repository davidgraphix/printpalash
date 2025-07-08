import { Search } from "lucide-react";
import Image from "next/image";
import heroBackground from "../public/assests/heroBg.png";
import productOneImg from "../public/assests/image-items/product1.png";
import productTwoImg from "../public/assests/image-items/product2.png";
import productThree from "../public/assests/image-items/product3.png";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-pink-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-4">
            <div className="space-y-4">
              <h1 className="text-lg md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Transforming Your <br />{" "}
                <span className="text-red-600">Vision</span> into Vibrant <br />
                <span className="text-red-600">Reality</span>
              </h1>
              <p className="text-lg text-gray-600 font-medium">
                Where Every Print Tells Your Story
              </p>
            </div>

            {/* Get Started Button */}
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg text-md transition-colors duration-200 shadow-lg hover:shadow-xl">
              Get Started
            </button>

            {/* Search Bar */}
            <div className="space-y-3">
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

          {/* Right Content - Hero Image with Products */}
          <div className="relative">
            {/* Main Hero Image with Red Circle Background */}
            <div className="relative mt-16 scale-10">
              {/* Red Circle Background */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-red-600 rounded-full -z-10"></div>

              {/* Main Person Image */}
              <div className="relative ">
                <Image
                  src={heroBackground}
                  alt="Person with VR headset"
                  width={750}
                  height={800}
                  className="mx-auto"
                  priority
                />
              </div>
            </div>

            {/* Floating Product Items */}
            {/* Bag */}
            <div className="absolute top-8 left-8 animate-bounce">
              {/* <div className="bg-white rounded-lg shadow-lg p-"> */}
              <Image
                src={productOneImg}
                alt="Custom Bag"
                width={120}
                height={120}
                className="rounded"
              />
              {/* </div> */}
            </div>

            {/* T-Shirt */}
            {/* <div className="absolute top-20 right-4 animate-pulse">
              <div className="bg-white rounded-lg shadow-lg p-3">
                <Image
                  src={productTwoImg}
                  alt="Custom T-Shirt"
                  width={60}
                  height={80}
                  className="rounded"
                />
                <div className="text-center mt-2">
                  <span className="text-xs font-medium text-gray-600">DESIGN</span>
                </div>
              </div>
            </div> */}

            {/* T-Shirt */}
            <div className="absolute bottom-20 left-4 animate-bounce delay-300">
              {/* <div className="bg-white rounded-lg shadow-lg p-3"> */}
              <Image
                src={productTwoImg}
                alt="Custom T-Shirt"
                width={60}
                height={70}
                className="rounded"
              />
              {/* </div> */}
            </div>

            {/* Additional Decorative Elements */}
            <div className="absolute top-32 right-16 w-4 h-4 bg-red-400 rounded-full animate-ping"></div>
            <div className="absolute bottom-32 right-8 w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
