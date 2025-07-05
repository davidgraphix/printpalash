import Footer from '@/components/Footer'
import PrivacyPolicy from '@/components/PrivacyPolicyPage'
import TrustedBrands from '@/components/TrustedBrands'
import React from 'react'

const page = () => {
  return (
    <div>
      <PrivacyPolicy />
      <TrustedBrands />
      <Footer />
    </div>
  )
}

export default page
