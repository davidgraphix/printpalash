import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-red-600 p-2 rounded">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="text-red-600 font-bold text-lg">De palash ltd.</span>
            </div>
            <address className="text-gray-300 not-italic leading-relaxed">
              29 Shipeolu street, elediye
              <br />
              roundabout, onipanu, shomolu,
              <br />
              lagos, nigeria.
            </address>
          </div>

          {/* Navigation & Social */}
          <div className="space-y-6">
            {/* Navigation Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Home</h3>
              <div className="space-y-2">
                <Link href="/about" className="block text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
                <Link href="/contact" className="block text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
                <Link href="/track-order" className="block text-gray-300 hover:text-white transition-colors">
                  Track Order
                </Link>
                <Link href="/blog" className="block text-gray-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-white font-semibold mb-4 underline">Social Media</h3>
              <p className="text-gray-300 text-sm mb-4">
                Stay connected with us on social media.
                <br />
                Give us a review. Rate us and let us know
                <br />
                how we can improve. Thank you.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
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
          <p className="text-center text-white text-sm">Copyright © 2023 DePalashltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
