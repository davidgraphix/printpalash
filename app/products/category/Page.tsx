"use client"

import { useParams } from "next/navigation"
import Link from "next/link"

export default function CategoryPage() {
  const params = useParams()
  const category = params.category as string

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-red-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-red-600">
            Products
          </Link>
          <span className="mx-2">/</span>
          <span className="capitalize">{category?.replace("-", " ")}</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-8 capitalize">{category?.replace("-", " ")} Products</h1>

        <p className="text-gray-600">This page will show all products in the {category?.replace("-", " ")} category.</p>
      </div>
    </div>
  )
}
