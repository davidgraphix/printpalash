"use client";
import { Heart, ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const linkClass = (href: string) =>
    `text-white hover:text-red-200 font-medium text-sm ${pathname === href ? "border-b-2 border-white" : ""
    }`;

  return (
    <nav className="bg-red-600 text-white relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen((s) => !s)}
              className="text-white hover:text-red-200"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={linkClass("/")}>Home</Link>
            <Link href="/products" className={linkClass("/products")}>Products</Link>

            {/* ✅ NEW */}
            <Link href="/services" className={linkClass("/services")}>Services</Link>

            <Link href="/about" className={linkClass("/about")}>About Us</Link>
            <Link href="/blog" className={linkClass("/blog")}>Blog</Link>
            <Link href="/get-a-quote" className={linkClass("/get-a-quote")}>Get A Quote</Link>
            <Link href="/track-order" className="text-white hover:text-red-200 font-medium text-sm">
              Track Order
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-red-200 relative" aria-label="Wishlist">
              <Heart className="w-5 h-5" />
            </button>

            <button className="text-white hover:text-red-200 relative" aria-label="Cart">
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
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-white hover:text-red-200 font-medium text-sm py-2 ${pathname === "/" ? "border-l-4 border-white pl-4" : ""}`}>
                  Home
                </Link>

                <Link href="/products" onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-white hover:text-red-200 font-medium text-sm py-2 ${pathname === "/products" ? "border-l-4 border-white pl-4" : ""}`}>
                  Products
                </Link>

                {/* ✅ NEW */}
                <Link href="/services" onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-white hover:text-red-200 font-medium text-sm py-2 ${pathname === "/services" ? "border-l-4 border-white pl-4" : ""}`}>
                  Services
                </Link>

                <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-white hover:text-red-200 font-medium text-sm py-2 ${pathname === "/about" ? "border-l-4 border-white pl-4" : ""}`}>
                  About Us
                </Link>

                <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-white hover:text-red-200 font-medium text-sm py-2 ${pathname === "/blog" ? "border-l-4 border-white pl-4" : ""}`}>
                  Blog
                </Link>

                <Link href="/get-a-quote" onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-white hover:text-red-200 font-medium text-sm py-2 ${pathname === "/get-a-quote" ? "border-l-4 border-white pl-4" : ""}`}>
                  Get A Quote
                </Link>

                <Link href="/track-order" onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white hover:text-red-200 font-medium text-sm py-2">
                  Track Order
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
