import Image from "next/image";
import Link from "next/link";
import AboutImageBg from "@/public/assests/about-image/about-bg-img.png";
import woodenImg from "@/public/assests/about-image/Group 22.png";
import Features from "@/components/Features";

export default function AboutSection() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Printing Machine Image */}
      <section className="relative h-96 bg-gray-900 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={AboutImageBg}
            alt="Professional printing machine with colorful prints"
            fill
            className="object-cover opacity-100"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About Us
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Nigeria's No. 1 Print King Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Nigeria's No. 1 Print King!
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              At PrintPalash.com, we believe that every idea deserves to be
              brought to life. As a proud division of De Palash Ltd., founded
              with a passion for creativity and a commitment to quality, we
              specialize in delivering top-notch print products to customers
              across the globe. Whether you're a business looking to make a
              statement, an individual celebrating a special moment, or a
              creative in need of the perfect materials, we're here to make your
              vision a reality.
            </p>

            {/* Our Journey Section */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Journey: From Local to Global
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                What started as a small endeavor in Nigeria has rapidly
                transformed into a leading print service recognized for
                excellence and reliability. Our journey began with a simple
                mission: to provide high-quality print products that are
                accessible to everyone, no matter where you are. Through
                innovation, dedication, and a keen understanding of our
                customers' needs, we've built a brand synonymous with trust and
                excellence.
              </p>
            </div>
          </div>

          {/* Mission and Vision Cards */}
          <div className="bg-pink-50 py-16 mb-16 rounded-lg">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {/* Mission Card */}
                <div className="bg-white rounded-lg shadow-md p-8 relative">
                  <div className="absolute -top-4 left-8">
                    <span className="bg-red-600 text-white px-6 py-2 rounded font-bold text-lg">
                      Our Mission
                    </span>
                  </div>
                  <div className="pt-6">
                    <p className="text-gray-700 leading-relaxed text-center">
                      To empower individuals and businesses by providing
                      high-quality, accessible print solutions that inspire
                      creativity and foster connections, all while maintaining
                      exceptional customer service and sustainability.
                    </p>
                  </div>
                </div>

                {/* Vision Card */}
                <div className="bg-white rounded-lg shadow-md p-8 relative">
                  <div className="absolute -top-4 left-8">
                    <span className="bg-red-600 text-white px-6 py-2 rounded font-bold text-lg">
                      Our vision
                    </span>
                  </div>
                  <div className="pt-6">
                    <p className="text-gray-700 leading-relaxed text-center">
                      To be the global leader in the print industry,
                      revolutionizing the way people access and experience print
                      products, while championing innovation, quality, and
                      environmental responsibility.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Why Choose Us?
            </h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Unmatched Quality:
                  </h4>
                  <p className="text-gray-700">
                    We use state-of-the-art technology and the finest materials
                    to ensure every product meets the highest standards. Our
                    prints are vibrant, durable, and crafted to perfection.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Global Reach:
                  </h4>
                  <p className="text-gray-700">
                    With our seamless online ordering system, you can access our
                    services from anywhere in the world. No more barriers—just
                    effortless printing at your fingertips.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Customer-Centric Approach:
                  </h4>
                  <p className="text-gray-700">
                    Our customers are at the heart of everything we do. From
                    personalized service to quick turnaround times, we strive to
                    make your experience smooth and enjoyable.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Innovative Solutions:
                  </h4>
                  <p className="text-gray-700">
                    We're not just about prints; we're about ideas. Our team is
                    always ready to collaborate and offer creative solutions
                    tailored to your specific needs.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
                  5
                </span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Sustainability Commitment:
                  </h4>
                  <p className="text-gray-700">
                    We understand the importance of protecting our planet.
                    That's why we incorporate eco-friendly practices in our
                    printing processes, ensuring we contribute to a greener
                    future.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Join the Family Section */}
          <div className="bg-gray-50 rounded-lg p-8 md:p-12 mb-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Image */}
              <div className="relative">
                <div className=" rounded-lg p-4 inline-block mb-4">
                  <div className=" rounded p-6">
                    <Image
                      src={woodenImg}
                      alt="Wooden figurines representing community and teamwork"
                      width={250}
                      height={300}
                      className="rounded"
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Join the PrintPalash.com Family!
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  We're proud to be Nigeria's leading print service, but our
                  greatest achievement is the satisfaction of our customers.
                  When you choose PrintPalash.com, you're not just ordering a
                  product; you're joining a community that values creativity,
                  quality, and service. Let us help you transform your ideas
                  into reality, one print at a time. Explore our wide range of
                  products today and experience why we are the Print King!
                </p>
                <Link
                  href="/products"
                  className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
