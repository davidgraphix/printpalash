import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-8 lg:py-10">
        {/* Mobile Layout */}
        <div className="lg:hidden space-y-8">
          {/* Company Logo */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Image
                src="/printpalash-logo-footer.png"
                alt="PrintPalash logo"
                width={140}
                height={48}
                className="object-contain"
              />
            </div>
            <address className="text-gray-300 not-italic leading-relaxed">
              29 Shipeolu street, elediye
              <br />
              roundabout, onipanu, shomolu,
              <br />
              lagos, nigeria.
            </address>
            <a
              href="https://maps.app.goo.gl/R4baNsY7v71JPG3Z9?g_st=ic"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
            >
              Click here for directions
            </a>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <Link
              href="/"
              className="text-gray-300 hover:text-white transition-colors py-2"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-300 hover:text-white transition-colors py-2"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-gray-300 hover:text-white transition-colors py-2"
            >
              Contact
            </Link>
            <Link
              href="/track-order"
              className="text-gray-300 hover:text-white transition-colors py-2"
            >
              Track Order
            </Link>
            <Link
              href="/blog"
              className="text-gray-300 hover:text-white transition-colors py-2"
            >
              Blog
            </Link>
            <Link
              href="/terms"
              className="text-gray-300 hover:text-white transition-colors py-2"
            >
              Terms
            </Link>
            <Link
              href="/services"
              className="text-gray-300 hover:text-white transition-colors py-2"
            >
              Services
            </Link>
            <Link
              href="/money-back"
              className="text-gray-300 hover:text-white transition-colors py-2"
            >
              Money Back
            </Link>
          </div>

          {/* Social Media */}
          <div className="text-center space-y-4">
            <h3 className="text-white font-semibold underline">Social Media</h3>
            <p className="text-gray-300 text-sm px-4">
              Stay connected with us on social media. Give us a review, Rate us
              and let us know how we can improve. Thank you.
            </p>
            <div className="flex justify-center space-x-6">
              <a
                href="https://www.facebook.com/share/1CXJmcKExu/?mibextid=wwXIfr"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
              {/* <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Twitter className="w-6 h-6" />
              </a> */}
              <a
                href="https://www.instagram.com/print_palash?igsh=Z3p3cXNiMXBvZ2xm&utm_source=qr"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
              {/* <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a> */}
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold underline text-center">
              Newsletter
            </h3>
            <p className="text-gray-300 text-sm text-center">
              Get the latest news, events & more delivered to your inbox.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-red-600 text-white placeholder-gray-400"
              />
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center justify-start mb-4">
              <Image
                src="/printpalash-logo-footer.png"
                alt="PrintPalash logo"
                width={140}
                height={48}
                className="object-contain"
              />
            </div>
            <address className="text-gray-300 not-italic leading-relaxed">
              29 Shipeolu street, elediye
              <br />
              roundabout, onipanu, shomolu,
              <br />
              lagos, nigeria.
            </address>
            <a
              href="https://maps.app.goo.gl/R4baNsY7v71JPG3Z9?g_st=ic"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
            >
              Click here for directions
            </a>
          </div>

          <div className="">
            {/* Navigation Links */}
            <div className="pr-2">
              <div className="space-y-2">
                <Link
                  href="/"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </Link>
                <Link
                  href="/track-order"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Track Order
                </Link>
                <Link
                  href="/blog"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Blog
                </Link>
                <Link
                  href="/terms"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Terms and Conditions
                </Link>
                <Link
                  href="/privacy"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/services"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Printing Services
                </Link>
                <Link
                  href="/money-back"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Money Back Guarantee
                </Link>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold mb-4 underline">
              Social Media
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Stay connected with us on social media.
              <br />
              Give us a review. Rate us and let us know
              <br />
              how we can improve. Thank you.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/share/1CXJmcKExu/?mibextid=wwXIfr"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
              {/* <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Twitter className="w-6 h-6" />
              </a> */}
              <a
                href="https://www.instagram.com/print_palash?igsh=Z3p3cXNiMXBvZ2xm&utm_source=qr"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
              {/* <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a> */}
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold underline">Newsletter</h3>
            <p className="text-gray-300 text-sm">
              Get the latest news, events & more
              <br />
              delivered to your inbox.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-red-600 text-white placeholder-gray-400"
              />
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-red-600 py-3">
        <div className="container mx-auto px-4">
          <p className="text-center text-white text-sm">
            Copyright © 2026 DePalashltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
