"use client";
import { Heart, ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-red-600 text-white relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-red-200"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation Links */}
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
            <Link
              href="/track-order"
              className="text-white hover:text-red-200 font-medium text-sm"
            >
              Track Order
            </Link>
          </div>

          {/* Mobile Center Buttons */}
          <div className="md:hidden flex items-center space-x-2">
            <button className="bg-white text-red-600 px-3 py-1 rounded text-sm font-medium">
              Get A Quote
            </button>
            <button className="border border-white text-white px-3 py-1 rounded text-sm font-medium">
              Sign In
            </button>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Desktop Sign in/Create Account */}
            {/* <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/signin"
                className="text-white hover:text-red-200 font-medium text-sm"
              >
                Sign in
              </Link>
              <Link
                href="/create-account"
                className="text-white hover:text-red-200 font-medium text-sm"
              >
                Create Account
              </Link>
            </div> */}

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
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-red-600 border-t border-red-500 z-50">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-white hover:text-red-200 font-medium text-sm py-2 ${
                    pathname === "/" ? "border-l-4 border-white pl-4" : ""
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-white hover:text-red-200 font-medium text-sm py-2 ${
                    pathname === "/products"
                      ? "border-l-4 border-white pl-4"
                      : ""
                  }`}
                >
                  Products
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-white hover:text-red-200 font-medium text-sm py-2 ${
                    pathname === "/about" ? "border-l-4 border-white pl-4" : ""
                  }`}
                >
                  About Us
                </Link>
                <Link
                  href="/blog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-white hover:text-red-200 font-medium text-sm py-2 ${
                    pathname === "/blog" ? "border-l-4 border-white pl-4" : ""
                  }`}
                >
                  Blog
                </Link>
                <Link
                  href="/get-a-quote"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-white hover:text-red-200 font-medium text-sm py-2 ${
                    pathname === "/get-a-quote"
                      ? "border-l-4 border-white pl-4"
                      : ""
                  }`}
                >
                  Get A Quote
                </Link>
                <Link
                  href="/track-order"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white hover:text-red-200 font-medium text-sm py-2"
                >
                  Track Order
                </Link>

                {/* Mobile Sign in/Create Account */}
                {/* <div className="border-t border-red-500 pt-4 mt-4">
                  <Link
                    href="/signin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white hover:text-red-200 font-medium text-sm py-2 block"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/create-account"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white hover:text-red-200 font-medium text-sm py-2 block"
                  >
                    Create Account
                  </Link>
                </div> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
