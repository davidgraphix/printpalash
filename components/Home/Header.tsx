import { Clock, Monitor, Phone, MessageCircle } from "lucide-react"
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white py-4 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-black">
              print<span className="text-red-600">palash</span>
              <span className="text-sm text-gray-500">.com</span>
            </h1>
          </div>

          {/* Contact Information */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Business Hours */}
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-700 font-medium">9:00AM - 6:00PM</span>
            </div>

            {/* Online Status */}
            <div className="flex items-center space-x-2">
              <Monitor className="w-5 h-5 text-gray-600" />
              <div className="flex flex-col">
                <span className="text-sm text-gray-700 font-medium">Online 24/7</span>
                <div className="w-16 h-1 bg-blue-500 rounded-full"></div>
              </div>  
            </div>

            {/* Phone Number */}
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-700 font-medium">+234 703 901 7359</span>
            </div>

            {/* WhatsApp Chat */}
           <Link href="https://wa.me/+2347039017359">
            <div className="flex items-center space-x-2 bg-green-500 text-white px-3 py-2 rounded-md">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Chat with us</span>
            </div>
           </Link>

            {/* Country Selector */}
            <div className="flex items-center space-x-2">
              <div className="w-6 h-4 bg-green-600 relative">
                <div className="absolute left-0 top-0 w-2 h-full bg-green-600"></div>
                <div className="absolute left-2 top-0 w-2 h-full bg-white"></div>
                <div className="absolute right-0 top-0 w-2 h-full bg-green-600"></div>
              </div>
              <span className="text-sm text-gray-700 font-medium">Nigeria</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-gray-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
