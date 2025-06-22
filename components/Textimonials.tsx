"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Adebayo Johnson",
    company: "Tech Solutions Ltd",
    content:
      "PrintPalash delivered exceptional quality business cards for our company. The attention to detail and professional finish exceeded our expectations. Highly recommended!",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Okafor",
    company: "Fashion House Nigeria",
    content:
      "Amazing service! Our branded shopping bags turned out perfect. The team was professional, delivery was on time, and the quality is outstanding. Will definitely use them again.",
    rating: 5,
  },
  {
    id: 3,
    name: "Michael Adeyemi",
    company: "StartUp Hub",
    content:
      "From flyers to banners, PrintPalash has been our go-to printing partner. Their rapid turnaround time and consistent quality make them the best in Lagos.",
    rating: 5,
  },
  {
    id: 4,
    name: "Fatima Ibrahim",
    company: "Event Planners Pro",
    content:
      "Excellent customer service and top-notch printing quality. They handled our large order with professionalism and delivered everything on schedule.",
    rating: 5,
  },
  {
    id: 5,
    name: "David Okonkwo",
    company: "Marketing Agency",
    content:
      "PrintPalash transformed our marketing materials. The vibrant colors and sharp prints really make our brand stand out. Truly the print kings of Nigeria!",
    rating: 5,
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 3 ? 0 : prevIndex + 1))
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 3 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 3 : prevIndex - 1))
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <h2 className="px-8 text-2xl font-bold text-gray-900">What customers say about us</h2>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
        </div>

        {/* Testimonials Slider */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-1/3 flex-shrink-0 px-4">
                  <div className="bg-gray-50 rounded-lg p-6 h-full">
                    {/* Rating Stars */}
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>

                    {/* Testimonial Content */}
                    <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>

                    {/* Customer Info */}
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {[...Array(testimonials.length - 2)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentIndex ? "bg-red-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
