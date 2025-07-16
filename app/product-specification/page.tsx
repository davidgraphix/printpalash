import Features from "@/components/Features/Features";
import Footer from "@/components/Footer/Footer";
import ProductDetails from "@/components/Products/ProductDetails";
import React from "react";

const productSpecification = () => {
  return (
    <>
      <ProductDetails slug={""} />
      <Features />
      <Footer />
    </>
  );
};

export default productSpecification;
