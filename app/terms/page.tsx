import Footer from "@/components/Footer/Footer";
import TermsAndConditions from "@/components/Terms-and-Conditions/TermsAndConditionSection";
import TrustedBrands from "@/components/Trusted-Brands/TrustedBrands";
import React from "react";

const page = () => {
  return (
    <div>
      <TermsAndConditions />
      <TrustedBrands />
      <Footer />
    </div>
  );
};

export default page;
