"use client"

import { Heart, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-red-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-white hover:text-red-200 font-medium text-sm ${
                pathname === "/" ? "border-b-2 border-white" : ""
              }`}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={`text-white hover:text-red-200 font-medium text-sm ${
                pathname === "/products" ? "border-b-2 border-white" : ""
              }`}
            >
              Products
            </Link>
            <Link
              href="/about"
              className={`text-white hover:text-red-200 font-medium text-sm ${
                pathname === "/about" ? "border-b-2 border-white" : ""
              }`}
            >
              About Us
            </Link>
            <Link
              href="/blog"
              className={`text-white hover:text-red-200 font-medium text-sm ${
                pathname === "/blog" ? "border-b-2 border-white" : ""
              }`}
            >
              Blog
            </Link>
            <Link
              href="/get-a-quote"
              className={`text-white hover:text-red-200 font-medium text-sm ${
                pathname === "/get-a-quote" ? "border-b-2 border-white" : ""
              }`}
            >
              Get A Quote
            </Link>
            <Link href="/track-order" className="text-white hover:text-red-200 font-medium text-sm">
              Track Order
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/signin" className="text-white hover:text-red-200 font-medium text-sm">
              Sign in
            </Link>
            <Link href="/create-account" className="text-white hover:text-red-200 font-medium text-sm">
              Create Account
            </Link>

            {/* Wishlist */}
            <button className="text-white hover:text-red-200 relative">
              <Heart className="w-5 h-5" />
            </button>

            {/* Cart */}
            <button className="text-white hover:text-red-200 relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-white text-red-600 text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                0
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-white hover:text-red-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
