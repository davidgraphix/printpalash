"use client";
import { Printer, Clock, Shield } from "lucide-react";
import Link from "next/link";
import React from "react";

import { useState, useEffect } from "react";

const features = [
  {
    icon: Printer,
    title: "Quality Printing",
    description:
      "Experience the transformative power of quality print - where every detail elevates your vision from ordinary to extraordinary.",
  },
  {
    icon: Clock,
    title: "Rapid Turnaround",
    description:
      "Our orders are completed within 3 to 7 business days, with quality always guaranteed.",
  },
  {
    icon: Shield,
    title: "Money Back Guarantee",
    description: (
      <>
        While most clients arrive to resolve issues with buyers, we offer a
        refund if a satisfactory solution cannot be achieved.{" "}
        <Link
          href="money-back"
          className="text-red-600 underline hover:text-red-800 text-sm"
        >
          Terms and Conditions applied
        </Link>
      </>
    ),
  },
];

export default function Features() {
  const [currentFeature, setCurrentFeature] = useState(0);

  // Auto-slide for mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 bg-gray-200">
      <div className="container mx-auto px-4">
        {/* Mobile: Single Feature Display */}
        <div className="md:hidden">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
              {React.createElement(features[currentFeature].icon, {
                className: "w-8 h-8 text-red-600",
              })}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {features[currentFeature].title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed px-4">
                {features[currentFeature].description}
              </p>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentFeature(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentFeature ? "bg-red-600" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: All Features Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
                <feature.icon className="w-8 h-8 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-300 mt-8"></div>
      </div>
    </section>
  );
}
