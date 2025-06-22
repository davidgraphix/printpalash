import Hero from "@/components/Hero"
import Features from "@/components/Features"
import PopularProducts from "@/components/PopularProducts"
import TrustedBrands from "@/components/TrustedBrands"
import Testimonials from "@/components/Textimonials"
import Footer from "@/components/Footer"

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Features />
      <PopularProducts />
      <TrustedBrands />
      <Testimonials />
      <Footer />
    </div>
  )
}
