import { Printer, Clock, Shield } from "lucide-react";

export default function Features() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Quality Printing */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
              <Printer className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Quality Printing
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Experience the transformative power of quality print - where
                every detail elevates your vision from ordinary.
              </p>
            </div>
          </div>

          {/* Rapid Turnaround */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
              <Clock className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Rapid Turnaround
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Our order are completed within 3 to 7 business days, with
                quality always guaranteed.
              </p>
            </div>
          </div>

          {/* Money Back Guarantee */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
              <Shield className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Money Back Guarantee
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                While most clients arrive to resolve issues with buyers, we
                offer a refund if a satisfactory solution cannot be achieved.
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-300 my-0"></div>

        {/* Bottom Banner
        <div className=" text-white text-center py-4 rounded-lg">
          <p className="font-bold text-gray-700 text-lg">Free Shipping within Lagos for Order Above ₦20,0000</p>
          </div> */}
      </div>
    </section>
  );
}
