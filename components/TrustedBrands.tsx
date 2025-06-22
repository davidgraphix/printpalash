import Image from "next/image"

export default function TrustedBrands() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Nigeria's No. 1 Online Print KING 👑</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our print services and solutions are trusted by these brands and more other businesses in Nigeria.
          </p>
        </div>

        {/* Brand Logos */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          <div className="grayscale hover:grayscale-0 transition-all duration-300">
            <Image
              src="/placeholder.svg?height=60&width=120"
              alt="IITA - Transforming African Agriculture"
              width={120}
              height={60}
              className="h-12 w-auto"
            />
          </div>
          <div className="grayscale hover:grayscale-0 transition-all duration-300">
            <Image
              src="/placeholder.svg?height=60&width=120"
              alt="Mastercard Foundation"
              width={120}
              height={60}
              className="h-12 w-auto"
            />
          </div>
          <div className="grayscale hover:grayscale-0 transition-all duration-300">
            <Image
              src="/placeholder.svg?height=60&width=120"
              alt="Kohniles Naturals"
              width={120}
              height={60}
              className="h-12 w-auto"
            />
          </div>
          <div className="grayscale hover:grayscale-0 transition-all duration-300">
            <Image
              src="/placeholder.svg?height=60&width=120"
              alt="Reflection Universe"
              width={120}
              height={60}
              className="h-12 w-auto"
            />
          </div>
          <div className="grayscale hover:grayscale-0 transition-all duration-300">
            <Image
              src="/placeholder.svg?height=60&width=120"
              alt="Hernicky"
              width={120}
              height={60}
              className="h-12 w-auto"
            />
          </div>
          <div className="grayscale hover:grayscale-0 transition-all duration-300">
            <Image
              src="/placeholder.svg?height=60&width=120"
              alt="Northwood Cargo Services"
              width={120}
              height={60}
              className="h-12 w-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
