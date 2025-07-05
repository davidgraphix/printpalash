import Image from "next/image"
import getQuoteImageBg from "@/public/assests/get-quote-img/getQuote-img-bg.png"

export default function GetQuote() {
  const whatsappNumber = "+2347039017359"
  const whatsappMessage = encodeURIComponent(
    "Hello PrintPalash! I would like to get a quote for my printing project. Please provide me with pricing details.",
  )
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] bg-gray-900 overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={getQuoteImageBg}
            alt="Colorful printing materials and papers"
            fill
            className="object-cover opacity-100"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">REQUEST A QUOTE</h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto">
            Click the button below to share your project details with us directly on WhatsApp, and we'll get back to you
            with a price estimate in no time!
          </p>

          {/* WhatsApp Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 bg-white hover:bg-gray-100 text-gray-700 font-medium py-4 px-8 rounded-full text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {/* WhatsApp Icon */}
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488" />
              </svg>
            </div>
            <span>Kindly click the button</span>
          </a>

          {/* Additional Info */}
          <p className="text-sm text-gray-300 mt-6">
            Our team will respond within 24 hours with a detailed quote tailored to your needs
          </p>
        </div>
      </section>
    </div>
  )
}
