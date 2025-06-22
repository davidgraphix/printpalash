import { Heart, ShoppingCart } from "lucide-react"
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="bg-red-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-red-200 font-medium text-sm">
              Home
            </Link>
            <Link
              href="/products"
              className="text-white hover:text-red-200 font-medium text-sm border-b-2 border-transparent hover:border-red-200"
            >
              Products
            </Link>
            <Link href="/about" className="text-white hover:text-red-200 font-medium text-sm">
              About Us
            </Link>
            <Link href="/blog" className="text-white hover:text-red-200 font-medium text-sm">
              Blog
            </Link>
            <Link href="/get-a-quote" className="text-white hover:text-red-200 font-medium text-sm">
              Get A Quote
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/signin" className="text-white hover:text-red-200 font-medium text-sm">
              Sign in
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
