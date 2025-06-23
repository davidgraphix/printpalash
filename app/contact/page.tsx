export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Contact Us</h1>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
                <p className="text-gray-600 mb-6">
                  We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600">
                    29 Shipeolu street, elediye
                    <br />
                    roundabout, onipanu, shomolu,
                    <br />
                    lagos, nigeria.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">+234 703 901 7359</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">Business Hours</h3>
                  <p className="text-gray-600">Monday to Saturday: 9:00AM - 6:00PM</p>
                </div>
              </div>
            </div>

            {/* Contact Form Placeholder */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Send us a Message</h3>
              <p className="text-gray-600">
                For the best experience, please use our WhatsApp contact or visit our{" "}
                <a href="/get-a-quote" className="text-red-600 hover:text-red-700 font-medium">
                  Get A Quote
                </a>{" "}
                page to discuss your printing needs directly with our team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
