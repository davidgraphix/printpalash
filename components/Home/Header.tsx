import { Phone, MessageCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white py-3 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl lg:text-2xl font-bold text-black">
              print<span className="text-red-600">palash</span>
              <span className="text-xs lg:text-sm text-gray-500">.com</span>
            </h1>
          </div>

          {/* Right Side - Mobile & Desktop */}
          <div className="flex items-center space-x-3 lg:space-x-8">
            {/* Need help? Call - Desktop Only */}
            <div className="hidden lg:flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <Phone className="w-4 h-4 text-gray-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Need help? Call</span>
                <span className="text-sm text-gray-700 font-medium">
                  +234 703 501 7359
                </span>
              </div>
            </div>

            {/* Mobile Phone Display */}
            <div className="lg:hidden flex items-center space-x-1">
              <Phone className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700 font-medium">
                +234 703 501 7359
              </span>
            </div>

            {/* Chat with us Button */}
            <div className="flex items-center space-x-2 bg-green-500 text-white px-3 py-2 rounded-md">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Chat with us</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
