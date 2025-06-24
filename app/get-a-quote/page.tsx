import Features from '@/components/Features';
import Footer from '@/components/Footer';
import GetQuoteSection from '@/components/GetQuoteSection';
import React from 'react'

const QuotePage = () => {
  return (
    <div>
      <GetQuoteSection />
       <Features />
      <Footer />
    </div>
  )
}

export default QuotePage;