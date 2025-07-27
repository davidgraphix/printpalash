import Features from "@/components/Features/Features";
import Footer from "@/components/Footer/Footer";
import ProductDetails from "@/components/Products/ProductDetails";
import { productsData } from "@/lib/products-data";
import React from "react";

const productSpecification = () => {
  return (
    <>
      {Object.entries(productsData).map(([category, products]) =>
        products.map((product) => (
          <ProductDetails key={product.slug} product={product} />
        ))
      )}
      <Features />
      <Footer />
    </>
  );
};

export default productSpecification;
