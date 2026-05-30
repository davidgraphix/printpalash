import { Suspense } from "react";
import ProductsSection from "@/components/Products/ProductsSection";
import Footer from "@/components/Footer/Footer";
import TrustedBrands from "@/components/Trusted-Brands/TrustedBrands";

export default function ProductsPage() {
  return (
    <>
      <Suspense
        fallback={
          <div className="min-h-screen bg-gray-50 px-4 py-20 text-center">
            <p className="font-bold text-gray-700">Loading products...</p>
          </div>
        }
      >
        <ProductsSection />
      </Suspense>

      <TrustedBrands />
      <Footer />
    </>
  );
}